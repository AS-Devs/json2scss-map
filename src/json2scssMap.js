'use strict';

import { isPlainObject, isUndefined, isNull } from 'lodash';
let { isArray } = Array;

function json2scssMap(value) {

  function _json2scssMap(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return value;
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
                result.push(`${key}: ${sassVal}`);
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

  return _json2scssMap(value);
}

const indentsToSpaces = (indentCount) =>  Array(indentCount + 1).join('  ');

export default json2scssMap;
