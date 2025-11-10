document.addEventListener('DOMContentLoaded', function () {

  const loginForm = document.getElementById('loginForm');
  const captchaText = document.getElementById('captchaText');
  const captchaInput = document.getElementById('captcha');
  const refreshBtn = document.getElementById('refreshCaptcha');

  // Generar captcha aleatorio
  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  function setCaptcha() {
    window.currentCaptcha = generateCaptcha();
    captchaText.textContent = window.currentCaptcha;
    captchaInput.value = '';
  }
  setCaptcha();
  refreshBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setCaptcha();
  });

  // Validación básica personalizada
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const captcha = captchaInput.value.trim().toUpperCase();
    let valid = true;

    if (!username || !password || !captcha) {
      alert('Por favor, complete todos los campos.');
      valid = false;
    } else if (captcha !== window.currentCaptcha) {
      alert('Captcha incorrecto. Intenta de nuevo.');
      setCaptcha();
      valid = false;
    }

    if (valid) {
      // AUTENTICACIÓN REAL
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        // Si es redireccionamiento, lo seguimos
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          // Si no, mostramos el mensaje
          const text = await response.text();
          alert(text.replace(/<[^>]*>?/gm, '')); // Elimina etiquetas HTML del mensaje
          setCaptcha();
        }
      } catch (err) {
        alert('Error de conexión. Intenta más tarde.');
        setCaptcha();
      }
    }
  });

  // Activar link de recuperar contraseña de la barra lateral
  const recuperarLink = document.getElementById('recuperarLink');
  if (recuperarLink) {
    recuperarLink.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.help-links a').scrollIntoView({behavior: "smooth"});
    });
  }
});