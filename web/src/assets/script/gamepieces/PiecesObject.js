
import { GameObject } from "../GameObiect";
export class PiecesObject extends GameObject {
    constructor(ctx, store) {
        super();

        this.piece_image;

        this.ctx = ctx;
        this.L = 0;

        this.row = 0; //列
        this.col = 0; //行

        this.local_r = this.row;
        this.local_c = this.col;

        this.direction = 0; //方向

        this.survive = false; //棋子存活状态
        this.status = "idle"; // idle 静止， move 移动
        this.speed = 5;

        this.eps = 1 + 1e-3;
        this.store = store;
        this.pieces_list = this.store.state.pk.game_obj.pieces_list;
    }

    setL(L) {
        this.L = L;
    }
    // 走棋规则
    move_piece() {
    }
    // 吃棋规则
    kill_piece(x, y) {

        if (x === this.local_r && y === this.local_c) {

            return false;
        }
        let idx = x * 8 + y;

        if (this.pieces_list[idx] === undefined) {

            return true;
        } else if (this.pieces_list[idx].direction === this.direction) {

            return false;
        } else {
            this.pieces_list[idx].survive = false;
            this.pieces_list[idx].game_over();

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
        while (i !== x || j !== y) {
            if (this.pieces_list[idx] !== undefined) {
                return false;
            }
            i += rowdef;
            j += coldef;
            idx = i * 8 + j;
        }
        return true;
    }

    game_over() {

    }

    check_direction() {
        return this.direction === this.store.state.pk.game_obj.direction;
    }

    check_action() {
        console.log(this.store.state.pk.action);
        return this.store.state.pk.action === "action";
    }

    start() {

    }
    update() {
        this.render();
    }

    update_idx(r, c) {
        if (this.check_action() && this.check_direction() && this.move_piece(r, c)) {
            const pre_idx = this.local_r * 8 + this.local_c;
            this.col = c;
            this.row = r;
            this.local_r = this.row;
            this.local_c = this.col;
            const now_idx = r * 8 + c;
            this.send(pre_idx, now_idx);
            return true;
        } else {
            this.row = this.local_r;
            this.col = this.local_c;
            return false;
        }
    }

    send(pre_idx, now_idx) {
        const nextstep = pre_idx + " " + now_idx;
        this.store.state.pk.socket.send(JSON.stringify({
            event: "send-move",
            nextstep: nextstep,
        }));
    }

    update_move(r, c) {
        if (this.status === "idle") {
            this.local_r = this.row;
            this.local_c = this.col;
        }
        this.status = "move";
        this.col = c;
        this.row = r;
    }

    render() {
        const ctx = this.ctx;
        const L = this.L;
        if (this.status === "idle" && this.survive) {
            ctx.drawImage(this.piece_image, this.col * L, this.row * L, L, L);
        } else if (this.status === "move") {
            ctx.drawImage(this.piece_image, this.col, this.row, L, L);
        }
    }

}