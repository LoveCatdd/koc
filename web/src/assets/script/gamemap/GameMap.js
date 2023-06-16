import { GameObject } from '@/assets/script/GameObiect';
import { ControllerBase } from '../controller/ControllerBase';
import { Pawn } from '../gamepieces/Pawn';
import { Bishop } from '../gamepieces/Bishop';
import { King } from '../gamepieces/King';
import { Knight } from '../gamepieces/Knight';
import { Queen } from '../gamepieces/Queen';
import { Rook } from '../gamepieces/Rook';

export class GameMap extends GameObject {
    constructor(canvas, parent, direction) {
        super();

        this.ctx = canvas.value.getContext('2d');
        this.parent = parent;

        this.rows = 8; // 行
        this.cols = 8; // 列
        this.pieces_list = [];
        this.L = 0;
        this.TL = 0;
        this.direction = direction; // 黑 or 白

        this.mouse_event = new ControllerBase(canvas);
    }

    start() {
        this.create_pieces();
        // console.log(0 / 8);
    }

    create_pieces() {
        const r = this.rows;
        if (this.direction === 1) {

            let idx = (r - 2) * 8 + 0;
            for (let i = 0; i < 8; ++i) {
                this.pieces_list[idx] = new Pawn({
                    direction: this.direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + 'images\\pieces\\wp.png',
                    survive: true,
                }, this);
                idx++;
            }
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wr.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Queen({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wq.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new King({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wk.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wk.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wr.png',
                survive: true,
            }, this);
            idx++;

            // 对方
            idx = 0;
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\br.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Queen({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bq.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new King({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bk.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\br.png',
                survive: true,
            }, this);
            idx++;
            for (let i = 0; i < 8; ++i) {
                this.pieces_list[idx] = new Pawn({
                    direction: this.direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + 'images\\pieces\\bp.png',
                    survive: true,
                }, this);
                idx++;
            }
        } else if (this.direction === -1) {
            let idx = (r - 2) * 8 + 0;
            for (let i = 0; i < 8; ++i) {
                this.pieces_list[idx] = new Pawn({
                    direction: this.direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + 'images\\pieces\\bp.png',
                    survive: true,
                }, this);
                idx++;
            }
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\br.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Queen({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bq.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new King({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bk.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\bn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\br.png',
                survive: true,
            }, this);
            idx++;

            // 对方
            idx = 0;
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wr.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Queen({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wq.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new King({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wk.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Bishop({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wb.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Knight({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wn.png',
                survive: true,
            }, this);
            idx++;
            this.pieces_list[idx] = new Rook({
                direction: this.direction,
                row: parseInt(idx / 8),
                col: parseInt(idx % 8),
                image: process.env.BASE_URL + 'images\\pieces\\wr.png',
                survive: true,
            }, this);
            idx++;
            for (let i = 0; i < 8; ++i) {
                this.pieces_list[idx] = new Pawn({
                    direction: this.direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + 'images\\pieces\\wp.png',
                    survive: true,
                }, this);
                idx++;
            }
        }
    }

    update_size() {
        this.L = parseInt(
            Math.min(this.parent.clientHeight / this.rows,
                this.parent.clientWidth / this.cols));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;

        this.TL = this.L / 4;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() {

        // 渲染地图
        let color_even = '#EEEED2', color_odd = '#769656';
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
        // 8-1
        let subtext;
        for (let r = 0; r < this.rows; ++r) {
            subtext = 8 - r;
            if (r % 2 === 0) {
                this.ctx.fillStyle = color_odd;
            } else {
                this.ctx.fillStyle = color_even;
            }
            this.ctx.font = '15px Arial';
            this.ctx.fillText(subtext, 2, r * this.L + this.TL);
        }
        // a-h
        for (let c = 0, r = this.rows - 1; c < this.cols; ++c) {
            subtext = String.fromCharCode(97 + c);
            if ((r + c) % 2 === 0) {
                this.ctx.fillStyle = color_odd;
            } else {
                this.ctx.fillStyle = color_even;
            }
            this.ctx.font = '15px Arial';
            this.ctx.fillText(subtext, (c + 1) * this.L - this.TL * 0.6, (r + 1) * this.L - this.TL * 0.45);
        }
    }
}