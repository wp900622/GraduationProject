// params
var data;

//Init
dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
}

// bind event
function bindEvent() {
    doAjax("getEarthQuake", { 'day': '30', 'site': 'Shimen' }, getEarthQuake);

    $("#tab1-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "./img/Earthquake_img.jpg");
        doAjax("getEarthQuake", {'day':'30', 'site':'Shimen'}, getEarthQuake);
    });

    $("#tab2-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "./img/Earthquake2_img.jpg");
        $("div[class='Earthquake_img'] > img").eq(1).attr("src", "");
        doAjax("getEarthQuake", { 'day': '30', 'site': 'Bao' }, getEarthQuake);
    });

    $("#tab3-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "./img/Earthquake3_img.jpg");
        $("div[class='Earthquake_img'] > img").eq(1).attr("src", "");
        doAjax("getEarthQuake", { 'day': '30', 'site': 'Ronghuaba' }, getEarthQuake);
    });

    $("#tab4-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "./img/Earthquake4_img.jpg");
        $("div[class='Earthquake_img'] > img").eq(1).attr("src", "");
        doAjax("getEarthQuake", { 'day': '30', 'site': 'Yixing' }, getEarthQuake);
    });

    $("#tab5-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "./img/Earthquake5_img.jpg");
        $("div[class='Earthquake_img'] > img").eq(1).attr("src", "./img/Earthquake52_img.jpg");
        doAjax("getEarthQuake", { 'day': '30', 'site': 'Zhongzhuang' }, getEarthQuake);
    });

    $("#tab6-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "./img/Earthquake6_img.jpg");
        $("div[class='Earthquake_img'] > img").eq(1).attr("src", "");
        doAjax("getEarthQuake", { 'day': '30', 'site': 'LuoDongyu' }, getEarthQuake);
    });

    $("#tab7-tab").parent().off().on("click", function () {
        $("div[class='Earthquake_img'] > img").eq(0).attr("src", "");
        $("div[class='Earthquake_img'] > img").eq(1).attr("src", "");
        doAjax("getEarthquakeFromCWB", { 'day': '30', 'site': 'CWB' }, getEarthquakeFromCWB);
    });

    $("#bk2Earthquake").off().on("click", function () {
        $("#pageFirst").show();
        $("#pageSecond").hide();
    });
    
}

// getData Function
function getEarthQuake(msg) {
    $("#earthquakeSite").empty();
    for (var i = 0; i < msg["getEarthQuake"].length; i++) {
        var earthQuakeSite = "";
        switch (msg["getEarthQuake"][i]["InstID"]) {
            
            case 315:
                earthQuakeSite = "SE01-左山脊(自由場)";
                break;
            case 316:
                earthQuakeSite = "SE02-壩頂(拋石坡)";
                break;
            case 317:
                earthQuakeSite = "SE03-右山脊(嵩台)";
                break;
            case 318:
                earthQuakeSite = "SE04-壩底(15米廊道)";
                break;
            case 319:
                earthQuakeSite = "SE05-監測廊道(溢洪道底層)";
                break;
            case 401:
                earthQuakeSite = "RE01-上層";
                break;
            case 402:
                earthQuakeSite = "RE02-下層(廊道)";
                break;
            case 501:
                earthQuakeSite = "IE01-上層排水廊道";
                break;
            case 502:
                earthQuakeSite = "IE02-中層排水廊道";
                break;
            case 503:
                earthQuakeSite = "IE03-底層排水廊道";
                break;
            case 601:
                earthQuakeSite = "E-1-壩頂";
                break;
            case 602:
                earthQuakeSite = "E-2-壩下游右側自由場";
                break;
            case 701:
                earthQuakeSite = "LE01-機房地下2樓";
                break;
            case 801:
                earthQuakeSite = "CE01-中庄調整池輸水路";
                break;
            case 802:
                earthQuakeSite = "CE02-中庄攔河堰堤岸";
                break;
            case 803:
                earthQuakeSite = "CE03-中庄調整池引水路";
                break;
        }

        var html = $("<li href=\"#\" class=\"list-group-item font16\">" + earthQuakeSite + " <span class=\"pull-right text-primary font22\"><span style=\"position:relative;top:8px;\">" + msg["getEarthQuake"][i]["MagnitudeMax"] + "</span> <span class=\"font14 storm-cloud\" style=\"position:relative;top:5px;\">級</span><span class=\"pull-right darkgray glyphicon glyphicon-chevron-right\" style=\"top:10px;\"></span></span><span id=\"bt0\" class=\"font12\" style=\"display:block\">" + (msg["getEarthQuake"][i]["EqStartTime"].substring(0, 4) - 1911) + "/" + msg["getEarthQuake"][i]["EqStartTime"].substring(5, 7) + "/" + msg["getEarthQuake"][i]["EqStartTime"].substring(8, 10) + " " + msg["getEarthQuake"][i]["EqStartTime"].substring(11, 16) + "</span></li>");
        html.on("click", { qid: msg["getEarthQuake"][i]["qid"], name: earthQuakeSite }, function (event) {
            doAjax("getEarthQuakeDetail", {qid:event.data.qid}, getEarthQuakeDetail);
            $("#earthquakeSiteName").html(event.data.name);
            $("#pageFirst").hide();
            $("#pageSecond").show();
        });
        $("#earthquakeSite").append(html);
    }
}

