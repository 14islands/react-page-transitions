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
        from: string | null;
        data?: any;
    }) => void;
    onEntering?: (state?: {
        from: string | null;
        to: string | null;
        data?: any;
        done: () => void;
    }) => void;
    onEntered?: (state?: {
        from: string | null;
        data?: any;
    }) => void;
    onExit?: (state?: {
        to: string | null;
        data?: any;
    }) => void;
    onExiting?: (state?: {
        from: string | null;
        to: string | null;
        data?: any;
        done: () => void;
    }) => void;
}
export declare function usePageTransition({ onAppear, onAppearing, onAppeared, onEnter, onEntering, onEntered, onExit, onExiting, }?: usePageTransitionProps): {
    transitionStateTo: import("./enums").TransitionState;
    transitionStateFrom: import("./enums").TransitionState;
    from: string | null;
    to: string | null;
    data: any;
    transitionState?: undefined;
} | {
    transitionState: import("./enums").TransitionState;
    from: string | null;
    to: string | null;
    data: any;
    transitionStateTo?: undefined;
    transitionStateFrom?: undefined;
};
export {};
