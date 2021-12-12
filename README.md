# json2scss-map

Utility module that converts a JSON stream into scss syntax sass-map

json2scss-map converts JSON objects into Sass maps, which are supported in Ruby Sass 3.3 and libsass 2.0.

```
npm i --save-dev json2scss-map
```

## Why?

Firstly, you can share values between your scripts and stylesheets without having to use something like [SassyJSON](https://github.com/HugoGiraudel/SassyJSON), which doesn't work with libsass.
This package it's not build from Scratch, we have fork the project from [Andrew Clark](https://github.com/acdlite) .
But jsonSass package isn't maintained from last 5+ years. As we use this package with all the vernabilities , we thought we would fix the issues and make it better.

## Examples

Example source file `theme.json`:
```
{
  "font-primary": "Roboto",
  "colors": {
    "primary": "#0007bff",
    "success": "#388E3C",
    "error": "#EF5350",
    "text-black": "#333333",
    "black-overlay": "rgba(0, 0, 0, .2)"
  },
  "fonts": {
    "txt-12": "11px",
    "txt-75": "75ch"
  },
  "w-80": "80vw"
}

```

Output `theme.scss`:

```scss
$variable:(
  "font-primary": "Roboto",
  "colors": (
    "primary": #007bff,
    "success": #388E3C,
    "error": #EF5350,
    "text-black": #333333,
    "black-overlay": rgba(0, 0, 0, .2)
  ),
  "fonts": (
    "txt-12": 11px,
    "txt-75": 75ch
  ),
  "w-80": 80vw
);
```

you can use the Node fs Module (recommended):

``` javascript
var fs = require('fs');
var json2scss = require('json2scss-map');

fs.createReadStream('theme.json')
  .pipe(json2scss({
    prefix: '$variable: ',
  }))
  .pipe(fs.createWriteStream('theme.scss'));
```

Then, you can get the values from scss:map 

```scss
  $color-primary: map-get(map-get($variable, "colors"), "primary"); // #007bff
  $font-family: map-get($variable, "font-primary"); // "Roboto"
```

You can also transform normal JavaScript values using the exposed utility function:

```javascript
json2scss.convertJs([1, 2, 3]); // (1, 2, 3)
```

## Minor Update on v1.4.2
 1. Improvement / Fix Regarding compiling Nested Array of Objects.
 2. Updated the unexpectedly remove Quotes from the strings.

Thanks to the [Dylan Awalt-Conley](https://github.com/dawaltconley) for your PR.

## Added Feature on v1.4.1
 1. Added support for ch unit as value .
 2. Also , Now you can use any color format you are not strict to use hex only . Use rgba, hsl, rgb etc.
## Added Feature on v1.4.0

 1. scss map supports key as string so, now map keys will be in string. 
 2. font sizes like rem, px, em and colors in hex value will return without string quote; which will help you to get the desire value from scss map.



## ISSUE

Please let us know the issues on issues tab. We will happy to fix the update the package .


## API

### `json2scss([opts])`

Returns a through stream. Available options:

- `prefix`: Add some text to the beginning
- `suffix`: Add some text to the end. Defaults to `';'`.

### `json2scss.convertJs(jsValue)`

Convert a normal JavaScript value to its string representation in Sass. Ignores `undefined` and functions. Calls `.toString()` on non-plain object instances.


### :heart: Found this project useful?

If you found this project useful, then please consider giving it a :star: on Github and sharing it with your friends via social media.

# Donate

> If you found this project helpful or you learned something from the source code and want to thank me, consider buying me a cup of :tea:
>
> - [PayPal](https://www.paypal.com/paypalme/SusantaChak/)
> - [ButmeaCoffee](https://www.buymeacoffee.com/susanta96/)



## License
ISC

[AS Developers](https://github.com/AS-Devs)
