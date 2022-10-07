import { store, useStore } from "./store";
import { useContext } from "react";

import { useLayoutEffect } from "./useIsomorphicLayoutEffect";
import { PageContext } from "./context";

interface usePageTransitionProps {
  onAppear?: (state?: { data?: any }) => void;
  onAppearing?: (state?: { data?: any; done: () => void }) => void;
  onAppeared?: (state?: { data?: any }) => void;
  onEnter?: (state?: { from: string | null; data?: any }) => void;
  onEntering?: (state?: {
    from: string | null;
    to: string | null;
    data?: any;
    done: () => void;
  }) => void;
  onEntered?: (state?: { from: string | null; data?: any }) => void;
  onExit?: (state?: { to: string | null; data?: any }) => void;
  onExiting?: (state?: {
    from: string | null;
    to: string | null;
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
