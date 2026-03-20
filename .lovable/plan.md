

## Rediseño del mapa de asientos — Layout realista de vagón

### Problema actual
El diagrama actual es una cuadrícula vertical simplificada con 6 filas de asientos A/B/C/D. No refleja la disposición real del vagón del Tren Maya.

### Referencia (imagen del usuario)
El mapa real muestra:
- **Orientación horizontal** (vagón alargado)
- **WC** en el extremo izquierdo con acento verde
- **4 filas** de asientos (2 arriba + 2 abajo, separadas por pasillo central)
- **Asientos numerados** del 1 al 68 (para Xiinbal)
- **Zonas de equipaje** (iconos de maleta) en el centro y extremos, con acento dorado
- **Separación central** entre dos mitades del vagón
- Scroll horizontal en mobile para ver todo el vagón

### Plan de implementación

**Archivo: `src/pages/VagonDetalle.tsx`** — Reescribir el componente `SeatLayout`

1. **Estructura de datos por clase**: Definir la distribución real de asientos para cada vagón:
   - Xiinbal: 68 asientos, 4 filas (2+2), con zona WC y 2 zonas de equipaje
   - Janal: 52 asientos, distribución similar con más espacio entre asientos
   - P'atal: 32 asientos, configuración VIP con asientos más amplios

2. **Layout horizontal del vagón**:
   - Contenedor con forma de vagón (bordes redondeados en extremos)
   - Fondo verde claro para la zona WC (extremo izquierdo)
   - Asientos en cuadrícula 4-filas × N-columnas con pasillo central
   - Zonas de equipaje (icono maleta) con fondo dorado claro
   - Overflow-x scroll en mobile con indicador de scroll

3. **Asientos**:
   - Cada asiento muestra su número
   - Tooltip al tocar/hover con info (número + ubicación ventana/pasillo)
   - Sin estado "ocupado" (es solo referencia visual)
   - Bordes redondeados superiores para simular respaldo

4. **Leyenda y specs** se mantienen debajo del diagrama

### Detalles técnicos
- El vagón se renderiza como un `div` con `overflow-x-auto` en mobile
- Las zonas de equipaje usan un icono SVG simple de maleta
- Se usa CSS grid para alinear columnas de asientos
- Los datos de distribución (cuántas columnas, dónde van equipajes/WC) se parametrizan por clase

