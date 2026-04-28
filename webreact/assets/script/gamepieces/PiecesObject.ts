import { GameObject } from "../GameObject";

export interface Store {
    state: {
        pk: {
            game_obj: {
                pieces_list: PiecesObject[];
                direction: number;
            };
            action: string;
            socket: {
                send(data: string): void;
            };
        };
    };
}

export class PiecesObject extends GameObject {
    piece_image: HTMLImageElement | undefined;
    ctx: CanvasRenderingContext2D | null;
    L: number;
    row: number;
    col: number;
    local_r: number;
    local_c: number;
    direction: number;
    survive: boolean;
    status: "idle" | "move";
    speed: number;
    eps: number;
    store: Store;
    pieces_list: PiecesObject[];

    constructor(ctx: CanvasRenderingContext2D | null, store: Store) {
        super();

        this.piece_image = undefined;

        this.ctx = ctx;
        this.L = 0;

        this.row = 0;
        this.col = 0;

        this.local_r = this.row;
        this.local_c = this.col;

        this.direction = 0;

        this.survive = false;
        this.status = "idle";
        this.speed = 5;

        this.eps = 1 + 1e-3;
        this.store = store;
        this.pieces_list = this.store.state.pk.game_obj.pieces_list;
    }

    setL(L: number): void {
        this.L = L;
    }

    move_piece(r: number, c: number): boolean {
        return false;
    }

    kill_piece(x: number, y: number): boolean {
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

    check1(x: number, y: number): boolean {
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

    game_over(): void {

    }

    check_direction(): boolean {
        return this.direction === this.store.state.pk.game_obj.direction;
    }

    check_action(): boolean {
        console.log(this.store.state.pk.action);
        return this.store.state.pk.action === "action";
    }

    start(): void {

    }

    update(): void {
        this.render();
    }

    update_idx(r: number, c: number): boolean {
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

    send(pre_idx: number, now_idx: number): void {
        const nextstep = pre_idx + " " + now_idx;
        this.store.state.pk.socket.send(JSON.stringify({
            event: "send-move",
            nextstep: nextstep,
        }));
    }

    update_move(r: number, c: number): void {
        if (this.status === "idle") {
            this.local_r = this.row;
            this.local_c = this.col;
        }
        this.status = "move";
        this.col = c;
        this.row = r;
    }

    render(): void {
        const ctx = this.ctx;
        const L = this.L;
        if (this.status === "idle" && this.survive && this.piece_image) {
            ctx?.drawImage(this.piece_image, this.col * L, this.row * L, L, L);
        } else if (this.status === "move" && this.piece_image) {
            ctx?.drawImage(this.piece_image, this.col, this.row, L, L);
        }
    }
}
