import { ReactNode, useLayoutEffect, useMemo } from "react";
import { SwitchTransition, TransitionGroup } from "react-transition-group";

import { store, TransitionState, TransitionConfig } from "./store";
import { PageWrapper } from "./PageWrapper";

export type TransitionMode = "out-in" | "in-out" | "sync";

interface PageTransitionProps {
  children: ReactNode;
  pageName: string; // used as unique pathname
  mode?: TransitionMode;
  className?: string;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
  detectAnimationEnd?: boolean;
  detectTransitionEnd?: boolean;
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
    store.getState().transitionStateTo = TransitionState.SUSPENDED;
    store.getState().transitionStateFrom = TransitionState.SUSPENDED;
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

  function renderSwitchTransition(mode: "out-in" | "in-out") {
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
