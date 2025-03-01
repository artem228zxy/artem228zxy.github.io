const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Подключение к MongoDB
// Замените 'mongodb://your-github-server-db-uri' на реальный URI подключения к вашей базе данных
mongoose.connect('mongodb://your-github-server-db-uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключение к базе данных успешно установлено'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));

// Схема пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Эндпоинт регистрации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({ error: 'Введите логин и пароль' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'Регистрация успешна' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера при регистрации' });
  }
});

// Эндпоинт входа
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({ error: 'Введите логин и пароль' });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    // Здесь можно добавить генерацию JWT или создание сессии
    res.json({ message: 'Вход выполнен успешно' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера при входе' });
  }
});

// Запуск сервера на порту 3000
app.listen(3000, () => console.log('Сервер аутентификации запущен на порту 3000'));
