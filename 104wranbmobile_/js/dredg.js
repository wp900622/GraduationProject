//Init
dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindDredgEvent();
}

// bind event
function bindDredgEvent() {
    bindScrollingEvent();
    getStation();
    countSpeed();
    
    $("#dredgingHistory").on("click", function(){
    	$.ajax({
	        crossDomain: true,
	        cache: false,
	        headers: { "cache-control": "no-cache" },
	        url: serviceURL+"/getWraNBData.asmx/water2Excel?callback=callback",
	        contentType: "text/html; charset=utf-8",
	        dataType: "text",
	        success: function (msg) {
	            cordova.exec(function () { }, function () { }, "InAppBrowser", "open", ['https://docs.google.com/viewer?url=' + serviceURL + '/file.xls', '_blank', 'location=no', 'closebuttoncaption=返回', 'toolbar=no']);
	        },
	        error: function (e) {
	        }
	    });
    	
    });
}

// set Scrolling event
function bindScrollingEvent() {
    $(window).scroll(function () {
        $("#sidebar-menu").removeClass("slide-in");
    });
}

// getData Function
function getStation() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getStation?type=0",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            for (var i = 0; i < msg["getStation"].length; i++) {
                $("ul[class='nav navbar-nav sidebar-menu']").append("<li " + (i == 0 ? "class='active'" : "") + " value=\"" + msg["getStation"][i]["sid"] + "\" alt=\"" + msg["getStation"][i]["name"] + "\"><a href=\"#\"><span class=\"glyphicon glyphicon-tint\"></span>" + msg["getStation"][i]["name"] + "</a></li>");

                $('#dredgingCnt' + i).countTo(
                {
                    from: 0,
                    to: msg["getStation"][i]["dredgingCnt"],
                    speed: 1500,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

                $('#dredgingCar' + i).countTo(
                {
                    from: 0,
                    to: msg["getStation"][i]["dredgingCar"],
                    speed: 1500,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

                $("#dDate").html((msg["getStation"][0]["date"].substring(0, 4) - 1911) +"年"+ msg["getStation"][0]["date"].substring(5, 10).replace("-","月")+"日");
                $("#toSecondPage" + i).attr({ value: msg["getStation"][i]["sid"], alt: msg["getStation"][i]["name"] });
                $("#toSecondPage" + i).on("click", { value: i }, function (event) {
                    goDetailPage($(this).attr("value"), $(this).attr("alt"));
                    $("ul[class='nav navbar-nav sidebar-menu']>li").eq(event.data.value).addClass("active");
                });

                getDredgingTotalMY(msg["getStation"][i]["sid"]);
            }

            $("ul[class='nav navbar-nav sidebar-menu']>li").on("click", function () {
                goDetailPage($(this).attr("value"), $(this).attr("alt"));
                $(this).addClass("active");
            });
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getDredgingTotalMY(sid) {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getDredgingTotalMY?sid=" + sid,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            $("#dredgingTotalM" + (sid - 1)).html(commafy((msg["getDredgingTotalM"][0]["dredgingCnt"] == null ? "--" : msg["getDredgingTotalM"][0]["dredgingCnt"].toFixed(0))));
            $("#dredgingTotalY" + (sid - 1)).html(commafy((msg["getDredgingTotalY"][0]["dredgingCnt"] == null ? "--" : msg["getDredgingTotalY"][0]["dredgingCnt"].toFixed(0))));
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
          
}

function goDetailPage(sid, name)
{
    $("#pageFirst").hide();
    $("#pageSecond").show();
    getDredging(sid, name);
    $("#sidebar-menu").removeClass("slide-in");
    $("ul[class='nav navbar-nav sidebar-menu']>li").removeClass("active");
    $("#btnRT").show();
    $("#btnRT").off().on("click", function () {
        $("#pageFirst").show();
        $("#pageSecond").hide();
        
        $("ul[class='nav navbar-nav sidebar-menu']>li").removeClass("active");
        $("ul[class='nav navbar-nav sidebar-menu slide-in']>li").removeClass("active");
        $("#sidebar-menu").removeClass("slide-in");

        $("#btnRT").hide();
    });
}

function getDredging(sid, name) {
    $("#a_date").html("");
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getDredging?sid=" + sid,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            $("#nameStation").html(name);
            $("#a_date").html((msg["getDredgingDaily"][0]["date"].substring(0, 4)-1911) + "年" + msg["getDredgingDaily"][0]["date"].substring(5, 7) + "月 " + msg["getDredgingDaily"][0]["date"].substring(8, 10) + "日");
            $("#textCntDredging").html(msg["getDredgingDaily"][0]["date"].substring(0, 4) - 1911);
            $("#textCarDredging").html(msg["getDredgingDaily"][0]["date"].substring(0, 4) - 1911);

            $('#cntDredging').countTo(
            {
                from: 0,
                to: msg["getDredgingDaily"][0]["dredgingCnt"],
                speed: 1500,
                refreshInterval: 50,
                onComplete: function(value) {
                    console.debug(this);
                }
            });

            $('#carDredging').countTo(
            {
                from: 0,
                to: msg["getDredgingDaily"][0]["dredgingCar"],
                speed: 1500,
                refreshInterval: 50,
                onComplete: function(value) {
                    console.debug(this);
                }
            });
            
            $('#cntTotalDredging').countTo(
            {
                from: 0,
                to: msg["getDredgingTotal"][0]["dredgingCnt"],
                speed: 1500,
                refreshInterval: 50,
                onComplete: function(value) {
                    console.debug(this);
                }
            });

            $('#carTotalDredging').countTo(
            {
                from: 0,
                to: msg["getDredgingTotal"][0]["dredgingCar"],
                speed: 1500,
                refreshInterval: 50,
                onComplete: function(value) {
                    console.debug(this);
                }
            });

            var datasetCnt = [];
            var datasetCar = [];

            for (var i = 0; i < msg["getDredgingDetail"].length; i++) {
                var dataCnt = [msg["getDredgingDetail"][i]["date"], msg["getDredgingDetail"][i]["dredgingCnt"]];
                datasetCnt.push(dataCnt);

                var dataCar = [msg["getDredgingDetail"][i]["date"], msg["getDredgingDetail"][i]["dredgingCar"]];
                datasetCar.push(dataCar);
            }

            buildchart(name, "CntDredgingDetail", datasetCnt);
            buildchart(name, "CarDredgingDetail", datasetCar);

            if (sid == 4) {
                $("span[class='DYspan car']").html("清淤時數");
                $("font[class='car']").html("年累積清淤時數統計");
            }
            else
            {
                $("span[class='DYspan car']").html("清淤車次");
                $("font[class='car']").html("年累積清淤車次統計");
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得工程設施資料", null, "系統異常");
        }
    });
}

function buildchart(name, chart, dataset) {
    var car = "車次";
    if (name == "抽泥浚渫")
        car = "時數";
    $('#chart' + chart).width($("#title"+chart).width()-10);
    $('#chart' + chart).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'category',
            labels: {
                align: 'right',
                rotation: 0,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif',
                    'letter-spacing': '-3px'
                },
                x: 5,
                y: 15
            }
        },
        yAxis: {
            labels: {
                align: 'center',
                x: -13,
                y: -0
            },
            min: 0,
            title: {
                text: (chart == "CntDredgingDetail" ? "立方公尺" : car),
                x: -18,
                y: -0
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
                    '<td style="padding:0"><b>{point.y} ' + (chart == "CntDredgingDetail" ? "立方公尺" : car) + '</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: ' ',
            color: '#8abe3f',
            data: dataset
        }]
    });
}
