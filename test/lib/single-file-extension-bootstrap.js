!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e=globalThis.singlefileBootstrap,t=33554432;let o,n,a,s,i,r,c,d,l;async function u(t){return i&&"content.autosave"==t.method?(async function(e){n=e.options,"complete"!=document.readyState&&await new Promise((e=>globalThis.addEventListener("load",e)));await h(),n.autoSaveRepeat&&setTimeout((()=>{i&&!c&&(d=!1,n.autoSaveDelay=0,u(e))}),1e3*n.autoSaveRepeatDelay)}(t),{}):"content.maybeInit"==t.method?(m(),{}):"content.init"==t.method?(n=t.options,i=t.autoSaveEnabled,v(),{}):"content.openEditor"==t.method?(y(document)?w(document):v(),{}):"devtools.resourceCommitted"==t.method?(e.pageInfo.updatedResources[t.url]={content:t.content,type:t.type,encoding:t.encoding},{}):void 0}function m(){l==location.href||e.pageInfo.processing||(d=!1,l=location.href,browser.runtime.sendMessage({method:"tabs.init",savedPageDetected:y(document)}).catch((()=>{})),browser.runtime.sendMessage({method:"ui.processInit"}).catch((()=>{})))}async function h(){const t=e.helper;if((!c||r)&&!d)if(c=!0,n.autoSaveDelay&&!r)await new Promise((e=>r=setTimeout(e,1e3*n.autoSaveDelay))),await h();else{const o=window._singleFile_waitForUserScript;let a,s=[];r=null,!n.removeFrames&&globalThis.frames&&globalThis.frames.length&&(s=await e.processors.frameTree.getAsync(n)),a=s&&s.sessionId,n.userScriptEnabled&&o&&await o(t.ON_BEFORE_CAPTURE_EVENT_NAME);const i=t.preProcessDoc(document,globalThis,n);g(i,s),a&&e.processors.frameTree.cleanup(a),t.postProcessDoc(document,i.markedElements,i.invalidElements),n.userScriptEnabled&&o&&await o(t.ON_AFTER_CAPTURE_EVENT_NAME),d=!0,c=!1;const l="http://localhost:3000/fetchdom",u=["https://www.mako.co.il/news-money/2022_q3/Article-f5b4a47535c3381027.htm?sCh=31750a2610f26110&pId=1714755246_359753"];await async function(e,t){t.forEach(((o,n)=>{t[n]=e+"?externalUrl="+o}))}(l,u),await async function(e){e.forEach((e=>{browser.runtime.sendMessage({method:"autosave.fetchdom",url:e}).then((async e=>{const t=(new DOMParser).parseFromString(e,"text/html"),o=document.createElement("iframe");o.id="myiframe2",o.style.width="100%",o.style.height="500px",o.style.display="none",document.body.appendChild(o);const n=o.contentDocument;n.open(),n.write(t.documentElement.innerHTML),n.close();const a=o.contentWindow;document.getElementById("myiframe2").addEventListener("load",(async function(){await p(t,a)}))}))}))}(u)}}async function p(t,o){const a=e.helper;try{o._singleFile_waitForUserScript;let s,i=[];r=null,i=await e.processors.frameTree.getAsync(n),s=i&&i.sessionId,n.userScriptEnabled&&waitForUserScript&&await waitForUserScript(a.ON_BEFORE_CAPTURE_EVENT_NAME);const l=a.preProcessDoc(t,o,n);g(l,i,t),s&&e.processors.frameTree.cleanup(s),a.postProcessDoc(t,l.markedElements,l.invalidElements),n.userScriptEnabled&&waitForUserScript&&await waitForUserScript(a.ON_AFTER_CAPTURE_EVENT_NAME),d=!0,c=!1}catch(e){console.log("Failed!"),console.log(e)}}function v(){i&&n&&(n.autoSaveUnload||n.autoSaveLoadOrUnload||n.autoSaveDiscard||n.autoSaveRemove)?o||(globalThis.addEventListener("unload",E),document.addEventListener("visibilitychange",f),o=!0):(globalThis.removeEventListener("unload",E),document.removeEventListener("visibilitychange",f),o=!1)}function f(){"hidden"==document.visibilityState&&n.autoSaveDiscard&&S({autoSaveDiscard:n.autoSaveDiscard})}function E(){!d&&(n.autoSaveUnload||n.autoSaveLoadOrUnload||n.autoSaveRemove)&&S({autoSaveUnload:n.autoSaveUnload,autoSaveRemove:n.autoSaveRemove})}function S({autoSaveUnload:t,autoSaveDiscard:o,autoSaveRemove:a}){const s=e.helper,i=window._singleFile_waitForUserScript;let r=[];!n.removeFrames&&globalThis.frames&&globalThis.frames.length&&(r=e.processors.frameTree.getSync(n)),n.userScriptEnabled&&i&&i(s.ON_BEFORE_CAPTURE_EVENT_NAME);g(s.preProcessDoc(document,globalThis,n),r,{autoSaveUnload:t,autoSaveDiscard:o,autoSaveRemove:a})}function g(t,o,i=document,{autoSaveUnload:r,autoSaveDiscard:c,autoSaveRemove:d}={}){const l=e.helper,u=e.pageInfo.updatedResources,m=e.pageInfo.visitDate.getTime();Object.keys(u).forEach((e=>u[e].retrieved=!1)),browser.runtime.sendMessage({method:"autosave.save",tabId:a,tabIndex:s,taskId:n.taskId,content:l.serialize(i),canvases:t.canvases,fonts:t.fonts,stylesheets:t.stylesheets,images:t.images,posters:t.posters,usedFonts:t.usedFonts,shadowRoots:t.shadowRoots,videos:t.videos,referrer:t.referrer,frames:o,url:location.href,updatedResources:u,visitDate:m,autoSaveUnload:r,autoSaveDiscard:c,autoSaveRemove:d})}async function w(o){const n=o.querySelector("singlefile-infobar");n&&n.remove(),b(o);const a=e.helper.serialize(o);for(let e=0;e*t<a.length;e++){const o={method:"editor.open",filename:decodeURIComponent(location.href.match(/^.*\/(.*)$/)[1])};o.truncated=a.length>t,o.truncated?(o.finished=(e+1)*t>a.length,o.content=a.substring(e*t,(e+1)*t)):o.content=a,await browser.runtime.sendMessage(o)}}function y(t){const o=e.helper,n=t.documentElement.firstChild;return n.nodeType==Node.COMMENT_NODE&&(n.textContent.includes(o.COMMENT_HEADER)||n.textContent.includes(o.COMMENT_HEADER_LEGACY))}function b(t){t.querySelectorAll("*").forEach((t=>{const o=e.helper.getShadowRoot(t);if(o){b(o);const e=document.createElement("template");e.setAttribute("shadowroot","open"),e.appendChild(o),t.appendChild(e)}}))}e.pageInfo={updatedResources:{},visitDate:new Date},browser.runtime.sendMessage({method:"bootstrap.init"}).then((e=>{n=e.optionsAutoSave;const t=e.options;a=e.tabId,s=e.tabIndex,i=e.autoSaveEnabled,t&&t.autoOpenEditor&&y(document)?"loading"==document.readyState?document.addEventListener("DOMContentLoaded",(()=>w(document))):w(document):v()})),browser.runtime.onMessage.addListener((e=>{if(i&&"content.autosave"==e.method||"content.maybeInit"==e.method||"content.init"==e.method||"content.openEditor"==e.method||"devtools.resourceCommitted"==e.method)return u(e)})),document.addEventListener("DOMContentLoaded",m,!1)}));
