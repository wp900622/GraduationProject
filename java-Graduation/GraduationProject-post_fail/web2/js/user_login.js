
$(document).ready(() => {


})

function bindPersonalData(data){

    //登入後綁定資料

}

function loginSubmit() {
    
    let email = $("#exampleInputEmail1").val();
    let password = $("#exampleInputPassword1").val();
    let identity = $("#exampleInputidentity").val();

    if (identity == 1) {
        AjaxGet("student", getStudentData,{"Email" : email,"Password" : password,"Identity" : identity});

    } else if (identity == 2) {//志工
        AjaxGet("volunteer", getVolunteerData,{"Email" : email,"Password" : password,"Identity" : identity});

    } else if (identity == 3) {//學校
        AjaxGet("school", getSchoolData,{"Email" : email,"Password" : password,"Identity" : identity});
    }

}

function getSchoolData(data,para){

    console.log(para);
    console.log("data + " + data);
    let mail_pass = 0;

    for(i = 0  ; i < data.length-1 ; i++){
        console.log(data[i].mail,para.Email);
        if(data[i].mail === para.Email){
            mail_pass = 1;
            break;
        }
    }

    if(mail_pass == 0){
        $("#login").html("此帳號不存在");
    }
    else{
        if(data[i].pwd === para.Password){
            $("#login").html("密碼正確");
            bindPersonalData(data); //還沒實作
            window.location.href = 'school.html';
        }
        else{
            $("#login").html("密碼不正確");
        }
    }
    // 得到「你的名字是：oxxo，年紀：18 歲。」
}

function getStudentData(data,para){

    console.log(para);
    console.log("data + " + data);
    let mail_pass = 0;

    for(i = 0  ; i < data.length-1 ; i++){
        console.log(data[i].mail,para.Email);
        if(data[i].mail === para.Email){
            mail_pass = 1;
            break;
        }
    }

    if(mail_pass == 0){
        $("#login").html("此帳號不存在");
    }
    else{
        if(data[i].pwd === para.Password){
            bindPersonalData(data); //還沒實作
            $("#login").html("密碼正確");
            window.location.href = 'school.html';
        }
        else{
            $("#login").html("密碼不正確");
        }
    }
    // 得到「你的名字是：oxxo，年紀：18 歲。」
}