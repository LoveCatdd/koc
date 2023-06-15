import { GameObject } from "../GameObiect";

export class PiecesObject extends GameObject {
    constructor(gamemap) {
        super();

        this.piece_image = "";
        this.gamemap = gamemap;
        this.row = 0; //列 
        this.col = 0; //行 
        this.survive = true; //棋子存活状态
    }
    // 走棋规则
    move_piece() {

    }
    // 吃棋规则
    kill_piece() {

    }
    start() {

    }

    update() {

    }
    render() {
        const ctx = this.gamemap.ctx;
        const L = this.gamemap.L;
        ctx.drawImage(this.piece_image, c * L, r * L, L, L);
    }
}