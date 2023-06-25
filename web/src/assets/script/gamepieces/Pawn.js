import { PiecesObject } from "./PiecesObject";

export class Pawn extends PiecesObject {
    constructor(info, gamemap) {
        super(gamemap);

        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row; //列
        this.col = info.col; //行

        this.direction = info.direction; //方向

        this.survive = info.survive; //棋子存活状态
    }

    // 走棋规则
    move_piece(x,y) {
        //基本走棋
        const rowbool = (x - this.local_r === -1);
        const colbool = (y === this.local_c);
        if(rowbool && colbool){
            return true;
        }
        return false;
    }

    start() {
        this.piece_image.src = this.path;

    }

}