// https://ncjamieson.com/dont-export-const-enums/
export enum TransitionState {
  SUSPENDED = "suspended", // waiting to mount or suspended
  APPEAR = "appear",
  APPEARING = "appearing",
  APPEARED = "appeared",
  EXIT = "exit",
  EXITING = "exiting",
  EXITED = "exited",
  ENTER = "enter",
  ENTERING = "entering",
  ENTERED = "entered",
}
