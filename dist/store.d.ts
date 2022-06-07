export declare enum TransitionState {
    SUSPENDED = "suspended",
    APPEAR = "appear",
    APPEARING = "appearing",
    APPEARED = "appeared",
    EXIT = "exit",
    EXITING = "exiting",
    EXITED = "exited",
    ENTER = "enter",
    ENTERING = "entering",
    ENTERED = "entered"
}
export declare type TransitionConfig = {
    from?: string;
    to?: string;
    data?: any;
};
declare type Store = {
    transitionStateTo: TransitionState;
    transitionStateFrom: TransitionState;
    transitionConfig: TransitionConfig | null;
    exitDone: () => void;
    enterDone: () => void;
    from: string | null;
    to: string | null;
    data: any;
    onEnteringCount: number;
    onExitingCount: number;
    applyTransitionConfig: () => void;
};
declare const store: import("zustand").StoreApi<Store>;
declare const useStore: import("zustand").UseBoundStore<Store, import("zustand").StoreApi<Store>>;
export { store, useStore };
