import{S as A,R as q,T as M,V as g,W as C,I as b,U as d,X as o,Y as N,y as Z,Z as $,_ as j,$ as G,a0 as V,a1 as z,K,a2 as W,a3 as X,a4 as F,a5 as H,C as U,a6 as J,a7 as Q,B as k,a8 as p,a9 as ee,aa as re}from"./B3YhPM-y.js";function h(r,i=null,y){if(typeof r!="object"||r===null||A in r)return r;const P=j(r);if(P!==q&&P!==M)return r;var u=new Map,c=G(r),w=g(0);c&&u.set("length",g(r.length));var I;return new Proxy(r,{defineProperty(f,e,n){(!("value"in n)||n.configurable===!1||n.enumerable===!1||n.writable===!1)&&$();var a=u.get(e);return a===void 0?(a=g(n.value),u.set(e,a)):o(a,h(n.value,I)),!0},deleteProperty(f,e){var n=u.get(e);if(n===void 0)e in f&&u.set(e,g(d));else{if(c&&typeof e=="string"){var a=u.get("length"),t=Number(e);Number.isInteger(t)&&t<a.v&&o(a,t)}o(n,d),Y(w)}return!0},get(f,e,n){var v;if(e===A)return r;var a=u.get(e),t=e in f;if(a===void 0&&(!t||(v=N(f,e))!=null&&v.writable)&&(a=g(h(t?f[e]:d,I)),u.set(e,a)),a!==void 0){var s=b(a);return s===d?void 0:s}return Reflect.get(f,e,n)},getOwnPropertyDescriptor(f,e){var n=Reflect.getOwnPropertyDescriptor(f,e);if(n&&"value"in n){var a=u.get(e);a&&(n.value=b(a))}else if(n===void 0){var t=u.get(e),s=t==null?void 0:t.v;if(t!==void 0&&s!==d)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return n},has(f,e){var s;if(e===A)return!0;var n=u.get(e),a=n!==void 0&&n.v!==d||Reflect.has(f,e);if(n!==void 0||Z!==null&&(!a||(s=N(f,e))!=null&&s.writable)){n===void 0&&(n=g(a?h(f[e],I):d),u.set(e,n));var t=b(n);if(t===d)return!1}return a},set(f,e,n,a){var R;var t=u.get(e),s=e in f;if(c&&e==="length")for(var v=n;v<t.v;v+=1){var m=u.get(v+"");m!==void 0?o(m,d):v in f&&(m=g(d),u.set(v+"",m))}t===void 0?(!s||(R=N(f,e))!=null&&R.writable)&&(t=g(void 0),o(t,h(n,I)),u.set(e,t)):(s=t.v!==d,o(t,h(n,I)));var _=Reflect.getOwnPropertyDescriptor(f,e);if(_!=null&&_.set&&_.set.call(a,n),!s){if(c&&typeof e=="string"){var O=u.get("length"),x=Number(e);Number.isInteger(x)&&x>=O.v&&o(O,x+1)}Y(w)}return!0},ownKeys(f){b(w);var e=Reflect.ownKeys(f).filter(t=>{var s=u.get(t);return s===void 0||s.v!==d});for(var[n,a]of u)a.v!==d&&!(n in f)&&e.push(n);return e},setPrototypeOf(){C()}})}function Y(r,i=1){o(r,r.v+i)}let E=!1;function ne(r){var i=E;try{return E=!1,[r(),E]}finally{E=i}}const te={get(r,i){if(!r.exclude.includes(i))return r.props[i]},set(r,i){return!1},getOwnPropertyDescriptor(r,i){if(!r.exclude.includes(i)&&i in r.props)return{enumerable:!0,configurable:!0,value:r.props[i]}},has(r,i){return r.exclude.includes(i)?!1:i in r.props},ownKeys(r){return Reflect.ownKeys(r.props).filter(i=>!r.exclude.includes(i))}};function ie(r,i,y){return new Proxy({props:r,exclude:i},te)}function fe(r,i,y,P){var B;var u=(y&ee)!==0,c=!k||(y&p)!==0,w=(y&J)!==0,I=(y&re)!==0,f=!1,e;w?[e,f]=ne(()=>r[i]):e=r[i];var n=A in r||Q in r,a=w&&(((B=N(r,i))==null?void 0:B.set)??(n&&i in r&&(l=>r[i]=l)))||void 0,t=P,s=!0,v=!1,m=()=>(v=!0,s&&(s=!1,I?t=U(P):t=P),t);e===void 0&&P!==void 0&&(a&&c&&V(),e=m(),a&&a(e));var _;if(c)_=()=>{var l=r[i];return l===void 0?m():(s=!0,v=!1,l)};else{var O=(u?K:W)(()=>r[i]);O.f|=z,_=()=>{var l=b(O);return l!==void 0&&(t=void 0),l===void 0?t:l}}if((y&X)===0)return _;if(a){var x=r.$$legacy;return function(l,S){return arguments.length>0?((!c||!S||x||f)&&a(S?_():l),l):_()}}var R=!1,L=H(e),D=K(()=>{var l=_(),S=b(L);return R?(R=!1,S):L.v=l});return u||(D.equals=F),function(l,S){if(arguments.length>0){const T=S?b(D):c&&w?h(l):l;return D.equals(T)||(R=!0,o(L,T),v&&t!==void 0&&(t=T),U(()=>b(D))),l}return b(D)}}export{h as a,fe as p,ie as r};
