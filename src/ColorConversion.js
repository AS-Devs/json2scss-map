'use strict';

/**
 * Convert any 3 or 6 digit HEX color into HSL
 * @author AS Developers 2021 MIT License
 * @params H:<String>, newSyntax:<boolean>
 * @returns HSL Color (String)
 */
const hexToHSL = (H, newSyntax = false) => {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  
  if(newSyntax) {
    return `hsl(${h} ${s}% ${l}%)`;
  }else {
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  }

}

/**
 * Convert any 4 or 8 digit HEX alpha color into HSLA
 * @author AS Developers 2021 MIT License
 * @params H:<String>, newSyntax:<boolean>
 * @returns HSLA Color:<String>
 */
const hexAToHSLA = (H, newSyntax = false) => {
  let r = 0, g = 0, b = 0, a = 1;

  if (H.length == 5) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
    a = "0x" + H[4] + H[4];
  } else if (H.length == 9) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
    a = "0x" + H[7] + H[8];
  }

  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);


  a = (a / 255).toFixed(2);
           
  if(newSyntax){
    return "hsl("+ h + " " + s + "% " + l + "% / " + (a * 100) + "%)";
  }
  return "hsla("+ h + ", " + s + "%, " + l + "%, " + a + ")";

}

/**
 * Convert rgba string into R: red,G:<green>,B:<blue> colors
 * @author AS Developers 2021 MIT License
 * @params rgba as string
 * @returns red, green, blue and alpha value as numbers
 */
const stringToRGBA = (rgba) => {
  let sep = rgba.indexOf(",") > -1 ? "," : " ";
  rgba = rgba.substr(5).split(")")[0].split(sep);

  // Strip the slash if using space-separated syntax
  if (rgba.indexOf("/") > -1) 
    rgba.splice(3,1);

  for (let R in rgba) {
    let r = rgba[R];
    if (r.indexOf("%") > -1) {
      let p = r.substr(0,r.length - 1) / 100;

      if (R < 3) { 
        rgba[R] = Math.round(p * 255);
      } else {
        rgba[R] = p;
      }
    }
  }

  // Make r, g, and b fractions of 1
  let r = rgba[0],
      g = rgba[1],
      b = rgba[2],
      a = rgba[3];
  return {red: r, green: g, blue: b, alpha: a};
}


/**
 * Convert rgb string into R: red,G:<green>,B:<blue> colors
 * @author AS Developers 2021 MIT License
 * @params rgb as string
 * @returns red, green, blue value as numbers
 */
const stringToRGB = (rgb) => {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);

  // Strip the slash if using space-separated syntax
  if (rgb.indexOf("/") > -1) 
    rgb.splice(3,1);

  for (let R in rgb) {
    let r = rgb[R];
    if (r.indexOf("%") > -1) {
      let p = r.substr(0,r.length - 1) / 100;

      if (R < 3) { 
        rgb[R] = Math.round(p * 255);
      }
    }
  }

  // Make r, g, and b fractions of 1
  let r = rgb[0],
      g = rgb[1],
      b = rgb[2];
  return {red: r, green: g, blue: b};
}
/**
 * Convert R,G,B into HSL colors also support New Syntax
 * @author AS Developers 2021 MIT License
 * @params red , green, blue value as numbers
 * @returns HSL color String based on newSyntax param true / false
 */
const RGBToHSL = (r,g,b, newSyntax = false) => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
  h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  if(newSyntax){
    return "hsl("+ h + " " + s + "% " + l + "%)";
  }

  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}
/**
 * Convert R,G,B,A into HSL colors also support New Syntax
 * @author AS Developers 2021 MIT License
 * @params red , green, blue and alpha value as numbers
 * @returns HSL color String based on newSyntax param true / false
 */
const rgbaToHSLA = (r,g,b,a, newSyntax = false) => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
  h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  if(newSyntax){
    return "hsl("+ h + " " + s + "% " + l + "% / " + (a * 100) + "%)";
  }

  return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
}
/**
 * Convert H(Hue), S(Saturation), L(Lightness) into Color Lavel 4 Syntax
 * @author AS Developers 2021 MIT License
 * @params h, s, l as numbers 
 * @returns HSL color String based on newSyntax param true / false
 */
