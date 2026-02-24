

## Incorporar video como complemento (no reemplazo) de las fotos

El video se agrega como una capa adicional junto a las galerias existentes. El usuario decide si quiere ver fotos, video, o ambos. Nadie pierde nada.

---

### Componente reutilizable: VideoEmbed

Crear `src/components/ui/VideoEmbed.tsx`:

- Muestra poster (imagen estatica) con boton de play superpuesto
- No carga el iframe hasta que el usuario hace clic (zero-cost en datos)
- Soporta YouTube, Vimeo y MP4 directo
- Props: `url`, `poster`, `aspectRatio` (16/9 default), `badge` ("360", "Recorrido virtual"), `className`
- Boton de play: circulo `bg-black/50 backdrop-blur-sm` con icono Play, hover con acento gold
- Badge posicion absoluta top-left

### Piloto: Seccion de Vagones en el Home

La imagen estatica se **mantiene** como esta. Se agrega un boton de play encima que, al hacer clic, revela el video inline reemplazando temporalmente la imagen. Un boton de "cerrar" o "volver a foto" permite regresar a la imagen estatica.

**Cambios en datos:**
- `src/data/wagon-classes.ts`: agregar campo opcional `videoUrl?: string` a la interfaz `WagonClass`
- Agregar URLs de YouTube placeholder a cada vagon

**Cambios en UI:**
- `src/components/home/VagonesSection.tsx`: en la zona de imagen (h-44), superponer un icono de play sutil. Al hacer clic, montar el `VideoEmbed` en lugar de la imagen. Mostrar un boton "Ver fotos" para volver.

### Asi se ve la card de vagon

```text
Estado inicial (foto):
+----------------------------------+
|  [imagen estatica del vagon]     |
|                                  |
|        ▶  (play sutil)          |
|                                  |
+----------------------------------+

Despues de clic en play (video):
+----------------------------------+
|  [iframe YouTube autoplay]       |
|                                  |
|                        [✕ Foto]  |
+----------------------------------+
```

El usuario siempre puede volver a la foto. Quien no quiera gastar datos simplemente no toca el play.

---

### Archivos a crear/modificar

| Archivo | Accion |
|---|---|
| `src/components/ui/VideoEmbed.tsx` | Crear -- componente reutilizable con lazy-load, poster, boton play, badge |
| `src/data/wagon-classes.ts` | Agregar `videoUrl?: string` a `WagonClass` y URLs placeholder |
| `src/components/home/VagonesSection.tsx` | Agregar overlay de play sobre la imagen existente, toggle foto/video |

### Detalle tecnico del VideoEmbed

**Props:**
- `url`: string (YouTube/Vimeo/MP4)
- `poster?`: string (imagen fallback, se muestra antes del clic)
- `aspectRatio?`: string (default "16/9")
- `badge?`: string
- `className?`: string
- `onClose?`: () => void (callback para volver a foto)

**Comportamiento:**
1. Si se usa standalone: muestra poster + play, clic carga iframe
2. Si se usa dentro de VagonCard: el padre controla el toggle foto/video con un estado `showVideo`
3. Para YouTube: extrae video ID via regex, construye embed con `autoplay=1&rel=0`
4. Boton play: icono `Play` de lucide-react, acento gold en hover

### Estilo maya

- Borde del contenedor consistente con el resto (`rounded-xl border-border`)
- Boton play: `bg-black/40 backdrop-blur-sm`, hover `bg-accent/80` (gold)
- Badge: `bg-accent text-accent-foreground text-xs font-semibold rounded-full`
