/* ============================================================
   EL MUSE CULE — Landing v1
   Reproductor de muestra, formulario (solo front-end por ahora)
   y acordeón de preguntas frecuentes.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Reproductor de audio ---------- */
  var audio = document.getElementById("audio-sample");
  var playBtn = document.getElementById("hero-play");
  var iconPlay = playBtn.querySelector(".icon-play");
  var iconPause = playBtn.querySelector(".icon-pause");
  var progress = document.getElementById("progress");
  var progressFill = document.getElementById("progress-fill");
  var timeCurrent = document.getElementById("time-current");
  var timeTotal = document.getElementById("time-total");

  function fmt(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  function setPlayingUI(isPlaying) {
    iconPlay.style.display = isPlaying ? "none" : "";
    iconPause.style.display = isPlaying ? "" : "none";
    playBtn.setAttribute("aria-label", isPlaying ? "Pausar muestra de audio" : "Reproducir muestra de audio");
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().catch(function () {
        /* El navegador bloqueó la reproducción; el usuario puede reintentarlo. */
      });
    } else {
      audio.pause();
    }
  }

  playBtn.addEventListener("click", togglePlay);

  /* Las tarjetas de episodios reproducen la misma muestra (v1: solo existe un audio de muestra). */
  document.querySelectorAll("[data-play]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (audio.paused) {
        togglePlay();
      }
      document.getElementById("player-card").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  audio.addEventListener("play", function () { setPlayingUI(true); });
  audio.addEventListener("pause", function () { setPlayingUI(false); });
  audio.addEventListener("ended", function () {
    setPlayingUI(false);
    progressFill.style.width = "0%";
    progress.setAttribute("aria-valuenow", "0");
    timeCurrent.textContent = "0:00";
  });

  audio.addEventListener("loadedmetadata", function () {
    timeTotal.textContent = fmt(audio.duration);
  });

  audio.addEventListener("timeupdate", function () {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + "%";
    progress.setAttribute("aria-valuenow", String(Math.round(pct)));
    timeCurrent.textContent = fmt(audio.currentTime);
  });

  function seekFromEvent(e) {
    if (!audio.duration) return;
    var rect = progress.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width;
    x = Math.max(0, Math.min(1, x));
    audio.currentTime = x * audio.duration;
  }
  progress.addEventListener("click", seekFromEvent);
  progress.addEventListener("keydown", function (e) {
    if (!audio.duration) return;
    if (e.key === "ArrowRight") { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); e.preventDefault(); }
    if (e.key === "ArrowLeft") { audio.currentTime = Math.max(0, audio.currentTime - 5); e.preventDefault(); }
  });

  /* ---------- Formulario (front-end; el backend con Supabase/Resend viene después) ---------- */
  var form = document.getElementById("registro");
  var emailInput = document.getElementById("email");
  var errorMsg = document.getElementById("form-error");
  var successBox = document.getElementById("signup-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = emailInput.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (!valid) {
      errorMsg.hidden = false;
      emailInput.classList.add("invalid");
      emailInput.focus();
      return;
    }

    errorMsg.hidden = true;
    emailInput.classList.remove("invalid");

    /* TODO (fase 2): enviar el correo a Supabase + Resend.
       Por ahora solo se muestra el estado de éxito en pantalla. */
    form.hidden = true;
    successBox.hidden = false;
  });

  emailInput.addEventListener("input", function () {
    errorMsg.hidden = true;
    emailInput.classList.remove("invalid");
  });

  /* ---------- FAQ: solo una abierta a la vez ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      document.querySelectorAll(".faq-item").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Año del pie de página ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
