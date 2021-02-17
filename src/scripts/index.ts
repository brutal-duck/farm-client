import './interfaces';
import '../css/style.css';
import * as Phaser from 'phaser';

import Boot from './scenes/Boot';
import Preload from './scenes/Preload';
import SheepPreload from './scenes/Sheep/SheepPreload';
import Sheep from './scenes/Sheep/Main';
import SheepBars from './scenes/Sheep/SheepBars';
import ChickenPreload from './scenes/Chicken/ChickenPreload';
import Chicken from './scenes/Chicken/Main';
import ChickenBars from './scenes/Chicken/ChickenBars';
import Modal from './scenes/Modal/Modal';
import Map from './scenes/Map';
import MapBars from './scenes/MapBars';
import Shop from './scenes/Modal/Shop/Main';
import ShopBars from './scenes/Modal/Shop/Bars';
import Chat from './scenes/Modal/Chat/Main';
import Block from './scenes/Block';
import Tutorial from './scenes/Tutorial';
import * as eruda from 'eruda';
import EventBars from './scenes/Event/EventBars';
import Event from './scenes/Event/Main';
import EventPreload from './scenes/Event/EventPreload';

// eruda
if (process.env.DEV_CLIENT === window.location.origin) {
  eruda.init();
}

function gcd(num1: number, num2: number): number {
  while (num1 && num2) num1 > num2 ? num1 %= num2 : num2 %= num1;
  num1 += num2;
  return num1;
}

// готовое DOM дерево
window.onload = (): void => {

  setTimeout((): void => {

    let width: number = 0;
    let height: number = 0;
    let root: any = document.querySelector('#root');
    let clientHeight: number = Math.round(document.body.clientHeight);
    let clientWidth: number = Math.round(document.body.clientWidth);
    let canvasWidth: number = 720;
    let canvasHeight: number = Math.round((720 * clientHeight) / clientWidth);
    
    if (canvasHeight > 1440) canvasHeight = 1440;
    else if (canvasHeight < 1200) canvasHeight = 1200;
 
    let x: number = canvasWidth / gcd(canvasHeight, canvasWidth);
    let y: number = canvasHeight / gcd(canvasHeight, canvasWidth);
  
    // размеры в зависимости от высоты и ширины
    if (clientHeight / y > clientWidth / x) {
      width = clientWidth;
      height = clientWidth / x * y;
    } else {
      width = clientHeight / y * x;
      height = clientHeight;
    }
  
    root.style.height = height + 'px';
    root.style.width = width + 'px';

    // конфиг игры
    let config = {
      type: Phaser.AUTO,
      width: canvasWidth,
      height: canvasHeight,
      parent: 'root',
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      },
      render: {
        transparent: true // прозрачность канваса
      },
      scene: [
        Boot,
        Preload,
        SheepPreload, Sheep, SheepBars,
        ChickenPreload, Chicken, ChickenBars,
        EventPreload, Event, EventBars,
        Modal, 
        Map, MapBars,
        Shop, ShopBars,
        Chat,
        Tutorial,
        Block
      ]
    }
    
    const game: Phaser.Game = new Phaser.Game(config);
    window.addEventListener('resize', (): void => {
      game.scale.resize(canvasWidth, canvasHeight);
    }, false);

  }, 100);

}
