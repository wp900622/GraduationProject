$(document).ready(() => {
    initHiddenDiv();
    initOption();
})

function initHiddenDiv(){
    $(".after-summit").hide();

}

function showHideDivStd(divId) { //根據點選的按鈕，顯示所選區塊、隱藏其他區塊
    switch (divId) {
        case 'signsummit':
            $(".div-block").hide();
            $("#signupform").show();
            break;
    }
}

function ableSummitBtn(){
    if( $("#readcheck").is(":checked") == true) {
        $("#signsummit").attr('disabled', false);
    }
    else $("#signsummit").attr('disabled', true);
}

function volunteerApplySummit() {
    var subjectlist="";
    $('input[name=checked-sub]:checked').each(function(){
        if(subjectlist == "")
        {
            subjectlist = $(this).val();
        }
        else
        {
            subjectlist += "," + $(this).val();
        }
    });
    const inputs = {
        email: $("#inputMailSign").val().trim(),
        username: $("#inputNameSign").val().trim(),
        sex: $("#inputSexSign").val().trim(),
        age: parseInt($("#inputAgeSign").val().trim()),
        city: $("#inputCitySign").val(),
        area: $("#inputDistrictSign").val(),
        address: $("#inputAddressSign").val().trim(),
        subject: subjectlist,
        school: $("#inputSchoolSign1").val() + "," + $("#inputSchoolSign2").val() + "," + $("#inputSchoolSign3").val(),
        telNo: $("#inputTelSign").val().trim(),
        eduattain: $("#inputAttainmentSign").val().trim()
    }

    const applyData = JSON.stringify(inputs);
    console.log(applyData);

    AjaxPost(matchUrl, '', applyData, '', '');

}
