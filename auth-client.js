document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authModal = document.getElementById('auth-modal');
    const modalTitle = document.getElementById('modal-title');
    const submitAuth = document.getElementById('submit-auth');
    const closeModal = document.getElementById('close-modal');
    let authMode = 'login'; // режим авторизации: login или register
  
    // Открытие модального окна с нужным заголовком
    function openModal(mode) {
      authMode = mode;
      modalTitle.innerText = mode === 'login' ? 'Вход' : 'Регистрация';
      authModal.style.display = 'block';
    }
  
    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
      authModal.style.display = 'none';
    });
  
    loginBtn.addEventListener('click', () => openModal('login'));
    registerBtn.addEventListener('click', () => openModal('register'));
  
    submitAuth.addEventListener('click', () => {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
  
      if (!username || !password) {
        alert('Введите логин и пароль');
        return;
      }
  
      fetch(`http://localhost:3000/${authMode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(`Ошибка: ${data.error}`);
        } else {
          alert(data.message);
          authModal.style.display = 'none';
        }
      })
      .catch(err => {
        console.error('Ошибка запроса:', err);
        alert('Ошибка связи с сервером');
      });
    });
  
    // Закрываем модальное окно при клике вне его области
    window.addEventListener('click', (e) => {
      if (e.target == authModal) {
        authModal.style.display = 'none';
      }
    });
  });
  