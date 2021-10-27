import Button from './Button';
import Modal from './../../scenes/Modal/Modal';

export default class SpriteButton extends Button {
  private texture: string;
  constructor(scene: Modal, position: Iposition, action: () => void, texture: string) {
    super(scene, position, action);
    this.texture = texture;
    this.mainSprite = this.scene.add.sprite(this.position.x, this.position.y, this.texture);
    this.setClickListener();
  }
}