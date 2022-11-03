const studentSignupUrl = apiUrl + 'auth/signup/student';
const schoolSignupUrl = apiUrl + 'auth/signup/school';
const volunteerSignupUrl = apiUrl + 'auth/signup/volunteer';

$(document).ready(() => {
    
    $(".RegisterDiv").hide();    
    initOption();

    updateLoginItem(false);

    const token = $.cookie('token');
    if (token !== undefined && token !== '') {
        const username = $.cookie('username');
        $('#nameDropdown').text(username);
        updateLoginItem(true);
    }

    console.log(token);

    // $('#studentSigninupForm').on('submit',function (e) {
    //     e.preventDefault();
    //     studentSignup();
    // });

    // $('#schoolSigninupForm').on('submit',function (e) {
    //     e.preventDefault();
    //     schoolSignup();
    // });

    $('#signin-btn').on('click',function() {
        window.location.href='test_login.html';
    })
    
})

function schoolSignup() {
    const inputs = {
        email: $("#inputMailSch").val().trim(),
        password: $("#inputPasswordSch").val().trim(),
        name: $("#inputNameSch").val().trim(),
        telNo: $("#inputTelephoneSch").val().trim(),
        contactName: $("#inputContactNameSch").val().trim(),
        city: $("#inputCitySch").val(),
        area: $("#inputDistrictSch").val(),
        address: $("#inputAddressSch").val().trim()
    }

    const signupData = JSON.stringify(inputs);
    console.log(signupData);

    AjaxSignUp(schoolSignupUrl, signupData);
}

function studentSignup() {
    const inputs = {
        email: $("#inputMailStd").val().trim(),
        password: $("#inputPasswordStd").val().trim(),
        name: $("#inputNameStd").val().trim(),
        gender: $("#inputSexStd").val().trim(),
        age: parseInt($("#inputAgeStd").val().trim()),
        schoolName: $("#inputSchoolnameStd").val().trim(),
        yearName: $("#inputGradeStd").val(),
        city: $("#inputCityStd").val(),
        area: $("#inputDistrictStd").val(),
        address: $("#inputAddressStd").val().trim()
    }

    const signupData = JSON.stringify(inputs);
    console.log(signupData);

    AjaxSignUp(studentSignupUrl, signupData);
}

function toggleRegisterDiv(identity){
    switch(identity){
        case 1:
            $(".RegisterDiv").hide();
            $("#regStudentDiv").show();
            break;
        case 2:
            $(".RegisterDiv").hide();
            $("#regVolunteerDiv").show();
            break;
        case 3:
            $(".RegisterDiv").hide();
            $("#regSchoolDiv").show();
            break;
    }
}

// function verifySameAccount(data,para,identity){
//         console.log(data,para);
//         for(i=0;i<data.length;i++){
//             var acc = data[i];
//             console.log(acc.mail, para.mail);
//             if(acc.mail === para.mail){ //檢查是否有一樣的帳號
//                 var error = new Error("此帳號已被使用過");
//                 alert(error.toString());
//                 console.log(error.toString());
//                 return;
//             }
//         }
//         let datajson = JSON.stringify(para);
//         console.log(datajson);
//         AjaxPost(identity, "post", postcallback, datajson); //檢查通過才能註冊
//         alert("註冊成功");
// }
