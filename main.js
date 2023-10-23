// Lấy tham chiếu đến phần tử bạn muốn hiển thị toàn màn hình
var winHeight = window.innerHeight;
var wrapper = document.querySelector("#wrapper");
var rightLimit = wrapper.offsetLeft + wrapper.clientWidth;
var leftLimit = wrapper.offsetLeft;
var ball = document.querySelector("#ball");
var rec = document.querySelector(".rec");
var scoreBoard = document.querySelector("#score");
scoreBoard.textContent = " SCORE: 0";
var scr = 0;
document.querySelector("#bgm").play();
setTimeout(()=>{
    document.querySelector(".ready").style.display = "none";
    let a = 0.1;
    let gameOver = false;
    //làm cho bóng luôn nằm trên thanh rec
    rec.style.bottom = "10vh";
    var ballHeight = parseFloat(rec.offsetHeight) / winHeight * 100 + parseFloat(rec.style.bottom);
    //console.log(ballHeight);
    ball.style.bottom = `${ballHeight}vh`;

    //sử dụng sự kiện lăn bóng

    ball.style.left = `${(rightLimit-leftLimit)/2}px`;
    function goRight(element){
        var ballPos = parseFloat(element.style.left) + speed;
        element.style.left = `${ballPos}px`;
        element.style.animationPlayState = "running";
        element.style.animation = "rotateRight 1s linear infinite";
        if(parseFloat(parseFloat(element.style.left) / wrapper.clientWidth *100) < 90){
            requestAnimationFrame(() => goRight(element));
        }
    }
    var speed = 10;

    // console.log(speed)
    //bắt sự kiện lăn bóng
    document.querySelector(".right").onclick = ()=>{
        var ballRight = ball.offsetLeft + ball.clientWidth + leftLimit;
        if(ballRight < rightLimit){
            goRight = (element)=>{
                var ballPos = parseFloat(element.style.left) + speed;
                element.style.left = `${ballPos}px`;
                element.style.animationPlayState = "running";
                element.style.animation = "rotateRight 1s linear infinite";
                if(parseFloat(parseFloat(element.style.left) / wrapper.clientWidth *100) < 90){
                    requestAnimationFrame(() => goRight(element));
                }
            }
            goRight(ball);
        }
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") {
            // console.log("right");
            // Xử lý sự kiện khi phím mũi tên bên phải được nhấn
            var ballRight = ball.offsetLeft + ball.clientWidth + leftLimit;
            if(ballRight < rightLimit){
                goRight = (element)=>{
                    var ballPos = parseFloat(element.style.left) + speed;
                    element.style.left = `${ballPos}px`;
                    element.style.animationPlayState = "running";
                    element.style.animation = "rotateRight 1s linear infinite";
                    if(parseFloat(parseFloat(element.style.left) / wrapper.clientWidth *100) < 90){
                        requestAnimationFrame(() => goRight(element));
                    }
                }
                goRight(ball);
            }
        }
    });
    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowRight") {
            // Xử lý sự kiện khi phím mũi tên bên phải được tha
            ball.style.animationPlayState = "paused";
            goRight = ()=>{};
            }
    });


    function goLeft(element){
        var ballPos = parseFloat(element.style.left) - speed;
        element.style.left = `${ballPos}px`;
        element.style.animationPlayState = "running";
        element.style.animation = "rotateLeft 1s linear infinite";
        if(parseFloat(element.style.left) > 5){
            requestAnimationFrame(() => goLeft(element));
        }
    }


    document.querySelector(".left").onclick = ()=>{
        var ballLeft = ball.offsetLeft + leftLimit;
        if(ballLeft > leftLimit){
            goLeft = (element)=>{
                var ballPos = parseFloat(element.style.left) - speed;
                element.style.left = `${ballPos}px`;
                element.style.animationPlayState = "running";
                element.style.animation = "rotateLeft 1s linear infinite";
                if(parseFloat(element.style.left) > 5){
                    requestAnimationFrame(() => goLeft(element));
                }
            }
            goLeft(ball);
        }
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            // Xử lý sự kiện khi phím mũi tên bên phải được nhấn
            var ballLeft = ball.offsetLeft + leftLimit;
            if(ballLeft > leftLimit){
                goLeft = (element)=>{
                    var ballPos = parseFloat(element.style.left) - speed;
                    element.style.left = `${ballPos}px`;
                    element.style.animationPlayState = "running";
                    element.style.animation = "rotateLeft 1s linear infinite";
                    if(parseFloat(element.style.left) > 5){
                        requestAnimationFrame(() => goLeft(element));
                    }
                }
                goLeft(ball);
            }
        }
    });
    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowLeft") {
            // Xử lý sự kiện khi phím mũi tên bên phải được tha
            ball.style.animationPlayState = "paused";
            goLeft = ()=>{};
            }
    });


    //rơi xuống
    //ball.style.bottom = "";

    function goDown(){
        var top = parseFloat(ball.style.bottom) - a;
        ball.style.bottom = `${top}vh`;
        // console.log("top: "+ top);
        if(top < 0){
            return;
        }else{
            requestAnimationFrame(() => goDown());
        }
    }

    //hiệu ứng đi lên của thanh, và cập nhật lại độ cao quả bóng
    var currentI = 0;
    function goUp(element, rec){
        var top = parseFloat(element.style.bottom) + 0.5;
        element.style.bottom = `${top}vh`;
        var recs = document.querySelectorAll(".rec");
        // console.log((ball.style.bottom) +" "+ (`${ballHeight}vh`))
            //if(parseInt(ball.style.bottom) - parseInt(`${ballHeight}vh`) > -6){
                for(let i=0;i<recs.length;i++){
                    var ballBottom =  - parseFloat(ball.offsetHeight) / winHeight * 100 + parseFloat(ball.style.bottom);
                    //console.log(i + " " +((parseFloat(recs[i].style.bottom)) + " " + ballBottom))
                    if(parseFloat(recs[i].style.bottom) - ballBottom > 0 && parseFloat(recs[i].style.bottom) - ballBottom < 6){
                        if(!(ball.offsetLeft + ball.clientWidth /2> recs[i].offsetLeft + recs[i].clientWidth/2)
                        && !(ball.offsetLeft + ball.clientWidth /2< recs[i].offsetLeft - recs[i].clientWidth/2)){
                            ball.style.bottom = `${parseFloat(recs[i].offsetHeight) / winHeight * 100 + parseFloat(recs[i].style.bottom)}vh`;
                            goDown = ()=>{};
                            // console.log(recs[i].src)
                            if(recs[i].className == "rec thorn"){
                                gameOver = true;
                            }
                            break;
                        }else{
                            if(i != currentI){
                                scoreBoard.textContent = `SCORE: ${++scr}`;
                                currentI = i;
                            }
                            document.querySelector("#jump").play();
                            goDown = ()=>{
                                var top = parseFloat(ball.style.bottom) - a;
                                ball.style.bottom = `${top}vh`;
                                if(top < 0){
                                    return;
                                }else{
                                    requestAnimationFrame(() => goDown());
                                }
                            }
                            goDown();
                        }
                    }
                }   
            //}
        if(top > 100){
            return;
        }else{
            requestAnimationFrame(() => goUp(element, rec));
        }
    }
    goUp(rec);

    var count = 0;

    let mainInterval = setInterval(()=>{
        //console.log(count)
        count++;
        if(count%60 == 0){
            var child = document.createElement("img");

            var thornOK =(Math.floor((Math.random()*9)) == 8)?true:false;
            if(thornOK == true) {
                child.src = "./asset/thorn.png";
                child.className = "rec thorn"
            }else{
                child.src = "./asset/rectangle.png";
                child.className = "rec";
            }
            child.alt = "rec";
            child.width = "50%";
            child.style.bottom = 0;
            child.style.left = `${Math.random() * 50}vw`;
            wrapper.appendChild(child);
            goUp(child);
            var recs = document.querySelectorAll(".rec");
            for(let i=0;i<recs.length;i++){
                if(recs[i].style.top == -10){
                    // console.log(i)
                    recs[i].remove();
                }
            }
        }
        // console.log(parseFloat(ball.style.bottom))
        if(parseFloat(ball.style.bottom) > 100 || parseFloat(ball.style.bottom) < 0){
            gameOver = true;
        }
        if(gameOver ==true){
            ball.src = "./asset/pop.png";
            goDown = null;
            goUp = null;
            goRight = null;
            goLeft = null;
            document.querySelector(".left").onclick  = ()=>{};
            document.querySelector(".right").onclick  = ()=>{};
            ball.style.animationPlayState = "paused";
            document.addEventListener("keydown", ()=>{
                alert("Thua rồi ấn làm gi?");
            });
            setTimeout(()=>{
                document.querySelector('#gameOver').style.display = "block";
                document.querySelector("#lost").play();
                setTimeout(()=>{
                    //callback hell tí không sao 
                    document.querySelector("#retry").style.display = "block";
                    document.querySelector("#retry").onclick = ()=>{
                        window.location.href = "index.html";
                    }
                }, 1000)
            }, 2000);
        
            clearInterval(mainInterval);
        }
    },10);


}, 2000)




