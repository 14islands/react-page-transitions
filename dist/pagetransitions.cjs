var t=require("zustand/vanilla"),n=require("zustand"),e=require("react"),o=require("react-transition-group"),i=require("react/jsx-runtime");function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var a,s=/*#__PURE__*/r(t),u=/*#__PURE__*/r(n);exports.TransitionState=void 0,(a=exports.TransitionState||(exports.TransitionState={})).SUSPENDED="suspended",a.APPEAR="appear",a.APPEARING="appearing",a.APPEARED="appeared",a.EXIT="exit",a.EXITING="exiting",a.EXITED="exited",a.ENTER="enter",a.ENTERING="entering",a.ENTERED="entered";var E=s.default(function(t){return{transitionStateTo:exports.TransitionState.SUSPENDED,transitionStateFrom:exports.TransitionState.SUSPENDED,transitionConfig:null,exitDone:function(){},enterDone:function(){},from:null,to:null,data:null,onEnteringCount:0,onExitingCount:0,applyTransitionConfig:function(){return t(function(t){var n;return{data:null==(n=t.transitionConfig)?void 0:n.data,transitionConfig:null}})}}}),c=u.default(E),d=/*#__PURE__*/e.createContext("both");function f(){return f=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},f.apply(this,arguments)}function S(t){var n=t.replace(/\//g,"-");return n.startsWith("-")?n.substring(1):n}var g=["children","pathname","className","timeout","detectAnimationEnd","detectTransitionEnd"];function l(t){var n=t.children,r=t.pathname,a=t.className,s=t.timeout,u=t.detectAnimationEnd,c=t.detectTransitionEnd,l=function(t,n){if(null==t)return{};var e,o,i={},r=Object.keys(t);for(o=0;o<r.length;o++)n.indexOf(e=r[o])>=0||(i[e]=t[e]);return i}(t,g),p=e.useRef(null),x=!E.getState().from;/*#__PURE__*/return i.jsx(e.Suspense,{fallback:/*#__PURE__*/i.jsx(function(){/*#__PURE__*/return i.jsx("div",{className:a+" "+a+"-"+S(r)+" "+a+"-"+(x?"appear":"enter")+"-suspended"})},{}),children:/*#__PURE__*/i.jsx(o.CSSTransition,f({nodeRef:p,addEndListener:function(t){if(p.current){var n=r===E.getState().to,e=r===E.getState().from;(n&&0===E.getState().onEnteringCount||e&&0===E.getState().onExitingCount)&&(u&&p.current.addEventListener("animationend",t,!1),c&&p.current.addEventListener("transitionend",t,!1)),n?E.setState({enterDone:t}):e&&E.setState({exitDone:t})}},timeout:s,classNames:a,appear:!0,unmountOnExit:!0},l,{onEnter:function(t){E.setState({transitionStateTo:t?exports.TransitionState.APPEAR:exports.TransitionState.ENTER}),l.onEnter&&l.onEnter()},onEntering:function(t){E.setState({transitionStateTo:t?exports.TransitionState.APPEARING:exports.TransitionState.ENTERING}),l.onEntering&&l.onEntering()},onEntered:function(t){E.setState({transitionStateTo:t?exports.TransitionState.APPEARED:exports.TransitionState.ENTERED}),l.onEntered&&l.onEntered()},onExit:function(){E.setState({transitionStateFrom:exports.TransitionState.EXIT}),l.onExit&&l.onExit()},onExiting:function(){E.setState({transitionStateFrom:exports.TransitionState.EXITING}),l.onExiting&&l.onExiting()},onExited:function(){E.setState({transitionStateFrom:exports.TransitionState.EXITED}),l.onExited&&l.onExited()},children:/*#__PURE__*/i.jsxs("div",{className:a+" "+a+"-"+S(r),ref:p,children:["export"," ",/*#__PURE__*/i.jsxs(d.Provider,{value:r,children:[n,"export"," "]})]})}),r)})}exports.PageTransitions=function(t){var n=t.children,r=t.mode,a=void 0===r?"out-in":r,s=t.className,u=void 0===s?"page":s,c=t.timeout,d=t.detectAnimationEnd,f=void 0===d||d,S=t.detectTransitionEnd,g=void 0===S||S,p=t.pageName;function x(){/*#__PURE__*/return i.jsx(l,{pathname:p,className:u,timeout:c,detectAnimationEnd:f,detectTransitionEnd:g,children:n},p)}return e.useMemo(function(){E.getState().to=p,E.getState().transitionStateTo=exports.TransitionState.SUSPENDED,E.getState().transitionStateFrom=exports.TransitionState.SUSPENDED},[p]),e.useLayoutEffect(function(){return E.getState().applyTransitionConfig(),function(){E.setState({from:p})}},[p]),/*#__PURE__*/i.jsx(i.Fragment,{children:"sync"===a?/*#__PURE__*/i.jsx(o.TransitionGroup,{component:null,appear:!0,enter:!0,exit:!0,children:x()}):function(t){/*#__PURE__*/return i.jsx(o.SwitchTransition,{mode:t,children:x()})}(a)})},exports.setPageTransitionData=function(t){E.setState({transitionConfig:{data:t}})},exports.usePageTransition=function(t){var n=void 0===t?{}:t,o=n.onAppear,i=n.onAppearing,r=n.onAppeared,a=n.onEnter,s=n.onEntering,u=n.onEntered,f=n.onExit,S=n.onExiting,g=e.useContext(d),l=c(function(t){return t.transitionStateTo}),p=c(function(t){return t.transitionStateFrom}),x=c(function(t){return t.enterDone}),m=c(function(t){return t.exitDone}),T=c(function(t){return t.from}),v=c(function(t){return t.to}),N=c(function(t){return t.data}),D=g===E.getState().to,h=g===E.getState().from;return e.useLayoutEffect(function(){return D&&s&&E.setState({onEnteringCount:E.getState().onEnteringCount+1}),function(){D&&s&&E.setState({onEnteringCount:E.getState().onEnteringCount-1})}},[D,s]),e.useLayoutEffect(function(){return h&&S&&E.setState({onExitingCount:E.getState().onExitingCount+1}),function(){h&&S&&E.setState({onExitingCount:E.getState().onExitingCount-1})}},[h,S]),e.useLayoutEffect(function(){D&&("appear"===l?null==o||o():"appearing"===l?null==i||i({done:x}):"appeared"===l?null==r||r():"enter"===l?null==a||a({from:E.getState().from}):"entering"===l?null==s||s({from:E.getState().from,to:E.getState().to,done:x,data:E.getState().data}):"entered"===l&&(null==u||u({from:E.getState().from})))},[l]),e.useLayoutEffect(function(){h&&("exit"===p?null==f||f({to:E.getState().to}):"exiting"===p&&(null==S||S({from:E.getState().from,to:E.getState().to,done:m,data:E.getState().data})))},[p]),"both"===g?{transitionStateTo:l,transitionStateFrom:p,from:T,to:v,data:N}:{transitionState:D?l:p,from:T,to:v,data:N}};
//# sourceMappingURL=pagetransitions.cjs.map
