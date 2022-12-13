$(document).ready(() => {
    checkAndBindUserStat();

})

function checkAndBindUserStat(){
    $(".userItem").hide();
    if (token !== undefined && token !== '') {
        $('#username').text(username);
        updateLoginItem(true);
    }
    console.log(token);
    // return 0;
}

function updateLoginItem(isSignined) {
    if (isSignined) {
        $(".unsigned").hide();
        $(".userItem").show();
    } else {
        $(".unsigned").show();
        $(".userItem").hide();
    }
    switch(role){
        case 'Student':
            $('#userrole').text("學生");
            $(".schview,.volview").hide();
            break;
        case 'Volunteer':
            $('#userrole').text("志工");
            $(".schview,.stdview").hide();
            break;
        case 'School':
            $('#userrole').text("學校管理員");
            $(".stdview,.volview").hide();
            break;
    }

}

function logout() {
    if ($.removeCookie('token')) {
        window.location.href = "00-2_home.html";
    }
}

function AjaxPost(url, funcurl, data, token, para) {
    $.ajax({
        url: url + funcurl,
        method: 'POST',
        dataType: 'json',
        data: data,
        contentType: "application/json;charset=utf-8",
        headers: {"Authorization": "Bearer " + token},
        success: function (msg) {
            var myModal = new bootstrap.Modal(document.getElementById(para.modalID));
            myModal.show();
            console.log(msg);
        },
        error: function (err) {
            console.log(err);
            //alert("動作未成功");
        },
    });
}

function AjaxGet(url, funcurl, token, callback, para) {
    $.ajax({
        url: url + funcurl,
        method: 'Get',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        headers: {"Authorization": "Bearer " + token},
        success: function (msg) {
            callback(msg,para);
            //var myModal = new bootstrap.Modal(document.getElementById(modalID));
            //myModal.show();
            console.log(msg);
        },
        error: function (err) {
            console.log(err);
            console.log("動作未成功");
        },
    });
}
