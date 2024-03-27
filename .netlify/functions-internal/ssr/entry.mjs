import { renderers } from './renderers.mjs';
import { manifest } from './manifest_Bc5gH9v2.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_CNx7Dbra.mjs');
const _page1 = () => import('./chunks/AllProducts_CoycvwOC.mjs');
const _page2 = () => import('./chunks/_product__CpNMgZlO.mjs');
const _page3 = () => import('./chunks/index_DeJnTiRc.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.5.4/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/AllProducts.astro", _page1],
    ["src/pages/[product].astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "832c2076-ec7f-490d-acf9-ef6f702b7c56"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
