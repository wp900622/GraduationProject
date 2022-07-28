dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
}

function bindEvent() {
    $("input[name='login-submit']").on("click", function () {
        chkLogin();
    });

    window.addEventListener("message", function (event) {
        $.isLoading("hide");
        if (event.data == "200") {
            if ($("#chkData").is(":checked")) {
                window.localStorage.setItem("userid", $("input[name='username']").val());
                window.localStorage.setItem("userpass", $("input[name='password']").val());
            }
            else {
                window.localStorage.setItem("userid", "");
                window.localStorage.setItem("userpass", "");
            }
            location.href = "02_WaterRegimen-02.html";
        }
        else
            alert("您的帳號或密碼錯誤");
    });

    $("input[name='password']").keypress(function (e) {
        if (e.which == 13) {
            chkLogin();
            return false;
        }
    });

    detectCookie();
}

function chkLogin() {
    if ($("input[name='username']").val() == "")
        alert("請填帳號");
    else if ($("input[name='password']").val() == "")
        alert("請填密碼");
    else {
        /*
        var ifr = $('<iframe/>', {
        id: 'MainIframe',
        src: serviceURL + "/index.asmx/verifyAD?callback=a&id=" + $("input[name='username']").val() + "&pass=" + $("input[name='password']").val(),
        load: function (e) {
        //alert(e);
        }
        });
        $('body').append(ifr);
        */
        $.isLoading({ text: "驗證中..." });

        $("iframe").attr("src", "http://140.134.48.13/wranbmobile104/getWraNBData.asmx/verifyAD?callback=a&id=" + $("input[name='username']").val() + "&pass=" + $("input[name='password']").val());
    }
}

function detectCookie() {
    $("input[name='username']").val(window.localStorage.getItem("userid"));
    $("input[name='password']").val(window.localStorage.getItem("userpass"));
}