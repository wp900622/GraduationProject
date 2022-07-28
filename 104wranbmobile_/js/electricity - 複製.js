// params

//Init
dynamicScriptByOS();
var templatePower;
var templateWater;

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
    reloadData();
}

// bind event
function bindEvent()
{
    $("#myTab>li").off().on("click", function () {
        /*
        if($(this).find("a").attr("id")=="tab3-tab")
        {
            $("#a_date").hide();
            $("#c_date").hide();
            $("#b_date").show();
        }
        else if($(this).find("a").attr("id")=="tab4-tab" || $(this).find("a").attr("id")=="tab5-tab")
        {
            $("#a_date").hide();
            $("#b_date").hide();
            $("#c_date").show();
            $("#c_date").html(getCurrentDate());
        }
        else
        {
            $("#b_date").hide();
            $("#c_date").hide();
            $("#a_date").show();
        }*/
    });

    $("#sSDateText").off().on("click", function () {
        $('#sSDate').datetimepicker('show');
    });

    $("#sEDateText").off().on("click", function () {
        $('#sEDate').datetimepicker('show');
    });

    $("#search").off().on("click", function () {
        if ($('#sSDateText').val() == "" || $('#sEDateText').val() == "")
            alert("請選擇日期");
        else
        {
            $("#btnSearch").click();
            $("#b_date").html($('#sSDateText').val() + "~" + $('#sEDateText').val());
            doAjax("getElectricityDataTotalAnalysis", { 'sDate': $('#sSDateText').val().replace("年", "-").replace("月", "-").replace("日", "-"), 'eDate': $('#sEDateText').val().replace("年", "-").replace("月", "-").replace("日", "-") }, getElectricityDataTotalAnalysis);
            $("#pageFirst").hide();
            $("#pageSecond").show();
        }
    });

    $("#btnRT").off().on("click", function () {
        $("#pageSecond").hide();
        $("#pageFirst").show();
    });

    $("#clear").off().on("click", function () {
        $('#sSDateText').val("");
        $('#sEDateText').val("");
    });

    $('#sSDate').datetimepicker({
        lang: 'ch',
        timepicker: false,
        onGenerate: function (ct) {
            //$(this).find('.xdsoft_date.xdsoft_weekend')
            //    .addClass('xdsoft_disabled');
        },
        format: 'Y-m-d',
        //minDate: '-1970/01/07', // yesterday is minimum date
        //maxDate: '+1970/01/02', // and tommorow is maximum date calendar
        onSelectDate: function (ct, $i) {
            $("#sSDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
            $("#sEDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
        }
    });
    

    $("#sEDate").datetimepicker({
        lang: 'ch',
        timepicker: false,
        onGenerate: function (ct) {
            //$(this).find('.xdsoft_date.xdsoft_weekend')
            //    .addClass('xdsoft_disabled');
        },
        format: 'Y-m-d',
        //minDate: '-1970/01/07', // yesterday is minimum date
        //maxDate: '+1970/01/02', // and tommorow is maximum date calendar
        onSelectDate: function (ct, $i) {
            $("#sEDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
        }
    });

    templatePower = [$("#templatePower0").html(), $("#templatePower1").html(), $("#templatePower2").html()];
    templateWater = [$("#templateWater0").html(), $("#templateWater1").html(), $("#templateWater2").html()];

    setInterval(reloadData, 60 * 1000);
}

function reloadData()
{
    $("#currentDate").html(getCurrentDate());
    $("#currentTime").html(getCurrentTime());
    
    doAjax("getElectricityData", "", getElectricityData);
    doAjax("getElectricityStationData", { 'station_id': '0' }, getElectricityStationData);
    doAjax("getElectricityStationData", { 'station_id': '1' }, getElectricityStationData);
    doAjax("getElectricityStationData", { 'station_id': '2' }, getElectricityStationData);

    doAjax("getElectricityDataAnalysis", { 'station_id': '0' }, getElectricityDataAnalysis);
    doAjax("getElectricityDataAnalysis", { 'station_id': '1' }, getElectricityDataAnalysis);
    doAjax("getElectricityDataAnalysis", { 'station_id': '2' }, getElectricityDataAnalysis);

    countSpeed();
}

// getData Function
function getElectricityData(msg) {
    var dataD = msg["getElectricityDataD"];
    var dataM = msg["getElectricityDataM"];
    var dataY = msg["getElectricityDataY"];

    $("#powerT").countTo(
    {
        from: 0,
        to: mwtoDegree(dataD[0]["power_gen"]),
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });

    $("#powerM").countTo(
    {
        from: 0,
        to: mwtoDegree(dataM[0]["power_gen"]),
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });

    $("#powerY").countTo(
    {
        from: 0,
        to: mwtoDegree(dataY[0]["power_gen"]),
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });
}


function getElectricityStationData(msg, param) {
    var totalPowerTime = 0;
    var avgWater = 0;

    var dataTimeWater = msg["getElectricityStationData"];



    $("#templatePower" + param.station_id).empty();
    $("#templateWater" + param.station_id).empty();

    for (var i = 0; i < dataTimeWater.length; i++) {
        $("#templatePower" + param.station_id).append(templatePower[param.station_id]);
        $(".group_count" + +param.station_id + " > font").eq(0).html(getTimePart(dataTimeWater[i]["sTime"]));
        $(".group_count" + +param.station_id + " > font").eq(1).html(getTimePart(dataTimeWater[i]["eTime"]));
        $(".group_count" + +param.station_id + " > span > span").html(countTime(parseFloat(dataTimeWater[i]["total_time"])));
        $(".group_count" + +param.station_id + "").attr("class", "group_count" + +param.station_id + "_" + i);
        totalPowerTime += parseFloat(dataTimeWater[i]["total_time"]);


        $("#templateWater" + param.station_id).append(templateWater[param.station_id]);
        $(".group_countW" + +param.station_id + " > font").eq(0).html(getTimePart(dataTimeWater[i]["sTime"]));
        $(".group_countW" + +param.station_id + " > font").eq(1).html(getTimePart(dataTimeWater[i]["eTime"]));
        $(".group_countW" + +param.station_id + " > span > span").html((parseFloat(dataTimeWater[i]["water_use"]) / parseFloat(dataTimeWater[i]["total_time"])).toFixed(2) + " <span class=\"font14\">cms</span>");
        $(".group_countW" + +param.station_id + "").attr("class", "group_countW" + +param.station_id + "_" + i);
        avgWater += parseFloat(dataTimeWater[i]["water_use"]);
    }

    $("#totalPowerTime" + +param.station_id).html(countTime(totalPowerTime));
    if (dataTimeWater.length > 0)
        avgWater = (avgWater / totalPowerTime).toFixed(2);
    else
        avgWater = 0;
    $("#avgWater" + +param.station_id).html(avgWater + " <span class=\"font14\">cms</span>");
}

function getElectricityDataAnalysis(msg, param)
{
    var dataPowerD = msg["getElectricityDataAnalysisD"];
    var dataPowerM = msg["getElectricityDataAnalysisM"];
    var dataPowerY = msg["getElectricityDataAnalysisY"];
    var dataPowerWD = msg["getElectricityDataAnalysisWD"];
    var dataPowerWM = msg["getElectricityDataAnalysisWM"];
    var dataPowerWY = msg["getElectricityDataAnalysisWY"];

    var powergenTotalD = 0;
    var powergenTotalM = 0;
    var powergenTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];
    var timeblockDWV = [];

    var timeblockM = [];
    var timeblockMPV = [];
    var timeblockMWV = [];

    var timeblockY = [];
    var timeblockYPV = [];
    var timeblockYWV = [];

    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i, 2));
        timeblockDPV.push(null);
        timeblockDWV.push(null);
    }

    for (var i = 0; i < dataPowerD.length; i++) {
        powergenTotalD += mwtoDegree(dataPowerD[i].power_gen);
        timeblockDPV[parseInt(dataPowerD[i].dTime)] = parseFloat(mwtoDegree(dataPowerD[i].power_gen).toFixed(1));
    }

    for (var i = 0; i < dataPowerWD.length; i++) {
        timeblockDWV[parseInt(dataPowerWD[i].dTime)] = dataPowerWD[i].WaterLine;
    }


    // month
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;

    var days = daysInMonth(currentMonth, currentYear);
    for (var i = 1; i <= days; i++) {
        timeblockM.push(leftPad(i, 2));
        timeblockMPV.push(null);
    }

    for (var i = 0; i < dataPowerM.length; i++) {
        powergenTotalM += mwtoDegree(dataPowerM[i].power_gen);
        timeblockMPV[parseInt(dataPowerM[i].dTime) - 1] = parseFloat(mwtoDegree(dataPowerM[i].power_gen).toFixed(1));
    }

    for (var i = 0; i < dataPowerWM.length ; i++) {
        timeblockMWV.push(dataPowerWM[i].SM_LEVEL);
    }

    // year

    for (var i = 0; i < dataPowerY.length; i++) {
        powergenTotalY += mwtoDegree(dataPowerY[i].power_gen);
        timeblockYPV.push([Date.UTC(dataPowerY[i].dTime.substring(0, 4), parseInt(dataPowerY[i].dTime.substring(5, 7)) - 1, dataPowerY[i].dTime.substring(8, 10)), parseFloat(mwtoDegree(dataPowerY[i].power_gen).toFixed(1))]);
    }

    for (var i = 0; i < dataPowerWY.length; i++) {
        timeblockYWV.push([Date.UTC(dataPowerWY[i].dTime.substring(0, 4), parseInt(dataPowerWY[i].dTime.substring(5, 7)) - 1, dataPowerWY[i].dTime.substring(8, 10)), dataPowerWY[i].SM_LEVEL]);
    }

    $(".powergenTotalD" + param.station_id).countTo(
    {
        from: 0,
        to: powergenTotalD,
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });

    $(".powergenTotalM" + param.station_id).countTo(
    {
        from: 0,
        to: powergenTotalM,
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });

    $(".powergenTotalY" + param.station_id).countTo(
    {
        from: 0,
        to: powergenTotalY,
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });

    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    $('#stationD' + param.station_id).highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: timeblockD,
            crosshair: true,
        }],
        yAxis: [{ // Secondary yAxis
            /*title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            },
            max: 250,
            min: 215,
            opposite: true*/
        },{ // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            min: 0
        }],
        tooltip: {
            shared: true
        },
        series: [
        {
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockDPV,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*,
        {
            name: '水位',
            type: 'spline',
            data: timeblockDWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });

    $('#stationM' + param.station_id).highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: timeblockM,
            crosshair: true
        }],
        yAxis: [{ // Secondary yAxis
            /*title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            },
            max: 250,
            min: 215,
            opposite: true*/
        }, { // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }],
        tooltip: {
            shared: true
        },
        series: [{
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockMPV,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*, {
            name: '水位',
            type: 'spline',
            data: timeblockMWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });

    // create the chart
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationY'+param.station_id,
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            inputEnabled: false,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1月'
            }, {
                type: 'month',
                count: 3,
                text: '3月'
            }, {
                type: 'month',
                count: 6,
                text: '6月'
            }, {
                type: 'ytd',
                text: '至本日'
            },{
                type: 'all',
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
        xAxis:{
        	type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%m/%d',
        	}
        },
        yAxis: [
        {/* // Secondary yAxis
            title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            }*/
        },
        { // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite:false
        }],

        navigator: {
            enabled: false
        },

        series: [
        {
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*,
        {
            name: '水位',
            type: 'spline',
            data: timeblockYWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });
}

function getElectricityDataTotalAnalysis(msg, param)
{
    var data = msg["getElectricityDataTotalAnalysis"];
    var data0 = msg["getElectricityDataTotalAnalysis0"];
    var data1 = msg["getElectricityDataTotalAnalysis1"];
    var data2 = msg["getElectricityDataTotalAnalysis2"];
    var dataWater = msg["getElectricityDataTotalAnalysisWater"];

    var timeblockYPV = [];
    var timeblockYPV0 = [];
    var timeblockYPV1 = [];
    var timeblockYPV2 = [];
    var timeblockYWV = [];

    for (var i = 0; i < data.length; i++) {
        timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10)), parseFloat(mwtoDegree(data[i].power_gen).toFixed(1))]);
    }

    for (var i = 0; i < data0.length; i++) {
        timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(mwtoDegree(data0[i].power_gen).toFixed(1))]);
    }

    for (var i = 0; i < data1.length; i++) {
        timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(mwtoDegree(data1[i].power_gen).toFixed(1))]);
    }

    for (var i = 0; i < data2.length; i++) {
        timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(mwtoDegree(data2[i].power_gen).toFixed(1))]);
    }

    for (var i = 0; i < dataWater.length; i++) {
        timeblockYWV.push([Date.UTC(dataWater[i].dTime.substring(0, 4), parseInt(dataWater[i].dTime.substring(5, 7)) - 1, dataWater[i].dTime.substring(8, 10)), dataWater[i].SM_LEVEL]);
    }

    Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            inputEnabled: false,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1月'
            }, {
                type: 'month',
                count: 3,
                text: '3月'
            }, {
                type: 'month',
                count: 6,
                text: '6月'
            }, {
                type: 'ytd',
                text: '至本日'
            }, {
                type: 'all',
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
		xAxis:{
        	type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%m/%d',
        	}
        },
        yAxis: [{ // Secondary yAxis
           /* title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            }*/
        },
        { // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: false
        }],

        navigator: {
            enabled: false
        },

        series: [{
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*, {
            name: '水位',
            type: 'spline',
            data: timeblockYWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });

    Highcharts.StockChart({
        chart: {
            renderTo: 'search0',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            inputEnabled: false,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1月'
            }, {
                type: 'month',
                count: 3,
                text: '3月'
            }, {
                type: 'month',
                count: 6,
                text: '6月'
            }, {
                type: 'ytd',
                text: '至本日'
            }, {
                type: 'all',
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
		xAxis:{
        	type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%m/%d',
        	}
        },
        yAxis: [{ // Secondary yAxis
           /* title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            }*/
        },
        { // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: false
        }],

        navigator: {
            enabled: false
        },

        series: [{
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV0,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*, {
            name: '水位',
            type: 'spline',
            data: timeblockYWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });

    Highcharts.StockChart({
        chart: {
            renderTo: 'search1',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            inputEnabled: false,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1月'
            }, {
                type: 'month',
                count: 3,
                text: '3月'
            }, {
                type: 'month',
                count: 6,
                text: '6月'
            }, {
                type: 'ytd',
                text: '至本日'
            }, {
                type: 'all',
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
		xAxis:{
        	type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%m/%d',
        	}
        },
        yAxis: [{ // Secondary yAxis
            /*title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            }*/
        },
        { // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: false
        }],

        navigator: {
            enabled: false
        },

        series: [{
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV1,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*, {
            name: '水位',
            type: 'spline',
            data: timeblockYWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });

    Highcharts.StockChart({
        chart: {
            renderTo: 'search2',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            inputEnabled: false,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1月'
            }, {
                type: 'month',
                count: 3,
                text: '3月'
            }, {
                type: 'month',
                count: 6,
                text: '6月'
            }, {
                type: 'ytd',
                text: '至本日'
            }, {
                type: 'all',
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
		xAxis:{
        	type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%m/%d',
        	}
        },
        yAxis: [{ // Secondary yAxis
           /* title: {
                text: ''
            },
            labels: {
                format: '{value}m'
            }*/
        },
        { // Primary yAxis
            labels: {
                format: '{value}萬度',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: false
        }],

        navigator: {
            enabled: false
        },

        series: [{
            name: '發電量',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV2,
            tooltip: {
                valueSuffix: ' 萬度'
            }

        }/*, {
            name: '水位',
            type: 'spline',
            data: timeblockYWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
    });
}

function getTimePart(time)
{
    var h = leftPad(time.substring(11, 13),2);
    var m = leftPad(time.substring(14, 16),2);
    return h+"時"+m+"分"
}

function countTime(m)
{
    var h = m / 60;
    var m = m % 60;
    if (h > 0)
        return leftPad(String(Math.floor(h)), 2) + "<span class=\"font14\"> hr </span>" + leftPad(String(m), 2) + "<span class=\"font14\"> min </span>";
    else
        return m + "分";
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function mwtoDegree(value)
{
    return ((value / 60) * 1000)/10000;
}