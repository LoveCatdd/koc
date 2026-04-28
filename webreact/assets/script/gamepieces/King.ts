import { PiecesObject, Store } from "./PiecesObject";

export interface KingInfo {
  image: string;
  row: number;
  col: number;
  direction: number;
  survive: boolean;
}

export class King extends PiecesObject {
  path: string;

  constructor(
    info: KingInfo,
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

  game_over(): void {
    this.store.state.pk.socket.send(
      JSON.stringify({
        event: "finished",
        status: "finished",
        loser: this.direction,
      }),
    );
  }

  move_piece(x: number, y: number): boolean {
    const rowdef = Math.abs(x - this.local_r);
    const coldef = Math.abs(y - this.local_c);
    if (
      rowdef <= 1 &&
      coldef <= 1 &&
      this.check1(x, y) &&
      this.kill_piece(x, y)
    ) {
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
