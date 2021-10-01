import Firework from '../../../components/animations/Firework';
import BigInteger from './../../../libs/BigInteger';
function deleteTerritoriesLocks(): void {

  let lvl: number = this.state.userUnicorn.points;
  let prices: IunicornTerritoriesPrice[] = this.state.unicornSettings.territoriesUnicornPrice;

  for (let i in this.territories.children.entries) {
    
    let territory = this.territories.children.entries[i];

    if (territory.data.values.type === 0) {

      let unlock: number = prices.find((data: IunicornTerritoriesPrice) => data.block === territory.data.values.block && data.position === territory.data.values.position).unlock;

      if (lvl >= unlock && territory.data.values.lock_image) {
        
        territory.data.values.btn.setVisible(true);
        territory.data.values.btnText.setVisible(true);
        territory.data.values.lock_image.destroy();

      }

    }

  }

}

function buyTerritory(): void {

  let settings: IunicornTerritoriesPrice;
  settings = this.state.unicornSettings.territoriesUnicornPrice.find((data: IunicornTerritoriesPrice) => data.block === this.state.territory.data.values.block && data.position === this.state.territory.data.values.position);
  if (!settings) return;
  if (this.state.territory.data.values.type === 0) {

    if (this.state.userUnicorn.points >= settings.unlock) {
  
  
        let price: number = settings.price;
        
        if (BigInteger.greaterThanOrEqual(this.state.userUnicorn.money, String(price))) {
          
          this.state.amplitude.logAmplitudeEvent('buy_territory', {
            block: this.state.territory.data.values.block,
            position: this.state.territory.data.values.position,
          });
      
          this.state.territory.data.values.type = 2;
          
          this.state.userUnicorn.money = BigInteger.subtract(this.state.userUnicorn.money, String(price));
      
          const territory: Phaser.Physics.Arcade.Sprite = this.state.territory;
      
          this.time.addEvent({ delay: 500, callback: (): void => {

            territory.data.values.btn.destroy();
            territory.data.values.btnText.destroy();
            territory.data.values.forest.destroy();
            territory.setTexture('event-grass');
            Firework.create(this, { x: territory.x + 120, y: territory.y + 120 }, 3);
            this.buildBorders();
      
          }, callbackScope: this, loop: false });
      
          } else {
            
            let count: string = BigInteger.subtract(String(price), this.state.userUnicorn.money)
            let diamonds: number = this.convertMoney(count);
            this.state.convertor = {
              fun: 6,
              count: count,
              diamonds: diamonds,
              type: 1
            }
      
            let modal: Imodal = {
              type: 1,
              sysType: 4
            }
            this.state.modal = modal;
            this.scene.launch('Modal', this.state);
      
          }
        
        
  
    } else {
      let price: number = settings.diamond;
      if (this.state.user.diamonds >= price) {
  
        this.state.amplitude.logAmplitudeEvent('buy_territory', {
          block: this.state.territory.data.values.block,
          position: this.state.territory.data.values.position,
        });
        this.state.amplitude.logAmplitudeEvent('diamonds_spent', {
          type: 'buy_territory',
          count: price,
        });
        
        this.state.territory.data.values.type = 2;
        this.state.user.diamonds -= price;
      
        const territory: Phaser.Physics.Arcade.Sprite = this.state.territory;
      
        this.time.addEvent({ delay: 500, callback: (): void => {

          territory.data.values.btn.destroy();
          territory.data.values.btnText.destroy();
          territory.data.values.forest.destroy();
          territory.data.values.lock_image.destroy();
          territory.setTexture('event-grass');
          Firework.create(this, { x: territory.x + 120, y: territory.y + 120 }, 3);
          this.buildBorders();
      
        }, callbackScope: this, loop: false });
      
      } else {
        this.state.convertor = {
          fun: 0,
          count: price - this.state.user.diamonds,
          diamonds: price - this.state.user.diamonds,
          type: 1
        }
    
        this.game.scene.keys[this.state.farm].exchange();
    
      }  

    }

  }

}

