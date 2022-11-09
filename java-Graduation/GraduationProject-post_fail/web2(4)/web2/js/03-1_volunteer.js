$(document).ready(() => {
    $(".div-block").hide();
    $("#vol-index-div").show();
    checkAndBindUserStat();
})

function showHideDivVol(divId) { //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch (divId) {
        case 'bar-volunteer-home':
            $(".div-block").hide();
            $("#vol-index-div").show();
            break;
        case 'bar-volunteer-stdlist':
            $(".div-block").hide();
            $("#vol-stdlist-div").show();
            break;
        case 'bar-volunteer-stdscore':
            $(".div-block").hide();
            $("#vol-stdscore-div").show();
            break;
        case 'volddl-personal':
            $(".div-block").hide();
            $("#vol-personal-div").show();
            break;
        case 'edit-volbtn':
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'submit-volbtn':
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
    }
}