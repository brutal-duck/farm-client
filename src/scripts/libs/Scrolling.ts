interface IscrollConfig {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	top?: number;
	bottom?: number;
	wheel?: boolean;
	drag?: number
	minSpeed?: number
	snap?: boolean;
	snapConfig?: IsnapConfig;
}

interface IsnapConfig {
	topMargin?: number;
	padding?: number;
	deadZone?: number;
};

class Scroll extends Phaser.Cameras.Scene2D.Camera {
	public scene: Phaser.Scene
	public top: number;
	public bottom: number;
	public wheel: boolean;
	public drag: number;
	public minSpeed: number;
	public snap: boolean;
	public snapGrid: IsnapConfig;
	public moving: boolean;
	public enabled: boolean;
	public startY: number;
	public speed: number;

	private _rectangle: Phaser.Geom.Rectangle;
	private _speed: number;
	private _startY: number;
	private _endY: number;
	private _startTime: number;
	private _endTime: number;
	constructor(
		scene: Phaser.Scene,
		{
			x = 0,
			y = 0,
			width,
			height,
			top = 0,
			bottom = 5000,
			wheel = false,
			drag = 0.95,
			minSpeed = 4,
			snap = false,
			snapConfig = {}
		}: IscrollConfig
	) {
		super(x, y, width, height);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.width = width || Number(this.scene.game.config.width);
		this.height = height || Number(this.scene.game.config.height);
		this.top = top;
		this.bottom = bottom - this.height;
		this.wheel = wheel;
		this.drag = drag;
		this.minSpeed = minSpeed;
		this.snap = snap;
		this.snapGrid = snapConfig;
		this.moving = false;
		this.enabled = true;
		this.snapGrid.topMargin = (snapConfig.topMargin === undefined) ? 0 : snapConfig.topMargin;
		this.snapGrid.padding = snapConfig.padding || 20;
		this.snapGrid.deadZone = (snapConfig.deadZone === undefined) ? 0.4 : snapConfig.deadZone;
		this.init();
	}

	private init() {
		this.scrollY = this.top || this.y;
		this._rectangle = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
		this._speed = 0;
		this._startY = this.scrollY;
		this._endY = this.scrollY;
		this._startTime = 0;
		this._endTime = 0;
		this.setDragEvent();
		if (this.wheel) {
			this.setWheelEvent();
		}
		this.scene.time.addEvent({ delay: 500, callback: this.resetMoving, callbackScope: this, loop: true });
		this.scene.cameras.addExisting(this);
	}

	private resetMoving() {
		this.moving = false;
	}

	private setSpeed(speed?: number) {
		let t = this;
		if (typeof speed != 'number') {
			let distance = t._endY - t._startY;
			let duration = (t._endTime - t._startTime) / 1000;
			this._speed = distance / duration;
		} else {
			this._speed = speed;
		}
	}

	private setDragEvent() {
		this.scene.input.on('pointermove', this.dragHandler, this);
		this.scene.input.on('pointerup', this.upHandler, this);
		this.scene.input.on('pointerdown', this.downHandler, this);
	}

	private setWheelEvent() {
		window.addEventListener('wheel', this.wheelHandler.bind(this));
	}

	public downHandler() {
		this._speed = 0;
		this._startY = this.scrollY;
		this._startTime = performance.now();
	}

	private dragHandler(pointer) {
		if (pointer.isDown && this.isOver(pointer) && this.enabled) {
			this.startY = this.scrollY;
			this.scrollY -= (pointer.position.y - pointer.prevPosition.y);
			this.moving = true;
		}
	}

	private upHandler() {
		this._endY = this.scrollY;
		this._endTime = performance.now();
		this.speed = 0;
		if (this.moving) {
			this.setSpeed();
		}
	}

	private wheelHandler(event) {
		if (this.isOver(this.scene.input.activePointer) && this.wheel) {
			this.scrollY += event.deltaY;
		}
	}

	private isOver(pointer: Phaser.Input.Pointer) {
		return this._rectangle.contains(pointer.x, pointer.y);
	}

	private clampScroll() {
		this.scrollY = Phaser.Math.Clamp(this.scrollY, this.top, this.bottom);
		this._endY = this.scrollY;
	}

	public update(time: number, delta: number) {
		this.scrollY += this._speed * (delta / 1000);
		this._speed *= this.drag;
		if (Math.abs(this._speed) < this.minSpeed) {
			this._speed = 0;
			if (this.snap && !this.scene.input.activePointer.isDown) {
				let snapTop = this.top + this.snapGrid.topMargin;
				let snapPosition = this.scrollY - snapTop;
				let gap = this.snapGrid.padding;
				let gapRatio = snapPosition / gap;
				let gapRatioRemain = gapRatio % 1;
				if (Math.abs(0.5 - gapRatioRemain) >= this.snapGrid.deadZone / 2) {
					this.scrollY = snapTop + Math.round(gapRatio) * gap;
				}
			}
		}
		this.clampScroll();

	}

	public destroy() {
		// this.emit(Events.DESTROY, this);
		// window.removeEventListener('wheel', this.wheelHandler);
		// this.removeAllListeners();
		// this.matrix.destroy();
		// this.culledObjects = [];
		// if (this._customViewport) {
		// 	this.sceneManager.customViewports--;
		// }
		// this._bounds = null;
		// this.scene = null;
		// this.scaleManager = null;
		// this.sceneManager = null;

	}
}

export default Scroll;

export { IscrollConfig, IsnapConfig };
