!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";(e=>{const t="single-file-lazy-load",n="single-file-load-image",i={family:"font-family",style:"font-style",weight:"font-weight",stretch:"font-stretch",unicodeRange:"unicode-range",variant:"font-variant",featureSettings:"font-feature-settings"},r=(t,n,i)=>e.addEventListener(t,n,i),o=t=>{try{e.dispatchEvent(t)}catch(e){}},l=e.CustomEvent,s=e.document,c=e.screen,d=e.Element,a=e.UIEvent,g=e.Event,f=e.FileReader,_=e.Blob,m=e.console,u=m&&m.warn&&((...e)=>m.warn(...e))||(()=>{}),h=new Map,y=new Map;let p;function F(i){const r=s.scrollingElement||s.documentElement,a=r.clientHeight,f=r.clientWidth,_=Math.max(r.scrollHeight-a,a),m=Math.max(r.scrollWidth-f,f);if(s.querySelectorAll("[loading=lazy]").forEach((e=>{e.loading="eager",e.setAttribute(t,"")})),r.__defineGetter__("clientHeight",(()=>_)),r.__defineGetter__("clientWidth",(()=>m)),c.__defineGetter__("height",(()=>_)),c.__defineGetter__("width",(()=>m)),e._singleFile_innerHeight=e.innerHeight,e._singleFile_innerWidth=e.innerWidth,e.__defineGetter__("innerHeight",(()=>_)),e.__defineGetter__("innerWidth",(()=>m)),i||e._singleFile_getBoundingClientRect||(e._singleFile_getBoundingClientRect=d.prototype.getBoundingClientRect,d.prototype.getBoundingClientRect=function(){const t=e._singleFile_getBoundingClientRect.call(this);return this==r&&(t.__defineGetter__("height",(()=>_)),t.__defineGetter__("bottom",(()=>_+t.top)),t.__defineGetter__("width",(()=>m)),t.__defineGetter__("right",(()=>m+t.left))),t}),!e._singleFileImage){const t=e.Image;e._singleFileImage=e.Image,e.__defineGetter__("Image",(function(){return function(){const e=new t(...arguments),i=new t(...arguments);return i.__defineSetter__("src",(t=>{e.src=t,o(new l(n,{detail:e.src}))})),i.__defineGetter__("src",(()=>e.src)),i.__defineSetter__("srcset",(t=>{o(new l(n)),e.srcset=t})),i.__defineGetter__("srcset",(()=>e.srcset)),i.__defineGetter__("height",(()=>e.height)),i.__defineGetter__("width",(()=>e.width)),i.__defineGetter__("naturalHeight",(()=>e.naturalHeight)),i.__defineGetter__("naturalWidth",(()=>e.naturalWidth)),e.decode&&i.__defineGetter__("decode",(()=>()=>e.decode())),e.onload=e.onloadend=e.onerror=t=>{o(new l("single-file-image-loaded",{detail:e.src})),i.dispatchEvent(new g(t.type,t))},i}}))}let u,p;i?(u=a/_,p=f/m):(u=(a+e.scrollY)/_,p=(f+e.scrollX)/m);const F=Math.min(u,p);if(F<1){const e=s.documentElement.style.getPropertyValue("transform"),t=s.documentElement.style.getPropertyPriority("transform"),n=s.documentElement.style.getPropertyValue("transform-origin"),r=s.documentElement.style.getPropertyPriority("transform-origin"),o=s.documentElement.style.getPropertyValue("min-height"),l=s.documentElement.style.getPropertyPriority("min-height");s.documentElement.style.setProperty("transform-origin",(u<1?"50%":"0")+" "+(p<1?"50%":"0")+" 0","important"),s.documentElement.style.setProperty("transform","scale3d("+F+", "+F+", 1)","important"),s.documentElement.style.setProperty("min-height",100/F+"vh","important"),P(),i?(s.documentElement.style.setProperty("-sf-transform",e,t),s.documentElement.style.setProperty("-sf-transform-origin",n,r),s.documentElement.style.setProperty("-sf-min-height",o,l)):(s.documentElement.style.setProperty("transform",e,t),s.documentElement.style.setProperty("transform-origin",n,r),s.documentElement.style.setProperty("min-height",o,l))}if(!i){P();const e=r.getBoundingClientRect();window==window.top&&[...h].forEach((([t,n])=>{const i=n.options&&n.options.root&&n.options.root.getBoundingClientRect,r=i&&n.options.root.getBoundingClientRect(),o=y.get(t);if(o){const l=o.map((t=>{const n=t.getBoundingClientRect();return{target:t,intersectionRatio:1,boundingClientRect:n,intersectionRect:n,isIntersecting:!0,rootBounds:i?r:e,time:0}}));n.callback(l,t)}}))}}function E(n){s.querySelectorAll("["+t+"]").forEach((e=>{e.loading="lazy",e.removeAttribute(t)})),n||e._singleFile_getBoundingClientRect&&(d.prototype.getBoundingClientRect=e._singleFile_getBoundingClientRect,delete e._singleFile_getBoundingClientRect),e._singleFileImage&&(delete e.Image,e.Image=e._singleFileImage,delete e._singleFileImage),n||P()}function w(){const t=s.scrollingElement||s.documentElement;null!=e._singleFile_innerHeight&&(delete e.innerHeight,e.innerHeight=e._singleFile_innerHeight,delete e._singleFile_innerHeight),null!=e._singleFile_innerWidth&&(delete e.innerWidth,e.innerWidth=e._singleFile_innerWidth,delete e._singleFile_innerWidth),delete t.clientHeight,delete t.clientWidth,delete c.height,delete c.width}if(r("single-file-load-deferred-images-start",(()=>F())),r("single-file-load-deferred-images-keep-zoom-level-start",(()=>F(!0))),r("single-file-load-deferred-images-end",(()=>E())),r("single-file-load-deferred-images-keep-zoom-level-end",(()=>E(!0))),r("single-file-load-deferred-images-reset",w),r("single-file-load-deferred-images-keep-zoom-level-reset",(()=>{const e=s.documentElement.style.getPropertyValue("-sf-transform"),t=s.documentElement.style.getPropertyPriority("-sf-transform"),n=s.documentElement.style.getPropertyValue("-sf-transform-origin"),i=s.documentElement.style.getPropertyPriority("-sf-transform-origin"),r=s.documentElement.style.getPropertyValue("-sf-min-height"),o=s.documentElement.style.getPropertyPriority("-sf-min-height");s.documentElement.style.setProperty("transform",e,t),s.documentElement.style.setProperty("transform-origin",n,i),s.documentElement.style.setProperty("min-height",r,o),s.documentElement.style.removeProperty("-sf-transform"),s.documentElement.style.removeProperty("-sf-transform-origin"),s.documentElement.style.removeProperty("-sf-min-height"),w()})),r("single-file-dispatch-scroll-event-start",(()=>{p=!0})),r("single-file-dispatch-scroll-event-end",(()=>{p=!1})),r("single-file-block-cookies-start",(()=>{try{s.__defineGetter__("cookie",(()=>{throw new Error("document.cookie temporary blocked by SingleFile")}))}catch(e){}})),r("single-file-block-cookies-end",(()=>{delete s.cookie})),r("single-file-block-storage-start",(()=>{e._singleFile_localStorage||(e._singleFile_localStorage=e.localStorage,e.__defineGetter__("localStorage",(()=>{throw new Error("localStorage temporary blocked by SingleFile")}))),e._singleFile_indexedDB||(e._singleFile_indexedDB=e.indexedDB,e.__defineGetter__("indexedDB",(()=>{throw new Error("indexedDB temporary blocked by SingleFile")})))})),r("single-file-block-storage-end",(()=>{e._singleFile_localStorage&&(delete e.localStorage,e.localStorage=e._singleFile_localStorage,delete e._singleFile_localStorage),e._singleFile_indexedDB||(delete e.indexedDB,e.indexedDB=e._singleFile_indexedDB,delete e._singleFile_indexedDB)})),r("single-file-request-fetch",(async t=>{o(new l("single-file-ack-fetch"));const{url:n,options:i}=JSON.parse(t.detail);let r;try{const t=await((t,n)=>e.fetch(t,n))(n,i);r={url:n,response:await t.arrayBuffer(),headers:[...t.headers],status:t.status}}catch(e){r={url:n,error:e&&e.toString()}}o(new l("single-file-response-fetch",{detail:r}))})),e.FontFace){const t=e.FontFace;let n;e.FontFace=function(){return n||(u("SingleFile is hooking the FontFace constructor, document.fonts.delete and document.fonts.clear to handle dynamically loaded fonts."),n=!0),v(...arguments).then((e=>o(new l("single-file-new-font-face",{detail:e})))),new t(...arguments)},e.FontFace.toString=function(){return"function FontFace() { [native code] }"};const i=s.fonts.delete;s.fonts.delete=function(e){return v(e.family).then((e=>o(new l("single-file-delete-font",{detail:e})))),i.call(s.fonts,e)},s.fonts.delete.toString=function(){return"function delete() { [native code] }"};const r=s.fonts.clear;s.fonts.clear=function(){return o(new l("single-file-clear-fonts")),r.call(s.fonts)},s.fonts.clear.toString=function(){return"function clear() { [native code] }"}}if(e.IntersectionObserver){const t=e.IntersectionObserver;let n;e.IntersectionObserver=function(){n||(u("SingleFile is hooking the IntersectionObserver API to detect and load deferred images."),n=!0);const e=new t(...arguments),i=t.prototype.observe||e.observe,r=t.prototype.unobserve||e.unobserve,o=arguments[0],l=arguments[1];return i&&(e.observe=function(t){let n=y.get(e);return n||(n=[],y.set(e,n)),n.push(t),i.call(e,t)}),r&&(e.unobserve=function(t){let n=y.get(e);return n&&(n=n.filter((e=>e!=t)),n.length?y.set(e,n):(y.delete(e),h.delete(e))),r.call(e,t)}),h.set(e,{callback:o,options:l}),e},e.IntersectionObserver.prototype=t.prototype,e.IntersectionObserver.toString=function(){return"function IntersectionObserver() { [native code] }"}}async function v(e,t,n){const r={};return r["font-family"]=e,r.src=t,n&&Object.keys(n).forEach((e=>{i[e]&&(r[i[e]]=n[e])})),new Promise((e=>{if(r.src instanceof ArrayBuffer){const t=new f;t.readAsDataURL(new _([r.src])),t.addEventListener("load",(()=>{r.src="url("+t.result+")",e(r)}))}else e(r)}))}function P(){try{o(new a("resize")),p&&o(new a("scroll"))}catch(e){}}})("object"==typeof globalThis?globalThis:window)}));
