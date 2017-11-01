/**
 * Created by KevinWang on 2016/9/29.
 */

;(function(){

    function Stars(container, smallStar, midStar, bigStar, smallNum, midNum, bigNum){
        this.smallStar = smallStar;
        this.midStar = midStar;
        this.bigStar = bigStar;
        this.smallNum = smallNum;
        this.midNum = midNum;
        this.bigNum = bigNum;
        this.container = container ||  document.body;
    }

    Stars.prototype = {
        _getPos: function(){
            return Math.random().toFixed(3) * 100 + '%';
        },
        _drawStar: function(star){
            var star = star.cloneNode(true);
            this.container.appendChild(star);
            star.style.top = this._getPos();
            star.style.left = this._getPos();
        },
        drawStars: function(){
            for (var i = 0; i < this.smallNum; i++) {
                this._drawStar(this.smallStar);
            }
            for (var i = 0; i < this.midNum; i++) {
                this._drawStar(this.midStar);
            }
            for (var i = 0; i < this.bigNum; i++) {
                this._drawStar(this.bigStar);
            }
        }
    }
    window.Stars = Stars;
}())