import { ReactNode } from "react";
interface PageWrapperProps {
    children: ReactNode;
    pathname: string;
    className?: string;
    timeout?: number | {
        enter?: number;
        exit?: number;
        appear?: number;
    };
    detectAnimationEnd?: boolean;
    detectTransitionEnd?: boolean;
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
}
export declare function PageWrapper({ children, pathname, className, timeout, detectAnimationEnd, detectTransitionEnd, ...props }: PageWrapperProps): JSX.Element;
export {};
