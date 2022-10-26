
let gameStatus = false; //처음 정지상태
let timer  = null;
let maxLength = 10;   //최대 풍선갯수
let ballType = 4;  //풍선의 종류
let interval = 300;  //인터벌 타임
let ani = '5s' //애니메이트 타임

const $loading = $('.loading');
// 로딩중
$loading.children('p').fadeOut(5000);
$loading.delay(350).fadeOut(800, function(){
    $(this).remove();
});

//게임 모드 설정
function levelSetting(type , obj){
    if(gameStatus){
        console.log('게임진행중');
        return false;
        // 게임이 끝나기 전에는 다른모드 작동안되게함
    } 
    const $modeBtn = $('.modeBtn');
    
    // 버튼 클릭 활성화처리
    $modeBtn.removeClass('on');//모든버튼 on지우기
    obj.classList.add('on');//클릭한 버튼on처리

    if(type == 'easy'){
        ballType = 4;   //4번째 풍선만
        interval = 300;
        ani = '10s'
    }
    if(type == 'normal'){
        ballType = 2;   //2번째 풍선만
        maxLength = 20    //풍선갯수 늘리기
        interval = 200;
        ani = '7s'
    }
    if(type == 'hard'){
        ballType = 1;   //1번째 풍선만
        maxLength = 30    //풍선갯수 늘리기
        interval = 100;
        ani = '3s'
    }

}

// 스타트버튼에 대한 실행함수
function init(){
    if(gameStatus){
        console.log('게임진행중');
        return false;
    } 
    let present = $('.present');
    
    gameStatus = true;  //게임이 시작되면
    present.removeClass("on");  //곰돌이 없어짐
    rootScore = 0;   //점수 0으로 리셋
    $("#scoreNum").html(rootScore);

    let wrap = $("#ballBox");
    let ball = $("<span class='ball'>");
    let ballIdx = 0;
    timer = setInterval(function(){
        if(ballIdx >= maxLength) {
            clearInterval(timer);
            setTimeout(function(){
                present.addClass("on");
                gameStatus = false;
            },3000);
            return false;
        }
        
        // 풍선복제
        let item = ball.clone(true);
        let ran1 = Math.ceil(Math.random()*4);
        let ran2 = Math.ceil(Math.random()*4);
        let ran3 = Math.ceil(Math.random()*587);
        item.addClass("size-"+ ran1);
        item.addClass("ani-"+ ran2);
        item.css({left:ran3,animationDuration:ani});
        // item.click(clickEvt)
        if(ran1 == ballType){
            ballIdx++;
            item.css({zIndex:2});
            item.addClass("on");
            item.on("mousedown",clickEvt);
        } 
        wrap.append(item);
    },interval)
}



// 풍선을 클릭했을때 실행됨. 스코어처리
let rootScore = 0;
function clickEvt(evt,obj){
    if(evt.target.chk) return false; //더블클릭 예외처리
    evt.target.chk = true;
    let scoreEl = $("#scoreNum")
    rootScore+=100;
    scoreEl.html(rootScore);
    evt.target.classList.add('end');

    
    let present = $('.present');
    if(rootScore == maxLength*100) {
        clearInterval(timer);
        present.addClass("on");
        gameStatus = false;
    }
}