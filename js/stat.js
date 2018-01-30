'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var TEXT_STYLE = '16px PT Mono';
var HIST_HEIGHT = 150;
var HIST_WIDTH = 40;
var GAP = 10;
var GAP_HIST = 50;
var GAP_TOP = 80;


var renderText = function (ctx, x, y, color, text) {
  ctx.fillStyle = color;
  ctx.font = TEXT_STYLE;
  ctx.fillText(text, x, y);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderHist = function (ctx, x, y, color, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, HIST_WIDTH, height);
};


function getColor(name) {

    if (name !== 'Вы') {
        var opacity = Math.random();
        return 'rgba(0, 0, 255,' + opacity + ')';
    }

    return 'rgba(255, 0, 0, 1)';
};


function getMaxTime(times) {
  var maxTime = times[0];
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
        maxTime = times[i];
    }
  }

  return maxTime;
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, 20, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, 10, '#fff');
  renderText(ctx, CLOUD_X + GAP, 40, '#000', 'Ура вы победили!');
  renderText(ctx, CLOUD_X + GAP, 60, '#000', 'Список результатов:');


  for (var i = 0; i < times.length; i++) {
    var persentHistHeight = times[i] * 100 / getMaxTime(times);
    var histHeight = HIST_HEIGHT * persentHistHeight / 100;
    var colorHist = getColor(names[i]);

    renderHist(ctx, CLOUD_X + GAP * 2 + i * (HIST_WIDTH + GAP_HIST), HIST_HEIGHT + GAP_TOP + GAP * 2 - histHeight, colorHist, histHeight);
    renderText(ctx, CLOUD_X + GAP * 2 + i * (HIST_WIDTH + GAP_HIST), HIST_HEIGHT + GAP * 4 + GAP_TOP, '#000', names[i]);
    renderText(ctx, CLOUD_X + GAP * 2 + i * (HIST_WIDTH + GAP_HIST), HIST_HEIGHT + GAP_TOP + GAP - histHeight, '#000', Math.floor(times[i]));
  }
};
