

// нажатие на кнопку в окне магазина
function clickShopBtn(btn: any, action: any) {

  let button = btn.btn;
  let title = btn.title;
  let img = btn.img;

  button.setInteractive();

  button.on('pointerdown', (): void => {
    if (this.game.scene.keys[this.state.farm]?.scene.isActive()) {
      this.game.scene.keys[this.state.farm].scrolling.enabled = false;
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
    }

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let filter: number = 0xFFFFFF;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      filter -= 0x222222;
      button.setTint(filter);
      title.setTint(filter);
      button.y = Math.round(button.y + 1);
      title.y = Math.round(title.y + 1);

      if (img) {
        img.setTint(filter);
        img.y = Math.round(img.y + 1);
      }

      counter++;

      if (counter >= 3) interval.remove(false);

    }, callbackScope: this, loop: true });
;
    this.game.scene.keys[this.state.farm]?.playSoundOnce('click-sound');

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;

      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      if (this.game.scene.keys[this.state.farm]?.scene.isActive()) this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();
    } else if (this.game.scene.keys[this.state.farm]?.scene.isActive()) this.game.scene.keys[this.state.farm].scrolling.enabled = true;
  });
}

// нажатие на кнопку в окне магазина
function clickBoostBtn(btn: any, action: any) {

  let button = btn.btn;
  let left = btn.left;
  let leftLitle = btn.leftLitle;
  let right = btn.right;
  let img = btn.icon;

  button.setInteractive();

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let filter: number = 0xFFFFFF;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      filter -= 0x222222;
      button.setTint(filter);
      left.setTint(filter);
      leftLitle.setTint(filter);
      right.setTint(filter);
      button.y = Math.round(button.y + 1);
      left.y = Math.round(left.y + 1);
      leftLitle.y = Math.round(leftLitle.y + 1);
      right.y = Math.round(right.y + 1);

      if (img) {
        img.setTint(filter);
        img.y = Math.round(img.y + 1);
      }

      counter++;

      if (counter >= 3) interval.remove(false);

    }, callbackScope: this, loop: true });

    this.game.scene.keys[this.state.farm]?.playSoundOnce('click-sound');

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;

      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        left.setTint(filter);
        leftLitle.setTint(filter);
        right.setTint(filter);
        button.y = Math.round(button.y - 1);
        left.y = Math.round(left.y - 1);
        leftLitle.y = Math.round(leftLitle.y - 1);
        right.y = Math.round(right.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        left.setTint(filter);
        leftLitle.setTint(filter);
        right.setTint(filter);
        button.y = Math.round(button.y - 1);
        left.y = Math.round(left.y - 1);
        leftLitle.y = Math.round(leftLitle.y - 1);
        right.y = Math.round(right.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });

}

// нажатие на территорию
function clickTerritory(object: any, action: () => void): void {

  object.setInteractive();
  let moveCounter: number = 0;

  object.on('pointerdown', (): void => {
    object.press = true;
  });

  object.on('pointermove', (): void => {
    if (object.press) moveCounter++
  });

  object.on('pointerout', (): void => {
    
    if (object.press) {

      moveCounter = 0;
      object.press = false;
      
    }

  });

  object.on('pointerup', (): void => {

    if (object.press && moveCounter < 5) {

      object.press = false;
      action();
      
    } else if (object.press) object.press = false;

    moveCounter = 0;

  });
  
}

