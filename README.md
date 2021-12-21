<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AS-Devs/json2scss-map">
    <img src="images/JSON2SCSS.png" alt="Logo" width="370" height="auto">
  </a>

  <h3 align="center">Json2scss-Map</h3>

  <p align="center">
    It's an utility package that converts any JSON stream into Sass maps with additional color convertion.
      <img src="https://img.shields.io/badge/-NEW-orange" alt="new-badge" height="16">
    <br />
    <br />
    <a href="https://codesandbox.io/s/json2scss-map-demo-phcsf?file=/theme/output.scss">View Demo</a>
    ·
    <a href="https://github.com/AS-Devs/json2scss-map/issues">Report Bug</a>
    ·
    <a href="https://github.com/AS-Devs/json2scss-map/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://www.npmjs.com/package/json2scss-map)

There are many lots of Json-sass package available on npm; however, I didn't find one that really suited my needs. So, I thought of creating one.
Altough, i find one that's good enough & made by [Andrew Clark](https://github.com/acdlite). But that wasn't maintained from last 6+ years.

This is an Utility module that converts a JSON stream into sass maps. It can be used as whitelabeling themes, fonts etc.

Here's why it's best:
* firstly, you can share values between your scripts and stylesheets without having to use something like [SassyJSON](https://github.com/HugoGiraudel/SassyJSON), which doesn't work with libsass.
* json2scss-map converts JSON objects into Sass maps, which are supported in Ruby Sass 3.3 and libsass 2.0. & latest Dart Sass.
* Also, New Version includes color convertions to `HEX, HSL, RGB` 😎


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This is a very small package without any major dependency. However, we use some packages for giving support for browser-compatible Javascript, Unit testing etc.

* [Babel](https://babel.dev)
* [Chai](https://www.npmjs.com/package/chai)
* [Mocha](https://www.npmjs.com/package/mocha)
* [Through2](https://www.npmjs.com/package/through2)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


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

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AS-Devs/json2scss-map?color=%23007bff&style=for-the-badge
[contributors-url]: https://github.com/AS-Devs/json2scss-map/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AS-Devs/json2scss-map?color=44567bf&style=for-the-badge
[forks-url]: https://github.com/AS-Devs/json2scss-map/network/members
[stars-shield]: https://img.shields.io/github/stars/AS-Devs/json2scss-map?color=%23007bff&style=for-the-badge
[stars-url]: https://github.com/AS-Devs/json2scss-map/stargazers
[issues-shield]: https://img.shields.io/github/issues/AS-Devs/json2scss-map?style=for-the-badge
[issues-url]: https://github.com/AS-Devs/json2scss-map/issues
[license-shield]: https://img.shields.io/github/license/AS-Devs/json2scss-map?style=for-the-badge
[license-url]: https://github.com/AS-Devs/json2scss-map/blob/dev/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/susanta96/
[product-screenshot]: images/poster.webp