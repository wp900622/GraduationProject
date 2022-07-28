// params

//Init
dynamicScriptByOS();
var templatePower;
var templateWater;
var StockChart = [];
var xIndex = 98;
var xCountDays = 0;
var showTotal = [];        //  連動顯示 - 合計
var showTotalShemen1 = []; //  連動顯示
var showTotalShemen2 = []; //  連動顯示
var showTotalYishin = [];  //  連動顯示
var showRecountVal =0;     //  連動顯示
var showTabIndex = "";     //  連動顯示
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
        
        if($(this).find("a").attr("id")=="tab1-tab")
        {
            xIndex = 98;
            // alert('合計');
            $("#total-range-text").html('本月發電累計');
            $("#shemen1-range-text").html('本月發電累計');
            $("#shemen2-range-text").html('本月發電累計');
            $("#yishin-range-text").html('本月發電累計');
            reloadData();
            showTabIndex = "合計";
        }
        else if ($(this).find("a").attr("id") == "tab2-tab") {
            xIndex = 0;
            // alert('石門1號G');
            $("#total-range-text").html('本月發電累計');
            $("#shemen1-range-text").html('本月發電累計');
            $("#shemen2-range-text").html('本月發電累計');
            $("#yishin-range-text").html('本月發電累計');
            showTabIndex = "石門1";
        }
        else if ($(this).find("a").attr("id") == "tab3-tab")
        {
            xIndex = 1;
            // alert('石門2號G');
            $("#total-range-text").html('本月發電累計');
            $("#shemen1-range-text").html('本月發電累計');
            $("#shemen2-range-text").html('本月發電累計');
            $("#yishin-range-text").html('本月發電累計');
            showTabIndex = "石門2";
        }
        else if ($(this).find("a").attr("id") == "tab4-tab")
        {
            xIndex = 2;
            // alert('義興');
            $("#total-range-text").html('本月發電累計');
            $("#shemen1-range-text").html('本月發電累計');
            $("#shemen2-range-text").html('本月發電累計');
            $("#yishin-range-text").html('本月發電累計');
            showTabIndex = "義興";
        }
    });

    $("#sSDateText").off().on("click", function () {
        //$('#sSDate').datetimepicker('show');
                              var myDate = new Date(); // From model.
                              
                              cordova.plugins.DateTimePicker.show({
                                                                  mode: "date",
                                                                  date: myDate,
                                                                  allowOldDates: true,
                                                                  allowFutureDates: true,
                                                                  minDate: new Date(new Date().getFullYear()-1 + '/01/01'),
                                                                  maxDate: new Date(getCurrentDateAD()),
                                                                  locale: "ZH-TW",
                                                                  okText: "確定",
                                                                  cancelText: "取消",
                                                                  android: {
                                                                  theme: 16974126, // Theme_DeviceDefault_Dialog
                                                                  calendar: false,
                                                                  is24HourView: true
                                                                  },
                                                                  success: function(newDate) {
                                                                  // Handle new date.
                                                                  console.info(newDate);
                                                                  $("#sSDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                                                                  $("#sEDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true,0)));
                                                                  },
                                                                  cancel: function() {
                                                                  console.info("Cancelled");
                                                                  },
                                                                  error: function(err) {
                                                                  // Handle error.
                                                                  console.error(err);
                                                                  }
                                                                  });
    });

    $("#sEDateText").off().on("click", function () {
        //$('#sEDate').datetimepicker('show');
                              var myDate = new Date(); // From model.
                              
                              cordova.plugins.DateTimePicker.show({
                                                                  mode: "date",
                                                                  date: myDate,
                                                                  allowOldDates: true,
                                                                  allowFutureDates: true,
                                                                  minDate: new Date(new Date().getFullYear()-1 + '/01/01'),
                                                                  maxDate: new Date(getCurrentDateAD()),
                                                                  locale: "ZH-TW",
                                                                  okText: "確定",
                                                                  cancelText: "取消",
                                                                  android: {
                                                                  theme: 16974126, // Theme_DeviceDefault_Dialog
                                                                  calendar: false,
                                                                  is24HourView: true
                                                                  },
                                                                  success: function(newDate) {
                                                                  // Handle new date.
                                                                  console.info(newDate);
                                                                  $("#sEDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                                                                  },
                                                                  cancel: function() {
                                                                  console.info("Cancelled");
                                                                  },
                                                                  error: function(err) {
                                                                  // Handle error.
                                                                  console.error(err);
                                                                  }
                                                                  });
    });

    $("#search").off().on("click", function () {
        if ($('#sSDateText').val() == "" || $('#sEDateText').val() == "")
            alert("請選擇日期");
        else
        {
            $("#btnSearch").click();
            $("#b_date").html($('#sSDateText').val() + "~" + $('#sEDateText').val());

            xCountDays = (new Date(yyy2yyyy($('#sSDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#sEDateText').val()))));
            $("#b_date").html($('#sSDateText').val() + "~" + $('#sEDateText').val());
            var sdd = (parseInt($('#sSDateText').val().substring(0, 3)) + 1911) + $('#sSDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            var edd = (parseInt($('#sEDateText').val().substring(0, 3)) + 1911) + $('#sEDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            if (xCountDays < 0) {
                alert("結束日期須大於開始日期！");
                return;
            }

            //if (xCountDays < 11)
                doAjax("getElectricityDataTotalAnalysisByHoursNew", { "sDate": sdd, "eDate": edd }, getElectricityDataTotalAnalysisByHoursNew);
            //else
                //doAjax("getElectricityDataTotalAnalysis", { "sDate": sdd, "eDate": edd }, getElectricityDataTotalAnalysis);

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
    //#region 
    /*$('#sSDate').datetimepicker({
        lang: 'ch',
        timepicker: false,
        onGenerate: function (ct) {
            //$(this).find('.xdsoft_date.xdsoft_weekend')
            //    .addClass('xdsoft_disabled');
        },
        format: 'Y-m-d',
        minDate: '2018/01/01', // yesterday is minimum date
        maxDate: getCurrentDateAD(), // and tommorow is maximum date calendar
        onSelectDate: function (ct, $i) {
            $("#sSDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
            $("#sEDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
            xCountDays = Math.abs(countDays($('#sSDateText').val().replace("年", "-").replace("月", "-").replace("日", "-"), $('#sEDateText').val().replace("年", "-").replace("月", "-").replace("日", "-")));
            if (xCountDays > 365)
            {
                alert("搜尋區間請勿超過一年");
                $("#sEDateText").val("");
            }
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
        minDate: '2018/01/01', // yesterday is minimum date
        maxDate: getCurrentDateAD(), // and tommorow is maximum date calendar
        onSelectDate: function (ct, $i) {
            $("#sEDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
            xCountDays = Math.abs(countDays($('#sSDateText').val().replace("年", "-").replace("月", "-").replace("日", "-"), $('#sEDateText').val().replace("年", "-").replace("月", "-").replace("日", "-")));
            if (xCountDays > 365)
            {
                alert("搜尋區間請勿超過一年");
                $("#sEDateText").val("");
            }
        }
    });*/
    //#endregion
    

    templatePower = [$("#templatePower0").html(), $("#templatePower1").html(), $("#templatePower2").html()];
    templateWater = [$("#templateWater0").html(), $("#templateWater1").html(), $("#templateWater2").html()];

    setInterval(reloadData, 60 * 1000);

    var proto = Highcharts.Chart.prototype;
    proto.zoomToD = function (delta, _xIndex) {
        var y = new Date().getFullYear();
        var maxM = new Date().getMonth();
        var minM = new Date().getMonth() - delta;
        if (minM < 0) {
            minM = 0;

            maxM = delta;
        }
        var chartMin = Date.UTC(y, minM, 1);
        var chartMax = new Date().getTime();

        if (delta == 0 || delta == 1 || delta == 2 || delta == 5)
            chartMax = Date.UTC(y, maxM, new Date(y, maxM + 1, 0).getDate());
        else if (delta == 11)
            chartMax = Date.UTC(y, 11, 31);

        switch (delta) {
            case 0:
            case 1:
                StockChart[_xIndex].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 10
                    },
                });
                break;
            case 2:
            case 5:
            case 11:
                StockChart[_xIndex].xAxis[0].update({
                    tickInterval: 28 * 24 * 3600 * 1000,
                    labels: {
                        step: null
                    }
                });
                break;
        }
        StockChart[_xIndex].xAxis[0].setExtremes(chartMin, chartMax);

        return false;
    };
    proto.zoom1m = function (_xIndex) {
        return this.zoomToD(0, _xIndex);
    };
    proto.zoom2m = function (_xIndex) {
        return this.zoomToD(1, _xIndex);
    };
    proto.zoom3m = function (_xIndex) {
        return this.zoomToD(2, _xIndex);
    };
    proto.zoom6m = function (_xIndex) {
        return this.zoomToD(5, _xIndex);
    };
    proto.zoom1y = function (_xIndex) {
        return this.zoomToD(11, _xIndex);
    };

    $('.zoom_controls a').click(function (e) {
        e.preventDefault();
        var call = 'zoom' + $(this).attr('data-range');
        //if ($(this).attr('data-chart') == "search")
            StockChart[xIndex][call](xIndex);
        $('.zoom_controls a').removeClass('active');
        $(this).addClass('active');

        // 連動顯示 ( 20210430 )
        var ny = new Date().getFullYear();
        var nm = new Date().getMonth();
        if ($(this).index() == 0) { // 本月
            // alert('本月');
            var DisplayText = "1"; // 控制顯示的文字
            chartMin = Date.UTC(ny, nm, 1);
            chartMax = Date.UTC(ny, nm + 1, 0);
            var c1 = new Date(chartMin);
            var c2 = new Date(chartMax);
            console.log('轉換後開始日:',c1,'，結束日',c2)
            ReCountElectricityDataAll(chartMin, chartMax, DisplayText);
            
        }
        else if ($(this).index() == 1) { // 2個月
            // alert('2個月');
            var DisplayText = "2";
            chartMin = Date.UTC(ny, nm - 1, 1);
            chartMax = Date.UTC(ny, nm + 1, 0);
            var c1 = new Date(chartMin);
            var c2 = new Date(chartMax);
            console.log('轉換後開始日:',c1,'，結束日',c2)
            ReCountElectricityDataAll(chartMin, chartMax, DisplayText);
        }
        else if ($(this).index() == 2) { // 3個月
            // alert('3個月');
            var DisplayText = "3";
            chartMin = Date.UTC(ny, nm - 2, 1);
            chartMax = Date.UTC(ny, nm + 1, 0);
            var c1 = new Date(chartMin);
            var c2 = new Date(chartMax);
            console.log('轉換後開始日:',c1,'，結束日',c2)
            ReCountElectricityDataAll(chartMin, chartMax, DisplayText);
        }
        else if ($(this).index() == 3) { // 今年
            // alert('今年');
            var DisplayText = "Year";
            chartMin = Date.UTC(ny, 0, 1);
            chartMax = Date.UTC(ny, 12, 0);
            var c1 = new Date(chartMin);
            var c2 = new Date(chartMax);
            console.log('轉換後開始日:',c1,'，結束日',c2)
            ReCountElectricityDataAll(chartMin, chartMax, DisplayText);
        }
    });
}

function reloadData()
{
    $("#currentDate").html(getCurrentDate());
    $("#currentTime").html(getCurrentTime());
    
    //doAjax("getElectricityData", "", getElectricityData);
    doAjax("getElectricityStationData", { 'station_id': '0' }, getElectricityStationData);
    doAjax("getElectricityStationData", { 'station_id': '1' }, getElectricityStationData);
    doAjax("getElectricityStationData", { 'station_id': '2' }, getElectricityStationData);

    doAjax("getElectricityDataAnalysis", { 'station_id': '0' }, getElectricityDataAnalysis);
    doAjax("getElectricityDataAnalysis", { 'station_id': '1' }, getElectricityDataAnalysis);
    doAjax("getElectricityDataAnalysis", { 'station_id': '2' }, getElectricityDataAnalysis);

    doAjax("getElectricityDataAnalysisAll", { }, getElectricityDataAnalysisAll);

    countSpeed();
}

// getData Function
function getElectricityData(msg) {
    var dataD = msg["getElectricityDataD"];
    var dataM = msg["getElectricityDataM"];
    var dataY = msg["getElectricityDataY"];

    var totalD = 0, totalM = 0, totalY = 0;

    totalD += dataD[0]["s0"] != null ? parseFloat(dataD[0]["s0"]) : 0;
    totalD += dataD[0]["s1"] != null ? parseFloat(dataD[0]["s1"]) : 0;
    totalD += dataD[0]["s2"] != null ? parseFloat(dataD[0]["s2"]) : 0;

    totalM += dataM[0]["s0"] != null ? parseFloat(dataM[0]["s0"]) : 0;
    totalM += dataM[0]["s1"] != null ? parseFloat(dataM[0]["s1"]) : 0;
    totalM += dataM[0]["s2"] != null ? parseFloat(dataM[0]["s2"]) : 0;

    totalY += dataY[0]["s0"] != null ? parseFloat(dataY[0]["s0"]) : 0;
    totalY += dataY[0]["s1"] != null ? parseFloat(dataY[0]["s1"]) : 0;
    totalY += dataY[0]["s2"] != null ? parseFloat(dataY[0]["s2"]) : 0;

    $("#powerT").countTo(
    {
        from: 0,
        to: degree2TDegree(totalD),
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
        to: degree2TDegree(totalM),
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
        to: degree2TDegree(totalY),
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);
        }
    });
}

