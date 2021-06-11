'use strict'

// Универсальная функция удаления/добавления активного класса
function selectTab(elem, list, className) {
   let active = list.querySelector(`.${className}`);
   active.classList.remove(className);
   elem.classList.add(className);
}


// -----------Табы на экране наши услуги------------

let servicesTitlesList = document.querySelector('.services__titles-list');

servicesTitlesList.addEventListener('click', function (e) {
   // Список текстов
   let servicesTextsList = document.querySelector('.services__texts-list');

   if (e.target.tagName === 'A') {
      e.preventDefault();

      //табы заголовки
      selectTab(e.target.parentElement, servicesTitlesList, 'service--active');
      let id = e.target.getAttribute('href');
      let text = servicesTextsList.querySelector(id);

      // табы тексты
      selectTab(text, servicesTextsList, 'service--active');
   }
})




// ----------------Слайдер комментарии---------------

let step = 0;
let slideNum = 1;

let commentsPhotos = document.querySelector('.comments__photos');
let commentsContent = document.querySelector('.comments__content');

// Переключение по стрелкам
let prevBtn = document.querySelector('.comments__btn--prev');
let nextBtn = document.querySelector('.comments__btn--next');

nextBtn.addEventListener('click', function () {
   scrollComment(scrollRight());

})

prevBtn.addEventListener('click', function () {
   scrollComment(scrollLeft());
})

// Переключение по выбору аватара
commentsPhotos.addEventListener('click', function (e) {
   if (e.target.tagName === 'IMG') {

      let dataNum = e.target.parentElement.dataset.num;
      let bigSlide = commentsContent.querySelector(`li[data-num="${dataNum}"]`);

      // добавление активного класса
      selectTab(e.target.parentElement, commentsPhotos, 'comments--active');
      selectTab(bigSlide, commentsContent, 'comments--active');

      // Смещение слайда
      let countOfSlides = +dataNum - slideNum;
      slideNum = +dataNum;
      step += (countOfSlides * 1160);
      commentsContent.style.transform = `translateX(${-step}px)`;

   }
})

// Скролл вправо для кнопки вправо
function scrollRight() {
   step += 1160;
   slideNum++;
   if (step >= (4 * 1160)) {
      step = 0;
      slideNum = 1;
   }
   return step;
}

// Скролл влево для кнопки влево
function scrollLeft() {
   step -= 1160;
   slideNum--;
   if (step < 0) {
      step = 3 * 1160;
      slideNum = 4;
   }
   return step;
}

// прокрутка слайдов по стрелкам
function scrollComment() {

   // Смещение большого слайда
   commentsContent.style.transform = `translateX(${-step}px)`;

   // Добавление активного класса
   let activeSmTab = commentsPhotos.querySelector(`.comments__photos-item:nth-child(${slideNum})`);
   let activeBigTab = commentsContent.querySelector(`.comments__content-item:nth-child(${slideNum})`);

   selectTab(activeSmTab, commentsPhotos, 'comments--active');
   selectTab(activeBigTab, commentsContent, 'comments--active');

}


// -------------Фильтр на экране наши работы----------------



let filterList = document.querySelector('.works__filter-list');
let contentItemsList = document.querySelector('.works__content-list');

// Переключение активных табов
filterList.addEventListener('click', function (e) {
   if (e.target.tagName === 'A') {

      selectTab(e.target.parentElement, filterList, 'filter__title--active');
      let currentCategory = e.target.parentElement.dataset.title;
      // Фильтрация картинок
      filterContentItems(currentCategory);
   }
})

// Фильтрация картинок по категории
function filterContentItems(category) {
   let allContentItems = contentItemsList.querySelectorAll('.works__content-item');
   allContentItems.forEach(elem => {
      if (elem.dataset.content !== category && category !== 'all') {
         elem.classList.add('hide');
      } else {
         elem.classList.remove('hide');
      }
   })
}

// Создание 1 объекта карточки
function generateCardObj(category, imgName, title) {
   let obj = {
      category: category,
      imgSrc: `./img/cards/${imgName}`,
      imgAlt: `design image`,
      title: title,
   }
   return obj;
}

// Создание всех 36 карточек и помещение их в массив
function createCardsList() {
   let cardsList = [];
   for (let i = 0, j = 0; i < 36; i++, j++) {
      if (j === 4) {
         j = 0;
      }
      let card = generateCardObj(getRandomCategory(j), `${i + 1}.jpg`, `Creative title ${i + 1}`);
      cardsList.push(card);
   }

   // Рандомный выбор категории
   function getRandomCategory(j) {
      let filterTitles = ['Graphic Design', 'Web Design', 'Landing Pages', 'Wordpress'];
      return filterTitles[j];
   }
   return cardsList;
}



// Массив со всеми  36 карточками
let cards = createCardsList();

