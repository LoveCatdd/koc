import { PiecesObject } from "./PiecesObject";

export class Rook extends PiecesObject {
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
        const rowbool = (x === this.local_r);
        const colbool = (y === this.local_c);
        //console.log(this.col+' '+this.row);
        //console.log(this.local_c+' '+this.local_r);

        //基本走棋
        if((rowbool || colbool) && this.check1(x,y) && this.kill_piece(x,y)){
            return true;
        }
        return false;
    }

    start() {
        this.piece_image.src = this.path;

    }

}
