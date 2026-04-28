import { PiecesObject, Store } from "./PiecesObject";

export interface RookInfo {
  image: string;
  row: number;
  col: number;
  direction: number;
  survive: boolean;
}

export class Rook extends PiecesObject {
  path: string;

  constructor(
    info: RookInfo,
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
    const rowbool = x === this.local_r;
    const colbool = y === this.local_c;

    if ((rowbool || colbool) && this.check1(x, y) && this.kill_piece(x, y)) {
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
