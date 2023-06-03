$(document).ready(() => {
    initShowHide();
    checkAndBindUserStat();
    console.log(username,id);
    AjaxGet(ExamUrl, '/' + id, token, initScore,{academicyear:'111'});
    AjaxGet(NewsUrl, '/' + role.toLowerCase(), token, initNews,'');
})

function initShowHide(){
    $(".div-block,#btn-return,.acts-list").hide();
    $("#std-index-div").show();
}

function showHideDivStd(divId) { //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch (divId) {
        case 'bar-student-index':
            $(".div-block").hide();
            $("#std-index-div").show();
            break;
        case 'bar-student-score':
            $(".div-block").hide();
            $("#std-subject-div").show();
            break;
        case 'stdddl-personal':
            $(".div-block").hide();
            $("#std-personal-div").show();
            break;
        case 'edit-stdbtn':
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'confirm-stdbtn':
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
        
    }
}
