import { ReactNode } from "react";
export declare type TransitionMode = "out-in" | "in-out" | "sync";
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
}
export declare function PageTransitions({ children, pageName, mode, className, timeout, detectAnimationEnd, detectTransitionEnd, }: PageTransitionProps): JSX.Element;
export declare function setPageTransitionData(data: any): void;
export {};
