# El Muse Cule — Landing v1

Página de aterrizaje del boletín diario de noticias del FC Barcelona en audio por email.
HTML/CSS/JS estático, sin paso de build, listo para Vercel. **NO desplegada todavía: es la v1 para revisión de Yoel.**

## Previsualizar en local

```bash
cd ~/workspace/elmusecule-landing
python3 -m http.server 8471
```

Abrir en el navegador: http://localhost:8471

## Qué incluye

- **Hero**: titular "El Barça, cada día, en tu oído", subtítulo, reproductor con muestra de audio real (35 s, voz Aria, noticias verificadas del lunes 9 de noviembre de 2026: Cubarsí Golden Boy, visita de la FIFA al Camp Nou, femenino ante el Arsenal) y formulario de email.
- **Qué incluye**: 4 tarjetas con iconos SVG de línea.
- **Escucha un episodio**: 3 tarjetas (Cubarsí 9 nov, remontada del Metropolitano 8 nov, femenino ante el Arsenal 12 nov).
- **Cómo funciona**: 3 pasos.
- **Precio**: gratis 30 días → $2,99/mes, 7 días gratis.
- **FAQ**: 5 preguntas (acordeón, una abierta a la vez).
- **Footer**: aviso legal de producto no oficial y créditos de fotos.

## Identidad

Fondo oscuro, azul #004D98 y grana #A50044. Titulares Archivo Black, texto Montserrat (fuentes locales en `fonts/`). Sin tipografía monoespaciada, sin emojis, iconos SVG de línea. Estructura adaptada de la plantilla gratuita "Sport Landing Page" de Orbix Studio (una sola página, diseño atrevido, enfocada a conversión).

## Fotos usadas (licencia libre, Wikimedia Commons, CC BY-SA 4.0)

- `img/camp-nou.jpg` — Camp Nou en renovación, sept 2025 (hero)
- `img/cubarsi.jpg` — Pau Cubarsí, Argentina–España, 19 jul 2026
- `img/lamine.jpg` — Lamine Yamal, Argentina–España, 19 jul 2026
- `img/femeni.jpg` — Barça Femenino, Brann–Barça (Champions)

Créditos con enlaces en el pie de la página.

## Fotos que Yoel debe enviar (huecos a reemplazar con fotos propias)

1. **Hero principal**: foto del Camp Nou o del equipo con ambiente de partido, en vertical o cuadrada, que se vea bien en móvil. La actual es el estadio en obras (sept 2025) — sirve, pero una foto de partido o del estadio lleno luce mejor.
2. **Foto de Cubarsí celebrando el Golden Boy** (o con el trofeo) para la tarjeta del episodio del 9 de noviembre. La actual es de un partido con la selección.
3. **Foto de Fermín o de Lamine celebrando la remontada del Metropolitano** (8 nov) para la segunda tarjeta. La actual es Lamine con la selección.
4. **Foto del Barça Femenino** actual (Aitana, Alexia o el equipo) para la tercera tarjeta. La actual es de un partido de Champions contra el Brann.
5. **Foto de perfil/logo de El Muse Cule** (opcional): si quiere su imagen de marca en el encabezado en vez del logo de texto actual.
6. **Foto para la sección "Cómo funciona"** (opcional): imagen de alguien escuchando con audífonos, si quiere romper el texto.

## Limitaciones conocidas de esta v1

- Solo existe **un audio de muestra** (episodio del 9 nov, 35 s). Los botones de play de las tarjetas de episodios 1 y 2 reproducen esa misma muestra; la tarjeta 3 ("Próximo · Jue 12 nov") enlaza al formulario. Cuando haya más episodios, cada tarjeta debe apuntar a su propio MP3.
- El formulario es **solo front-end**: valida el correo y muestra el estado de éxito, pero no guarda nada. El backend (Supabase + Resend) es la fase 2.
- No hay analítica ni píxeles.

## Pendiente (fuera de esta v1)

- [ ] Dominio: **elmusecule.com verificado DISPONIBLE por Yoel mismo el 2026-11-09**, pero no puede comprarlo ahora (sin dinero ni tarjeta). Desplegar gratis en Vercel y conectar el dominio propio después.
- [ ] Backend del formulario: tabla de suscriptores en Supabase + envío con Resend (dominio propio + SPF/DKIM/DMARC).
- [ ] Decisión de cobro: Stripe no conectado; cobro desde Cuba sin resolver.
- [ ] Reemplazar las fotos de Wikimedia por las fotos propias de Yoel (lista arriba).
- [ ] Grabar episodios reales diarios de 5–7 min (la muestra es de 35 s).
- [ ] Desplegar en Vercel (repo de GitHub) cuando Yoel apruebe la v1.
