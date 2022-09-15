const schoolRegApiUrl = 'http://140.134.24.157:53008/schoolpost';

$(document).ready(function() {
    $('#submitBtn').click(function() {
        const account = $('#validationServer01').val();
        const password = $('#validationServer02').val();
        const schoolName = $('#validationDefault03').val();
        const telNo = $('#validationDefault04').val();
        const city = $('#validationDefault05').val();
        const district = $('#validationDefault06').val();
        const address = $('#validationDefault07').val();
        const email = $('#validationDefault08').val();

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
