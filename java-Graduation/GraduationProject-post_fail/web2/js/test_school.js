$(document).ready(() => {
    statInit('3',0);
})


function showHideDivSch(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-school-home':
            if(stat == 0){
                window.location.href= 'newhome.html';
            }
            else{
                $(".div-block").hide();
                $("#sch-home-div").show();
            }
            break;
        case 'bar-school-index':
            $(".div-block").hide();
            $("#sch-index-div").show();
            break;
        case 'bar-school-post':
            $(".div-block").hide();
            $("#sch-post-div").show();
            break;
        case 'ddl-personal':
            $(".div-block").hide();
            $("#sch-personal-div").show();
            break;
        case 'ddl-message':
            $(".div-block").hide();
            $("#sch-message-div").show();
            break;
    }
}

function appendNews(){
    let newsobj ={
        "title" : $("#inputPostTitle").val().trim(),
        "content" : $("#inputPostContent").val().trim(),
        "type" : $("#inputPostType").val().trim()
    }
    let newsjson = JSON.stringify(newsobj);
    AjaxPost("school", "announcement", initNews, newsjson); //送出公告訊息
}

function initNews(){

    //Ajax 資料傳回res
    //example

    //res.forEach(msg=>{
        let title = "msg.title"; //防疫政策
        let content = "msg.content"; //應應防疫....
        let msgid = "msg.id";
        let type = "msg.type" //activity

        //顯示標題
        if(type == 'newmsg'){
            $("#newmsg-list").append(`<a onClick="showHideNews(this.id);" id="newmsg-${msgid}" class="list-group-item "><i class="bi bi-dot"></i>&nbsp; ${title}</a>`);
            $("#news-detail").append(`<div class="news-list" id="news-list-${msgid}" >${content}</div>`);
            $("#news-detail").hide();
        }
        else if(type == 'activity'){
            $("#activity-list").append(`<a onClick="showHideNews(this.id);" id="newmsg-${msgid}" class="list-group-item "><i class="bi bi-dot"></i>&nbsp; ${title}</a>`);
            $("#news-detail").append(`<div class="news-list" id="news-list-${msgid}" >${content}</div>`);
            $("#news-detail").hide();
        }
    //})
}

function showHideNews(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    //套入格式
    let div = `#news-list-${msgid}`;
    $(".news-list").hide();
    $(div).show();
}