const HSLToCL4HSL = (h, s, l, newSyntax = false) => {
  if(newSyntax){
    return "hsl("+ h + " " + s + "% " + l + "%)";
  }
  return "hsl("+ h + ", " + s + "%, " + l + "%)";
}
/**
 * Convert H(Hue), S(Saturation), L(Lightness),A (Alpha) into Color Lavel 4 Syntax
 * @author AS Developers 2021 MIT License
 * @params h, s, l, a as numbers 
 * @returns HSL color String based on newSyntax param true / false
 */
const HSLAToCL4HSL = (h, s, l, a, newSyntax = false) => {
  if(newSyntax){
    return "hsl("+ h + " " + s + "% " + l + "% / " + (a * 100) + "%)";
  }
  return "hsla("+ h + ", " + s + "%, " + l + "%, " + a + ")";
}
/**
 * Convert R(Red),G(Green),B(Blue) into Color Lavel 4 Syntax
 * @author AS Developers 2021 MIT License
 * @params r, g,b as numbers
 * @returns RGB color String based on newSyntax param true / false
 */
const RGBtoCL4RGB = (r, g, b, newSyntax = false) => {
  if(newSyntax) {
    return "rgb("+ r + " " + g + " " + b + ")";
  }
  return "rgb("+ r + ", " + g + ", " + b + ")";
}
/**
 * Convert R(Red),G(Green),B(Blue), A(Alpha) into Color Lavel 4 Syntax
 * @author AS Developers 2021 MIT License
 * @params r, g,b,a as numbers
 * @returns RGBA color String based on newSyntax param true / false
 */
const RGBAtoCL4RGB = (r, g, b, a, newSyntax = false) => {
  if(newSyntax) {
    return "rgb("+ r + " " + g + " " + b + " / " + (a * 100) + "%)";
  }
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

/**
 * Convert H(HEX) colors into RGB colors
 * @author AS Developers 2021 MIT License
 * @params Hex as string
 * @returns RGB color String based on newSyntax param true / false
 */
const hexToRGB = (h, newSyntax = false) => {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  if(newSyntax) {
    return "rgb("+ +r + " " + +g + " " + +b + ")";
  }
  return "rgb("+ +r + ", " + +g + ", " + +b + ")";
}
/**
 * Convert H(HEXA) colors into RGBA colors
 * @author AS Developers 2021 MIT License
 * @params HexA as string
 * @returns RGBA color String based on newSyntax param true / false
 */
const hexAToRGBA = (h, newSyntax = false) => {
  let r = 0, g = 0, b = 0, a = 1;

  if (h.length == 5) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    a = "0x" + h[4] + h[4];

  } else if (h.length == 9) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = "0x" + h[7] + h[8];
  }
  a = +(a / 255).toFixed(2);

  if(newSyntax) {
    return "rgb("+ +r + " " + +g + " " + +b + " / " + (a * 100) + "%)";
  }

  return "rgba(" + +r + ", " + +g + ", " + +b + ", " + a + ")";
}
/**
 * Convert HSL colors string into H(Hue), S(Saturation), L(Lightness)
 * @author AS Developers 2021 MIT License
 * @params Hsl color as string
 * @returns H(Hue), S(Saturation), L(Lightness) as numbers
 */
const stringToHSL = (hsl) => {
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0],
      s = hsl[1].substr(0,hsl[1].length - 1),
      l = hsl[2].substr(0,hsl[2].length - 1);
  
  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1) 
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  // Keep hue fraction of 360 if ending up over
  if (h >= 360)
    h %= 360;

  return {hue: h, saturation: s, lightness: l};
}
/**
 * Convert H(Hue), S(Saturation), L(Lightness) colors RGB value also String output
 * @author AS Developers 2021 MIT License
 * @params H(Hue), S(Saturation), L(Lightness) as numbers, returnValue (true/false), newSyntax( true / false)
 * @returns if return value true then output rgb as numbers for forther use otherwise output rgb color string
 */
