import ctaMayaTemple from "@/assets/litografias/cta-maya-temple.jpg";
import newsletterRuins from "@/assets/litografias/newsletter-ruins-vignette.jpg";
import footerPanoramic from "@/assets/litografias/footer-panoramic.jpg";
import testimoniosJaguar from "@/assets/litografias/testimonios-jaguar.jpg";
import destinoCtaPyramid from "@/assets/litografias/destino-cta-pyramid.jpg";
import paqueteCtaStela from "@/assets/litografias/paquete-cta-stela.jpg";

export interface Litografia {
  id: string;
  title: string;
  image: string;
  orientation: "horizontal" | "vertical";
}

export const litografias: Litografia[] = [
  { id: "cta-temple", title: "Templo Maya", image: ctaMayaTemple, orientation: "horizontal" },
  { id: "newsletter-ruins", title: "Ruinas en la selva", image: newsletterRuins, orientation: "horizontal" },
  { id: "footer-panoramic", title: "Palacio Maya", image: footerPanoramic, orientation: "horizontal" },
  { id: "testimonios-jaguar", title: "Jaguar de piedra", image: testimoniosJaguar, orientation: "vertical" },
  { id: "destino-pyramid", title: "Pirámide escalonada", image: destinoCtaPyramid, orientation: "horizontal" },
  { id: "paquete-stela", title: "Estela tallada", image: paqueteCtaStela, orientation: "horizontal" },
];

export { ctaMayaTemple, newsletterRuins, footerPanoramic, testimoniosJaguar, destinoCtaPyramid, paqueteCtaStela };
