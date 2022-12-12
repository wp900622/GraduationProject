$(document).ready(() => {
    initShowHide();
    checkAndBindUserStat();
    AjaxGet(NewsUrl, '/Student', token, initNews,'');
    let uid = '1';
    console.log(username,id);
    AjaxGet(ExamUrl, '/' + id, token, initScore,{academicyear:'111'});
    // AjaxGet(ExamUrl, '/' + "7", token, initScore,{academicyear:'111'});
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
        case 'submit-stdbtn':
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
    }
}
