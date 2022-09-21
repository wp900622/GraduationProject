$(document).ready(() => {
    statInit('1',0);
})

function showHideDivStd(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-student-home':
            $(".div-block ").hide();
            $("#std-home-div").show();
            break;
        case 'bar-student-index':
            $(".div-block").hide();
            $("#std-index-div").show();
            break;
        case 'bar-student-score':
            $(".div-block").hide();
            $("#std-score-div").show();
            break;
    }
}