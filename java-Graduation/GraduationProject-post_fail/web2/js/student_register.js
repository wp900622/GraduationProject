$(document).ready(() => {


})

function signupSubmit(){
    
    let mail = $("#validationMail").val();
    let account = $("#validationServer01").val();
    let password = $("#validationServer02").val();
    let name = $("#validationDefault03").val();
    let sex = $("#validationDefault04").val();
    let age = $("#validationDefault05").val();
    let tel = $("#validationDefault06").val();
    let school = $("#validationDefault07").val();
    let grade = $("#validationDefault08").val();
    let classval = $("#validationDefault09").val();
    let city = $("#validationDefault10").val();
    let district = $("#validationDefault11").val();
    let address = $("#validationDefault12").val();

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