# json2scss-map

Streamy module that transforms a JSON stream into scss syntax Sass.

json2sass-map converts JSON objects into Sass maps, which are supported in Ruby Sass 3.3 and libsass 2.0.

```
npm i --save-dev json2sass
```

## Why?

Firstly, you can share values between your scripts and stylesheets without having to use something like [SassyJSON](https://github.com/HugoGiraudel/SassyJSON), which doesn't work with libsass.
This package it's not build from Scratch by me. But Thanks to [Andrew Clark](https://github.com/acdlite) .
But jsonSass package isn't maintained from last 5+ years. As we use this package with all the vernabilities , we thought we would fix the issues and make it better.

## Examples

Example source file `theme.json`:
```
{
  "font-primary": "'Roboto'",
  "colors": {
    "primary": "#FFF200",
    "secondary": "#007BFF",
    "success": "#388E3C",
    "error": "#EF5350",
    "text": "#333333"
  }
}

```

Output `theme.scss`:

```scss
$variable:(
  font-primary: 'Roboto',
  colors: (
    primary: #FFF200,
    secondary: #007BFF,
    success: #388E3C,
    error: #EF5350,
    text: #333333
  )
);
```

you can use the Node fs Module:

``` javascript
var fs = require('fs');
var json2scss = require('json2scss');

fs.createReadStream('theme.json')
  .pipe(json2scss({
    prefix: '$variable: ',
  }))
  .pipe(fs.createWriteStream('theme.scss'));
```

Then, you can get the values from scss:map 

```scss
  $color-primary: map-get(map-get($variable, colors), primary)
```

You can also transform normal JavaScript values using the exposed utility function:

```javascript
json2scss.convertJs([1, 2, 3]); // (1, 2, 3)
```

## API

### `json2scss([opts])`

Returns a through stream. Available options:

- `prefix`: Add some text to the beginning
- `suffix`: Add some text to the end. Defaults to `';'`.

### `json2scss.convertJs(jsValue)`

Convert a normal JavaScript value to its string representation in Sass. Ignores `undefined` and functions. Calls `.toString()` on non-plain object instances.

## License

ISC

[AS Developers](https://github.com/AS-Devs)
