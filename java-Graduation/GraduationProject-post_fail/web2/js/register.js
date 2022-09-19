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
    let school = $("#inputSchoolStd").val().trim();
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
                
    let datajson = JSON.stringify(dataobj);
    console.log(datajson);
    
    AjaxPost("studentpost", datajson, poststudentData);
}

function poststudentData(data){

    //Ajaxpost的callback

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
                    "address_county" : "city",
                    "address_district" : "district",
                    "address" : address,
                    "mail" : mail
                }
                // "address_county" : city,
                // "address_district" : district,
    let datajson = JSON.stringify(dataobj);
    console.log(datajson);
    
    AjaxPost("schoolpost", datajson, postschoolData);
}

function postschoolData(data){

    //Ajaxpost的callback

}
