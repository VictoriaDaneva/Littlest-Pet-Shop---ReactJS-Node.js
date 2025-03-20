import jsonwebtonen from "jsonwebtoken";
import util from "util";

const verify = util.promisify(jsonwebtonen.verify);
const sign = util.promisify(jsonwebtonen.sign);

const jwt = {
  verify,
  sign,
};

export default jwt;
