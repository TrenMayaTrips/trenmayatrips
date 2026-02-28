import { motion } from "framer-motion";
import { Heart, Leaf, Users, Compass, Star, Shield } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import SEOHead from "@/components/seo/SEOHead";
import heroImg from "@/assets/hero-tren-maya.jpg";

const valores = [
  { icon: Heart, title: "Pasión por México", desc: "Amamos el sureste mexicano y queremos compartir su riqueza cultural con el mundo." },
  { icon: Leaf, title: "Sostenibilidad", desc: "Cada viaje respeta el entorno natural y beneficia a las comunidades locales." },
  { icon: Users, title: "Comunidad", desc: "Trabajamos de la mano con comunidades mayas para ofrecer experiencias auténticas." },
  { icon: Compass, title: "Aventura con propósito", desc: "Diseñamos circuitos que combinan exploración, aprendizaje y descanso." },
  { icon: Star, title: "Excelencia", desc: "Cuidamos cada detalle para que tu experiencia supere expectativas." },
  { icon: Shield, title: "Confianza", desc: "Transparencia en precios, atención personalizada y soporte en todo momento." },
];

const SobreNosotros = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Sobre Nosotros — Tren Maya Trips"
        description="Conoce la historia, misión y valores de Tren Maya Trips. Somos especialistas en circuitos turísticos por la ruta del Tren Maya en el sureste de México."
      />
      <ParallaxHero imageSrc={heroImg} imageAlt="Sobre Nosotros - Tren Maya Trips">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Sobre Nosotros</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">La historia detrás de cada viaje por el Mundo Maya</p>
      </ParallaxHero>

      {/* Misión */}
      <section className="py-16 md:py-24 relative">
        <MayaPattern variant="greca" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label">Nuestra misión</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Conectar viajeros con la riqueza del Mundo Maya
            </h2>
            <GrecaDivider variant="jade" size="sm" className="mt-4 mb-6 max-w-xs mx-auto" />
            <p className="text-muted-foreground leading-relaxed text-lg">
              Tren Maya Trips nació con la visión de acercar a los viajeros a las maravillas arqueológicas, 
              naturales y culturales del sureste de México. Diseñamos circuitos turísticos que aprovechan 
              la conectividad del Tren Maya para ofrecer experiencias inmersivas, cómodas y responsables 
              con las comunidades y el medio ambiente.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 md:py-24 bg-secondary relative">
        <MayaPattern variant="pop" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <p className="section-label text-center">Nuestra historia</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center">
              Del sueño a la realidad
            </h2>
            <GrecaDivider variant="gold" size="sm" className="mt-4 mb-8 max-w-xs mx-auto" />
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Fundada en Cancún, Quintana Roo, <strong className="text-foreground">Tren Maya Trips</strong> surge 
                de la pasión de un equipo de expertos en turismo y cultura maya que vieron en el Tren Maya una 
                oportunidad única: democratizar el acceso a destinos que antes requerían largos trayectos por carretera.
              </p>
              <p>
                Nuestros fundadores han recorrido cada rincón de la Península de Yucatán, Chiapas, Tabasco y 
                Campeche. Conocen las historias detrás de cada zona arqueológica, los secretos de cada cenote 
                y las tradiciones vivas de las comunidades mayas contemporáneas.
              </p>
              <p>
                Hoy, combinamos ese conocimiento profundo con la infraestructura moderna del Tren Maya para 
                crear paquetes que van más allá del turismo convencional: ofrecemos <strong className="text-foreground">experiencias 
                transformadoras</strong> que conectan a nuestros viajeros con la esencia del sureste mexicano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24 relative">
        <MayaPattern variant="greca" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="section-label">Lo que nos guía</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Nuestros valores</h2>
            <GrecaDivider variant="jade" size="sm" className="mt-4 max-w-xs mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {valores.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SobreNosotros;
