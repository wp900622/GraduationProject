$(document).ready(() => {


})

function signupSubmit(){

    let account = $("#validationAccount").val();
    let password = $("#validationPassword").val();
    let school = $("#validationSchool").val();
    let tel = $("#validationTel").val();
    let city = $("#validationCity").val();
    let district = $("#validationDistrict").val();
    let address = $("#validationAddress").val();  
    let mail = $("#validationMail").val();

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