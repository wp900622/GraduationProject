const serverURL = "http://140.134.24.157:53008/";
let loginstat;

$(document).ready(() => {
    $(".pagefooter").load("share_footer.html"); 
    loginstat = parseInt($("#ddl-loginflag").attr("value"));
    console.log(loginstat);
    if(loginstat == 0) {
        $(".afterlogin").hide();
    }
})

function setLoginstat(stat){
    loginstat = parseInt(stat);
    $("#ddl-loginflag").attr("value",loginstat);
}

function AjaxGet(identity, action, callback, para) {
    $.ajax({
        type: "GET",
        url: serverURL + identity + action,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },

        success: function (res) {
            console.log(res,para);
            callback(res,para,identity);
        },
        error: function (err) {
            console.log('Failed');
            console.log(serverURL + identity + action);
        },
    });
    
}

function AjaxPost(identity, action, callback, data) {
    $.ajax({
        type: "POST",
        url: serverURL + identity + action,
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (res) {
            console.log(res);
            callback(data, identity);
        },
        error: function (err) {
            console.log('Failed : ' + err.toString() );
            console.log(serverURL + identity + action);
        },
    });
    
}