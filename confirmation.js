(() => {
  const fragment = new URLSearchParams(location.hash.slice(1));
  const query = new URLSearchParams(location.search);
  // El correo ya fue verificado por Supabase antes de esta redirección.
  // No conservar, registrar ni enviar los tokens que llegan en el fragmento.
  const failed = fragment.has('error') || query.has('error') || fragment.has('error_code') || query.has('error_code');
  const confirmed = !failed && Boolean(fragment.get('access_token')) && ['signup', 'email'].includes(fragment.get('type'));
  const recovery = !failed && fragment.get('type') === 'recovery';
  if (location.hash || location.search) history.replaceState(null, '', location.pathname);
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  if (failed) {
    title.textContent = 'Revisemos tu confirmación';
    message.textContent = 'El enlace puede haber vencido o ya haberse usado. Si ya confirmaste tu correo, prueba iniciar sesión en My Planner. Si no puedes entrar, escríbenos a soporte.';
    document.title = 'My Planner · Revisar confirmación';
  } else if (confirmed) {
    title.textContent = 'Tu cuenta fue confirmada';
    message.textContent = 'Tu correo ya está verificado. Ahora puedes volver a My Planner e iniciar sesión para conectar tu planner.';
    document.getElementById('mark').setAttribute('d', 'M7 16l6 6L25 10');
    document.title = 'My Planner · Cuenta confirmada';
  } else if (recovery) {
    title.textContent = 'Recuperación de acceso';
    message.textContent = 'Esta página todavía no permite cambiar la contraseña. Escríbenos a soporte para recibir ayuda. No envíes tu contraseña ni el enlace del correo.';
  }
})();
