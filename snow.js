var snow = function() {
    var isCalled = 0;

    return function(canvasId, speed, density, snowColor){
        if (isCalled) {
            return ;
        } else {
            isCalled = 1;
        }

        if (!snowColor) {
            snowColor = "#fff";
        }

        density = parseInt(density);
        if (density > 0 && density < 1000) {
            //PASS
        } else {
            density = 100;
        }

        var canvasHeight = document.documentElement.clientHeight - 5,
            canvasWidth = document.documentElement.clientWidth - 5,
            snowNums = Math.ceil(canvasWidth * canvasHeight / density / density),
            canvas = document.getElementById(canvasId),
            context = canvas.getContext("2d"),
            requestAnimFrame = (function(){
                return  window.requestAnimationFrame
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || window.oRequestAnimationFrame
                        || window.msRequestAnimationFrame
                        || function( callback ){
                                window.setTimeout(callback, 10);
                            };
            })(),
            i = 0;

        canvas.height = canvasHeight;
        canvas.width = canvasWidth;

        function createFlower(context,n,dx,dy,size,length){
            context.beginPath();
            context.moveTo(dx,dy+size);
            var dig = 2*Math.PI/n;
            for(var i=1;i<n+1;i++){
                var ctrlX = Math.sin((i-0.5)*dig)*length+dx;
                var ctrlY = Math.cos((i-0.5)*dig)*length+dy;

                var x = Math.sin(i*dig)*size+dx;
                var y = Math.cos(i*dig)*size+dy;

                context.quadraticCurveTo(ctrlX,ctrlY,x,y);
            }
            context.closePath();
        }


        snowPos = [];
        for (; i < snowNums; i++) {
            snowPos.push({
                x:Math.round(Math.random() * canvasWidth),
                y:Math.round(Math.random() * canvasHeight),
                z:Math.round(Math.random() * 3 + 1)
            });
        }

        var fall = function(){
            context.clearRect(0,0,canvasWidth,canvasHeight);
            context.fillStyle = snowColor;
            for(var i=0,len=snowPos.length;i<len;i++){
                context.save();
                context.translate(snowPos[i].x,snowPos[i].y);

                snowPos[i].x += Math.random()*0.03 - 0.01;
                snowPos[i].y += Math.random()*speed;
                if(snowPos[i].y>canvasHeight || snowPos[i].x < 0 || snowPos[i].x > canvasWidth){
                    snowPos[i].y=4;
                    snowPos[i].x = Math.round( Math.random() * canvasWidth );
                    snowPos[i].z = Math.round( Math.random() * 3 + 1 );
                }
                createFlower(context,6,0,0,snowPos[i].z,8);
                context.fill();
                context.restore();
            }
        }

        var cb = function(){
            fall();
            requestAnimFrame(cb);
        };

        cb();
    };
}();