import create from "zustand/vanilla";
import createHook from "zustand";

import { TransitionState } from "./enums";

export type TransitionConfig = {
  from?: string;
  to?: string;
  data?: any;
};

type Store = {
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

const store = create<Store>((set) => ({
  transitionStateTo: TransitionState.SUSPENDED,
  transitionStateFrom: TransitionState.SUSPENDED,
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

export { store, useStore };
