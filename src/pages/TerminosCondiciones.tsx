import PageLayout from "@/components/layout/PageLayout";
import GrecaDivider from "@/components/maya/GrecaDivider";
import SEOHead from "@/components/seo/SEOHead";

const TerminosCondiciones = () => {
  return (
    <PageLayout showStickyCTA={false}>
      <SEOHead
        title="Términos y Condiciones — Tren Maya Trips"
        description="Términos y condiciones de uso del sitio web y servicios de Tren Maya Trips."
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center">
              Términos y Condiciones
            </h1>
            <GrecaDivider variant="jade" size="sm" className="mt-4 mb-10 max-w-xs mx-auto" />

            <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
              <p><strong>Última actualización:</strong> Febrero 2026</p>

              <p>
                Al acceder y utilizar el sitio web de <strong>Tren Maya Trips</strong> (en adelante "el Sitio"), 
                usted acepta los presentes Términos y Condiciones. Si no está de acuerdo, le pedimos que no 
                utilice el Sitio.
              </p>

              <h2>1. Servicios</h2>
              <p>
                Tren Maya Trips ofrece servicios de consultoría, planificación y reservación de circuitos 
                turísticos a lo largo de la ruta del Tren Maya en el sureste de México. Los servicios 
                específicos, precios y disponibilidad están sujetos a cambios sin previo aviso.
              </p>

              <h2>2. Reservaciones y pagos</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Las cotizaciones tienen una vigencia de 15 días naturales</li>
                <li>Se requiere un anticipo para confirmar la reservación</li>
                <li>Los precios publicados son en pesos mexicanos (MXN) e incluyen IVA</li>
                <li>Los métodos de pago aceptados serán comunicados al momento de la reservación</li>
              </ul>

              <h2>3. Cancelaciones y reembolsos</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cancelaciones con más de 30 días de anticipación: reembolso del 100% del anticipo</li>
                <li>Cancelaciones entre 15 y 30 días: reembolso del 50%</li>
                <li>Cancelaciones con menos de 15 días: sin reembolso</li>
                <li>Cambios de fecha están sujetos a disponibilidad</li>
              </ul>

              <h2>4. Responsabilidad</h2>
              <p>
                Tren Maya Trips actúa como intermediario entre el viajero y los proveedores de servicios 
                turísticos. No nos hacemos responsables por retrasos, cancelaciones o cambios en el servicio 
                del Tren Maya operado por el gobierno federal, ni por eventos de fuerza mayor.
              </p>

              <h2>5. Propiedad intelectual</h2>
              <p>
                Todo el contenido del Sitio (textos, imágenes, diseños, logotipos) es propiedad de Tren Maya 
                Trips o se utiliza con autorización. Queda prohibida su reproducción sin consentimiento previo 
                por escrito.
              </p>

              <h2>6. Uso del sitio web</h2>
              <p>
                El usuario se compromete a utilizar el Sitio de manera lícita, sin realizar actividades que 
                puedan dañar, sobrecargar o impedir el funcionamiento normal del mismo.
              </p>

              <h2>7. Legislación aplicable</h2>
              <p>
                Los presentes Términos y Condiciones se rigen por las leyes vigentes en México. Para cualquier 
                controversia, las partes se someten a la jurisdicción de los tribunales competentes de Benito 
                Juárez, Quintana Roo.
              </p>

              <h2>8. Contacto</h2>
              <p>
                Para cualquier duda sobre estos Términos y Condiciones:<br />
                <strong>Email:</strong> info@trenmayantrips.com<br />
                <strong>Teléfono:</strong> (52) 998 218 6754
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TerminosCondiciones;
