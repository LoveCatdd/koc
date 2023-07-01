
export class ControllerBase {
    constructor(canvas, gamemap) {
        this.canvas = canvas.value;
        this.gamemap = gamemap;

        this.idx = -1;
        this.isMouseDown = false;
        this.isMouseMove = false;
        this.pieces_list = this.gamemap.pieces_list;
        this.start();
        this.piece_picked = [];
    }
    handleMouseDown = (event) => {
        // 获取鼠标点击位置
        const rect = this.canvas.getBoundingClientRect();
        const L = this.gamemap.L;
        let c = parseInt((event.clientX - rect.left) / L);
        let r = parseInt((event.clientY - rect.top) / L);

        // console.log(`${r}, ${c}`);
        this.idx = r * 8 + c;

        /*if(this.gamemap.pieces_list[this.idx])
        {
            console.log('OK');
            console.log(this.gamemap.pieces_list[this.idx].row);
        }*/
            
 
        // const piece = this.pieces_list[this.idx];
        // if (piece !== undefined) console.log(piece);

        this.isMouseDown = true;

        // this.clickTimeout = setTimeout(() => {
        //     this.isMouseDown = false;
        // }, 200); // 这里设置延迟时间为 200 毫秒，你可以根据需要进行调整

    }

    handleMouseMove = (event) => {
        if (!this.isMouseDown) return;
        this.isMouseMove = true;
        const direction = this.gamemap.direction;
        const piece = this.pieces_list[this.idx];
        if ((piece === undefined) || piece.direction !== direction) return;

        if (this.piece_picked[0] !== undefined) {
            this.piece_picked = [undefined, undefined];
        }
        // 获取鼠标相对于 Canvas 的位置
        const rect = this.canvas.getBoundingClientRect();
        const mc = event.clientX - rect.left;
        const mr = event.clientY - rect.top;

        piece.update_move(mr, mc);
        // console.log(`${mc}, ${mr}`);
        //this.isMouseMove = false;
    }

    handleMouseUp = (event) => {

        const piece = this.pieces_list[this.idx];
        if (this.piece_picked[0] === undefined && piece === undefined) return;

        // 获取鼠标相对于 Canvas 的位置
        const L = this.gamemap.L;
        const rect = this.canvas.getBoundingClientRect();
        const mc = parseInt((event.clientX - rect.left) / L);
        const mr = parseInt((event.clientY - rect.top) / L);

        const idx_ = mr * 8 + mc;

        if (this.piece_picked[0] !== undefined) {

            if (idx_ === this.piece_picked[1])console.log("else if");
            else if (this.check_direction(this.piece_picked[1], idx_)) {

                this.piece_picked = [this.pieces_list[idx_], idx_];

            } else {
                this.pieces_list[idx_] = this.piece_picked[0];
                this.pieces_list[this.piece_picked[1]] = undefined;
                this.piece_picked[0].update_idx(mr, mc);
                this.piece_picked = [undefined, undefined];
            }
        } else if (idx_ !== this.idx) {
            //console.log('黑棋');
            //TODO：拖拽棋子还在原来的格子上是界面卡死
            if(piece.update_idx(mr, mc)){
                this.pieces_list[idx_] = this.pieces_list[this.idx];
                this.pieces_list[this.idx] = undefined;
            }
            piece.status = "idle";
        } else {
            if (this.isMouseMove) {
                piece.update_idx(mr, mc);
                piece.status = "idle";
                this.isMouseMove = false;
            } else {
                this.piece_picked = [this.pieces_list[this.idx], this.idx];
            }
        }
        //console.log(this.piece_picked[0]);
        this.isMouseDown = false;
        //this.isMouseMove = false;
        this.idx = -1;
    }

    start() {

        // 鼠标点击事件
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        // // 鼠标移动事件
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        // // 鼠标释放事件
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
    }

    check_direction(idx_m, idx_u) {  // true 相同棋种   false 不同棋种
        const piece_m = this.pieces_list[idx_m];
        const piece_u = this.pieces_list[idx_u];
        if (piece_u !== undefined) {
            return piece_m.direction === piece_u.direction;
        }
        return false;
    }
}