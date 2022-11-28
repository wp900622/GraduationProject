
function initNews(newsobj){
    $("#newmsg-list,.news-detail,#activity-list,.acts-detail").empty();
    newsobj.forEach(msg=>{
        let title = msg.title;
        let content = msg.content;
        let msgid = msg.id;
        let type = msg.type;
        let time = moment(msg.newsTime).format("YYYY-MM-DD");
        let role = msg.role["name"];

        //顯示標題
        if(type == '最新消息'){ //newmsg
            $("#newmsg-list").append(`<a data-bs-toggle="collapse" data-bs-target="#news-list-${msgid}" aria-controls="news-list-${msgid}" type="button" class="list-group-item "><i class="bi bi-dot"></i>&nbsp; ${title}</a>`);
            $(".news-detail").append(`<div class="news-list collapse user-textdark mt-5" id="news-list-${msgid}" >
                                    <p class="mx-4 fs-5 fw-bold user-textdark">${title}</p>
                                    <p class="mx-5 fs-6">${content}</p><p class = "news-time right user-textlight" ><i class="fa-regular fa-calendar-days mx-2 fs-6"></i>${time}</span></p>
                                    </div>`);
        }
        else if(type == '活動訊息'){ //activity
            $("#activity-list").append(`<a type="button" class="list-group-item" onClick="showActDetail('#acts-list-${msgid}');"><i class="bi bi-dot"></i>&nbsp; ${title}</a>`);
            $(".acts-detail").append(`<div class="acts-list user-textdark mt-5" id="acts-list-${msgid}" >
                                        <p class="mx-4 fs-5 fw-bold user-textdark">${title}</p>
                                        <p class="mx-5 fs-6">${content}</p><p class = "acts-time right user-textlight" ><i class="fa-regular fa-calendar-days mx-2 fs-6"></i>${time}</p>
                                    </div>`);
        }
    })
    $(".acts-list").hide();
}

function showHideDivNews(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'nav-activity': //按活動消息，最新消息會消失
            $(".news-detail").hide();
            break;
        case 'nav-newsmsg': //按最新消息，最新消息會顯示
            $(".news-detail").show();
            break;
    }
}

function showActDetail(postid){
    $("#container-posttab").hide();
    $("#btn-return").attr("data-postid",postid);
    $(postid).show();
    $("#btn-return").show();
}

function returnFromActDetail(postid){
    $(postid).hide();
    $("#container-posttab").show();
    $("#btn-return").hide();
}

function showSearchNews(){
    let keywords = $("#input-search-news").val().trim();
    let funcurl = `/search?title=${keywords}`
    
    AjaxGet(NewsUrl, funcurl, token, initNews, "");
}

function showHomeNews(role){

    switch(role){
        case 'student':
            AjaxGet(NewsUrl, '/Student', token, initNews);
            break;
        case 'volunteer':
            AjaxGet(NewsUrl, '/Volunteer', token, initNews);
            break;
        case 'school':
            AjaxGet(NewsUrl, '/School', token, initNews);
            break;
    }
    
}