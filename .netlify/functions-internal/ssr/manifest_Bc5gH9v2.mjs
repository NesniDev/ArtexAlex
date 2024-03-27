import 'cookie';
import './chunks/astro_zTmbLEjI.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.5.4/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/AllProducts.BMVmxWdn.css"},{"type":"inline","content":".grids[data-astro-cid-cigcyi7f]{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:20px}article[data-astro-cid-cigcyi7f]:hover .img[data-astro-cid-cigcyi7f]{transform:scale(1.05);filter:saturate(1.5)}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/allproducts","isIndex":false,"type":"page","pattern":"^\\/AllProducts\\/?$","segments":[[{"content":"AllProducts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/AllProducts.astro","pathname":"/AllProducts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.getElementById(\"img\"),t=document.querySelectorAll(\"#thumbnail\");t.forEach(e=>{e.addEventListener(\"mouseover\",()=>{t.forEach(c=>{c.classList.remove(\"active\")}),e.classList.add(\"active\"),s.setAttribute(\"src\",e.getAttribute(\"src\"))})});\n"}],"styles":[{"type":"external","src":"/_astro/AllProducts.BMVmxWdn.css"},{"type":"inline","content":"#img[data-astro-cid-kcnzxmp4]{-webkit-mask-image:linear-gradient(black 80%,red 20%);mask-image:linear-gradient(#000 80%,red 20%)}.active[data-astro-cid-kcnzxmp4]{opacity:1;filter:brightness(1.2);box-shadow:0 5px 5px #01172e99}\n"}],"routeData":{"route":"/[product]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":true,"spread":false}]],"params":["product"],"component":"src/pages/[product].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"class i extends HTMLElement{connectedCallback(){this.videoId=this.getAttribute(\"videoid\");let e=this.querySelector(\".lty-playbtn\");if(this.playLabel=e&&e.textContent.trim()||this.getAttribute(\"playlabel\")||\"Play\",this.dataset.title=this.getAttribute(\"title\")||\"\",this.style.backgroundImage||(this.style.backgroundImage=`url(\"https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg\")`,this.upgradePosterImage()),e||(e=document.createElement(\"button\"),e.type=\"button\",e.classList.add(\"lty-playbtn\"),this.append(e)),!e.textContent){const t=document.createElement(\"span\");t.className=\"lyt-visually-hidden\",t.textContent=this.playLabel,e.append(t)}this.addNoscriptIframe(),e.removeAttribute(\"href\"),this.addEventListener(\"pointerover\",i.warmConnections,{once:!0}),this.addEventListener(\"click\",this.activate),this.needsYTApi=this.hasAttribute(\"js-api\")||navigator.vendor.includes(\"Apple\")||navigator.userAgent.includes(\"Mobi\")}static addPrefetch(e,t,a){const r=document.createElement(\"link\");r.rel=e,r.href=t,a&&(r.as=a),document.head.append(r)}static warmConnections(){i.preconnected||(i.addPrefetch(\"preconnect\",\"https://www.youtube-nocookie.com\"),i.addPrefetch(\"preconnect\",\"https://www.google.com\"),i.addPrefetch(\"preconnect\",\"https://googleads.g.doubleclick.net\"),i.addPrefetch(\"preconnect\",\"https://static.doubleclick.net\"),i.preconnected=!0)}fetchYTPlayerApi(){window.YT||window.YT&&window.YT.Player||(this.ytApiPromise=new Promise((e,t)=>{var a=document.createElement(\"script\");a.src=\"https://www.youtube.com/iframe_api\",a.async=!0,a.onload=r=>{YT.ready(e)},a.onerror=t,this.append(a)}))}async getYTPlayer(){return this.playerPromise||await this.activate(),this.playerPromise}async addYTPlayerIframe(){this.fetchYTPlayerApi(),await this.ytApiPromise;const e=document.createElement(\"div\");this.append(e);const t=Object.fromEntries(this.getParams().entries());this.playerPromise=new Promise(a=>{let r=new YT.Player(e,{width:\"100%\",videoId:this.videoId,playerVars:t,events:{onReady:s=>{s.target.playVideo(),a(r)}}})})}addNoscriptIframe(){const e=this.createBasicIframe(),t=document.createElement(\"noscript\");t.innerHTML=e.outerHTML,this.append(t)}getParams(){const e=new URLSearchParams(this.getAttribute(\"params\")||[]);return e.append(\"autoplay\",\"1\"),e.append(\"playsinline\",\"1\"),e}async activate(){if(this.classList.contains(\"lyt-activated\"))return;if(this.classList.add(\"lyt-activated\"),this.needsYTApi)return this.addYTPlayerIframe(this.getParams());const e=this.createBasicIframe();this.append(e),e.focus()}createBasicIframe(){const e=document.createElement(\"iframe\");return e.width=560,e.height=315,e.title=this.playLabel,e.allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\",e.allowFullscreen=!0,e.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${this.getParams().toString()}`,e}upgradePosterImage(){setTimeout(()=>{const e=`https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`,t=new Image;t.fetchPriority=\"low\",t.referrerpolicy=\"origin\",t.src=e,t.onload=a=>{a.target.naturalHeight==90&&a.target.naturalWidth==120||(this.style.backgroundImage=`url(\"${e}\")`)}},100)}}customElements.define(\"lite-youtube\",i);\n"}],"styles":[{"type":"external","src":"/_astro/AllProducts.BMVmxWdn.css"},{"type":"inline","content":".image[data-astro-cid-7magsbhs]{background-image:linear-gradient(to bottom,#0e0e0e99 25%,#27282b66),url(/img/fondo.avif);background-position:center;background-repeat:no-repeat;background-size:cover}lite-youtube{background-color:#000;position:relative;display:block;contain:content;background-position:center center;background-size:cover;cursor:pointer;aspect-ratio:16/9;width:100%;height:auto;border:10px solid;border-image-slice:1;border-image-source:linear-gradient(30deg,#000000,#d1cfcf,#000000)}lite-youtube:before{content:attr(data-title);display:block;position:absolute;top:0;background-image:linear-gradient(180deg,#000000ab,#0000008a 14%,#00000026 54%,#0000000d 72%,#0000 94%);height:99px;width:100%;font-family:YouTube Noto,Roboto,Arial,Helvetica,sans-serif;color:#eee;text-shadow:0 0 2px rgba(0,0,0,.5);font-size:18px;padding:25px 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box}lite-youtube:hover:before{color:#fff}lite-youtube:after{content:\"\";display:block;padding-bottom:56.25%}lite-youtube>iframe{width:100%;height:100%;position:absolute;top:0;left:0;border:0}lite-youtube>.lty-playbtn{display:block;width:100%;height:100%;background:no-repeat center/68px 48px;background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 68 48\"><path d=\"M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z\" fill=\"red\"/><path d=\"M45 24 27 14v20\" fill=\"white\"/></svg>');position:absolute;cursor:pointer;z-index:1;filter:grayscale(100%);transition:filter .1s cubic-bezier(0,0,.2,1);border:0}lite-youtube:hover>.lty-playbtn,lite-youtube .lty-playbtn:focus{filter:none}lite-youtube.lyt-activated{cursor:unset}lite-youtube.lyt-activated:before,lite-youtube.lyt-activated>.lty-playbtn{opacity:0;pointer-events:none}.lyt-visually-hidden{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.grids[data-astro-cid-2jd4h6ln]{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:20px}article[data-astro-cid-2jd4h6ln]:hover .img[data-astro-cid-2jd4h6ln]{transform:scale(1.05);filter:saturate(1.5)}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/AllProducts.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/[product].astro",{"propagation":"none","containsHead":true}],["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/AllProducts@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/[product].astro":"chunks/pages/_product__Dh9SEYcR.mjs","/node_modules/.pnpm/astro@4.5.4/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_DhII4fjo.mjs","/src/pages/index.astro":"chunks/pages/index_DuIyiZJa.mjs","\u0000@astrojs-manifest":"manifest_Bc5gH9v2.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.5.4/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CNx7Dbra.mjs","\u0000@astro-page:src/pages/AllProducts@_@astro":"chunks/AllProducts_CoycvwOC.mjs","\u0000@astro-page:src/pages/[product]@_@astro":"chunks/_product__CpNMgZlO.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DeJnTiRc.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DJ3kuB1b.js","/astro/hoisted.js?q=1":"_astro/hoisted.DkY74W4p.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/AllProducts.BMVmxWdn.css","/foto.jpg","/Icon.ico","/logo.webp","/mainImg.avif","/img/ArtexAlex.webp","/img/fondo.avif","/img/imgVideo.avif","/img/logo.svg","/imgProducts/banca.avif","/imgProducts/caballo.avif","/imgProducts/mesa.avif","/imgProducts/moto.avif","/imgProducts/perro.avif","/imgProducts/silla.avif","/pagos/bancolombia.avif","/pagos/efectivo.avif","/pagos/nequi.avif"],"buildFormat":"directory"});

export { manifest };
