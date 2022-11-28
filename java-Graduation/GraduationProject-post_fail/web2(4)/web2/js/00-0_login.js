$(document).ready(() => {

})

function loginSummit(){

    const email = $('#InputEmail').val();
    const password = $('#InputPassword').val();
    //const roleId = $('#roleSelect').val();

    const signinUrl = 'auth/signin';
    const inputs = {
        "email": email,
        "password": password
    };
    const signinData = JSON.stringify(inputs);
    console.log(signinData);

    $.ajax({
        url: apiUrl + signinUrl,
        method: 'POST',
        dataType: 'json',
        data: signinData,
        contentType: "application/json;charset=utf-8",
        success: function (user) {
            
            //setTimeout(function() {
                for (item in user) {
                    console.log(item);
                    $.cookie(item, user[item], { expires: 7 });
                }
                //await delay(5);
                $('#errorMessage').hide();
                window.location.href = "00-2_home.html";
                console.log(user);
                console.log($.cookie('token'));
                //alert("登入成功");
            //}, 5000);
        },
        error: function (err) {
            $('#errorMessage').show();
            console.log(err);
            //window.location.href = "00-0_login.html";
            alert("登入失敗，請重新檢查信箱或者密碼");
        },
    });

}

function loginSuccess(){
    
    

}
