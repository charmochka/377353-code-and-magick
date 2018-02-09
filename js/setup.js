'use strict';

var WIZARD_COUNT = 4;
var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var createWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  similarListElement.appendChild(wizardElement);
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var generateWizards = function (arrFirstName, arrLastName, arrCoatColor, arrEyesColor) {
  var randomNameFirst = shuffleArray(arrFirstName);
  var randomNameLast = shuffleArray(arrLastName);
  var randomCoatColor = shuffleArray(arrCoatColor);
  var randomEyesColor = shuffleArray(arrEyesColor);
  var wizards = [];

  for (var n = 0; n < WIZARD_COUNT; n++) {
    var randomWizard = {
      name: randomNameFirst[n] + ' ' + randomNameLast[n],
      coatColor: randomCoatColor[n],
      eyesColor: randomEyesColor[n]
    };
    wizards.push(randomWizard);
  }
  return wizards;
};

var createWizards = function (arrWizards) {
  for (var k = 0; k < arrWizards.length; k++) {
    createWizard(arrWizards[k]);
  }
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var openSetup = document.querySelector('.setup-open');
var closeSetup = document.querySelector('.setup-close');

var getActiveElement = function () {
  return document.activeElement;
};

var getUserName = function () {
  return document.querySelector('.setup-user-name');
};

// При нажатии на клавиатуре esc закрыть окно настроек
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && getActiveElement() !== getUserName()) {
    evt.stopPropagation();
    closePopup();
  }
};

// Удаляет класс hidden при вызове
var openPopup = function () {
  document.querySelector('.setup').classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress); // Добавили обработчик события
};

// Добавляет класс hidden при вызове
var closePopup = function () {
  document.querySelector('.setup').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress); // Удалили обработчик события, так как наше окно настроек уже закрыто
};

openSetup.addEventListener('click', openPopup); // При клике открыть окно

openSetup.addEventListener('keydown', function (evt) { // Если на пользователь нажал клавишу enter открыть окно
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

closeSetup.addEventListener('click', closePopup); // При клике закрыть окно

closeSetup.addEventListener('keydown', function (evt) { // Если на пользователь нажал клавишу enter  закрыть окно
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Рандомный элемент из массива
var getRandomElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

// Изменение цвета глаз
var changeColorEyes = function () {
  document.body.querySelector('.setup-player .wizard-eyes').style.fill = getRandomElement(eyesColor);
};
document.body.querySelector('.setup-player .wizard-eyes').addEventListener('click', changeColorEyes);

// Изменение цвета плаща
var changeColorCoat = function () {
  document.body.querySelector('.setup-player .wizard-coat').style.fill = getRandomElement(coatColor);
};
document.body.querySelector('.setup-player .wizard-coat').addEventListener('click', changeColorCoat);

// Изменение цвета фаерболла

var changeColorFireball = function () {
  document.body.querySelector('.setup-fireball-wrap').style.backgroundColor = getRandomElement(fireballColor);
};
document.body.querySelector('.setup-fireball-wrap').addEventListener('click', changeColorFireball);

createWizards(generateWizards(firstName, lastName, coatColor, eyesColor));
