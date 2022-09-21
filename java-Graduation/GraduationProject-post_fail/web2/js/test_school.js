$(document).ready(() => {
    statInit('3',0);
})


function showHideDivSch(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-school-home':
            $(".div-block").hide();
            $("#std-home-div").show();
            //其他hide
            break;
        case 'bar-student-index':
            $(".div-block").hide();
            $("#std-index-div").show();
            break;
    }
}