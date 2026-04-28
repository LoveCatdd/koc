import { PiecesObject, Store } from "./PiecesObject";

export interface BishopInfo {
  image: string;
  row: number;
  col: number;
  direction: number;
  survive: boolean;
}

export class Bishop extends PiecesObject {
  path: string;

  constructor(
    info: BishopInfo,
    ctx: CanvasRenderingContext2D | null,
    store: Store,
  ) {
    super(ctx, store);

    this.piece_image = new Image();
    this.path = info.image;

    this.row = info.row;
    this.col = info.col;

    this.direction = info.direction;

    this.survive = info.survive;
  }

  move_piece(x: number, y: number): boolean {
    const rcolbool = Math.abs(x - this.local_r) === Math.abs(y - this.local_c);
    if (rcolbool && this.check1(x, y) && this.kill_piece(x, y)) {
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
