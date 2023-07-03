import { GameObject } from '@/assets/script/GameObiect';
import { ControllerBase } from '../controller/ControllerBase';
import { Pawn } from '../gamepieces/Pawn';
import { Bishop } from '../gamepieces/Bishop';
import { King } from '../gamepieces/King';
import { Knight } from '../gamepieces/Knight';
import { Queen } from '../gamepieces/Queen';
import { Rook } from '../gamepieces/Rook';
export class GameMap extends GameObject {
    constructor(canvas, parent, store) {
        super();

        this.ctx = canvas.value.getContext('2d');
        this.parent = parent;
        this.canvas = canvas;
        this.rows = 8; // 行
        this.cols = 8; // 列
        this.pieces_list = [];
        this.L = 0;
        this.TL = 0;
        this.store = store;
        this.direction = 0;
        this.mouse_event = new ControllerBase(this.canvas, this);
    }

    start() {
        const user_id = parseInt(this.store.state.user.id);
        const [a_id, a_direction, b_id, b_direction] =
            [parseInt(this.store.state.pk.a_id), parseInt(this.store.state.pk.a_direction),
            parseInt(this.store.state.pk.b_id), parseInt(this.store.state.pk.b_direction)];

        if (user_id === a_id) {
            this.direction = a_direction;
        } else if (user_id === b_id) {
            this.direction = b_direction;
        }

        this.create_pieces();
        // console.log(0 / 8);
    }

    create_pieces() {

        const pieces_list = this.store.state.pk.pieces_list;

        for (let obj of pieces_list) {

            const idx = parseInt(this.direction) === 1 ? parseInt(obj.idx) :
                this.reversal(parseInt(obj.idx));

            const piece_name = obj.pieceName;
            const direction = parseInt(obj.direction);

            const imgsrc = parseInt(obj.direction) === parseInt(this.direction) ?
                (parseInt(this.direction) === 1 ? 'w' : 'b') :
                (parseInt(this.direction) === 1 ? 'b' : 'w');

            if (piece_name === "pawn") {
                this.pieces_list[idx] = new Pawn({
                    direction: direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + `images\\pieces\\${imgsrc}p.png`,
                    survive: true,
                }, this.ctx, this.store);
            } else if (piece_name === "rook") {
                this.pieces_list[idx] = new Rook({
                    direction: direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + `images\\pieces\\${imgsrc}r.png`,
                    survive: true,
                }, this.ctx, this.store);
            } else if (piece_name === "knight") {
                this.pieces_list[idx] = new Knight({
                    direction: direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + `images\\pieces\\${imgsrc}n.png`,
                    survive: true,
                }, this.ctx, this.store);
            } else if (piece_name === "bishop") {
                this.pieces_list[idx] = new Bishop({
                    direction: direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + `images\\pieces\\${imgsrc}b.png`,
                    survive: true,
                }, this.ctx, this.store);
            } else if (piece_name === "queen") {
                this.pieces_list[idx] = new Queen({
                    direction: direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + `images\\pieces\\${imgsrc}q.png`,
                    survive: true,
                }, this.ctx, this.store);
            } else if (piece_name === "king") {
                this.pieces_list[idx] = new King({
                    direction: direction,
                    row: parseInt(idx / 8),
                    col: parseInt(idx % 8),
                    image: process.env.BASE_URL + `images\\pieces\\${imgsrc}k.png`,
                    survive: true,
                }, this.ctx, this.store);
            }
        }
    }

    reversal(idx) {
        const row = 7 - parseInt(idx / 8);
        const col = 7 - idx % 8;
        return parseInt(row * 8 + col);
    }

    sync_idx(pre_idx, now_idx) {
        const pre_ = this.reversal(parseInt(pre_idx, 10));
        const now_ = this.reversal(parseInt(now_idx, 10));

        this.pieces_list[pre_].row = parseInt(now_ / 8);
        this.pieces_list[pre_].col = now_ % 8;

        if (this.pieces_list[now_] !== undefined &&
            this.pieces_list[now_] !== null) {
            this.pieces_list[now_].survive = false;
        }

        this.pieces_list[now_] = this.pieces_list[pre_];

        this.pieces_list[pre_] = undefined;
    }



    update_size() {
        if (this.parent === null || this.ctx === null) return;
        this.L = parseInt(
            Math.min(this.parent.clientHeight / this.rows,
                this.parent.clientWidth / this.cols));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;

        this.TL = this.L / 4;
        const L = this.L;

        for (let obj of this.pieces_list) {
            if (obj === null || obj === undefined) continue;
            obj.setL(L);
        }
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