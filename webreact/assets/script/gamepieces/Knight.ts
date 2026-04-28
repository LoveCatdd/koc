import { PiecesObject, Store } from "./PiecesObject";

export interface KnightInfo {
    image: string;
    row: number;
    col: number;
    direction: number;
    survive: boolean;
}

export class Knight extends PiecesObject {
    path: string;

    constructor(info: KnightInfo, ctx: CanvasRenderingContext2D | null, store: Store) {
        super(ctx, store);

        this.piece_image = new Image();
        this.path = info.image;

        this.row = info.row;
        this.col = info.col;

        this.direction = info.direction;

        this.survive = info.survive;
    }

    check1(x: number, y: number): boolean {
        let idx = x * 8 + y;
        if (this.pieces_list[idx] !== undefined) {
            return false;
        }
        return true;
    }

    move_piece(x: number, y: number): boolean {
        const rowdef = Math.abs(x - this.local_r);
        const coldef = Math.abs(y - this.local_c);
        if (rowdef === 1 && coldef === 2 && this.kill_piece(x, y)) {
            return true;
        } else if (rowdef === 2 && coldef === 1 && this.kill_piece(x, y)) {
            return true;
        }
        return false;
    }

    start(): void {
        if (this.piece_image) {
            this.piece_image.src = this.path;
        }
    }
}
