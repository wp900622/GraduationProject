// params
var data;
var StockChart = [];
var date = new Date();
var timeblock0 = [];
var timeblock1 = [];
var timeblock2 = [];
var timeblock9 = [];
var maxY0 = [10, 10]; //大壩上游
var maxY1 = [10, 10]; //庫區
var maxY2 = [10, 10]; //放流口
var maxY3 = [10, 10]; //大壩下游
var maxY9 = [10, 10];
// var station = ["NW08", "NW23", "NX08", "NW17", "NW38B", "NW37", "NW31", "NW30"];
var station = ["NW08", "NW23", "NW17", "NW37", "NW31", "NW30", "NW11", "NW14", "NW33", "NW15b"];
var stationCurrentIndex = 0;
var RealTime_Station = [];
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
    getQuality();
    getQualityBao()
    getManualQuality();
    getWaterEventRec();
    getAutoLastest4App();
    getQualityRealTimeData();
    countSpeed();
    otherEvent();
}

// getData Function
function getQuality() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getQuality",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getQuality"];
            // debugger;
            $("#qualityDate").html((data[0]["info_date"].substring(0, 4) - 1911) + "年" + (data[0]["info_date"].substring(5, 7)) + "月" + (data[0]["info_date"].substring(8, 10)) + "日 " /*+ (data[0]["info_date"].substring(11, 16))*/)

            $('#bip0').css("display", getAM("NW11"));
            $('#bip1').css("display", getAM("NW12"));
            $('#bip2').css("display", getAM("NW12b"));
            $('#bip3').css("display", getAM("NW28"));
            $('#bip4').css("display", getAM("NW29"));
            $('#bip9').css("display", getAM("NX08"));
            $('#bip10').css("display", getAM("NW18"));
            $('#bip11').css("display", getAM("NW14"));
            $('#bip14').css("display", getAM("NW15b"));
            $('#bip16').css("display", getAM("NW37"));

            $('#bip23').css("display", getAM("NW30"));
            $('#bip25').css("display", getAM("NW36"));
            $('#bip26').css("display", getAM("NW35"));

            $('#at0').html(getTime("NW07"));
            $('#at1').html(getTime("NW08"));
            $('#at2').html(getTime("NW09"));
            $('#at3').html(getTime("NW24"));
            $('#at4').html(getTime("NW10"));
            $('#at5').html(getTime("NW23"));
            $('#bt0').html(getTime("NW11"));
            $('#bt1').html(getTime("NW12"));
            $('#bt2').html(getTime("NW12b"));
            $('#bt3').html(getTime("NW28"));
            $('#bt4').html(getTime("NW29"));
            $('#bt5').html(getTime("NW22"));
            $('#bt6').html(getTime("NW15"));
            $('#bt7').html(getTime("NW16"));
            $('#bt8').html(getTime("NW17"));
            $('#bt9').html(getTime("NW08"));
            $('#bt10').html(getTime("NW18"));
            $('#bt11').html(getTime("NW14"));
            $('#bt12').html(getTime("NW21"));
            $('#bt13').html(getTime("GP17"));
            $('#bt14').html(getTime("NW15b"));
            // $('#bt15').html(getTime("NW38B"));//分層取水工(石頭圳2) 要改成 NW38A 分層取水工(石頭圳1) , 資料庫有存 ?
            $('#bt15').html(getTime("NW38"));//分層取水工(石頭圳2) 要改成 NW38A 分層取水工(石頭圳1) , 資料庫有存 ?
            $('#bt16').html(getTime("NW37"));
            $('#ct0').html(getTime("NW31"));
            $('#ct1').html(getTime("NW20"));
            $('#ct2').html(getTime("NW33"));
            $('#ct3').html(getTime("NW30"));
            $('#ct4').html(getTime("NW32"));
            $('#ct5').html(getTime("NW36"));
            $('#ct6').html(getTime("NW35"));

            $('#a0').countTo(
            {
                from: 0,
                to: getField("NW07"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#a1').countTo(
            {
                from: 0,
                to: getField("NW08"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#a2').countTo(
            {
                from: 0,
                to: getField("NW09"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#a3').countTo(
            {
                from: 0,
                to: getField("NW24"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#a4').countTo(
            {
                from: 0,
                to: getField("NW10"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#a5').countTo(
            {
                from: 0,
                to: getField("NW23"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b0').countTo(
            {
                from: 0,
                to: getField("NW11"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b1').countTo(
            {
                from: 0,
                to: getField("NW12"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b2').countTo(
            {
                from: 0,
                to: getField("NW12b"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b3').countTo(
            {
                from: 0,
                to: getField("NW28"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b4').countTo(
            {
                from: 0,
                to: getField("NW29"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b5').countTo(
            {
                from: 0,
                to: getField("NW22"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b6').countTo(
            {
                from: 0,
                to: getField("NW15"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b7').countTo(
            {
                from: 0,
                to: getField("NW16"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b8').countTo(
            {
                from: 0,
                to: getField("NW17"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b9').countTo(
            {
                from: 0,
                to: getField("NX08"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b10').countTo(
            {
                from: 0,
                to: getField("NW18"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b11').countTo(
            {
                from: 0,
                to: getField("NW14"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b12').countTo(
            {
                from: 0,
                to: getField("NW21"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b13').countTo(
            {
                from: 0,
                to: getField("GP17"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b14').countTo(
            {
                from: 0,
                to: getField("NW15b"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b15').countTo(
            {
                from: 0,
                // to: getField("NW38B"),
                to: getField("NW38"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#b16').countTo(
            {
                from: 0,
                to: getField("NW37"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c0').countTo(
            {
                from: 0,
                to: getField("NW31"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c1').countTo(
            {
                from: 0,
                to: getField("NW20"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c2').countTo(
            {
                from: 0,
                to: getField("NW33"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c3').countTo(
            {
                from: 0,
                to: getField("NW30"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c4').countTo(
            {
                from: 0,
                to: getField("NW32"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c5').countTo(
            {
                from: 0,
                to: getField("NW36"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });

            $('#c6').countTo(
            {
                from: 0,
                to: getField("NW35"),
                speed: 1500,
                refreshInterval: 50,
                onComplete: function (value) {
                }
            });
            
            if (getField("GP17") >= 3000)
                $("#b13").parent().addClass("danger");
            else if (getField("GP17") >= 2000)
                $("#b13").parent().addClass("orange");
            else if (getField("GP17") >= 1000)
                $("#b13").parent().addClass("warning");
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getQualityBao() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getQualityBao",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getQualityBao1"];
            var data2 = msg["getQualityBao2"];
            var data3 = msg["getQualityBao3"];
            var data4 = msg["getQualityBao4"];

            $("#qualityDate").html((data[0]["INFO_DATE"].substring(0, 4) - 1911) + "年" + (data[0]["INFO_DATE"].substring(5, 7)) + "月" + (data[0]["INFO_DATE"].substring(8, 10)) + "日 " /*+ (data[0]["INFO_DATE"].substring(11, 16))*/)

            $('#dt0').html((data[0]["INFO_DATE"].substring(0, 4) - 1911) + "年" + (data[0]["INFO_DATE"].substring(5, 7)) + "月" + (data[0]["INFO_DATE"].substring(8, 10)) + "日 " + (data[0]["INFO_DATE"].substring(11, 16)));
            $('#dt1').html((data2[0]["INFO_DATE"].substring(0, 4) - 1911) + "年" + (data2[0]["INFO_DATE"].substring(5, 7)) + "月" + (data2[0]["INFO_DATE"].substring(8, 10)) + "日 " + (data2[0]["INFO_DATE"].substring(11, 16)));
            $('#dt2').html((data3[0]["INFO_DATE"].substring(0, 4) - 1911) + "年" + (data3[0]["INFO_DATE"].substring(5, 7)) + "月" + (data3[0]["INFO_DATE"].substring(8, 10)) + "日 " + (data3[0]["INFO_DATE"].substring(11, 16)));
            $('#dt3').html((data4[0]["INFO_DATE"].substring(0, 4) - 1911) + "年" + (data4[0]["INFO_DATE"].substring(5, 7)) + "月" + (data4[0]["INFO_DATE"].substring(8, 10)) + "日 " + (data4[0]["INFO_DATE"].substring(11, 16)));

            $('#d0').countTo(
            {
            from: 0,
            to: (data[0]["TBD"] !=null ? data[0]["TBD"] : "無資料"),
            speed: 1500,
            refreshInterval: 50,
            onComplete: function (value) {
            }
            });

            $('#d1').countTo(
            {
            from: 0,
            to: (data2[0]["TBD"] != null ? data2[0]["TBD"] : "無資料"),
            speed: 1500,
            refreshInterval: 50,
            onComplete: function (value) {
            }
            });
            //2022-04-20 移除: 寶二水庫放水口
            // $('#d2').countTo(
            // {
            // from: 0,
            // to: (data3[0]["TBD"] != null ? data3[0]["TBD"] : "無資料"),
            // speed: 1500,
            // refreshInterval: 50,
            // onComplete: function (value) {
            // }
            // });

            $('#d3').countTo(
            {
            from: 0,
            to: (data4[0]["TBD"] != null ? data4[0]["TBD"] : "無資料"),
            speed: 1500,
            refreshInterval: 50,
            onComplete: function (value) {
            }
            });
            
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getManualQuality() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getManualQuality",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {

            data = msg["getManualQuality"];
            $("#manualSite").empty();
            for (var i = 0; i < data.length; i++) {
                var dateX = "", value = "", unit = "";
                if (data[i]["info_date"] != null)
                    dateX = (data[i]["info_date"].substring(0, 4) - 1911) + "/" + (data[i]["info_date"].substring(5, 7)) + "/" + (data[i]["info_date"].substring(8, 10)) + " " + (data[i]["info_date"].substring(11, 16))

                if (data[i]["manual_status"] == "inactive") {
                    value = "";
                    unit = "尚未開始";
                }
                else if (data[i]["value"] == null && data[i]["manual_status"] == "active") {
                    value = "";
                    unit = "缺測中";
                }
                else {
                    value = data[i]["value"];
                    unit = "NTU"
                }
                $("#manualSite").append("<li href=\"#\" class=\"list-group-item font16 " + (i % 2 == 1 ? "bg-ivory font16" : "") + "\">" + data[i]["name_c"] + "<span class=\"pull-right text-primary font22\"><span>" + value + "</span> <span class=\"font14 storm-cloud\">" + unit + "</span></span><span class=\"font12\" style=\"display:block\">" + dateX + "</span></li>");

            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getWaterEventRec() {// 豪雨事件
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getWaterEventRec",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var zoneID = "";
            var z = 0;
            data = msg["getWaterEventRec"];
            $("#tab4").empty();
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    // $("#tab4").append("<h3 class=\"Dateh3-s\" style=\"margin-bottom:0px;\"><li class=\"list-group-item bg-themefourthcolor white h4\" style=\"padding:10px 0px;border-bottom-left-radius:0px;border-bottom-right-radius:0px;\"><font id=\"realtimeBao\"></font>" + data[0]["EventName"] + "</li></h3>")
                    $("#tab4").append("<h3 class=\"Dateh3-s\" style=\"margin-bottom:0px; margin-top: 10px;\"><li class=\"list-group-item bg-themefourthcolor white h4\" style=\"padding:10px 0px;border-bottom-left-radius:0px;border-bottom-right-radius:0px;\"><font id=\"realtimeBao\"></font>" + data[0]["EventName"] + "</li></h3>")
                }
                if (zoneID != data[i]["ZoneID"]) {
                    zoneID = data[i]["ZoneID"];
                    z = 0;
                    $("#tab4").append("<ul class=\"list-group width100 ZoneID" + zoneID + "\"><li class=\"list-group-item bg-themethirdcolor white h4\">" + data[i]["ZoneName"] + "</li></ul>");
                }

                $("ul[class~='ZoneID" + zoneID + "']").append("<li class=\"list-group-item font16 " + (z++ % 2 == 0 ? "" : "bg-ivory") + "\">" + data[i]["PlantName"] + "-" + data[i]["RecItemName"] + " <span class=\"pull-right text-primary font22\">" + data[i]["RecData"] + "</span><span class=\"font12\" style=\"display:block\" >" + (data[i]["RecDateTime"].substring(0, 4) - 1911) + "/" + (data[i]["RecDateTime"].substring(5, 7)) + "/" + (data[i]["RecDateTime"].substring(8, 10)) + " " + (data[i]["RecDateTime"].substring(11, 16)) + "</span></li>");
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getAutoLastest4App() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/SSC/GetSSC.asmx/GetAutoLastest4App",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var z = 0;
            for (var i = 0; i < msg.length; i++) {
                var val = msg[i]["Concentration"];
                if (val == null)
                    val = "缺測";
                else
                    val = val + " PPM";
                $("#qa" + msg[i]["ID"] + " > span").eq(0).html(val);
                $("#qa" + msg[i]["ID"] + " > span").eq(1).html((msg[i]["Time"].substring(0, 4) - 1911) + "/" + msg[i]["Time"].substring(5, 7) + "/" + msg[i]["Time"].substring(8, 10) + " " + msg[i]["Time"].substring(11, 16));
            }
            getManualLastest4App();
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getManualLastest4App() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/SSC/GetSSC.asmx/GetManualLastest4App",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var z = 0;
            for (var i = 0; i < msg.length; i++) {
                var val = msg[i]["Concentration"];
                if (val == null)
                    val = "缺測";
                else
                    val = val + " PPM";
                $("#qm" + msg[i]["ID"] + " > span").eq(0).html(val);
                $("#qm" + msg[i]["ID"] + " > span").eq(1).html((msg[i]["Time"].substring(0, 4) - 1911) + "/" + msg[i]["Time"].substring(5, 7) + "/" + msg[i]["Time"].substring(8, 10) + " " + msg[i]["Time"].substring(11, 16));
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getQualityRealTimeData()
{
    $("#btnRange").off().on("click", function () {
        $("#myTabContent").toggle();
        $("#pageSecond").toggle();
        $("#timeblock").toggle();

        station.forEach(item => {
            clearTooltip(item);
        });
    });

    $("#btnRTRealtime").off().on("click", function () {
        $("#myTabContent").toggle();
        $("#pageSecond").toggle();
        $("#timeblock").toggle();
    });

    station.forEach(item => {
        // timeblock0[item] = [];
        // timeblock1[item] = [];
        // timeblock2[item] = [];
        timeblock9[item] = [];
        // doAjax("getQualityByStation", { "sta_no": item, "minusD": 9 }, getQualityByStation)
        doAjax("getQualityByStation_New", { "sta_no": item, "minusD": 9 }, getQualityByStation)
        // debugger;
    });
   
}

function getQualityByStation(msg, params) {//即時統計
    var dataT = msg["getQualityByStation"];
    // debugger;

    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - params.minusD, 1);
    for (var i = 0; i < 24 * (params.minusD + 1); i++) {
        // // for 1 days
        // if ((i>(240-25))) {
        //     timeblock0[params.sta_no].push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        // }
        // // for 2 days
        // if ((i > (240 - 49))) {
        //     timeblock1[params.sta_no].push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        // }
        // // for 3 days
        // if ((i > (240 - 73))) {
        //     timeblock2[params.sta_no].push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        // }
        
        // for 10 days
        timeblock9[params.sta_no].push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
    }
    
    for (var x = 0; x < dataT.length; x++) {
        let d = Date.UTC(dataT[x].y, parseInt(dataT[x].m) - 1, dataT[x].d, parseInt(dataT[x].h));

        // // for 1 days
        // for (var i = 0; i < timeblock0[params.sta_no].length; i++) {
        //     if (timeblock0[params.sta_no][i][0] == d) {
        //         if (dataT[x].tbd != null) {
        //             timeblock0[params.sta_no][i][1] = parseFloat(dataT[x].tbd.toFixed(2));
        //             if (station.indexOf(params.sta_no) < 5) {
        //                 if (parseFloat(dataT[x].tbd) > maxY0[0]) {
        //                     maxY0[0] = parseFloat(dataT[x].tbd.toFixed(0));
        //                 }
        //             }
        //             else {
        //                 if (parseFloat(dataT[x].tbd) > maxY0[1]) {
        //                     maxY0[1] = parseFloat(dataT[x].tbd.toFixed(0));
        //                 }
        //             }
        //         }
        //     }
        // }

        // // for 2 days
        // for (var i = 0; i < timeblock1[params.sta_no].length; i++) {
        //     if (timeblock1[params.sta_no][i][0] == d) {
        //         if (dataT[x].tbd != null) {
        //             timeblock1[params.sta_no][i][1] = parseFloat(dataT[x].tbd.toFixed(2));
        //             if (station.indexOf(params.sta_no) < 5) {
        //                 if (parseFloat(dataT[x].tbd) > maxY1[0]) {
        //                     maxY1[0] = parseFloat(dataT[x].tbd.toFixed(0));
        //                 }
        //             }
        //             else {
        //                 if (parseFloat(dataT[x].tbd) > maxY1[1]) {
        //                     maxY1[1] = parseFloat(dataT[x].tbd.toFixed(0));
        //                 }
        //             }
        //         }
        //     }
        // }

        // // for 3 days
        // for (var i = 0; i < timeblock2[params.sta_no].length; i++) {
        //     if (timeblock2[params.sta_no][i][0] == d) {
        //         if (dataT[x].tbd != null) {
        //             timeblock2[params.sta_no][i][1] = parseFloat(dataT[x].tbd.toFixed(2));
        //             if (station.indexOf(params.sta_no) < 5) {
        //                 if (parseFloat(dataT[x].tbd) > maxY2[0]) {
        //                     maxY2[0] = parseFloat(dataT[x].tbd.toFixed(0));
        //                 }
        //             } else {
        //                 if (parseFloat(dataT[x].tbd) > maxY2[1]) {
        //                     maxY2[1] = parseFloat(dataT[x].tbd.toFixed(0));
        //                 }
        //             }
        //         }
        //     }
        // }

        // for 10 days
        for (var i = 0; i < timeblock9[params.sta_no].length; i++) {
            if (timeblock9[params.sta_no][i][0] == d) {
                if (dataT[x].tbd != null) {
                    timeblock9[params.sta_no][i][1] = parseFloat(dataT[x].tbd.toFixed(2));
                    // if (station.indexOf(params.sta_no) < 5) {
                    //     if (parseFloat(dataT[x].tbd) > maxY9[0]) {
                    //         maxY9[0] = parseFloat(dataT[x].tbd.toFixed(0));
                    //     }
                    // }
                    // else {
                    //     if (parseFloat(dataT[x].tbd) > maxY9[1]) {
                    //         maxY9[1] = parseFloat(dataT[x].tbd.toFixed(0));
                    //     }
                    // }
                    // 上限統一
                    switch (params.sta_no) {
                        case "NW08":
                        case "NW23":
                            if (parseFloat(dataT[x].tbd) > maxY0[1]) {
                                maxY0[1] = parseFloat(dataT[x].tbd.toFixed(0));
                            }
                            break;
                        
                        case "NW17":
                        case "NW11":
                        case "NW15b":
                            if (parseFloat(dataT[x].tbd) > maxY1[1]) {
                                maxY1[1] = parseFloat(dataT[x].tbd.toFixed(0));
                            }
                            break;
                                                    
                        case "NW14":
                        case "NW37":
                            if (parseFloat(dataT[x].tbd) > maxY2[1]) {
                                maxY2[1] = parseFloat(dataT[x].tbd.toFixed(0));
                            }
                            break;
                        
                        case "NW31":
                        case "NW30":
                        case "NW33":
                            if (parseFloat(dataT[x].tbd) > maxY3[1]) {
                                maxY3[1] = parseFloat(dataT[x].tbd.toFixed(0));
                            }
                            break;
                    
                        
                    }
                    
                }
            }
        }
    }

    // for (var x = dataT.length - 1; x >= 0; x--) {
    //     if (dataT[x].tbd != null) {
    //         var d = new Date(Date.UTC(dataT[x].y, parseInt(dataT[x].m) - 1, dataT[x].d, dataT[x].h));
    //         $("#sp" + params.sta_no).find("span").eq(0).html("(" + yyyy2yyy(d.toISOString()) + ")"); // 日期
    //         $("#sp" + params.sta_no).find("span").eq(1).html(dataT[x].tbd.toFixed(0)); // 數值
    //         debugger;
    //         break;
    //     }
    // }

    // 最新的時間
    dataRealTime = msg["getStationRealTime"];
    
    if (dataRealTime != null && dataRealTime.length > 0) {
        // debugger;
        RealTime_Station.push([dataRealTime[0].sta_no, dataRealTime[0].info_date]);
        var d = new Date(Date.UTC(
            dataRealTime[0].info_date.substring(0,4), 
            parseInt(dataRealTime[0].info_date.substring(5,7)) - 1 ,
            dataRealTime[0].info_date.substring(8,10), 
            dataRealTime[0].info_date.substring(11,13),
            dataRealTime[0].info_date.substring(14,16) ));
        $("#sp" + params.sta_no).find("span").eq(0).html("(" + yyyy2yyy(d.toISOString()) + ")"); // 日期
    }
    // 最新數值
    for (var x = dataT.length - 1; x >= 0; x--) {
        if (dataT[x].tbd != null) {
            $("#sp" + params.sta_no).find("span").eq(1).html(dataT[x].tbd.toFixed(0)); // 數值
            break;
        }
    }

    StockChart[params.sta_no] = Highcharts.StockChart({
        chart: {
            renderTo: 'pic' + params.sta_no,
            alignTicks: false,
            // width: 375,
            // height: 200
        },
        rangeSelector: {
            selected: 0,
            enabled: false,
            inputEnabled: false,
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 3600 * 1000,
            labels: {
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);

                    if (label.substr(label.length - 2, 2) == "01")
                        return label;
                    else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                        return label.substr(label.length - 2, 2);
                    else
                        return "";
                },
                format: '{value:%m/%d %H}',
                rotation: -45
            },
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d %H',
            },
            events: {
                setExtremes: function (e) {
                    if (typeof (e.rangeSelectorButton) !== 'undefined') {
                        //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
                    }
                }
            },
            //here
            min: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0),
            max: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0)
        },
        yAxis: [
            {
                min: 0,
                opposite: false,
                tickAmount: 3,
            }
        ],
        navigator: {
            enabled: false
        },
        series: [
            {
                name: '濁度',
                yAxis: 0,
                type: 'scatter',
                data: getCurrentTimeBlock(params.sta_no),
                point:{
                    events:{
                        click: function(){
                            this.options.x;
                            triggerOtherChart(params.sta_no , this.options.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            params.sta_no;
                            this.options.x;
                            triggerOtherChart(params.sta_no , this.options.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }

            }],

        tooltip: {
                formatter: function () {
                     // 哪個測站的時間
                     var ShowHour;
                     var ShowMinute;
                     for (let i = 0; i < RealTime_Station.length; i++) {
                         if (RealTime_Station[i][0] == params.sta_no) {
                            ShowHour =  RealTime_Station[i][1].substring(11,13);
                            ShowMinute =  RealTime_Station[i][1].substring(14,16);
                        }
                     }
                    if (this.x ==  getStationLastUtc(dataT)) {
                        return  ShowHour + ':' + ShowMinute + "/" + this.y.toFixed(1);
                    }
                    else
                    {   
                        var hour = new Date(this.x).toGMTString().substring(17,19);
                        return  hour + ':00' + "/" + this.y.toFixed(1);
                    }
                }
            }
    });

    /*
    StockChart[params.sta_no].xAxis[0].update({
        tickInterval: 3600 * 1000,
        labels: {
            step: 1,
            formatter: function () {
                var label = this.axis.defaultLabelFormatter.call(this);

                if (label.substr(label.length - 2, 2) == "01")
                    return label;
                else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                    return label.substr(label.length - 2, 2);
                else
                    return "";
            }
        }
    });

    var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0);
    var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    StockChart[params.sta_no].xAxis[0].setExtremes(chartMin, chartMax);*/
        
    if (++stationCurrentIndex == station.length) {
        station.forEach(item => {
            StockChart[item].yAxis[0].update({
                min: 0,
                max: getCurrentMaxY(item)
            });
        });
    }
}

function getField(field) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]["sta_no"] == field) {
            if (data[i]["kind"] == "M" && data[i]["info_date"] == null)
                return "缺測中";
            else
            {
                if (data[i]["tbd"] != null)
                    return data[i]["tbd"];
                else
                    return "無資料";
            }
        }
    }
    return 0;
}

function getAM(field) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]["sta_no"] == field)
            return data[i]["kind"]=="M"?"block":"none";
    }
    return 0;
}

function getTime(field) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]["sta_no"] == field) {
            if (data[i]["info_date"] != null)
                return (data[i]["info_date"].substring(0, 4) - 1911) + "/" + (data[i]["info_date"].substring(5, 7)) + "/" + (data[i]["info_date"].substring(8, 10)) + " " + (data[i]["info_date"].substring(11, 16));
            else
                return "";
        }
    }
    return 0;
}

function otherEvent()
{
    $("img[class^='qmIcon']").on("click", function () {
        var attr = $(this).attr("class").split('_');
        toMap("quality", attr[1], attr[2], attr[3])
    });

    $('.zoom_controls.zoom_controls_day a').click(function (e) {
        e.preventDefault();
        $(this).parent().children("a").removeClass('active');
        $(this).addClass('active');

        stationCurrentIndex = 0;
        var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');

        //原始機制是一次更新全部，但會導致效能很差到卡住，所以改成判斷是再哪個分類，才去更新該分類的表
        const realtimePageIdx = $("#pageSecond").find("#myTab>li[class='active']").index();
        switch (realtimePageIdx) {
            case 0:
                changeBySataion("NW08", range);
                changeBySataion("NW23", range);
                break;
            case 1:
                changeBySataion("NW17", range);
                changeBySataion("NW11", range);
                changeBySataion("NW15b", range);
                break;
            case 2:
                changeBySataion("NW14", range);
                changeBySataion("NW37", range);
                break;
            case 3:
                changeBySataion("NW31", range);
                changeBySataion("NW30", range);
                changeBySataion("NW33", range);
                break;
        }
        
        station.forEach(item => {
            clearTooltip(item);
        });
    });

       
    $("#pageSecond").find("#myTab>li").off().on('click', function(){
        defaltIndex = $("#pageSecond").find("#myTab>li").index(this);
        // nowIndex = 0: 大壩上游 , 1: 庫區 , 2: 放流口 , 3: 大壩下游
        switch (defaltIndex) {
            case 0:
                clearTooltip("NW08");
                clearTooltip("NW23");
                break;
            case 1:
                clearTooltip("NW17");
                clearTooltip("NW11");
                clearTooltip("NW15b");
                break;
            case 2:
                clearTooltip("NW14");
                clearTooltip("NW37");
                break;
            case 3:
                clearTooltip("NW31");
                clearTooltip("NW30");
                clearTooltip("NW33");
                break;
        }

        //原始機制是一次更新全部，但會導致效能很差到卡住，所以改成判斷是再哪個分類，才去更新該分類的表
        const range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
        switch (defaltIndex) {
            case 0:
                changeBySataion("NW08", range);
                changeBySataion("NW23", range);
                break;
            case 1:
                changeBySataion("NW17", range);
                changeBySataion("NW11", range);
                changeBySataion("NW15b", range);
                break;
            case 2:
                changeBySataion("NW14", range);
                changeBySataion("NW37", range);
                break;
            case 3:
                changeBySataion("NW31", range);
                changeBySataion("NW30", range);
                changeBySataion("NW33", range);
                break;
        }
    })    
        
    //#endregion 
    
}

function getCurrentMaxY(item)
{
    var maxY = 10;
    // var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
    // switch (range) {
    //     case "1d":
    //         if (station.indexOf(item) < 5)
    //             maxY = maxY0[0];
    //         else
    //             maxY = maxY0[1];
    //         break;
    //     case "2d":
    //         if (station.indexOf(item) < 5)
    //             maxY = maxY1[0];
    //         else
    //             maxY = maxY1[1];
    //         break;
    //     case "3d":
    //         if (station.indexOf(item) < 5)
    //             maxY = maxY2[0];
    //         else
    //             maxY = maxY2[1];
    //         break;
    //     case "10d":
    //         if (station.indexOf(item) < 5)
    //             maxY = maxY9[0];
    //         else
    //             maxY = maxY9[1];
    //         break;
    //     default:
    //         break;
    // }
    switch (item) {
        case "NW08":
        case "NW23":
            maxY = maxY0[1];
            break;
        
        case "NW17":
        case "NW11":
        case "NW15b":
            maxY = maxY1[1];
            break;
                                    
        case "NW14":
        case "NW37":
            maxY = maxY2[1];
            break;
        
        case "NW31":
        case "NW30":
        case "NW33":
            maxY = maxY3[1];
            break;
    
        
    }

    // if (station.indexOf(item) < 5){

    //     maxY = maxY9[0];
    // }
    //  else{

    //     maxY = maxY9[1];
    //  }

    return maxY;
}

function getCurrentTimeBlock(sta_no) {
    var timeblock = [];
    var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
    // switch (range) {
    //     case "1d":
    //         timeblock = timeblock0[sta_no];
    //         break;
    //     case "2d":
    //         timeblock = timeblock1[sta_no];
    //         break;
    //     case "3d":
    //         timeblock = timeblock2[sta_no];
    //         break;
    //     case "10d":
    //         timeblock = timeblock9[sta_no];
    //         break;
    //     default:
    //         break;
    // }
    timeblock = timeblock9[sta_no];

    return timeblock;
}

function toMap(type, site, x, y) {
    location.href = "00_Map.html?type=" + type + "&site=" + site + "&x=" + x + "&y=" + y;
}

function getStationLastUtc(dataT){
   var utcHour_Next = Date.UTC(
       parseInt(dataT[dataT.length-1].y), 
       parseInt(dataT[dataT.length-1].m) - 1, 
       parseInt(dataT[dataT.length-1].d), 
       parseInt(dataT[dataT.length-1].h)); //下小時
   return utcHour_Next;
}

function triggerOtherChart(pic, point){
    // console.log('triggerOtherChart');
    var t = new Date(point - ( 8 * 3600 * 1000 ));
    var ShowDate = `${t.getFullYear()}/${(t.getMonth()+1).toString().padStart(2,"0")}/${t.getDate().toString().padStart(2,"0")}/  ${t.getHours().toString().padStart(2,"0")} : ${t.getMinutes().toString().padStart(2,"0")}`
    // console.log(pic +' :　'+ ShowDate);
    switch (pic) {
        //大壩上游
        case "NW08":
            picTigger("NW23", point);//霞雲
            break;
        case "NW23":
            picTigger("NW08", point);//玉峰
            break;
        //庫區
        case "NW17":
            picTigger("NW11", point);//羅浮 
            picTigger("NW15b", point);//壩前浮台
            break;
        case "NW11":
            picTigger("NW17", point);//電廠取水塔
            picTigger("NW15b", point);//壩前浮台
            break;
        case "NW15b":
            picTigger("NW17", point);//電廠取水塔
            picTigger("NW11", point);//羅浮 
            break;
        //放流口
        case "NW14":
            picTigger("NW37", point);
            break;
        case "NW37":
            picTigger("NW14", point);
            break;
        //大壩下游
        case "NW31":
            picTigger("NW30", point);
            picTigger("NW33", point);
            break;
        case "NW30":
            picTigger("NW31", point);
            picTigger("NW33", point);
            break;
        case "NW33":
            picTigger("NW31", point);
            picTigger("NW30", point);
            break;
    }
}

function picTigger(pic, pointX){
    var Picdata = StockChart[pic];
    var val = null;
    var flag = true;
    for (let i = 0;  i < Picdata.series[0].points.length; i++) {
        val =  Picdata.series[0].points[i].y;
        if (val !== null && pointX == Picdata.series[0].points[i].x) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([Picdata.series[0].points[i]]);
            flag = false;
            break;
        }
    }

    if (flag) {
        for (let i = 0; i <  Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
        }
        Picdata.tooltip.hide();
    }
}

function clearTooltip(pic){
    var Picdata = StockChart[pic];
    for (let i = 0; i <  Picdata.series[0].points.length; i++) {
        Picdata.series[0].points[i].setState('');
        Picdata.series[0].points[i].state = '';// You need this to fix hover bug
    }
    Picdata.tooltip.hide();
}

function changeBySataion(item, range){
    switch(range){
        case "2d":
            var d1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() -1, 0);
            var d2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() +1, 0);
               
                StockChart[item].xAxis[0].setExtremes(d1, d2);
                StockChart[item].xAxis[0].update({
                    tickInterval: 3600 * 1000,
                    labels: {
                        step: 1,
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            if (label.substr(label.length - 2, 2) == "01")
                                return label;
                            else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                                return label.substr(label.length - 2, 2);
                            else
                                return "";
                        }
                    }
                });
            break;
         case "3d":
                var d1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() -2, 0);
                var d2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() +1, 0);
                
                StockChart[item].xAxis[0].setExtremes(d1, d2);
                StockChart[item].xAxis[0].update({
                    tickInterval: 3600 * 1000,
                    labels: {
                        step: 1,
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            if (label.substr(label.length - 2, 2) == "01")
                                return label;
                            else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                                return label.substr(label.length - 2, 2);
                            else
                                return "";
                        }
                    }
                });
            break;
         case "1d":
                var d1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() , 0);
                var d2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() +1, 0);
                
                StockChart[item].xAxis[0].setExtremes(d1, d2);
                StockChart[item].xAxis[0].update({
                    tickInterval: 3600 * 1000,
                    labels: {
                        step: 1,
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            if (label.substr(label.length - 2, 2) == "01")
                                return label;
                            else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                                return label.substr(label.length - 2, 2);
                            else
                                return "";
                        }
                    }
                });
                
            break;
        case "10d":
                var d1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() -9, 0);
                var d2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() +1, 0);
                
                StockChart[item].xAxis[0].setExtremes(d1, d2);
                StockChart[item].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 1,
                        formatter: function () {
                            var label = this.axis.defaultLabelFormatter.call(this);
                            return label;
                        }
                    }
                });
            break;
    }
}