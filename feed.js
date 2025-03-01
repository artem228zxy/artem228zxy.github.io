document.addEventListener('DOMContentLoaded', function() {
    const feedContainer = document.getElementById('feed-container');
  
    // Массив с данными популярных работ
    const works = [
      {
        type: 'image',
        title: 'Красивый пейзаж',
        url: 'https://via.placeholder.com/800x400?text=Пейзаж'
      },
      {
        type: 'text',
        title: 'Интересный рассказ',
        content: 'Однажды в далекой стране жил мудрый старец, который знал все тайны мира.'
      },
      {
        type: 'music',
        title: 'Уютная мелодия',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      {
        type: 'photo',
        title: 'Невероятное фото',
        url: 'https://via.placeholder.com/800x400?text=Фото'
      }
      // Можно добавить больше элементов
    ];
  
    // Функция для создания и отображения элементов ленты
    works.forEach(work => {
      const item = document.createElement('div');
      item.classList.add('feed-item');
  
      // Создание заголовка для элемента ленты
      const title = document.createElement('h3');
      title.innerText = work.title;
      item.appendChild(title);
  
      // В зависимости от типа работы создаём соответствующий элемент
      if (work.type === 'image' || work.type === 'photo') {
        const img = document.createElement('img');
        img.src = work.url;
        img.alt = work.title;
        item.appendChild(img);
      } else if (work.type === 'text') {
        const text = document.createElement('p');
        text.innerText = work.content;
        item.appendChild(text);
      } else if (work.type === 'music') {
        const audio = document.createElement('audio');
        audio.controls = true;
        const source = document.createElement('source');
        source.src = work.url;
        source.type = 'audio/mpeg';
        audio.appendChild(source);
        item.appendChild(audio);
      }
      
      feedContainer.appendChild(item);
    });
  });  