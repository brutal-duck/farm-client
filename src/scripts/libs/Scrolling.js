class Scroll extends Phaser.Cameras.Scene2D.Camera {

	constructor(
		scene,
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
		}
	) {
		super(x, y, width, height);
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.width = width || this.scene.game.config.width;
		this.height = height || this.scene.game.config.height;
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

	init() {
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

	resetMoving() {
		this.moving = false;
	}

	setSpeed(speed) {
		let t = this;
		if (typeof speed != 'number') {
			let distance = t._endY - t._startY;
			let duration = (t._endTime - t._startTime) / 1000;
			this._speed = distance / duration;
		} else {
			this._speed = speed;
		}
	}

	setDragEvent() {
		this.scene.input.on('pointermove', this.dragHandler, this);
		this.scene.input.on('pointerup', this.upHandler, this);
		this.scene.input.on('pointerdown', this.downHandler, this);
	}

	setWheelEvent() {
		window.addEventListener('wheel', this.wheelHandler.bind(this));
	}

	downHandler() {
		this._speed = 0;
		this._startY = this.scrollY;
		this._startTime = performance.now();
	}

	dragHandler(pointer) {
		if (pointer.isDown && this.isOver(pointer) && this.enabled) {
			this.startY = this.scrollY;
			this.scrollY -= (pointer.position.y - pointer.prevPosition.y);
			this.moving = true;
		}
	}

	upHandler() {
		this._endY = this.scrollY;
		this._endTime = performance.now();
		this.speed = 0;
		if (this.moving) {
			this.setSpeed();
		}
	}

	wheelHandler(event) {
		if (this.isOver(this.scene.input.activePointer) && this.wheel) {
			this.scrollY += event.deltaY;
		}
	}

	isOver(pointer) {
		return this._rectangle.contains(pointer.x, pointer.y);
	}

	clampScroll() {
		this.scrollY = Phaser.Math.Clamp(this.scrollY, this.top, this.bottom);
		this._endY = this.scrollY;
	}

	update(time, delta) {
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

	destroy() {
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
