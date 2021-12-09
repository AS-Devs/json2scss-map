'use strict';

import { isPlainObject, isUndefined, isNull, isArray } from 'lodash';
import { hexAToHSLA, hexToHSL } from './ColorConvertion';

let DEFAULTOPTION = {
  colorCovertion: true,
  convertTo: 'hsl'
}

function json2scssMap(value, options = DEFAULTOPTION) {
  function _json2scssMap(value, initialIndentLevel = 0, options) {
    let indentLevel = initialIndentLevel;
    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return quoteString(value, options);
      case 'object':
        if (isPlainObject(value)) {
          indentLevel += 1;
          let indent = indentsToSpaces(indentLevel);

          let jsObj = value;
          let sassKeyValPairs = [];

          sassKeyValPairs = Object.keys(jsObj)
            .reduce((result, key) => {
              let jsVal = jsObj[key];
              let sassVal = _json2scssMap(jsVal, indentLevel);

              if (!isUndefined(sassVal)) {
                result.push(`"${key}": ${sassVal}`);
              }

              return result;
            }, []);

          let result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
          indentLevel -= 1;
          return result;
        }
        else if (isArray(value)) {
          let sassVals = value.filter(v => {
              if(!isUndefined(v)) return _json2scssMap(v, indentLevel)
            })
          return '(' + sassVals.join(', ') + ')';
        }
        else if (isNull(value)) return 'null';
        else return value.toString();
      default:
        return;
    }
  }

  return _json2scssMap(value, 0, options);
}

const indentsToSpaces = (indentCount) =>  Array(indentCount + 1).join('  ');
const quoteString = (value, options) => {
  const regx = /(px|rem|em|%|vw|vh|ch)/g;
  const regexColor = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
  if (regx.test(value)) {
    return value;
  }else if(regexColor.test(value)){
    // Means this section is for color
    if(!options.colorCovertion) {
      return value;
    }
    if(options.convertTo === 'hsl' || options.convertTo === 'HSL') {
      let isHexColor = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i;
      let isHexAColor = /^#([a-f0-9]{8}|[a-f0-9]{4})\b$/gi;
      if(isHexColor.test(value)) return hexToHSL(value);
      if(isHexAColor.test(value)) return hexAToHSLA(value);
      return value;
    }

  }
  return "\"" + value + "\"";
}
export default json2scssMap;
