const studentSignupUrl = apiUrl + 'auth/signup/student';
const schoolSignupUrl = apiUrl + 'auth/signup/school';
const volunteerSignupUrl = apiUrl + 'auth/signup/volunteer';

$(document).ready(() => {

    $(".RegisterDiv").hide();
    initOption();

    updateLoginItem(false);

    // $('#signin-btn').on('click',function() {
    //     window.location.href='00-0_login.html';
    // })

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
        address: $("#inputAddressSch").val().trim(),

    }

    const signupData = JSON.stringify(inputs);
    console.log(signupData);

    AjaxPost(schoolSignupUrl, '', signupData, '', { modalID: 'success-modal' });
}

function studentSignup() {
    const inputs = {
        email: $("#inputMailStd").val().trim(),
        password: $("#inputPasswordStd").val().trim(),
        name: $("#inputNameStd").val().trim(),
        city: $("#inputCityStd").val(),
        area: $("#inputDistrictStd").val(),
        address: $("#inputAddressStd").val().trim(),
        gender: $("#inputSexStd").val().trim(),
        age: parseInt($("#inputAgeStd").val().trim()),
        schoolName: $("#inputSchoolnameStd").val().trim(),
        yearName: $("#inputGradeStd").val(),
        style: $("#inputPersonalityStd .active")[0].innerHTML,
    }

    const signupData = JSON.stringify(inputs);
    console.log(signupData);

    AjaxPost(studentSignupUrl, '', signupData, '', { modalID: 'success-modal' });

}

function volunteerSignup() {
    const inputs = {
        email: $("#inputMailVol").val().trim(),
        password: $("#inputPasswordVol").val().trim(),
        name: $("#inputNameVol").val().trim(),
        city: $("#inputCityVol").val(),
        area: $("#inputDistrictVol").val(),
        address: $("#inputAddressVol").val().trim(),
        gender: $("#inputSexVol").val().trim(),
        age: parseInt($("#inputAgeVol").val().trim()),
        highEdu: $("#inputEducationVol").val(),
        expertise: $("#inputSpecialtyVol").val(),
        telNo: $("#inputTelephoneVol").val().trim(),
        educational_attainment: $("#inputAttainmentVol").val().trim(),
        style: $("#inputPersonalityVol .active")[0].innerHTML

    }

    const signupData = JSON.stringify(inputs);
    console.log(signupData);

    AjaxPost(volunteerSignupUrl, '', signupData, '', { modalID: 'success-modal' });

}

function toggleRegisterDiv(identity) {
    switch (identity) {
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