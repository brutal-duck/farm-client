export default class Utils {
  /**
   * Возвращает новую строку с первой заглавной буквой
   * @param str исходная строка
   * @returns новая строка
   */
  public static ucFirst = (str: string) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  /**
   * 
   * @param state объект стейта
   * @returns Вовзращает имя пользователя согласно платформе
   */
  public static getUserName = (state: Istate): string => {
    let name = state.user.login;
    if (Utils.checkHasNamePlatform(state.platform)) name = state.name;
    return name;
  }

  /**
   * 
   * @param state Объект стейта
   * @returns Вовзращает true, если пользователь зарегистрирован согласно платформе и у него есть имя
   */
  public static checkUserHasName = (state: Istate): boolean => {
    let name = state.user.login;
    if (Utils.checkHasNamePlatform(state.platform)) name = state.name;
    return name !== '' || state.yaPlayer && state.platform === 'ya';
  }

  /**
   * Провряет запущены или грузятся сцены по ключам
   * @param scene Объект сцены
   * @param keys Массив ключей
   * @returns Возвращает true, если хоть одна из сцен запущена
   */
  public static checkActiveScenes = (scene: Phaser.Scene, keys: string[]): boolean => {
    for (const key of keys) {
      if (scene.scene.isActive(key) || scene.scene.get(key).load.isLoading()) return true; 
    }
    return false;
  }

  /**
   * 
   * @param platform ключ платформы
   * @returns Возвращает true, если на платформе есть имя пользователя, иначе false
   */
  public static checkHasNamePlatform = (platform: string): boolean =>  {
    return  platform === 'ya' || platform === 'vk' || platform === 'ok';
  }

  /**
   * 
   * @param platform ключ платформы
   * @returns Возвращает true, если платформа является социальной сетью
   */
  public static checkSocialPlatform = (platform: string): boolean =>  {
    return  platform === 'vk' || platform === 'ok';
  }

  /**
   * 
   * @param platform ключ платформы
   * @returns Возвращает true, если на платформе есть аватар пользователя, иначе false
   */
  public static checkHasAvatarPlatform = (platform: string): boolean => {
    return platform === 'ya' 
    || platform === 'vk' 
    || platform === 'ok' 
    || platform === 'android';
  }

  public static createZoneGraphics(scene: Phaser.Scene, zone: Phaser.GameObjects.Zone, color: number): void {
    const { height, width } = zone.input.hitArea;
    const { x, y } = zone;
    const graphics: Phaser.GameObjects.Graphics = scene.add.graphics();
    graphics.lineStyle(5, color);
    graphics.strokeRect(x - width / 2, y - height / 2, width, height);
  }

  /**
   * @param state Стейт
   * @param saleName Название акции из списка
   **  PACKAGE_PRICE - 1. -50% к оплате за пакет
   **  DIAMOND_COUNT - 2. x2 бонус к кристаллам 
   **  SHEEP_MONEY - 3. x2 к покупке овечьих монет
   **  CHICKEN_MONEY - 4. x2 к покупке куриных монет
   **  COW_MONEY - 5. x2 к покупке коровьих монет
   **  SHEEP_PRICE - 6. -50% к цене покупки овец
   **  CHICKEN_PRICE - 7. -50% к цене покупки кур
   **  COW_PRICE - 8. -50% к цене покупки коров
   **  SHEEP_COLLECTOR_PRICE - 9. -50% к цене на подстригателя овец
   **  CHICKEN_COLLECTOR_PRICE - 10. -50% к цене на собирателя яиц
   **  COW_COLLECTOR_PRICE - 11. -50% к цене на собирателя молока
   **  SHEEP_HERD - 12. 50% к цене на переполох овец
   **  CHICKEN_HERD - 13. -50% к цене на переполох кур
   **  COW_HERD - 14. -50% к цене на переполох коров
   **  SHEEP_FEED - 15. -50% к цене на овечий комбикорм
   **  CHICKEN_FEED - 16. -50% к цене на куриный комбикорм
   **  COW_FEED - 17. -50% к цене на коровий комбикорм
   **  CLAN - 18. -50% к цене создания клана, смены эмблемы и названия
   **  SHEEP_COLLECTOR_IMPROVE - 19. -50% к цене улучшения подстригателя
   **  CHICKEN_COLLECTOR_IMPROVE - 20. -50% к цене улучшения собирателя яиц
   **  COW_COLLECTOR_IMPROVE - 21. -50% к цене улучшения собирателя молока
   **  SHEEP_REPOSITORY_IMPROVE - 22. -50% к цене улучшения хранилищ овец
   **  CHICKEN_REPOSITORY_IMPROVE - 23. -50% к цене улучшения хранилищ кур
   **  COW_REPOSITORY_IMPROVE - 24. -50% к цене улучшения хранилищ коров
   **  COW_FACTORY_IMPROVE - 25. -50% к цене улучшения фабрики
   * @returns Возвращает true, если акция сейчас активна, иначе false
   */
  public static checkSale = (state: Istate, saleName: string): boolean => {
    return state.sales 
    && state.sales.some(el => el.type === saleName && el.startTime <= 0 && el.endTime > 0) 
    && state.userSheep.part > 4;
  }

  /**
   * 
   * @param state
   * @returns возвращает true, если стартерпак доступен игроку, иначе false
   */
  public static checkStarterpack = (state: Istate): boolean => {
    return !state.user.starterpack &&
    state.userSheep.tutorial >= 100 &&
    (state.userSheep?.part > 4 ||
    state.userChicken?.part >= 1 ||
    state.userUnicorn?.points >= 1 ||
    state.userCow?.part >= 1);
  }

  /**
   * 
   * @param state 
   * @returns Возвращает true, если пользователь имеет тест В, иначе false
   */
  public static checkTestB = (state: Istate): boolean => state && state.user.test === 'B';

  public static checkAndroidEngPlatform = (state: Istate) => {
    const { platform, lang } = state;
    return platform === 'android' && lang.index === 'en';
  }
};

