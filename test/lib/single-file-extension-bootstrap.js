!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e=globalThis.singlefileBootstrap,t=33554432;let o,n,a,s,r,i,c,d,l;async function u(t){return r&&"content.autosave"==t.method?(async function(e){n=e.options,"complete"!=document.readyState&&await new Promise((e=>globalThis.addEventListener("load",e)));await p(),n.autoSaveRepeat&&setTimeout((()=>{r&&!c&&(d=!1,n.autoSaveDelay=0,u(e))}),1e3*n.autoSaveRepeatDelay)}(t),{}):"content.maybeInit"==t.method?(m(),{}):"content.init"==t.method?(n=t.options,r=t.autoSaveEnabled,h(),{}):"content.openEditor"==t.method?(b(document)?g(document):h(),{}):"devtools.resourceCommitted"==t.method?(e.pageInfo.updatedResources[t.url]={content:t.content,type:t.type,encoding:t.encoding},{}):void 0}function m(){l==location.href||e.pageInfo.processing||(d=!1,l=location.href,browser.runtime.sendMessage({method:"tabs.init",savedPageDetected:b(document)}).catch((()=>{})),browser.runtime.sendMessage({method:"ui.processInit"}).catch((()=>{})))}async function p(){const t=e.helper;if((!c||i)&&!d)if(c=!0,n.autoSaveDelay&&!i)await new Promise((e=>i=setTimeout(e,1e3*n.autoSaveDelay))),await p();else{const o=window._singleFile_waitForUserScript;let a,s=[];i=null,!n.removeFrames&&globalThis.frames&&globalThis.frames.length&&(s=await e.processors.frameTree.getAsync(n)),a=s&&s.sessionId,n.userScriptEnabled&&o&&await o(t.ON_BEFORE_CAPTURE_EVENT_NAME);const r=t.preProcessDoc(document,globalThis,n);S(r,s),a&&e.processors.frameTree.cleanup(a),t.postProcessDoc(document,r.markedElements,r.invalidElements),n.userScriptEnabled&&o&&await o(t.ON_AFTER_CAPTURE_EVENT_NAME),d=!0,c=!1;const l=["https://www.mako.co.il/news-world/ukraine_russia_war?partner=NewsNavBar","https://www.mako.co.il/news-money/consumer?partner=NewsNavBar","https://www.mako.co.il/news-money/real_estate?partner=NewsNavBar","https://www.mako.co.il/news-columns?partner=NewsNavBar"];l.forEach((e=>{})),await async function(e){e.forEach((e=>{browser.runtime.sendMessage({method:"autosave.testing",url:e}).then((async e=>{const t=(new DOMParser).parseFromString(e,"text/html"),o=document.createElement("iframe");o.id="myiframe2",o.style.display="none",document.body.appendChild(o);const n=o.contentDocument;n.open(),n.write(t.documentElement.innerHTML),n.close();const a=o.contentWindow;document.getElementById("myiframe2").addEventListener("load",(async function(){await v(t,a)}))}))}))}(l)}}async function v(t,o){const a=e.helper;try{o._singleFile_waitForUserScript;let s,r=[];i=null,r=await e.processors.frameTree.getAsync(n),s=r&&r.sessionId,n.userScriptEnabled&&waitForUserScript&&await waitForUserScript(a.ON_BEFORE_CAPTURE_EVENT_NAME);const l=a.preProcessDoc(t,o,n);S(l,r,t),s&&e.processors.frameTree.cleanup(s),a.postProcessDoc(t,l.markedElements,l.invalidElements),n.userScriptEnabled&&waitForUserScript&&await waitForUserScript(a.ON_AFTER_CAPTURE_EVENT_NAME),d=!0,c=!1}catch(e){console.log("Failed!"),console.log(e)}}function h(){r&&n&&(n.autoSaveUnload||n.autoSaveLoadOrUnload||n.autoSaveDiscard||n.autoSaveRemove)?o||(globalThis.addEventListener("unload",f),document.addEventListener("visibilitychange",E),o=!0):(globalThis.removeEventListener("unload",f),document.removeEventListener("visibilitychange",E),o=!1)}function E(){"hidden"==document.visibilityState&&n.autoSaveDiscard&&w({autoSaveDiscard:n.autoSaveDiscard})}function f(){!d&&(n.autoSaveUnload||n.autoSaveLoadOrUnload||n.autoSaveRemove)&&w({autoSaveUnload:n.autoSaveUnload,autoSaveRemove:n.autoSaveRemove})}function w({autoSaveUnload:t,autoSaveDiscard:o,autoSaveRemove:a}){const s=e.helper,r=window._singleFile_waitForUserScript;let i=[];!n.removeFrames&&globalThis.frames&&globalThis.frames.length&&(i=e.processors.frameTree.getSync(n)),n.userScriptEnabled&&r&&r(s.ON_BEFORE_CAPTURE_EVENT_NAME);S(s.preProcessDoc(document,globalThis,n),i,{autoSaveUnload:t,autoSaveDiscard:o,autoSaveRemove:a})}function S(t,o,r=document,{autoSaveUnload:i,autoSaveDiscard:c,autoSaveRemove:d}={}){const l=e.helper,u=e.pageInfo.updatedResources,m=e.pageInfo.visitDate.getTime();Object.keys(u).forEach((e=>u[e].retrieved=!1)),browser.runtime.sendMessage({method:"autosave.save",tabId:a,tabIndex:s,taskId:n.taskId,content:l.serialize(r),canvases:t.canvases,fonts:t.fonts,stylesheets:t.stylesheets,images:t.images,posters:t.posters,usedFonts:t.usedFonts,shadowRoots:t.shadowRoots,videos:t.videos,referrer:t.referrer,frames:o,url:location.href,updatedResources:u,visitDate:m,autoSaveUnload:i,autoSaveDiscard:c,autoSaveRemove:d})}async function g(o){const n=o.querySelector("singlefile-infobar");n&&n.remove(),y(o);const a=e.helper.serialize(o);for(let e=0;e*t<a.length;e++){const o={method:"editor.open",filename:decodeURIComponent(location.href.match(/^.*\/(.*)$/)[1])};o.truncated=a.length>t,o.truncated?(o.finished=(e+1)*t>a.length,o.content=a.substring(e*t,(e+1)*t)):o.content=a,await browser.runtime.sendMessage(o)}}function b(t){const o=e.helper,n=t.documentElement.firstChild;return n.nodeType==Node.COMMENT_NODE&&(n.textContent.includes(o.COMMENT_HEADER)||n.textContent.includes(o.COMMENT_HEADER_LEGACY))}function y(t){t.querySelectorAll("*").forEach((t=>{const o=e.helper.getShadowRoot(t);if(o){y(o);const e=document.createElement("template");e.setAttribute("shadowroot","open"),e.appendChild(o),t.appendChild(e)}}))}e.pageInfo={updatedResources:{},visitDate:new Date},browser.runtime.sendMessage({method:"bootstrap.init"}).then((e=>{n=e.optionsAutoSave;const t=e.options;a=e.tabId,s=e.tabIndex,r=e.autoSaveEnabled,t&&t.autoOpenEditor&&b(document)?"loading"==document.readyState?document.addEventListener("DOMContentLoaded",(()=>g(document))):g(document):h()})),browser.runtime.onMessage.addListener((e=>{if(r&&"content.autosave"==e.method||"content.maybeInit"==e.method||"content.init"==e.method||"content.openEditor"==e.method||"devtools.resourceCommitted"==e.method)return u(e)})),document.addEventListener("DOMContentLoaded",m,!1)}));
