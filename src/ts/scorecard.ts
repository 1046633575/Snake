/**
 * 计分板，记录当前等级、积分
 */
export default class ScoreCard{
    integral: number;  //积分
    level: number;  //等级
    ratio: number;  //积分等级比率，如10积分为1个等级
    grow: number;  //吃到食物增长的积分，默认为1

    constructor(ratio: number = 10, grow: number = 1) {
        this.integral = 0;
        this.level = 1;
        this.ratio = ratio;
        this.grow = grow;
    }

    /**
     * 用于吃到食物后，改变积分及等级
     */
    changeIntegral() {
        //改变积分
        this.integral = this.integral + this.grow;
        document.querySelector('#score').innerHTML = this.integral + '';
        
        //改变等级
        if(this.level >= 10) {
            return;
        }
        this.level = Math.floor(this.integral / this.ratio) + 1;
        document.querySelector('#level').innerHTML = this.level + '';
    }

    /**
     * 提高速率
     */
    addLevel() {
        this.integral = (this.level + 1) * this.ratio;
        document.querySelector('#score').innerHTML = this.integral + '';

        //改变等级
        if(this.level >= 10) {
            return;
        }
        this.level = Math.floor(this.integral / this.ratio) + 1;
        document.querySelector('#level').innerHTML = this.level + '';

        
    }
}