/**
 * 蛇
 */
export default class Snake{
    headDom: HTMLElement;
    snakeWrapDom: HTMLElement;
    contentDom: HTMLElement;
    bodyDoms: NodeList;
    direction: 'top'|'right'|'bottom'|'left' = 'right';

    constructor() {
        this.headDom = document.querySelector('#head');
        this.snakeWrapDom = document.querySelector('#snake-wrap');
        this.contentDom = document.querySelector('#content');
        this.bodyDoms = document.querySelectorAll('#snake-wrap>div');
    }

    /**
     * 吃到食物后增加一节
     */
    add() {
        const body: HTMLElement = document.createElement('div');
        this.snakeWrapDom.appendChild(body);
        //更新蛇身
        this.bodyDoms = document.querySelectorAll('#snake-wrap>div');
    }

    get X() {
        return this.headDom.offsetLeft;
    }
    set X(x: number) {
        this.headDom.style.left = x + 'px';
    }

    get Y() {
        return this.headDom.offsetTop;
    }
    set Y(y: number) {
        this.headDom.style.top = y + 'px';
    }

    /**
     * 检测蛇是否超出移动范围,超出后抛出错误
     */
    checkScope() {
        const width = this.contentDom.clientWidth;
        const height = this.contentDom.clientHeight;
        if(this.X < 0) {
            throw new Error('蛇头碰到左墙');
        }
        if(this.X > width) {
            throw new Error('蛇头碰到右墙');
        }
        if(this.Y < 0) {
            throw new Error('蛇头碰到上墙');
        }
        if(this.Y > height) {
            throw new Error('蛇头碰到下墙');
        }

        //检测蛇头是否碰到蛇身
        for(let i = 1; i < this.bodyDoms.length; i++) {
            const currentDom = this.bodyDoms[i] as HTMLElement;
            if(currentDom.offsetLeft === this.X && currentDom.offsetTop === this.Y) {
                //蛇头碰撞到蛇身，抛出错误
                throw new Error('蛇头碰到蛇身');
            }
        }
    }

    /**
     * 蛇身移动
     *    -从蛇尾到蛇头依次设置，后一个坐标变为前一个坐标，蛇头根据方向变化
     */
    bodyRun() {
        for(let i = this.bodyDoms.length-1; i > 0; i--) {
            (this.bodyDoms[i] as HTMLElement).style.top = (this.bodyDoms[i-1] as HTMLElement).offsetTop + 'px';
            (this.bodyDoms[i] as HTMLElement).style.left = (this.bodyDoms[i-1] as HTMLElement).offsetLeft + 'px';
        }
    }
}