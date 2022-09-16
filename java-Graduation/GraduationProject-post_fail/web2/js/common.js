let serverURL = "http://140.134.24.157:53008/";

function AjaxGet(identity, callback,para) {
    $.ajax({
        type: "GET",
        url: serverURL + identity,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },

        success: function (res) {
            console.log(res,para);
            callback(res,para);
        },
        error: function (err) {
            console.log('Failed');
            console.log(serverURL);
        },
    });
    
}

function AjaxPost(identity, data, callback) {
    $.ajax({
        type: "POST",
        url: serverURL + identity,
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (res) {
            console.log(res);
            callback(res);
        },
        error: function (err) {
            console.log('Failed : ' + err.toString() );
            console.log(serverURL + identity);
        },
    });
    
}