function buildBorders(): void {
  
  for (let i in this.territories.children.entries) {
    
    let territory = this.territories.children.entries[i];


    if (territory.data.values.type === 2) {

      if (territory.data.values.position === 1) {
        territory.data.values.borderLeft.setVisible(true);
      }

      if (territory.data.values.position === 3) {
        territory.data.values.borderRight.setVisible(true);
      }
      
      if (territory.data.values.block <= 6) {

        let topTer = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === territory.data.values.block - 1 && data.data.values.position === territory.data.values.position);
        
        let bottomTer = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === territory.data.values.block + 1 && data.data.values.position === territory.data.values.position);

        if (topTer && topTer.data.values.type === 0) {
          
          territory.data.values.borderTop.setVisible(true);
        } else {
          territory.data.values.borderTop.setVisible(false);
        }
        if (!topTer) {
          territory.data.values.borderTop.setVisible(true);
        }

        if (bottomTer && bottomTer.data.values.type === 2) {
          territory.data.values.borderBottom.setVisible(false);
        } else {
          territory.data.values.borderBottom.setVisible(true);
        }

        if (!bottomTer) {
          territory.data.values.borderBottom.setVisible(true);
        }

        if (territory.data.values.position === 1) {

          let centerTer = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === territory.data.values.block && data.data.values.position === 2);

          if (centerTer.data.values.type === 0) {
            territory.data.values.borderRight.setVisible(true);
          } else {
            territory.data.values.borderRight.setVisible(false);
          }

        }
        
        if (territory.data.values.position === 2) {

          let leftTer = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === territory.data.values.block && data.data.values.position === 1);

          let rightTer = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === territory.data.values.block && data.data.values.position === 3);

          if (leftTer.data.values.type === 0) {
            territory.data.values.borderLeft.setVisible(true);
          } else {
            territory.data.values.borderLeft.setVisible(false);
          }

          if (rightTer.data.values.type === 0) {
            territory.data.values.borderRight.setVisible(true);
          } else {
            territory.data.values.borderRight.setVisible(false);
          }

        }

        if (territory.data.values.position === 3) {

          let centerTer = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === territory.data.values.block && data.data.values.position === 2);

          if (centerTer.data.values.type === 0) {
            territory.data.values.borderLeft.setVisible(true);
          } else {
            territory.data.values.borderLeft.setVisible(false);
          }

        }

      } else {
        territory.data.values.borderBottom.setVisible(true);
      }

    }

  }
  
}

function buildFlowers(): void {
   // территории 1
  this.add.image(10, this.topIndent + 480, 'flower1')
    .setOrigin(0, 0)
    .setDepth(this.topIndent + 480 + 1)
    .setScale(0.7);

  this.add.image(240, this.topIndent + 620, 'flower2')
    .setOrigin(1, 0)
    .setDepth(this.topIndent + 480 + 1)
    .setScale(0.7);
 
  this.add.image(480, this.topIndent + 480, 'flower3')
    .setOrigin(1, 0)
    .setDepth(this.topIndent + 480 + 1)
    .setScale(0.7);

  this.add.image(720, this.topIndent + 480 + 1, 'flower4')
    .setOrigin(1, 0)
    .setDepth(this.topIndent + 480 + 1)
    .setScale(0.7); 

 // территории 2

  this.add.image(480, this.topIndent + 880, 'flower4')
    .setOrigin(0, 0)
    .setDepth(this.topIndent + 720)
    .setScale(0.7);  

   // территории 3 

  this.add.image(240, this.topIndent + 960, 'flower2')
    .setOrigin(0, 0)
    .setDepth(this.topIndent + 960)
    .setScale(0.7);
 
  this.add.image(480, this.topIndent + 1120, 'flower1')
    .setOrigin(1, 0)
    .setDepth(this.topIndent + 960)
    .setScale(0.7);

  this.add.image(720, this.topIndent + 960, 'flower3')
   .setOrigin(1, 0)
   .setDepth(this.topIndent + 960)
   .setScale(0.7); 

   
   // территории 4

  this.add.image(240, this.topIndent + 1200, 'flower3')
    .setOrigin(1, 0)
    .setDepth(this.topIndent + 1200)
    .setScale(0.7);

  this.add.image(240, this.topIndent + 1340, 'flower4')
    .setOrigin(0, 0)
    .setDepth(this.topIndent + 1200)
    .setScale(0.7);
 
}

function buildConfetti(): void {

  this.add.image(0, this.topIndent + 370, 'confetti1')
  .setOrigin(0, 0)
  .setDepth(this.topIndent + 480 + 1);

  this.add.image(720, this.topIndent + 370, 'confetti2')
  .setOrigin(1, 0)
  .setDepth(this.topIndent + 480 + 1);

  this.add.image(30, this.topIndent + 640, 'confetti3')
  .setOrigin(0, 0)
  .setDepth(this.topIndent + 480 + 1);

  this.add.image(720, this.topIndent + 600, 'confetti4')
  .setOrigin(1, 0)
  .setDepth(this.topIndent + 480 + 1);

  this.add.image(10, this.topIndent + 890, 'confetti5')
  .setOrigin(0, 0)
  .setDepth(this.topIndent + 720 + 1);

  this.add.image(710, this.topIndent + 900, 'confetti6')
  .setOrigin(1, 0)
  .setDepth(this.topIndent + 720 + 1);

  this.add.image(10, this.topIndent + 1100, 'confetti7')
  .setOrigin(0, 0)
  .setDepth(this.topIndent + 960 + 1);

  this.add.image(720, this.topIndent + 1210, 'confetti8')
  .setOrigin(1, 0)
  .setDepth(this.topIndent + 1200 + 1);
}

export { 
  deleteTerritoriesLocks, 
  buyTerritory,
  buildBorders, 
  buildFlowers,
  buildConfetti
}