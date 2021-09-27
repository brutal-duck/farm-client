declare interface IroundedField {
  x: number
  y: number
  width: number
  height: number
  atlasTexture: string
  depth: number
  originY: number

  /**
   * Анимация развертывания (увеличение высоты)
   * @param height Добавочная высота
   */
  expand(height: number): void

  /**
   * Анимация свертывания (уменьшения высоты)
   ** Если высота больше, чем высота объекта, то объект установится в минимальную высоту
   * @param height Отнимаемая высота
   */
  cutDown(height: number): void

  /**
   * Установка пилон точки по Y
   * @param origin Возможные значения: 0, 0.5, 1 (иначе устанавливается 0.5)
   */
	setOriginY(origin: number): this

  /**
   * Установка позиции объекта по x и y
   * @param x позиция x
   * @param y позиция y
   */
  setPosition(x?: number, y?: number): this

  /**
   * Установка позиции объекта по x
   * @param x позиция x
   */
  setX(x: number): this

  /**
   * Установка позиции объекта по y
   * @param y позиция y
   */
  setY(y: number): this

  /**
   * Наложние оттенка
   * @param tint значение оттенка
   */
  setTint(tint: number): this

  /**
   * Снимает оттенок
   */
  clearTint(): this

  /**
   * Установка глубины объекта
   * @param depth Значение глубины
   */
  setDepth(depth: number): this

  /**
   * Установка прозрачности объекта
   * @param alpha значение прозрачности
   */
  setAlpha(alpha: number): this

  /**
   * Установка интерактивности
   */
  setInteractive(): this

  /**
   * Слушатель событий интерактивного объекта
   * @param event событие
   * @param callback выполняемая функция
   */
  on(event: string, callback: Function): this

  /**
   * Возвращает центральную позицию объекта
   */
  getCenter(): { x: number, y: number }

  /**
   * Возвращает верхнюю центральную позицию объекта
   */
  getTopCenter(): { x: number, y: number }

  /**
   * Возвращает левую центральную позицию объекта
   */
  getLeftCenter(): { x: number, y: number }

  /**
   * Возвращает правую центральную позицию объекта
   */
  getRightCenter(): { x: number, y: number }

  /**
   * Возвращает нижнюю центральную позицию объекта
   */
  getBottomCenter(): { x: number, y: number }
  
  /**
   * Уничтожает все елементы и анимации объекта
   */
  destroy(): void
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    /**
     * Создание поля с округленными углами
     * @param x позиция x
     * @param y позиция y
     * @param width длинна
     * @param height высота
     * @param atlasTexture текстура атласа
     */
    roundedField(x: number, y: number, width: number, height: number, atlasTexture: string): IroundedField;
  }
}