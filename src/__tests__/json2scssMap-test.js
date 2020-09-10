'use strict';

import { expect } from 'chai';
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
    expect(json2scssMap('12px')).to.equal('12px');
    expect(json2scssMap('14ch')).to.equal('14ch');
    expect(json2scssMap('2rem')).to.equal('2rem');
    expect(json2scssMap('#232323')).to.equal('#232323');
    expect(json2scssMap('rgba(255,34,21, .6)')).to.equal('rgba(255,34,21, .6)');
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

    expect(json2scssMap(obj)).to.equal('(\n  "foo": "bar",\n  "bar": (\n    "baz": "foo"\n  )\n)')
  })
});
