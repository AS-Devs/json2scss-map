
export declare type colorTypes = 'hsl' | 'HSL' | 'hsla' | 'HSLA' | 'rgb' | 'RGB' | 'rgba' | 'RGBA' | 'hex' | 'HEX' | 'hexa' | 'HEXA';

interface CommonOptions {
  /**
   * when you need to turn off / on the color convertions.
   * `Default: true`
   */
  colorConvertion?: boolean;
  /**
   *  If Input stream has some colors then we will convert it to mentioned color formats
   * `Default: hsl`
   */
   convertTo?: colorTypes;
  /**
   * Color level 4 Syntax Supported by latest browser.
   * `Default: false`
   */
  cl4Syntax?: boolean;
}

export interface J2SOptionProps extends CommonOptions {
  /**
   * Prefix for the output sass maps name.
   * `Default: $theme`
   */
  prefix?: string;

  /**
   * Suffix for the output sass maps end.
   * `Default: ';'`
   */
  suffix?: string;
  
}

export declare module json2scss {}



// export { TypeOptions } from './types';