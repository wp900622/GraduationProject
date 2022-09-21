$(document).ready(() => {
    
})

function initlogin(){

    $("#InputEmail").empty();
    $("#InputPassword").empty();
    $("#acc-loginmsg,#pwd-loginmsg").empty();
}

function bindPersonalData(data,para){

    console.log(data,para);
    //登入後更新顯現資訊
    switch(para.Identity){
        case '1':
            $("#bar-school,#bar-volunteer").removeClass("afterlogin").addClass("beforelogin");
            $(".dropdown-menu").prepend(`<li class="dropdown-item afterlogin" id="ddl-stdloginmsg">歡迎回來,${data.username}</li>`)
            break; 
        case '2':
            $("#bar-school,#bar-student").removeClass("afterlogin").addClass("beforelogin");
            break;
        case '3':
            $("#bar-student,#bar-volunteer").removeClass("afterlogin").addClass("beforelogin");
            $(".dropdown-menu").prepend(`<li><a class="dropdown-item afterlogin" id="ddl-schloginmsg">歡迎回來,${data.school_account}</a></li>`)
            break;
    }
    //登入後綁定資料

    //將不需顯示之按鈕移除
    $(".beforelogin").hide();
    $(".afterlogin").show();

}

function testloginSubmit(identity) {
    
    let email = $("#InputEmail").val().trim();
    let password = $("#InputPassword").val().trim();
    $("#acc-loginmsg,#pwd-loginmsg").empty();

    switch(identity){
        case '1':
            AjaxGet("student","", verifyActAndPwd,{"Email" : email,"Password" : password,"Identity" : identity });
            break; 
        case '2':
            AjaxGet("volunteer","", verifyActAndPwd,{"Email" : email,"Password" : password,"Identity" : identity });
            break;
        case '3':
            AjaxGet("school","", verifyActAndPwd,{"Email" : email,"Password" : password,"Identity" : identity });
            break;
    }

}

function verifyActAndPwd(data,para){
    console.log(para);
    let mail_pass = 0;

    for(i = 0  ; i < data.length ; i++){
        if(data[i].mail === para.Email){
            mail_pass = 1;
            break;
        }
    }

    if(mail_pass == 0){
        $("#alertmsg").append(`<i class="fa-solid fa-triangle-exclamation"></i><a id="acc-loginmsg"></a>`);
        $("#acc-loginmsg").html("   此帳號尚未註冊");
    }
    else{ //帳號對了之後驗證密碼
        console.log(data[i].pwd, para.Password);
        if(data[i].pwd === para.Password){
            console.log("登入成功",para);

            //設置
            statInit(para.Identity,1);
            setLoginstat(1);
            initlogin();

            //資料綁定
            let userData = data[i];
            bindPersonalData(userData,para);
            
        }
        else{
            $("#alertmsg").append(`<i class="fa-solid fa-triangle-exclamation"></i><a id="pwd-loginmsg"></a>`);
            $("#pwd-loginmsg").html("   密碼不正確");
        }
    }
}