export interface ExperienceReview {
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  highlight: string;
}

export interface ExperienceRatingBreakdown {
  guide: number;
  transport: number;
  accommodation: number;
  value: number;
}

export interface ExperienceReviewData {
  reviews: ExperienceReview[];
  breakdown: ExperienceRatingBreakdown;
  distribution: [number, number, number, number, number]; // 5★ to 1★ percentages
}

const defaultReviews: ExperienceReview[] = [
  {
    name: "María García",
    rating: 5,
    date: "enero 2026",
    text: "Una experiencia increíble que superó todas nuestras expectativas. El guía fue extraordinario, con un conocimiento profundo de la historia y la cultura. Cada detalle estuvo perfectamente organizado.",
    highlight: "Guía",
  },
  {
    name: "Carlos Mendoza",
    rating: 5,
    date: "diciembre 2025",
    text: "Lo mejor del viaje sin duda. La organización impecable y los paisajes son de otro mundo. Totalmente recomendable para familias y parejas.",
    highlight: "Naturaleza",
  },
  {
    name: "Ana Lucía Torres",
    rating: 5,
    date: "noviembre 2025",
    text: "Viajamos con niños y todo fue perfecto. El transporte cómodo, las paradas bien pensadas y la comida deliciosa. Volveremos seguro.",
    highlight: "Transporte",
  },
  {
    name: "Roberto Sánchez",
    rating: 4,
    date: "octubre 2025",
    text: "Excelente relación calidad-precio. El itinerario está muy bien diseñado y no se siente apresurado. El único detalle fue que hizo mucho calor, pero eso es normal en la zona.",
    highlight: "Precio",
  },
  {
    name: "Fernanda López",
    rating: 5,
    date: "septiembre 2025",
    text: "El amanecer fue mágico, una de esas experiencias que te cambian. El guía nos contó historias fascinantes. La comida regional estuvo espectacular.",
    highlight: "Gastronomía",
  },
];

const defaultBreakdown: ExperienceRatingBreakdown = {
  guide: 4.9,
  transport: 4.8,
  accommodation: 4.7,
  value: 4.8,
};

const defaultDistribution: [number, number, number, number, number] = [88, 9, 2, 1, 0];

// Per-experience overrides (slug → custom reviews)
const experienceReviewOverrides: Record<string, Partial<ExperienceReviewData>> = {
  "calakmul-biosfera": {
    reviews: [
      { name: "Javier Ruiz", rating: 5, date: "febrero 2026", text: "Calakmul es un lugar mágico. Vimos monos aulladores, tucanes y la pirámide emergiendo de la selva fue impresionante. El eco-lodge es rústico pero encantador.", highlight: "Naturaleza" },
      { name: "Patricia Vega", rating: 5, date: "enero 2026", text: "Una aventura real en la selva. El guía naturalista identificó decenas de especies de aves. Madrugar vale completamente la pena para ver el amanecer desde la pirámide.", highlight: "Guía" },
      { name: "Diego Hernández", rating: 5, date: "diciembre 2025", text: "Es de esos lugares que te hacen sentir pequeño ante la naturaleza. La zona arqueológica prácticamente vacía, solo nosotros y la selva. Inolvidable.", highlight: "Exclusividad" },
      { name: "Laura Martínez", rating: 4, date: "noviembre 2025", text: "Experiencia única pero hay que estar preparado para el calor y los mosquitos. El repelente es indispensable. La comida en la comunidad local fue auténtica y deliciosa.", highlight: "Gastronomía" },
      { name: "Miguel Ángel Castro", rating: 5, date: "octubre 2025", text: "Dos días perfectamente organizados. El contraste entre la selva virgen y las ruinas mayas es sobrecogedor. Altamente recomendable para amantes de la naturaleza.", highlight: "Alojamiento" },
    ],
  },
  "catamaran-isla-mujeres": {
    reviews: [
      { name: "Sofía Ramírez", rating: 5, date: "febrero 2026", text: "El mejor día de nuestras vacaciones en Cancún. El catamarán es hermoso, la música genial y el snorkel increíble. Vimos tortugas y rayas.", highlight: "Naturaleza" },
      { name: "Andrés Morales", rating: 4, date: "enero 2026", text: "Muy divertido, el open bar está generoso y la tripulación es súper animada. Isla Mujeres es preciosa. Solo desearía más tiempo libre en la isla.", highlight: "Diversión" },
      { name: "Valentina Ochoa", rating: 5, date: "diciembre 2025", text: "Perfecto para una salida en grupo. La comida a bordo estuvo buena y el snorkel fue una experiencia maravillosa. Las fotos del arrecife son espectaculares.", highlight: "Gastronomía" },
      { name: "Enrique Díaz", rating: 5, date: "noviembre 2025", text: "Navegamos con un clima perfecto. El agua cristalina, los peces de colores y el ambiente festivo hicieron de este un día memorable.", highlight: "Guía" },
    ],
    breakdown: { guide: 4.8, transport: 4.9, accommodation: 4.5, value: 4.7 },
  },
};

export function getReviewsForExperience(slug: string, rating: number, reviewCount: number): ExperienceReviewData {
  const overrides = experienceReviewOverrides[slug];
  return {
    reviews: overrides?.reviews || defaultReviews.slice(0, Math.min(5, Math.max(3, Math.floor(reviewCount / 20)))),
    breakdown: overrides?.breakdown || defaultBreakdown,
    distribution: overrides?.distribution || defaultDistribution,
  };
}
