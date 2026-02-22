import palenquePalace from "@/assets/litografias/palenque-palace.jpg";
import sabachtsche from "@/assets/litografias/sabachtsche.jpg";
import idoloCopan from "@/assets/litografias/idolo-copan.jpg";
import idoloRotoCopan from "@/assets/litografias/idolo-roto-copan.jpg";
import lasMonjasChichen from "@/assets/litografias/las-monjas-chichen.jpg";
import izamalJaguar from "@/assets/litografias/izamal-jaguar.jpg";

export interface Litografia {
  id: string;
  title: string;
  site: string;
  artist: string;
  year: string;
  image: string;
  orientation: "horizontal" | "vertical";
}

export const litografias: Litografia[] = [
  {
    id: "palenque-palace",
    title: "Patio del Palacio de Palenque",
    site: "Palenque, Chiapas",
    artist: "Frederick Catherwood",
    year: "1844",
    image: palenquePalace,
    orientation: "horizontal",
  },
  {
    id: "sabachtsche",
    title: "Ruinas de Sabachtsche",
    site: "Yucatán",
    artist: "Frederick Catherwood",
    year: "1844",
    image: sabachtsche,
    orientation: "vertical",
  },
  {
    id: "idolo-copan",
    title: "Ídolo de Copán",
    site: "Copán, Honduras",
    artist: "Frederick Catherwood",
    year: "1844",
    image: idoloCopan,
    orientation: "vertical",
  },
  {
    id: "idolo-roto-copan",
    title: "Ídolo Roto de Copán",
    site: "Copán, Honduras",
    artist: "Frederick Catherwood",
    year: "1844",
    image: idoloRotoCopan,
    orientation: "horizontal",
  },
  {
    id: "las-monjas-chichen",
    title: "Las Monjas, Chichén Itzá",
    site: "Chichén Itzá, Yucatán",
    artist: "Frederick Catherwood",
    year: "1844",
    image: lasMonjasChichen,
    orientation: "horizontal",
  },
  {
    id: "izamal-jaguar",
    title: "Izamal — El Jaguar",
    site: "Izamal, Yucatán",
    artist: "Frederick Catherwood",
    year: "1844",
    image: izamalJaguar,
    orientation: "horizontal",
  },
];

/** Get a random lithograph, optionally excluding an id */
export const getRandomLitografia = (excludeId?: string) => {
  const filtered = excludeId
    ? litografias.filter((l) => l.id !== excludeId)
    : litografias;
  return filtered[Math.floor(Math.random() * filtered.length)];
};
