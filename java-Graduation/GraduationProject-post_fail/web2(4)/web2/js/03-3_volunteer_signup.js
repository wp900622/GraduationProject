$(document).ready(() => {
    initHiddenDiv();
})

function initHiddenDiv(){
    $(".after-summit").hide();

}

function showHideDivStd(divId) { //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch (divId) {
        case 'signsummit':
            $(".div-block").hide();
            $("#signupform").show();
            break;
    }
}

function ableSummitBtn(){
    if( $("#readcheck").is(":checked") == true) {
        $("#signsummit").attr('disabled', false);
    }
    else $("#signsummit").attr('disabled', true);
}