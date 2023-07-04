import { PiecesObject } from "./PiecesObject";

export class Pawn extends PiecesObject {
    constructor(info, ctx, store, isReplay) {
        super(ctx, store, isReplay);

        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row; //列
        this.col = info.col; //行

        this.direction = info.direction; //方向

        this.survive = info.survive; //棋子存活状态

    }
    // 吃棋规则
    kill_piece(x, y) {

        if (x === this.local_r && y === this.local_c) return false;
        let idx = x * 8 + y;
        if (this.pieces_list[idx] === undefined) {
            return false;
        } else if (this.pieces_list[idx].direction === this.direction) {
            return false;
        } else {
            this.pieces_list[idx].survive = false;

            return true;
        }
    }
    //路径有无棋子判断
    check1(x, y) {

        if (x === this.local_r && y === this.local_c) return false;
        let rowdef = (x - this.local_r) / Math.abs(x - this.local_r);
        let coldef = (y - this.local_c) / Math.abs(y - this.local_c);
        if (isNaN(coldef)) {
            coldef = 0;
        } else if (isNaN(rowdef)) {
            rowdef = 0;
        }

        let i = this.local_r + rowdef, j = this.local_c + coldef;
        let idx = i * 8 + j;
        while (i !== x + rowdef || j !== y + coldef) {

            if (this.pieces_list[idx] !== undefined) {
                return false;
            }
            i += rowdef;
            j += coldef;
            idx = i * 8 + j;
        }

        return true;
    }
    // 走棋规则
    move_piece(x, y) {
        //基本走棋
        const rowdef = (x - this.local_r);
        const coldef = Math.abs(y - this.local_c);
        const rowbool = (rowdef === -1);
        const colbool = (y === this.local_c);
        if (rowbool && colbool && this.check1(x, y)) {
            return true;
        } else if (this.local_r === 6 && rowdef === -2 && this.check1(x, y)) {
            return true;
        } else if (rowbool && coldef === 1 && this.kill_piece(x, y)) {
            return true;
        }
        return false;
    }

    start() {
        this.piece_image.src = this.path;

    }

}