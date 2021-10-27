'use strict';

import { isPlainObject, isUndefined, isNull, isArray } from 'lodash';

function json2scssMap(value) {

  function _json2scssMap(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return quoteString(value);
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
          let sassVals = value.map(v => {
              if(!isUndefined(v)) return _json2scssMap(v, indentLevel)
            })
          if (sassVals.length > 1)
            sassVals = sassVals.join(', ');
          else
            sassVals = sassVals[0] + ',';
          return '(' + sassVals + ')';
        }
        else if (isNull(value)) return 'null';
        else return value.toString();
      default:
        return;
    }
  }

  return _json2scssMap(value);
}

const indentsToSpaces = (indentCount) =>  Array(indentCount + 1).join('  ');
const quoteString = (value) => {
  const regx = /(px|rem|em|%|vw|vh|ch)/g;
  const regexColor = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
  if (regexColor.test(value) || regx.test(value)) {
    return value;
  }
  return "\"" + value + "\"";
}
export default json2scssMap;
