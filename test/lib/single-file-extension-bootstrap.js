!function(e){"function"==typeof define&&define.amd?define(["fs","jsdom"],e):e()}((function(){"use strict";let e,t;setTimeout((()=>async function(o){if(!e){const t=await browser.storage.local.get();e=t.tabsData||{}}(async function(){if(!t){t=!0;const o=await browser.tabs.query({currentWindow:!0,highlighted:!0});Object.keys(e).filter((e=>{if("autoSaveAll"!=e&&"autoSaveUnpinned"!=e&&"profileName"!=e)return!o.find((t=>t.id==e))})).forEach((t=>delete e[t])),await browser.storage.local.set({tabsData:e})}})(),void 0===o||e[o]||(e[o]={});return e}().then((t=>e=t))),0);const o="__Default_Settings__",a={removeHiddenElements:!0,removeUnusedStyles:!0,removeUnusedFonts:!0,removeFrames:!1,compressHTML:!0,compressCSS:!1,loadDeferredImages:!0,loadDeferredImagesMaxIdleTime:1500,loadDeferredImagesBlockCookies:!1,loadDeferredImagesBlockStorage:!1,loadDeferredImagesKeepZoomLevel:!1,loadDeferredImagesDispatchScrollEvent:!1,filenameTemplate:"{page-title} ({date-locale} {time-locale}).html",infobarTemplate:"",includeInfobar:!(!/Safari/.test(navigator.userAgent)||/Chrome/.test(navigator.userAgent)||/Vivaldi/.test(navigator.userAgent)||/OPR/.test(navigator.userAgent)),confirmInfobarContent:!1,autoClose:!1,confirmFilename:!1,filenameConflictAction:"uniquify",filenameMaxLength:192,filenameMaxLengthUnit:"bytes",filenameReplacedCharacters:["~","+","\\\\","?","%","*",":","|",'"',"<",">","\0-",""],filenameReplacementCharacter:"_",contextMenuEnabled:!0,tabMenuEnabled:!0,browserActionMenuEnabled:!0,shadowEnabled:!0,logsEnabled:!0,progressBarEnabled:!0,maxResourceSizeEnabled:!1,maxResourceSize:10,displayInfobar:!0,displayStats:!1,backgroundSave:!(/Mobile.*Firefox/.test(navigator.userAgent)||/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/Vivaldi/.test(navigator.userAgent)&&!/OPR/.test(navigator.userAgent)),defaultEditorMode:"normal",applySystemTheme:!0,autoSaveDelay:1,autoSaveLoad:!1,autoSaveUnload:!1,autoSaveLoadOrUnload:!0,autoSaveDiscard:!1,autoSaveRemove:!1,autoSaveRepeat:!1,autoSaveRepeatDelay:10,removeAlternativeFonts:!0,removeAlternativeMedias:!0,removeAlternativeImages:!0,groupDuplicateImages:!0,maxSizeDuplicateImages:524288,saveRawPage:!1,saveToClipboard:!1,addProof:!1,saveToGDrive:!1,saveWithWebDAV:!1,webDAVURL:"",webDAVUser:"",webDAVPassword:"",saveToGitHub:!1,githubToken:"",githubUser:"",githubRepository:"SingleFile-Archives",githubBranch:"main",saveWithCompanion:!1,forceWebAuthFlow:!0,resolveFragmentIdentifierURLs:!1,userScriptEnabled:!1,openEditor:!1,openSavedPage:!1,autoOpenEditor:!1,saveCreatedBookmarks:!1,allowedBookmarkFolders:[],ignoredBookmarkFolders:[],replaceBookmarkURL:!0,saveFavicon:!0,includeBOM:!1,warnUnsavedPage:!0,autoSaveExternalSave:!1,insertMetaNoIndex:!1,insertMetaCSP:!0,passReferrerOnError:!1,insertSingleFileComment:!0,removeSavedDate:!1,blockMixedContent:!1,saveOriginalURLs:!1,acceptHeaders:{font:"application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",image:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",stylesheet:"text/css,*/*;q=0.1",script:"*/*",document:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",video:"video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5",audio:"audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5"},moveStylesInHead:!1,networkTimeout:0,woleetKey:"",blockImages:!1,blockStylesheets:!1,blockFonts:!1,blockScripts:!0,blockVideos:!0,blockAudios:!0,autoSaveNumberOfLinksManually:10},n=[{url:"file:",profile:"__Default_Settings__",autoSaveProfile:"__Disabled_Settings__"}];let s,r=async function(){const{sync:e}=await browser.storage.local.get();s=e?browser.storage.sync:browser.storage.local;const t=await s.get();if(t.profiles)t.rules||(t.rules=n),Object.keys(t.profiles).forEach((e=>i(t.profiles[e]))),await s.remove(["profiles","rules"]),await s.set({profiles:t.profiles,rules:t.rules});else{const e=t;delete e.tabsData,i(e);const r={profiles:{},rules:n};r.profiles[o]=e,s.remove(Object.keys(a)),await s.set(r)}t.maxParallelWorkers||await s.set({maxParallelWorkers:navigator.hardwareConcurrency||4})}();function i(e){l(e,"blockScripts","removeScripts"),l(e,"blockVideos","removeVideoSrc"),l(e,"blockAudios","removeAudioSrc"),Object.keys(a).forEach((t=>function(e,t){void 0===e[t]&&(e[t]=a[t])}(e,t)))}function l(e,t,o){void 0===e[t]&&void 0!==e[o]&&(e[t]=e[o],delete e[o])}async function c(){return(await async function(){return await r,s.get(["profiles","rules","maxParallelWorkers"])}()).profiles[o].autoSaveNumberOfLinksManually}const d=globalThis.singlefileBootstrap,u=33554432,m="https://net-break.azurewebsites.net/api/httptrigger1";let f,v,g,p,h,b,S,w,E;async function y(e){return h&&"content.autosave"==e.method?(async function(e){v=e.options,"complete"!=document.readyState&&await new Promise((e=>globalThis.addEventListener("load",e)));await D(),v.autoSaveRepeat&&setTimeout((()=>{h&&!S&&(w=!1,v.autoSaveDelay=0,y(e))}),1e3*v.autoSaveRepeatDelay)}(e),{}):"content.maybeInit"==e.method?(R(),{}):"content.init"==e.method?(v=e.options,h=e.autoSaveEnabled,T(),{}):"content.openEditor"==e.method?(O(document)?C(document):T(),{}):"devtools.resourceCommitted"==e.method?(d.pageInfo.updatedResources[e.url]={content:e.content,type:e.type,encoding:e.encoding},{}):void 0}function R(){E==location.href||d.pageInfo.processing||(w=!1,E=location.href,browser.runtime.sendMessage({method:"tabs.init",savedPageDetected:O(document)}).catch((()=>{})),browser.runtime.sendMessage({method:"ui.processInit"}).catch((()=>{})))}async function D(){const e=d.helper;let t;if((!S||b)&&!w)if(S=!0,v.autoSaveDelay&&!b)await new Promise((e=>b=setTimeout(e,1e3*v.autoSaveDelay))),await D();else{const o=window._singleFile_waitForUserScript;let a,n=[];b=null,!v.removeFrames&&globalThis.frames&&globalThis.frames.length&&(n=await d.processors.frameTree.getAsync(v)),a=n&&n.sessionId,v.userScriptEnabled&&o&&await o(e.ON_BEFORE_CAPTURE_EVENT_NAME);const s=function(e){let t=new Map;function o(e,a){if("A"===e.tagName&&e.href&&(e.href.startsWith("http://")||e.href.startsWith("https://"))){const o=e.href;t.has(a)||t.set(a,new Array),t.get(a).push(o)}const n=e.children;for(let t=0;t<n.length;t++)o(n[t],e.tagName)}return o(e.body,""),t}(document);let r=function(e,t){const o=e.location.hostname,a=new Map;return t.forEach(((e,t)=>{const n=Array.from(e).filter((e=>new URL(e).hostname===o));n.length>0&&a.set(t,new Array(n))})),a}(document,s),i=new Map;i=await async function(e){const t=await c();let o,a,n=0,s=[];const r=new Map;for(let[o,a]of e)if(("p"===o||"P"===o)&&(s=s.concat(a[0].slice(0,t-n)),n+=s.length,n>=t))break;const i=await browser.runtime.sendMessage({method:"autosave.fetchdom",server:m,urls:s}),l=JSON.parse(i);for(let e=0;e<l.length;e++){let t=l[e],n=(new DOMParser).parseFromString(t,"text/html");o=await A(n),a=!1===o.downloadComplete?null:o.fileName,r.set(s[e],a)}return r}(r),await async function(e,t){let o=null;const a=e.getElementsByTagName("a");for(let[e,n]of t){if(null===n)continue;const t=`file://${n}`;null===o?o=new URL(e):o.href=e;for(const e of a)if(e.getAttribute("href")===o.href||e.getAttribute("href")===o.pathname){e.setAttribute("href",t),e.style.color="green";break}}}(document,i);const l=e.preProcessDoc(document,globalThis,v);t=await U(l,n),a&&d.processors.frameTree.cleanup(a),e.postProcessDoc(document,l.markedElements,l.invalidElements),v.userScriptEnabled&&o&&await o(e.ON_AFTER_CAPTURE_EVENT_NAME),w=!0,S=!1;!async function(e){const t=document.URL;browser.runtime.sendMessage({method:"offline.setOnRuntime",url:t,filePath:e})}(t.fileName)}}async function A(e,t){const o=d.helper;let a;try{let t,n=[];b=null,n=await d.processors.frameTree.getAsync(v),t=n&&n.sessionId,v.userScriptEnabled&&waitForUserScript&&await waitForUserScript(o.ON_BEFORE_CAPTURE_EVENT_NAME);const s=o.preProcessDoc(e,null,v);a=U(s,n,e),t&&d.processors.frameTree.cleanup(t),o.postProcessDoc(e,s.markedElements,s.invalidElements),v.userScriptEnabled&&waitForUserScript&&await waitForUserScript(o.ON_AFTER_CAPTURE_EVENT_NAME),w=!0,S=!1}catch(e){console.log("Failed!"),console.log(e)}return a}function T(){h&&v&&(v.autoSaveUnload||v.autoSaveLoadOrUnload||v.autoSaveDiscard||v.autoSaveRemove)?f||(globalThis.addEventListener("unload",_),document.addEventListener("visibilitychange",M),f=!0):(globalThis.removeEventListener("unload",_),document.removeEventListener("visibilitychange",M),f=!1)}function M(){"hidden"==document.visibilityState&&v.autoSaveDiscard&&k({autoSaveDiscard:v.autoSaveDiscard})}function _(){!w&&(v.autoSaveUnload||v.autoSaveLoadOrUnload||v.autoSaveRemove)&&k({autoSaveUnload:v.autoSaveUnload,autoSaveRemove:v.autoSaveRemove})}function k({autoSaveUnload:e,autoSaveDiscard:t,autoSaveRemove:o}){const a=d.helper,n=window._singleFile_waitForUserScript;let s=[];!v.removeFrames&&globalThis.frames&&globalThis.frames.length&&(s=d.processors.frameTree.getSync(v)),v.userScriptEnabled&&n&&n(a.ON_BEFORE_CAPTURE_EVENT_NAME);U(a.preProcessDoc(document,globalThis,v),s,{autoSaveUnload:e,autoSaveDiscard:t,autoSaveRemove:o})}async function U(e,t,o=document,{autoSaveUnload:a,autoSaveDiscard:n,autoSaveRemove:s}={}){const r=d.helper,i=d.pageInfo.updatedResources,l=d.pageInfo.visitDate.getTime();Object.keys(i).forEach((e=>i[e].retrieved=!1));const c=browser.runtime.sendMessage({method:"autosave.save",tabId:g,tabIndex:p,taskId:v.taskId,content:r.serialize(o),canvases:e.canvases,fonts:e.fonts,stylesheets:e.stylesheets,images:e.images,posters:e.posters,usedFonts:e.usedFonts,shadowRoots:e.shadowRoots,videos:e.videos,referrer:e.referrer,frames:t,url:location.href,updatedResources:i,visitDate:l,autoSaveUnload:a,autoSaveDiscard:n,autoSaveRemove:s});return await c.then((e=>e)).catch((()=>({downloadComplete:!1,fileName:null})))}async function C(e){const t=e.querySelector("singlefile-infobar");t&&t.remove(),I(e);const o=d.helper.serialize(e);for(let e=0;e*u<o.length;e++){const t={method:"editor.open",filename:decodeURIComponent(location.href.match(/^.*\/(.*)$/)[1])};t.truncated=o.length>u,t.truncated?(t.finished=(e+1)*u>o.length,t.content=o.substring(e*u,(e+1)*u)):t.content=o,await browser.runtime.sendMessage(t)}}function O(e){const t=d.helper,o=e.documentElement.firstChild;return o.nodeType==Node.COMMENT_NODE&&(o.textContent.includes(t.COMMENT_HEADER)||o.textContent.includes(t.COMMENT_HEADER_LEGACY))}function I(e){e.querySelectorAll("*").forEach((e=>{const t=d.helper.getShadowRoot(e);if(t){I(t);const o=document.createElement("template");o.setAttribute("shadowroot","open"),o.appendChild(t),e.appendChild(o)}}))}d.pageInfo={updatedResources:{},visitDate:new Date},browser.runtime.sendMessage({method:"bootstrap.init"}).then((e=>{v=e.optionsAutoSave;const t=e.options;g=e.tabId,p=e.tabIndex,h=e.autoSaveEnabled,t&&t.autoOpenEditor&&O(document)?"loading"==document.readyState?document.addEventListener("DOMContentLoaded",(()=>C(document))):C(document):T()})),browser.runtime.onMessage.addListener((e=>{if(h&&"content.autosave"==e.method||"content.maybeInit"==e.method||"content.init"==e.method||"content.openEditor"==e.method||"devtools.resourceCommitted"==e.method)return y(e)})),document.addEventListener("DOMContentLoaded",R,!1),window.addEventListener("offline",(function(e){!async function(){const e=document.URL;1==await async function(e){const t=await browser.runtime.sendMessage({method:"offline.isLocalResourceSaved",url:e});return t}(e)&&function(e){1==confirm("Connection has lost! fortunately NetBreak found a local version of this page. Press OK to load it.")&&browser.runtime.sendMessage({method:"offline.getOnRruntime",url:e})}(e)}()}))}));
