'use strict';

var WIZARD_COUNT = 4;
var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function createWizard(wizard) {
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  similarListElement.appendChild(wizardElement);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var randomNameFirst = shuffleArray(firstName);
var randomNameLast = shuffleArray(lastName);
var randomCoatColor = shuffleArray(coatColor);
var randomEyesColor = shuffleArray(eyesColor);

for (var n = 0; n < WIZARD_COUNT; n++) {
  var randomWizard = {
    name: randomNameFirst[n] + ' ' + randomNameLast[n],
    coatColor: randomCoatColor[n],
    eyesColor: randomEyesColor[n]
  };
  wizards.push(randomWizard);
}

for (var k = 0; k < wizards.length; k++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  createWizard(wizards[k]);
}
