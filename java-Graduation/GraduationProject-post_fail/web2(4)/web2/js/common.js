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
    return 0;
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

 function AjaxSignUp(url, data) {
    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: data,
        contentType: "application/json;charset=utf-8",
        success: function (msg) {
            var myModal = new bootstrap.Modal(document.getElementById('success-modal'))
            myModal.show()
            console.log(msg);
        },
        error: function (err) {
            console.log(err);
        },
    });

}