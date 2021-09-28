export default class Utils {
  /**
   * Возвращает новую строку с первой заглавной буквой
   * @param str исходная строка
   * @returns новая строка
   */
  public static ucFirst = (str: string) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  };
};
