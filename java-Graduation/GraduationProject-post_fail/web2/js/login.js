$(document).ready(() => {
    
})

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

function loginSubmit() {
    
    let email = $("#InputEmail").val().trim();
    let password = $("#InputPassword").val().trim();
    let identity = $("#InputIdentity").val().trim();

    switch(identity){
        case '1':
            AjaxGet("student", getStudentData,{"Email" : email,"Password" : password,"Identity" : identity});
            break; 
        case '2':
            AjaxGet("volunteer", getVolunteerData,{"Email" : email,"Password" : password,"Identity" : identity});
            break;
        case '3':
            AjaxGet("school", getSchoolData,{"Email" : email,"Password" : password,"Identity" : identity});
            break;
    }

}


function getStudentData(data,para){

    console.log(para);
    let mail_pass = 0; //區域flag

    for(i = 0  ; i < data.length ; i++){
        console.log(data[i].mail,para.Email);
        if(data[i].mail === para.Email){
            mail_pass = 1;
            break;
        }
    }

    if(mail_pass == 0){
        $("#login").html("此帳號不存在");
    }
    else{ //帳號對了之後驗證密碼
        console.log(data[i].pwd, para.Password);
        if(data[i].pwd === para.Password){
            console.log("登入成功");
            let userData = data[i];
            bindPersonalData(userData,para); //還沒實作
            setLoginstat(1);
            //window.location.href = '00-2_login.html';
        }
        else{
            $("#login").html("密碼不正確");

        }
    }
}

function getSchoolData(data,para){

    console.log(para);
    let mail_pass = 0;

    for(i = 0  ; i < data.length ; i++){
        console.log(data[i].mail,para.Email);
        if(data[i].mail === para.Email){
            mail_pass = 1;
            break;
        }
    }

    if(mail_pass == 0){
        $("#login").html("此帳號不存在");
    }
    else{ //帳號對了之後驗證密碼
        console.log(data[i].pwd, para.Password);
        if(data[i].pwd === para.Password){
            console.log("登入成功");
            let userData = data[i];
            bindPersonalData(userData,para); //還沒實作
            setLoginstat(1);
            //window.location.href = '00-2_login.html';
        }
        else{
            $("#login").html("密碼不正確");
        }
    }
}
