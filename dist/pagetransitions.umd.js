!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("react"),require("zustand/vanilla"),require("zustand"),require("react-transition-group"),require("react/jsx-runtime")):"function"==typeof define&&define.amd?define(["exports","react","zustand/vanilla","zustand","react-transition-group","react/jsx-runtime"],n):n((t||self).reactPageTransitions={},t.react,t["zustand/vanilla"],t.zustand,t.reactTransitionGroup,t.jsx)}(this,function(t,n,e,i,a,o){function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var u,s=/*#__PURE__*/r(e),d=/*#__PURE__*/r(i);t.TransitionState=void 0,(u=t.TransitionState||(t.TransitionState={})).SUSPENDED="suspended",u.APPEAR="appear",u.APPEARING="appearing",u.APPEARED="appeared",u.EXIT="exit",u.EXITING="exiting",u.EXITED="exited",u.ENTER="enter",u.ENTERING="entering",u.ENTERED="entered";var c=s.default(function(n){return{transitionStateTo:t.TransitionState.SUSPENDED,transitionStateFrom:t.TransitionState.SUSPENDED,transitionConfig:null,exitDone:function(){},enterDone:function(){},from:null,to:null,data:null,onEnteringCount:0,onExitingCount:0,applyTransitionConfig:function(){return n(function(t){var n;return{data:null==(n=t.transitionConfig)?void 0:n.data,transitionConfig:null}})},suspendedRoute:null}}),f=d.default(c),E="undefined"!=typeof window?n.useLayoutEffect:n.useEffect,S=/*#__PURE__*/n.createContext("both");function l(){return l=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},l.apply(this,arguments)}function g(t){var n=t.replace(/\//g,"-");return n.startsWith("-")?n.substring(1):n}var p=["children","pathname","className","timeout","detectAnimationEnd","detectTransitionEnd"],m=function(t){var e=t.pathname,i=t.className,a=!c.getState().from;return n.useEffect(function(){return c.setState({suspendedRoute:e}),function(){c.setState({suspendedRoute:null})}},[]),/*#__PURE__*/o.jsx("div",{className:i+" "+i+"-"+g(e)+" "+i+"-"+(a?"appear":"enter")+"-suspended"})};function T(e){var i=e.children,r=e.pathname,u=e.className,s=e.timeout,d=e.detectAnimationEnd,f=e.detectTransitionEnd,E=function(t,n){if(null==t)return{};var e,i,a={},o=Object.keys(t);for(i=0;i<o.length;i++)n.indexOf(e=o[i])>=0||(a[e]=t[e]);return a}(e,p),T=n.useRef(null);/*#__PURE__*/return o.jsx(n.Suspense,{fallback:/*#__PURE__*/o.jsx(m,{pathname:r,className:u}),children:/*#__PURE__*/o.jsx(a.CSSTransition,l({nodeRef:T,addEndListener:function(t){if(T.current){var n=r===c.getState().to,e=r===c.getState().from;(n&&0===c.getState().onEnteringCount||e&&0===c.getState().onExitingCount)&&(d&&T.current.addEventListener("animationend",t,!1),f&&T.current.addEventListener("transitionend",t,!1)),n?c.setState({enterDone:t}):e&&c.setState({exitDone:t})}},timeout:s,classNames:u,appear:!0,unmountOnExit:!0},E,{onEnter:function(n){c.setState({transitionStateTo:n?t.TransitionState.APPEAR:t.TransitionState.ENTER}),E.onEnter&&E.onEnter()},onEntering:function(n){c.setState({transitionStateTo:n?t.TransitionState.APPEARING:t.TransitionState.ENTERING}),E.onEntering&&E.onEntering()},onEntered:function(n){c.setState({transitionStateTo:n?t.TransitionState.APPEARED:t.TransitionState.ENTERED}),E.onEntered&&E.onEntered()},onExit:function(){c.setState({transitionStateFrom:t.TransitionState.EXIT}),E.onExit&&E.onExit()},onExiting:function(){c.setState({transitionStateFrom:t.TransitionState.EXITING}),E.onExiting&&E.onExiting()},onExited:function(){c.setState({transitionStateFrom:t.TransitionState.EXITED}),E.onExited&&E.onExited()},children:/*#__PURE__*/o.jsx("div",{className:u+" "+u+"-"+g(r),ref:T,children:/*#__PURE__*/o.jsx(S.Provider,{value:r,children:i})})}),r)})}t.PageContext=S,t.PageTransitions=function(e){var i=e.children,r=e.mode,u=void 0===r?"out-in":r,s=e.className,d=void 0===s?"page":s,f=e.timeout,S=e.detectAnimationEnd,l=void 0===S||S,g=e.detectTransitionEnd,p=void 0===g||g,m=e.pageName;function x(){/*#__PURE__*/return o.jsx(T,{pathname:m,className:d,timeout:f,detectAnimationEnd:l,detectTransitionEnd:p,children:i},m)}n.useMemo(function(){c.getState().to=m,c.getState().transitionStateTo=t.TransitionState.SUSPENDED,c.getState().transitionStateFrom=t.TransitionState.SUSPENDED},[m]),E(function(){return c.getState().applyTransitionConfig(),function(){c.setState({from:m})}},[m]);var v=n.useState(0),h=v[0],N=v[1];return E(function(){var t=c.getState().suspendedRoute;t&&m!==t&&N(h+1)},[m,h,N]),/*#__PURE__*/o.jsx(n.Fragment,{children:"sync"===u?/*#__PURE__*/o.jsx(a.TransitionGroup,{component:null,appear:!0,enter:!0,exit:!0,children:x()}):function(t){/*#__PURE__*/return o.jsx(a.SwitchTransition,{mode:t,children:x()})}(u)},h)},t.setPageTransitionData=function(t){c.setState({transitionConfig:{data:t}})},t.usePageTransition=function(t){var e=void 0===t?{}:t,i=e.onAppear,a=e.onAppearing,o=e.onAppeared,r=e.onEnter,u=e.onEntering,s=e.onEntered,d=e.onExit,l=e.onExiting,g=n.useContext(S),p=f(function(t){return t.transitionStateTo}),m=f(function(t){return t.transitionStateFrom}),T=f(function(t){return t.enterDone}),x=f(function(t){return t.exitDone}),v=f(function(t){return t.from}),h=f(function(t){return t.to}),N=f(function(t){return t.data}),P=g===c.getState().to,D=g===c.getState().from;return E(function(){return P&&u&&c.setState({onEnteringCount:c.getState().onEnteringCount+1}),function(){P&&u&&c.setState({onEnteringCount:c.getState().onEnteringCount-1})}},[P,u]),E(function(){return D&&l&&c.setState({onExitingCount:c.getState().onExitingCount+1}),function(){D&&l&&c.setState({onExitingCount:c.getState().onExitingCount-1})}},[D,l]),n.useEffect(function(){P&&("appear"===p?null==i||i():"appearing"===p?null==a||a({done:T}):"appeared"===p?null==o||o():"enter"===p?null==r||r({from:c.getState().from}):"entering"===p?null==u||u({from:c.getState().from,to:c.getState().to,done:T,data:c.getState().data}):"entered"===p&&(null==s||s({from:c.getState().from})))},[p]),E(function(){D&&("exit"===m?null==d||d({to:c.getState().to}):"exiting"===m&&(null==l||l({from:c.getState().from,to:c.getState().to,done:x,data:c.getState().data})))},[m]),"both"===g?{transitionStateTo:p,transitionStateFrom:m,from:v,to:h,data:N}:{transitionState:P?p:m,from:v,to:h,data:N}}});
//# sourceMappingURL=pagetransitions.umd.js.map