function getElectricityDataFromText() {

    var totalD = 0, totalM = 0, totalY = 0;

    totalD += parseFloat($(".powergenTotalD0").html().replace(",", ""));
    totalD += parseFloat($(".powergenTotalD1").html().replace(",", ""));
    totalD += parseFloat($(".powergenTotalD2").html().replace(",", ""));

    totalM += parseFloat($(".powergenTotalM0").html().replace(",", ""));
    totalM += parseFloat($(".powergenTotalM1").html().replace(",", ""));
    totalM += parseFloat($(".powergenTotalM2").html().replace(",", ""));

    totalY += parseFloat($(".powergenTotalY0").html().replace(",", ""));
    totalY += parseFloat($(".powergenTotalY1").html().replace(",", ""));
    totalY += parseFloat($(".powergenTotalY2").html().replace(",", ""));

    $("#powerT").countTo(
    {
        from: 0,
        to: totalD,
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
        to: totalM,
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
        to: totalY,
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

    var sTimeText = '';
    var eTimeText = '';
    var water_use = 0;
    var index = 0;
    var temp = [];
    for (var i = 0; i < dataTimeWater.length; i++) {
        sTimeText = dataTimeWater[i]["sTime"];
        eTimeText = dataTimeWater[i]["eTime"];
        water_use = dataTimeWater[i]["water_use"];
        if (i == 0) {
            temp[i] = [sTimeText, eTimeText, water_use];
            index = i;
        }else{
            if (!checkIsOverMinute(new Date(dataTimeWater[i].sTime), new Date(dataTimeWater[i-1].eTime))) {
                temp[index][1] = eTimeText;
                temp[index][2] = water_use;
            }else{
                temp[i] = [sTimeText, eTimeText, water_use];
                index = i;
            }
        }
       
    }
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] !== undefined) {
            $("#templatePower" + param.station_id).append(templatePower[param.station_id]);
            $(".group_count" + +param.station_id + " > font").eq(0).html(getTimePart(temp[i][0]));
            $(".group_count" + +param.station_id + " > font").eq(1).html(getTimePart(temp[i][1]));
            var diff =((new Date(temp[i][1]).getTime() - new Date(temp[i][0]).getTime()) / 1000) / 60;
            diff = Math.abs(Math.round(diff))+1;
            // var diffMins = Math.round((((new Date(temp[i][1]) - new Date(temp[i][0])) % 86400000) % 3600000) / 60000); // minutes
            $(".group_count" + +param.station_id + " > span > span").html(countTime(parseFloat(Math.abs(Math.round(diff)))));
            $(".group_count" + +param.station_id + "").attr("class", "group_count" + +param.station_id + "_" + i);
            // totalPowerTime += parseFloat(diffMins);
            totalPowerTime += parseFloat(Math.abs(Math.round(diff)));
        }
    }
    

    $("#totalPowerTime" + +param.station_id).html(countTime(totalPowerTime));
    if (dataTimeWater.length > 0 && !checkIsOverMinute(new Date(), new Date(dataTimeWater[dataTimeWater.length - 1]["eTime"])))
        avgWater = dataTimeWater[dataTimeWater.length - 1]["water_use"];
    else
        avgWater = 0;

    $("#avgWater" + +param.station_id).html(parseFloat(avgWater).toFixed(2) + " <span class=\"font14\">cms</span>");
    //$("#avgWater" + +param.station_id).html(avgWater + " <span class=\"font14\">cms</span>");
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
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
        timeblockDWV.push(null);
    }

    for (var i = 0; i < dataPowerD.length; i++) {
        //powergenTotalD += degree2TDegree(dataPowerD[i].power_gen);
        timeblockDPV[parseInt(dataPowerD[i].dTime)] = parseFloat(degree2TDegree(dataPowerD[i].power_gen).toFixed(1));
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
        powergenTotalM += degree2TDegree(dataPowerM[i].power_gen);
        timeblockMPV[parseInt(dataPowerM[i].dTime) - 1] = parseFloat(degree2TDegree(dataPowerM[i].power_gen).toFixed(1));
        if (i == dataPowerM.length - 1 && date.getDate() == dataPowerM[i].dTime)
            powergenTotalD = parseFloat(degree2TDegree(dataPowerM[i].power_gen).toFixed(1));
    }

   

    for (var i = 0; i < dataPowerWM.length ; i++) {
        timeblockMWV.push(dataPowerWM[i].SM_LEVEL);
    }
    // alert(powergenTotalM);

    // year

    //for (var i = 0; i < dataPowerY.length; i++) {
    //    powergenTotalY += degree2TDegree(dataPowerY[i].power_gen);
    //    timeblockYPV.push([Date.UTC(dataPowerY[i].dTime.substring(0, 4), parseInt(dataPowerY[i].dTime.substring(5, 7)) - 1, dataPowerY[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(dataPowerY[i].power_gen).toFixed(1))]);
    //}

    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < dataPowerY.length; y++) {
                if (Date.UTC(dataPowerY[y].dTime.substring(0, 4), parseInt(dataPowerY[y].dTime.substring(5, 7)) - 1, dataPowerY[y].dTime.substring(8, 10)) == utc) {
                    val = parseFloat(degree2TDegree(dataPowerY[y].power_gen).toFixed(1));
                    powergenTotalY += val;
                    break;
                }
            }
            
            timeblockYPV.push([utc, val]);
        }
    }
    // debugger;
   
    switch (param.station_id) { // 依照載入順序將序列存在變數，連動顯示使用
        case "0":
            // alert('in');
            showTotalShemen1 = timeblockYPV;
            break;

        case "1":
            // alert('in');
            showTotalShemen2 = timeblockYPV;
            break;

        case "2":
            // alert('in');
            showTotalYishin = timeblockYPV;
            break;          
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


            if (param.station_id == 2) {
                setTimeout(function () { getElectricityDataFromText(); }, 1000);
                
            }
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
            title: {
                text: ''
            },
            labels: {
                format: ''
            }
        },{ // Primary yAxis
            labels: {
                format: '{value}',
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
        series: [
        {
            showInLegend: false,
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockDPV,
            tooltip: {
                valueSuffix: ''
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

    /*
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
            title: {
                text: ''
            },
            labels: {
                format: ''
            }
        }, { // Primary yAxis
            labels: {
                format: '{value}',
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
            showInLegend: false,
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockMPV,
            tooltip: {
                valueSuffix: ''
            }

        }]
    });*/

    StockChart[param.station_id] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationM' + param.station_id,
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
                count: 7,
                text: '至本日'
            }, {
                type: 'all',
                count: 8,
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 28 * 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d}',
                step: null
            },
            events: {
                setExtremes: function (e) {
                    console.log(this);
                    if (typeof (e.rangeSelectorButton) !== 'undefined') {
                        //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
                    }
                }
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
                format: '{value}',
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

        series: [
        {
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
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
    StockChart[param.station_id]['zoom1m'](param.station_id);
    

    // create the chart
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationY'+param.station_id,
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled:false,
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
                count: 7,
                text: '至本日'
            },{
                type: 'all',
                count: 8,
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 28 * 24 * 3600 * 1000,
        	type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%m/%d',
        	},
        	labels: {
        	    format: '{value:%m/%d}',
        	    step: null
        	},
            events: {
                setExtremes: function(e) {
                    console.log(this);
                    if(typeof(e.rangeSelectorButton)!== 'undefined')
                    {
                        //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
                    }
                }
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
                format: '{value}',
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
            name: ' ',
            type: 'area',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
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

function getElectricityDataAnalysisAll(msg, param) {
    var dataPowerD = msg["getElectricityDataAnalysisAllD"];
    var dataPowerM = msg["getElectricityDataAnalysisAllM"];
    var dataPowerY = msg["getElectricityDataAnalysisAllY"];
    var dataPowerWD = msg["getElectricityDataAnalysisAllWD"];
    var dataPowerWM = msg["getElectricityDataAnalysisAllWM"];
    var dataPowerWY = msg["getElectricityDataAnalysisAllWY"];

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
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
        timeblockDWV.push(null);
    }

    for (var i = 0; i < dataPowerD.length; i++) {
        //powergenTotalD += degree2TDegree(dataPowerD[i].power_gen);
        timeblockDPV[parseInt(dataPowerD[i].dTime)] = parseFloat(degree2TDegree(dataPowerD[i].power_gen).toFixed(1));
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
        powergenTotalM += degree2TDegree(dataPowerM[i].power_gen);
        timeblockMPV[parseInt(dataPowerM[i].dTime) - 1] = parseFloat(degree2TDegree(dataPowerM[i].power_gen).toFixed(1));
        if (i == dataPowerM.length - 1 && date.getDate() == dataPowerM[i].dTime)
            powergenTotalD = parseFloat(degree2TDegree(dataPowerM[i].power_gen).toFixed(1));
    }

    for (var i = 0; i < dataPowerWM.length ; i++) {
        timeblockMWV.push(dataPowerWM[i].SM_LEVEL);
    }

    // year

    //for (var i = 0; i < dataPowerY.length; i++) {
    //    powergenTotalY += degree2TDegree(dataPowerY[i].power_gen);
    //    timeblockYPV.push([Date.UTC(dataPowerY[i].dTime.substring(0, 4), parseInt(dataPowerY[i].dTime.substring(5, 7)) - 1, dataPowerY[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(dataPowerY[i].power_gen).toFixed(1))]);
    //}
    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < dataPowerY.length; y++) {
                if (Date.UTC(dataPowerY[y].dTime.substring(0, 4), parseInt(dataPowerY[y].dTime.substring(5, 7)) - 1, dataPowerY[y].dTime.substring(8, 10)) == utc) {
                    val = parseFloat(degree2TDegree(dataPowerY[y].power_gen).toFixed(1));
                    break;
                }
            }
            timeblockYPV.push([utc, val]);
        }
    }
    
    showTabIndex = "合計";
    showTotal = timeblockYPV; // 連動顯示 - 合計

    for (var i = 0; i < dataPowerWY.length; i++) {
        timeblockYWV.push([Date.UTC(dataPowerWY[i].dTime.substring(0, 4), parseInt(dataPowerWY[i].dTime.substring(5, 7)) - 1, dataPowerWY[i].dTime.substring(8, 10)), dataPowerWY[i].SM_LEVEL]);
    }

    $(".powergenTotalAD0").countTo(
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

    $(".powergenTotalAM0").countTo(
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

    $(".powergenTotalAY0").countTo(
    {
        from: 0,
        to: powergenTotalY,
        speed: 1500,
        refreshInterval: 50,
        decimals: 1,
        onComplete: function (value) {
            console.debug(this);


            if (param.station_id == 2) {
                setTimeout(function () { getElectricityDataFromText(); }, 1000);

            }
        }
    });

    Highcharts.setOptions({
        lang: {
            thousandsSep: ','
        }
    });

    $('#stationAD0').highcharts({
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
            title: {
                text: ''
            },
            labels: {
                format: ''
            }
        }, { // Primary yAxis
            labels: {
                format: '{value}',
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
        series: [
        {
            showInLegend: false,
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockDPV,
            tooltip: {
                valueSuffix: ''
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

    /*$('#stationAM0').highcharts({
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
            title: {
                text: ''
            },
            labels: {
                format: ''
            }
        }, { // Primary yAxis
            labels: {
                format: '{value}',
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
            showInLegend: false,
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockMPV,
            tooltip: {
                valueSuffix: ''
            }

        }//, {
         //   name: '水位',
         //   type: 'spline',
         //   data: timeblockMWV,
         //   tooltip: {
         //       valueSuffix: ' m'
         //   }
        //}
        ]
    });*/

    // create the chart
    StockChart[98] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationAM0',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
                count: 7,
                text: '至本日'
            }, {
                type: 'all',
                count: 8,
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 28 * 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d}',
                step: null
            },
            events: {
                setExtremes: function (e) {
                    console.log(this);
                    if (typeof (e.rangeSelectorButton) !== 'undefined') {
                        //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
                    }
                }
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
                format: '{value}',
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

        series: [
        {
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
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
    StockChart[98]['zoom1m'](98);


    // create the chart
    StockChart[99] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationAY0',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
                count: 7,
                text: '至本日'
            }, {
                type: 'all',
                count: 8,
                text: '全年'
            }]
        },

        title: {
            text: ''
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 28 * 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d}',
                step: null
            },
            events: {
                setExtremes: function (e) {
                    console.log(this);
                    if (typeof (e.rangeSelectorButton) !== 'undefined') {
                        //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
                    }
                }
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
                format: '{value}',
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

        series: [
        {
            name: ' ',
            // type: 'area',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
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

function getElectricityDataTotalAnalysisByHours(msg, param) {
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

    var totalAll = 0;
    var totalAll0 = 0;
    var totalAll1 = 0;
    var totalAll2 = 0;

    for (var i = 0; i < data.length; i++) {
        if (xCountDays > 10)
            timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data[i].power_gen).toFixed(1))]);
        else
            timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10), data[i].dTime.substring(11, 13), data[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data[i].power_gen).toFixed(1))]);
        totalAll += degree2TDegree(data[i].power_gen);
    }

    for (var i = 0; i < data0.length; i++) {
        if (xCountDays > 10)
            timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data0[i].power_gen).toFixed(1))]);
        else
            timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10), data0[i].dTime.substring(11, 13), data0[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data0[i].power_gen).toFixed(1))]);
        totalAll0 += degree2TDegree(data0[i].power_gen);
    }

    for (var i = 0; i < data1.length; i++) {
        if (xCountDays > 10)
            timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data1[i].power_gen).toFixed(1))]);
        else
            timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10), data1[i].dTime.substring(11, 13), data1[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data1[i].power_gen).toFixed(1))]);
        totalAll1 += degree2TDegree(data1[i].power_gen);
    }

    for (var i = 0; i < data2.length; i++) {
        if (xCountDays > 10)
            timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data2[i].power_gen).toFixed(1))]);
        else
            timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10), data2[i].dTime.substring(11, 13), data2[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data2[i].power_gen).toFixed(1))]);
        totalAll2 += degree2TDegree(data2[i].power_gen);
    }

    for (var i = 0; i < dataWater.length; i++) {
        timeblockYWV.push([Date.UTC(dataWater[i].dTime.substring(0, 4), parseInt(dataWater[i].dTime.substring(5, 7)) - 1, dataWater[i].dTime.substring(8, 10)), dataWater[i].SM_LEVEL]);
    }

    $(".totalAll").html(parseFloat(totalAll).toFixed(1));
    $(".totalAll0").html(parseFloat(totalAll0).toFixed(1));
    $(".totalAll1").html(parseFloat(totalAll1).toFixed(1));
    $(".totalAll2").html(parseFloat(totalAll2).toFixed(1));

    StockChart[3] = Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
            alignTicks: false
        },

        rangeSelector: {
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
        },
        yAxis: [{ // Secondary yAxis
            
        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });

    StockChart[4] = Highcharts.StockChart({
        chart: {
            renderTo: 'search0',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
        },
        yAxis: [{ // Secondary yAxis
            
        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV0,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });

    StockChart[5] = Highcharts.StockChart({
        chart: {
            renderTo: 'search1',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
        },
        yAxis: [{ // Secondary yAxis
            
        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV1,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });

    StockChart[6] = Highcharts.StockChart({
        chart: {
            renderTo: 'search2',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
        },
        yAxis: [{ 
        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV2,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });
}



function getElectricityDataTotalAnalysisByHoursNew(msg, param) {
    //var data = msg["getElectricityDataTotalAnalysis"];
    var data0 = msg["getElectricityDataTotalAnalysis0"];
    var data1 = msg["getElectricityDataTotalAnalysis1"];
    var data2 = msg["getElectricityDataTotalAnalysis2"];
    var dataWater = msg["getElectricityDataTotalAnalysisWater"];

    var timeblockYPV = [];
    var timeblockYPV0 = [];
    var timeblockYPV1 = [];
    var timeblockYPV2 = [];
    var timeblockYWV = [];

    var totalAll = 0;
    var totalAll0 = 0;
    var totalAll1 = 0;
    var totalAll2 = 0;

    function appendData(time, value) {
        var isExists = false;
        for (var i = 0; i < timeblockYPV.length; i++) {
            if (timeblockYPV[i][0] == time) {
                timeblockYPV[i][1] += value;
                isExists = true;
                break;
            }
        }

        if(!isExists)
            timeblockYPV.push([time, value]);
    }
    function appendData0(time, value) {
        var isExists = false;
        for (var i = 0; i < timeblockYPV0.length; i++) {
            if (timeblockYPV0[i][0] == time) {
                timeblockYPV0[i][1] += value;
                isExists = true;
                break;
            }
        }

        if (!isExists)
            timeblockYPV0.push([time, value]);
    }
    function appendData1(time, value) {
        var isExists = false;
        for (var i = 0; i < timeblockYPV1.length; i++) {
            if (timeblockYPV1[i][0] == time) {
                timeblockYPV1[i][1] += value;
                isExists = true;
                break;
            }
        }

        if (!isExists)
            timeblockYPV1.push([time, value]);
    }
    function appendData2(time, value) {
        var isExists = false;
        for (var i = 0; i < timeblockYPV2.length; i++) {
            if (timeblockYPV2[i][0] == time) {
                timeblockYPV2[i][1] += value;
                isExists = true;
                break;
            }
        }

        if (!isExists)
            timeblockYPV2.push([time, value]);
    }
    
    var sDate = new Date((parseInt($('#sSDateText').val().substring(0, 3)) + 1911), parseInt($('#sSDateText').val().substring(4, 6)) - 1, parseInt($('#sSDateText').val().substring(7, 9)));
    var eDate = new Date((parseInt($('#sEDateText').val().substring(0, 3)) + 1911), parseInt($('#sEDateText').val().substring(4, 6)) - 1, parseInt($('#sEDateText').val().substring(7, 9)));

    if (xCountDays > 10) {
        //for (var i = 0; i < totalHours; i++) {
        //    timeblockYPV.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate() + i), 0]);
        //}
        for (var i = 0; i <= xCountDays; i++) {
            timeblockYPV.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate() + i), 0]);
            timeblockYPV0.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate() + i), 0]);
            timeblockYPV1.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate() + i), 0]);
            timeblockYPV2.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate() + i), 0]);
        }

    }
    else {
        var totalHours = (xCountDays + 1) * 24;
        
        for (var i = 0; i < totalHours; i++) {
            timeblockYPV.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i + 1), 0]);
            timeblockYPV0.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i + 1), 0]);
            timeblockYPV1.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i + 1), 0]);
            timeblockYPV2.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i + 1), 0]);
        }
    }


    //for (var i = 0; i < data.length - 1; i++) {
    //    var power_gen = data[i + 1].power_gen - data[i].power_gen;

    //    if (xCountDays > 10)
    //        timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);
    //    else
    //        timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10), data[i].dTime.substring(11, 13), data[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);
    //    totalAll += degree2TDegree(power_gen);
    //}

    for (var i = 0; i < data0.length - 1; i++) {
        var power_gen = data0[i + 1].power_gen - data0[i].power_gen;

        if (xCountDays > 10)
            appendData(Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1)));
        else
            appendData(Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10), parseInt(data0[i].dTime.substring(11, 13)) + 1), parseFloat(degree2TDegree(power_gen).toFixed(1)));


        if (xCountDays > 10)
            appendData0(Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1)));//timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);
        else
            appendData0(Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10), parseInt(data0[i].dTime.substring(11, 13)) + 1), parseFloat(degree2TDegree(power_gen).toFixed(1)));//timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);

        totalAll0 += degree2TDegree(power_gen);
        totalAll += degree2TDegree(power_gen);
    }

    for (var i = 0; i < data1.length - 1; i++) {
        var power_gen = data1[i + 1].power_gen - data1[i].power_gen;

        if (xCountDays > 10) 
            appendData(Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen)));
        else
            appendData(Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10), parseInt(data1[i].dTime.substring(11, 13)) + 1), parseFloat(degree2TDegree(power_gen)));
        //appendData(Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10), data1[i].dTime.substring(11, 13), data1[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(power_gen)));

        if (xCountDays > 10)
            appendData1(Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1)));//timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);
        else
            appendData1(Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10), parseInt(data1[i].dTime.substring(11, 13)) + 1), parseFloat(degree2TDegree(power_gen).toFixed(1)));//timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);

        totalAll1 += degree2TDegree(power_gen);
        totalAll += degree2TDegree(power_gen);
    }

    for (var i = 0; i < data2.length - 1; i++) {
        var power_gen = data2[i + 1].power_gen - data2[i].power_gen;

        if (xCountDays > 10) 
            appendData(Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen)));
        
        else
            appendData(Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10), parseInt(data2[i].dTime.substring(11, 13)) + 1), parseFloat(degree2TDegree(power_gen)));
        

        if (xCountDays > 10)
            appendData2(Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1)));//timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);
        else
            appendData2(Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10), parseInt(data2[i].dTime.substring(11, 13)) + 1), parseFloat(degree2TDegree(power_gen).toFixed(1)));//timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(power_gen).toFixed(1))]);

        totalAll2 += degree2TDegree(power_gen);
        totalAll += degree2TDegree(power_gen);
    }

    for (var i = 0; i < dataWater.length; i++) {
        timeblockYWV.push([Date.UTC(dataWater[i].dTime.substring(0, 4), parseInt(dataWater[i].dTime.substring(5, 7)) - 1, dataWater[i].dTime.substring(8, 10)), dataWater[i].SM_LEVEL]);
    }

    $(".totalAll").html(parseFloat(totalAll).toFixed(1));
    $(".totalAll0").html(parseFloat(totalAll0).toFixed(1));
    $(".totalAll1").html(parseFloat(totalAll1).toFixed(1));
    $(".totalAll2").html(parseFloat(totalAll2).toFixed(1));

    for (var i = 0; i < timeblockYPV.length; i++) {
        timeblockYPV[i][1] = parseFloat(timeblockYPV[i][1].toFixed(1));
    }

    StockChart[3] = Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
            alignTicks: false
        },

        rangeSelector: {
            enabled: false,
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
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H}'),
                step: null
            },
        },
        yAxis: [{ // Secondary yAxis

        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });

    StockChart[4] = Highcharts.StockChart({
        chart: {
            renderTo: 'search0',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H}'),
                step: null
            },
        },
        yAxis: [{ // Secondary yAxis

        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV0,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });

    StockChart[5] = Highcharts.StockChart({
        chart: {
            renderTo: 'search1',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H}'),
                step: null
            },
        },
        yAxis: [{ // Secondary yAxis

        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV1,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });

    StockChart[6] = Highcharts.StockChart({
        chart: {
            renderTo: 'search2',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (28 * 24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H}'),
                step: null
            },
        },
        yAxis: [{
        },
        { // Primary yAxis
            labels: {
                format: '{value}',
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
            name: ' ',
            type: 'column',
            yAxis: 1,
            data: timeblockYPV2,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
            }

        }]
    });
    
    if (xCountDays > 10) {
        for (i = 3; i <= 6; i++) {
            StockChart[i].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    rotation: -45,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);

                        if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                            return label;
                        else
                            return "";
                    }
                }
            });
            //var chartMin = Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() - 2, 0);
            //var chartMax = Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() + 1, -1);
            //StockChart[i].xAxis[0].setExtremes(chartMin, chartMax);
        }

        //顯示區間最新一筆的月份+前2個月，共3個月
        var chartMin = Date.UTC(eDate.getFullYear(), eDate.getMonth() + 1 - 2, 1);
        var chartMax = Date.UTC(eDate.getFullYear(), eDate.getMonth() + 1 - 1, eDate.getDate());

        if (chartMin >= sDate.getTime()) {
            StockChart[3].xAxis[0].setExtremes(chartMin, chartMax);
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
            StockChart[6].xAxis[0].setExtremes(chartMin, chartMax);
        }

    }
    else if (xCountDays <= 10 && xCountDays > 2) {
        for (i = 3; i <= 6; i++) {
            StockChart[i].xAxis[0].update({
                tickInterval: 3600 * 1000,
                labels: {
                    step: 1,
                    rotation: -45,
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
            var chartMin = Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() - 2, 0 + 1);
            var chartMax = Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() + 1, -1 + 1);
            StockChart[i].xAxis[0].setExtremes(chartMin, chartMax);
        }
    }
    else {
        for (i = 3; i <= 6; i++) {
            StockChart[i].xAxis[0].update({
                tickInterval: 3600 * 1000,
                labels: {
                    step: 1,
                    rotation: -45,
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
            var chartMin = Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() - xCountDays, 0 + 1);
            var chartMax = Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() + 1, -1 + 1);
            StockChart[i].xAxis[0].setExtremes(chartMin, chartMax);
        }
    }
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

    var totalAll = 0;
    var totalAll0 = 0;
    var totalAll1 = 0;
    var totalAll2 = 0;

    for (var i = 0; i < data.length; i++) {
        if (xCountDays > 10)
            timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data[i].power_gen).toFixed(1))]);
        else
            timeblockYPV.push([Date.UTC(data[i].dTime.substring(0, 4), parseInt(data[i].dTime.substring(5, 7)) - 1, data[i].dTime.substring(8, 10), data[i].dTime.substring(11, 13), data[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data[i].power_gen).toFixed(1))]);
        totalAll += degree2TDegree(data[i].power_gen);
    }

    for (var i = 0; i < data0.length; i++) {
        if (xCountDays > 10)
            timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data0[i].power_gen).toFixed(1))]);
        else
            timeblockYPV0.push([Date.UTC(data0[i].dTime.substring(0, 4), parseInt(data0[i].dTime.substring(5, 7)) - 1, data0[i].dTime.substring(8, 10), data0[i].dTime.substring(11, 13), data0[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data0[i].power_gen).toFixed(1))]);
        totalAll0 += degree2TDegree(data0[i].power_gen);
    }

    for (var i = 0; i < data1.length; i++) {
        if (xCountDays > 10)
            timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data1[i].power_gen).toFixed(1))]);
        else
            timeblockYPV1.push([Date.UTC(data1[i].dTime.substring(0, 4), parseInt(data1[i].dTime.substring(5, 7)) - 1, data1[i].dTime.substring(8, 10), data1[i].dTime.substring(11, 13), data1[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data1[i].power_gen).toFixed(1))]);
        totalAll1 += degree2TDegree(data1[i].power_gen);
    }

    for (var i = 0; i < data2.length; i++) {
        if (xCountDays > 10)
            timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10)), parseFloat(degree2TDegree(data2[i].power_gen).toFixed(1))]);
        else
            timeblockYPV2.push([Date.UTC(data2[i].dTime.substring(0, 4), parseInt(data2[i].dTime.substring(5, 7)) - 1, data2[i].dTime.substring(8, 10), data2[i].dTime.substring(11, 13), data2[i].dTime.substring(14, 16)), parseFloat(degree2TDegree(data2[i].power_gen).toFixed(1))]);
        totalAll2 += degree2TDegree(data2[i].power_gen);
    }

    for (var i = 0; i < dataWater.length; i++) {
        timeblockYWV.push([Date.UTC(dataWater[i].dTime.substring(0, 4), parseInt(dataWater[i].dTime.substring(5, 7)) - 1, dataWater[i].dTime.substring(8, 10)), dataWater[i].SM_LEVEL]);
    }

    $(".totalAll").html(parseFloat(totalAll).toFixed(1));
    $(".totalAll0").html(parseFloat(totalAll0).toFixed(1));
    $(".totalAll1").html(parseFloat(totalAll1).toFixed(1));
    $(".totalAll2").html(parseFloat(totalAll2).toFixed(1));

    StockChart[3] = Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
            alignTicks: false
        },

        rangeSelector: {
            enabled: false,
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
		    gridLineWidth: 1,
		    tickInterval: ((xCountDays>10)?(24 * 3600 * 1000):(1 * 1 * 3600 * 1000)),
		    type: 'datetime',
		    dateTimeLabelFormats: {
		        hour: '%Y-%m-%d %H:%M',
		        day: '%m/%d'
		    },
		    labels: {
		        format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
		        step: null
		    },
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
                format: '{value}',
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
            name: ' ',
            type: 'area',
            yAxis: 1,
            data: timeblockYPV,
            tooltip: {
                headerFormat: ((xCountDays > 10) ?'{point.x:%Y/%m/%d}<br/>':'{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
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

    StockChart[4] = Highcharts.StockChart({
        chart: {
            renderTo: 'search0',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
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
                format: '{value}',
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
            name: ' ',
            type: 'area',
            yAxis: 1,
            data: timeblockYPV0,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
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

    StockChart[5] = Highcharts.StockChart({
        chart: {
            renderTo: 'search1',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
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
                format: '{value}',
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
            name: ' ',
            type: 'area',
            yAxis: 1,
            data: timeblockYPV1,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
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

    StockChart[6] = Highcharts.StockChart({
        chart: {
            renderTo: 'search2',
            alignTicks: false
        },

        rangeSelector: {
            selected: 0,
            enabled: false,
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: ((xCountDays > 10) ? (24 * 3600 * 1000) : (1 * 1 * 3600 * 1000)),
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%Y-%m-%d %H:%M',
                day: '%m/%d'
            },
            labels: {
                format: ((xCountDays > 10) ? '{value:%m/%d}' : '{value:%m/%d %H:%M}'),
                step: null
            },
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
                format: '{value}',
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
            name: ' ',
            type: 'area',
            yAxis: 1,
            data: timeblockYPV2,
            tooltip: {
                headerFormat: ((xCountDays > 10) ? '{point.x:%Y/%m/%d}<br/>' : '{point.x:%Y/%m/%d %H:%M}<br/>'),
                valueSuffix: ''
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
    //if (h > 0)
        return leftPad(String(Math.floor(h)), 2) + "<span class=\"font14\"> hr </span>" + leftPad(String(m), 2) + "<span class=\"font14\"> min </span>";
    //else
    //    return m + "分";
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function countDays(date1, date2)
{
    // Convert back to days and return
    return (Date.parse(date1) - Date.parse(date2)) / (24 * 3600 * 1000);
}

/*
function mwtoDegree(value)
{
    return ((value / 60) * 1000)/10000;
}*/

function degree2TDegree(value) {
    return (value / 10);
    //return (value / 10000);
}

function ReCountElectricityDataAll(sTime, eTime, DisplayText){

    debugger;
    var v0 = 0;
    var v1 = 0;
    var v2 = 0;
    var v3 = 0;

    // for (var i = 0; i < showTotal.length; i++) { // 合計
    //     if (showTotal[i][0] >= sTime && showTotal[i][0] <= eTime) {
    //         v0 +=  showTotal[i][1];
    //     }
    // }

    for (var i = 0; i < showTotalShemen1.length; i++) { // 石門1
        if (showTotalShemen1[i][0] >= sTime && showTotalShemen1[i][0] <= eTime) {
            v1 +=  showTotalShemen1[i][1];
        }
    }

    for (var i = 0; i < showTotalShemen2.length; i++) { // 石門2
        if (showTotalShemen2[i][0] >= sTime && showTotalShemen2[i][0] <= eTime) {
            v2 +=  showTotalShemen2[i][1];
        }
    }

    for (var i = 0; i < showTotalYishin.length; i++) { // 義興
        if (showTotalYishin[i][0] >= sTime && showTotalYishin[i][0] <= eTime) {
            v3 +=  showTotalYishin[i][1];
        }
    }

    
    switch (DisplayText) { // 顯示文字
        case "1":
            $("#total-range-text").html('本月發電累計');
            $("#shemen1-range-text").html('本月發電累計');
            $("#shemen2-range-text").html('本月發電累計');
            $("#yishin-range-text").html('本月發電累計');
            
            break;

         case "2":
            $("#total-range-text").html('2個月發電累計');
            $("#shemen1-range-text").html('2個月發電累計');
            $("#shemen2-range-text").html('2個月發電累計');
            $("#yishin-range-text").html('2個月發電累計');
           
            break;

         case "3":
            $("#total-range-text").html('3個月發電累計');
            $("#shemen1-range-text").html('3個月發電累計');
            $("#shemen2-range-text").html('3個月發電累計');
            $("#yishin-range-text").html('3個月發電累計');
           
            break;

          case "Year":
            $("#total-range-text").html('今年發電累計');
            $("#shemen1-range-text").html('今年發電累計');
            $("#shemen2-range-text").html('今年發電累計');
            $("#yishin-range-text").html('今年發電累計');
           
            break;   
    }
    
    

    debugger;
    switch (showTabIndex) { // 選擇的 Tab
        case "合計":
            // $('#powerM').html(commafy(v0.toFixed(1)));
            $('#powerM').html(commafy((v1+v2+v3).toFixed(1)));
            $('.powergenTotalM0').html(commafy(v1.toFixed(1)));
            $('.powergenTotalM1').html(commafy(v2.toFixed(1)));
            $('.powergenTotalM2').html(commafy(v3.toFixed(1)));
            break;

        case "石門1":
            $('.powergenTotalM0').html(commafy(v1.toFixed(1)));
                
            break;

        case "石門2":
            $('.powergenTotalM1').html(commafy(v2.toFixed(1)));
            break;

        case "義興":
            $('.powergenTotalM2').html(commafy(v3.toFixed(1)));
            break;
    }
}

function checkIsOverMinute(sTime, eTime){
    //若資料為null，則為錯誤日期，因此回傳false
    if (sTime.getTime() == new Date(null).getTime() || eTime.getTime() == new Date(null).getTime()) {
        return false;
    }

    var nowDate = new Date();
    if (Math.ceil((sTime.getTime() - eTime.getTime()) / 60000) > 6) {
        return true;
    }
    else {
        return false;
    }
}