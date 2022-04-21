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
import CowPreload from './scenes/Cow/CowPreload';
import Cow from './scenes/Cow/Main';
import CowBars from './scenes/Cow/CowBars';
import Modal from './scenes/Modal/Modal';
import Shop from './scenes/Modal/Shop/Main';
import ShopBars from './scenes/Modal/Shop/Bars';
import Chat from './scenes/Modal/Chat/Main';
import Tutorial from './scenes/Tutorial';
import UnicornBars from './scenes/Event/Unicorns/UnicornBars';
import UnicornPreload from './scenes/Event/Unicorns/UnicornPreload';
import Unicorn from './scenes/Event/Unicorns/Main';
import Fortune from './scenes/Fortune';
import Block from './scenes/Block';
import Profile from './scenes/Profile';
import ClanScroll from './scenes/Modal/Clan/Main';
import ClanFarm from './scenes/ClanFarm';

const gcd = (num1: number, num2: number): number => {
  while (num1 && num2) num1 > num2 ? num1 %= num2 : num2 %= num1;
  num1 += num2;
  return num1;
}

window.onload = (): void => {

  setTimeout((): void => {
    let width: number = 0;
    let height: number = 0;
    let root: HTMLElement = document.querySelector('#root');
    let clientHeight: number = Math.round(document.body.clientHeight);
    let clientWidth: number = Math.round(document.body.clientWidth);
    let canvasWidth: number = 720;
    let canvasHeight: number = Math.round((720 * clientHeight) / clientWidth);
    
    if (canvasHeight > 1700) canvasHeight = 1700;
    else if (canvasHeight < 1200) canvasHeight = 1200;
 
    let x: number = canvasWidth / gcd(canvasHeight, canvasWidth);
    let y: number = canvasHeight / gcd(canvasHeight, canvasWidth);
  
    if (clientHeight / y > clientWidth / x) {
      width = clientWidth;
      height = clientWidth / x * y;
    } else {
      width = clientHeight / y * x;
      height = clientHeight;
    }
  
    root.style.height = height + 'px';
    root.style.width = width + 'px';

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: canvasWidth,
      height: canvasHeight,
      parent: 'root',
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      },
      render: {
        transparent: true
      },
      scene: [
        Boot,
        Preload,
        SheepPreload, Sheep, SheepBars,
        ChickenPreload, Chicken, ChickenBars,
        CowPreload, Cow, CowBars,
        UnicornPreload, Unicorn, UnicornBars,
        Profile, ClanFarm,
        Fortune,
        Modal, 
        Block,
        Shop, ShopBars,
        ClanScroll,
        Chat,
        Tutorial,
      ],
      loader: { maxParallelDownloads: 128 },
    }
    
    const game: Phaser.Game = new Phaser.Game(config);
    window.addEventListener('resize', (): void => {
      if (process.env.platform === 'gd') {
        let clientHeight: number = Math.round(document.body.clientHeight);
        let clientWidth: number = Math.round(document.body.clientWidth);
  
        if (clientHeight / y > clientWidth / x) {
          width = clientWidth;
          height = clientWidth / x * y;
        } else {
          width = clientHeight / y * x;
          height = clientHeight;
        }
      
        root.style.height = height + 'px';
        root.style.width = width + 'px';
      }
      game.scale.resize(canvasWidth, canvasHeight);
    }, false);

    const prevent = ev => ev.preventDefault();
    const disableScrolling = () => document.addEventListener('wheel', prevent, {passive: false});
    const enableScrolling = () => document.removeEventListener('wheel', prevent);
    root.addEventListener('mouseover', disableScrolling);
    root.addEventListener('mouseleave', enableScrolling);
    
  }, 100);
}
