let stat = $("#ddl-loginflag").attr("value");

$(document).ready(() => {
    statInit('3',0);
    initHiddenDiv()
})

function initHiddenDiv(){
    $(".after-edit").hide();
    $("#sch-btn-return").hide();
    $(".acts-list").hide();
}

function showHideDivSch(divId){ //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch(divId){
        case 'bar-school-home':
            if(stat == 0){
                window.location.href= 'newhome.html';
            }
            else{
                $(".div-block").hide();
                $("#home-div").show();
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
        case 'schddl-personal':
            $(".div-block").hide();
            $("#sch-personal-div").show();
            break;
        case 'ddl-message':
            $(".div-block").hide();
            $("#sch-message-div").show();
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

function appendNews(){
    console.log("In AppendNews.");
    let newsobj ={
        "id" : "2",
        "title" : $("#inputPostTitle").val().trim(),
        "content" : $("#inputPostContent").val().trim().replaceAll("\n","<br>"),
        "type" : $("#inputPostType").val().trim(),
        "time" : moment().format("YYYY-MM-D")
    }
    let newsjson = JSON.stringify(newsobj);
    initNews(newsobj) //測試時先放著，等API寫好就透過AjaxPost的Callback就好
    //AjaxPost("school", "announcement", initNews, newsjson); //送出公告訊息
}

function initNews(newsobj){

    //Ajax 資料傳回newsobj 包括自動生成的id
    //example
    console.log("In InitNews.");
    let resobj = newsobj;
    let msgid = resobj.id;
    let title = resobj.title; //防疫政策
    let content = resobj.content; //應應防疫....
    let type = resobj.type;
    let time = resobj.time;
    //let time = moment().format("YYYY-MM-D");
    console.log(resobj);
    //res.forEach(msg=>{
        // let title = "msg.title"; //防疫政策
        // let content = "msg.content"; //應應防疫....
        // let msgid = "msg.id";
        // let type = "msg.type" //activity

        //顯示標題
        if(type == '1'){ //newmsg
            $("#newmsg-list").append(`<a data-bs-toggle="collapse" data-bs-target="#news-list-${msgid}" aria-controls="news-list-${msgid}" type="button" class="list-group-item "><i class="bi bi-dot"></i>&nbsp; ${title}</a>`);
            $(".news-detail").append(`<div class="news-list collapse user-textdark mt-5" id="news-list-${msgid}" >
                                    <p class="mx-4 fs-5 fw-bold">${title}</p>
                                    <p class="mx-5 fs-5">${content}</p><p class = "news-time right fs-5" ><i class="fa-regular fa-calendar-days mx-2 fs-5"></i>${time}</span></p>
                                    </div>`);
        }
        else if(type == '2'){ //activity
            $("#activity-list").append(`<a type="button" class="list-group-item " onClick="showActDetail('#acts-list-${msgid}');"><i class="bi bi-dot"></i>&nbsp; ${title}</a>`);
            $(".news-detail").append(`<div class="acts-list user-textdark mt-5" id="acts-list-${msgid}" >
                                        <p class="mx-4 fs-5 fw-bold">${title}</p>
                                        <p class="mx-5">${content}</p><p class = "acts-time right" ><i class="fa-regular fa-calendar-days mx-2 fs-5"></i>${time}</p>
                                    </div>`);
        }
    //})
    $(".acts-list").hide();
}

function showActDetail(postid){
    $("#container-posttab").hide();
    $("#sch-btn-return").attr("data-postid",postid);
    $(postid).show();
    $("#sch-btn-return").show();
}

function returnFromActDetail(postid){
    $(postid).hide();
    $("#container-posttab").show();
    $("#sch-btn-return").hide();
}