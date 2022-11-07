$(document).ready(() => {

})

function loginSummit(){

    const email = $('#InputEmail').val();
    const password = $('#InputPassword').val();
    //const roleId = $('#roleSelect').val();

    const signinUrl = 'http://localhost:3008/api/auth/signin';
    const inputs = {
        "email": email,
        "password": password
    };
    const signinData = JSON.stringify(inputs);
    console.log(signinData);

    $.ajax({
        url: signinUrl,
        method: 'POST',
        dataType: 'json',
        data: signinData,
        contentType: "application/json;charset=utf-8",
        success: function (user) {
            alert("登入成功");
            for (item in user) {
                $.cookie(item, user[item], { expires: 7 });
            }
            $('#errorMessage').hide();
            window.location.href = "00-2_home.html";
            console.log(user);
            console.log($.cookie('token'));
        },
        error: function (err) {
            $('#errorMessage').show();
            console.log(err);
        },
    });

}

// function initlogin(){

//     $("#InputEmail").empty();
//     $("#InputPassword").empty();
//     $("#acc-loginmsg,#pwd-loginmsg").empty();
// }


// function bindPersonalData(data,para){

//     console.log(data,para);
//     //登入後更新顯現資訊
//     switch(para.Identity){
//         case '1': //student
//             $("#bar-school,#bar-volunteer").removeClass("afterlogin").addClass("beforelogin");
//             bindStdData(data);
//             break; 
//         case '2': //volunteer
//             $("#bar-school,#bar-student").removeClass("afterlogin").addClass("beforelogin");
//             bindVolData(data);
//             break;
//         case '3': //school
//             $("#bar-student,#bar-volunteer").removeClass("afterlogin").addClass("beforelogin");
//             bindSchData(data);
//             break;
//     }
//     //登入後綁定資料

//     //將不需顯示之按鈕移除
//     $(".beforelogin").hide();
//     $(".afterlogin").show();

// }

// function bindStdData(data){
//     $(".dropdown-menu").prepend(`<li class="dropdown-item afterlogin" id="ddl-stdloginmsg">歡迎回來,${data.username}</li>`)
//     $("#std-personal-div #dataId,#std-personal-div #inputId").attr("value",data.username);
//     $("#std-personal-div #dataGender,#std-personal-div #inputGender").attr("value",data.sex);
//     $("#std-personal-div #dataAge,#std-personal-div #inputAge").attr("value",data.age);
//     $("#std-personal-div #dataSchool,#std-personal-div #inputSchool").attr("value",data.school);
//     $("#std-personal-div #dataGrade,#std-personal-div #inputGrade").attr("value",data.grade);
//     $("#std-personal-div #dataCity,#std-personal-div #inputCity").attr("value",data.address_county);
//     $("#std-personal-div #dataDistrict,#std-personal-div #inputDistrict").attr("value",data.address_district);
// }

// function bindVolData(){
    
// }

// function bindSchData(data){
//     $(".dropdown-menu").prepend(`<li><a class="dropdown-item afterlogin" id="ddl-schloginmsg">歡迎回來,${data.school_account}</a></li>`)
//     $("#sch-personal-div #dataName,#sch-personal-div #inputName").attr("value",data.school_account);
//     $("#sch-personal-div #dataTel,#sch-personal-div #inputTel").attr("value",data.telephone);
//     $("#sch-personal-div #dataCity,#sch-personal-div #inputCity").attr("value",data.address_county);
//     $("#sch-personal-div #dataArea,#sch-personal-div #inputArea").attr("value",data.address_district);
//     $("#sch-personal-div #dataAddress,#sch-personal-div #inputAddress").attr("value",data.address);
// }

// function testloginSubmit(identity) {
    
//     let email = $("#InputEmail").val().trim();
//     let password = $("#InputPassword").val().trim();
//     $("#acc-loginmsg,#pwd-loginmsg").empty();

//     switch(identity){
//         case '1':
//             AjaxGet("student","", verifyActAndPwd,{"Email" : email,"Password" : password,"Identity" : identity });
//             break; 
//         case '2':
//             AjaxGet("volunteer","", verifyActAndPwd,{"Email" : email,"Password" : password,"Identity" : identity });
//             break;
//         case '3':
//             AjaxGet("school","", verifyActAndPwd,{"Email" : email,"Password" : password,"Identity" : identity });
//             break;
//     }

// }

// function verifyActAndPwd(data,para){
//     console.log(para);
//     let mail_pass = 0;

//     for(i = 0  ; i < data.length ; i++){
//         if(data[i].mail === para.Email){
//             mail_pass = 1;
//             break;
//         }
//     }

//     if(mail_pass == 0){
//         $("#alertmsg").append(`<i class="fa-solid fa-triangle-exclamation"></i><a id="acc-loginmsg"></a>`);
//         $("#acc-loginmsg").html("   此帳號尚未註冊");
//     }
//     else{ //帳號對了之後驗證密碼
//         console.log(data[i].pwd, para.Password);
//         if(data[i].pwd === para.Password){
//             console.log("登入成功",para);

//             //設置
//             statInit(para.Identity,1);
//             setLoginstat(1);
//             initlogin();

//             //資料綁定
//             let userData = data[i];
//             bindPersonalData(userData,para);
            
//         }
//         else{
//             $("#alertmsg").append(`<i class="fa-solid fa-triangle-exclamation"></i><a id="pwd-loginmsg"></a>`);
//             $("#pwd-loginmsg").html("   密碼不正確");
//         }
//     }
// }