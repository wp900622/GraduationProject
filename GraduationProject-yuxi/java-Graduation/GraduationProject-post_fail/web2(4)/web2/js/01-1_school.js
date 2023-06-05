$(document).ready(() => {
    initShowHide();
    checkAndBindUserStat();
    AjaxGet(schoolListUrl, '', token, getSchools,'');
    AjaxGet(NewsUrl, "/" + role, token, initNews,'');
    AjaxGet(mateUrl, '/get/' + username, token, getmatch, '');
})

function initShowHide(){
    $(".div-block,#btn-return,.acts-list").hide();
    $("#sch-index-div").show();
}
function getmatch() {
    console.log(2);
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
        case 'bar-school-make-match': //進行配對
            $(".div-block").hide();
            $("#sch-make-mate").show();
            break;
        case 'bar-school-match': //當次配對結果
            $(".div-block").hide();
            $("#sch-post-mate").show();
            break;
        case 'bar-school-match-all': //所有配對結果
            $(".div-block").hide();
            $("#sch-all-mate").show();
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
    $('#match-list').empty();
    let schSearch = '/' + $("#schoolList").val()
    AjaxGet(matchUrl, schSearch, token, showMatchInfo, {});

}

function showMatchInfo(data,para){

    data.forEach(function(voldata,i){
        $('#match-list').append(`<div class="mx-3 my-3">
        <h5 class="mx-3 mt-5 mb-3" >科目：<span id="vol-username-${i}">${voldata.subject}</span></h5>
        <h5 class="mx-3 my-3" >學歷：<span id="vol-eduattain-${i}">${voldata.eduattain}</span></h5>
        <h5 class="mx-3 my-3" >服務時間：<span id="vol-work-${i}">${voldata.work}</span></h5>
        <h6 class="mx-3 mb-5 mt-3" >性別：<span id="vol-sex-${i}">${voldata.sex}</span></h6>
    </div>`);
    })
    //<button type="button" class="btn btn-outline-primary rounded col-6 mt-2" onClick=";"> 詳細資料 </button>
    // const voldata = {
    //     id : data[num]["id"],
    //     username: data[num]["username"],
    //     telno : data[num]["telno"],
    //     eduattain : data[num]["eduattain"],
    //     subject : data[num]["subject"],
    //     email : data[num]["email"],
    //     age : data[num]["age"],
    //     sex : data[num]["sex"],
    //     city : data[num]["city"],
    //     area : data[num]["area"],
    //     address : data[num]["address"],
    //     school : data[num]["school"],
    //     work : data[num]["work"]
    // }
    //console.log(voldata);

}