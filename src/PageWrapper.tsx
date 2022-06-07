import { ReactNode, useRef, Suspense } from "react";
import { CSSTransition } from "react-transition-group";

import { TransitionState } from "./enums";
import { PageContext } from "./context";
import { store } from "./store";
import { pathToHypen } from "./utils";

interface PageWrapperProps {
  children: ReactNode;
  pathname: string; // used as unique pathname
  className?: string;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
  detectAnimationEnd?: boolean;
  detectTransitionEnd?: boolean;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
}

export function PageWrapper({
  children,
  pathname,
  className,
  timeout,
  detectAnimationEnd,
  detectTransitionEnd,
  ...props
}: PageWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFirstAppear = !store.getState().from;

  const Fallback = () => {
    return (
      <div
        className={`${className} ${className}-${pathToHypen(
          pathname
        )} ${className}-${isFirstAppear ? "appear" : "enter"}-suspended`}
      />
    );
  };

  return (
    <Suspense fallback={<Fallback />}>
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
            transitionStateTo: isAppearing
              ? TransitionState.APPEAR
              : TransitionState.ENTER,
          });
          if (props.onEnter) props.onEnter();
        }}
        onEntering={(isAppearing) => {
          store.setState({
            transitionStateTo: isAppearing
              ? TransitionState.APPEARING
              : TransitionState.ENTERING,
          });
          if (props.onEntering) props.onEntering();
        }}
        onEntered={(isAppearing) => {
          store.setState({
            transitionStateTo: isAppearing
              ? TransitionState.APPEARED
              : TransitionState.ENTERED,
          });
          if (props.onEntered) props.onEntered();
        }}
        onExit={() => {
          store.setState({ transitionStateFrom: TransitionState.EXIT });
          if (props.onExit) props.onExit();
        }}
        onExiting={() => {
          store.setState({ transitionStateFrom: TransitionState.EXITING });
          if (props.onExiting) props.onExiting();
        }}
        onExited={() => {
          store.setState({ transitionStateFrom: TransitionState.EXITED });
          if (props.onExited) props.onExited();
        }}
      >
        <div
          className={`${className} ${className}-${pathToHypen(pathname)}`}
          ref={ref}
        >
          export{" "}
          <PageContext.Provider value={pathname}>
            {children}
            export{" "}
          </PageContext.Provider>
        </div>
      </CSSTransition>
    </Suspense>
  );
}
