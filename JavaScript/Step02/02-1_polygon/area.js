const { PI } = Math;
const NUM_CIRCLE_PARAM = 1,
  NUM_RECT_PARAM = 2,
  NUM_TRAPE_PARAM = 3,
  NUM_CYLINE_PARAM = 2;

const isNumber = param => {
  return Number.isFinite(param);
};

const paramCheck = (numArgs, args) => {
  if (![...args].every(isNumber)) throw Error("인자는 숫자만 가능합니다.");
  if (args.length !== numArgs) throw Error(`인자 ${numArgs}개가 필요합니다.`);
  return true;
};

module.exports = class Area {
  getCircleArea(r) {
    if (paramCheck(NUM_CIRCLE_PARAM, arguments)) return PI * r * r;
  }

  getRectArea(w, h) {
    if (paramCheck(NUM_RECT_PARAM, arguments)) return w * h;
  }

  getTrapeArea(uw, dw, h) {
    if (paramCheck(NUM_TRAPE_PARAM, arguments)) return ((uw + dw) * h) / 2;
  }

  getCylineArea(r, h) {
    if (paramCheck(NUM_CYLINE_PARAM, arguments)) {
      let circleArea = this.getCircleArea(r);
      let rectArea = this.getRectArea(2 * r * PI, h);
      return circleArea * 2 + rectArea;
    }
  }
};
