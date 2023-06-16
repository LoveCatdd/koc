import { GameObject } from "../GameObiect";

export class PiecesObject extends GameObject {
    constructor(gamemap) {
        super();

        this.piece_image;

        this.gamemap = gamemap;

        this.row = 0; //列
        this.col = 0; //行

        this.direction = 0; //方向

        this.survive = false; //棋子存活状态

    }
    // 走棋规则
    move_piece() {
        // const con1 = x - this.col + y - this.row === 3;
        // const con2 = x - this.col !== 0;
        // const con3 = y - this.row !== 0;

        // if (con1 && con2 && con3) 
        //     return true;
        // return false;
    }
    // 吃棋规则
    kill_piece() {

    }
    start() {

    }
    update() {
        this.render();
    }

    render() {
        const ctx = this.gamemap.ctx;
        const L = this.gamemap.L;
        ctx.drawImage(this.piece_image, this.col * L, this.row * L, L, L);

    }
}