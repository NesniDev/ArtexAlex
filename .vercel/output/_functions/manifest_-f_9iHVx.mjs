import 'cookie';
import { $ as bold, a0 as red, a1 as yellow, a2 as dim, a3 as blue } from './chunks/astro_Czy6XCBb.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
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

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.5.12/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/AllProducts.D9kj0CI1.css"},{"type":"inline","content":"@import\"https://fonts.cdnfonts.com/css/caviar-dreams\";@import\"https://fonts.cdnfonts.com/css/atomic\";:root{--letterCaviar: \"Caviar Dreams\", system-ui, sans-serif;--letterAtomic: \"Atomic\", system-ui, sans-serif}html{font-family:var(--letterAtomic);background:linear-gradient(#000000e6,#fffc);scroll-behavior:smooth}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DNtPiekx.js"}],"styles":[{"type":"external","src":"/_astro/AllProducts.D9kj0CI1.css"},{"type":"inline","content":".grids[data-astro-cid-cigcyi7f]{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:20px}article[data-astro-cid-cigcyi7f]:hover .img[data-astro-cid-cigcyi7f]{transform:scale(1.05);filter:saturate(1.5)}\n@import\"https://fonts.cdnfonts.com/css/caviar-dreams\";@import\"https://fonts.cdnfonts.com/css/ever-looser-untextured\";@import\"https://fonts.cdnfonts.com/css/rayville-free-personal-use\";@media (min-width: 768px){header[data-astro-cid-3ef6ksr2]{transition:animation .2s ease-in;animation:blur-header linear both;animation-timeline:scroll(root block);animation-range:0 10px}@keyframes blur-header{1%{color:#fff}to{z-index:100;background:#000000b3;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);color:#fff}}}.menuview[data-astro-cid-3ef6ksr2],.menuclose[data-astro-cid-3ef6ksr2]{transition:opacity .2s ease-in-out}:root{--letterCaviar: \"Caviar Dreams\", system-ui, sans-serif;--letterTitle: \"EVER LOOSER\", \"Caviar Dreams\", system-ui, sans-serif;--letterRayville: \"Rayville Free Personal Use\", \"Caviar Dreams\", system-ui, sans-serif}html{font-family:Caviar Dreams,system-ui,sans-serif;background:#fff;scroll-behavior:smooth}h6,h3,h4,h5{font-family:var(--letterRayville)}h1,h2{font-family:var(--letterTitle)}.vi{transition:animation .2s ease-in-out;animation:inicio linear both;animation-timeline:scroll(root);animation-range:0 10px}@keyframes inicio{0%{opacity:0}to{opacity:1}}\n"}],"routeData":{"route":"/allproducts","isIndex":false,"type":"page","pattern":"^\\/AllProducts\\/?$","segments":[[{"content":"AllProducts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/AllProducts.astro","pathname":"/AllProducts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DNtPiekx.js"}],"styles":[{"type":"external","src":"/_astro/AllProducts.D9kj0CI1.css"},{"type":"inline","content":"@import\"https://fonts.cdnfonts.com/css/caviar-dreams\";@import\"https://fonts.cdnfonts.com/css/ever-looser-untextured\";@import\"https://fonts.cdnfonts.com/css/rayville-free-personal-use\";@media (min-width: 768px){header[data-astro-cid-3ef6ksr2]{transition:animation .2s ease-in;animation:blur-header linear both;animation-timeline:scroll(root block);animation-range:0 10px}@keyframes blur-header{1%{color:#fff}to{z-index:100;background:#000000b3;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);color:#fff}}}.menuview[data-astro-cid-3ef6ksr2],.menuclose[data-astro-cid-3ef6ksr2]{transition:opacity .2s ease-in-out}:root{--letterCaviar: \"Caviar Dreams\", system-ui, sans-serif;--letterTitle: \"EVER LOOSER\", \"Caviar Dreams\", system-ui, sans-serif;--letterRayville: \"Rayville Free Personal Use\", \"Caviar Dreams\", system-ui, sans-serif}html{font-family:Caviar Dreams,system-ui,sans-serif;background:#fff;scroll-behavior:smooth}h6,h3,h4,h5{font-family:var(--letterRayville)}h1,h2{font-family:var(--letterTitle)}.vi{transition:animation .2s ease-in-out;animation:inicio linear both;animation-timeline:scroll(root);animation-range:0 10px}@keyframes inicio{0%{opacity:0}to{opacity:1}}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/Contact\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Contact.astro","pathname":"/Contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CyuaEx5V.js"}],"styles":[{"type":"external","src":"/_astro/AllProducts.D9kj0CI1.css"},{"type":"inline","content":"#img[data-astro-cid-kcnzxmp4]{-webkit-mask-image:linear-gradient(black 80%,red 20%);mask-image:linear-gradient(#000 80%,red 20%)}.active[data-astro-cid-kcnzxmp4]{opacity:1;filter:brightness(1.2);box-shadow:0 5px 5px #01172e99;border:5px solid rgba(1,23,46,.4)}\n@import\"https://fonts.cdnfonts.com/css/caviar-dreams\";@import\"https://fonts.cdnfonts.com/css/ever-looser-untextured\";@import\"https://fonts.cdnfonts.com/css/rayville-free-personal-use\";@media (min-width: 768px){header[data-astro-cid-3ef6ksr2]{transition:animation .2s ease-in;animation:blur-header linear both;animation-timeline:scroll(root block);animation-range:0 10px}@keyframes blur-header{1%{color:#fff}to{z-index:100;background:#000000b3;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);color:#fff}}}.menuview[data-astro-cid-3ef6ksr2],.menuclose[data-astro-cid-3ef6ksr2]{transition:opacity .2s ease-in-out}:root{--letterCaviar: \"Caviar Dreams\", system-ui, sans-serif;--letterTitle: \"EVER LOOSER\", \"Caviar Dreams\", system-ui, sans-serif;--letterRayville: \"Rayville Free Personal Use\", \"Caviar Dreams\", system-ui, sans-serif}html{font-family:Caviar Dreams,system-ui,sans-serif;background:#fff;scroll-behavior:smooth}h6,h3,h4,h5{font-family:var(--letterRayville)}h1,h2{font-family:var(--letterTitle)}.vi{transition:animation .2s ease-in-out;animation:inicio linear both;animation-timeline:scroll(root);animation-range:0 10px}@keyframes inicio{0%{opacity:0}to{opacity:1}}\n"}],"routeData":{"route":"/[product]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"product","dynamic":true,"spread":false}]],"params":["product"],"component":"src/pages/[product].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CokzPyON.js"}],"styles":[{"type":"external","src":"/_astro/AllProducts.D9kj0CI1.css"},{"type":"inline","content":".image[data-astro-cid-7magsbhs]{background-image:linear-gradient(to bottom,#0e0e0e99 25%,#27282b66),url(/img/fondo.avif);background-position:center;background-repeat:no-repeat;background-size:cover}lite-youtube{background-color:#000;position:relative;display:block;contain:content;background-position:center center;background-size:cover;cursor:pointer;aspect-ratio:16/9;width:100%;height:auto;border:10px solid;border-image-slice:1;border-image-source:linear-gradient(30deg,#000000,#d1cfcf,#000000)}lite-youtube:before{content:attr(data-title);display:block;position:absolute;top:0;background-image:linear-gradient(180deg,#000000ab,#0000008a 14%,#00000026 54%,#0000000d 72%,#0000 94%);height:99px;width:100%;font-family:YouTube Noto,Roboto,Arial,Helvetica,sans-serif;color:#eee;text-shadow:0 0 2px rgba(0,0,0,.5);font-size:18px;padding:25px 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box}lite-youtube:hover:before{color:#fff}lite-youtube:after{content:\"\";display:block;padding-bottom:56.25%}lite-youtube>iframe{width:100%;height:100%;position:absolute;top:0;left:0;border:0}lite-youtube>.lty-playbtn{display:block;width:100%;height:100%;background:no-repeat center/68px 48px;background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 68 48\"><path d=\"M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z\" fill=\"red\"/><path d=\"M45 24 27 14v20\" fill=\"white\"/></svg>');position:absolute;cursor:pointer;z-index:1;filter:grayscale(100%);transition:filter .1s cubic-bezier(0,0,.2,1);border:0}lite-youtube:hover>.lty-playbtn,lite-youtube .lty-playbtn:focus{filter:none}lite-youtube.lyt-activated{cursor:unset}lite-youtube.lyt-activated:before,lite-youtube.lyt-activated>.lty-playbtn{opacity:0;pointer-events:none}.lyt-visually-hidden{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}#grids[data-astro-cid-2jd4h6ln]{display:grid;grid-auto-rows:auto;grid-auto-flow:dense;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));gap:5px}article[data-astro-cid-2jd4h6ln]:hover .img[data-astro-cid-2jd4h6ln]{transform:scale(1.05);filter:saturate(1.5)}@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n@import\"https://fonts.cdnfonts.com/css/caviar-dreams\";@import\"https://fonts.cdnfonts.com/css/ever-looser-untextured\";@import\"https://fonts.cdnfonts.com/css/rayville-free-personal-use\";@media (min-width: 768px){header[data-astro-cid-3ef6ksr2]{transition:animation .2s ease-in;animation:blur-header linear both;animation-timeline:scroll(root block);animation-range:0 10px}@keyframes blur-header{1%{color:#fff}to{z-index:100;background:#000000b3;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);color:#fff}}}.menuview[data-astro-cid-3ef6ksr2],.menuclose[data-astro-cid-3ef6ksr2]{transition:opacity .2s ease-in-out}:root{--letterCaviar: \"Caviar Dreams\", system-ui, sans-serif;--letterTitle: \"EVER LOOSER\", \"Caviar Dreams\", system-ui, sans-serif;--letterRayville: \"Rayville Free Personal Use\", \"Caviar Dreams\", system-ui, sans-serif}html{font-family:Caviar Dreams,system-ui,sans-serif;background:#fff;scroll-behavior:smooth}h6,h3,h4,h5{font-family:var(--letterRayville)}h1,h2{font-family:var(--letterTitle)}.vi{transition:animation .2s ease-in-out;animation:inicio linear both;animation-timeline:scroll(root);animation-range:0 10px}@keyframes inicio{0%{opacity:0}to{opacity:1}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/AllProducts.astro",{"propagation":"none","containsHead":true}],["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/Contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/[product].astro",{"propagation":"none","containsHead":true}],["C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/[product].astro":"chunks/pages/_product__DrVGiRuN.mjs","/node_modules/.pnpm/astro@4.5.12/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BBm1i9gA.mjs","/src/pages/index.astro":"chunks/pages/index_Cw00B3-1.mjs","\u0000@astrojs-manifest":"manifest_-f_9iHVx.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.5.12/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CoIAsiI2.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_qDbD8uHo.mjs","\u0000@astro-page:src/pages/AllProducts@_@astro":"chunks/AllProducts_BkmlmYeo.mjs","\u0000@astro-page:src/pages/Contact@_@astro":"chunks/Contact_8qfVuDmt.mjs","\u0000@astro-page:src/pages/[product]@_@astro":"chunks/_product__7mKBOdDG.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_Bw1y4EjC.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CyuaEx5V.js","/astro/hoisted.js?q=2":"_astro/hoisted.DNtPiekx.js","/astro/hoisted.js?q=1":"_astro/hoisted.CokzPyON.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/AllProducts.D9kj0CI1.css","/404.avif","/foto.jpg","/Icon.ico","/logo.webp","/mainImg.avif","/imgProducts/banca.avif","/imgProducts/caballo.avif","/imgProducts/mesa.avif","/imgProducts/moto.avif","/imgProducts/perro.avif","/imgProducts/silla.avif","/pagos/bancolombia.avif","/pagos/efectivo.avif","/pagos/efecty.avif","/pagos/nequi.avif","/img/ArtexAlex.webp","/img/fondo.avif","/img/iconMenu.avif","/img/imgVideo.avif","/img/logo.svg","/_astro/hoisted.CokzPyON.js","/_astro/hoisted.CyuaEx5V.js","/_astro/hoisted.DNtPiekx.js"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
