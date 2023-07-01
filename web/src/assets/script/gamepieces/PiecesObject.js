import { GameObject } from "../GameObiect";

export class PiecesObject extends GameObject {
    constructor(gamemap) {
        super();

        this.piece_image;

        this.gamemap = gamemap;

        this.row = 0; //列
        this.col = 0; //行

        this.local_r = this.row;
        this.local_c = this.col;

        this.direction = 0; //方向

        this.survive = false; //棋子存活状态
        this.status = "idle"; // idle 静止， move 移动

        this.speed = 5;

        this.eps = 1 + 1e-3;
    }
    // 走棋规则
    move_piece() {
        return true;
    }
    // 吃棋规则
    kill_piece(x,y) {
        if(x === this.local_r && y === this.local_c)return false;
        let idx = x * 8 + y;
        if(this.gamemap.pieces_list[idx] === undefined){
            return true;
        }else if(this.gamemap.pieces_list[idx].direction === this.direction){
            return false;
        }else{
            this.gamemap.pieces_list[idx].survive = false;
            return true;
        }
    }
    //路径有无棋子判断
    check1(x,y){
        if(x === this.local_r && y === this.local_c)return false;
        let rowdef = (x - this.local_r) / Math.abs(x - this.local_r);
        let coldef = (y - this.local_c) / Math.abs(y - this.local_c);
        if(isNaN(coldef)){
            coldef = 0;
        }else if(isNaN(rowdef)){
            rowdef = 0;
        }
        //console.log(rowdef+' '+coldef);
        let i = this.local_r + rowdef, j = this.local_c + coldef;
        let idx = i * 8 + j;
        while (i !== x || j !== y){
             
            //console.log(i+' '+j);
            //if(this.gamemap.pieces_list[idx]===undefined)
            //    console.log("NULL");
            if(this.gamemap.pieces_list[idx] !== undefined){
                return false;
            }
            i += rowdef;
            j += coldef;
            idx = i * 8 + j;
        }
        // if(this.gamemap.pieces_list[idx] !== undefined && ){
        //     return this.kill_piece(this.gamemap.pieces_list[idx])
        // }
        return true;
    }
    // check1(x,y){
    //     let rowdef = (x - this.local_r) / Math.abs(x - this.local_r);
    //     let coldef = (y - this.local_c) / Math.abs(y - this.local_c);
    //     if(isNaN(coldef)){
    //         coldef = 0;
    //     }else if(isNaN(rowdef)){
    //         rowdef = 0;
    //     }
    //     //console.log(rowdef+' '+coldef);
    //     let i = this.local_r + rowdef, j = this.local_c + coldef;
        
    //     while (i !== x || j !== y){
    //         let idx = i * 8 + j;
    //         //console.log(i+' '+j);
    //         //if(this.gamemap.pieces_list[idx]===undefined)
    //         //    console.log("NULL");
    //         if(this.gamemap.pieces_list[idx] !== undefined){
    //             return false;
    //         }
    //         i += rowdef;
    //         j += coldef;
    //     }
        
    //     return true;
    // }
    start() {

    }
    update() {
        this.render();
    }

    update_idx(r, c) {
        if (this.move_piece(r,c)) {
            this.col = c;
            this.row = r;
            this.local_r = this.row;
            this.local_c = this.col;
            return true;
        } else {
            this.row = this.local_r;
            this.col = this.local_c;
            return false;
        }
    }

    update_move(r,c) {
        if (this.status === "idle") {
            this.local_r = this.row;
            this.local_c = this.col;
        }
        this.status = "move";
        this.col = c;
        this.row = r;
    }

    render() {
        if (this.status === "idle" && this.survive) {
            const ctx = this.gamemap.ctx;
            const L = this.gamemap.L;
            //console.log(this.col+' '+this.row);
            ctx.drawImage(this.piece_image, this.col * L, this.row * L, L, L);
        } else if (this.status === "move") {
            const ctx = this.gamemap.ctx;
            const L = this.gamemap.L;
            ctx.drawImage(this.piece_image, this.col, this.row, L, L);
        }

    }

}