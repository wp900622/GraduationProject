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
        case 'bar-volunteer-keyscore':
            $(".div-block").hide();
            $("#vol-keyscore-div").show();
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

function summitScore(){

    const inputs = {
        email: $("#inputMailScore").val().trim(),
        name: $("#inputNameScore").val().trim(),
        yearname: $("#inputGradeScore").val(),
        schoolname: $("#inputSchoolnameScore").val().trim(),
        subject: $("#inputSubjectScore").val(),
        score: $("#inputScore").val().trim()
    }

    const scoreData = JSON.stringify(inputs);
    console.log(scoreData);

    AjaxPost(ExamUrl, '/exampost', scoreData, token,"{modalID:''}");

}