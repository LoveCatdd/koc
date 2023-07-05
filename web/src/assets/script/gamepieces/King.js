import { PiecesObject } from "./PiecesObject";

export class King extends PiecesObject {
    constructor(info, ctx, store) {
        super(ctx, store);

        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row; //列
        this.col = info.col; //行

        this.direction = info.direction; //方向

        this.survive = info.survive; //棋子存活状态

    }
    game_over() {
        this.store.state.pk.socket.send(JSON.stringify({
            event: "finished",
            status: "finished",
            loser: this.direction,
        }));
    }
    // 走棋规则
    move_piece(x, y) {
        //基本走棋
        const rowdef = Math.abs(x - this.local_r);
        const coldef = Math.abs(y - this.local_c);
        if (rowdef <= 1 && coldef <= 1 && this.check1(x, y) && this.kill_piece(x, y)) {
            return true;
        }
        return false;
    }
    start() {
        this.piece_image.src = this.path;

    }

}