import PageLayout from "@/components/layout/PageLayout";
import GrecaDivider from "@/components/maya/GrecaDivider";
import SEOHead from "@/components/seo/SEOHead";

const AvisoPrivacidad = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Aviso de Privacidad — Tren Maya Trips"
        description="Aviso de privacidad de Tren Maya Trips. Conoce cómo recopilamos, usamos y protegemos tus datos personales conforme a la LFPDPPP."
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center">
              Aviso de Privacidad
            </h1>
            <GrecaDivider variant="jade" size="sm" className="mt-4 mb-10 max-w-xs mx-auto" />

            <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
              <p><strong>Última actualización:</strong> Febrero 2026</p>

              <p>
                En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los 
                Particulares (LFPDPPP), <strong>Tren Maya Trips</strong> (en adelante "la Empresa"), con domicilio en 
                Av. Mallorca, Residencial Mallorca, Benito Juárez, Quintana Roo, México, pone a su disposición 
                el presente Aviso de Privacidad.
              </p>

              <h2>1. Datos personales que recopilamos</h2>
              <p>La Empresa podrá recabar los siguientes datos personales:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Datos de viaje (destinos, fechas, número de viajeros)</li>
              </ul>

              <h2>2. Finalidades del tratamiento</h2>
              <p>Los datos personales serán utilizados para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proveer los servicios y productos solicitados</li>
                <li>Enviar cotizaciones y confirmaciones de viaje</li>
                <li>Enviar información promocional y newsletter (con consentimiento previo)</li>
                <li>Atender solicitudes de contacto e información</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
              </ul>

              <h2>3. Transferencia de datos</h2>
              <p>
                La Empresa no transferirá sus datos personales a terceros sin su consentimiento, salvo 
                las excepciones previstas en la LFPDPPP y su Reglamento.
              </p>

              <h2>4. Derechos ARCO</h2>
              <p>
                Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos 
                personales (derechos ARCO). Para ejercer estos derechos, envíe su solicitud a: 
                <strong> info@trenmayantrips.com</strong>
              </p>

              <h2>5. Uso de cookies</h2>
              <p>
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia de 
                navegación. Puede desactivar las cookies en la configuración de su navegador.
              </p>

              <h2>6. Cambios al aviso de privacidad</h2>
              <p>
                La Empresa se reserva el derecho de modificar el presente Aviso de Privacidad. Cualquier 
                cambio será publicado en esta página.
              </p>

              <h2>7. Contacto</h2>
              <p>
                Para cualquier duda sobre este Aviso de Privacidad, contáctenos en:<br />
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

export default AvisoPrivacidad;
