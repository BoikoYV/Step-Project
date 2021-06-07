'use strict'

window.addEventListener('DOMContentLoaded', function () {

   setActiveTabs();

   // Функция смены табов в 3 блоке
   function setActiveTabs() {

      let tabsTitlesList = document.querySelector('.services__titles-list');

      tabsTitlesList.addEventListener('click', function (e) {

         if (e.target.tagName === 'A') {
            e.preventDefault();
            // ID активной ссылки
            let activeId = e.target.href.split('#')[1];
            deleteActiveElements();
            addActiveClass(activeId, e.target);
         }
      })

      // Удаление активного класса
      function deleteActiveElements() {
         let activeTabs = document.querySelectorAll('.service--active');
         activeTabs.forEach(elem => elem.classList.remove('service--active'));
      }

      // Добавление активного класса
      function addActiveClass(id, elem) {
         let activeText = document.querySelector(`li[id = ${id}]`);
         elem.closest('li').classList.add('service--active');
         activeText.classList.add('service--active');
      }


      // Test

      function deleteClass(selector) {
         let activeTabs = document.querySelectorAll(selector);
         activeTabs.forEach(elem => elem.classList.remove(selector));
      }

      function addClass(selector, className) {
         let activeText = document.querySelectorAll(selector);
         activeText.forEach(elem => elem.classList.add(className));
      }











   }













})