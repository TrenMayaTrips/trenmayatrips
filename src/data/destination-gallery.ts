// Gallery images per destination, combining destination hero + related experience gallery images
import { destinationImageMap } from "./destination-images";
import { experienceGallery } from "./experience-gallery";

// Map destinations to experience gallery images by state affinity
const stateExperienceImages: Record<string, string[]> = {
  "quintana-roo": [
    ...(experienceGallery["coba-tulum-cenote"] || []),
    ...(experienceGallery["catamaran-isla-mujeres"] || []),
    ...(experienceGallery["snorkel-arrecife"] || []),
    ...(experienceGallery["bacalar-laguna"] || []),
  ],
  yucatan: [
    ...(experienceGallery["amanecer-maya-uxmal"] || []),
    ...(experienceGallery["ek-balam-valladolid"] || []),
  ],
  campeche: [
    ...(experienceGallery["calakmul-1"] || []),
    ...(experienceGallery["calakmul-biosfera"] || []),
  ],
  tabasco: [
    ...(experienceGallery["ruta-del-cacao"] || []),
  ],
  chiapas: [
    ...(experienceGallery["palenque-agua-azul"] || []),
    ...(experienceGallery["temazcal-selva"] || []),
  ],
};

export function getDestinationGallery(slug: string, state: string): string[] {
  const heroImage = destinationImageMap[slug];
  const stateImages = stateExperienceImages[state] || [];

  // Combine: hero first, then up to 5 state images (avoiding duplicates)
  const images: string[] = [];
  if (heroImage) images.push(heroImage);

  for (const img of stateImages) {
    if (!images.includes(img) && images.length < 6) {
      images.push(img);
    }
  }

  return images;
}
