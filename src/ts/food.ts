/**
 * 食物类
 */
export default class Food{
    private foodDom:HTMLElement;
    private contentDom:HTMLElement;
    private snakeList: NodeList;

    constructor() {
        this.foodDom = document.querySelector('#food');
        this.contentDom = document.querySelector('#content');
        this.snakeList = document.querySelectorAll('#snake-wrap > div');
        this.create();
    }

    get X(){
        return this.foodDom.offsetLeft;
    }
    set X(x: number){
        this.foodDom.style.left = x + 'px';
    }

    get Y() {
        return this.foodDom.offsetTop;
    }
    set Y(y: number) {
        this.foodDom.style.top = y + 'px';
    }

    //随机生成食物
    create() {
        const width = this.contentDom.clientWidth;
        const height = this.contentDom.clientHeight;

        //为了生成10的倍数
        const left = Math.floor(Math.random()*width/10)*10;
        const top = Math.floor(Math.random()*height/10)*10;

        //判断食物不能与蛇身重合
        for(let i = 0; i < this.snakeList.length; i++) {
            const snakeDom:HTMLElement = this.snakeList[i] as HTMLElement;
            if(snakeDom.offsetTop == top && snakeDom.offsetLeft == left) {
                //出现重合时，重新生成食物
                this.create();
                return;
            }
        }

        this.X = left;
        this.Y = top;
    }
}