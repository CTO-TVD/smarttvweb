function getHtml(e){return new Promise(((n,t)=>{const o=new XMLHttpRequest;o.onreadystatechange=()=>{if(4===o.readyState)switch(o.status){case 200:case 0:try{const e=(new DOMParser).parseFromString(o.responseText,"text/html");n(e)}catch(e){t(e)}break;default:t(o)}},o.onerror=t,o.open("GET",e,!1),o.send()}))}function appendNode(e,n,t){if("SCRIPT"!==n.tagName)return void e.appendChild(n);const o=document.createElement("script"),c=n.outerHTML;if(c&&!n.text){const e=c.indexOf("src=")+5,n=c.indexOf(">"),i=c.substr(e,n-e-1);if(""!=t){const e=i.split("/");o.src=t+e[e.length-1]}else o.src=i}n.type&&(o.type=n.type),o.async=!1,o.innerHTML=n.innerHTML,n.parentElement.removeChild(n),e.appendChild(o)}function injectApp(e,n){let t="";return e!=location.href&&(t=window.__appLocation),getHtml(window.__appLocation+n).then((e=>{for(;e.head.children.length;)appendNode(document.head,e.head.children[0],t);for(;e.body.children.length;)appendNode(document.body,e.body.children[0],t)}))}function setVersion(e){window.__appVersion=e}function runInjector(){const e=new URL(location.href).search.indexOf("remote=true")>=0,n=location.href.indexOf("localhost:8080")<0||e;let t=location.href;n&&(t="https://cto-tvd.github.io/smarttvweb/");const o=new URL(t),c=(o.origin+o.pathname).replace(/index\.html$/,"");window.__appLocation=c;const i="content.html";injectApp(t,i).then((()=>{n?(setVersion("Remote"),console.info("[index] remote content.html successfully injected ...")):(setVersion("Local"),console.info("[index] local content.html successfully injected ..."))})).catch((e=>{setVersion("Local"),console.info("[index] error at content.html injection ...",e),injectApp("",i).then((()=>console.info("[index] local content.html successfully injected ..."))).catch((e=>console.info("[index] error at local content.html injection ...",e)))}))}