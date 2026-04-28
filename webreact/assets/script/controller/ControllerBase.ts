export interface GameMap {
  L: number;
  pieces_list: (Piece | undefined)[];
}

export interface Piece {
  row: number;
  col: number;
  direction: number;
  status: string;
  update_move(mr: number, mc: number): void;
  update_idx(mr: number, mc: number): boolean;
}

export class ControllerBase {
  canvas: HTMLCanvasElement;
  gamemap: GameMap;
  idx: number;
  isMouseDown: boolean;
  isMouseMove: boolean;
  pieces_list: (Piece | undefined)[];
  piece_picked: [Piece | undefined, number | undefined];

  constructor(canvas: { value: HTMLCanvasElement }, gamemap: GameMap) {
    this.canvas = canvas.value;
    this.gamemap = gamemap;

    this.idx = -1;
    this.isMouseDown = false;
    this.isMouseMove = false;
    this.pieces_list = this.gamemap.pieces_list;
    this.start();
    this.piece_picked = [undefined, undefined];
  }

  handleMouseDown = (event: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const L: number = this.gamemap.L;
    const clientX: number = event.clientX;
    const clientY: number = event.clientY;
    const left: number = rect.left;
    const top: number = rect.top;
    const c: number = Math.floor((clientX - left) / L);
    const r: number = Math.floor((clientY - top) / L);
    this.idx = r * 8 + c;

    this.isMouseDown = true;
  };

  handleMouseMove = (event: MouseEvent): void => {
    if (!this.isMouseDown) return;
    this.isMouseMove = true;
    const piece: Piece | undefined = this.pieces_list[this.idx];
    if (piece === undefined) return;

    if (this.piece_picked[0] !== undefined) {
      this.piece_picked = [undefined, undefined];
    }

    const rect: DOMRect = this.canvas.getBoundingClientRect();
    const mc: number = event.clientX - rect.left;
    const mr: number = event.clientY - rect.top;

    piece.update_move(mr, mc);
  };

  handleMouseUp = (event: MouseEvent): void => {
    const piece: Piece | undefined = this.pieces_list[this.idx];
    if (this.piece_picked[0] === undefined && piece === undefined) return;

    const L: number = this.gamemap.L;
    const rect: DOMRect = this.canvas.getBoundingClientRect();
    const clientX: number = event.clientX;
    const clientY: number = event.clientY;
    const left: number = rect.left;
    const top: number = rect.top;
    const mc: number = Math.floor((clientX - left) / L);
    const mr: number = Math.floor((clientY - top) / L);

    const idx_: number = mr * 8 + mc;
    const pickedPiece: Piece | undefined = this.piece_picked[0];
    const pickedIdx: number | undefined = this.piece_picked[1];

    if (pickedPiece !== undefined) {
      if (idx_ === pickedIdx) {
        // Do nothing
      } else if (
        pickedIdx !== undefined &&
        this.check_direction(pickedIdx, idx_)
      ) {
        this.piece_picked = [this.pieces_list[idx_], idx_];
      } else {
        if (pickedPiece.update_idx(mr, mc)) {
          if (pickedIdx !== undefined) {
            this.pieces_list[idx_] = pickedPiece;
            this.pieces_list[pickedIdx] = undefined;
          }
        }
        this.piece_picked = [undefined, undefined];
      }
    } else if (idx_ !== this.idx && piece !== undefined) {
      if (piece.update_idx(mr, mc)) {
        this.pieces_list[idx_] = piece;
        this.pieces_list[this.idx] = undefined;
      }
      piece.status = "idle";
    } else if (piece !== undefined) {
      if (this.isMouseMove) {
        piece.update_idx(mr, mc);
        piece.status = "idle";
        this.isMouseMove = false;
      } else {
        this.piece_picked = [this.pieces_list[this.idx], this.idx];
      }
    }
    this.isMouseDown = false;
    this.idx = -1;
  };

  start(): void {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
  }

  check_direction(idx_m: number, idx_u: number): boolean {
    const piece_m: Piece | undefined = this.pieces_list[idx_m];
    const piece_u: Piece | undefined = this.pieces_list[idx_u];
    if (piece_u !== undefined && piece_m !== undefined) {
      return piece_m.direction === piece_u.direction;
    }
    return false;
  }
}