function getEarthquakeFromCWB(msg) {
    $("#earthquakeSite").empty();
    for (var i = 0; i < msg["getEarthquakeFromCWB"].length; i++) {
        var html = $("<li href=\"#\" class=\"list-group-item font16\">" + msg["getEarthquakeFromCWB"][i]["location"] + " <span class=\"pull-right text-primary font22\"><span style=\"position:relative;top:8px;\">芮氏規模 " + msg["getEarthquakeFromCWB"][i]["magnitudeValue"] + "</span> <span class=\"font14 storm-cloud\" style=\"position:relative;top:5px;\"></span><span class=\"pull-right darkgray glyphicon glyphicon-chevron-right\" style=\"top:10px;\"></span></span><span id=\"bt0\" class=\"font12\" style=\"display:block\">" + (msg["getEarthquakeFromCWB"][i]["originTime"].substring(0, 4) - 1911) + "/" + msg["getEarthquakeFromCWB"][i]["originTime"].substring(5, 7) + "/" + msg["getEarthquakeFromCWB"][i]["originTime"].substring(8, 10) + " " + msg["getEarthquakeFromCWB"][i]["originTime"].substring(11, 16) + "</span></li>");
        html.on("click", { url: msg["getEarthquakeFromCWB"][i]["reportImageURI"] }, function (event) {
            //alert(event.data.url);
            openLink(event.data.url);
            //$("#earthquakeSiteName").html(event.data.name);

        });
        $("#earthquakeSite").append(html);
    }
}

function getEarthQuakeDetail(msg) {
    $("#EqStartTime").html((msg["getEarthQuakeDetail"][0]["EqStartTime"].substring(0, 4) - 1911) + "年" + msg["getEarthQuakeDetail"][0]["EqStartTime"].substring(5, 7) + "月" + msg["getEarthQuakeDetail"][0]["EqStartTime"].substring(8, 10) + "日" + msg["getEarthQuakeDetail"][0]["EqStartTime"].substring(11, 19));
    $("#EqEndTime").html((msg["getEarthQuakeDetail"][0]["EqEndTime"].substring(0, 4) - 1911) + "年" + msg["getEarthQuakeDetail"][0]["EqEndTime"].substring(5, 7) + "月" + msg["getEarthQuakeDetail"][0]["EqEndTime"].substring(8, 10) + "日" + msg["getEarthQuakeDetail"][0]["EqEndTime"].substring(11, 19));
    $("#MagnitudeMax").html(msg["getEarthQuakeDetail"][0]["MagnitudeMax"]);
    $("#PGAX").html(msg["getEarthQuakeDetail"][0]["PGAX"]);
    $("#PGAY").html(msg["getEarthQuakeDetail"][0]["PGAY"]);
    $("#PGAZ").html(msg["getEarthQuakeDetail"][0]["PGAZ"]);
    $("#PGAMax").html(msg["getEarthQuakeDetail"][0]["PGAMax"]);
    $("#Seismogram").attr("src", serviceURL + "/earthquake/" + msg["getEarthQuakeDetail"][0]["Seismogram"]);
}

function getDredging(msg) {
    var t = msg["getDredging"][0]["DataDateTime"];
    $("div[class~='TimeBox']").html(t.substring(0, 3) + "/" + t.substring(3, 5) + "/" + t.substring(5, 7) + t.substring(7, 13));

    for (var i = 0; i < msg["getDredging"].length; i++) {
        var today = new Date();
        var dStr = (parseInt(msg["getDredging"][i]["DataDateTime"].substring(0, 3)) + 1911) + "/" + msg["getDredging"][i]["DataDateTime"].substring(3, 5) + "/" + msg["getDredging"][i]["DataDateTime"].substring(5, 7) + " " + msg["getDredging"][i]["DataDateTime"].substring(8, 13);
        var dTime = new Date(dStr);
        var diffMs = (dTime - today);
        $("span[class~='dredging" + msg["getDredging"][i]["ST_NO"] + "']").parent().parent().find("div[class*='dDetail1']").attr("sid", msg["getDredging"][i]["SID"]);
        if (Math.abs(diffMs) <= 1000 * 60 * 30) {
            $("span[class~='dredging" + msg["getDredging"][i]["ST_NO"] + "']").html(msg["getDredging"][i]["TURB"]);
        }
        else {
            $("span[class~='dredging" + msg["getDredging"][i]["ST_NO"] + "']").parent().html("<font style='color:red;font-size:20px;'>資料中斷</font>");
        }
    }
}

function openLink(url) {
    cordova.exec(function () { }, function () { }, "InAppBrowser", "open", [url, '_blank', 'location=yes,closebuttoncaption=返回,toolbar=yes']);
}
