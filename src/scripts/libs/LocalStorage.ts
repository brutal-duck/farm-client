export default class LocalStorage {
  public static get(key: string): string {
    try {
      return localStorage?.getItem(key);
    } catch (e) {
      console.log(e);
    } 
    return;
  }

  public static set(key: string, value: string): void {
    try {
      localStorage?.setItem(key, value);
    } catch (e) {
      console.log(e);
    } 
  }
}