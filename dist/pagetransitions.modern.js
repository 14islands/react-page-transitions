import t from"zustand/vanilla";import n from"zustand";import{createContext as e,useContext as o,useLayoutEffect as a,useRef as i,Suspense as r,useMemo as E}from"react";import{CSSTransition as s,TransitionGroup as d,SwitchTransition as u}from"react-transition-group";import{jsx as g,jsxs as l,Fragment as S}from"react/jsx-runtime";var c;!function(t){t.SUSPENDED="suspended",t.APPEAR="appear",t.APPEARING="appearing",t.APPEARED="appeared",t.EXIT="exit",t.EXITING="exiting",t.EXITED="exited",t.ENTER="enter",t.ENTERING="entering",t.ENTERED="entered"}(c||(c={}));const m=t(t=>({transitionStateTo:c.SUSPENDED,transitionStateFrom:c.SUSPENDED,transitionConfig:null,exitDone:()=>{},enterDone:()=>{},from:null,to:null,data:null,onEnteringCount:0,onExitingCount:0,applyTransitionConfig:()=>t(t=>{var n;return{data:null==(n=t.transitionConfig)?void 0:n.data,transitionConfig:null}})})),p=n(m),f=/*#__PURE__*/e("both");function x({onAppear:t,onAppearing:n,onAppeared:e,onEnter:i,onEntering:r,onEntered:E,onExit:s,onExiting:d}={}){const u=o(f),g=p(t=>t.transitionStateTo),l=p(t=>t.transitionStateFrom),S=p(t=>t.enterDone),c=p(t=>t.exitDone),x=p(t=>t.from),N=p(t=>t.to),T=p(t=>t.data),D=u===m.getState().to,h=u===m.getState().from;return a(()=>(D&&r&&m.setState({onEnteringCount:m.getState().onEnteringCount+1}),()=>{D&&r&&m.setState({onEnteringCount:m.getState().onEnteringCount-1})}),[D,r]),a(()=>(h&&d&&m.setState({onExitingCount:m.getState().onExitingCount+1}),()=>{h&&d&&m.setState({onExitingCount:m.getState().onExitingCount-1})}),[h,d]),a(function(){D&&("appear"===g?null==t||t():"appearing"===g?null==n||n({done:S}):"appeared"===g?null==e||e():"enter"===g?null==i||i({from:m.getState().from}):"entering"===g?null==r||r({from:m.getState().from,to:m.getState().to,done:S,data:m.getState().data}):"entered"===g&&(null==E||E({from:m.getState().from})))},[g]),a(function(){h&&("exit"===l?null==s||s({to:m.getState().to}):"exiting"===l&&(null==d||d({from:m.getState().from,to:m.getState().to,done:c,data:m.getState().data})))},[l]),"both"===u?{transitionStateTo:g,transitionStateFrom:l,from:x,to:N,data:T}:{transitionState:D?g:l,from:x,to:N,data:T}}function N(){return N=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},N.apply(this,arguments)}function T(t){const n=t.replace(/\//g,"-");return n.startsWith("-")?n.substring(1):n}const D=["children","pathname","className","timeout","detectAnimationEnd","detectTransitionEnd"];function h(t){let{children:n,pathname:e,className:o,timeout:a,detectAnimationEnd:E,detectTransitionEnd:d}=t,u=function(t,n){if(null==t)return{};var e,o,a={},i=Object.keys(t);for(o=0;o<i.length;o++)n.indexOf(e=i[o])>=0||(a[e]=t[e]);return a}(t,D);const S=i(null),p=!m.getState().from;/*#__PURE__*/return g(r,{fallback:/*#__PURE__*/g(()=>/*#__PURE__*/g("div",{className:`${o} ${o}-${T(e)} ${o}-${p?"appear":"enter"}-suspended`}),{}),children:/*#__PURE__*/g(s,N({nodeRef:S,addEndListener:t=>{if(!S.current)return;const n=e===m.getState().to,o=e===m.getState().from;(n&&0===m.getState().onEnteringCount||o&&0===m.getState().onExitingCount)&&(E&&S.current.addEventListener("animationend",t,!1),d&&S.current.addEventListener("transitionend",t,!1)),n?m.setState({enterDone:t}):o&&m.setState({exitDone:t})},timeout:a,classNames:o,appear:!0,unmountOnExit:!0},u,{onEnter:t=>{m.setState({transitionStateTo:t?c.APPEAR:c.ENTER}),u.onEnter&&u.onEnter()},onEntering:t=>{m.setState({transitionStateTo:t?c.APPEARING:c.ENTERING}),u.onEntering&&u.onEntering()},onEntered:t=>{m.setState({transitionStateTo:t?c.APPEARED:c.ENTERED}),u.onEntered&&u.onEntered()},onExit:()=>{m.setState({transitionStateFrom:c.EXIT}),u.onExit&&u.onExit()},onExiting:()=>{m.setState({transitionStateFrom:c.EXITING}),u.onExiting&&u.onExiting()},onExited:()=>{m.setState({transitionStateFrom:c.EXITED}),u.onExited&&u.onExited()},children:/*#__PURE__*/l("div",{className:`${o} ${o}-${T(e)}`,ref:S,children:["export"," ",/*#__PURE__*/l(f.Provider,{value:e,children:[n,"export"," "]})]})}),e)})}function A({children:t,pageName:n,mode:e="out-in",className:o="page",timeout:i,detectAnimationEnd:r=!0,detectTransitionEnd:s=!0}){const l=n;function p(){/*#__PURE__*/return g(h,{pathname:l,className:o,timeout:i,detectAnimationEnd:r,detectTransitionEnd:s,children:t},l)}return E(()=>{m.getState().to=l,m.getState().transitionStateTo=c.SUSPENDED,m.getState().transitionStateFrom=c.SUSPENDED},[l]),a(()=>(m.getState().applyTransitionConfig(),()=>{m.setState({from:l})}),[l]),/*#__PURE__*/g(S,{children:"sync"===e?/*#__PURE__*/g(d,{component:null,appear:!0,enter:!0,exit:!0,children:p()}):function(t){/*#__PURE__*/return g(u,{mode:t,children:p()})}(e)})}function P(t){m.setState({transitionConfig:{data:t}})}export{A as PageTransitions,P as setPageTransitionData,x as usePageTransition};
//# sourceMappingURL=pagetransitions.modern.js.map
