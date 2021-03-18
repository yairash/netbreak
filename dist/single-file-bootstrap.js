!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).singlefileBootstrap={})}(this,(function(e){"use strict";const t="single-file-load-image",s="single-file-image-loaded",o=globalThis.browser,n=e=>globalThis.dispatchEvent(e),a=globalThis.CustomEvent,i=globalThis.document,r=globalThis.HTMLDocument,l=globalThis.Blob;let d;if(d=window._singleFile_fontFaces?window._singleFile_fontFaces:window._singleFile_fontFaces=[],i instanceof r&&o&&o.runtime&&o.runtime.getURL){c="single-file-new-font-face",m=e=>{const t=e.detail;d.find((e=>JSON.stringify(e)==JSON.stringify(t)))||d.push(e.detail)},globalThis.addEventListener(c,m,u);let e=i.createElement("script");e.textContent="("+function(){"undefined"==typeof globalThis&&(window.globalThis=window);const e=globalThis.console,t=e=>globalThis.dispatchEvent(e),s=globalThis.CustomEvent,o=globalThis.FileReader,n=e&&e.warn&&((...t)=>e.warn(...t))||(()=>{}),a="single-file-new-font-face",i={family:"font-family",style:"font-style",weight:"font-weight",stretch:"font-stretch",unicodeRange:"unicode-range",variant:"font-variant",featureSettings:"font-feature-settings"};if(globalThis.FontFace){const e=globalThis.FontFace;let r;globalThis.FontFace=function(){r||(n("SingleFile is hooking the FontFace constructor to get font URLs."),r=!0);const d={};d["font-family"]=arguments[0],d.src=arguments[1];const c=arguments[2];if(c&&Object.keys(c).forEach((e=>{i[e]&&(d[i[e]]=c[e])})),d.src instanceof ArrayBuffer){const e=new o;e.readAsDataURL(new l([d.src])),e.addEventListener("load",(()=>{d.src="url("+e.result+")",t(new s(a,{detail:d}))}))}else t(new s(a,{detail:d}));return new e(...arguments)},globalThis.FontFace.toString=function(){return"function FontFace() { [native code] }"}}}.toString()+")()",(i.documentElement||i).appendChild(e),e.remove(),e=i.createElement("script"),e.src=o.runtime.getURL("/dist/web/hooks/hooks-frames-web.js"),e.async=!1,(i.documentElement||i).appendChild(e),e.remove()}var c,m,u;const g=new RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)","ig");const p="single-file-on-before-capture",f="single-file-on-after-capture",h="data-single-file-removed-content",E="data-single-file-hidden-content",T="data-single-file-kept-content",b="data-single-file-hidden-frame",y="data-single-file-preserved-space-element",w="data-single-file-shadow-root-element",I="data-single-file-image",A="data-single-file-poster",N="data-single-file-canvas",v="data-single-file-import",S="data-single-file-input-value",R="data-single-file-lazy-loaded-src",F="data-single-file-stylesheet",C="data-single-file-disabled-noscript",_="data-single-file-async-script",x="*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",P=["NOSCRIPT","DISABLED-NOSCRIPT","META","LINK","STYLE","TITLE","TEMPLATE","SOURCE","OBJECT","SCRIPT","HEAD"],M=/^'(.*?)'$/,O=/^"(.*?)"$/,L={regular:"400",normal:"400",bold:"700",bolder:"700",lighter:"100"},D="single-file-ui-element",k=(e,t,s)=>globalThis.addEventListener(e,t,s);function q(e,t,s){let o;return e.querySelectorAll("noscript:not([data-single-file-disabled-noscript])").forEach((e=>{e.setAttribute(C,e.textContent),e.textContent=""})),function(e){e.querySelectorAll("meta[http-equiv=refresh]").forEach((e=>{e.removeAttribute("http-equiv"),e.setAttribute("disabled-http-equiv","refresh")}))}(e),e.head&&e.head.querySelectorAll(x).forEach((e=>e.hidden=!0)),e.querySelectorAll("svg foreignObject").forEach((e=>{const t=e.querySelectorAll("html > head > "+x+", html > body > "+x);t.length&&(Array.from(e.childNodes).forEach((e=>e.remove())),t.forEach((t=>e.appendChild(t))))})),o=t&&e.documentElement?U(t,e,e.documentElement,s):{canvases:[],images:[],posters:[],usedFonts:[],shadowRoots:[],imports:[],markedElements:[]},{canvases:o.canvases,fonts:d,stylesheets:W(e),images:o.images,posters:o.posters,usedFonts:Array.from(o.usedFonts.values()),shadowRoots:o.shadowRoots,imports:o.imports,referrer:e.referrer,markedElements:o.markedElements}}function U(e,t,s,o,n={usedFonts:new Map,canvases:[],images:[],posters:[],shadowRoots:[],imports:[],markedElements:[]},a){return Array.from(s.childNodes).filter((t=>t instanceof e.HTMLElement||t instanceof e.SVGElement)).forEach((s=>{let i,r,l;if(!o.autoSaveExternalSave&&(o.removeHiddenElements||o.removeUnusedFonts||o.compressHTML)&&(l=e.getComputedStyle(s),s instanceof e.HTMLElement&&o.removeHiddenElements&&(r=(a||s.closest("html > head"))&&P.includes(s.tagName)||s.closest("details"),r||(i=a||function(e,t){let s=!1;if(t){const o=t.getPropertyValue("display"),n=t.getPropertyValue("opacity"),a=t.getPropertyValue("visibility");if(s="none"==o,!s&&("0"==n||"hidden"==a)&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=!t.width&&!t.height}}return Boolean(s)}(s,l),i&&(s.setAttribute(E,""),n.markedElements.push(s)))),!i)){if(o.compressHTML&&l){const e=l.getPropertyValue("white-space");e&&e.startsWith("pre")&&(s.setAttribute(y,""),n.markedElements.push(s))}o.removeUnusedFonts&&(H(l,o,n.usedFonts),H(e.getComputedStyle(s,":first-letter"),o,n.usedFonts),H(e.getComputedStyle(s,":before"),o,n.usedFonts),H(e.getComputedStyle(s,":after"),o,n.usedFonts))}!function(e,t,s,o,n,a,i){if("CANVAS"==s.tagName)try{const t=j(e,s,i);n.canvases.push({dataURI:s.toDataURL("image/png",""),width:t.width,height:t.height}),s.setAttribute(N,n.canvases.length-1),n.markedElements.push(s)}catch(e){}if("IMG"==s.tagName){const t={currentSrc:a?"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==":o.loadDeferredImages&&s.getAttribute(R)||s.currentSrc};if(n.images.push(t),s.setAttribute(I,n.images.length-1),n.markedElements.push(s),s.removeAttribute(R),i=i||e.getComputedStyle(s)){t.size=j(e,s,i);const o=i.getPropertyValue("box-shadow"),n=i.getPropertyValue("background-image");o&&"none"!=o||n&&"none"!=n||!(t.size.pxWidth>1||t.size.pxHeight>1)||(t.replaceable=!0,t.backgroundColor=i.getPropertyValue("background-color"),t.objectFit=i.getPropertyValue("object-fit"),t.boxSizing=i.getPropertyValue("box-sizing"),t.objectPosition=i.getPropertyValue("object-position"))}}if("VIDEO"==s.tagName&&!s.poster){const e=t.createElement("canvas"),o=e.getContext("2d");e.width=s.clientWidth,e.height=s.clientHeight;try{o.drawImage(s,0,0,e.width,e.height),n.posters.push(e.toDataURL("image/png","")),s.setAttribute(A,n.posters.length-1),n.markedElements.push(s)}catch(e){}}"IFRAME"==s.tagName&&a&&o.removeHiddenElements&&(s.setAttribute(b,""),n.markedElements.push(s));"LINK"==s.tagName&&s.import&&s.import.documentElement&&(n.imports.push({content:G(s.import)}),s.setAttribute(v,n.imports.length-1),n.markedElements.push(s));"INPUT"==s.tagName&&("password"!=s.type&&(s.setAttribute(S,s.value),n.markedElements.push(s)),"radio"!=s.type&&"checkbox"!=s.type||(s.setAttribute(S,s.checked),n.markedElements.push(s)));"TEXTAREA"==s.tagName&&(s.setAttribute(S,s.value),n.markedElements.push(s));"SELECT"==s.tagName&&s.querySelectorAll("option").forEach((e=>{e.selected&&(e.setAttribute(S,""),n.markedElements.push(e))}));"SCRIPT"==s.tagName&&(s.async&&""!=s.getAttribute("async")&&"async"!=s.getAttribute("async")&&(s.setAttribute(_,""),n.markedElements.push(s)),s.textContent=s.textContent.replace(/<\/script>/gi,"<\\/script>"))}(e,t,s,o,n,i,l);const d=!(s instanceof e.SVGElement)&&V(s);if(d&&!s.classList.contains(D)){const a={};s.setAttribute(w,n.shadowRoots.length),n.markedElements.push(s),n.shadowRoots.push(a),U(e,t,d,o,n,i),a.content=d.innerHTML,a.delegatesFocus=d.delegatesFocus,a.mode=d.mode,d.adoptedStyleSheets&&d.adoptedStyleSheets.length&&(a.adoptedStyleSheets=Array.from(d.adoptedStyleSheets).map((e=>Array.from(e.cssRules).map((e=>e.cssText)).join("\n"))))}U(e,t,s,o,n,i),!o.autoSaveExternalSave&&o.removeHiddenElements&&a&&(r||""==s.getAttribute(T)?s.parentElement&&(s.parentElement.setAttribute(T,""),n.markedElements.push(s.parentElement)):i&&(s.setAttribute(h,""),n.markedElements.push(s)))})),n}function H(e,t,s){if(e){const o=e.getPropertyValue("font-style")||"normal";e.getPropertyValue("font-family").split(",").forEach((n=>{if(n=B(n),!t.loadedFonts||t.loadedFonts.find((e=>B(e.family)==n&&e.style==o))){const t=(a=e.getPropertyValue("font-weight"),L[a.toLowerCase().trim()]||a),i=e.getPropertyValue("font-variant")||"normal",r=[n,t,o,i];s.set(JSON.stringify(r),[n,t,o,i])}var a}))}}function V(e){const t=globalThis.chrome;if(e.openOrClosedShadowRoot)return e.openOrClosedShadowRoot;if(!(t&&t.dom&&t.dom.openOrClosedShadowRoot))return e.shadowRoot;try{return t.dom.openOrClosedShadowRoot(e)}catch(t){return e.shadowRoot}}function B(e=""){return function(e){e=e.match(M)?e.replace(M,"$1"):e.replace(O,"$1");return e.trim()}((t=e.trim(),t.replace(g,((e,t,s)=>{const o="0x"+t-65536;return o!=o||s?t:o<0?String.fromCharCode(o+65536):String.fromCharCode(o>>10|55296,1023&o|56320)})))).toLowerCase();var t}function z(e,t){if(e.querySelectorAll("[data-single-file-disabled-noscript]").forEach((e=>{e.textContent=e.getAttribute(C),e.removeAttribute(C)})),e.querySelectorAll("meta[disabled-http-equiv]").forEach((e=>{e.setAttribute("http-equiv",e.getAttribute("disabled-http-equiv")),e.removeAttribute("disabled-http-equiv")})),e.head&&e.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach((e=>e.removeAttribute("hidden"))),!t){const s=[h,b,E,y,I,A,N,S,w,v,F,_];t=e.querySelectorAll(s.map((e=>"["+e+"]")).join(","))}t.forEach((e=>{e.removeAttribute(h),e.removeAttribute(E),e.removeAttribute(T),e.removeAttribute(b),e.removeAttribute(y),e.removeAttribute(I),e.removeAttribute(A),e.removeAttribute(N),e.removeAttribute(S),e.removeAttribute(w),e.removeAttribute(v),e.removeAttribute(F),e.removeAttribute(_)}))}function W(e){if(e){const t=[];return e.querySelectorAll("style").forEach(((s,o)=>{try{const n=e.createElement("style");n.textContent=s.textContent,e.body.appendChild(n);const a=n.sheet;n.remove(),a&&a.cssRules.length==s.sheet.cssRules.length||(s.setAttribute(F,o),t[o]=Array.from(s.sheet.cssRules).map((e=>e.cssText)).join("\n"))}catch(e){}})),t}}function j(e,t,s){let o=t.naturalWidth,n=t.naturalHeight;if(!o&&!n){let a,i,r,l,d,c,m,u,g=!1;if("content-box"==(s=s||e.getComputedStyle(t)).getPropertyValue("box-sizing")){const e=t.style.getPropertyValue("box-sizing"),s=t.style.getPropertyPriority("box-sizing"),o=t.clientWidth;t.style.setProperty("box-sizing","border-box","important"),g=t.clientWidth!=o,e?t.style.setProperty("box-sizing",e,s):t.style.removeProperty("box-sizing")}a=J("padding-left",s),i=J("padding-right",s),r=J("padding-top",s),l=J("padding-bottom",s),g?(d=J("border-left-width",s),c=J("border-right-width",s),m=J("border-top-width",s),u=J("border-bottom-width",s)):d=c=m=u=0,o=Math.max(0,t.clientWidth-a-i-d-c),n=Math.max(0,t.clientHeight-r-l-m-u)}return{pxWidth:o,pxHeight:n}}function J(e,t){if(t.getPropertyValue(e).endsWith("px"))return parseFloat(t.getPropertyValue(e))}function G(e){const t=e.doctype;let s="";return t&&(s="<!DOCTYPE "+t.nodeName,t.publicId?(s+=' PUBLIC "'+t.publicId+'"',t.systemId&&(s+=' "'+t.systemId+'"')):t.systemId&&(s+=' SYSTEM "'+t.systemId+'"'),t.internalSubset&&(s+=" ["+t.internalSubset+"]"),s+="> "),s+e.documentElement.outerHTML}const Y=R,K=D,$="attributes",Q=globalThis.browser,X=globalThis.document,Z=globalThis.MutationObserver,ee=(e,t,s)=>globalThis.addEventListener(e,t,s),te=(e,t,s)=>globalThis.removeEventListener(e,t,s),se=new Map;async function oe(e){if(X.documentElement){se.clear();const o=Math.max(X.documentElement.scrollHeight-1.5*X.documentElement.clientHeight,0),i=Math.max(X.documentElement.scrollWidth-1.5*X.documentElement.clientWidth,0);if(globalThis.scrollY<=o&&globalThis.scrollX<=i)return function(e){return new Promise((async o=>{let i;const r=new Set,l=new Z((async t=>{if((t=t.filter((e=>e.type==$))).length){t.filter((e=>{if("src"==e.attributeName&&(e.target.setAttribute(Y,e.target.src),e.target.addEventListener("load",c)),"src"==e.attributeName||"srcset"==e.attributeName||"SOURCE"==e.target.tagName)return!e.target.classList||!e.target.classList.contains(K)})).length&&(i=!0,await ae(l,e,g),r.size||await ne(l,e,g))}}));async function d(t){await re("idleTimeout",(async()=>{i?(de("idleTimeout"),await d(Math.max(500,t/2))):(de("loadTimeout"),de("maxTimeout"),ie(l,e,g))}),t)}function c(e){const t=e.target;t.removeAttribute(Y),t.removeEventListener("load",c)}async function m(t){i=!0,await ae(l,e,g),await ne(l,e,g),t.detail&&r.add(t.detail)}async function u(t){await ae(l,e,g),await ne(l,e,g),r.delete(t.detail),r.size||await ne(l,e,g)}function g(e){l.disconnect(),te(t,m),te(s,u),o(e)}await d(2*e.loadDeferredImagesMaxIdleTime),await ae(l,e,g),l.observe(X,{subtree:!0,childList:!0,attributes:!0}),ee(t,m),ee(s,u),function(e){e.loadDeferredImagesBlockCookies&&n(new a("single-file-block-cookies-start")),e.loadDeferredImagesBlockStorage&&n(new a("single-file-block-storage-start")),e.loadDeferredImagesKeepZoomLevel?n(new a("single-file-load-deferred-images-keep-zoom-level-start")):n(new a("single-file-load-deferred-images-start"))}(e)}))}(e)}}async function ne(e,t,s){await re("loadTimeout",(()=>ie(e,t,s)),t.loadDeferredImagesMaxIdleTime)}async function ae(e,t,s){await re("maxTimeout",(async()=>{await de("loadTimeout"),await ie(e,t,s)}),10*t.loadDeferredImagesMaxIdleTime)}async function ie(e,t,s){await de("idleTimeout"),function(e){e.loadDeferredImagesBlockCookies&&n(new a("single-file-block-cookies-end")),e.loadDeferredImagesBlockStorage&&n(new a("single-file-block-storage-end")),e.loadDeferredImagesKeepZoomLevel?n(new a("single-file-load-deferred-images-keep-zoom-level-end")):n(new a("single-file-load-deferred-images-end"))}(t),await re("endTimeout",(async()=>{await de("maxTimeout"),s()}),t.loadDeferredImagesMaxIdleTime/2),e.disconnect()}async function re(e,t,s){if(Q&&Q.runtime&&Q.runtime.sendMessage){if(!se.get(e)||!se.get(e).pending){const o={callback:t,pending:!0};se.set(e,o);try{await Q.runtime.sendMessage({method:"singlefile.lazyTimeout.setTimeout",type:e,delay:s})}catch(o){le(e,t,s)}o.pending=!1}}else le(e,t,s)}function le(e,t,s){const o=se.get(e);o&&globalThis.clearTimeout(o),se.set(e,t),globalThis.setTimeout(t,s)}async function de(e){if(Q&&Q.runtime&&Q.runtime.sendMessage)try{await Q.runtime.sendMessage({method:"singlefile.lazyTimeout.clearTimeout",type:e})}catch(t){ce(e)}else ce(e)}function ce(e){const t=se.get(e);se.delete(e),t&&globalThis.clearTimeout(t)}Q&&Q.runtime&&Q.runtime.onMessage&&Q.runtime.onMessage.addListener&&Q.runtime.onMessage.addListener((e=>{if("singlefile.lazyTimeout.onTimeout"==e.method){const t=se.get(e.type);if(t){se.delete(e.type);try{t.callback()}catch(t){ce(e.type)}}}}));const me={ON_BEFORE_CAPTURE_EVENT_NAME:p,ON_AFTER_CAPTURE_EVENT_NAME:f,WIN_ID_ATTRIBUTE_NAME:"data-single-file-win-id",preProcessDoc:q,serialize:G,postProcessDoc:z,getShadowRoot:V},ue="__frameTree__::",ge='iframe, frame, object[type="text/html"][data]',pe="singlefile.frameTree.initRequest",fe="singlefile.frameTree.ackInitRequest",he="singlefile.frameTree.cleanupRequest",Ee="singlefile.frameTree.initResponse",Te=".",be=globalThis.window==globalThis.top,ye=globalThis.browser,we=globalThis.top,Ie=globalThis.MessageChannel,Ae=globalThis.document,Ne=new Map;let ve;function Se(){return globalThis.crypto.getRandomValues(new Uint32Array(32)).join("")}async function Re(e){const t=e.sessionId,s=globalThis._singleFile_waitForUserScript;be||(ve=globalThis.frameId=e.windowId),_e(Ae,e.options,ve,t),be||(e.options.userScriptEnabled&&s&&await s(me.ON_BEFORE_CAPTURE_EVENT_NAME),Oe({frames:[De(Ae,globalThis,ve,e.options)],sessionId:t,requestedFrameId:Ae.documentElement.dataset.requestedFrameId&&ve}),e.options.userScriptEnabled&&s&&await s(me.ON_AFTER_CAPTURE_EVENT_NAME),delete Ae.documentElement.dataset.requestedFrameId)}function Fe(e){const t=e.sessionId;Me(ke(Ae),e.windowId,t)}function Ce(e){e.frames.forEach((t=>xe("responseTimeouts",e.sessionId,t.windowId)));const t=Ne.get(e.sessionId);if(t){e.requestedFrameId&&(t.requestedFrameId=e.requestedFrameId),e.frames.forEach((e=>{let s=t.frames.find((t=>e.windowId==t.windowId));s||(s={windowId:e.windowId},t.frames.push(s)),s.processed||(s.content=e.content,s.baseURI=e.baseURI,s.title=e.title,s.canvases=e.canvases,s.fonts=e.fonts,s.stylesheets=e.stylesheets,s.images=e.images,s.posters=e.posters,s.usedFonts=e.usedFonts,s.shadowRoots=e.shadowRoots,s.imports=e.imports,s.processed=e.processed)}));t.frames.filter((e=>!e.processed)).length||(t.frames=t.frames.sort(((e,t)=>t.windowId.split(Te).length-e.windowId.split(Te).length)),t.resolve&&(t.requestedFrameId&&t.frames.forEach((e=>{e.windowId==t.requestedFrameId&&(e.requestedFrame=!0)})),t.resolve(t.frames)))}}function _e(e,t,s,o){const n=ke(e);!function(e,t,s,o,n){const a=[];let i;Ne.get(n)?i=Ne.get(n).requestTimeouts:(i={},Ne.set(n,{requestTimeouts:i}));t.forEach(((e,t)=>{const s=o+Te+t;e.setAttribute(me.WIN_ID_ATTRIBUTE_NAME,s),a.push({windowId:s})})),Oe({frames:a,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),t.forEach(((e,t)=>{const a=o+Te+t;try{Le(e.contentWindow,{method:pe,windowId:a,sessionId:n,options:s})}catch(e){}i[a]=globalThis.setTimeout((()=>Oe({frames:[{windowId:a,processed:!0}],sessionId:n})),750)})),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o),n.length&&function(e,t,s,o,n){const a=[];t.forEach(((e,t)=>{const i=o+Te+t;let r;try{r=e.contentDocument}catch(e){}if(r)try{const t=e.contentWindow;t.stop(),xe("requestTimeouts",n,i),_e(r,s,i,n),a.push(De(r,t,i,s))}catch(e){a.push({windowId:i,processed:!0})}})),Oe({frames:a,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o)}function xe(e,t,s){const o=Ne.get(t);if(o&&o[e]){const t=o[e][s];t&&(globalThis.clearTimeout(t),delete o[e][s])}}function Pe(e,t){const s=Ne.get(e);s&&s.responseTimeouts&&(s.responseTimeouts[t]=globalThis.setTimeout((()=>Oe({frames:[{windowId:t,processed:!0}],sessionId:e})),1e4))}function Me(e,t,s){e.forEach(((e,o)=>{const n=t+Te+o;e.removeAttribute(me.WIN_ID_ATTRIBUTE_NAME);try{Le(e.contentWindow,{method:he,windowId:n,sessionId:s})}catch(e){}})),e.forEach(((e,o)=>{const n=t+Te+o;let a;try{a=e.contentDocument}catch(e){}if(a)try{Me(ke(a),n,s)}catch(e){}}))}function Oe(e){e.method=Ee;try{we.singlefile.processors.frameTree.initResponse(e)}catch(t){Le(we,e,!0)}}function Le(e,t,s){if(e==we&&ye&&ye.runtime&&ye.runtime.sendMessage)ye.runtime.sendMessage(t);else if(s){const s=new Ie;e.postMessage(ue+JSON.stringify({method:t.method,sessionId:t.sessionId}),"*",[s.port2]),s.port1.postMessage(t)}else e.postMessage(ue+JSON.stringify(t),"*")}function De(e,t,s,o){const n=me.preProcessDoc(e,t,o),a=me.serialize(e);me.postProcessDoc(e,n.markedElements);return{windowId:s,content:a,baseURI:e.baseURI.split("#")[0],title:e.title,canvases:n.canvases,fonts:n.fonts,stylesheets:n.stylesheets,images:n.images,posters:n.posters,usedFonts:n.usedFonts,shadowRoots:n.shadowRoots,imports:n.imports,processed:!0}}function ke(e){let t=Array.from(e.querySelectorAll(ge));return e.querySelectorAll("*").forEach((e=>{const s=me.getShadowRoot(e);s&&(t=t.concat(...s.querySelectorAll(ge)))})),t}be&&(ve="0",ye&&ye.runtime&&ye.runtime.onMessage&&ye.runtime.onMessage.addListener&&ye.runtime.onMessage.addListener((e=>e.method==Ee?(Ce(e),Promise.resolve({})):e.method==fe?(xe("requestTimeouts",e.sessionId,e.windowId),Pe(e.sessionId,e.windowId),Promise.resolve({})):void 0))),((e,t,s)=>{globalThis.addEventListener(e,t,s)})("message",(async e=>{if("string"==typeof e.data&&e.data.startsWith(ue)){e.preventDefault(),e.stopPropagation();const t=JSON.parse(e.data.substring(ue.length));if(t.method==pe)e.source&&Le(e.source,{method:fe,windowId:t.windowId,sessionId:t.sessionId}),be||(globalThis.stop(),t.options.loadDeferredImages&&oe(t.options),await Re(t));else if(t.method==fe)xe("requestTimeouts",t.sessionId,t.windowId),Pe(t.sessionId,t.windowId);else if(t.method==he)Fe(t);else if(t.method==Ee&&Ne.get(t.sessionId)){e.ports[0].onmessage=e=>Ce(e.data)}}}),!0);const qe=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],Ue=[{tagName:"head",accept:e=>!e.childNodes.length||1==e.childNodes[0].nodeType},{tagName:"body",accept:e=>!e.childNodes.length}],He=[{tagName:"html",accept:e=>!e||8!=e.nodeType},{tagName:"head",accept:e=>!e||8!=e.nodeType&&(3!=e.nodeType||!ze(e.textContent))},{tagName:"body",accept:e=>!e||8!=e.nodeType},{tagName:"li",accept:(e,t)=>!e&&t.parentElement&&("UL"==t.parentElement.tagName||"OL"==t.parentElement.tagName)||e&&["LI"].includes(e.tagName)},{tagName:"dt",accept:e=>!e||["DT","DD"].includes(e.tagName)},{tagName:"p",accept:e=>e&&["ADDRESS","ARTICLE","ASIDE","BLOCKQUOTE","DETAILS","DIV","DL","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HR","MAIN","NAV","OL","P","PRE","SECTION","TABLE","UL"].includes(e.tagName)},{tagName:"dd",accept:e=>!e||["DT","DD"].includes(e.tagName)},{tagName:"rt",accept:e=>!e||["RT","RP"].includes(e.tagName)},{tagName:"rp",accept:e=>!e||["RT","RP"].includes(e.tagName)},{tagName:"optgroup",accept:e=>!e||["OPTGROUP"].includes(e.tagName)},{tagName:"option",accept:e=>!e||["OPTION","OPTGROUP"].includes(e.tagName)},{tagName:"colgroup",accept:e=>!e||8!=e.nodeType&&(3!=e.nodeType||!ze(e.textContent))},{tagName:"caption",accept:e=>!e||8!=e.nodeType&&(3!=e.nodeType||!ze(e.textContent))},{tagName:"thead",accept:e=>!e||["TBODY","TFOOT"].includes(e.tagName)},{tagName:"tbody",accept:e=>!e||["TBODY","TFOOT"].includes(e.tagName)},{tagName:"tfoot",accept:e=>!e},{tagName:"tr",accept:e=>!e||["TR"].includes(e.tagName)},{tagName:"td",accept:e=>!e||["TD","TH"].includes(e.tagName)},{tagName:"th",accept:e=>!e||["TD","TH"].includes(e.tagName)}],Ve=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"];function Be(e,t,s){return 3==e.nodeType?function(e){const t=e.parentNode;let s;t&&1==t.nodeType&&(s=t.tagName.toLowerCase());return!s||Ve.includes(s)?"script"==s?e.textContent.replace(/<\//gi,"<\\/").replace(/\/>/gi,"\\/>"):e.textContent:e.textContent.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}(e):8==e.nodeType?"\x3c!--"+e.textContent+"--\x3e":1==e.nodeType?function(e,t,s){const o=e.tagName.toLowerCase(),n=t&&Ue.find((t=>o==t.tagName&&t.accept(e)));let a="";n&&!e.attributes.length||(a="<"+o,Array.from(e.attributes).forEach((s=>a+=function(e,t,s){const o=e.name;let n="";if(!o.match(/["'>/=]/)){let a,i=e.value;s&&"class"==o&&(i=Array.from(t.classList).map((e=>e.trim())).join(" ")),i=i.replace(/&/g,"&amp;").replace(/\u00a0/g,"&nbsp;"),i.includes('"')&&(i.includes("'")||!s?i=i.replace(/"/g,"&quot;"):a=!0);const r=!s||!i.match(/^[^ \t\n\f\r'"`=<>]+$/);n+=" ",e.namespace?"http://www.w3.org/XML/1998/namespace"==e.namespaceURI?n+="xml:"+o:"http://www.w3.org/2000/xmlns/"==e.namespaceURI?("xmlns"!==o&&(n+="xmlns:"),n+=o):"http://www.w3.org/1999/xlink"==e.namespaceURI?n+="xlink:"+o:n+=o:n+=o,""!=i&&(n+="=",r&&(n+=a?"'":'"'),n+=i,r&&(n+=a?"'":'"'))}return n}(s,e,t))),a+=">");"TEMPLATE"!=e.tagName||e.childNodes.length?Array.from(e.childNodes).forEach((e=>a+=Be(e,t,s||"svg"==o))):a+=e.innerHTML;const i=t&&He.find((t=>o==t.tagName&&t.accept(e.nextSibling,e)));(s||!i&&!qe.includes(o))&&(a+="</"+o+">");return a}(e,t,s):void 0}function ze(e){return Boolean(e.match(/^[ \t\n\f\r]/))}const We={frameTree:Object.freeze({__proto__:null,getAsync:function(e){const t=Se();return e=JSON.parse(JSON.stringify(e)),new Promise((s=>{Ne.set(t,{frames:[],requestTimeouts:{},responseTimeouts:{},resolve:e=>{e.sessionId=t,s(e)}}),Re({windowId:ve,sessionId:t,options:e})}))},getSync:function(e){const t=Se();e=JSON.parse(JSON.stringify(e)),Ne.set(t,{frames:[],requestTimeouts:{},responseTimeouts:{}}),function(e){const t=e.sessionId,s=globalThis._singleFile_waitForUserScript;be||(ve=globalThis.frameId=e.windowId);_e(Ae,e.options,ve,t),be||(e.options.userScriptEnabled&&s&&s(me.ON_BEFORE_CAPTURE_EVENT_NAME),Oe({frames:[De(Ae,globalThis,ve,e.options)],sessionId:t,requestedFrameId:Ae.documentElement.dataset.requestedFrameId&&ve}),e.options.userScriptEnabled&&s&&s(me.ON_AFTER_CAPTURE_EVENT_NAME),delete Ae.documentElement.dataset.requestedFrameId)}({windowId:ve,sessionId:t,options:e});const s=Ne.get(t).frames;return s.sessionId=t,s},cleanup:function(e){Ne.delete(e),Fe({windowId:ve,sessionId:e,options:{sessionId:e}})},initResponse:Ce,TIMEOUT_INIT_REQUEST_MESSAGE:750})},je={COMMENT_HEADER:"Page saved with SingleFile",COMMENT_HEADER_LEGACY:"Archive processed by SingleFile",ON_BEFORE_CAPTURE_EVENT_NAME:p,ON_AFTER_CAPTURE_EVENT_NAME:f,preProcessDoc:q,postProcessDoc:z,serialize:(e,t)=>function(e,t){const s=e.doctype;let o="";return s&&(o="<!DOCTYPE "+s.nodeName,s.publicId?(o+=' PUBLIC "'+s.publicId+'"',s.systemId&&(o+=' "'+s.systemId+'"')):s.systemId&&(o+=' SYSTEM "'+s.systemId+'"'),s.internalSubset&&(o+=" ["+s.internalSubset+"]"),o+="> "),o+Be(e.documentElement,t)}(e,t),getShadowRoot:V};k("single-file-user-script-init",(()=>globalThis._singleFile_waitForUserScript=async e=>{const t=new CustomEvent(e+"-request",{cancelable:!0}),s=new Promise((t=>k(e+"-response",t)));(e=>{globalThis.dispatchEvent(e)})(t),t.defaultPrevented&&await s})),e.helper=je,e.processors=We,Object.defineProperty(e,"__esModule",{value:!0})}));
