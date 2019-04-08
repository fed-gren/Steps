const Area = require("./area.js");

const calcArea = new Area();

const { log } = console;

log(calcArea.getCircleArea(2));       // 12.566370614359172
log(calcArea.getRectArea(2, 4));      // 8
log(calcArea.getTrapeArea(1, 2, 4));  // 6
log(calcArea.getCylineArea(2, 4));    // 75.39822368615503