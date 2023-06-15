import { GameObject } from '@/assets/script/GameObiect';

export class GameMap extends GameObject {
    constructor(canvas, parent) {
        super();

        this.ctx = canvas.value.getContext('2d');
        this.parent = parent;

        this.rows = 8; // 列
        this.cols = 8; // 行

        this.L = 0;

        this.images_map = new Map();

    }

    start() {

    }

    update_size() {
        this.L = parseInt(
            Math.min(this.parent.clientHeight / this.rows,
                this.parent.clientWidth / this.cols));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() {
        // 渲染地图
        let color_even = "#AF8146", color_odd = "#663524";
        for (let r = 0; r < this.rows; ++r) {
            for (let c = 0; c < this.cols; ++c) {
                if ((r + c) % 2 === 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }

    }
}