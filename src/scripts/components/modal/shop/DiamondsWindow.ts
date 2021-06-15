import Shop from "../../../scenes/Modal/Shop/Main";

export default class DiamondsWindow {
  public scene: Shop;

  constructor(scene: Shop) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('bank_page_viewed', {});
    
    let rows: number = Math.ceil(this.scene.state.packages.length / 2);
    let height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height ;
    if (!this.scene.state.user.starterpack && 
      (this.scene.state.userSheep?.part > 4 ||
        this.scene.state.userChicken?.part >= 1 ||
        this.scene.state.userUnicorn?.maxLevelAnimal >= 1 ||
        this.scene.state.userCow?.part >= 1
      )) {
      this.scene.scrolling.bottom += 350;
      const y: number = this.scene.height + 140;
      let starterpackBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 130, y, 'starterpack-bg');
      let starterpackIconShadow: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 265, y + 70, 'starterpack-shadow');
      let starterpackIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 270, y, 'starterpack-icon');
      let text1: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 90, y - 40, this.scene.state.lang.buyFrom, {
        font: '26px Shadow',
        color: '#FBCB64'
      }).setOrigin(0.5, 0.5);
  
      let text2: Phaser.GameObjects.Text = this.scene.add.text(text1.getBounds().right + 10, text1.y, '750', {
        font: '26px Shadow',
        color: '#ffffff'
      }).setOrigin(0, 0.5);
  
      let diamond1: Phaser.GameObjects.Image = this.scene.add.image(text2.getBounds().right + 5, text1.y, 'diamond').setScale(0.10).setOrigin(0, 0.5);
  
      let text3: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 50, text1.getBounds().bottom + 5, this.scene.state.lang.getGift,  {
        font: '26px Shadow',
        color: '#FBCB64'
      }).setOrigin(0.5, 0);
  
      let text4: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 90, text3.getBounds().bottom + 5, this.scene.state.lang.more, {
        font: '26px Shadow',
        color: '#FBCB64'
      }).setOrigin(0.5, 0);
      
      let text5: Phaser.GameObjects.Text = this.scene.add.text(text4.getBounds().right + 5, text3.getBounds().bottom + 5, '+750', {
        font: '26px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0, 0);
  
      let diamond2: Phaser.GameObjects.Image = this.scene.add.image(text5.getBounds().right + 5, text5.y, 'diamond').setScale(0.10).setOrigin(0);
  
      let text6: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 50, text4.getBounds().bottom + 5, this.scene.state.lang.dontMissChanse, {
        font: '26px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0);

      this.scene.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        props: {
          rotation: { duration: 1200, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
          y: { value: '-=40', ease: 'Power1', duration: 250, repeat: 2, yoyo: true },
        },
        loop: -1,
        loopDelay: 1000,
      });

      this.scene.tweens.add({ targets: starterpackIconShadow, delay: 2000, duration: 250,  repeat: 2, yoyo: true, scale: 0.3, ease: 'Power1', loop: -1, loopDelay: 1000 });

    }


    for (let i: number = 0; i < rows; i++) {
      let y: number = i * 270 + 40;

      if (!this.scene.state.user.starterpack && 
        (this.scene.state.userSheep?.part > 4 ||
          this.scene.state.userChicken?.part >= 1 ||
          this.scene.state.userUnicorn?.maxLevelAnimal >= 1 ||
          this.scene.state.userCow?.part >= 1
        )) y += 238;
      
      let left: Ipackage = this.scene.state.packages[i * 2];
      let right: Ipackage = this.scene.state.packages[i * 2 + 1];
      
      // левая
      let pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, y + this.scene.height, 'bank-package').setOrigin(0, 0);
      this.scene.click(pack, (): void => {

        this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('bank_pack_selected', {
          package_id: left.id
        });
        
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');

        if (this.scene.state.platform === 'ok') {
          this.scene.payOdnoklassniki(left.id);
        } else if (this.scene.state.platform === 'vk') {
          this.scene.payVK(left.id);
        } else {
          this.scene.payRobokassa(left.id, this.scene.state);
        }

      });

      this.scene.add.text(110, y + 145 + this.scene.height, String(left.diamonds + left.bonus), {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      if (left.bonus > 0) {

        this.scene.add.text(110, y + 180 + this.scene.height, this.scene.state.lang.benefit + ' ' + '+' + left.bonus, {
          font: '20px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

      }

      if (left.diamonds + left.bonus >= 750 && 
        !this.scene.state.user.starterpack && 
        (this.scene.state.userSheep?.part > 4 ||
          this.scene.state.userChicken?.part >= 1 ||
          this.scene.state.userUnicorn?.maxLevelAnimal >= 1 ||
          this.scene.state.userCow?.part >= 1
        )) {
        let starterpackIcon: Phaser.GameObjects.Image = this.scene.add.image(30, y + this.scene.height + 20, 'starterpack-icon').setScale(0.4);
        this.scene.tweens.add({
          targets: starterpackIcon,
          delay: 2000,
          angle: -21,
          duration: 100,
          yoyo: true,
          repeat: 1,
          loop: -1
        });
      }

      let text: string;

      if (this.scene.state.platform === 'ok') {
        text = left.price + ' ' + 'ОК';
      } else if (this.scene.state.platform === 'vk') {
        text = left.voices + ' ' + this.scene.state.lang.voices;
      } else {
        text = left.price + ' ' + this.scene.state.lang.ruble;
      }

      let btn = this.scene.shopButton(110, y + 223 + this.scene.height, text);
      this.scene.clickShopBtn(btn, (): void => {
        
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');

        if (this.scene.state.platform === 'ok') this.scene.payOdnoklassniki(left.id);
        else if (this.scene.state.platform === 'vk') this.scene.payVK(left.id);
        else this.scene.payRobokassa(left.id, this.scene.state);

      });

      if (left.stock > 0) {

        this.scene.add.sprite(0, y + this.scene.height, 'stock-tape').setOrigin(0, 0);
        this.scene.add.text(162, y + 42 + this.scene.height, '+' + left.stock + '%', {
          font: '34px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setRotation(0.55);
      } 
      
      // правая
      if (right) {
        
        let pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(240, y + this.scene.height, 'bank-package').setOrigin(0, 0);
        this.scene.click(pack, (): void => {
          
          this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('bank_pack_selected', {
            package_id: right.id
          });
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.scene.stop();
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
          
          if (this.scene.state.platform === 'ok') {
            this.scene.payOdnoklassniki(right.id);
          } else if (this.scene.state.platform === 'vk') {
            this.scene.payVK(right.id);
          } else {
            this.scene.payRobokassa(right.id, this.scene.state);
          }

        });

        this.scene.add.text(350, y + 145 + this.scene.height, String(right.diamonds + right.bonus), {
          font: '40px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
        
        if (right.diamonds + right.bonus >= 750 && 
          !this.scene.state.user.starterpack && 
          (this.scene.state.userSheep?.part > 4 ||
          this.scene.state.userChicken?.part >= 1 ||
          this.scene.state.userUnicorn?.maxLevelAnimal >= 1 ||
          this.scene.state.userCow?.part >= 1
        )) {
          let starterpackIcon: Phaser.GameObjects.Image = this.scene.add.image(270, y + this.scene.height + 20, 'starterpack-icon').setScale(0.4).setDepth(3);
          this.scene.tweens.add({
            targets: starterpackIcon,
            delay: 2000,
            angle: -21,
            duration: 100,
            yoyo: true,
            repeat: 1,
            loop: -1
          });
        }

        if (right.bonus > 0) {

          this.scene.add.text(350, y + 180 + this.scene.height, this.scene.state.lang.benefit + ' ' + '+' + right.bonus , {
            font: '20px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5);

        }
        let text: string;

        if (this.scene.state.platform === 'ok') {
          text = right.price + ' ' + 'ОК';
        } else if (this.scene.state.platform === 'vk') {
          text = right.voices + ' ' + this.scene.state.lang.voices;
        } else {
          text = right.price + ' ' + this.scene.state.lang.ruble;
        }

        let btn = this.scene.shopButton(350, y + 223 + this.scene.height, text);
        this.scene.clickShopBtn(btn, (): void => {
          
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.scene.stop();
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');

          if (this.scene.state.platform === 'ok') {
            this.scene.payOdnoklassniki(right.id);
          } else if (this.scene.state.platform === 'vk') {
            this.scene.payVK(right.id);
          } else {
            this.scene.payRobokassa(right.id, this.scene.state);
          }

        });

        if (right.stock > 0) {

          this.scene.add.sprite(240, y + this.scene.height, 'stock-tape').setOrigin(0, 0);
          this.scene.add.text(402, y + 42 + this.scene.height, '+' + right.stock + '%', {
            font: '34px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5).setRotation(0.55);

        }

      }
    }

    if (!this.scene.state.user.takenFreeDiamonds && (this.scene.state.userSheep.tutorial >= 100 || this.scene.state.progress.chicken.part >= 1 || this.scene.state.progress.cow.part >= 1)) {
      const FREE_DIAMONDS: number = 1;
      let y: number = (rows + 1) * 270 + 50 + this.scene.height - 238;
      if (!this.scene.state.user.starterpack && 
        (this.scene.state.userSheep?.part > 4 ||
          this.scene.state.userChicken?.part >= 1 ||
          this.scene.state.userUnicorn?.maxLevelAnimal >= 1 ||
          this.scene.state.userCow?.part >= 1
        )) y += 238;
      this.scene.add.sprite(this.scene.cameras.main.centerX - 130, y, 'free-diamonds-bg');
      const diamondCount: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 300, y, `+${FREE_DIAMONDS}`, {
        font: '34px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5);
      this.scene.add.sprite(diamondCount.getBounds().right + 5, y, 'diamond').setScale(0.23).setOrigin(0, 0.5);
      const takeBtn: any = this.scene.shopButton(this.scene.cameras.main.centerX - 30, y, '0 ' + this.scene.state.lang.ruble);
      this.scene.clickShopBtn(takeBtn, () => {
        this.scene.state.user.takenFreeDiamonds = true;
        this.scene.state.user.diamonds += FREE_DIAMONDS;
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
        this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency({ x: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerX, y: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerY }, FREE_DIAMONDS, 'diamond');
        this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_get', {
          type: 'bank_page',
          count: FREE_DIAMONDS,
        });
      })
    }

    // this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

  }


  // private update(): void {}
  
}