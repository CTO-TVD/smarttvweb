function getHtml(e){return new Promise(((t,n)=>{const o=new XMLHttpRequest;o.onreadystatechange=()=>{if(4===o.readyState)switch(o.status){case 200:case 0:try{const e=(new DOMParser).parseFromString(o.responseText,"text/html");t(e)}catch(e){n(e)}break;default:n(o)}},o.onerror=n,o.open("GET",e,!1),o.send()}))}function appendNode(e,t,n){if("SCRIPT"!==t.tagName)return void e.appendChild(t);const o=document.createElement("script");if(t instanceof HTMLScriptElement&&t.src){const e=t.src;if(""!=n){const t=new URL(e).pathname.split("/");o.src=n+t[t.length-1]}else o.src=e}t instanceof HTMLScriptElement&&t.type&&(o.type=t.type),o.async=!1,o.innerHTML=t.innerHTML,t.parentElement?.removeChild(t),e.appendChild(o)}function injectApp(e,t){const n=new URL(""!=e?e:location.href),o=(n.origin+n.pathname).replace(/index\.html$/,"");return getHtml(o+t).then((t=>{for(;t.head.children.length;)appendNode(document.head,t.head.children[0],""!=e?o:"");for(;t.body.children.length;)appendNode(document.body,t.body.children[0],""!=e?o:"")}))}function runInjector(){const e=new URL(location.href).search.indexOf("remote=true")>=0,t=location.href.indexOf("localhost:8080")<0||e,n="content.html";injectApp(t?"https://cto-tvd.github.io/smarttvweb/":"",n).then((()=>{console.info("[index] remote content.html successfully injected ...")})).catch((e=>{console.info("[index] error at remote content.html injection ...",e),injectApp("",n).then((()=>console.info("[index] local content.html successfully injected ..."))).catch((e=>console.info("[index] error at local content.html injection ...",e)))}))}