import { PiecesObject } from "./PiecesObject";

export class Bishop extends PiecesObject {
    constructor(info, gamemap) {
        super(gamemap);

        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row; //列
        this.col = info.col; //行

        this.direction = info.direction; //方向

        this.survive = info.survive; //棋子存活状态
    }

    start() {
        this.piece_image.src = this.path;
    }

}