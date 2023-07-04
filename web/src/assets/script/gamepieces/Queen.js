import { PiecesObject } from "./PiecesObject";

export class Queen extends PiecesObject {
    constructor(info, ctx, store, isReplay) {
        super(ctx, store, isReplay);

        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row; //列
        this.col = info.col; //行

        this.direction = info.direction; //方向

        this.survive = info.survive; //棋子存活状态
    }
    // 走棋规则
    move_piece(x, y) {
        //基本走棋
        const rowbool = (x === this.local_r);
        const colbool = (y === this.local_c);
        const rcolbool = (Math.abs(x - this.local_r) === Math.abs(y - this.local_c));
        //基本走棋
        if ((rowbool || colbool || rcolbool) && this.check1(x, y) && this.kill_piece(x, y)) {

            return true;
        }
        return false;
    }

    start() {
        this.piece_image.src = this.path;

    }

}