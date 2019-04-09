const { PI, pow } = Math;
const logArr = [],
  logRes = [];

const CIRCLE_NAME = "circle",
  RECT_NAME = "rect",
  TRAPE_NAME = "trapezoid";

const printExecutionSequence = _ => {
  // console.log(logArr.join(", "));

  //추가 미션 구현
  let logStr = "";
  logArr.forEach((el, idx) => {
    logStr += `${logArr[idx]} - ${logRes[idx]}\n`;
  });
  console.log(logStr);
};

const logExecution = (polygonName, polygonArea) => {
  logArr.push(polygonName);
  logRes.push(polygonArea);
};

const getCircleArea = r => {
  let area = 0;
  area = pow(r, 2) * PI;
  logExecution(CIRCLE_NAME, area);
  return area;
};

const getTotalCircleArea = (n, area = 0) => {
  if (0 === n) {
    logExecution(CIRCLE_NAME, area);
    return area;
  }
  return getTotalCircleArea(n - 1, (area += pow(n, 2) * PI));
};

const getRectArea = (w, h) => {
  let area = 0;
  area = w * h;
  logExecution(RECT_NAME, area);
  return area;
};

const getTrapezoidArea = (uw, dw, h) => {
  let area = 0;
  area = ((uw + dw) * h) / 2;
  logExecution(TRAPE_NAME, area);
  return area;
};

const getArea = (polygonName, ...params) => {
  let area = 0;
  switch (polygonName) {
    case CIRCLE_NAME:
      area =
        2 === params.length
          ? getTotalCircleArea(params[1])
          : getCircleArea(params[0]);
      break;
    case RECT_NAME:
      area = getRectArea(...params);
      break;
    case TRAPE_NAME:
      area = getTrapezoidArea(...params);
      break;
    default:
      throw Error(
        "Incorrect Parameters\ngetArea([polygon name], ...params)\npolygon name : circle / rect / trapezoid"
      );
      break;
  }

  return area;
};

console.log(getArea("circle", 1, 3));
console.log(getArea("circle", 3));
console.log(getArea("rect", 3, 4));
console.log(getArea("trapezoid", 1, 2, 8));
printExecutionSequence();
