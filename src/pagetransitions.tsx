import {
  ReactNode,
  useLayoutEffect,
  useRef,
  createContext,
  useContext,
  useMemo,
  Suspense,
} from "react";
import {
  SwitchTransition,
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";
import create from "zustand/vanilla";
import createHook from "zustand";

const PageContext = createContext("both");

type TransitionMode = "out-in" | "in-out" | "sync";

type TransitionState =
  | "suspended" // waiting to mount or suspended
  | "appear"
  | "appearing"
  | "appeared"
  | "exit"
  | "exiting"
  | "exited"
  | "enter"
  | "entering"
  | "entered";
type TransitionConfig = {
  from?: string;
  to?: string;
  data?: any;
};

type Store = {
  navigate: (url: string) => void;
  transitionStateTo: TransitionState;
  transitionStateFrom: TransitionState;
  transitionConfig: TransitionConfig | null;
  exitDone: () => void;
  enterDone: () => void;
  from: string;
  to: string;
  data: any;
  onEnteringCount: number;
  onExitingCount: number;
  applyTransitionConfig: () => void;
};

const store = create<Store>((set) => ({
  navigate: undefined,
  transitionStateTo: "suspended",
  transitionStateFrom: "suspended",
  transitionConfig: null,
  exitDone: () => {},
  enterDone: () => {},
  from: null,
  to: null,
  data: null,
  onEnteringCount: 0,
  onExitingCount: 0,
  applyTransitionConfig: () =>
    set((state) => ({
      data: state.transitionConfig?.data,
      transitionConfig: null,
    })),
}));

const useStore = createHook<Store>(store);

//////////////////////////////////////////////////////
// usePageTransition hook
//////////////////////////////////////////////////////

interface usePageTransitionProps {
  onAppear?: (state?: { data?: any }) => void;
  onAppearing?: (state?: { data?: any; done: () => void }) => void;
  onAppeared?: (state?: { data?: any }) => void;
  onEnter?: (state?: { from: string; data?: any }) => void;
  onEntering?: (state?: {
    from: string;
    to: string;
    data?: any;
    done: () => void;
  }) => void;
  onEntered?: (state?: { from: string; data?: any }) => void;
  onExit?: (state?: { to: string; data?: any }) => void;
  onExiting?: (state?: {
    from: string;
    to: string;
    data?: any;
    done: () => void;
  }) => void;
}

export function usePageTransition({
  onAppear,
  onAppearing,
  onAppeared,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
}: usePageTransitionProps = {}) {
  const pageContext = useContext(PageContext);
  const transitionStateTo = useStore((s) => s.transitionStateTo);
  const transitionStateFrom = useStore((s) => s.transitionStateFrom);

  const enterDone = useStore((s) => s.enterDone);
  const exitDone = useStore((s) => s.exitDone);
  const from = useStore((s) => s.from);
  const to = useStore((s) => s.to);
  const data = useStore((s) => s.data);

  const isEnteringPage = pageContext === store.getState().to;
  const isExitingPage = pageContext === store.getState().from;

  // keep track of registered callbacks
  useLayoutEffect(() => {
    if (isEnteringPage && !!onEntering) {
      store.setState({ onEnteringCount: store.getState().onEnteringCount + 1 });
    }
    return () => {
      if (isEnteringPage && !!onEntering) {
        store.setState({
          onEnteringCount: store.getState().onEnteringCount - 1,
        });
      }
    };
  }, [isEnteringPage, onEntering]);

  // keep track of registered callbacks
  useLayoutEffect(() => {
    if (isExitingPage && !!onExiting) {
      store.setState({ onExitingCount: store.getState().onExitingCount + 1 });
    }
    return () => {
      if (isExitingPage && !!onExiting) {
        store.setState({
          onExitingCount: store.getState().onExitingCount - 1,
        });
      }
    };
  }, [isExitingPage, onExiting]);

  // Trigger callbacks on "to" page
  useLayoutEffect(
    function triggerEnterCallbacks() {
      if (isEnteringPage) {
        if (transitionStateTo === "appear") {
          onAppear?.();
        } else if (transitionStateTo === "appearing") {
          onAppearing?.({ done: enterDone });
        } else if (transitionStateTo === "appeared") {
          onAppeared?.();
        } else if (transitionStateTo === "enter") {
          onEnter?.({ from: store.getState().from });
        } else if (transitionStateTo === "entering") {
          onEntering?.({
            from: store.getState().from,
            to: store.getState().to,
            done: enterDone,
            data: store.getState().data,
          });
        } else if (transitionStateTo === "entered") {
          onEntered?.({ from: store.getState().from });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transitionStateTo] // only trigger on transition state change
  );

  // Trigger exirt callbacks on "from" page
  useLayoutEffect(
    function triggerExitCallbacks() {
      if (isExitingPage) {
        if (transitionStateFrom === "exit") {
          onExit?.({ to: store.getState().to });
        } else if (transitionStateFrom === "exiting") {
          onExiting?.({
            from: store.getState().from,
            to: store.getState().to,
            done: exitDone,
            data: store.getState().data,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transitionStateFrom] // only trigger on transition state change
  );

  // Return state from hook
  if (pageContext === "both") {
    // hook used outside of page context
    return {
      transitionStateTo,
      transitionStateFrom,
      from,
      to,
      data,
    };
  } else {
    // hook used inside a page context
    return {
      transitionState: isEnteringPage ? transitionStateTo : transitionStateFrom,
      from,
      to,
      data,
    };
  }
}

//////////////////////////////////////////////////////
// PageTransitions wrapper
//////////////////////////////////////////////////////

interface PageTransitionProps {
  children: ReactNode;
  pageName: string; // used as unique pathname
  mode?: TransitionMode;
  className?: string;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
  detectAnimationEnd?: boolean;
  detectTransitionEnd?: boolean;
  navigate?: (url: string) => void;
}

function pathToHypen(path: string) {
  const h = path.replace(/\//g, "-");
  return h.startsWith("-") ? h.substring(1) : h;
}

function PageWrapper({
  children,
  pathname,
  className,
  timeout,
  detectAnimationEnd,
  detectTransitionEnd,
  ...props
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isFirstAppear = !store.getState().from;

  return (
    <Suspense
      fallback={
        <div
          className={`${className} ${className}-${pathToHypen(
            pathname
          )} ${className}-${isFirstAppear ? "appear" : "enter"}-suspended`}
        />
      }
    >
      <CSSTransition
        nodeRef={ref}
        key={pathname}
        addEndListener={(done: () => void) => {
          if (!ref.current) return;

          // are we the entering page or leaving page?
          const isEnteringPage = pathname === store.getState().to;
          const isExitingPage = pathname === store.getState().from;

          // Attachs CSS listeners unless user has registered callbacks
          if (
            (isEnteringPage && store.getState().onEnteringCount === 0) ||
            (isExitingPage && store.getState().onExitingCount === 0)
          ) {
            if (detectAnimationEnd) {
              ref.current.addEventListener("animationend", done, false);
            }
            if (detectTransitionEnd) {
              ref.current.addEventListener("transitionend", done, false);
            }
          }

          if (isEnteringPage) {
            store.setState({ enterDone: done });
          } else if (isExitingPage) {
            store.setState({ exitDone: done });
          }
        }}
        timeout={timeout}
        classNames={className}
        appear={true}
        unmountOnExit
        {...props}
        onEnter={(isAppearing) => {
          store.setState({
            transitionStateTo: isAppearing ? "appear" : "enter",
          });
          if (props.onEnter) props.onEnter();
        }}
        onEntering={(isAppearing) => {
          store.setState({
            transitionStateTo: isAppearing ? "appearing" : "entering",
          });
          if (props.onEntering) props.onEntering();
        }}
        onEntered={(isAppearing) => {
          store.setState({
            transitionStateTo: isAppearing ? "appeared" : "entered",
          });
          if (props.onEntered) props.onEntered();
        }}
        onExit={() => {
          store.setState({ transitionStateFrom: "exit" });
          if (props.onExit) props.onExit();
        }}
        onExiting={() => {
          store.setState({ transitionStateFrom: "exiting" });
          if (props.onExiting) props.onExiting();
        }}
        onExited={() => {
          store.setState({ transitionStateFrom: "exited" });
          if (props.onExited) props.onExited();
        }}
      >
        <div
          className={`${className} ${className}-${pathToHypen(pathname)}`}
          ref={ref}
        >
          <PageContext.Provider value={pathname}>
            {children}
          </PageContext.Provider>
        </div>
      </CSSTransition>
    </Suspense>
  );
}

export function PageTransitions({
  children,
  pageName,
  mode = "out-in",
  className = "page",
  timeout,
  detectAnimationEnd = true,
  detectTransitionEnd = true,
}: PageTransitionProps) {
  const pathname = pageName;

  useMemo(() => {
    // update store.to before next child render
    store.getState().to = pathname;
    store.getState().transitionStateTo = "suspended";
    store.getState().transitionStateFrom = "suspended";
  }, [pathname]);

  // entering pathname
  useLayoutEffect(() => {
    // can we use setState instead of raw access in useMemo above?
    // store.setState({
    //   to: pathname,
    //   transitionStateTo: "mount",
    //   transitionStateFrom: "mount"
    // });

    // set temporary transtion data for this navigation
    store.getState().applyTransitionConfig();

    return () => {
      // leaving pathname
      store.setState({ from: pathname });
    };
  }, [pathname]);

  function renderPage() {
    return (
      <PageWrapper
        key={pathname}
        pathname={pathname}
        className={className}
        timeout={timeout}
        detectAnimationEnd={detectAnimationEnd}
        detectTransitionEnd={detectTransitionEnd}
      >
        {children}
      </PageWrapper>
    );
  }

  function renderSwitchTransition(mode) {
    return <SwitchTransition mode={mode}>{renderPage()}</SwitchTransition>;
  }

  function renderSyncTransition() {
    return (
      <TransitionGroup component={null} appear enter exit>
        {renderPage()}
      </TransitionGroup>
    );
  }

  return (
    <>
      {mode === "sync" ? renderSyncTransition() : renderSwitchTransition(mode)}
    </>
  );
}

export function setPageTransitionData(data: any) {
  store.setState({ transitionConfig: { data } });
}
