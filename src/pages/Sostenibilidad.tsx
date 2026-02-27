import { motion } from "framer-motion";
import { Leaf, TreePine, Droplets, Users, Recycle, Sun } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import SEOHead from "@/components/seo/SEOHead";
import heroImg from "@/assets/hero-experiencias.jpg";

const compromisos = [
  { icon: TreePine, title: "Conservación de selvas", desc: "Apoyamos programas de reforestación en la Península de Yucatán y contribuimos a la protección de la Reserva de la Biósfera de Calakmul." },
  { icon: Droplets, title: "Protección de cenotes", desc: "Promovemos el uso responsable de cenotes y apoyamos iniciativas de limpieza y conservación de estos cuerpos de agua sagrados." },
  { icon: Users, title: "Comunidades mayas", desc: "Trabajamos directamente con comunidades mayas contemporáneas, asegurando que el turismo genere beneficios económicos justos y respete sus tradiciones." },
  { icon: Recycle, title: "Turismo sin huella", desc: "Implementamos prácticas de turismo responsable: reducción de plásticos, compensación de carbono y proveedores locales." },
  { icon: Sun, title: "Energía limpia", desc: "Priorizamos proveedores y alojamientos que utilizan energías renovables y prácticas de construcción sustentable." },
  { icon: Leaf, title: "Educación ambiental", desc: "Cada experiencia incluye componentes educativos sobre la biodiversidad y los ecosistemas del sureste mexicano." },
];

const Sostenibilidad = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Sostenibilidad — Tren Maya Trips"
        description="Nuestro compromiso con el medio ambiente y las comunidades mayas. Turismo responsable que protege la selva, los cenotes y la cultura viva del sureste de México."
      />
      <ParallaxHero imageSrc={heroImg} imageAlt="Sostenibilidad - Tren Maya Trips">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Sostenibilidad</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">Turismo responsable que protege y celebra el Mundo Maya</p>
      </ParallaxHero>

      {/* Intro */}
      <section className="py-16 md:py-24 relative">
        <MayaPattern variant="greca" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Nuestro compromiso</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Viajar bien, hacer bien
            </h2>
            <GrecaDivider variant="jade" size="sm" className="mt-4 mb-6 max-w-xs mx-auto" />
            <p className="text-muted-foreground leading-relaxed text-lg">
              En Tren Maya Trips creemos que el turismo tiene el poder de transformar positivamente las 
              comunidades y los ecosistemas. Por eso, cada circuito que diseñamos integra principios de 
              sostenibilidad ambiental, respeto cultural y desarrollo económico local.
            </p>
          </div>
        </div>
      </section>

      {/* Compromisos */}
      <section className="py-16 md:py-24 bg-secondary relative">
        <MayaPattern variant="pop" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Acciones concretas</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Nuestros compromisos</h2>
            <GrecaDivider variant="gold" size="sm" className="mt-4 max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {compromisos.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <c.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative">
        <MayaPattern variant="greca" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Quieres viajar de manera responsable?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Todos nuestros paquetes incluyen prácticas de turismo sostenible. Explora nuestras opciones 
            y viaja con la tranquilidad de saber que estás contribuyendo positivamente.
          </p>
          <a
            href="/paquetes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-jade-light transition-colors"
          >
            Ver paquetes sostenibles
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sostenibilidad;
