$(document).ready(() => {
    initShowHide();
    $(".home-navlink").on('click',function(e){
        if (token == undefined || token == '') {
            e.preventDefault;
            window.location.href = "00-0_login.html" 
        }
    });
})

function initShowHide(){
    $(".div-block,#sch-btn-return").hide();
    $("#home-div").show();
}

function showHideDivHome(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-search':
            $(".div-block").hide();
            $("#home-search-div").show();
            break;
    }
}