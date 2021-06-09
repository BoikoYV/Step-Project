'use strict'

// Переключение табов(удаление/добавление активного класса)
function selectTab(elem, list, className) {
   let active = list.querySelector(`.${className}`);
   active.classList.remove(className);
   elem.classList.add(className);
}


// Табы на экране наши услуги

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




// Слайдер

let step = 0;
let slideNum = 1;

let commentsPhotos = document.querySelector('.comments__photos');
let commentsContent = document.querySelector('.comments__content');

// Переключение по стрелкам
let prevBtn = document.querySelector('.comments__btn--prev');
let nextBtn = document.querySelector('.comments__btn--next');

nextBtn.addEventListener('click', function () {
   scrollComment('+');

})
prevBtn.addEventListener('click', function () {
   scrollComment('-');
})

// Переключение по выбору аватара

commentsPhotos.addEventListener('click', function (e) {
   if (e.target.tagName === 'IMG') {
      console.log('----------');
      console.log('активный маленький ярлык', e.target.parentElement.dataset.num);

      let dataNum = e.target.parentElement.dataset.num;
      let bigSlide = commentsContent.querySelector(`li[data-num="${dataNum}"]`);

      // добавление активного класса
      selectTab(e.target.parentElement, commentsPhotos, 'comments--active');
      selectTab(bigSlide, commentsContent, 'comments--active');

      console.log('разница между большим слайдом и нажатым---', +dataNum - slideNum);

      // Смещение слайда
      let needScrollScreen = +dataNum - slideNum;
      scrollBigSlide(needScrollScreen);
      slideNum = +dataNum;
      console.log('номер большого слайда после прокрутки', slideNum);

   }

})

function scrollBigSlide(countOfSlides) {
   if (countOfSlides > 0) {
      step += (countOfSlides * 1160);
      if (step > (4 * 1160)) {
         step = 0;
      }
   } else {
      step += (countOfSlides * 1160);
      if (step < 0) {
         step = 3 * 1160;
      }
   }
   commentsContent.style.transform = `translateX(${-step}px)`;

}



// прокрутка слайдов
function scrollComment(op) {

   if (op === '+') {
      step += 1160;
      slideNum++;
      if (step >= (4 * 1160)) {
         step = 0;
         slideNum = 1;
      }
   } else {
      step -= 1160;
      slideNum--;
      if (step < 0) {
         step = 3 * 1160;
         slideNum = 4;
      }
   }

   // Смещение большого слайда
   commentsContent.style.transform = `translateX(${-step}px)`;

   // Добавление активного класса
   let activeSmTab = commentsPhotos.querySelector(`.comments__photos-item:nth-child(${slideNum})`);
   let activeBigTab = commentsContent.querySelector(`.comments__content-item:nth-child(${slideNum})`);

   selectTab(activeSmTab, commentsPhotos, 'comments--active');
   selectTab(activeBigTab, commentsContent, 'comments--active');

}



let commentators = [
   {
      img: 'url',
      text: 'text',
      name: 'Hasan Ali',
      position: 'UX Designer',
      isActive: true,
      screenWidth: 1160,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Marina',
      position: 'UX Designer',
      isActive: false,
      screenWidth: 1160,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Denis',
      position: 'UX Designer',
      isActive: false,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Serhii',
      position: 'UX Designer',
      isActive: false,
      screenWidth: 1160,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Hasan Ali',
      position: 'UX Designer',
      isActive: true,
      screenWidth: 1160,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Marina',
      position: 'UX Designer',
      isActive: false,
      screenWidth: 1160,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Denis',
      position: 'UX Designer',
      isActive: false,
      screenWidth: 1160,
   },
   {
      img: 'url',
      text: 'text',
      name: 'Serhii',
      position: 'UX Designer',
      isActive: false,
      screenWidth: 1160,
   },
]

