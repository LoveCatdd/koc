
export class ControllerBase {
    constructor(canvas) {
        this.canvas = canvas;

        this.start();
    }

    start() {
        // 鼠标点击事件
        // this.canvas.addEventListener('mousedown', handleMouseDown);
        // // 鼠标移动事件
        // this.canvas.addEventListener('mousemove', handleMouseMove);
        // // 鼠标释放事件
        // this.canvas.addEventListener('mouseup', handleMouseUp);
    }

    // handleMouseDown(event) {
    //     // 获取鼠标点击位置
    //     const rect = this.canvas.getBoundingClientRect();
    //     const mouseX = event.clientX - rect.left;
    //     const mouseY = event.clientY - rect.top;

    //     console.log(`${mouseX}, ${mouseY}`);
    // }
    // handleMouseMove(event) {

    // }
    // handleMouseUp(event) {

    // }
}