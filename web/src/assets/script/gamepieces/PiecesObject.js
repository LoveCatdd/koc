import { GameObject } from "../GameObiect";

export class PiecesObject extends GameObject {
    constructor(gamemap) {
        super();

        this.piece_image;

        this.gamemap = gamemap;

        this.row = 0; //列
        this.col = 0; //行

        this.local_r = this.row;
        this.local_c = this.col;

        this.direction = 0; //方向

        this.survive = false; //棋子存活状态
        this.status = "idle"; // idle 静止， move 移动

        this.speed = 5;

        this.eps = 1 + 1e-3;
    }
    // 走棋规则
    move_piece() {
        return true;
    }
    // 吃棋规则
    kill_piece() {

    }
    start() {

    }
    update() {
        this.render();
    }

    update_idx(r, c) {
        if (this.move_piece(r,c)) {
            this.col = c;
            this.row = r;
            this.local_r = this.row;
            this.local_c = this.col;
            return true;
        } else {
            this.row = this.local_r;
            this.col = this.local_c;
            return false;
        }
    }

    update_move(r,c) {
        if (this.status === "idle") {
            this.local_r = this.row;
            this.local_c = this.col;
        }
        this.status = "move";
        this.col = c;
        this.row = r;
    }

    render() {
        if (this.status === "idle") {
            const ctx = this.gamemap.ctx;
            const L = this.gamemap.L;
            //console.log(this.col+' '+this.row);
            ctx.drawImage(this.piece_image, this.col * L, this.row * L, L, L);
        } else if (this.status === "move") {
            const ctx = this.gamemap.ctx;
            const L = this.gamemap.L;
            ctx.drawImage(this.piece_image, this.col, this.row, L, L);
        }

    }

}