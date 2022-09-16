const schoolRegApiUrl = 'http://140.134.24.157:53008/schoolpost';
//const schoolRegApiUrl = 'http://localhost:3008/schoolpost';

$(document).ready(function() {

    $('#password-warning').hide();

    fillCities();

    $('#city').change(function() {
        fillAreas($('#city').val())       
    });

    $('#school-reg-form').submit(function(e) {

        e.preventDefault();

        if(!isConsistPassword()) {
            $('#password-warning').show();
            return;
        }

        const account = $('#account').val();
        const password = $('#password').val();
        const schoolName = $('#school-name').val();
        const telNo = $('#tel-no').val();
        const city = $('#city').val();
        const district = $('#area').val();
        const address = $('#address').val();
        const email = $('#email').val();

        const schoolInfo = {
            school_account: account,
            pwd: password,
            school: schoolName, 
            telephone: telNo,
            address_county: city,
            address_district: district,
            address: address,
            mail: email
        }
        console.log(schoolInfo);

        $.ajax({
            type: 'POST',
            url: schoolRegApiUrl,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(schoolInfo),
            dataType: 'json',

            success: function(result) {
                console.log(result);
                if (result == 0) {
                    alert("註冊成功");
                }
            },
        });
    });  
});

function fillCities() {
    let cities = getCities();
    let count = 0;
    for (let city of cities) {
        if (count == 0) {
            $('#city').append('<option value="' + city + '" selected>' + city + '</option>');
            fillAreas(city)
        } else {
            $('#city').append('<option value="' + city + '">' + city + '</option>');
        } 
        count++;       
    }    
}

function fillAreas(city) {
    let areas = getAreas(city);
    let count = 0;
    $('#area').html("");
    for (let area of areas) {
        if (count == 0) {
            $('#area').append('<option value="' + area + '" selected>' + area + '</option>');
        } else {
            $('#area').append('<option value="' + area + '">' + area + '</option>');
        } 
        count++;       
    }        
}

function isConsistPassword(){
    if ($('#password').val() === $('#confirm').val()) {
        return true;
    }
    return false;
}
