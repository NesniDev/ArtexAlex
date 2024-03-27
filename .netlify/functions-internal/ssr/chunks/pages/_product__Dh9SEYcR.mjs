/* empty css                                */
import { c as createAstro, d as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, g as addAttribute } from '../astro_zTmbLEjI.mjs';
import { P as PRODUCTS, $ as $$Layout, a as $$WhatsApp } from './AllProducts_CXK2Ey2H.mjs';
/* empty css                              */

const $$Astro = createAstro();
const $$product = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$product;
  const { product } = Astro2.params;
  const infoProduct = PRODUCTS.find((p) => p.id == product);
  if (!infoProduct) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Producto - ${infoProduct.name}`, "description": "", "data-astro-cid-kcnzxmp4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="m-auto max-w-5xl mb-14" data-astro-cid-kcnzxmp4> <section class="grid grid-cols-[1fr_1fr_350px] place-items-center place-content-center gap-32" data-astro-cid-kcnzxmp4> <div class="col-span-2" data-astro-cid-kcnzxmp4> <div class="my-5 col-span-1 overflow-hidden rounded-lg border-2 shadow-inner shadow-slate-800" data-astro-cid-kcnzxmp4> <img class="w-96 h-80 cursor-move transition mx-auto z-99 hover:scale-105" decoding="async"${addAttribute(infoProduct.img, "src")}${addAttribute(`Imagen del producto ${infoProduct.name}`, "alt")} id="img" data-astro-cid-kcnzxmp4> </div> <footer class="flex justify-center col-span-2 gap-3" data-astro-cid-kcnzxmp4> <img class="w-48 h-48 border-2 opacity-70 cursor-pointer rounded-2xl"${addAttribute(infoProduct.img, "src")} alt="" id="thumbnail" data-astro-cid-kcnzxmp4> <img class="w-48 h-48 border-2 opacity-70 cursor-pointer rounded-2xl"${addAttribute(infoProduct.img, "src")} alt="" id="thumbnail" data-astro-cid-kcnzxmp4> <img class="w-48 h-48 border-2 opacity-70 cursor-pointer rounded-2xl"${addAttribute(infoProduct.img, "src")} alt="" id="thumbnail" data-astro-cid-kcnzxmp4> </footer> </div> <aside class="col-span-1 flex flex-col gap-2" data-astro-cid-kcnzxmp4> <div class="select-none rounded-md flex flex-col m-auto justify-center items-center max-w-96 gap-2 border-2 p-7 border-gray-300" data-astro-cid-kcnzxmp4> <h1 class="font-extrabold text-5xl text-center" data-astro-cid-kcnzxmp4> ${infoProduct.name} </h1> <p class="text-xl" data-astro-cid-kcnzxmp4>${infoProduct.materials}</p> <p class="text-base" data-astro-cid-kcnzxmp4>${infoProduct.description}</p> <p class="text-left" data-astro-cid-kcnzxmp4><span class="text-green-500 font-extrabold text-left" data-astro-cid-kcnzxmp4>Envío gratis</span> a todo el país.</p> <div class="inline-flex justify-center items-center gap-3 bg-gray-600 text-white px-2 py-1 rounded-lg hover:scale-105 hover:bg-slate-400 transition" data-astro-cid-kcnzxmp4> ${renderComponent($$result2, "WhatsApp", $$WhatsApp, { "class": "size-5", "data-astro-cid-kcnzxmp4": true })} <a href="/" data-astro-cid-kcnzxmp4>$${infoProduct.price}</a> </div> </div> <div class="select-none rounded-md flex flex-col m-auto justify-center items-center max-w-96 gap-2 border-2 p-7 border-gray-300" data-astro-cid-kcnzxmp4> <h2 class="font-extrabold text-2xl text-center" data-astro-cid-kcnzxmp4>
Medios de Pago
</h2> <div class="flex justify-center items-center gap-5" data-astro-cid-kcnzxmp4> <img class="size-12 cursor-pointer hover:scale-105 transition" decoding="async" loading="lazy" src="/pagos/nequi.avif" alt="Pago por nequi" title="Pago por nequi" data-astro-cid-kcnzxmp4> <img class="size-12 cursor-pointer hover:scale-105 transition" decoding="async" loading="lazy" src="/pagos/bancolombia.avif" alt="Pago por Bancolombia" title="Pago por Bancolombia" data-astro-cid-kcnzxmp4> <img class="size-12 cursor-pointer hover:scale-105 transition" decoding="async" loading="lazy" src="/pagos/efectivo.avif" alt="Pago en enfectivo" title="Pago en enfectivo" data-astro-cid-kcnzxmp4> </div> </div> </aside> </section> </main> ` })}  `;
}, "C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/[product].astro", void 0);

const $$file = "C:/Users/neider_nieto/Desktop/Web/ArtexAlex/src/pages/[product].astro";
const $$url = "/[product]";

export { $$product as default, $$file as file, $$url as url };