// функция нажатия на кнопку с затемнением
function clickModalBtn(arr: any, action: () => void): void {

  let button = arr.btn;
  let title = arr.title;
  let text1 = arr.text1;
  let text2 = arr.text2;
  let img1 = arr.img1;
  let img2 = arr.img2;

  button.setInteractive();

  button.on('pointerdown', (): void => {

    if (this.game.scene.keys[this.state.farm]) {
      this.game.scene.keys[this.state.farm].scrolling.enabled = false;
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
    }

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let filter: number = 0xFFFFFF;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      filter -= 0x222222;
      button.setTint(filter);
      title.setTint(filter);
      button.y = Math.round(button.y + 1);
      title.y = Math.round(title.y + 1);

      if (text1 !== undefined) {
        text1.setTint(filter);
        text1.y = Math.round(text1.y + 1);
      }

      if (text2 !== undefined) {
        text2.setTint(filter);
        text2.y = Math.round(text2.y + 1);
      }

      if (img1 !== undefined) {
        img1.setTint(filter);
        img1.y = Math.round(img1.y + 1);
      }

      if (img2 !== undefined) {
        img2.setTint(filter);
        img2.y = Math.round(img2.y + 1);
      }

      counter++;

      if (counter >= 3) interval.remove(false);

    }, callbackScope: this, loop: true });

    this.game.scene.keys[this.state.farm]?.playSoundOnce('click-sound');

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;

      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (text1 !== undefined) {
          text1.setTint(filter);
          text1.y = Math.round(text1.y - 1);
        }

        if (text2 !== undefined) {
          text2.setTint(filter);
          text2.y = Math.round(text2.y - 1);
        }

        if (img1 !== undefined) {
          img1.setTint(filter);
          img1.y = Math.round(img1.y - 1);
        }

        if (img2 !== undefined) {
          img2.setTint(filter);
          img2.y = Math.round(img2.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (text1 !== undefined) {
          text1.setTint(filter);
          text1.y = Math.round(text1.y - 1);
        }

        if (text2 !== undefined) {
          text2.setTint(filter);
          text2.y = Math.round(text2.y - 1);
        }

        if (img1 !== undefined) {
          img1.setTint(filter);
          img1.y = Math.round(img1.y - 1);
        }

        if (img2 !== undefined) {
          img2.setTint(filter);
          img2.y = Math.round(img2.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      if (this.game.scene.keys[this.state.farm]) this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else if (this.game.scene.keys[this.state.farm])  this.game.scene.keys[this.state.farm].scrolling.enabled = true;

  });

}

// нажатие на табы
function clickButtonUp(button: any, action: any, icon: any = false, text: any = false): void {
  button.setInteractive();
  button.up = 0;

  button.on('pointerdown', (): void => {
    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();
    button.press = true;
    button.increase = false;
    let interval = this.time.addEvent({ delay: 5, callback: () => {
      if (button.up < 7 && !button.increase) {
        button.up++;
        button.setY(button.y += 1);
        if (icon) icon.setY(icon.y += 1);
        if (text) text.setY(text.y += 1);
      }
      if (button.up >= 7) interval.remove(false);
    }, callbackScope: this, loop: true });
    this.game.scene.keys[this.state.farm]?.playSoundOnce('click-sound');
  });

  button.on('pointerout', (): void => {
    if (button.press) {
      button.press = false;
      button.increase = true;
      const interval = this.time.addEvent({ delay: 10, callback: () => {
        if (button.up > 0 && button.increase) {
          button.up--;
          button.setY(button.y -= 1);
          if (icon) icon.setY(icon.y -= 1);
          if (text) text.setY(text.y -= 1);
        }
        if (button.up <= 0) interval.remove(false);
      }, callbackScope: this, loop: true });
    }
  });

  button.on('pointerup', (): void => {
    if (button.press) {
      button.press = false;
      button.increase = true;
      const interval = this.time.addEvent({ delay: 10, callback: () => {
        if (button.up > 0 && button.increase) {
          button.up--;
          button.setY(button.y -= 1);
          if (icon) icon.setY(icon.y -= 1);
          if (text) text.setY(text.y -= 1);
        }
        if (button.up <= 0) interval.remove(false);
      }, callbackScope: this, loop: true });
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();
    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }
  });
}

function clickButtonClanUp(button: any, action: any, args: any[]): void {
  button.setInteractive();
  button.up = 0;

  button.on('pointerdown', (): void => {
    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();
    button.press = true;
    button.increase = false;
    let interval = this.time.addEvent({ delay: 5, callback: () => {
      if (button.up < 7 && !button.increase) {
        button.up++;
        button.setY(button.y += 1);
        args.forEach(el => {
          el.y += 1;
        });
      }
      if (button.up >= 7) interval.remove(false);
    }, callbackScope: this, loop: true });
    this.game.scene.keys[this.state.farm]?.playSoundOnce('click-sound');
  });

  button.on('pointerout', (): void => {
    if (button.press) {
      button.press = false;
      button.increase = true;
      const interval = this.time.addEvent({ delay: 10, callback: () => {
        if (button.up > 0 && button.increase) {
          button.up--;
          button.setY(button.y -= 1);
          args.forEach(el => { el.y -= 1; });
        }
        if (button.up <= 0) interval.remove(false);
      }, callbackScope: this, loop: true });
    }
  });

  button.on('pointerup', (): void => {
    if (button.press) {
      button.press = false;
      button.increase = true;
      const interval = this.time.addEvent({ delay: 10, callback: () => {
        if (button.up > 0 && button.increase) {
          button.up--;
          button.setY(button.y -= 1);
          args.forEach(el => { el.y -= 1; });
        }
        if (button.up <= 0) interval.remove(false);
      }, callbackScope: this, loop: true });
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();
    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }
  });
}

function doubleClick(object: any, action: any, maxMoveCounter: number = 3): void {

  object.setInteractive();
  let moveCounter: number = 0;
  let clickCounter: number = 0;

  object.on('pointerdown', (): void => {
    object.xDown = object.x;
    object.yDown = object.y;
    object.press = true;
  });

  object.on('pointermove', (): void => {
    if (object.press) moveCounter++;
  });

  object.on('pointerout', (): void => {
    
    if (object.press) {
      moveCounter = 0;
      object.press = false;
    }

  });

  object.on('pointerup', (): void => {

    let x: number;
    let y: number;

    if (object.xDown >= object.x) x = object.xDown - object.x;
    else x = object.x - object.xDown;

    if (object.yDown >= object.y) y = object.yDown - object.y;
    else y = object.y - object.yDown;
    
    if (object.press && moveCounter < maxMoveCounter && x < 5 && y < 5) {
      object.press = false;
      clickCounter++;
      this.time.addEvent({ delay: 400, callback: (): void => {
        clickCounter = 0;
      }, callbackScope: this, loop: false });

      if (clickCounter >= 2) {
        action();
      }
      
    } else if (object.press) {
      object.press = false;
    }

    moveCounter = 0;

  });
  
}


// функция нажатия
function click(object: any, action: () => void, maxMoveCounter: number = 3): void {

  object.setInteractive();
  let moveCounter: number = 0;

  object.on('pointerdown', (): void => {
    object.xDown = object.x;
    object.yDown = object.y;
    object.press = true;
  });

  object.on('pointermove', (): void => {
    if (object.press) moveCounter++;
  });

  object.on('pointerout', (): void => {
    
    if (object.press) {
      moveCounter = 0;
      object.press = false;
    }

  });

  object.on('pointerup', (): void => {

    let x: number;
    let y: number;

    if (object.xDown >= object.x) x = object.xDown - object.x;
    else x = object.x - object.xDown;

    if (object.yDown >= object.y) y = object.yDown - object.y;
    else y = object.y - object.yDown;
    
    if (object.press && moveCounter < maxMoveCounter && x < 5 && y < 5) {
      object.press = false;
      action();
    } else if (object.press) {
      object.press = false;
    }

    moveCounter = 0;

  });
  
}

// функция нажатия на кнопку со скейлом
function clickButton(button: any, action: any): void {

  button.setInteractive();

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      if (button.scale > 0.8 && !button.increase) {
        let scale: number = button.scale - 0.1;
        button.scale = Number(scale.toFixed(2));
      }
      
      counter++;

      if (counter >= 2) interval.remove(false);

    }, callbackScope: this, loop: true });

    this.game.scene.keys[this.state.farm]?.playSoundOnce('click-sound');

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        if (button.scale < 1 && button.increase) {
          let scale: number = button.scale + 0.05;
          button.scale = Number(scale.toFixed(2));
        }

        if (button.scale >= 1) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let interval = this.time.addEvent({ delay: 10, callback: () => {
  
        if (button.scale < 1 && button.increase) {
          let scale: number = button.scale + 0.05;
          button.scale = Number(scale.toFixed(2));
        }
  
        if (button.scale >= 1) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });
  
}

export {
  clickButton,
  click,
  clickModalBtn,
  clickButtonUp,
  clickShopBtn,
  clickBoostBtn,
  clickTerritory,
  doubleClick,
  clickButtonClanUp,
}