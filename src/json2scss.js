'use strict';

import json2scssMap from './json2scssMap';
import through2 from 'through2';

let DEFAULTS = {
  prefix: '',
  suffix: ';',
};

function json2scss(options) {
  let optionsGen = Object.assign({}, DEFAULTS, options);
  return through2(function(chunk, enc, callback) {
    let jsValue = JSON.parse(chunk);
    let sassString = json2scssMap(jsValue);
    sassString = optionsGen.prefix + sassString + optionsGen.suffix;
    this.push(sassString);
    callback();
  });
}

module.exports = json2scss;
module.exports.convertJs = json2scssMap;
export default json2scss;
export { json2scssMap as convertJs };