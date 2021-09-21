//引入less文件
import '../css/index.less';

import Food from './food';
import ScoreCard from './scorecard';
import Snake from './snake';

class App{
    snake: Snake;
    food: Food;
    scoreCard: ScoreCard;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scoreCard = new ScoreCard(5, 1);

        this.init();
    }

    init() {
        this.run();
        document.addEventListener('keydown', this.handleControle.bind(this));
        document.querySelector('.pay').addEventListener('click', () => {
            window.location.reload();
        });
        document.querySelector('.switch').addEventListener('click', () => {
            this.scoreCard.addLevel();
        })
        //监听手机端点击
        this.phoneControle();
    }


    /**
     * 蛇开始移动
     */
    run() {
        //蛇移动范围检测
        try{
            this.snake.checkScope();
        } catch(e) {
            alert(e)
            return;
        }
        //蛇头是否吃到食物检测
        this.checkEating();
        //蛇身移动
        this.snake.bodyRun();
        


        //蛇头坐标
        const headTop = this.snake.Y;
        const headLeft = this.snake.X;

        switch(this.snake.direction) {
            case 'top':
            case 'bottom':
                this.snake.Y = this.snake.direction == 'top' ? headTop - 10 : headTop + 10;
                break;
            case 'left':
            case 'right':
                this.snake.X = this.snake.direction == 'left' ? headLeft - 10 : headLeft + 10;
                break;
            default:
                throw new Error('蛇头方向错误');
        }

        setTimeout(this.run.bind(this), 330 - (this.scoreCard.level * 30));
    }

    /**
     * 监听方向键变化
     */
    handleControle(event) {
        if(event.code == this.snake.direction) {
            return;
        }
        switch(event.code) {
            case 'ArrowUp':
                if(this.snake.direction === 'bottom') {  //限制反方向选取
                    return;
                }
                this.snake.direction = 'top';
                break;
            case 'ArrowDown':
                if(this.snake.direction === 'top') {  //限制反方向选取
                    return;
                }
                this.snake.direction = 'bottom';
                break;
            case 'ArrowLeft':
                if(this.snake.direction === 'right') {  //限制反方向选取
                    return;
                }
                this.snake.direction = 'left';
                break;
            case 'ArrowRight':
                if(this.snake.direction === 'left') {  //限制反方向选取
                    return;
                }
                this.snake.direction = 'right';
                break;
        }
    }

    /**
     * 检测蛇头是否吃到食物
     */
    checkEating() {
        if(this.snake.X === this.food.X && this.snake.Y === this.food.Y) {  //蛇头与食物重合
            this.snake.add();
            this.food.create();
            this.scoreCard.changeIntegral();
        }
    }

    phoneControle() {
        document.querySelector('.top').addEventListener('click', () => {
            if(this.snake.direction === 'bottom') {  //限制反方向选取
                return;
            }
            this.snake.direction = 'top';
        });
        document.querySelector('.bottom').addEventListener('click', () => {
            if(this.snake.direction === 'top') {  //限制反方向选取
                return;
            }
            this.snake.direction = 'bottom';
        });
        document.querySelector('.left').addEventListener('click', () => {
            if(this.snake.direction === 'right') {  //限制反方向选取
                return;
            }
            this.snake.direction = 'left';
        });
        document.querySelector('.right').addEventListener('click', () => {
            if(this.snake.direction === 'left') {  //限制反方向选取
                return;
            }
            this.snake.direction = 'right';
        });
    }
}

new App();
