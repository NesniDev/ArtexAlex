/* empty css                                */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderSlot, f as addAttribute, g as renderHead, h as renderComponent } from '../astro_Czy6XCBb.mjs';
/* empty css                        */

const $$Astro$2 = createAstro();
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Container;
  return renderTemplate`${maybeRenderHead()}<section class="flex w-full mx-auto max-w-[1000px] justify-between items-center"> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/components/Container.astro", void 0);

const $$Astro$1 = createAstro();
const $$NoEncontrada = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NoEncontrada;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/Icon.ico"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/layouts/NoEncontrada.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "NoEncontrada", $$NoEncontrada, { "title": "Error 404", "description": "" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto justify-center min-h-[100vh] flex flex-col gap-10"> <h2 class="text-7xl font-medium text-white text-center">
Página No Encontrada
</h2> <img decoding="async" class="w-[300px] h-auto mx-auto" src="/img/ArtexAlex.webp" alt=""> <div class="text-center hover:scale-110 transition"> <a href="/" class="bg-slate-500 text-white hover:bg-orange-300 hover:text-black px-5 py-2 text-2xl font-extralight rounded-xl inline">Ir a la página principal</a> </div> </section> ` })} ` })}`;
}, "C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/404.astro", void 0);

const $$file = "C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Container as $, _404 as _ };
