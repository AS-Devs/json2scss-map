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
    <a href="https://github.com/AS-Devs/json2scss-map/blob/dev/CHANGELOG.md">View Changelog</a>
    ·
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
    <li><a href="#api">API</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#donate">Donate</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://www.npmjs.com/package/json2scss-map)

There are lots of Json-sass package available on npm; however, I didn't find one that really suited my needs. So, I thought of creating one.
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

It's very easy to use this plugin, instructions are mentioned below or you can <a href="https://codesandbox.io/s/json2scss-map-demo-phcsf?file=/theme/output.scss">View Demo.</a>

### Prerequisites

There no such basic requirements only `node.js` should be installed. also update `npm or yarn` if you can. Although, there are some issue in node 17.

### Installation

_There are many ways to install this plugin mentioned below._

- using npm:
   ```sh
   npm i -D json2scss-map
   ```
- using yarn:
   ```sh
   yarn add json2scss-map -D
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


## Usage

Example source file `theme.json`:

[![Input Json][input-theme]](https://www.npmjs.com/package/json2scss-map)

From the command-line:

```sh
$ json2scss-map -i theme.json -o theme.scss -p "\$variable: "
```

Output `theme.scss` with new color convertion to `hsl` by default:

[![Output Scss map][output-theme]](https://www.npmjs.com/package/json2scss-map)

Or you can use the Node API: (recommended)

``` javascript
var fs = require('fs');
var json2scss = require('json2scss-map');

fs.createReadStream('theme.json')
  .pipe(json2scss({
    prefix: '$variable: ',
    cl4Syntax: true
  }))
  .pipe(fs.createWriteStream('theme.scss'));
```

Then, you can get the values from scss:map 

```scss
  $color-primary: map-get(map-get($variable, "theme"), "primary"); // hsl(211, 100%, 50%)
  $font-main: map-get($variable, "fs-main"); // "Mulish"
```

You can also transform normal JavaScript values using the exposed utility function:

```javascript
json2scss.convertJs([1, 2, 3]); // (1, 2, 3)
```


_For more, please refer to the [View Demo](https://codesandbox.io/s/json2scss-map-demo-phcsf?file=/theme/output.scss)_

Alternatively, If you're using custom Webpack Configuration, you can use this tool to easily import JSON files and get the correct values.
[Json2scss-map-webpack-importer](https://www.npmjs.com/package/json2scss-map-webpack-importer)

<p align="right">(<a href="#top">back to top</a>)</p>


## API

### `json2scss([opts])`

Returns a through stream. Available options:

- `prefix`: Add some text to the beginning
- `suffix`: Add some text to the end. Defaults to `';'`.
- `colorConversion`: New Feature to convert only colors value to different color scheme. Defaults to `true`. (from v1.5.0)
- `convertTo`: Right now support convertion for `HSL, RGB, HEX` colors. Defaults to `hsl`.
- `cl4Syntax`: color lavel 4 new syntax with space separator for the output. Defaults to `false`.

### `json2scss.convertJs(jsValue)`

Convert a normal JavaScript value to its string representation in Sass. Ignores `undefined` and functions. Calls `.toString()` on non-plain object instances.



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add new Color label 4 syntax support
- [x] Add Color Convertion to (hsl, rgb, hex)
- [ ] Add support for Color Lavel 4 Syntax in input stream as well.
- [ ] Add Support for LCH color scheme convertion.
- [ ] Add Support for ` % ` value in RGB colors.
- [ ] Add Support for `turn, deg, rad` etc unit support in hsl & rgb colors.

See the [open issues](https://github.com/AS-Devs/json2scss-map/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this plugin better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star ⭐️! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/{feature-name}`)
3. Commit your Changes (`git commit -m 'Add some {feature}'`)
4. Push to the Branch (`git push origin feature/{feature-name}`)
5. Open a Pull Request
6. You're awesome.
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.<br>
[AS Developers](https://github.com/AS-Devs)



<!-- CONTACT -->
## Contact

Susanta Chakraborty - [@susantaChak](https://twitter.com/susantaChak)

Project Link: [https://github.com/AS-Devs/json2scss-map](https://github.com/AS-Devs/json2scss-map)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

There are lots of people to acknowledge. I've included few of them to help be build this plugin.

* [Andrew Clark for previous plugin](https://github.com/acdlite/json-sass)
* [CSS Tricks for lots of ideas](https://css-tricks.com/)
* [Img Shields for writing readme](https://shields.io)

## Donate

> If you found this project helpful or you learned something from the source code and want to thank me, consider buying me a cup of :tea:
>
> - [PayPal](https://www.paypal.com/paypalme/SusantaChak/)
> - [ButmeaCoffee](https://www.buymeacoffee.com/susanta96/)


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
[input-theme]: images/input.png
[output-theme]: images/output.png
