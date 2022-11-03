//const serverURL = "http://140.134.24.157:53008/";
//let loginstat;

$(document).ready(() => {
    loginstat = parseInt($("#ddl-loginflag").attr("value"));
    console.log(loginstat);
    if(loginstat == 0) {
        $(".afterlogin").hide();
    }
})

function updateLoginItem(isSignined) {
    if (isSignined) {
        $('.unsigned').hide();
        $('#userItem').show();
    } else {
        $('.unsigned').show();
        $('#userItem').hide();
    }
}

function logout() {
    if ($.removeCookie('token')) {
        window.location.href = "index.html";
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

//尚未完成
function AjaxSignIn(identity, action, callback, data) {
    $.ajax({
        url: schoolSignupUrl,
        method: 'POST',
        dataType: 'json',
        data: signupData,
        contentType: "application/json;charset=utf-8",
        success: function (student) {
            var myModal = new bootstrap.Modal(document.getElementById('success-modal'))
            myModal.show()
            console.log(student);
        },
        error: function (err) {
            console.log(err);
        },
    });

}

// function AjaxGet(identity, action, callback, para) {
//     $.ajax({
//         type: "GET",
//         url: serverURL + identity + action,
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         crossDomain: true,
//         cache: false,
//         headers: { "cache-control": "no-cache" },

//         success: function (res) {
//             console.log(res,para);
//             callback(res,para,identity);
//         },
//         error: function (err) {
//             console.log('Failed');
//             console.log(serverURL + identity + action);
//         },
//     });
    
// }

// function AjaxPost(identity, action, callback, data) {
//     $.ajax({
//         type: "POST",
//         url: serverURL + identity + action,
//         contentType: "application/json; charset=utf-8",
//         data: data,
//         success: function (res) {
//             console.log(res);
//             callback(data, identity);
//         },
//         error: function (err) {
//             console.log('Failed : ' + err.toString() );
//             console.log(serverURL + identity + action);
//         },
//     });
    
// }