const HSLToRGB = (h,s,l, returnValue = false, newSyntax = false) => {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  if(returnValue) {
    return {r, g, b};
  }else {
    if(newSyntax) {
      return "rgb("+ r + " " + g + " " + b + ")";
    }
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
/**
 * Convert HSLA colors string into H(Hue), S(Saturation), L(Lightness), A(Alpha)
 * @author AS Developers 2021 MIT License
 * @params Hsla color as string
 * @returns H(Hue), S(Saturation), L(Lightness), A(Alpha) as numbers
 */
const stringToHSLA = (hsla) => {
  let sep = hsla.indexOf(",") > -1 ? "," : " ";
  hsla = hsla.substr(5).split(")")[0].split(sep);

  if (hsla.indexOf("/") > -1)
    hsla.splice(3,1);

  let h = hsla[0],
      s = hsla[1].substr(0,hsla[1].length - 1),
      l = hsla[2].substr(0,hsla[2].length - 1),
      a = hsla[3];
        
  if (h.indexOf("deg") > -1)
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  if (h >= 360)
    h %= 360;

  return {hue: h, saturation: s, lightness: l, alpha: a};
}

/**
 * Convert H(Hue), S(Saturation), L(Lightness), A (Alpha) colors RGB value also String output
 * @author AS Developers 2021 MIT License
 * @params H(Hue), S(Saturation), L(Lightness) as numbers, newSyntax( true / false)
 * @returns output rgb color string based on newSyntax 
 */
const HSLAToRGBA = (h,s,l,a, newSyntax = false) => {
  const rgbObj = HSLToRGB(h, s, l, true);
  const { r, g, b } = rgbObj;
  if(newSyntax) {
    return "rgb("+ r + " " + g + " " + b + " / " + (a * 100) + "%)";
  }
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

/**
 * Convert RGB colors string into HEX string
 * @author AS Developers 2021 MIT License
 * @params rgb as string
 * @returns output HEX string
 */
const rgbToHEX = (rgb) => {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

/**
 * Convert RGBA colors string into HEX(A) string
 * @author AS Developers 2021 MIT License
 * @params rgba as string
 * @returns output HEX(A) string
 */
const rgbaToHEXA = (rgba) => {
  let sep = rgba.indexOf(",") > -1 ? "," : " "; 
  rgba = rgba.substr(5).split(")")[0].split(sep);
                
  // Strip the slash if using space-separated syntax
  if (rgba.indexOf("/") > -1)
    rgba.splice(3,1);

  for (let R in rgba) {
    let r = rgba[R];
    if (r.indexOf("%") > -1) {
      let p = r.substr(0,r.length - 1) / 100;

      if (R < 3) {
        rgba[R] = Math.round(p * 255);
      } else {
        rgba[R] = p;
      }
    }
  }

  let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16),
      a = Math.round(+rgba[3] * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b + a;
}

/**
 * Convert HSL colors string into HEX string
 * @author AS Developers 2021 MIT License
 * @params hsl as string
 * @returns output HEX string
 */
const HSLToHEX = (hsl) => {
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0],
      s = hsl[1].substr(0,hsl[1].length - 1) / 100,
      l = hsl[2].substr(0,hsl[2].length - 1) / 100;
        
  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1)
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  if (h >= 360)
    h %= 360;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  

  return "#" + r + g + b;
}
/**
 * Convert HSLA colors string into HEX(A) string
 * @author AS Developers 2021 MIT License
 * @params hsla as string
 * @returns output HEX(A) string
 */
const HSLAToHEXA = (hsla) => {
  let sep = hsla.indexOf(",") > -1 ? "," : " ";
  hsla = hsla.substr(5).split(")")[0].split(sep);
    
  // Strip the slash
  if (hsla.indexOf("/") > -1)
    hsla.splice(3,1);
    
  let h = hsla[0],
      s = hsla[1].substr(0,hsla[1].length - 1) / 100,
      l = hsla[2].substr(0,hsla[2].length - 1) / 100,
      a = hsla[3];
  
  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1)
    h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0,h.length - 4) * 360);
  if (h >= 360)
    h %= 360;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  a = Math.round(a * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;
  
  return "#" + r + g + b + a;
}

export {
    hexToHSL,
    hexAToHSLA,
    stringToRGBA,
    stringToRGB,
    RGBToHSL,
    rgbaToHSLA,
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
};