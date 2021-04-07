const JSBI = require('jsbi');

export default class BigInteger {
  /**
  * Сложение чисел (x + y)
  */
  static add(x: string, y: string): string {
    return String(JSBI.add(JSBI.BigInt(x), JSBI.BigInt(y)));
  }
  /** 
  *  Вычитание двух чисел (x - y)
  */
  static subtract(x: string, y: string): string {
    return String(JSBI.subtract(JSBI.BigInt(x), JSBI.BigInt(y)));
  };
  /**
  *  Умножение двух чисел (x * y)
  */
  static multiply(x: string, y: string): string {
    return String(JSBI.multiply(JSBI.BigInt(x), JSBI.BigInt(y)));
  }
  /**
  *  Деление двух чисел (x / y)
  */
   static divide(x: string, y: string): string {
    return String(JSBI.divide(JSBI.BigInt(x), JSBI.BigInt(y)));
  }
  /**
  *  Возведение в степень
  *  (x ** y)
  */
   static exponentiate(x: string, y: string): string {
    return String(JSBI.exponentiate(JSBI.BigInt(x), JSBI.BigInt(y)));
  }
  /**
  *  Остаток от деления (x % y)
  */
   static remainder(x: string, y: string): string {
    return String(JSBI.remainder(JSBI.BigInt(x), JSBI.BigInt(y)));
  }
  /**
   * Строгое равенство (x === y)
   */
  static equal(x: string, y: string): boolean {
    return JSBI.equal(JSBI.BigInt(x), JSBI.BigInt(y))
  }
  /**
   * Строгое не равенство (x !== y)
   */
  static notEqual(x: string, y: string): boolean {
    return JSBI.notEqual(JSBI.BigInt(x), JSBI.BigInt(y))
  }
  /**
  * Меньше (x < y)
  */
  static lessThan(x: string, y: string): boolean {
    return JSBI.lessThan(JSBI.BigInt(x), JSBI.BigInt(y))
  }
  /**
  * Меньше или равно (x <= y)
  */
  static lessThanOrEqual(x: string, y: string): boolean {
    return JSBI.lessThanOrEqual(JSBI.BigInt(x), JSBI.BigInt(y))
  }
  /**
  * Больше (x > y)
  */
  static greaterThan(x: string, y: string): boolean {
    return JSBI.greaterThan(JSBI.BigInt(x), JSBI.BigInt(y))
  }
  /**
  * Больше или равно (x >= y)
  */
   static greaterThanOrEqual(x: string, y: string): boolean {
    return JSBI.greaterThanOrEqual(JSBI.BigInt(x), JSBI.BigInt(y))
  }
} 
