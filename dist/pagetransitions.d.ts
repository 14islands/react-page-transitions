import { ReactNode } from "react";
declare type TransitionMode = "out-in" | "in-out" | "sync";
declare type TransitionState = "suspended" | "appear" | "appearing" | "appeared" | "exit" | "exiting" | "exited" | "enter" | "entering" | "entered";
interface usePageTransitionProps {
    onAppear?: (state?: {
        data?: any;
    }) => void;
    onAppearing?: (state?: {
        data?: any;
        done: () => void;
    }) => void;
    onAppeared?: (state?: {
        data?: any;
    }) => void;
    onEnter?: (state?: {
        from: string;
        data?: any;
    }) => void;
    onEntering?: (state?: {
        from: string;
        to: string;
        data?: any;
        done: () => void;
    }) => void;
    onEntered?: (state?: {
        from: string;
        data?: any;
    }) => void;
    onExit?: (state?: {
        to: string;
        data?: any;
    }) => void;
    onExiting?: (state?: {
        from: string;
        to: string;
        data?: any;
        done: () => void;
    }) => void;
}
export declare function usePageTransition({ onAppear, onAppearing, onAppeared, onEnter, onEntering, onEntered, onExit, onExiting, }?: usePageTransitionProps): {
    transitionStateTo: TransitionState;
    transitionStateFrom: TransitionState;
    from: string;
    to: string;
    data: any;
    transitionState?: undefined;
} | {
    transitionState: TransitionState;
    from: string;
    to: string;
    data: any;
    transitionStateTo?: undefined;
    transitionStateFrom?: undefined;
};
interface PageTransitionProps {
    children: ReactNode;
    pageName: string;
    mode?: TransitionMode;
    className?: string;
    timeout?: number | {
        enter?: number;
        exit?: number;
        appear?: number;
    };
    detectAnimationEnd?: boolean;
    detectTransitionEnd?: boolean;
    navigate?: (url: string) => void;
}
export declare function PageTransitions({ children, pageName, mode, className, timeout, detectAnimationEnd, detectTransitionEnd, }: PageTransitionProps): JSX.Element;
export declare function setPageTransitionData(data: any): void;
export {};
