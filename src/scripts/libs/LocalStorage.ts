export default class LocalStorage {
  public static get(key: string): string {
    try {
      return window?.localStorage.getItem(key);
    } catch (e) {
      console.log(e);
    } 
    return;
  }

  public static set(key: string, value: string): void {
    try {
      window?.localStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    } 
  }

  public static clear(): void {
    try {
      window?.localStorage.clear();
      console.log('clear')
    } catch (e) {
      console.log(e);
    } 
  }
}