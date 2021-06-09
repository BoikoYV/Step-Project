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
