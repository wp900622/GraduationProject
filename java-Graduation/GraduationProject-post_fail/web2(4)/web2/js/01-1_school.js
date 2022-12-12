$(document).ready(() => {
    initShowHide();
    checkAndBindUserStat();
    AjaxGet(schoolListUrl, '', token, getSchools,'');
    AjaxGet(NewsUrl, "/" + role, token, initNews,'');
})

function initShowHide(){
    $(".div-block,#btn-return,.acts-list").hide();
    $("#sch-index-div").show();
}

function getSchools(schools) {
    schools.forEach(school=>{
        //console.log(school);
        let optionstr = `<option value="${school.user.name}">${school.user.name}</option>`
        $('#schoolList').append(optionstr);
    })
}

function showHideDivSch(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-school-index':
            $(".div-block").hide();
            $("#sch-index-div").show();
            break;
        case 'bar-school-post':
            $(".div-block").hide();
            $("#sch-post-div").show();
            break;
        case 'bar-school-schlist':
            $(".div-block").hide();
            $("#sch-list-div").show();
            break;
        case 'edit-stdbtn': //編輯個人資料
            $(".before-edit").hide();
            $(".after-edit").show();
            break;
        case 'submit-stdbtn': //確認變更個人資料
            $(".after-edit").hide();
            $(".before-edit").show();
            break;
        case 'nav-activity': //按活動消息，最新消息會消失
            $(".news-detail").hide();
            break;
        case 'nav-newsmsg': //按最新消息，最新消息會顯示
            $(".news-detail").show();
            break;
    }
}

function appendNews(){
    console.log("In AppendNews.");
    const inputs = {
        content : $("#inputPostContent").val().trim().replaceAll("\n","<br>"),
        title : $("#inputPostTitle").val().trim(),
        target : $("#inputPostArea").val(),
        type : $("#inputPostType").val()
    }
    let newsData = JSON.stringify(inputs);
    AjaxPost(NewsUrl, '/post', newsData, token, {});
    window.location.href = "01-1_school.html";
}

function checkMatch(){

    let schSearch = $("#schoolList").val()
    AjaxPost(matchUrl, '', schSearch, token, {});

}