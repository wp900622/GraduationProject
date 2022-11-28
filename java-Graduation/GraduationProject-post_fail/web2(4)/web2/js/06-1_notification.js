$(document).ready(() => {
    initShowHide();
    AjaxGet(NewsUrl, '/school', token, initNews,'');
    AjaxGet(NewsUrl, '/volunteer', token, initNews,'');
    AjaxGet(NewsUrl, '/student', token, initNews,'');
})

function initShowHide(){
    $("#btn-return").hide();
}

function showHideDivNtf(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-search':
            $("#search-div").show();
            break;
    }
}