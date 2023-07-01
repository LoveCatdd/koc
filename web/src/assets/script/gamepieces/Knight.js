import { PiecesObject } from "./PiecesObject";

export class Knight extends PiecesObject {
    constructor(info, info_obj) {
        super(info_obj);


        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row; //列
        this.col = info.col; //行

        this.direction = info.direction; //方向

        this.survive = info.survive; //棋子存活状态
    }
    //路径有无棋子判断
    check1(x, y) {
        let idx = x * 8 + y;
        if (this.gamemap.pieces_list[idx] !== undefined) {
            return false;
        }
        return true;
    }
    // 走棋规则
    move_piece(x, y) {
        //基本走棋
        const rowdef = Math.abs(x - this.local_r);
        const coldef = Math.abs(y - this.local_c);
        if (rowdef === 1 && coldef === 2 && this.kill_piece(x, y)) {
            return true;
        } else if (rowdef === 2 && coldef === 1 && this.kill_piece(x, y)) {
            return true;
        }
        return false;
    }
    start() {
        this.piece_image.src = this.path;

    }

}