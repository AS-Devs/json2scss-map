'use strict';

import { isPlainObject, isUndefined, isNull, isArray } from 'lodash';
import {
    hexAToHSLA,
    hexToHSL,
    RGBToHSL,
    rgbaToHSLA,
    stringToRGBA,
    stringToRGB,
    hexToRGB,
    hexAToRGBA,
    stringToHSL,
    HSLToRGB,
    stringToHSLA,
    HSLAToRGBA,
    rgbToHEX,
    rgbaToHEXA,
    HSLToHEX,
    HSLAToHEXA,
    HSLToCL4HSL,
    HSLAToCL4HSL,
    RGBtoCL4RGB,
    RGBAtoCL4RGB,
} from "./ColorConversion";

let DEFAULTOPTION = {
  colorConversion: true,
  convertTo: 'hsl',
  cl4Syntax: false
}

const json2scssMap = (value, options = DEFAULTOPTION) => {
  function _json2scssMap(value, initialIndentLevel = 0, colorConversion, convertTo, cl4Syntax) {
    let indentLevel = initialIndentLevel;
    switch (typeof value) {
      case 'boolean':
      case 'number':
        return value.toString();
      case 'string':
        return quoteString(value, colorConversion, convertTo, cl4Syntax);
      case 'object':
        if (isPlainObject(value)) {
          indentLevel += 1;
          let indent = indentsToSpaces(indentLevel);

          let jsObj = value;
          let sassKeyValPairs = [];

          sassKeyValPairs = Object.keys(jsObj)
            .reduce((result, key) => {
              let jsVal = jsObj[key];
              let sassVal = _json2scssMap(jsVal, indentLevel, colorConversion, convertTo, cl4Syntax);

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
              if(!isUndefined(v)) return _json2scssMap(v, indentLevel, colorConversion, convertTo);
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

  return _json2scssMap(value, 0, options.colorConversion, options.convertTo, options.cl4Syntax);
}

const indentsToSpaces = (indentCount) =>  Array(indentCount + 1).join('  ');
const quoteString = (value, colorConversion, convertTo, cl4Syntax) => {
  const regx = /^[\d.]*\d(px|rem|em|%|vw|vh|ch)$/g;
  const regexColor = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
  if (regx.test(value)) {
    return value;
  }else if(regexColor.test(value)){
    // Regex for Different Color Checking
    const isHexColor = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i;
    const isHexAColor = /^#([a-f0-9]{8}|[a-f0-9]{4})\b$/gi;
    const isRGBColor = /(^rgb\((\d+),\s*(\d+),\s*(\d+)\)$)/gi;
    const isRGBAColor = /rgba\(\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*([01\.]\.?\d?)?\s*\)/gi;
    const isHSLColor = /^hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)$/gi;
    const isHSLAColor = /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/gi;
    // if convertion is true && to HSL
    if(colorConversion && (convertTo === 'hsl' || convertTo === 'HSL' || convertTo === 'hsla' || convertTo === 'HSLA')) {
      if(isHexColor.test(value)) return hexToHSL(value, cl4Syntax);
      if(isHexAColor.test(value)) return hexAToHSLA(value, cl4Syntax);
      if(isRGBAColor.test(value)) {
        let colorObject = {};
        colorObject = stringToRGBA(value);
        return rgbaToHSLA(colorObject.red, colorObject.green, colorObject.blue, colorObject.alpha, cl4Syntax);
      }
      if(isRGBColor.test(value)) {
        let colorObject = {};
        colorObject = stringToRGB(value);
        return RGBToHSL(colorObject.red, colorObject.green, colorObject.blue, cl4Syntax);
      }
      if(isHSLColor.test(value)) {
        let colorObject = {};
        colorObject = stringToHSL(value);
        return HSLToCL4HSL(colorObject.hue?.trim(), colorObject.saturation?.trim(), colorObject.lightness?.trim(), cl4Syntax);
      }
      if(isHSLAColor.test(value)) {
        let colorObject = {};
        colorObject = stringToHSLA(value);
        return HSLAToCL4HSL(colorObject.hue?.trim(), colorObject.saturation?.trim(), colorObject.lightness?.trim(), colorObject.alpha?.trim(), cl4Syntax);
      }
      return value;
    }
    if(colorConversion && (convertTo === 'rgb' || convertTo === 'RGB' || convertTo === 'rgba' || convertTo === 'RGBA')) {
      if(isHexColor.test(value)) return hexToRGB(value, cl4Syntax);
      if(isHexAColor.test(value)) return hexAToRGBA(value, cl4Syntax);
      if(isHSLColor.test(value)) {
        let colorObject = {};
        colorObject = stringToHSL(value);
        return HSLToRGB(colorObject.hue?.trim(), colorObject.saturation?.trim(), colorObject.lightness?.trim(), false, cl4Syntax);
      }
      if(isHSLAColor.test(value)) {
        let colorObject = {};
        colorObject = stringToHSLA(value);
        return HSLAToRGBA(colorObject.hue?.trim(), colorObject.saturation?.trim(), colorObject.lightness?.trim(), colorObject.alpha?.trim(), cl4Syntax);
      }
      if(isRGBColor.test(value)) {
        let colorObject = {};
        colorObject = stringToRGB(value);
        return RGBtoCL4RGB(colorObject.red?.trim(), colorObject.green?.trim(), colorObject.blue?.trim(), cl4Syntax);
      }
      if(isRGBAColor.test(value)) {
        let colorObject = {};
        colorObject = stringToRGBA(value);
        return RGBAtoCL4RGB(colorObject.red?.trim(), colorObject.green?.trim(), colorObject.blue?.trim(), colorObject.alpha?.trim(), cl4Syntax);
      }
      return value;
    }
    if(colorConversion && (convertTo === 'hex' || convertTo === 'HEX' || convertTo === 'hexa' || convertTo === 'HEXA')) {
      if(isRGBColor.test(value)) return rgbToHEX(value);
      if(isRGBAColor.test(value)) return rgbaToHEXA(value);
      if(isHSLColor.test(value)) return HSLToHEX(value);
      if(isHSLAColor.test(value)) return HSLAToHEXA(value);
      return value;
    }

    return value;
  }
  return "\"" + value + "\"";
}
export default json2scssMap;
