# Changelog

## v1.5.0

### Added or Changed
- Added this changelog :)
- Rewrite the whole Readme file once again for better readability
- Back to top links
- Added major feature to convert the color value into specific color scheme (rgb, hsl, hex) etc.
- Default behavior has been changed to color convertion on functionality with `hsl` convertion. 
- Also added config for outputing the color values into new CSS Color Lavel 4 Syntax. (all major browsers has support for new syntax)
- Default behavior for this new syntax output `cl4Syntax` is `false`. 

### Drawbacks
- RGB colors can also support % in there values. This version doesn't treat % in rgb value as rgb colors. So, we don't convert them.
- HSL colors support `deg` unit. This version doesn't treat `deg, rad, turn` units as valid color. So, we don't convert them.
- It doesn't support color convertion from a new space separated syntax as input.
- We don't throw any error during the file read / write. It won't convert these colors if it doesn't understand any input as colors. But it will output these values without `quotes`.

## v1.4.2

### Added or Changed
- Improvement / Fix Regarding compiling Nested Array of Objects.
- Updated the unexpectedly remove `quotes` from the strings.
- Thanks to the [Dylan Awalt-Conley](https://github.com/dawaltconley) for your PR.

## v1.4.1

### Added or Changed
- Added support for ch unit as value.
- Now you can use any color format you are not strict to use hex only . Use rgba, hsl, rgb etc.

## v1.4.0

### Added or Changed
- scss map supports key as string so, now map keys will be in string. 
- font sizes like rem, px, em and colors in hex value will return without string quote which will help you to get the desire value from scss map.