// создание 1 карточки для вставки в HTML
function createCard(obj) {
   contentItemsList.innerHTML += `<li class="works__content-item content__item" data-content="${obj.category.split(' ').join('-')}">
   <img class="content__item-img" src="${obj.imgSrc}" width="285" height="206"
      alt="${obj.imgAlt}">
   <div class="content__item-text content-block">
      <p class="content-block__links">
         <a href="#!" class="content__item-link content-block__source ">
            <svg class="content-block__source-img" width="15" height="15" viewBox="0 0 15 15"
               fill="#1FDAB5">
               <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M13.9131 2.72817L12.0948 0.891285C11.2902 0.0808612 9.98305 0.0759142 9.17681 0.882615L7.15921 2.89256C6.35161 3.69885 6.34818 5.01032 7.15051 5.82074L8.30352 4.68897C8.18678 4.32836 8.33041 3.9153 8.61593 3.62946L9.89949 2.35187C10.3061 1.94624 10.9584 1.94913 11.3595 2.35434L12.4513 3.45805C12.8528 3.86283 12.8511 4.51713 12.447 4.92318L11.1634 6.20241C10.8918 6.47296 10.4461 6.62168 10.1002 6.52626L8.97094 7.65887C9.77453 8.47177 11.0803 8.47466 11.8889 7.66837L13.9039 5.65924C14.7141 4.85254 14.7167 3.53983 13.9131 2.72817ZM6.52613 10.0918C6.62191 10.4441 6.46857 10.8997 6.19093 11.1777L4.99227 12.3752C4.58074 12.7845 3.91595 12.7833 3.50671 12.369L2.39297 11.2475C1.98465 10.8349 1.98729 10.1633 2.39824 9.75473L3.59804 8.55769C3.89032 8.26607 4.31044 8.12025 4.67711 8.24375L5.83354 7.0715C5.01493 6.2462 3.68249 6.24207 2.86059 7.06324L0.915197 9.0042C0.0922615 9.8266 0.0883685 11.1629 0.90651 11.9886L2.75817 13.8618C3.57595 14.6846 4.90724 14.6912 5.73111 13.8701L7.67649 11.9287C8.49852 11.1054 8.5024 9.77166 7.68553 8.9443L6.52613 10.0918ZM6.25787 9.56307C5.98013 9.84189 5.53427 9.84105 5.26179 9.55812C4.98792 9.27434 4.9901 8.82039 5.26613 8.53993L8.59075 5.16109C8.86679 4.88227 9.31174 4.88311 9.58513 5.16398C9.86048 5.44569 9.85876 5.90088 9.5817 6.18299L6.25787 9.56307Z" />
            </svg>
         </a>
         <a href="#!" class="content__item-link content-block__play">
            <svg class="content__block__play-img" width="12" height="11" viewBox="0 0 12 11" fill="#1FDAB5">
               <rect width="12" height="11" />
            </svg>
         </a>
      </p>
      <h3 class="content__item-title">${obj.title}</h3>
      <p class="content__item-subtitle">${obj.category}</p>
   </div>
</li>`
}

// Вставка по 12 карточек в документ
function addCardsToList() {
   let cardsPart = cards.splice(0, 12);

   for (let i = 0; i < 12; i++) {
      createCard(cardsPart[i]);
   }
}

addCardsToList();


// Догрузка по кнопке
let loadBtn = document.querySelector('.works__btn-load');

loadBtn.addEventListener('click', function () {
   showLoadImg('load-img');
   setTimeout(() => {
      let activeTab = document.querySelector('.filter__title--active');
      // Догрузка картинок
      addCardsToList();
      // Фильтрация догруженных картинок
      filterContentItems(activeTab.dataset.title);

      // удаление кнопки
      if (cards.length === 0) {
         this.remove();
      }
   }, 2000)
})



// --------------Галлерея----------------

let bigGallery = document.querySelector('.gallery__block');
let count = 0;
startMasonry();


let galleryLoadBtn = document.querySelector('.gallery__btn-load');

galleryLoadBtn.addEventListener('click', function (e) {
   e.preventDefault();
   showLoadImg('gallery__load-img');

   setTimeout(() => {
      // Добавление фото
      addPhotosToGallery();
      // Повторный запуск масонри
      startMasonry();
      if (count === 2) {
         this.remove();
      }
   }, 2000)


})


// Вставка картинок в блок галерея

function addPhotosToGallery() {
   let galleryImgs = document.querySelectorAll('.gallery__item');
   let imgSrcArr = ['9.jpeg', '10.jpeg', '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg', '16.jpeg', '17.jpeg', '18.jpeg'];
   count++;

   galleryImgs.length < 13 ? addPhoto(0, 5) : addPhoto(6, 10);



   function addPhoto(min, max) {
      for (let i = min; i < max; i++) {
         wrapPhotoWithHtml(imgSrcArr[i]);
      }
   }


}
// Вывод картинки в HTML
function wrapPhotoWithHtml(imgName) {
   bigGallery.innerHTML += `<li class="gallery__item slow-show">
   <img src="./img/gallery/${imgName}" alt="архитектура" class="gallery__img">
</li>`
}


// Преобразование галереи с Masonry плагином после загрузки всех картинок в блоке
function startMasonry() {
   imagesLoaded(bigGallery, function () {
      let bigMasonryGal = new Masonry(bigGallery, {
         columnWidth: 378,
         itemSelector: '.gallery__item',
         gutter: 13,

      });
   });

}


// Показ/удаление картинки загрузки
function showLoadImg(btnClass) {
   let loadImg = document.querySelector(`.${btnClass}`);
   loadImg.classList.remove('hide');

   setTimeout(() => {
      loadImg.classList.add('hide');
   }, 2000)
}
