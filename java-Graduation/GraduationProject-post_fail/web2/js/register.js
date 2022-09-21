$(document).ready(() => {
    $(".RegisterDiv").hide();
    initOption();

})

function toggleRegisterDiv(identity){
    switch(identity){
        case 1:
            $("#regStudentDiv").toggle();
            break;
        case 2:
            $("#regVolunteerDiv").toggle();
            break;
        case 3:
            $("#regSchoolDiv").toggle();
            break;
    }
}

function signupSubmitStudent(){
    
    let mail = $("#inputMailStd").val().trim();
    let account = $("#inputAccountStd").val().trim();
    let password = $("#inputPasswordStd").val().trim();
    let name = $("#inputNameStd").val().trim();
    let sex = $("#inputSexStd").val().trim();
    let age = $("#inputAgeStd").val().trim();
    let tel = $("#inputTelephoneStd").val();
    let school = $("#inputSchoolnameStd").val().trim();
    let grade = $("#inputGradeStd").val();
    let classval = $("#inputClassStd").val();
    let city = $("#inputCityStd").val();
    let district = $("#inputDistrictStd").val();
    let address = $("#inputAddressStd").val().trim();

    let dataobj = {
                    "username" : account,
                    "pwd" : password,
                    "name" : name,
                    "sex" : sex,
                    "age" : age,
                    "telephone" : tel,
                    "school" : school,
                    "grade" : grade,
                    "stu_class" : classval,
                    "address_county" : city,
                    "address_district" : district,
                    "address" : address,
                    "mail" : mail
                }
    AjaxGet("student", "", verifySameAccount, dataobj); //取得所有帳戶資料，成功時呼叫verifySameAccount
}

function signupSubmitSchool(){

    let account = $("#inputAccountSch").val().trim();
    let password = $("#inputPasswordSch").val().trim();
    let school = $("#inputSchoolnameSch").val().trim();
    let tel = $("#inputTelephoneSch").val().trim();
    let city = $("#inputCitySch").val();
    let district = $("#inputDistrictSch").val();
    let address = $("#inputAddressSch").val().trim();  
    let mail = $("#inputMailSch").val().trim();

    let dataobj = {
                    "school_account" : account,
                    "pwd" : password,
                    "telephone" : tel,
                    "school" : school,
                    "address_county" : city,
                    "address_district" : district,
                    "address" : address,
                    "mail" : mail
                }
    AjaxGet("school", "", verifySameAccount, dataobj); //取得所有帳戶資料，成功時呼叫verifySameAccount
}

function verifySameAccount(data,para,identity){
        console.log(data,para);
        for(i=0;i<data.length;i++){
            var acc = data[i];
            console.log(acc.mail, para.mail);
            if(acc.mail === para.mail){ //檢查是否有一樣的帳號
                var error = new Error("此帳號已被使用過");
                alert(error.toString());
                console.log(error.toString());
                return;
            }
        }
        let datajson = JSON.stringify(para);
        console.log(datajson);
        AjaxPost(identity, "post", postcallback, datajson); //檢查通過才能註冊
        alert("註冊成功");
}

function postcallback(){


}