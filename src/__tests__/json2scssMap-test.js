'use strict';

import { expect,  } from 'chai';
import json2scssMap from '../json2scssMap';

function Foo() {
  this.toString = function() {
    return 'bar';
  }
}

var foo = new Foo();

describe('JSON to SCSS Map', function() {
  it('should handle strings', function() {
    expect(json2scssMap('foo')).to.equal('"foo"');
    expect(json2scssMap('item')).to.equal('"item"');
    expect(json2scssMap('ch')).to.equal('"ch"');
    expect(json2scssMap('12px')).to.equal('12px');
    expect(json2scssMap('14ch')).to.equal('14ch');
    expect(json2scssMap('2.4rem')).to.equal('2.4rem');
  });
  
  it('Convertion to - HSL(A)', function() {
    let option = {
      colorConversion: true,
      convertTo: 'hsl',
      cl4Syntax: false
    }
    expect(json2scssMap('#232', option)).to.equal('hsl(120, 20%, 16.7%)');
    expect(json2scssMap('#22ffff', option)).to.equal('hsl(180, 100%, 56.7%)');
    expect(json2scssMap('#D9FFFFD1', option)).to.equal('hsla(180, 100%, 92.5%, 0.82)');
    expect(json2scssMap('rgba(255,34,21,.6)', option)).to.equal('hsla(3, 100%, 54.1%, .6)');
    expect(json2scssMap('rgb(255,34,21)', option)).to.equal('hsl(3, 100%, 54.1%)');
    expect(json2scssMap('hsla(149, 100%, 37%, 0.89)', option)).to.equal('hsla(149, 100%, 37%, 0.89)');
  });

  it('Convertion to - HSL(A) - CL4Syntax', function() {
    let option = {
      colorConversion: true,
      convertTo: 'hsl',
      cl4Syntax: true
    }
    expect(json2scssMap('#232', option)).to.equal('hsl(120 20% 16.7%)');
    expect(json2scssMap('#22ffff', option)).to.equal('hsl(180 100% 56.7%)');
    expect(json2scssMap('#D9FFFFD1', option)).to.equal('hsl(180 100% 92.5% / 82%)');
    expect(json2scssMap('rgba(255,34,21,.6)', option)).to.equal('hsl(3 100% 54.1% / 60%)');
    expect(json2scssMap('rgb(255,34,21)', option)).to.equal('hsl(3 100% 54.1%)');
    expect(json2scssMap('hsl(255,34%,21%)', option)).to.equal('hsl(255 34% 21%)');
    expect(json2scssMap('hsla(149, 100%, 37%, 0.89)', option)).to.equal('hsl(149 100% 37% / 89%)');
  });

  it('new Convertion to - RGB(A)', function() {
    let option = {
      colorConversion: true,
      convertTo: 'rgb',
      cl4Syntax: false
    }
    expect(json2scssMap('#232', option)).to.equal('rgb(34, 51, 34)');
    expect(json2scssMap('#22ffff', option)).to.equal('rgb(34, 255, 255)');
    expect(json2scssMap('#D9FFFFD1', option)).to.equal('rgba(217, 255, 255, 0.82)');
    expect(json2scssMap('hsl(255,34%,21%)', option)).to.equal('rgb(44, 35, 72)');
    expect(json2scssMap('hsla(149, 100%, 37%, 0.89)', option)).to.equal('rgba(0, 189, 91, 0.89)');
    expect(json2scssMap('rgb(255,34,21)', option)).to.equal('rgb(255, 34, 21)');
    expect(json2scssMap('rgba(255,34,21, 0.2)', option)).to.equal('rgba(255, 34, 21, 0.2)');
  });

  it('Convertion to - RGB(A) - CL4Syntax', function() {
    let option = {
      colorConversion: true,
      convertTo: 'rgb',
      cl4Syntax: true
    }
    expect(json2scssMap('#232', option)).to.equal('rgb(34 51 34)');
    expect(json2scssMap('#22ffff', option)).to.equal('rgb(34 255 255)');
    expect(json2scssMap('#D9FFFFD1', option)).to.equal('rgb(217 255 255 / 82%)');
    expect(json2scssMap('hsl(255,34%,21%)', option)).to.equal('rgb(44 35 72)');
    expect(json2scssMap('hsla(149, 100%, 37%, 0.89)', option)).to.equal('rgb(0 189 91 / 89%)');
    expect(json2scssMap('rgb(255,34,21)', option)).to.equal('rgb(255 34 21)');
    expect(json2scssMap('rgba(255,34,21, 0.2)', option)).to.equal('rgb(255 34 21 / 20%)');
  });

  it('new Convertion to - HEX(A)', function() {
    let option = {
      colorConversion: true,
      convertTo: 'hex'
    }
    expect(json2scssMap('#232', option)).to.equal('#232');
    expect(json2scssMap('#22ffff', option)).to.equal('#22ffff');
    expect(json2scssMap('#D9FFFFD1', option)).to.equal('#D9FFFFD1');
    expect(json2scssMap('hsl(255,34%,21%)', option)).to.equal('#2c2348');
    expect(json2scssMap('hsla(149, 100%, 37%, 0.89)', option)).to.equal('#00bd5be3');
    expect(json2scssMap('rgb(255,34,21)', option)).to.equal('#ff2215');
    expect(json2scssMap('rgba(255,34,21, 0.2)', option)).to.equal('#ff221533');
  });

  it('should handle booleans', function() {
    expect(json2scssMap(true)).to.equal('true');
    expect(json2scssMap(false)).to.equal('false');
  });

  it('should handle null', function() {
    expect(json2scssMap(null)).to.equal('null');
  });

  it('should ignore undefined', function() {
    expect(json2scssMap(undefined)).to.be.undefined;
  });

  it('should ignore functions', function() {
    expect(json2scssMap(function() {})).to.be.undefined;
  });

  it ('should use value of `.toString()` for non-plain objects', function() {
    expect(json2scssMap(foo)).to.equal('bar');
  });

  it('should convert arrays to lists', function() {
    expect(json2scssMap([1, 2, 3])).to.equal('(1, 2, 3)');
  });

  it('should convert objects to maps, with indentation', function() {
    var obj = {
      foo: 'bar',
      bar: {
        baz: 'foo',
      },
    };

    expect(json2scssMap(obj)).to.equal('(\n  "foo": "bar",\n  "bar": (\n    "baz": "foo"\n  )\n)');
  });

  it('should convert an array of objects to a list of maps', function() {
    var obj = [
      { foo: 'bar' },
      { baz: 4 }
    ];

    expect(json2scssMap(obj)).to.equal('((\n  "foo": "bar"\n), (\n  "baz": 4\n))');
  });
  it('should correctly convert a single-item list', function() {
    var obj = [ 'only item' ];

    expect(json2scssMap(obj)).to.equal('("only item",)');
  });
});
