export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export const authors: Record<string, AuthorProfile> = {
  "Ana Lucía Reyes": {
    name: "Ana Lucía Reyes",
    role: "Editora de Viajes",
    bio: "Ana Lucía es editora especializada en turismo sustentable y movilidad en el sureste mexicano. Ha recorrido las 34 estaciones del Tren Maya documentando experiencias para viajeros independientes.",
    initials: "AL",
    linkedin: "https://linkedin.com/in/analuciareyestravel",
    twitter: "https://x.com/analuciaviajes",
  },
  "Dr. Roberto Canul": {
    name: "Dr. Roberto Canul",
    role: "Arqueólogo e Historiador",
    bio: "El Dr. Roberto Canul es arqueólogo especializado en la civilización maya. Ha participado en excavaciones en Chichén Itzá, Uxmal y Calakmul durante más de 15 años.",
    initials: "RC",
    linkedin: "https://linkedin.com/in/robertocanulmaya",
    website: "https://robertocanul.mx",
  },
  "María José Kumul": {
    name: "María José Kumul",
    role: "Periodista Gastronómica",
    bio: "María José es periodista y cocinera tradicional yucateca. Escribe sobre la gastronomía del sureste y su conexión con la cultura maya contemporánea.",
    initials: "MK",
    twitter: "https://x.com/mjkumul",
  },
  "Carlos Ek Balam": {
    name: "Carlos Ek Balam",
    role: "Guía de Ecoturismo Certificado",
    bio: "Carlos es guía de ecoturismo certificado por SECTUR con más de 10 años de experiencia en la Península de Yucatán. Especialista en cenotes, reservas naturales y turismo comunitario.",
    initials: "CE",
    linkedin: "https://linkedin.com/in/carlosekbalam",
  },
  "Sofía Tzec": {
    name: "Sofía Tzec",
    role: "Especialista en Turismo Cultural",
    bio: "Sofía es licenciada en turismo cultural por la UADY. Se dedica a promover las tradiciones vivas de las comunidades mayas a través del turismo responsable.",
    initials: "ST",
    twitter: "https://x.com/sofiatzec",
    website: "https://sofiatzec.com",
  },
};

export function getAuthor(name: string): AuthorProfile {
  return authors[name] ?? {
    name,
    role: "",
    bio: "",
    initials: name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase(),
  };
}
