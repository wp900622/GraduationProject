// params

var stage, rainfall, retain, retainRate, inflow, supplyFlow, behindRetainStage, behindRetain, allocate4Taoyuan, allocate4Shihmen, pump4Sanxia, pump4Yuanshan,
    supply4Northern, supplyShihmenBenshin, supplyTaoyuanSecond, supplyShihmen, supply12, supplyHsinchu, supplyTaoyuan, supplyShihmenSupport, allocateCPC, allocateNcsist, date;

var y_stage, y_rainfall, y_retain, y_retainRate, y_inflow, y_supplyFlow, y_behindRetainStage, y_behindRetain, y_allocate4Taoyuan, y_allocate4Shihmen, y_pump4Sanxia, y_pump4Yuanshan,
    y_supply4Northern, y_supplyShihmenBenshin, y_supplyTaoyuanSecond, y_supplyShihmen, y_supply12, y_supplyHsinchu, y_supplyTaoyuan, y_supplyShihmenSupport, y_allocateCPC, y_allocateNcsist, y_date;

var b_stage, b_rainfall, b_retain, b_retainRate, b_inflow, b_supplyFlow, b_take4LonN, b_retain4Baoshan, b_retainRate4Baoshan, b_take4Baoshan, b_outflow4Baoshan, b_date;

var b_y_stage, b_y_rainfall, b_y_retain, b_y_retainRate, b_y_inflow, b_y_supplyFlow, b_y_take4LonN, b_y_retain4Baoshan, b_y_retainRate4Baoshan, b_y_take4Baoshan, b_y_outflow4Baoshan, b_y_date

var opump4Sanxia;
var opump4Yuanshan;
var osupply4Northern;
var osupplyShihmenBenshin;
var osupplyTaoyuanSecond;
var osupplyShihmen;
var osupply12;
var osupplyHsinchu;
var osupplyTaoyuan;
var osupplyShihmenSupport;

var timerId;
var StockChart = [];
var zIndex = 0;

var searchDate;
var searchSBaoDate;
var searchEBaoDate;

var searchSShihDate;
var searchEShihDate;
var timeblockShihYPV = [];
var timeblockYInFlow = [];
var timeblockYOutFlow = [];

var searchSSWSDate;
var searchESWSDate;

var SMhourAddminute = 0; // nicholas 20210420
var timeblockBaoYPV = [];
var timeblockBaoYInFlow = [];
var timeblockBaoYOutFlow = [];
var timeblockLonNStage = []; // 隆恩堰水位

var timeblockBao2AddBaoshanYInflow = [];
var timeblockBao2AddBaoshanYOutflow = [];
var timeblockBao2overflow = [];//溢放流量

var timeblockYA = [];
var timeblockYB = [];
var timeblockYC = [];
var timeblockYD = [];

// var triggerShimenRealTime = { "picG": false , "picI" : false, "picT": false };//石門即時統計
// var triggerShimenYearTime = { "picA": false , "picB" : false };//石門歷線圖
// var triggerShimenTime = { "Rain": false , "Flow" : false, "Stage" : false };//石門區間統計
// var triggerBaoRealTime = { "Rain": false , "Flow" : false, "Stage" : false  };//寶二即時統計
// var triggerBaoTime = { "Rain": false , "Flow" : false, "Stage" : false , "LonN": false };//寶二區間統計
// var triggerBaoYearTime = { "picA": false , "picB" : false };//寶二水庫歷線圖
// var triggerShimenSupply = { "SWSA": false , "SWSB" : false };//石門區間統計

var TyphoonWarning = {};

//Init
dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
    getWaterDetail4Shihmen("");
    getWaterDetail4ShihmenFlow("");
    getWaterDetail4Baoshan("");
    getCCTV();
    doAjax("getTyphoonWarning", {} , getTyphoonWarning);//載入颱風事件清單
    getElectricityStationData_WaterPage();//發電流量
    countSpeed();
}

// bind event
function bindEvent() 
{
    StockChart[0] = [];
    StockChart[1] = [];
    StockChart[2] = [];
    StockChart[3] = [];

    $("#myTab>li").off().on("click",function(){
        if($(this).find("a").attr("id")=="tab3-tab")
        {
            $(".a_date").hide();
            $("#c_date").hide();
            $("#b_date").show();
            $(".btnRange").show();
           // $("#realtimeInfoHeaderB").show();
           // $("#realtimeInfoBodyB").show();
            zIndex = 1;
            $("#allTabDataTimeInfo").hide();
        }
        else if($(this).find("a").attr("id")=="tab4-tab" || $(this).find("a").attr("id")=="tab5-tab")
        {
            $(".a_date").hide();
            $("#b_date").hide();
            $("#c_date").show();
            $("#c_date").html(getCurrentDate());
            $(".btnRange").hide();
            $("#allTabDataTimeInfo").show();
        }
        else
        {
            $("#b_date").hide();
            $("#c_date").hide();
            $(".a_date").show();
            $(".btnRange").show();
           // $("#realtimeInfoHeaderA").show();
           // $("#realtimeInfoBodyA").show();
            zIndex = 0;
            $("#allTabDataTimeInfo").hide();
        }

        if ($(this).find("a").attr("id") == "tab1-tab"/* || $(this).find("a").attr("id") == "tab3-tab"*/)
        {
            $("#realtimeStageValue").html("0.0");
            if ($(this).find("a").attr("id") == "tab1-tab") {
                $("#realtimeBao").html("石門");
                
                /*$.ajax({
                    crossDomain: true,
                    cache: false,
                    headers: { "cache-control": "no-cache" },
                    url: serviceURL + "/getWraNBData.asmx/getRealStageShemen",
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (msg) {
                        $("#realtimeStageValue").html(msg["getRealStageShemen"][0]["Shemen"] != null ? msg["getRealStageShemen"][0]["Shemen"] : 0.0);
                        $("#realtimeStageValueMm").html("(" + msg["getRealStageShemen"][0]["InDate"].substring(11, 13) + ":" + msg["getRealStageShemen"][0]["InDate"].substring(14, 16) + ")");
                    },
                    error: function (e) {
                        navigator.notification.alert("無法取得資料", null, "系統異常");
                    }
                });*/
            }
            else {
                $("#realtimeBao").html("寶二");
                /*$.ajax({
                    crossDomain: true,
                    cache: false,
                    headers: { "cache-control": "no-cache" },
                    url: serviceURL + "/getWraNBData.asmx/getRealStageBao",
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (msg) {
                        $("#realtimeStageValue").html(msg["getRealStageBao"][0]["value"] != null ? msg["getRealStageBao"][0]["value"] : "0.0");
                        $("#realtimeStageValueMm").html("(" + msg["getRealStageBao"][0]["InDate"].substring(11, 13) + ":" + msg["getRealStageBao"][0]["InDate"].substring(14, 16) + ")");
                    },
                    error: function (e) {
                        navigator.notification.alert("無法取得資料", null, "系統異常");
                    }
                });*/
            }

            if($('.btnBack').css('display') == 'none')
                $("#realtimeStage").show();
            
        }
        else {
            $("#realtimeStage").hide();
        }

        if ($(this).find("a").attr("id") == "tab1-tab" || $(this).find("a").attr("id") == "tab2-tab" || $(this).find("a").attr("id") == "tab3-tab") {
            $("#timeicon").removeClass("glyphicon glyphicon-time");
            $("#timeicon").addClass("glyphicon glyphicon-search");
        }
        else {
            $("#timeicon").removeClass("glyphicon glyphicon-search");
            $("#timeicon").addClass("glyphicon glyphicon-time");
            $("#timeblock").off()
        }

    });
    
    $("#timeblock").off().on("click", function(){
    });

    //#region 颱風歷史事件
    $('.TyphoonYear').change(function(){
        // debugger;

        var valeq;
        var val;
        var station_id = '';
        if ($("#pageEighth").css('display') !== "none") { // is shimen
            station_id = "pageEighth";
        }else{ // is bao
            station_id = "pageBaoHistory";
        }

        var valeq = $('#' + station_id).find(".TyphoonYear option:selected").index();
        var val = $('#' + station_id).find(".TyphoonYear option:selected").filter(':selected').val();

        
        // $('.TyphoonEvent').empty(); // clear first
        $('#' + station_id).find('.TyphoonEvent').empty(); // clear first
        if (valeq == 0) {
            $('#' + station_id).find('.TyphoonEvent').append(`<option value="">事件</option>`);
            if (station_id == "pageEighth") {
                $('#sShihCustomDateText').val('');
                $('#eShihCustomDateText').val('');
            }else if(station_id == "pageBaoHistory"){
                $('#sBaoCustomDateText').val('');
                $('#eBaoCustomDateText').val('');
            }

        }else{
            for (let i = 0; i < TyphoonWarning[val].length; i++) {
                // console.log(TyphoonWarning[val][i].names);
                $('#' + station_id).find('.TyphoonEvent').append(`<option value='${TyphoonWarning[val][i].names}'>${TyphoonWarning[val][i].names}</option>`);
            }
            // display first data at Textbox
            var sTime = TyphoonWarning[val][0].sTime.substring(0,9).split('-');
            var eTime = TyphoonWarning[val][0].eTime.substring(0,9).split('-');
            
            if (station_id == "pageEighth") {
                $('#sShihCustomDateText').val(sTime[0] + "年" + sTime[1] + "月" + sTime[2] + "日");
                $('#eShihCustomDateText').val(eTime[0] + "年" + eTime[1] + "月" + eTime[2] + "日");
            }else if(station_id == "pageBaoHistory"){
                $('#sBaoCustomDateText').val(sTime[0] + "年" + sTime[1] + "月" + sTime[2] + "日");
                $('#eBaoCustomDateText').val(eTime[0] + "年" + eTime[1] + "月" + eTime[2] + "日");
            }
        }
    });


    $('.TyphoonEvent').change(function(){
        // debugger;
        var station_id;
        if ($("#pageEighth").css('display') !== "none")  // is shimen
            station_id = "pageEighth";
        else // is bao
            station_id = "pageBaoHistory";
        

        var val = $('#' + station_id).find(".TyphoonYear option:selected").filter(':selected').val();
        var Typhoon = $('#' + station_id).find(".TyphoonEvent option:selected").filter(':selected').val();

        for (let i = 0; i < TyphoonWarning[val].length; i++) {
            if (TyphoonWarning[val][i].names == Typhoon) {
                var sTime = TyphoonWarning[val][i].sTime.substring(0,9).split('-');
                var eTime = TyphoonWarning[val][i].eTime.substring(0,9).split('-');

                if (station_id == "pageEighth") {
                    $('#sShihCustomDateText').val(sTime[0] + "年" + sTime[1] + "月" + sTime[2] + "日");
                    $('#eShihCustomDateText').val(eTime[0] + "年" + eTime[1] + "月" + eTime[2] + "日");
                }else if(station_id == "pageBaoHistory"){
                    $('#sBaoCustomDateText').val(sTime[0] + "年" + sTime[1] + "月" + sTime[2] + "日");
                    $('#eBaoCustomDateText').val(eTime[0] + "年" + eTime[1] + "月" + eTime[2] + "日");
                }
            }
        }
        
    });
    //#endregion

    $(".sSDateText").off().on("click", function () {
        //$('#sSDate').datetimepicker('show');
        var myDate = new Date(); // From model.
        var txtId = this.id;

        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('2017/01/01'),
            maxDate: new Date(getCurrentDateADDiff(1)),
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
            searchDate = yyyy2yyy(timeStamp2StringAddDays(newDate, true, 1));
            $("#sSDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            $("#s1SDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            $("#s2SDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            $("#s3SDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            // 自動點查詢
            $("#" + txtId).closest(".DataTimeInfo").find(".search").eq(0).click();
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

    $(".sSDateText").on("change", function () {
        $("#sSDateText").val(this.value);
        $("#s1SDateText").val(this.value);
        $("#s2SDateText").val(this.value);
        $("#s3SDateText").val(this.value);
    });

    $("#sShihCustomDateText").off().on("click", function () {
        var myDate = new Date(); // From model.
        // reset typhoon dropdownlist.
        $(".TyphoonYear").val("defalt_year");
        $('.TyphoonEvent').empty(); // clear first
        $('.TyphoonEvent').append(`<option value="">事件</option>`);
        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('1957/01/01'),
            // maxDate: new Date(getCurrentDateADDiff(1)),
            maxDate: new Date(getCurrentDateADDiff(0)),
            locale: "ZH-TW",
            okText: "確定",
            cancelText: "取消",
            android: {
                theme: 16974126, // Theme_DeviceDefault_Dialog
                calendar: false,
                is24HourView: true
            },
            success: function (newDate) {
                // Handle new date.
                console.info(newDate);
                var datetime = new Date();
                datetime.setTime(newDate);
                searchSShihDate = datetime.getTime();
                //$("#sShihCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                //$("#eShihCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                var rocDate = leftPad(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[0], 3) + "年" + yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[1];
                $("#sShihCustomDateText").val(rocDate);
                $("#eShihCustomDateText").val(rocDate);
            },
            cancel: function () {
                console.info("Cancelled");
            },
            error: function (err) {
                // Handle error.
                console.error(err);
            }
        });
    });

    $("#eShihCustomDateText").off().on("click", function () {
        var myDate = new Date(); // From model.
        // reset typhoon dropdownlist.
        $(".TyphoonYear").val("defalt_year");
        $('.TyphoonEvent').empty(); // clear first
        $('.TyphoonEvent').append(`<option value="">事件</option>`);
        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('1957/01/01'),
            // maxDate: new Date(getCurrentDateADDiff(1)),
            maxDate: new Date(getCurrentDateADDiff(0)),
            locale: "ZH-TW",
            okText: "確定",
            cancelText: "取消",
            android: {
                theme: 16974126, // Theme_DeviceDefault_Dialog
                calendar: false,
                is24HourView: true
            },
            success: function (newDate) {
                // Handle new date.
                console.info(newDate);
                var datetime = new Date();
                datetime.setTime(newDate);
                searchEShihDate = datetime.getTime();
                //$("#eShihCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                var rocDate = leftPad(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[0], 3) + "年" + yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[1];
                $("#eShihCustomDateText").val(rocDate);
            },
            cancel: function () {
                console.info("Cancelled");
            },
            error: function (err) {
                // Handle error.
                console.error(err);
            }
        });
    });

    $("#sBaoCustomDateText").off().on("click", function () {
        var myDate = new Date(); // From model.
        // reset typhoon dropdownlist.
        $(".TyphoonYear").val("defalt_year");
        $('.TyphoonEvent').empty(); // clear first
        $('.TyphoonEvent').append(`<option value="">事件</option>`);
        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('2017/01/01'),
            maxDate: new Date(getCurrentDateADDiff(1)),
            locale: "ZH-TW",
            okText: "確定",
            cancelText: "取消",
            android: {
                theme: 16974126, // Theme_DeviceDefault_Dialog
                calendar: false,
                is24HourView: true
            },
            success: function (newDate) {
                // Handle new date.
                console.info(newDate);
                var datetime = new Date();
                datetime.setTime(newDate);
                searchSBaoDate = datetime.getTime();
                $("#sBaoCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                $("#eBaoCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            },
            cancel: function () {
                console.info("Cancelled");
            },
            error: function (err) {
                // Handle error.
                console.error(err);
            }
        });
    });

    $("#eBaoCustomDateText").off().on("click", function () {
        var myDate = new Date(); // From model.
        // reset typhoon dropdownlist.
        $(".TyphoonYear").val("defalt_year");
        $('.TyphoonEvent').empty(); // clear first
        $('.TyphoonEvent').append(`<option value="">事件</option>`);
        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('2017/01/01'),
            maxDate: new Date(getCurrentDateADDiff(1)),
            locale: "ZH-TW",
            okText: "確定",
            cancelText: "取消",
            android: {
                theme: 16974126, // Theme_DeviceDefault_Dialog
                calendar: false,
                is24HourView: true
            },
            success: function (newDate) {
                // Handle new date.
                console.info(newDate);
                var datetime = new Date();
                datetime.setTime(newDate);
                searchEBaoDate = datetime.getTime();
                $("#eBaoCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            },
            cancel: function () {
                console.info("Cancelled");
            },
            error: function (err) {
                // Handle error.
                console.error(err);
            }
        });
    });

    $("#sSWSCustomDateText").off().on("click", function () {
        var myDate = new Date(); // From model.

        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('2017/01/01'),
            maxDate: new Date(getCurrentDateADDiff(1)),
            locale: "ZH-TW",
            okText: "確定",
            cancelText: "取消",
            android: {
                theme: 16974126, // Theme_DeviceDefault_Dialog
                calendar: false,
                is24HourView: true
            },
            success: function (newDate) {
                // Handle new date.
                console.info(newDate);
                var datetime = new Date();
                datetime.setTime(newDate);
                searchSSWSDate = datetime.getTime();
                $("#sSWSCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                $("#eSWSCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            },
            cancel: function () {
                console.info("Cancelled");
            },
            error: function (err) {
                // Handle error.
                console.error(err);
            }
        });
    });

    $("#eSWSCustomDateText").off().on("click", function () {
        var myDate = new Date(); // From model.

        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: new Date('2017/01/01'),
            maxDate: new Date(getCurrentDateADDiff(1)),
            locale: "ZH-TW",
            okText: "確定",
            cancelText: "取消",
            android: {
                theme: 16974126, // Theme_DeviceDefault_Dialog
                calendar: false,
                is24HourView: true
            },
            success: function (newDate) {
                // Handle new date.
                console.info(newDate);
                var datetime = new Date();
                datetime.setTime(newDate);
                searchESWSDate = datetime.getTime();
                $("#eSWSCustomDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
            },
            cancel: function () {
                console.info("Cancelled");
            },
            error: function (err) {
                // Handle error.
                console.error(err);
            }
        });
    });


    $("#clear").off().on("click", function () {
        $("#timeicon").click();
    });

    $("#clearShihCustomDate").off().on("click", function () {
        $("#btnShihCustomDate").click();
    });

    $("#clearBaoCustomDate").off().on("click", function () {
        $("#btnBaoCustomDate").click();
    });

    $("#clearSWSCustomDate").off().on("click", function () {
        $("#btnSWSCustomDate").click();
    });
/*
    $('#sSDate').datetimepicker({
        lang: 'ch',
        timepicker: false,
        onGenerate: function (ct) {
            //$(this).find('.xdsoft_date.xdsoft_weekend')
            //    .addClass('xdsoft_disabled');
        },
        format: 'Y-m-d',
        minDate: new Date().getFullYear() + '/01/01', // yesterday is minimum date
        maxDate: getCurrentDateADDiff(1), // and tommorow is maximum date calendar
        onSelectDate: function (ct, $i) {
            $("#sSDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
        }
    });*/
    // 點指定日期後，直接跳出日曆供點選 20210419
    $(".btnSelectDate").on("click", function () {
        if ($(this).closest(".DataTimeInfo").find(".collapse").is('.collapse:not(.in)')) {
            $(this).closest(".DataTimeInfo").find(".sSDateText").eq(0).click();
        }
    });



    $(".search").off().on("click", function () {
        if ($('#sSDateText').val() == "" || $('#sEDateText').val() == "")
            alert("請選擇日期");
        else {
            $(".a_date").html($('#sSDateText').val());
            $("#b_date").html($('#sSDateText').val());
            searchDate = $("#sSDateText").val();
            var str = (parseInt(searchDate.substring(0, 3)) + 1911) + searchDate.substring(3).replace("年", "-").replace("月", "-").replace("日", "");

            var nwdate = new Date(str);
            nwdate.setDate(nwdate.getDate() + 1);

            getWaterDetail4Shihmen(nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate());
            getWaterDetail4Baoshan(nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate());

            $("#realtimeStage").hide();
            $("#btnLineShimen").hide();
            $("#btnLineBaoW").hide();
            $("#btnLineBaoC").hide();

            $("#realtimeInfoHeaderA").hide();
            $("#realtimeInfoBodyA").hide();
            $("#realtimeInfoHeaderB").hide();
            $("#realtimeInfoBodyB").hide();
            
            $(".btnBack").show();

            $(this).closest(".DataTimeInfo").find(".collapse").eq(0).collapse('hide');
            //$("#timeicon").click();
        }
    });

    $(".clear").off().on("click", function () {
        $(this).closest(".DataTimeInfo").find(".collapse").eq(0).collapse('hide');
    });

    $("#searchShihCustomDate").off().on("click", function () {
        //if ($('#sSCustomDateText').val() == "" || $('#eSCustomDateText').val() == "")
        //    alert("請選擇日期");
        //else {
        //    $("#b_date").html($('#sSCustomDateText').val() + "~" + $('#eSCustomDateText').val());

        //    var d = (new Date(yyy2yyyy($('#sSCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eSCustomDateText').val()))));
        //    var sdd = (parseInt($('#sSCustomDateText').val().substring(0, 3)) + 1911) + $('#sSCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
        //    var edd = (parseInt($('#eSCustomDateText').val().substring(0, 3)) + 1911) + $('#eSCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");

        //    if (sdd != edd) {
        //        var nwdate = new Date(edd);
        //        nwdate.setDate(nwdate.getDate() + 1);
        //        var d = (new Date(yyy2yyyy($('#sSCustomDateText').val())).dateDiff("d", new Date(nwdate)));

        //        edd = nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate();
        //    }
        //    else {
        //        var nwdate = new Date(edd);
        //        nwdate.setDate(nwdate.getDate() + 1);

        //        edd = nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate();
        //    }


        //    $("#btnCustomDate").click();
        //}
        if ($('#sShihCustomDateText').val() == "" || $('#eShihCustomDateText').val() == "")
            alert("請選擇日期");
        else {
            var sdd = (parseInt($('#sShihCustomDateText').val().substring(0, 3)) + 1911) + $('#sShihCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            var edd = (parseInt($('#eShihCustomDateText').val().substring(0, 3)) + 1911) + $('#eShihCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            searchSShihDate = new Date(sdd).getTime();
            searchEShihDate = new Date(edd).getTime();
            var d = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
            if ( d < 0 ){ //防呆
                alert("結束日期須大於開始日期！");
                return;
            }else if (d > 366){
                alert("自訂區間所選天數最多為366天！");
                return;
            }
            //StockChart[zIndex][101].xAxis[0].setExtremes(searchSShihDate, searchEShihDate);
            //StockChart[zIndex][102].xAxis[0].setExtremes(searchSShihDate, searchEShihDate);
            //StockChart[zIndex][103].xAxis[0].setExtremes(searchSShihDate, searchEShihDate);
            //reCountShihRain(searchSShihDate, searchEShihDate);
            var sDate = new Date(sdd);
            var eDate = new Date(edd);
            var sNewDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
            var eNewDate = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() + 1);

            var doUpdateUIFlag = false;

            var allHourDataOldestDate = new Date(2020, 8, 25);
            if (d < 11) {

                if (searchSShihDate < allHourDataOldestDate.getTime() && searchEShihDate < allHourDataOldestDate.getTime()) {

                    //若小於2002/10/08，則跳提示無資料
                    var allDataOldestDate = new Date(2002, 9, 8);
                    if (searchSShihDate < allDataOldestDate.getTime() && searchEShihDate < allDataOldestDate.getTime()) {
                        alert("091/10/08前無10日內小時資料，請改查10日以上之每日資料");
                    }
                    else if (searchSShihDate < allDataOldestDate.getTime() || searchEShihDate < allDataOldestDate.getTime()) {
                        alert("091/10/08前無10日內小時資料，請改查10日以上之每日資料");
                    }
                    else {
                        alert("091/10/08~109/09/25間無水位、流量小時資料");

                        //呈現小時資料
                        doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getRainDataAnalysisDay);
                        // doAjax("getShimenRealtimeHLine", { "sDate": formatDate(allHourDataOldestDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeHLine);
                        doAjax("getShimenRealtimeFLine", { "sDate": formatDate(allHourDataOldestDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeFLine);
                        doAjax("getShimenRealtimeHLineAddContain", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeHLineAddContain);

                        //流量標題
                        $("#stationFlowShih").html("石門時均流量(cms)");

                        doUpdateUIFlag = true;
                    }
                }
                else if (searchSShihDate < allHourDataOldestDate.getTime() || searchEShihDate < allHourDataOldestDate.getTime()) {
                    alert("091/10/08~109/09/25間無水位、流量小時資料");

                    //呈現小時資料
                    doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getRainDataAnalysisDay);
                    // doAjax("getShimenRealtimeHLine", { "sDate": formatDate(allHourDataOldestDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeHLine);
                    doAjax("getShimenRealtimeFLine", { "sDate": formatDate(allHourDataOldestDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeFLine);
                    doAjax("getShimenRealtimeHLineAddContain", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeHLineAddContain);

                    //流量標題
                    $("#stationFlowShih").html("石門時均流量(cms)");

                    doUpdateUIFlag = true;
                }
                else {

                    //呈現小時資料
                    // alert('here');
                    doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getRainDataAnalysisDay);
                    // doAjax("getShimenRealtimeHLine", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeHLine);
                    doAjax("getShimenRealtimeFLine", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeFLine);
                    doAjax("getShimenRealtimeHLineAddContain", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getShimenRealtimeHLineAddContain);

                    //流量標題
                    $("#stationFlowShih").html("石門時均流量(cms)");

                    doUpdateUIFlag = true;
                }
                
            }
            else {
                doAjax("getShihmenHistoryCustomDate", { "sDate": sdd, "eDate": edd }, getShihmenHistoryCustom);

                //若小於2017/06/07，則跳提示無資料
                var allDataOldestDate = new Date(2017, 5, 7);
                if (searchSShihDate < allDataOldestDate.getTime() || searchEShihDate < allDataOldestDate.getTime()) {
                    //$("#divShihStageAndFlow").hide();
                    //$("#spShihCustomDate").html($("#spShihCustomDate").html() + "(106年前僅顯示雨量)")
                    alert("106/06/07前無完整雨量、水位、流量日資料");
                }
                else {
                    $("#divShihStageAndFlow").show();
                }

                //流量標題
                $("#stationFlowShih").html("石門流量(萬噸/日)");

                doUpdateUIFlag = true;
            }


            if (doUpdateUIFlag) {
                $("#stationShihRain").hide();
                $("#stationShihRainCustom").show();
                $("#stationShihStage").hide();
                $("#stationShihStageAddContainCustom").show();
                $("#stationShihFlow").hide();
                $("#stationShihFlowCustom").show();
                //重置石門區間統計水量及流量UI
                $("#divShihStageAndFlow").show();

                $("#btnShihCustomDate").click();


                //換自訂按鈕亮起來
                $(".zoom_controls.zoom_controls_range a").removeClass("active");
                $("#btnShihCustomDate").addClass("active");

                //年月日
                $("#spShihCustomDate").html("資料區間: " + $('#sShihCustomDateText').val() + "~" + $('#eShihCustomDateText').val()); //@@@
                
                //typhoone display formate
                var valeq = $(".TyphoonYear option:selected").index();
                var val = $(".TyphoonEvent option:selected").filter(':selected').val();
                if (valeq != 0) {//如果不是顯示'年度'，代表有選擇日期
                    $("#spShihCustomDate").html('('+ val+ ')' + $('#sShihCustomDateText').val() + "~" + $('#eShihCustomDateText').val());
                }
            }
            
        }
    });

    $("#searchBaoCustomDate").off().on("click", function () {
        if ($('#sBaoCustomDateText').val() == "" || $('#eBaoCustomDateText').val() == "")
            alert("請選擇日期");
        else
        {
            var sdd = (parseInt($('#sBaoCustomDateText').val().substring(0, 3)) + 1911) + $('#sBaoCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            var edd = (parseInt($('#eBaoCustomDateText').val().substring(0, 3)) + 1911) + $('#eBaoCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            searchSBaoDate = new Date(sdd).getTime();
            searchEBaoDate = new Date(edd).getTime();
            var d = (new Date(yyy2yyyy($('#sBaoCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eBaoCustomDateText').val()))));
            if (d < 0) {
                alert("結束日期須大於開始日期！");
                return;
            }
            if (d > 366) {
                alert("自訂區間所選天數最多為366天！");
                return;
            }
            var sDate = new Date(sdd);
            var eDate = new Date(edd);
            var sNewDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
            var eNewDate = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate() + 1); 
            var doUpdateUIFlag = false;
            if (sDate.getTime() > eDate.getTime()){
                alert('結束日期不得小於開始日期！');
                return;
            }
            //
            var DayEarly = new Date(2011, 11, 31);
            var HourEarly = new Date(2018, 0, 10);//若小於2018/01/10，則跳提示無資料
            if (d < 11) {

                if(searchSBaoDate < HourEarly.getTime() || searchEBaoDate < HourEarly.getTime()){
                    alert("107/1/10以前無小時資料！");
                }
                else if(searchSBaoDate < new Date(2021, 0, 1) || searchEBaoDate <= new Date(2021, 0, 1)){
                    alert("110/01/01以前無水位、蓄水量、流量小時資料！");
                    doAjax("getRTRainBaoByHours", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getRTRainHourWithTen);
                    doAjax("getBaoRealtimeHLineAddContain", { "sDate": formatDate(new Date(2021, 0, 1)), "eDate": formatDate(eNewDate) }, getBaoRealtimeHLine);
                    doUpdateUIFlag = true;

                    //流量標題
                    $('#stationFlowBao').html('寶二時均流量(cms)');
    
                    //隆恩堰沒有小時資料 所以隱藏
                    $("#stationLonNStageCustom").hide();//隆恩堰
                    $("#stationLonNStage").hide();//隆恩堰
                    $("#stationLonNStageTotalText").hide();
                    $("#stationLonNStageText").hide();
                }
                else{
                    //照常
                    doAjax("getRTRainBaoByHours", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getRTRainHourWithTen);
                    doAjax("getBaoRealtimeHLineAddContain", { "sDate": formatDate(sNewDate), "eDate": formatDate(eNewDate) }, getBaoRealtimeHLine);
                    doUpdateUIFlag = true;

                    //流量標題
                    $('#stationFlowBao').html('寶二時均流量(cms)');
    
                    //隆恩堰沒有小時資料 所以隱藏
                    $("#stationLonNStageCustom").hide();//隆恩堰
                    $("#stationLonNStage").hide();//隆恩堰
                    $("#stationLonNStageTotalText").hide();
                    $("#stationLonNStageText").hide();
                }
            }
            else
            {
                if(searchSBaoDate < DayEarly.getTime() || searchEBaoDate < DayEarly.getTime()){
                    alert("100/12/31以前無資料！");
                    return;
                }else if (checkBaoCustomDate(searchSBaoDate, searchEBaoDate) !== '') {
                    alert(checkBaoCustomDate(searchSBaoDate, searchEBaoDate));
                }
              doAjax("getBaoHistoryCustomDate", { "sDate": sdd, "eDate": edd }, getBaoHistoryCustom);
              // 流量標題
              $('#stationFlowBao').html('寶山+寶二流量(萬噸/日)');
              // 隆恩堰 & 標題
              $("#stationLonNStageTotalText").show();
              $("#stationLonNStageText").show();
              $("#stationLonNStageCustom").show();//隆恩堰
              $("#stationLonNStage").hide();//隆恩堰
              doUpdateUIFlag = true;

            }

            //StockChart[zIndex][98].xAxis[0].setExtremes(searchSBaoDate, searchEBaoDate);
            //StockChart[zIndex][99].xAxis[0].setExtremes(searchSBaoDate, searchEBaoDate);
            //StockChart[zIndex][100].xAxis[0].setExtremes(searchSBaoDate, searchEBaoDate);
            //reCountBaoRain(searchSBaoDate, searchEBaoDate);
           if (doUpdateUIFlag) {
            $("#stationBao").hide();
            $("#stationBaoCustom").show();
            $("#stationBaoStage").hide();
            $("#stationBaoStageCustom").show();
            $("#stationBaoFlow").hide();
            $("#stationBaoFlowCustom").show();
            $("#stationBao2AddBaoFlow").hide();


            $("#btnBaoCustomDate").click();

            //換自訂按鈕亮起來
            $(".zoom_controls.zoom_controls_range a").removeClass("active");
            $("#btnBaoCustomDate").addClass("active");
            $("#spBaoCustomDate").html("資料區間: " + $('#sBaoCustomDateText').val() + "~" + $('#eBaoCustomDateText').val()); // @@@
                        
            //typhoone display formate
            var valeq =  $('#pageBaoHistory').find(".TyphoonYear option:selected").index();
            var val =  $('#pageBaoHistory').find(".TyphoonEvent option:selected").filter(':selected').val();
            if (valeq != 0) {//如果不是顯示'年度'，代表有選擇日期
                $("#spBaoCustomDate").html('('+ val+ ')' + $('#sBaoCustomDateText').val() + "~" + $('#eBaoCustomDateText').val());
            }
           }
           
        }
    });

    $("#searchSWSCustomDate").off().on("click", function () {
        if ($('#sSWSCustomDateText').val() == "" || $('#eSWSCustomDateText').val() == "")
            alert("請選擇日期");
        else {
            var sdd = (parseInt($('#sSWSCustomDateText').val().substring(0, 3)) + 1911) + $('#sSWSCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            var edd = (parseInt($('#eSWSCustomDateText').val().substring(0, 3)) + 1911) + $('#eSWSCustomDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            searchSSWSDate = new Date(sdd).getTime();
            searchESWSDate = new Date(edd).getTime();
            var d = (new Date(yyy2yyyy($('#sSWSCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eSWSCustomDateText').val()))));

            if (searchESWSDate < searchSSWSDate) {//防呆
                alert("結束日期須大於開始日期！");
                return;
            }
            if (d > 366) {
                alert("自訂區間所選天數最多為366天！");
                return;
            }
            //StockChart[zIndex][90].xAxis[0].setExtremes(searchSSWSDate, searchESWSDate);
            //StockChart[zIndex][91].xAxis[0].setExtremes(searchSSWSDate, searchESWSDate);
            //reCountSWS(searchSSWSDate, searchESWSDate);
            doAjax("getWaterDetailManagementX_New_YearCustomDate", { "sDate": sdd, "eDate": edd }, getWaterDetailManagementX_New_YearCustom);
            $("#stationSWSA").hide();
            $("#stationSWSACustom").show();
            $("#stationSWSB").hide();
            $("#stationSWSBCustom").show();

            $("#btnSWSCustomDate").click();

            //換自訂按鈕亮起來
            $(".zoom_controls.zoom_controls_range a").removeClass("active");
            $("#btnSWSCustomDate").addClass("active");
            $("#spSWSCustomDate").html("資料區間: " + $('#sSWSCustomDateText').val() + "~" + $('#eSWSCustomDateText').val());
        }
    });

    $(".btnBack").off().on("click", function () {
        $("#realtimeStage").show();
        $("#btnLineShimen").show();
        $("#btnLineBaoW").show();
        $("#btnLineBaoC").show();
        $("#realtimeInfoHeaderA").show();
        $("#realtimeInfoBodyA").show();
        $("#realtimeInfoHeaderB").show();
        $("#realtimeInfoBodyB").show();

        $(".btnBack").hide();

        getWaterDetail4Shihmen("");
        getWaterDetail4ShihmenFlow("");
        getWaterDetail4Baoshan("");
    });

    $(".SMGET_ALL").parent().parent().off().on("click", function() {
        $(".SM_ALLBOX").toggle();
    });

        $(".btnSMDetail").off().on("click", function() {
            $(".info_blue h4.nosubtitle").toggle();
        
    });

    $(".HCGET_ALL").parent().parent().off().on("click", function() {
        $(".HCGET_ALLBOX").toggle();
    });

    $(".HC_OutflowALL").parent().parent().off().on("click", function() {
        $(".HC_OutflowALLBOX").toggle();
    });
    $(".btnHCDetail").off().on("click", function() {
        $(".info_green h4.nosubtitle").toggle();
        $(".HC_OutflowALLBOX").toggle();
    });
    
    $(".btnZMDetail").off().on("click", function() {
        $(".info_blue h4.nosubtitle").toggle();
    });

    $(".btnSJDetail").off().on("click", function() {
        $(".info_green h4.nosubtitle").toggle();
    });

    $(".btnRange").off().on("click", function () { //寶二區間統計
        $("#pageFirst").toggle();
        $("#stationW").html("");
        $("#stationC").html("");
        $("#picD").empty();
        $("#picE").empty();
        $("#picF").empty();
        $("#lightArea").show();
        var date = new Date();
        var nowM = date.getMonth();
        //特定範圍
        //var sDate = new Date(date.getFullYear(), date.getMonth(), 1);
        //var eDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        //doAjax("getRainDataAnalysisAllRangeByDays", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRainDataAnalysisAll);

        //全年
        var index = $("li[role='presentation']").index($("li[role='presentation'][class='active']"));
        var sDate = new Date(date.getFullYear(), 0, 1);
        var eDate = new Date(date.getFullYear(), 11, 31);

        if (index == 0)
        {
            $("#pageEighth").toggle();
            $("#stationShihRain").show();
            $("#stationShihRainCustom").hide();
            $("#stationShihStage").show();
            $("#stationShihStageAddContainCustom").hide();
            $("#stationShihFlow").show();
            $("#stationShihFlowCustom").hide();
            doAjax("getShihmenHistory", "", getShihmenHistory);
            //月日
            $("#spShihCustomDate").html("資料區間: " + (nowM + 1) + "月1日~" + (nowM + 1) + "月" + new Date(date.getFullYear(), nowM + 1, 0).getDate() + "日"); //@@@
            //流量標題
            $("#stationFlowShih").html("石門流量(萬噸/日)");
        }
        else if (index == 1) {
            $("#pageShimenWaterSupplyHistory").toggle();
            $("#stationSWSA").show();
            $("#stationSWSACustom").hide();
            $("#stationSWSB").show();
            $("#stationSWSBCustom").hide();
            doAjax("getWaterDetailManagementX_New_Year", "", getWaterDetailManagementX_New_Year);
            //月日
            $("#spSWSCustomDate").html("資料區間: " + (nowM + 1) + "月1日~" + (nowM + 1) + "月" + new Date(date.getFullYear(), nowM + 1, 0).getDate() + "日");
        }
        else if (index == 2) {
            $("#pageBaoHistory").toggle();
            $("#stationBao").show();
            $("#stationBaoCustom").hide();
            $("#stationBaoStage").show();
            $("#stationBaoStageCustom").hide();
            // $("#stationBaoFlow").show();
            $("#stationBaoFlow").hide();
            $("#stationBao2AddBaoFlow").show();
            $("#stationBaoFlowCustom").hide();
            $("#stationLonNStageTotalText").show();// 隆恩堰顯示文字
            $("#stationLonNStageText").show();// 隆恩堰顯示文字
            $("#stationLonNStage").show(); // 隆恩堰
            $("#stationLonNStageCustom").hide(); // 隆恩堰
            doAjax("getBaoHistory", "", getBaoHistory);
            doAjax("getBao2AddBaoshanHistory", "", getBao2AddBaoshanHistory);
            // 流量標題
            $('#stationFlowBao').html('寶山+寶二流量(萬噸/日)');
            //月日
            $("#spBaoCustomDate").html("資料區間: " + (nowM + 1) + "月1日~" + (nowM + 1) + "月" + new Date(date.getFullYear(), nowM + 1, 0).getDate() + "日");
        }
        //doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByHours);
        //doAjax("getShimenHLine", "", getShimenRealtimeHLine);
        //doAjax("getShimenHLineCAPACITYUPLINE", "", getShimenHLineCAPACITY);
    });

    $("#btnBaoRange").off().on("click", function () {
        $("#pageBaoHistory").toggle();
        $("#pageFirst").toggle();
        $(".zoom_controls.zoom_controls_range a").removeClass("active");
        $(".zoom_controls.zoom_controls_range a[data-range^='1m']").addClass("active");
        //$(".zoom_controls a[data-range^='1m']").click();

        //自訂按鈕燈熄滅
        $("#btnBaoCustomDate").removeClass("active");
        $("#spBaoCustomDate").html(" ");
    });

    $("#btnShimenWaterSupplyRange").off().on("click", function () {
        $("#pageShimenWaterSupplyHistory").toggle();
        $("#pageFirst").toggle();
        $(".zoom_controls.zoom_controls_range a").removeClass("active");
        $(".zoom_controls.zoom_controls_range a[data-range^='1m']").addClass("active");
        //$(".zoom_controls a[data-range^='1m']").click();

        //自訂按鈕燈熄滅
        $("#btnSWSCustomDate").removeClass("active");
        $("#spSWSCustomDate").html(" ");
    });

    $("#btnLineShimenRealtime").off().on("click", function () {//石門即時統計
        $("#pageFirst").toggle();
        $("#pageSeventh").toggle();
        $("#stationW").html("");
        $("#stationC").html("");
        $("#picD").empty();
        $("#picE").empty();
        $("#picF").empty();
        $("#lightArea").show();
        var date = new Date();
        //即時歷線圖一次撈10天的資料
        var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1);
        var eDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);
        doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRainDataAnalysisDay);
        //doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByHours);
        // doAjax("getShimenRealtimeHLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeHLine);
        doAjax("getShimenRealtimeFLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeFLine);
        // 水位+蓄水量統計圖
        doAjax("getShimenRealtimeHLineAddContain", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeHLineAddContain);
        
        //doAjax("getShimenHLineCAPACITYUPLINE", "", getShimenHLineCAPACITY);
    });

    $("#btnLineShimen").off().on("click", function () {
        $("#pageFirst").toggle();
        $("#pageFourth").toggle();
        $("#stationW").html("石門");
        $("#stationC").html("石門");
        $("#picA").empty();
        $("#picB").empty();
        $("#lightArea").show();
        doAjax("getShimenHLine", "", getShimenHLine);
        doAjax("getShimenHLineCAPACITYUPLINE", "", getShimenHLineCAPACITY);
        window.scrollTo(0, 0);
    });

    $("#btnLineBaoW").off().on("click", function () {
        $("#pageFirst").toggle();
        $("#pageFourth").toggle();
        $("#stationW").html("寶二");
        $("#stationC").html("寶二");
        $("#picA").empty();
        $("#picB").empty();
        $("#lightArea").hide();
        doAjax("getBaoHLine", "", getBaoHLine);
        doAjax("getBaoHLineCAPACITY", "", getBaoHLineCAPACITY);
        window.scrollTo(0,0);
    });

    $("#btnLineBaoB").off().on("click", function () {
        $("#pageFirst").toggle();
        $("#pageFourth").toggle();
        $("#stationW").html("寶山");
        $("#stationC").html("寶山");
        $("#picA").empty();
        $("#picB").empty();
        $("#lightArea").hide();
        doAjax("getBaoBLine", "", getBaoBLine);
        doAjax("getBaoBLineCAPACITY", "", getBaoBLineCAPACITY);
        window.scrollTo(0, 0);
    });

    $("#btnLineBaoRealtime").off().on("click", function () {//寶二即時統計
        $("#pageFirst").toggle();
        $("#pageBaoRTStatistics").toggle();
        $("#picRTRainBao").empty();
        $("#picRTStageBao").empty();
        $("#picRTFlowBao").empty();
        // debugger;
        var date = new Date();
        //即時歷線圖一次撈10天的資料
        var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1);
        var eDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);
        doAjax("getRTRainBaoByHours", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRTRainHourWithTen);
        // doAjax("getBaoRealtimeHLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getBaoRealtimeHLine);
        doAjax("getBaoRealtimeHLineAddContain", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getBaoRealtimeHLine);
        // 流量標題
        $('#stationFlowBao').html('寶二時均流量(cms)');
        //doAjax("getShimenRealtimeFLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeFLine);
        // $('.zoom_controls.zoom_controls_HourTen a').eq(0).click(); // 20210606 add this 如果點二日出去再回來不會重置
    });

    $("#btnLineBaoC").off().on("click", function () {
        $("#pageFirst").toggle();
        $("#pageFive").toggle();
        $("#picC").empty();
        doAjax("getBao3HLineCAPACITY", "", getBao3HLineCAPACITY);
    });

    $("#btnRT").off().on("click", function () {
        $("#pageFourth").toggle();
        $("#pageFirst").toggle();
    });

    $("#btnRTRealtime").off().on("click", function () {
        $("#pageSeventh").toggle();
        $("#pageFirst").toggle();
        $(".zoom_controls.zoom_controls_day a").removeClass("active");
        $(".zoom_controls.zoom_controls_day a[data-range^='1d']").addClass("active");
    });

    $("#btnBKBaoRealtime").off().on("click", function () {
        $("#pageBaoRTStatistics").toggle();
        $("#pageFirst").toggle();
        $(".zoom_controls.zoom_controls_HourTen a").removeClass("active");
        $(".zoom_controls.zoom_controls_HourTen a[data-range^='1d']").addClass("active");
    });

    //石門每日歷線頁面 返回按鈕
    $("#btnRTRange").off().on("click", function () {
        $("#pageEighth").toggle();
        $("#pageFirst").toggle();
        $(".zoom_controls.zoom_controls_range a").removeClass("active");
        $(".zoom_controls.zoom_controls_range a[data-range^='1m']").addClass("active");
        //$(".zoom_controls.zoom_controls_range a[data-range^='1m']").click();

        //自訂按鈕燈熄滅
        $("#btnShihCustomDate").removeClass("active");
        $("#spShihCustomDate").html(" ");

        //重置石門區間統計水量及流量UI
        $("#divShihStageAndFlow").show();
    });

    $("#btnXXX").off().on("click", function () {
        $("#pageFive").hide();
        $("#pageFirst").show();
    });

    var proto = Highcharts.Chart.prototype;
    proto.zoomToD = function (delta) {
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
                StockChart[zIndex][xIndex].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 10
                    },
                });
                break;
            case 1:
                StockChart[zIndex][xIndex].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 10
                    },
                });
                break;
            case 2:
            case 5:
            case 11:
                StockChart[zIndex][xIndex].xAxis[0].update({
                    tickInterval: 28 * 24 * 3600 * 1000,
                    labels: {
                        step: null
                    }
                });
                break;
        }
        StockChart[zIndex][xIndex].xAxis[0].setExtremes(chartMin, chartMax);

        return false;
    };
    proto.zoom1m = function () {
        return this.zoomToD(0);
    };
    proto.zoom2m = function () {
        return this.zoomToD(1);
    };
    proto.zoom3m = function () {
        return this.zoomToD(2);
    };
    proto.zoom6m = function () {
        return this.zoomToD(5);
    };
    proto.zoom1y = function () {
        return this.zoomToD(11);
    };
    proto.zoomToDLeapYear = function (delta) {
        var y = new Date(2020, 0, 1).getFullYear();
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
                StockChart[zIndex][xIndex].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 10
                    },
                });
                break;
            case 1:
                StockChart[zIndex][xIndex].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 10
                    },
                });
                break;
            case 2:
            case 5:
            case 11:
                StockChart[zIndex][xIndex].xAxis[0].update({
                    tickInterval: 28 * 24 * 3600 * 1000,
                    labels: {
                        step: null
                    }
                });
                break;
        }
        StockChart[zIndex][xIndex].xAxis[0].setExtremes(chartMin, chartMax);

        return false;
    };
    proto.zoom1mLeapYear = function () {
        return this.zoomToDLeapYear(0);
    };
    proto.zoom2mLeapYear = function () {
        return this.zoomToDLeapYear(1);
    };
    proto.zoom3mLeapYear = function () {
        return this.zoomToDLeapYear(2);
    };
    proto.zoom6mLeapYear = function () {
        return this.zoomToDLeapYear(5);
    };
    proto.zoom1yLeapYear = function () {
        return this.zoomToDLeapYear(11);
    };

    $('.zoom_controls a').click(function (e) {
        e.preventDefault();
        var call = 'zoom' + $(this).attr('data-range');
        var isLastYear = false;
        if ($(this).attr('data-chart') == "realtime" || $(this).attr('data-chart') == "range")
            return;
        if ($(this).attr('data-chart') == "search")
            xIndex = $(this).attr('data-index');
        else if ($(this).attr('data-chart') == "searchLeapYear") {
            xIndex = $(this).attr('data-index');
            call = call + 'LeapYear';
        }

        if ($(this).attr('data-index').indexOf(",") == -1)
            StockChart[zIndex][xIndex][call]();
        else
        {
            //若data-index有多個，一次需更新多張chart
            var spIndex = $(this).attr('data-index').split(",");
            var m = new Date().getMonth();

            //判斷是否為點選去年按鈕，或是需要撈過去資料
            if ($(this).attr('data-chart') == "search-last-year") {
                isLastYear = true;
                var y = new Date().getFullYear() - 1;
                var sdd = y + "-01-01";
                var edd = y + "-12-31";
                

                ShowCustomDateUI($(this).attr('data-site'), sdd, edd);
            }
            else if ((m == 0 || m == 1) && ($(this).index() == 1 || $(this).index() == 2)) {
                //若為當年1月、2月且為2個月或是3個月區間，則必須呼叫getShihmenHistoryCustomDate撈去年資料，原呼叫getShihmenHistory僅撈現在年的資料
                isLastYear = true;
                var y = new Date().getFullYear();
                
                var sDate = new Date(y, m - $(this).index(), 1);
                var eDate = new Date(y, m + 1, 0);
                
                var sdd = formatDate(sDate.getTime());
                var edd = formatDate(eDate.getTime());

                ShowCustomDateUI($(this).attr('data-site'), sdd, edd);
                
            }
            else {
                for (var i = 0; i < spIndex.length; i++) {
                    xIndex = spIndex[i];
                    StockChart[zIndex][spIndex[i]][call]();
                }
            }

            if ($(this).attr('data-recount') == "true" && isLastYear == false)
            {
                var chartMin;
                var chartMax;

                var y = new Date().getFullYear();
                var maxM = new Date().getMonth();
                var minM = new Date().getMonth() - $(this).index();
                var today = new Date().getDate();

                if (minM < 0 && $(this).index() < 3) {
                    maxM = $(this).index();
                    minM = 0;
                }

                if ($(this).index() < 3) {
                    chartMin = Date.UTC(y, minM, 1);
                    // chartMax = new Date().getTime();
                    chartMax = Date.UTC(y, maxM, today);
                }
                //else if ($(this).index() == 3) {
                //    y = y - 1;
                //    minM = 0;
                //    maxM = 11;
                //    chartMin = Date.UTC(y, 0, 1);
                //    chartMax = Date.UTC(y, 11, 31);
                //}
                else {
                    chartMin = Date.UTC(y, 0, 1);
                    chartMax = Date.UTC(y, 11, 31);
                    minM = 0;
                    maxM = 11;
                }
                
                if ($(this).attr('data-site') == "shimen") {
                    $("#stationSWSA").show();
                    $("#stationSWSACustom").hide();
                    $("#stationSWSB").show();
                    $("#stationSWSBCustom").hide();
                    reCountSWS(chartMin, chartMax);
                    //自訂按鈕燈熄滅
                    $("#btnSWSCustomDate").removeClass("active");
                    //月日
                    $("#spSWSCustomDate").html("資料區間: " + (minM + 1) + "月1日~" + (maxM + 1) + "月" + new Date(y, maxM + 1, 0).getDate() + "日");
                }
                else if ($(this).attr('data-site') == "shimen-day-range") {
                    $("#stationShihRain").show();
                    $("#stationShihRainCustom").hide();
                    $("#stationShihStage").show();
                    $("#stationShihStageAddContainCustom").hide();
                    $("#stationShihFlow").show();
                    $("#stationShihFlowCustom").hide();
                    reCountShihRain(chartMin, chartMax);
                    //自訂按鈕燈熄滅
                    $("#btnShihCustomDate").removeClass("active");
                    //月日
                    $("#spShihCustomDate").html("資料區間: " + (minM + 1) + "月1日~" + (maxM + 1) + "月" + new Date(y, maxM + 1, 0).getDate() + "日"); //@@@
                    //流量標題
                    $("#stationFlowShih").html("石門流量(萬噸/日)");
                }
                else {
                    $("#stationBao").show();
                    $("#stationBaoCustom").hide();
                    $("#stationBaoStage").show();
                    $("#stationBaoStageCustom").hide();
                    // $("#stationBaoFlow").show();
                    $("#stationBaoFlow").hide();
                    $("#stationBao2AddBaoFlow").show();
                    $("#stationBaoFlowCustom").hide();
                    $("#stationLonNStage").show(); //隆恩堰
                    $("#stationLonNStageCustom").hide();//隆恩堰
                    reCountBaoRain(chartMin, chartMax);
                    reCountBao2AddBaoRain(chartMin, chartMax);
                    //自訂按鈕燈熄滅
                    $("#btnBaoCustomDate").removeClass("active");
                    //月日
                    $("#spBaoCustomDate").html("資料區間: " + (minM + 1) + "月1日~" + (maxM + 1) + "月" + new Date(y, maxM + 1, 0).getDate() + "日"); //@@@
                    // 流量標題
                    $('#stationFlowBao').html('寶山+寶二流量(萬噸/日)');
                }
            }
            
        }

        $(this).parent().children("a").removeClass('active');
        $(this).addClass('active');

    });

    $('.zoom_controls.zoom_controls_day a').click(function (e) {
        // debugger;
        e.preventDefault();

        //撈區間
        var range = $(this).attr('data-range');
        var daysToMinus = 1;
        switch (range) {
            case "1d":
                daysToMinus = 0;
                break;
            case "2d":
                daysToMinus = 1;
                break;
            case "3d":
                daysToMinus = 2;
                break;
            case "5d":
                daysToMinus = 4;
                break;
            case "10d":
                daysToMinus = 9;
                break;
            default:
                break;
        }
        var date = new Date();
        var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
        var eDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);

        ////撈10天
        //var date = new Date();
        //var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 9, 1);
        //var eDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);
        doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRainDataAnalysisDay);
        // doAjax("getShimenRealtimeHLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeHLine);
        doAjax("getShimenRealtimeFLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeFLine);
        doAjax("getShimenRealtimeHLineAddContain", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeHLineAddContain);


        $(this).parent().children("a").removeClass('active');
        $(this).addClass('active');

    });

    $('.zoom_controls.zoom_controls_HourTen a').click(function (e) {// 寶二 區間
        e.preventDefault();

        //撈區間
        var range = $(this).attr('data-range');
        var daysToMinus = 1;
        switch (range) {
            case "1d":
                daysToMinus = 0;
                break;
            case "2d":
                daysToMinus = 1;
                break;
            case "3d":
                daysToMinus = 2;
                break;
            case "5d":
                daysToMinus = 4;
                break;
            case "10d":
                daysToMinus = 9;
                break;
            default:
                break;
        }
        var date = new Date();
        var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
        var eDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);

        ////撈10天
        //var date = new Date();
        //var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 9, 1);
        //var eDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1);
        doAjax("getRTRainBaoByHours", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRTRainHourWithTen);
        // doAjax("getBaoRealtimeHLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getBaoRealtimeHLine);
        doAjax("getBaoRealtimeHLineAddContain", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getBaoRealtimeHLine);

        //doAjax("getShimenRealtimeFLine", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getShimenRealtimeFLine);
        // 流量標題
        $('#stationFlowBao').html('寶二時均流量(cms)');

        $(this).parent().children("a").removeClass('active');
        $(this).addClass('active');

    });

    //$('.zoom_controls.zoom_controls_range a').click(function (e) {
    //    e.preventDefault();
    //    var range = $(this).attr('data-range');
    //    var delta = 1;
    //    switch (range) {
    //        case "1m":
    //            delta = 0;
    //            break;
    //        case "2m":
    //            delta = 1;
    //            break;
    //        case "3m":
    //            delta = 2;
    //            break;
    //        case "1y":
    //            delta = 11;
    //            break;
    //        default:
    //            break;
    //    }


    //    var date = new Date();
    //    var y = date.getFullYear();
    //    var maxM = new Date().getMonth();
    //    var minM = new Date().getMonth() - delta;
    //    if (minM < 0) {
    //        minM = 0;

    //        maxM = delta;
    //    }


    //    //var sDate = new Date(date.getFullYear(), minM, 1);
    //    //var eDate = new Date(date.getFullYear(), maxM + 1, 0);
    //    //doAjax("getRainDataAnalysisAllRangeByDays", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRainDataAnalysisAll);
    //    doAjax("getRainDataAnalysisAllRangeByDays", { "sDate": formatDate(sDate), "eDate": formatDate(eDate) }, getRainDataAnalysisAll);


    //    $(this).parent().children("a").removeClass('active');
    //    $(this).addClass('active');

    //});

    $("div[id^='ReservoirHeader']").off().on("click", function () {
        $("#" + $(this).attr("alt")).toggle();
    });
}

function getTyphoonWarning(msg){
    var AllYearList = msg["getTyphoonAllYear"];
    var data = msg["getTyphoonWarning"];

    for (let i = 0; i < AllYearList.length; i++) {
        TyphoonWarning[AllYearList[i].years] = [];
        //render to html
        $('.TyphoonYear').append(`<option value='${AllYearList[i].years}'>${AllYearList[i].years}</option>`);
    }
    
    for (let i = 0; i < data.length; i++) {
        TyphoonWarning[data[i].years].push({"names": data[i].name , "sTime": data[i].starttime, "eTime": data[i].endtime});
    }

}


// getData Function
function getWaterDetail4Shihmen(date) {
    var action = "?sid=0&date=" + date;
    var specificdate = getParameterByName("date");
    if (specificdate != null && specificdate != "")
        action = "Date?sid=0&date=" + specificdate;

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getWaterDetailManagementX_New" + action,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function(msg) {
            var data = msg["getWaterDetailManagement"][0];
            var decimals2Arr = ["SM_LEVEL", "HC_LEVEL", "CC_LEVEL", "YS_LEVEL", "shihmenRealtimeStage"];
            var arrDataIdShihmen = [".shihmenRealtimeStage", ".shihmenRealtimeContain", ".shihmenRealtimeContainP"];
            var arrDataIdBackpool = ["#realtimeBackpoolStageValue",".realtimeBackpoolStageContain"];
            var arrDataIdZhAdjustmentValue = ["#realtimezhAdjustmentValue",".realtimezhAdjustmentContain"];
            var arrDataIdYunshangStage = ["#realtimeYunshangStageValue", "#realtimeYunshangContain"];
            //var arrDataIdShihmen = ["shihmenRealtimeStage", "shihmenRealtimeContain"];
            //var arrDataIdShihmenFlow = ["shihmenRealtimeFlowIn", "shihmenRealtimeFlowOut"];
            //var arrDataIdBackpool = ["realtimeBackpoolStageValue", "realtimeBackpoolStageContain"];
            //var arrDataIdZhAdjustmentValue = ["realtimezhAdjustmentValue", "realtimezhAdjustmentContain"];
            //var arrDataIdYunshangStage = ["realtimeYunshangStageValue", "realtimeYunshangContain"];

            Object.keys(data).forEach(function (key) {
                if (key == "HC_OutflowQuan")
                    return;
                var objV = data[key];
                if (objV != null) {
                    objV = parseFloat(objV);
                    var decimalsVal = 1;

                    if (key == "SMGET_szSMIA")
                        decimalsVal = decimalsVal;
                    for (var x = 0; x < decimals2Arr.length; x++)
                    {
                        if (decimals2Arr[x] == key) {
                            decimalsVal = 2;
                            break;
                        }
                    }

                    var timeDataKeyName = "";
                    var timeClassName = "";

                    if (arrDataIdShihmen.indexOf("#" + key) > -1 || arrDataIdShihmen.indexOf("." + key) > -1) {
                        timeDataKeyName = "shihmen_time"
                        timeClassName = ".shihmen_timeMm";
                    }
                    else if (arrDataIdBackpool.indexOf("#" + key) > -1 || arrDataIdBackpool.indexOf("." + key) > -1) {
                        timeDataKeyName = "backpool_time"
                        timeClassName = ".realtimeBackpoolStageValueMm";
                    }
                    else if (arrDataIdZhAdjustmentValue.indexOf("#" + key) > -1 || arrDataIdZhAdjustmentValue.indexOf("." + key) > -1) {
                        timeDataKeyName = "backpool_time"
                        timeClassName = ".realtimezhAdjustmentValueMm";
                    }
                    else if (arrDataIdYunshangStage.indexOf("#" + key) > -1 || arrDataIdYunshangStage.indexOf("." + key) > -1) {
                        timeDataKeyName = "yunshang_time"
                        timeClassName = ".realtimeYunshangContainMm";
                    }

                    if (timeDataKeyName != "") {
                        //即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                        var realTimeDate = new Date(data[timeDataKeyName]);
                        if (checkDataTimeIsOverdue(realTimeDate)) {
                            $("span[class='" + key + "']").html("--");
                            $(timeClassName).html("(--:--)");
                        }
                        else {
                            $("span[class='" + key + "']").countTo({
                                from: 0,
                                to: objV,
                                speed: 1500,
                                decimals: decimalsVal,
                                refreshInterval: 50,
                                onComplete: function (value) {
                                    console.debug(this);
                                }
                            });
                        }

                    }
                    else {
                        $("span[class='" + key + "']").countTo({
                            from: 0,
                            to: objV,
                            speed: 1500,
                            decimals: decimalsVal,
                            refreshInterval: 50,
                            onComplete: function (value) {
                                console.debug(this);
                                $(this).html(commafy(value.toFixed(decimalsVal)));
                            }
                        });
                    }
                    
                } else {
                    $("span[class='" + key + "']").html("--");
                }
            });

            date = data["minusOneDay"];
            //$("#a_date").html("資料區間: " + (date.substring(0, 4) - 1911) + "年" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日 00時~24時");
            $(".a_date").html( (date.substring(0, 4) - 1911) + "年" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日 00時~24時");

            //----------------------石門水情----------------------//

            // 分層取水工(20210729不用計算，直接接欄位)
            // toCount("span[class='SMGET_layerTotal']", countValue(data, ["SMGET_layerDIV2", "SMGET_layerCSIST", "SMGET_layerCPC", "SMGET_layerSMIA", "SMGET_layerTYIA"]));
            // 石門大圳
            toCount("span[class='SMGET_Sz']", countValue(data, ["SMGET_szDIV2", "SMGET_szCSIST", "SMGET_szSMIA"]), function () {
                // 農業
                //toCount("span[class='SMGET_ALL']", countValue(data, ["SMGET_szDIV2", "SMGET_szCSIST", "SMGET_szSMIA", "SMGET_Layer"]));
                // 取出水量
                toCount("span[class='SMGET_ALL']", countValue(data, ["SMGET_layerDIV2", "SMGET_layerCSIST", "SMGET_layerCPC", "SMGET_layerSMIA", "SMGET_layerTYIA", "SMGET_szDIV2", "SMGET_szCSIST", "SMGET_szSMIA", "HYK_lawyer"]));
            });
            //放水量
            toCount("span[class='SM_OutflowALL']", countValue(data, ["SM_POWER", "SM_PRO", "SM_OTHER"]));

            // 入流量
            toCount("span[class='HCINPUT_ALL']", countValue(data, ["SM_POWER", "SM_PRO", "SM_OTHER"]));

            // 桃園大圳(20210729不用計算，直接接欄位)
            // toCount("span[class='HC_TAO']", countValue(data, ["HCGET_tzDIV2", "HCGET_tzCSIST", "HCGET_tzCPC", "HCGET_tzTYIA"]), function () {
            // });
            // 取出水量
            toCount("span[class='HCGET_ALL']", countValue(data, ["HCGET_tzDIV2", "HCGET_tzCSIST", "HCGET_tzCPC", "HCGET_tzTYIA", "HCGET_pumpDIV2", "HCGET_xz", "HYK_TY"]));

            // 沖刷道放流(計量)
            toCount("span[class='HC_OutflowQuan']", countValue(data, ["HC_TYIA", "HC_CCWEIR", "YSGET_DIV2", "YSGET_DIV12"]), function () {
                // 放水量
                toCount("span[class='HC_OutflowALL']", countValue(data, ["HC_TYIA", "HC_CCWEIR", "YSGET_DIV2", "YSGET_DIV12", "HC_Overflow", "HC_OutflowGate"]));
            });

            // 中庄調整池
            toCount("span[class='CCGET_ALL']", countValue(data, ["CCGET_DIV2", "CCGET_DIV12"]));

            // 取出水量
            toCount("span[class='YSGET_ALL']", countValue(data, ["PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol"]));

            // 水公司十二區處(板新)
            toCount("span[class='PUB_DIV12_DAMsupply T']", countValue(data, ["PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol"]));

            // 水公司二區處(大湳)
            toCount("span[class='YSGET_DIV2 T']", countValue(data, ["PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol"]));

            //----------------------石門供水----------------------//

            // 帳面
            // 桃園
            toCount("span[class='SSMGETI']", countValue(data, ["SMGET_layerTYIA", "HCGET_tzTYIA", "HCGET_xz", "HC_TYIA"]));
            // 石門
            toCount("span[class='SSMGETH']", countValue(data, ["SMGET_layerSMIA", "SMGET_szSMIA"]), function () {
                // 農業
                toCount("span[class='SSMGETHI']", countValue(data, ["SMGET_layerSMIA", "SMGET_szSMIA", "SMGET_layerTYIA", "HCGET_tzTYIA", "HCGET_xz", "HC_TYIA"]));
            });

            // 帳面
            // 水公司12
            toCount("span[class='YS_GETM']", countValue(data, ["CCGET_DIV12", "YSGET_DIV12"]));
            // 水公司2
            toCount("span[class='YS_GETL']", countValue(data, ["SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "YSGET_DIV2"]), function () {
                //公共給水
                toCount("span[class='YS_GETLM']", countValue(data, ["SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "YSGET_DIV2", "CCGET_DIV12", "YSGET_DIV12"]));
            });

            // 帳面
            // 中山科學院
            toCount("span[class='CC_GETJ']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST"]));
            // 中油挑練廠
            toCount("span[class='CC_GETK']", countValue(data, ["SMGET_layerCPC", "HCGET_tzCPC"]), function () {
                // 個別工業
                toCount("span[class='CC_GETJK']", countValue(data, ["SMGET_layerCPC", "HCGET_tzCPC", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "HYK_lawyerAddTY"]), function () {
                    // 帳面總共
                    toCount("span[class='billAll']", countValue(data, ["SMGET_layerSMIA", "SMGET_szSMIA", "SMGET_layerTYIA", "HCGET_tzTYIA", "HCGET_xz", "HC_TYIA", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "YSGET_DIV2", "CCGET_DIV12", "YSGET_DIV12", "SMGET_layerCPC", "HCGET_tzCPC", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "HYK_lawyerAddTY"]));
                });
            });

            // 實際
            // 桃園
            toCount("span[class='SSMGETO']", countValue(data, ["SMGET_layerTYIA", "HCGET_xz", "HC_TYIA", "HCGET_tzTYIA", "-AGRI_TYsupplyDIV2", "-AGRI_TYsupplyHYK", "-AGRI_TYsupplyNYK", "-AGRI_TYsupplyTK", "-AGRI_TYsupplyYD"]));
            // 石門
            toCount("span[class='SSMGETN']", countValue(data, ["SMGET_layerSMIA", "SMGET_szSMIA", "-AGRI_SMsupplyDIV2"]), function () {
                // 農業
                toCount("span[class='SSMGETNO']", countValue(data, ["SMGET_layerTYIA", "HCGET_xz", "HC_TYIA", "HCGET_tzTYIA", "-AGRI_TYsupplyDIV2", "-AGRI_TYsupplyHYK", "-AGRI_TYsupplyNYK", "-AGRI_TYsupplyTK", "-AGRI_TYsupplyYD", "SMGET_layerSMIA", "SMGET_szSMIA", "-AGRI_SMsupplyDIV2"]));
            });

            // 實際供水 > 農業用水 > 桃園水利會 > 支援水公司二區處
            toCount("span[class='AGRI_TYsupplyDIV2']", countValue(data, ["-AGRI_TYsupplyDIV2"]));
            // 實際供水 > 公共給水 > 水公司二區處 > 桃園水利會支援
            toCount("span[class='AGRI_TYsupplyDIV2 G']", countValue(data, ["AGRI_TYsupplyDIV2"]));

            // 支援華亞科等
            toCount("span[class='AGRI_TYsupplyHYKNYKTKYD']", countValue(data, ["-AGRI_TYsupplyHYK", "-AGRI_TYsupplyNYK", "-AGRI_TYsupplyTK", "-AGRI_TYsupplyYD"]));


            // 支援支援水公司二區處
            toCount("span[class='AGRI_SMsupplyDIV2']", countValue(data, ["-AGRI_SMsupplyDIV2"]));
            toCount("span[class='AGRI_SMsupplyDIV2 G']", countValue(data, ["AGRI_SMsupplyDIV2"]));
            
            // 支援二區處
            toCount("span[class='PUB_DIV12support']", countValue(data, ["-PUB_DIV12support"]));
            toCount("span[class='PUB_DIV12support positive']", countValue(data, ["PUB_DIV12support"]));

            // 實際
            // 水公司12
            toCount("span[class='CCGET_U']", countValue(data, ["CCGET_DIV12", "PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol"]));
            // toCount("span[class='PUB_DIV12pumpYS']", countValue(data, ["PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol"]));//棄用?

            // 水公司2
            // 水庫取水
            // toCount("span[class='CCGET_16910']", countValue(data, ["SMGET_layerDIV2", "SMGET_szDIV2", "-HCGET_tzDIV2", "HCGET_pumpDIV2"]));//棄用?
            // 鳶山堰(抽水)
            // toCount("span[class='PUB_DIV2pumpYS']", countValue(data, ["PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol"]));//棄用?
            toCount("span[class='CCGET_T']", countValue(data, ["SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2"]), function () {
                // 公共給水
                toCount("span[class='CCGET_TU']", countValue(data, ["CCGET_DIV12", "PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2"]));
            });

            // 實際供水 > 公共給水 > 支援三區處
            toCount("span[class='PUB_DIV2supplyDIV3']", countValue(data, ["-PUB_DIV2supplyDIV3"]));
            console.log("-------------------------");
            // 實際
            // 中山科
            toCount("span[class='CC_GETP']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST"]));

            // 中油
            toCount("span[class='CC_GETQ']", countValue(data, ["SMGET_layerCPC", "HCGET_tzCPC"]));

            // //華亞科
            // toCount("span[class='CC_GETRLIST']", countValue(data, ["AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD"]), function () {
            //     // 個別工業
            //     toCount("span[class='CC_GETPQRSTU']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD"]), function () {
            //         // 帳面總共
            //         toCount("span[class='realAll']", countValue(data, ["SMGET_layerTYIA", "HCGET_xz", "HC_TYIA", "HCGET_tzTYIA", "-AGRI_TYsupplyDIV2", "-AGRI_TYsupplyHYK", "-AGRI_TYsupplyNYK", "-AGRI_TYsupplyTK", "-AGRI_TYsupplyYD", "SMGET_layerSMIA", "SMGET_szSMIA", "-AGRI_SMsupplyDIV2", "CCGET_DIV12", "PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD"]));
            //     });
            // });
            
            // 個別工業
            //toCount("span[class='CC_GETPQRSTU']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD", "HYK_lawyerAddTY"]), function () {
            toCount("span[class='CC_GETPQRSTU']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "HYK_TY_Suitable"]), function () {
                // 帳面總共
                toCount("span[class='realAll']", countValue(data, ["SMGET_layerTYIA", "HCGET_xz", "HC_TYIA", "HCGET_tzTYIA", "-AGRI_TYsupplyDIV2", "-AGRI_TYsupplyHYK", "-AGRI_TYsupplyNYK", "-AGRI_TYsupplyTK", "-AGRI_TYsupplyYD", "SMGET_layerSMIA", "SMGET_szSMIA", "-AGRI_SMsupplyDIV2", "CCGET_DIV12", "PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "HYK_TY_Suitable"]));
            });

            // 處理上升下降
            var dataYesterday = msg["getWaterDetailManagement"][1];

            var compareValueArr = ["SM_LEVEL", "SM_CAPACITY", "HC_LEVEL", "HC_CAPACITY", "CC_LEVEL", "CC_CAPACITY", "YS_LEVEL", "YS_CAPACITY"];
            var comparePointArr = [2, 1, 2, 1, 2, 1, 2, 1];

            for (var i = 0; i < compareValueArr.length; i++) {
                var value;
                if (data[compareValueArr[i]] != null && dataYesterday[compareValueArr[i]] != null)
                {
                    value = data[compareValueArr[i]] - dataYesterday[compareValueArr[i]];
                    $("#d_" + compareValueArr[i]).countTo({
                        from: 0,
                        to: value,
                        speed: 1500,
                        decimals: comparePointArr[i],
                        refreshInterval: 50,
                        onComplete: function (value) {
                            console.debug(this);
                        }
                    });
                }
                else
                {
                    value = 0;
                    $("#d_" + compareValueArr[i]).html("--");
                }

                
                if (value > 0) {
                    $("#s_" + compareValueArr[i]).removeClass("glyphicon-arrow-up").removeClass("glyphicon-arrow-down").addClass("glyphicon glyphicon-arrow-up");
                    $("#s_" + compareValueArr[i]).parent().removeClass().addClass("label label-success").attr("style", "padding: .3em .5em ;");
                } else if (value < 0) {
                    $("#s_" + compareValueArr[i]).removeClass("glyphicon-arrow-up").removeClass("glyphicon-arrow-down").addClass("glyphicon glyphicon-arrow-down");
                    $("#s_" + compareValueArr[i]).parent().removeClass().addClass("label label-danger").attr("style", "padding: .3em .5em ;");
                } else {
                    $("#s_" + compareValueArr[i]).removeClass("glyphicon-arrow-up").removeClass("glyphicon-arrow-down");
                    $("#s_" + compareValueArr[i]).parent().removeClass().addClass("label").attr("style", "padding: .3em .5em ;border: 1px solid #fff;");
                }
            }

            if (data["backpool"] != null) {
                var v = parseFloat(data["backpool"]);
                var contain = (-3047.3017 * Math.pow(v - 129.5, 3) + 64625.52 * Math.pow(v-129.5, 2) + 105041.9518*(v - 129.5))/ 10000
                $("#realtimeBackpoolStageValue").html(data["backpool"].toFixed(2));
                //後池蓄水量負值時顯示為"--"，大於等於0的時候才顯示值
                if (contain >= 0)
                    $(".realtimeBackpoolStageContain").html(contain.toFixed(1));
                $(".realtimeBackpoolStageValueMm").html("(" + data["backpool_time"].substring(11, 13) + ":" + data["backpool_time"].substring(14, 16) + ")");

                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var backpoolTimeDate = new Date(data["backpool_time"]);
                if (checkDataTimeIsOverdue(backpoolTimeDate)) {
                    for (var i = 0; i < arrDataIdBackpool.length; i++) {
                        $(arrDataIdBackpool[i]).html("--");
                    }
                    $(".realtimeBackpoolStageValueMm").html("--");
                }
            }

            if (data["zhAdjustment"] != null) {
                var v = parseFloat(data["zhAdjustment"]);
                var contain = (4139.56564 * Math.pow(v, 2) - 154686.83218 * v - 3570298.90633) / 10000
                $("#realtimezhAdjustmentValue").html(data["zhAdjustment"].toFixed(2));
                $(".realtimezhAdjustmentContain").html(contain.toFixed(1));
                $(".realtimezhAdjustmentValueMm").html("(" + data["backpool_time"].substring(11, 13) + ":" + data["backpool_time"].substring(14, 16) + ")");

                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var zhAdjustmentDate = new Date(data["backpool_time"]);
                if (checkDataTimeIsOverdue(zhAdjustmentDate)) {
                    for (var i = 0; i < arrDataIdZhAdjustmentValue.length; i++) {
                        $(arrDataIdZhAdjustmentValue[i]).html("--");
                    }
                    $(".realtimezhAdjustmentValueMm").html("(--:--)");
                }
            }

            if (data["yunshangRealtimeStage"] != null) {
                $("#realtimeYunshangStageValue").html(data["yunshangRealtimeStage"].toFixed(2));
                $("span[class^='realtimeYunshangStageValueMm']").html("(" + data["yunshang_time"].substring(11, 13) + ":" + data["yunshang_time"].substring(14, 16) + ")");
                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var yunshangDate1 = new Date(data["yunshang_time"]);
                if (checkDataTimeIsOverdue(yunshangDate1)) {
                    for (var i = 0; i < arrDataIdYunshangStage.length; i++) {
                        $(arrDataIdYunshangStage[i]).html("--");
                    }
                    $(".realtimeYunshangStageValueMm").html("(--:--)");
                }
            }

            if (data["yunshangContain"] != null) {
                $("#realtimeYunshangContain").html(data["yunshangContain"].toFixed(1));
                $("span[class^='realtimeYunshangContainMm']").html("(" + data["yunshang_time"].substring(11, 13) + ":" + data["yunshang_time"].substring(14, 16) + ")");
                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var yunshangDate2 = new Date(data["yunshang_time"]);
                if (checkDataTimeIsOverdue(yunshangDate2)) {
                    for (var i = 0; i < arrDataIdYunshangStage.length; i++) {
                        $(arrDataIdYunshangStage[i]).html("--");
                    }
                    $(".realtimeYunshangContainMm").html("(--:--)");
                }
            }

            if (data["yunshangContainP"] != null) {
                $("#realtimeYunshangContainP").html(data["yunshangContainP"].toFixed(1));
                $("#realtimeYunshangContainPMm").html("(" + data["yunshang_time"].substring(11, 13) + ":" + data["yunshang_time"].substring(14, 16) + ")");
            }

            if (data["shihmen_time"] != null) {
                $("span[class^='shihmen_timeMm']").html("(" + data["shihmen_time"].substring(11, 13) + ":" + data["shihmen_time"].substring(14, 16) + ")");
                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var shihmenDate = new Date(data["shihmen_time"]);
                if (checkDataTimeIsOverdue(shihmenDate)) {
                    for (var i = 0; i < arrDataIdShihmen.length; i++) {
                        $(arrDataIdShihmen[i]).html("--");
                    }
                    $(".shihmen_timeMm").html("(--:--)");
                }
            }
        },
        error: function(e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });

    // 20210621 - 前端已經被mark掉了
    // $("#realtimeStageValue").html("0.0");
    // $.ajax({
    //     crossDomain: true,
    //     cache: false,
    //     headers: { "cache-control": "no-cache" },
    //     url: serviceURL + "/getWraNBData.asmx/getRealStageShemen",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "jsonp",
    //     success: function (msg) {
    //         $("#realtimeStageValue").html(msg["getRealStageShemen"][0]["Shemen"] != null ? msg["getRealStageShemen"][0]["Shemen"] : 0.0);
    //         $("#realtimeStageValueMm").html("(" + msg["getRealStageShemen"][0]["InDate"].substring(11, 13)+":" + msg["getRealStageShemen"][0]["InDate"].substring(14, 16)+")");
    //     },
    //     error: function (e) {
    //         navigator.notification.alert("無法取得資料", null, "系統異常");
    //     }
    // });
}

// getData Function
function getWaterDetail4ShihmenFlow(date) {
    var action = "?sid=0&date=" + date;
    var specificdate = getParameterByName("date");
    if (specificdate != null && specificdate != "")
        action = "Date?sid=0&date=" + specificdate;

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getWaterDetailManagementX_New_Flow" + action,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var data = msg["getWaterDetailManagement"][0];

            if (data["shihmen_flow_time"] != null) {
                $("#shihmenRealtimeFlowIn").html(data["shihmenRealtimeFlowIn"] != null ? data["shihmenRealtimeFlowIn"].toFixed(2) : 0.00);
                $("#shihmenRealtimeFlowOut").html(data["shihmenRealtimeFlowOut"] != null ? data["shihmenRealtimeFlowOut"].toFixed(2) : 0.00);
                $("span[class^='shihmen_flow_timeMm']").html("(" + data["shihmen_flow_time"].substring(11, 13) + ":" + data["shihmen_flow_time"].substring(14, 16) + ")");

                var arrDataIdShihmenFlow = ["#shihmenRealtimeFlowIn", "#shihmenRealtimeFlowOut"];
                var shihmenFlowDate = new Date(data["shihmen_flow_time"]);
                //即時水情的時均入流量、出流量1.5小時若沒進來就顯示"--"
                if (checkDataTimeIsOverdue(shihmenFlowDate, 90)) {
                    for (var i = 0; i < arrDataIdShihmenFlow.length; i++) {
                        $(arrDataIdShihmenFlow[i]).html("--");
                    }
                    $(".shihmen_flow_timeMm").html("(--:--)");
                }
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });

}

function getWaterDetail4Baoshan(date) {
    var action = "?sid=1&date=" + date;
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getWaterDetailManagementX_New" + action,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function(msg) {
            var data = msg["getWaterDetailManagement"][0];
            var decimals2Arr = ["stage", "stage_Baoshan", "baoshangRealtimeStage", "baoshangBashitStage", "baoshangRealtimeStage2"];

            var arrDataId = ["BaoshanbaoshangRealtimeStage", "BaoshanbaoshangContain"];
            var arrDataId2 = ["BaoshanbaoshangBashitStage", "BaoshanbaoshangBashitFlow", "BaoshanbaoshangRealtimeStage2", "BaoshanbaoshangContain2","Baoshanbao2AddbaoshangContain","Baoshanbao2AddbaoshangContainP"];
            var arrDataId3 = ["BaoshanRealtimeFlowIn", "BaoshanRealtimeFlowOut"];
            Object.keys(data).forEach(function(key) {
                var objV = data[key];
                if (objV != null) {
                    objV = parseFloat(objV);
                    var decimalsVal = 1;
                    for (var x = 0; x < decimals2Arr.length; x++) {
                        if (decimals2Arr[x] == key) {
                            decimalsVal = 2;
                            break;
                        }
                    }

                    var timeDataKeyName = "";
                    var timeClassName = "";
                    if (arrDataId.indexOf("Baoshan" + key) > -1) {
                        timeDataKeyName = "baoshangRealTime";
                        timeClassName = ".BaoshanRealTimeUpdate";
                    }
                    else if (arrDataId2.indexOf("Baoshan" + key) > -1) {
                        timeDataKeyName = "baoshangRealTime2";
                        timeClassName = ".BaoshanRealTimeUpdate2";
                    }
                    else if (arrDataId3.indexOf("Baoshan" + key) > -1) {
                        timeDataKeyName = "baoshangRealTime3";
                        timeClassName = ".BaoshanRealTimeUpdate3";
                    }

                    if (timeDataKeyName != "") {
                        //即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                        var realTimeDate = new Date(data[timeDataKeyName]);
                        if (checkDataTimeIsOverdue(realTimeDate)) {
                            $("#Baoshan" + key).html("--");
                            $(timeClassName).html("(--:--)");
                        }
                        else {
                            $("#Baoshan" + key).countTo({
                                from: 0,
                                to: objV,
                                speed: 1500,
                                decimals: decimalsVal,
                                refreshInterval: 50,
                                onComplete: function (value) {
                                    console.debug(this);
                                }
                            });
                        }

                    }
                    else {
                        $("#Baoshan" + key).countTo({
                            from: 0,
                            to: objV,
                            speed: 1500,
                            decimals: decimalsVal,
                            refreshInterval: 50,
                            onComplete: function (value) {
                                console.debug(this);
                            }
                        });
                    }

                    

                    //有兩個地方顯示寶二溢(放)流量
                    if (key == "baoshangoverflow") {
                        $("#Baoshanbaoshangoverflow2").countTo({
                            from: 0,
                            to: objV,
                            speed: 1500,
                            decimals: decimalsVal,
                            refreshInterval: 50,
                            onComplete: function (value) {
                                console.debug(this);
                            }
                        });
                    }
                } else {
                    $("#Baoshan" + key).html("--");
                }
            });
            
            if (data["baoshangRealTime"] != null) {
                $(".BaoshanRealTimeUpdate").html("(" + data["baoshangRealTime"].substring(11, 13) + ":" + data["baoshangRealTime"].substring(14, 16) + ")");

                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var baoshangRealTimeDate = new Date(data["baoshangRealTime"]);
                if (checkDataTimeIsOverdue(baoshangRealTimeDate)) {
                    $(".BaoshanRealTimeUpdate").html("(--:--)");
                }
            }

            if (data["baoshangRealTime2"] != null) {
                $(".BaoshanRealTimeUpdate2").html("(" + data["baoshangRealTime2"].substring(11, 13) + ":" + data["baoshangRealTime2"].substring(14, 16) + ")");

                ////即時水情資料沒有進來或異常超過30分鐘，就顯示"--"
                var baoshangRealTime2Date = new Date(data["baoshangRealTime2"]);
                if (checkDataTimeIsOverdue(baoshangRealTime2Date)) {
                    $(".BaoshanRealTimeUpdate2").html("(--:--)");
                }
            }

            if (data["baoshangRealTime3"] != null) {
                $("#BaoshanRealtimeFlowIn").html(data["shangpingBashare"] != null ? data["shangpingBashare"].toFixed(2) : 0.00);
                $("#BaoshanRealtimeFlowOut").html(data["baoshanOutflow"] != null ? data["baoshanOutflow"].toFixed(2) : 0.00);
                $(".BaoshanRealTimeUpdate3").html("(" + data["baoshangRealTime3"].substring(11, 13) + ":" + data["baoshangRealTime3"].substring(14, 16) + ")");

                //即時水情的時均入流量、出流量1.5小時若沒進來就顯示"--"
                var baoshangRealTime3Date = new Date(data["baoshangRealTime3"]);
                var arrDataId3 = ["BaoshanRealtimeFlowIn", "BaoshanRealtimeFlowOut"];
                if (checkDataTimeIsOverdue(baoshangRealTime3Date, 90)) {
                    for (var i = 0; i < arrDataId3.length; i++) {
                        $("#" + arrDataId3[i]).html("--");
                    }
                    $(".BaoshanRealTimeUpdate3").html("(--:--)");
                }
            }

            b_date = data["minusOneDay"];
            //$("#b_date").html("資料區間: " + (b_date.substring(0, 4) - 1911) + "年" + b_date.substring(5, 7) + "月" + b_date.substring(8, 10) + "日 00時~24時");
            $("#b_date").html((b_date.substring(0, 4) - 1911) + "年" + b_date.substring(5, 7) + "月" + b_date.substring(8, 10) + "日 00時~24時");

            // 竹東圳取水
            // 2022-01-14 不用計算，改接欄位 SHANGPING_ZuDong
            // toCount("#BaoshanA12", countValue(data, ["SHANGPING_irrigation", "SHANGPING_watercom", "SHANGPING_watercomYD", "SHANGPING_waterpumpYD"]));
            // 取出水量
            //toCount("#BaoshansupplyFlow_BaoEr", countValue(data, ["supply_BaoWater", "supply_KEZIHU"]));
            //2021.03.10 寶二水庫取出水量改接service來的合計值 (上面有少加反送寶山水庫 & 寶二溢(放)流量)
            toCount("#BaoshansupplyFlow_BaoEr", countValue(data, ["bao2TotalOutWater"]));

            // 寶山水庫
            toCount("#Baoshanretain_Baoshan", countValue(data, ["retain_Baoshan"]));
            toCount("#BaoshanretainRate_Baoshan", countValue(data, ["retainRate_Baoshan"]));
            toCount("#Baoshaninflow_Baoshan", countValue(data, ["inflow_Baoshan"]));
            toCount("#BaoshansupplyFlow_Baoshan", countValue(data, ["supplyFlow_Baoshan"]));
            //寶二+寶山
            toCount("#BaoshanCOMBINE_Retain", countValue(data, ["retain", "retain_Baoshan"]));
            toCount("#BaoshanCOMBINE_RetainRate", (countValue(data, ["retain", "retain_Baoshan"]) / 3650.68) * 100);
            toCount("#BaoshanCOMBINE_Inflow", countValue(data, ["inflow", "inflow_Baoshan"]));
            //toCount("#BaoshanCOMBINE_Supplyflow", countValue(data, ["supply_BaoWater", "supply_KEZIHU", "supplyFlow_Baoshan"]));
            //2021.03.10 寶二水庫取出水量改接service來的合計值
            // toCount("#BaoshanCOMBINE_Supplyflow", countValue(data, ["bao2TotalOutWater", "supplyFlow_Baoshan"]));
            var BaoshanCOMBINE_Supplyflow = (data["bao2TotalOutWater"] + data["supplyFlow_Baoshan"]) - data["baoshangBackBao2"]
            toCount("#BaoshanCOMBINE_Supplyflow",  BaoshanCOMBINE_Supplyflow );

            // 處理上升下降
            var dataYesterday = msg["getWaterDetailManagement"][1];

            var compareValueArr = ["stage", "retain", "stage_Baoshan", "retain_Baoshan", "retain,retain_Baoshan"];
            var comparePointArr = [2, 1, 2, 1, 1];

            for (var i = 0; i < compareValueArr.length; i++) {
                var value = 0;
                if (compareValueArr[i].indexOf(",") == -1)
                    value = data[compareValueArr[i]] - dataYesterday[compareValueArr[i]];
                else
                {
                    // just for "retainRate", "retainRate_Baoshan"
                    value = (chkValueNull(data[compareValueArr[i].split(',')[0]]) + (data[compareValueArr[i].split(',')[1]])) - (chkValueNull(dataYesterday[compareValueArr[i].split(',')[0]]) + chkValueNull(dataYesterday[compareValueArr[i].split(',')[1]]));
                    compareValueArr[i] = compareValueArr[i].replace(",", "");
                }

                $("#d_" + compareValueArr[i]).countTo({
                    from: 0,
                    to: value,
                    speed: 1500,
                    decimals: comparePointArr[i],
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });
                if (value > 0) {
                    $("#s_" + compareValueArr[i]).removeClass("glyphicon-arrow-up").removeClass("glyphicon-arrow-down").addClass("glyphicon glyphicon-arrow-up");
                    $("#s_" + compareValueArr[i]).parent().removeClass().addClass("label label-success").attr("style", "padding: .3em .5em ;");
                } else if (value < 0) {
                    $("#s_" + compareValueArr[i]).removeClass("glyphicon-arrow-up").removeClass("glyphicon-arrow-down").addClass("glyphicon glyphicon-arrow-down");
                    $("#s_" + compareValueArr[i]).parent().removeClass().addClass("label label-danger").attr("style", "padding: .3em .5em ;");
                } else {
                    $("#s_" + compareValueArr[i]).removeClass("glyphicon-arrow-up").removeClass("glyphicon-arrow-down");
                    $("#s_" + compareValueArr[i]).parent().removeClass().addClass("label").attr("style", "padding: .3em .5em ;border: 1px solid #fff;");
                }
            }
            
        },
        error: function(e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}
// 石門水位(已棄用)
function getShimenRealtimeHLine(msg) {
    // debugger;
    var date = new Date();
    // var datad = msg["getShimenHLineDay"];
    var datad = msg["getShimenHLineDay_new"];
    // var datad = msg["demo_getShimenHLineDay"]; //測試
    var datad_min = msg["getShimenHLineDay_min"]; // 該小時10分鐘
    console.log('水位 - 10分鐘資料',datad_min);
    console.log('水位 - 小時整點資料',datad);
    var timeblockd = [];

    var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    var date = new Date();

    var renderToId = "picH";
    if ($("#pageEighth").css("display") != "none") {
        renderToId = "stationShihStageCustom";
        var d = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eShihCustomDateText').val()));
    }

    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);


    for (var i = 0; i < totalHours + 1; i++) {
        timeblockd.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
    }

    //水位統計圖10日內上下限依最大最小值來調整
    var maxShihmenRealtimeStage = 0;
    var minShihmenRealtimeStage = 9999;

    for (var i = 0; i < datad.length; i++) {
        var utc = Date.UTC(parseInt(datad[i].y), parseInt(datad[i].m) - 1, parseInt(datad[i].d), parseInt(datad[i].h));

        for (var j = 0; j < timeblockd.length; j++) {
            if (timeblockd[j][0] == utc) {
                timeblockd[j][1] = parseFloat(datad[i].shihmenRealtimeStage_On_Hour);

                if (timeblockd[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockd[j][1];
                if (timeblockd[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockd[j][1];
                break;
            }
        }
    }

    // 10分鐘資料加在下一個小時
   var minVal = datad_min[0].shihmenRealtimeStage;
   var utcMin = Date.UTC(parseInt(datad_min[0].y), parseInt(datad_min[0].m) - 1, parseInt(datad_min[0].d), parseInt(datad_min[0].h), parseInt(datad_min[0].min)); // 當下10分鐘
   var utcHour = Date.UTC(parseInt(datad[datad.length-1].y), parseInt(datad[datad.length-1].m) - 1, parseInt(datad[datad.length-1].d), parseInt(datad[datad.length-1].h)); // 當下小時
   var utcHour_Next = Date.UTC(parseInt(datad[datad.length-1].y), parseInt(datad[datad.length-1].m) - 1, parseInt(datad[datad.length-1].d), parseInt(datad[datad.length-1].h) +1); // 下小時
   var indexShow = 0;
   if (utcMin > utcHour && utcMin < utcHour_Next) {
        for (var j = 0; j < timeblockd.length; j++) {
            if (timeblockd[j][0] == utcHour_Next) {
                timeblockd[j][1] = parseFloat(minVal);
                indexShow = j;
                // debugger;
                // timeblockd.splice(j, 0 , [utcMin , parseFloat(minVal)]); // ?
                if (timeblockd[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockd[j][1];
                if (timeblockd[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockd[j][1];
                break;
            }
        }
    }
    else if (utcMin == utcHour_Next){ // 如果 10 分鐘資料為整點 加上去
        for (var j = 0; j < timeblockd.length; j++) {
            if (timeblockd[j][0] == utcHour_Next) {
                timeblockd[j][1] = parseFloat(minVal);
                // debugger;
                // timeblockd.splice(j, 0 , [utcMin , parseFloat(minVal)]); // ?
                if (timeblockd[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockd[j][1];
                if (timeblockd[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockd[j][1];
                break;
            }
        }
    }

    //minShihmenRealtimeStage = minShihmenRealtimeStage - (maxShihmenRealtimeStage - minShihmenRealtimeStage) * 0.5;
    //maxShihmenRealtimeStage = maxShihmenRealtimeStage + (maxShihmenRealtimeStage - minShihmenRealtimeStage) * 0.5;

    ////四捨，五入 - 0.5
    //minShihmenRealtimeStage = (minShihmenRealtimeStage >= Math.floor(minShihmenRealtimeStage) + 0.5) ? Math.round(minShihmenRealtimeStage) - 0.5 : Math.round(minShihmenRealtimeStage);
    ////四捨 + 0.5，五入
    //maxShihmenRealtimeStage = (maxShihmenRealtimeStage >= Math.floor(maxShihmenRealtimeStage) + 0.5) ? Math.round(maxShihmenRealtimeStage) : Math.round(maxShihmenRealtimeStage) + 0.5;

    ////無條件捨去+1、-1
    //minShihmenRealtimeStage = Math.floor(minShihmenRealtimeStage) - 1;
    //maxShihmenRealtimeStage = Math.floor(maxShihmenRealtimeStage) + 1;

    //四捨五入+1、-1 (2020.12.30 改為+2、-2)
    minShihmenRealtimeStage = Math.round(minShihmenRealtimeStage) - 2;
    maxShihmenRealtimeStage = Math.round(maxShihmenRealtimeStage) + 2;
    var ShowHour = parseInt( datad_min[0].h);
    var ShowMinute = parseInt( datad_min[0].min);

    StockChart[4] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
            alignTicks: false,
            marginTop: 25
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: null,
                rotation: -45
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
        yAxis:
            [
                { // Primary yAxis
                    //min: 210,
                    //max: 250,
                    //tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
                    min: minShihmenRealtimeStage,
                    max: maxShihmenRealtimeStage,
                    showLastLabel: true,
                    tickInterval: 1,//0.5, 原本到0.5，統計圖的縱座標刻度都改為整數，不顯示小數位
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblockd,
            tooltip: {
                headerFormat: '{point.x:%H:%M}/',
                valueSuffix: '',
                pointFormatter: function () {
                    return this.options.y.toFixed(2);
                }
            }
        }],

        tooltip: {
            formatter: function () {
                 // 最新的10分鐘資料顯示
                if (this.x == utcHour_Next) {
                    return  ShowHour + ':' + ShowMinute + "/" + this.y.toFixed(2);
                }
                else
                {   
                    var hour = new Date(this.x).toGMTString().substring(17,19);
                    return  hour + ':00' + "/" + this.y.toFixed(2);
                }
            }
        },
    });
    
    switch (range) {
        case "1d":
        case "2d":
            StockChart[4].xAxis[0].update({
                tickInterval: 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);

                        if (label.substr(label.length - 2, 2) == "00")
                            return label;
                        else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                            return label.substr(label.length - 2, 2);
                        else
                            return "";
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "3d":
        case "5d":
        case "10d":
            StockChart[4].xAxis[0].update({
                tickInterval: 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);

                        if (label.substr(label.length - 2, 2) == "00")
                            return label;
                        else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                            return label.substr(label.length - 2, 2);
                        else
                            return "";
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
        default:
            //預設資料區間和3日以上(3d, 5d, 10d)相同
            StockChart[4].xAxis[0].update({
                tickInterval: 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);

                        if (label.substr(label.length - 2, 2) == "00")
                            return label;
                        else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
                            return label.substr(label.length - 2, 2);
                        else
                            return "";
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }
}

// 石門水位+蓄水量
function getShimenRealtimeHLineAddContain(msg) {
    var date = new Date();
    var datad = msg["getShimenHLineAddContainDay"];
    var datad_min = msg["getShimenHLineAddContainDay_min"];
    console.log("水位+蓄水量(小時)", datad);
    console.log("水位+蓄水量(分鐘)", datad_min);

    var timeblockStage = [];//水位
    var timeblockContain = [];//蓄水量

    var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    var date = new Date();

    var renderToId = "picT";
    if ($("#pageEighth").css("display") != "none") {
        renderToId = "stationShihStageAddContainCustom";
        var d = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eShihCustomDateText').val()));
    }

    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);


    for (var i = 0; i < totalHours + 1; i++) {
        // timeblockd.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);//
        timeblockStage.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        timeblockContain.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
    }

    //水位統計圖10日內上下限依最大最小值來調整
    // 水位
    var maxShihmenRealtimeStage = 0;
    var minShihmenRealtimeStage = 9999;
    // 蓄水量
    var maxShihmenRealtimeStage_Contain = 0;
    var minShihmenRealtimeStage_Contain = 9999;
    

    //水位
    for (var i = 0; i < datad.length; i++) {
        var utc = Date.UTC(parseInt(datad[i].y), parseInt(datad[i].m) - 1, parseInt(datad[i].d), parseInt(datad[i].h));

        for (var j = 0; j < timeblockStage.length; j++) {
            if (timeblockStage[j][0] == utc) {
                timeblockStage[j][1] = parseFloat(datad[i].shihmenRealtimeStage_On_Hour);

                if (timeblockStage[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockStage[j][1];
                if (timeblockStage[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockStage[j][1];
                break;
            }
        }
    }
    //蓄水量
    for (var i = 0; i < datad.length; i++) {
        var utc = Date.UTC(parseInt(datad[i].y), parseInt(datad[i].m) - 1, parseInt(datad[i].d), parseInt(datad[i].h));

        for (var c = 0; c < timeblockContain.length; c++) {
            if (timeblockContain[c][0] == utc) {
                timeblockContain[c][1] = parseFloat(parseFloat(datad[c].shihmenRealtimeContain_On_Hour / 100).toFixed(2));
                // debugger;
                if (timeblockContain[c][1] < minShihmenRealtimeStage_Contain)
                minShihmenRealtimeStage_Contain = timeblockContain[c][1];
                if (timeblockContain[c][1] > maxShihmenRealtimeStage_Contain)
                maxShihmenRealtimeStage_Contain = timeblockContain[c][1];
                break;
            }
        }
    }

    // 10分鐘資料加在下一個小時
    if (datad_min.length > 0 && datad.length > 0) {
        var StageMinVal = datad_min[0].shihmenRealtimeStage;
        var ContainMinVal = parseFloat(parseFloat(datad_min[0].shihmenRealtimeContain / 100).toFixed(2));
        var utcMin = Date.UTC(parseInt(datad_min[0].y), parseInt(datad_min[0].m) - 1, parseInt(datad_min[0].d), parseInt(datad_min[0].h), parseInt(datad_min[0].min)); // 當下10分鐘
        var utcHour = Date.UTC(parseInt(datad[datad.length-1].y), parseInt(datad[datad.length-1].m) - 1, parseInt(datad[datad.length-1].d), parseInt(datad[datad.length-1].h)); // 當下小時
        var utcHour_Next = Date.UTC(parseInt(datad[datad.length-1].y), parseInt(datad[datad.length-1].m) - 1, parseInt(datad[datad.length-1].d), parseInt(datad[datad.length-1].h) +1); // 下小時
        
    }
   var indexShow = 0;
   if (utcMin > utcHour && utcMin < utcHour_Next) {
       // 水位
        for (var j = 0; j < timeblockStage.length; j++) {
            if (timeblockStage[j][0] == utcHour_Next) {
                timeblockStage[j][1] = parseFloat(StageMinVal);
                // debugger;
                // timeblockd.splice(j, 0 , [utcMin , parseFloat(minVal)]); // ?
                if (timeblockStage[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockStage[j][1];
                if (timeblockStage[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockStage[j][1];
                break;
            }
        }
        // 蓄水量
        for (var j = 0; j < timeblockContain.length; j++) {
            if (timeblockContain[j][0] == utcHour_Next) {
                timeblockContain[j][1] = parseFloat(ContainMinVal);
                
                if (timeblockContain[j][1] < minShihmenRealtimeStage_Contain)
                minShihmenRealtimeStage_Contain = timeblockContain[j][1];
                if (timeblockContain[j][1] > maxShihmenRealtimeStage_Contain)
                maxShihmenRealtimeStage_Contain = timeblockContain[j][1];
                break;
            }
        }
    }
    else if (utcMin == utcHour_Next){ // 如果 10 分鐘資料為整點 加上去
        for (var j = 0; j < timeblockStage.length; j++) {
            if (timeblockStage[j][0] == utcHour_Next) {
                timeblockStage[j][1] = parseFloat(StageMinVal);
                if (timeblockStage[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockStage[j][1];
                if (timeblockStage[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockStage[j][1];
                break;
            }
        }
        for (var j = 0; j < timeblockContain.length; j++) {
            if (timeblockContain[j][0] == utcHour_Next) {
                timeblockContain[j][1] = parseFloat(ContainMinVal);
                if (timeblockContain[j][1] < minShihmenRealtimeStage_Contain)
                minShihmenRealtimeStage_Contain = timeblockContain[j][1];
                if (timeblockContain[j][1] > maxShihmenRealtimeStage_Contain)
                maxShihmenRealtimeStage_Contain = timeblockContain[j][1];
                break;
            }
        }
    }

    

    //四捨五入+1、-1 (2020.12.30 改為+2、-2)
    minShihmenRealtimeStage = Math.round(minShihmenRealtimeStage) - 2;
    maxShihmenRealtimeStage = Math.round(maxShihmenRealtimeStage) + 3;
    minShihmenRealtimeStage_Contain = Math.round(minShihmenRealtimeStage_Contain) - 2;
    maxShihmenRealtimeStage_Contain = Math.round(maxShihmenRealtimeStage_Contain) + 3;
    if (datad_min.length > 0) {
        var ShowHour = parseInt( datad_min[0].h);
        var ShowMinute = parseInt( datad_min[0].min);
    }
    //算出區間(5個)
    // var tickPoint = [0,0,0,0,0,0];//水位
    // var tickPoint_Contain = [0,0,0,0,0,0];//蓄水量
    // var tick = 1; //水位
    // var tick_Contain = 1; //蓄水量
    // if (parseFloat(((maxShihmenRealtimeStage - minShihmenRealtimeStage) / 5).toFixed(0)) > 1) {
    //     tick = parseFloat(((maxShihmenRealtimeStage - minShihmenRealtimeStage) / 5).toFixed(0));
    // }
    // if (parseFloat(((maxShihmenRealtimeStage_Contain - minShihmenRealtimeStage_Contain) / 5).toFixed(0)) > 1) {
    //     tick_Contain = parseFloat(((maxShihmenRealtimeStage_Contain - minShihmenRealtimeStage_Contain) / 5).toFixed(0));
    // }
    // // tickPoint[0] = minShihmenRealtimeStage;
    // // tickPoint[1] = minShihmenRealtimeStage + tick;
    // // tickPoint[2] = minShihmenRealtimeStage + (tick * 2);
    // // tickPoint[3] = minShihmenRealtimeStage + (tick * 3);
    // // tickPoint[4] = minShihmenRealtimeStage + (tick * 4);
    // // tickPoint[5] = minShihmenRealtimeStage + (tick * 5);
    // // 區間處理，為了和右手邊的tick做對應(個數要相同)
    // for (let t = 0; t < tickPoint.length; t++) {
    //    if (t == 0) {
    //     tickPoint[t] = minShihmenRealtimeStage;
    //    }
    //    else{
    //     tickPoint[t] = minShihmenRealtimeStage + (tick * t);
    //    }
    // }
    // for (let c = 0; c < tickPoint_Contain.length; c++) {
    //     if (c == 0) {
    //         tickPoint_Contain[c] = minShihmenRealtimeStage_Contain;
    //        }
    //        else{
    //         tickPoint_Contain[c] = minShihmenRealtimeStage_Contain + (tick_Contain * c);
    //        }
        
    // }
    
    StockChart[4] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
            alignTicks: true,
            marginTop: 25
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
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            if ($("#pageEighth").css("display") !== "none") 
                                triggerOtherChart("stationShihStageAddContainCustom_hour",  this.x);
                            else
                                triggerOtherChart(renderToId,  this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            if ($("#pageEighth").css("display") !== "none") 
                                triggerOtherChart("stationShihStageAddContainCustom_hour",  this.x);
                            else
                                triggerOtherChart(renderToId,  this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }
            }
            
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: null,
                rotation: -45
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
        yAxis: [{
            // tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
            // tickPositions: [200, 210, 220, 230, 240, 250],
            // tickPositions: tickPoint,
            tickAmount: 5,
            allowDecimals: false,
            min: minShihmenRealtimeStage,
            // max: maxShihmenRealtimeStage,
            showLastLabel: true,
            minTickInterval: 1,
            // className: '',
            opposite: false,
            title: {
                text: ''
            }
        }, {
            // className: '',
            // tickPositions: [130, 140, 150, 160, 170, 180],
            // tickPositions: tickPoint_Contain,
            tickAmount: 5,
            allowDecimals: false,
            min: minShihmenRealtimeStage_Contain,
            minTickInterval: 1,
            showLastLabel: true,
            opposite: true,
            title: {
                text: ''
            }
        }],

        navigator: {
            enabled: false
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockStage,
            yAxis: 0,
            tooltip: {
                // headerFormat: '{point.x:%m/%d %H:%M} <br/>',
                valueSuffix: '',
                shared: true,
            },
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockContain,
            yAxis: 1,
            tooltip: {
                // headerFormat: '{point.x:%m/%d %H:%M} <br/>',
                valueSuffix: '',
                shared: true,
            }
        }],

        tooltip: {
            shared: true,
            headerFormat: '{point.x:%m/%d %H:%M} <br/>',
            formatter: function () {
                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = "";
                if (this.x == utcHour_Next)
                    ShowText = Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + ShowHour + ':' + ShowMinute + "<br/>" ;
                else
                    ShowText = Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + hour + ':00' + "<br/>" ;

                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                
                return ShowText;
           }
        }

        // tooltip: {
        //     formatter: function () {
        //          // 最新的10分鐘資料顯示
        //         if (this.x == utcHour_Next) {
        //             return  ShowHour + ':' + ShowMinute + "/" + this.y.toFixed(2);
        //         }
        //         else
        //         {   
        //             var hour = new Date(this.x).toGMTString().substring(17,19);
        //             return  hour + ':00' + "/" + this.y.toFixed(2);
        //         }
        //     }
        // },
    });
    
    // switch (range) {
    //     case "1d":
    //     case "2d":
    //         StockChart[4].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    //     case "3d":
    //     case "5d":
    //     case "10d":
    //         StockChart[4].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
    //     default:
    //         //預設資料區間和3日以上(3d, 5d, 10d)相同
    //         StockChart[4].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    // }

    switch (range) {
        case "1d":
        case "2d":
        case "3d":
        case "4d":
            StockChart[4].xAxis[0].update({
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
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "5d":
        case "6d":
        case "7d":
        case "8d":
        case "9d":
        case "10d":
        case "11d":
        case "10d":
            StockChart[4].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);
                        return label;
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }
}

// 寶二水位 + 蓄水量
function getBaoRealtimeHLine(msg) {
    var date = new Date();
    var datad = msg["getBaoRealtimeHLine"];
    var datad_OnHour = msg["getBaoRealtimeHLine_new"];
    var datad_min = msg["getBaoRealtimeHLine_min"]
    // console.log('寶二水位 - 10分鐘資料',datad_min);
    // console.log('寶二水位 - 小時整點資料',datad_OnHour);
    var timeblockd = [];//水位
    var timeblockd_Contain = [];//蓄水量

    var range = $('.zoom_controls.zoom_controls_HourTen a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    var date = new Date();

    var renderToId = "picRTStageBao";
    if ($("#pageBaoHistory").css("display") != "none") {
        renderToId = "stationBaoStageCustom";
        var d = (new Date(yyy2yyyy($('#sBaoCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eBaoCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eBaoCustomDateText').val()));
    }

    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);


    for (var i = 0; i < totalHours + 1; i++) {
        timeblockd.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        timeblockd_Contain.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);

    }

    //水位統計圖10日內上下限依最大最小值來調整
    var maxShihmenRealtimeStage = 0;
    var minShihmenRealtimeStage = 9999;

    var maxShihmenRealtimeContain = 0;
    var minShihmenRealtimeContain = 9999;

    for (var i = 0; i < datad_OnHour.length; i++) {
        var utc = Date.UTC(parseInt(datad_OnHour[i].y), parseInt(datad_OnHour[i].m) - 1, parseInt(datad_OnHour[i].d), parseInt(datad_OnHour[i].h));

        for (var j = 0; j < timeblockd.length; j++) {
            if (timeblockd[j][0] == utc) {
                timeblockd[j][1] = parseFloat(datad_OnHour[i].baoshangRealtimeStage2_On_Hour);
                timeblockd_Contain[j][1] = parseFloat(parseFloat(datad_OnHour[i].baoshangContain2_On_Hour / 100).toFixed(2));
                
                //水位
                if (timeblockd[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockd[j][1];
                if (timeblockd[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockd[j][1];
                //蓄水量
                if (timeblockd_Contain[j][1] < minShihmenRealtimeContain)
                    minShihmenRealtimeContain = timeblockd_Contain[j][1];
                if (timeblockd_Contain[j][1] > maxShihmenRealtimeContain)
                    maxShihmenRealtimeContain = timeblockd_Contain[j][1];
                break;
            }
        }
    }
    //minShihmenRealtimeStage = minShihmenRealtimeStage - (maxShihmenRealtimeStage - minShihmenRealtimeStage) * 0.5;
    //maxShihmenRealtimeStage = maxShihmenRealtimeStage + (maxShihmenRealtimeStage - minShihmenRealtimeStage) * 0.5;

    ////四捨，五入 - 0.5
    //minShihmenRealtimeStage = (minShihmenRealtimeStage >= Math.floor(minShihmenRealtimeStage) + 0.5) ? Math.round(minShihmenRealtimeStage) - 0.5 : Math.round(minShihmenRealtimeStage);
    ////四捨 + 0.5，五入
    //maxShihmenRealtimeStage = (maxShihmenRealtimeStage >= Math.floor(maxShihmenRealtimeStage) + 0.5) ? Math.round(maxShihmenRealtimeStage) : Math.round(maxShihmenRealtimeStage) + 0.5;

    ////無條件捨去+1、-1
    //minShihmenRealtimeStage = Math.floor(minShihmenRealtimeStage) - 1;
    //maxShihmenRealtimeStage = Math.floor(maxShihmenRealtimeStage) + 1;

    // 10分鐘資料加在下一個小時
    var minVal = null;
    var minVal_Contain = null;
    if (datad_min.length > 0 && datad_OnHour.length > 0) {
        minVal = datad_min[0].baoshangRealtimeStage2;
        if (datad_min[0].baoshangContain2 !== null)
            minVal_Contain = parseFloat(parseFloat(datad_min[0].baoshangContain2 / 100).toFixed(2));
        
        var utcMin = Date.UTC(parseInt(datad_min[0].y), parseInt(datad_min[0].m) - 1, parseInt(datad_min[0].d), parseInt(datad_min[0].h), parseInt(datad_min[0].min)); // 當下10分鐘
        var utcHour = Date.UTC(parseInt(datad_OnHour[datad_OnHour.length-1].y), parseInt(datad_OnHour[datad_OnHour.length-1].m) - 1, parseInt(datad_OnHour[datad_OnHour.length-1].d), parseInt(datad_OnHour[datad_OnHour.length-1].h)); // 當下小時
        var utcHour_Next = Date.UTC(parseInt(datad_OnHour[datad_OnHour.length-1].y), parseInt(datad_OnHour[datad_OnHour.length-1].m) - 1, parseInt(datad_OnHour[datad_OnHour.length-1].d), parseInt(datad_OnHour[datad_OnHour.length-1].h) +1); // 下小時
        
    }
    var indexShow = 0;
    if (utcMin > utcHour && utcMin < utcHour_Next) {
        for (var j = 0; j < timeblockd.length; j++) {
            if (timeblockd[j][0] == utcHour_Next) {
                timeblockd[j][1] = (minVal !== null ? parseFloat(minVal) : null);
                timeblockd_Contain[j][1] = ( minVal_Contain !== null ? parseFloat(minVal_Contain) : null);
                indexShow = j;
                // debugger;
                // timeblockd.splice(j, 0 , [utcMin , parseFloat(minVal)]); // ?
                if (timeblockd[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockd[j][1];
                if (timeblockd[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockd[j][1];
                //蓄水量
                if (timeblockd_Contain[j][1] < minShihmenRealtimeContain)
                    minShihmenRealtimeContain = timeblockd_Contain[j][1];
                if (timeblockd_Contain[j][1] > maxShihmenRealtimeContain)
                    maxShihmenRealtimeContain = timeblockd_Contain[j][1];
                break;
            }
        }
    }
    else if (utcMin == utcHour_Next){ // 如果 10 分鐘資料為整點 加上去
        for (var j = 0; j < timeblockd.length; j++) {
            if (timeblockd[j][0] == utcHour_Next) {
                timeblockd[j][1] = (minVal !== null ? parseFloat(minVal) : null);
                timeblockd_Contain[j][1] = ( minVal_Contain !== null ? parseFloat(minVal_Contain) : null);
                // debugger;
                // timeblockd.splice(j, 0 , [utcMin , parseFloat(minVal)]); // ?
                if (timeblockd[j][1] < minShihmenRealtimeStage)
                    minShihmenRealtimeStage = timeblockd[j][1];
                if (timeblockd[j][1] > maxShihmenRealtimeStage)
                    maxShihmenRealtimeStage = timeblockd[j][1];
                //蓄水量
                if (timeblockd_Contain[j][1] < minShihmenRealtimeContain)
                    minShihmenRealtimeContain = timeblockd_Contain[j][1];
                if (timeblockd_Contain[j][1] > maxShihmenRealtimeContain)
                    maxShihmenRealtimeContain = timeblockd_Contain[j][1];
                break;
            }
        }
    }

    //四捨五入+1、-1 (2020.12.30 改為+2、-2)
    minShihmenRealtimeStage = Math.round(minShihmenRealtimeStage) - 2;
    maxShihmenRealtimeStage = Math.round(maxShihmenRealtimeStage) + 2;
    minShihmenRealtimeContain = Math.round(minShihmenRealtimeContain) - 2;
    maxShihmenRealtimeContain = Math.round(maxShihmenRealtimeContain) + 2;
    if (datad_min.length > 0) {
        var ShowHour = parseInt( datad_min[0].h);
        var ShowMinute = parseInt( datad_min[0].min);
    }

    StockChart[4] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
            alignTicks: false,
            marginTop: 25
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
        // plotOptions: {
        //     series: {
        //         dataGrouping: {
        //             enabled: false
        //         }
        //     }
        // },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: null,
                rotation: -45
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
        // yAxis:
        //     [
        //         { // Primary yAxis
        //             //min: 210,
        //             //max: 250,
        //             //tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
        //             min: minShihmenRealtimeStage,
        //             max: maxShihmenRealtimeStage,
        //             showLastLabel: true,
        //             tickInterval: 1,//0.5, 原本到0.5，統計圖的縱座標刻度都改為整數，不顯示小數位
        //             opposite: false,
        //             labels: {
        //                 format: '{value}',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 }
        //             },
        //             title: {
        //                 text: '',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 }
        //             }
        //         }],
        yAxis: [{
            min: minShihmenRealtimeStage,
            tickAmount: 5,
            allowDecimals: false,
            showLastLabel: true,
            minTickInterval: 1,
            opposite: false,
            title: {
                text: ''
            }
        }, {
            min: minShihmenRealtimeContain,
            tickAmount: 5,
            allowDecimals: false,
            showLastLabel: true,
            minTickInterval: 1,
            opposite: true,
            title: {
                text: ''
            }
        }],
        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            if ($("#pageBaoHistory").css("display") != "none")
                                triggerOtherChart("picRTStageBao_hour", this.x);
                            else
                                triggerOtherChart("picRTStageBao", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            if ($("#pageBaoHistory").css("display") != "none")
                                triggerOtherChart("picRTStageBao_hour", this.x);
                            else
                                triggerOtherChart("picRTStageBao", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        // series: [{
        //     name: ' ',
        //     type: 'spline',
        //     color: '#4169BC',
        //     data: timeblockd,
        //     tooltip: {
        //         headerFormat: '{point.x:%H:00}/',
        //         valueSuffix: '',
        //         pointFormatter: function () {
        //             return this.options.y.toFixed(2);
        //         }
        //     }
        // }],

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockd,
            yAxis: 0,
            tooltip: {
                valueSuffix: '',
                shared: true
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockd_Contain,
            yAxis: 1,
            tooltip: {
                valueSuffix: '',
                shared: true
            }
        }],

        tooltip: {
            formatter: function () {
                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = "";
                if (this.x == utcHour_Next)
                    ShowText = Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + ShowHour + ':' + ShowMinute + "<br/>" ;
                else
                    ShowText = Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + hour + ':00' + "<br/>" ;

                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                
                return ShowText;
            }
        }
    });

    // switch (range) {
    //     case "1d":
    //     case "2d":
    //         StockChart[4].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    //     case "3d":
    //     case "5d":
    //     case "10d":
    //         StockChart[4].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
    //     default:
    //         //預設資料區間和3日以上(3d, 5d, 10d)相同
    //         StockChart[4].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    // }

    switch (range) {
        case "1d":
        case "2d":
        case "3d":
        case "4d":
            StockChart[4].xAxis[0].update({
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
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "5d":
        case "6d":
        case "7d":
        case "8d":
        case "9d":
        case "10d":
        case "11d":
            StockChart[4].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);
                        return label;
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[4].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }


    // debugger;
    var totalIN = 0;
    var totalOUT = 0;
    var totalOverFlow = 0;


    var timeblockdIN = [];
    var timeblockdOUT = [];
    var timeblockdOverFlow = []; //溢放流量
    var range = $('.zoom_controls.zoom_controls_HourTen a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    ////撈10天
    //var daysToMinus = 9;
    //var totalHours = 240;

    var date = new Date();

    var renderToId = "picRTFlowBao";
    if ($("#pageBaoHistory").css("display") != "none") {
        renderToId = "stationBaoFlowCustom";
        var d = (new Date(yyy2yyyy($('#sBaoCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eBaoCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eBaoCustomDateText').val()));
    }

    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);


    for (var i = 0; i < totalHours + 1; i++) {
        timeblockdIN.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        timeblockdOUT.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        timeblockdOverFlow.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
    }

    for (var i = 0; i < datad.length; i++) {
        var utc = Date.UTC(parseInt(datad[i].y), parseInt(datad[i].m) - 1, parseInt(datad[i].d), parseInt(datad[i].h));

        for (var j = 0; j < timeblockdIN.length; j++) {
            if (timeblockdIN[j][0] == utc && datad[i].shangpingBashare != null && datad[i].shangpingBashareTotal != null) {
                timeblockdIN[j][1] = parseFloat(datad[i].shangpingBashare.toFixed(2));
                totalIN += parseFloat(datad[i].shangpingBashareTotal.toFixed(2));
                break;
            }
        }
    }

    for (var i = 0; i < datad.length; i++) {
        var utc = Date.UTC(parseInt(datad[i].y), parseInt(datad[i].m) - 1, parseInt(datad[i].d), parseInt(datad[i].h));

        for (var j = 0; j < timeblockdOUT.length; j++) {
            if (timeblockdOUT[j][0] == utc && datad[i].baoshanOutflow != null && datad[i].baoshanOutflowTotal != null) {
                timeblockdOUT[j][1] = parseFloat(datad[i].baoshanOutflow.toFixed(2));
                totalOUT += parseFloat(datad[i].baoshanOutflowTotal.toFixed(2));
                break;
            }
        }
    }

    for (var i = 0; i < datad.length; i++) {
        var utc = Date.UTC(parseInt(datad[i].y), parseInt(datad[i].m) - 1, parseInt(datad[i].d), parseInt(datad[i].h));

        for (var j = 0; j < timeblockdOverFlow.length; j++) {
            if (timeblockdOverFlow[j][0] == utc && datad[i].bao2Flow != null && datad[i].bao2FlowTotal != null) {
                timeblockdOverFlow[j][1] = parseFloat(datad[i].bao2Flow.toFixed(2));
                totalOverFlow += parseFloat(datad[i].bao2FlowTotal.toFixed(2));
                break;
            }
        }
    }

    
    // $("#stationRTFlowBaoIN").html(getCommaNumString(totalIN.toFixed(1).toString()));
    // $("#stationRTFlowBaoOUT").html(getCommaNumString(totalOUT.toFixed(1).toString()));
    // $("#stationRTFlowBaoIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString())).toFixed(1));
    // $("#stationRTFlowBaoOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString())).toFixed(1) );

    // $("#stationBao2AddBaoFlowIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString())).toFixed(1));
    // $("#stationBao2AddBaoFlowOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString())).toFixed(1) );
    
    // 再轉成 parseFloat 時先將千分位取消，避免超過999時被判定成 1.0
    $("#stationRTFlowBaoIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
    $("#stationRTFlowBaoOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
    $("#stationRTFlowBaoOverFlow").html(parseFloat(getCommaNumString(totalOverFlow.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) ); //溢放流量
    
    $("#stationBao2AddBaoFlowIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
    $("#stationBao2AddBaoFlowOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
    $("#stationBao2AddBaoOverFlow").html(parseFloat(getCommaNumString(totalOverFlow.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) ); //溢放流量


    
    StockChart[5] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: null,
                rotation: -45
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
        yAxis:
            [
                { // Primary yAxis
                    //min: 210,
                    //max: 250,
                    //tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
                    min: 0,
                    tickAmount: 6,
                    minTickInterval: 1,
                    allowDecimals: false,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            if ($("#pageBaoHistory").css("display") != "none")
                                triggerOtherChart("picRTFlowBao_hour", this.x);
                            else
                                triggerOtherChart(renderToId, this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            if ($("#pageBaoHistory").css("display") != "none")
                                triggerOtherChart("picRTFlowBao_hour", this.x);
                            else
                                triggerOtherChart(renderToId, this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockdIN
            // tooltip: {
            //     headerFormat: '{point.x:%Y/%m/%d  %H}<br/>',
            //     valueSuffix: ''
            // }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockdOUT
            // tooltip: {
            //     headerFormat: '{point.x:%Y/%m/%d  %H}<br/>',
            //     valueSuffix: ''
            // }
        },{
            name: ' ',
            type: 'spline',
            color: '#03bf16',
            data: timeblockdOverFlow
            // tooltip: {
            //     headerFormat: '{point.x:%Y/%m/%d  %H}<br/>',
            //     valueSuffix: ''
            // }
        }],
        tooltip: {
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    if (this.points[i].y !== null && this.points[i].y !== undefined){
                        let val = this.points[i].y.toFixed(2);
                        temp.push({"plotY": valY, "color": key, "val": val});
                    }
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + hour + ':00' + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                
                return ShowText;
            }
        }
    });

    // switch (range) {
    //     case "1d":
    //     case "2d":
    //         StockChart[5].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    //     case "3d":
    //     case "5d":
    //     case "10d":
    //         StockChart[5].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
    //     default:
    //         //預設資料區間和3日以上(3d, 5d, 10d)相同
    //         StockChart[5].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    // }

    switch (range) {
        case "1d":
        case "2d":
        case "3d":
        case "4d":
            StockChart[5].xAxis[0].update({
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
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "5d":
        case "6d":
        case "7d":
        case "8d":
        case "9d":
        case "10d":
        case "11d":
            StockChart[5].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);
                        return label;
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }
}

function getShimenRealtimeFLine(msg) {
    // debugger;
    var date = new Date();
    var datadIN = msg["getShimenFLineDayIN"];
    var datadOUT = msg["getShimenFLineDayOUT"];
    // var datadIN = msg["demo_getShimenFLineDayIN"]; //測試
    // var datadOUT = msg["demo_getShimenFLineDayOUT"];//測試
    var totalIN = 0;
    var totalOUT = 0;


    var timeblockdIN = [];
    var timeblockdOUT = [];

    var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    ////撈10天
    //var daysToMinus = 9;
    //var totalHours = 240;

    var date = new Date();

    var renderToId = "picI";
    if ($("#pageEighth").css("display") != "none") {
        renderToId = "stationShihFlowCustom";
        var d = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eShihCustomDateText').val()));
    }

    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);


    for (var i = 0; i < totalHours + 1; i++) {
        timeblockdIN.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
        timeblockdOUT.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i), null]);
    }

    for (var i = 0; i < datadIN.length; i++) {
        var utc = Date.UTC(parseInt(datadIN[i].y), parseInt(datadIN[i].m) - 1, parseInt(datadIN[i].d), parseInt(datadIN[i].h));

        for (var j = 0; j < timeblockdIN.length; j++) {
            if (timeblockdIN[j][0] == utc && datadIN[i].shihmenRealtimeFlowInTotal != null && datadIN[i].shihmenRealtimeFlowIn != null) {
                timeblockdIN[j][1] = parseFloat(datadIN[i].shihmenRealtimeFlowIn.toFixed(2));
                totalIN += parseFloat(datadIN[i].shihmenRealtimeFlowInTotal.toFixed(2));
                break;
            }
        }
    }

    for (var i = 0; i < datadOUT.length; i++) {
        var utc = Date.UTC(parseInt(datadOUT[i].y), parseInt(datadOUT[i].m) - 1, parseInt(datadOUT[i].d), parseInt(datadOUT[i].h));

        for (var j = 0; j < timeblockdOUT.length; j++) {
            if (timeblockdOUT[j][0] == utc && datadOUT[i].shihmenRealtimeFlowOutTotal != null && datadOUT[i].shihmenRealtimeFlowOut != null) {
                timeblockdOUT[j][1] = parseFloat(datadOUT[i].shihmenRealtimeFlowOut.toFixed(2));
                totalOUT += parseFloat(datadOUT[i].shihmenRealtimeFlowOutTotal.toFixed(2));
                break;
            }
        }
    }

    if ($("#pageEighth").css("display") != "none") {
        //區間統計10日以內
        // $("#stationShihFlowIN").html(getCommaNumString(totalIN.toFixed(1).toString()));
        // $("#stationShihFlowOUT").html(getCommaNumString(totalOUT.toFixed(1).toString()));

        $("#stationShihFlowIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
        $("#stationShihFlowOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
    }
    else {
        //即時統計
        // $("#stationFlowIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString())).toFixed(1) );
        // $("#stationFlowOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString())).toFixed(1) );
        // 使用這種不知道遇到沒有值會不會有問題 ?
        // $("#stationFlowIN").html(commafy(totalIN.toFixed(1)));
        // $("#stationFlowOUT").html(commafy(totalOUT.toFixed(1)));
        
        // 再轉成 parseFloat 時先將千分位取消 
        $("#stationFlowIN").html(parseFloat(getCommaNumString(totalIN.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
        $("#stationFlowOUT").html(parseFloat(getCommaNumString(totalOUT.toFixed(1).toString()).replace(/[,]+/g,"")).toFixed(1) );
    }
    
    StockChart[5] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: null,
                rotation: -45
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
        yAxis:
            [
                { // Primary yAxis
                    //min: 210,
                    //max: 250,
                    //tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
                    min: 0,
                    tickAmount: 6,
                    minTickInterval: 1,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
            ,series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            if ($("#pageEighth").css("display") != "none")
                                triggerOtherChart("stationShihFlowCustom_hour", this.x);//查詢: 小時
                            else
                                triggerOtherChart(renderToId, this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            if ($("#pageEighth").css("display") != "none")
                                triggerOtherChart("stationShihFlowCustom_hour", this.x);//查詢: 小時
                            else
                                triggerOtherChart(renderToId, this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }
                // dataGrouping: {
                //     enabled: false
                // }
            }
            // ,series: {
            //     cursor: 'pointer',
            //     point: {
            //         events: {
            //             click: function () {
            //                 alert(this.x);
            //             }
            //         }
            //     }
            // }
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockdIN,
            tooltip: {
                headerFormat: '{point.x:%m/%d  %H:00}<br/>',
                valueSuffix: ''
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockdOUT,
            tooltip: {
                headerFormat: '{point.x:%m/%d  %H:00}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + hour + ':00' + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }

                return ShowText;
            }
        }
    });

    // switch (range) {
    //     case "1d":
    //     case "2d":
    //         StockChart[5].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    //     case "3d":
    //     case "5d":
    //     case "10d":
    //         StockChart[5].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
    //     default:
    //         //預設資料區間和3日以上(3d, 5d, 10d)相同
    //         StockChart[5].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "00")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 0);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, -1 + 1); //-1為顯示到23時，-1再+1為顯示到隔天00時
    //         StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    // }

    switch (range) {
        case "1d":
        case "2d":
        case "3d":
        case "4d":
            StockChart[5].xAxis[0].update({
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
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "5d":
        case "6d":
        case "7d":
        case "8d":
        case "9d":
        case "10d":
        case "11d":
            StockChart[5].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);
                        return label;
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[5].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }
}

function getShimenHLine(msg)
{
    var date = new Date(2020, 0 , 1);
    var data5 = msg["getShimenHLine5y"];
    var data1 = msg["getShimenHLineLast"];
    var datat = msg["getShimenHLineThis"];
    var dataw = msg["getShimenHLineWarning"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var timeblockwuy = [];
    var timeblockwdy = [];
    var timeblockwwdy = [];
    var val0229, val0301, val0302;

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getShimenHLineLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y" + i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;
    
    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat(valFive0229.toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat(data5[i].SM_LEVEL.toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].SM_LEVEL;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].SM_LEVEL;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].SM_LEVEL;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].SM_LEVEL)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].SM_LEVEL = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].SM_LEVEL;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].SM_LEVEL;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].SM_LEVEL;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].SM_LEVEL)]);
    }
    
    for (var i = 0; i < dataw.length; i++) {
        timeblockwuy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].u)]);
        timeblockwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].ud)]);
        timeblockwwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].wd)]);
    }

    StockChart[0][0] = Highcharts.StockChart({
        chart: {
            renderTo: 'picA',
            alignTicks: false,
            marginTop: 20
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
        yAxis: 
        [
        { // Primary yAxis
            min: 195,
            max: 250,
            tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
            opposite: false,
            showLastLabel: true,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("picA", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("picA", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }/*, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwuy,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwdy,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwwdy,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }*/],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });
}

function getShimenHLineCAPACITY(msg) {
    var date = new Date(2020, 0, 1);
    var data5 = msg["getShimenHLineCAPACITY5y"];
    var data1 = msg["getShimenHLineCAPACITYLast"];
    var datat = msg["getShimenHLineCAPACITYThis"];
    var dataw = msg["getShimenHLineCAPACITYWarning"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var timeblockg = [];
    var timeblocky = [];
    var timeblocko = [];
    var val0229, val0301, val0302;

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getShimenHLineCAPACITYLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y"+ i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;

    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat((valFive0229 / 100).toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat((data5[i].SM_CAPACITY / 100).toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].SM_CAPACITY;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].SM_CAPACITY;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].SM_CAPACITY;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].SM_CAPACITY, 100)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].SM_CAPACITY = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].SM_CAPACITY;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].SM_CAPACITY;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].SM_CAPACITY;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].SM_CAPACITY, 100)]);
    }

    for (var i = 0; i < dataw.length; i++) {
        timeblockg.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat((dataw[i].ul / 100).toFixed(2))]);
        timeblocky.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat((dataw[i].dl / 100).toFixed(2))]);
        timeblocko.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat((dataw[i].idl / 100).toFixed(2))]);
    }

    StockChart[0][1] = Highcharts.StockChart({
        chart: {
            renderTo: 'picB',
            alignTicks: false,
            marginTop: 20
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
        yAxis: [{ // Primary yAxis
            min: 0,
            max: 220,
            tickPositions: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220],
            opposite: false,
            showLastLabel: true,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("picB", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("picB", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,//
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockg,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblocky,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblocko,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });
}

//寶山水位歷線
function getBaoBLine(msg) {
    var date = new Date(2020, 0, 1);
    var data5 = msg["getBaoBLine5y"];
    var data1 = msg["getBaoBLineLast"];
    var datat = msg["getBaoBLineThis"];
    //var dataw = msg["getBaoHLineWarning"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var timeblockwdy = [];
    var timeblockwwdy = [];
    var val0229, val0301, val0302;

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getBaoBLineLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y" + i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;

    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat(valFive0229.toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat(data5[i].stage.toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].stage;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].stage;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].stage;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].stage)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].stage = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].stage;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].stage;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].stage;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].stage)]);
    }
    /*
    for (var i = 0; i < dataw.length; i++) {
        timeblockwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].ud)]);
        timeblockwwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].wd)]);
    }*/

    StockChart[1][0] = Highcharts.StockChart({
        chart: {
            renderTo: 'picA',
            alignTicks: false,
            marginTop: 20
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
        yAxis: [{ // Primary yAxis
            min: 120,
            max: 144,
            tickInterval: 2,
            showLastLabel: true,
            // tickPositions: [120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144],
            opposite: false,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("picA_Bao", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("picA_Bao", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwdy,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwwdy,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });
}
// 寶山+寶二 歷線
function getBao2AddBaoshanHistory(msg)
{
    var date = new Date(); // 取得現在時間
    var currentYear = date.getFullYear(); // 今年：2021
    var dataY = msg["getBao2AddBaoshanHistory"]; // dataY = 從service來的那些陣列
    // debugger; // 寶二區間統計 幾個月 ?!
    // console.log('寶二區間統計 幾個月 ?!',dataY);

    timeblockBao2AddBaoshanYInflow = [];    // 入流量
    timeblockBao2AddBaoshanYOutflow = [];   // 出水量
    timeblockBao2overflow = [];   // 寶二溢放流量

    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear); // 取得 幾月有幾天
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i); // date.utc : 返回指定的时间距 GMT 时间 1970 年 1 月 1 日午夜的毫秒数。 
            var val = null;
            for (var y = 0; y < dataY.length; y++) {
                if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                    val = dataY[y];   // val = { rain: 0.5, XXX: 5.23 , date:2021-01-01 }
                    break;
                }
            }

            var valInFlow = null;   // 入流量
            var valOutFlow = null;  // 出水量
            var valFlow = null;  // 寶二溢放流量

            if (val == null)
            {
                // timeblockBaoYPV.push([utc, null]);
                // timeblockYStage.push([utc, null]);
                timeblockBao2AddBaoshanYInflow.push([utc, null]);
                timeblockBao2AddBaoshanYOutflow.push([utc, null]);
                timeblockBao2overflow.push([utc, null]);
            }
            else
            {
                valInFlow = val.TotalInflow;
                valOutFlow = val.TotalOutWater;
                valFlow = val.baoshangoverflow;
                
                // 取到小數點第一位
                valInFlow = (valInFlow == null) ? null : parseFloat(valInFlow.toFixed(2));
                valOutFlow = (valOutFlow == null) ? null : parseFloat(valOutFlow.toFixed(2));
                valFlow = (valFlow == null) ? null : parseFloat(valFlow.toFixed(2));
                
                timeblockBao2AddBaoshanYInflow.push([utc, valInFlow]);
                timeblockBao2AddBaoshanYOutflow.push([utc, valOutFlow]);
                timeblockBao2overflow.push([utc, valFlow]);
            }
        }
    }


    var ny = new Date().getFullYear(); // 取得現在幾年 : 2021
    var nm = new Date().getMonth();   // 取得現在幾月 : 2 ? why is not 3 ? ==> 0代表1 ? 1代表2月? 
    chartMin = Date.UTC(ny, nm, 1);
    chartMax = Date.UTC(ny, nm + 1, 0);
    reCountBao2AddBaoRain(chartMin, chartMax);
    
    //
    StockChart[zIndex][120] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBao2AddBaoFlow',
            marginRight: 15,
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationBao2AddBaoFlow", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationBao2AddBaoFlow", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockBao2AddBaoshanYInflow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockBao2AddBaoshanYOutflow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#03bf16',
            data: timeblockBao2overflow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });

    xIndex = 120;
    StockChart[zIndex][120]['zoom1m']();
}

//寶山蓄水量歷線
function getBaoBLineCAPACITY(msg) {
    var date = new Date(2020, 0, 1);
    var val0229, val0301, val0302;
    var data5 = msg["getBaoBLineCAPACITY5y"];
    var data1 = msg["getBaoBLineCAPACITYLast"];
    var datat = msg["getBaoBLineCAPACITYThis"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getBaoBLineCAPACITYLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y" + i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;

    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat((valFive0229 / 100).toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat((data5[i].retain / 100).toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].retain;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].retain;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].retain;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].retain, 100)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].retain = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].retain;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].retain;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].retain;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].retain, 100)]);
    }

    StockChart[1][1] = Highcharts.StockChart({
        chart: {
            renderTo: 'picB',
            alignTicks: false,
            marginTop: 20
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
        yAxis: [{ // Primary yAxis
            min: 0,
            max: 6,
            tickInterval: 1,
            opposite: false,
            showLastLabel: true,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("picB_Bao", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("picB_Bao", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });
}

//寶二水位歷線
function getBaoHLine(msg) {
    var date = new Date(2020, 0, 1);
    var data5 = msg["getBaoHLine5y"];
    var data1 = msg["getBaoHLineLast"];
    var datat = msg["getBaoHLineThis"];
    var dataw = msg["getBaoHLineWarning"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var timeblockwdy = [];
    var timeblockwwdy = [];
    var val0229, val0301, val0302;

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getBaoHLineLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y" + i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;

    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat(valFive0229.toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat(data5[i].stage.toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].stage;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].stage;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].stage;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].stage)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].stage = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].stage;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].stage;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].stage;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].stage)]);
    }
    /*
    for (var i = 0; i < dataw.length; i++) {
        timeblockwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].ud)]);
        timeblockwwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].wd)]);
    }*/

    StockChart[1][0] = Highcharts.StockChart({
        chart: {
            renderTo: 'picA',
            alignTicks: false,
            marginTop: 20
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
        yAxis: [{ // Primary yAxis
            min: 110,
            max: 155,
            tickInterval: 5,
            showLastLabel: true,
            opposite: false,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("picA_Bao", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("picA_Bao", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        },  {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwdy,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#000000',
            data: timeblockwwdy,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }

    });
}

function getBaoHistory(msg)
{
    var date = new Date();
    var currentYear = date.getFullYear();
    var dataY = msg["getBaoHistory"];
    // console.log('上坪堰雨量',dataY);
    var dataToday = msg["getBaoHistoryToday"]; // 取最新的一筆加到今天
    var rainToday = 0; // 取最新的一筆加到今天
   
    timeblockBaoYPV = [];
    var timeblockYStage = [];//水位
    var timeblockYContain = [];//蓄水量
    timeblockLonNStage = []; // 隆恩堰水位
    timeblockBaoYInFlow = [];
    timeblockBaoYOutFlow = [];

    var utcBlock = (Date.UTC(dataToday[dataToday.length-1].dTime.substring(0, 4), parseInt(dataToday[dataToday.length-1].dTime.substring(5, 7)) - 1, dataToday[dataToday.length-1].dTime.substring(8, 10)));  
    rainToday = dataToday[dataToday.length-1].Now;
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = null;
            for (var y = 0; y < dataY.length; y++) {
                if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                    val = dataY[y];
                    break;
                }
            }

            var valInFlow = null;
            var valOutFlow = null;

            if (val == null)
            {
                if (utc == utcBlock) {
                    timeblockBaoYPV.push([utc, rainToday]); // 加入今天的雨量
                    timeblockYStage.push([utc, null]);
                    timeblockYContain.push([utc, null]);
                    timeblockLonNStage.push([utc, null]);// 隆恩堰
                    timeblockBaoYInFlow.push([utc, null]);
                    timeblockBaoYOutFlow.push([utc, null]);
                }
                else
                {
                    timeblockBaoYPV.push([utc, null]);
                    timeblockYStage.push([utc, null]);
                    timeblockYContain.push([utc, null]);
                    timeblockLonNStage.push([utc, null]);// 隆恩堰
                    timeblockBaoYInFlow.push([utc, null]);
                    timeblockBaoYOutFlow.push([utc, null]);
                }

                // timeblockBaoYPV.push([utc, null]);
                // timeblockYStage.push([utc, null]);
                // timeblockBaoYInFlow.push([utc, null]);
                // timeblockBaoYOutFlow.push([utc, null]);
            }
            else
            {
                valInFlow = val.inflow;
                //valOutFlow = val.supply_BaoWater + val.supply_KEZIHU + val.baoshangoverflow;
                //2021.03.10 寶二水庫取出水量改接service來的合計值
                valOutFlow = val.bao2TotalOutWater;

                valInFlow = (valInFlow == null) ? null : parseFloat(valInFlow.toFixed(1));
                valOutFlow = (valOutFlow == null) ? null : parseFloat(valOutFlow.toFixed(1));

                timeblockBaoYPV.push([utc, val.rainfall]);
                timeblockYStage.push([utc, val.stage]);
                timeblockYContain.push([utc, parseFloat(parseFloat(val.baoshangContain2 / 100).toFixed(2))]);//蓄水量
                timeblockLonNStage.push([utc, val.take4watercom]);// 隆恩堰
                timeblockBaoYInFlow.push([utc, valInFlow]);
                timeblockBaoYOutFlow.push([utc, valOutFlow]);
            }
        }
    }
    var ny = new Date().getFullYear();
    var nm = new Date().getMonth();
    chartMin = Date.UTC(ny, nm, 1);
    chartMax = Date.UTC(ny, nm + 1, 0);
    reCountBaoRain(chartMin, chartMax);

    //var latestData = dataY[dataY.length - 1];
    //var latestInFlow = latestData.inflow;
    //var latestOutFlow = latestData.supply_BaoWater + latestData.supply_KEZIHU;
    //$("#stationBaoFlowIN").html(latestInFlow.toFixed(2));
    //$("#stationBaoFlowOUT").html(latestOutFlow.toFixed(2));

    StockChart[zIndex][98] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBao',
            marginRight: 15,
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
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationBao", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationBao", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
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
        {
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
            data: timeblockBaoYPV,
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
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() +  "<br/>" +'<span style="color:#95ceff">●</span> : ' + "<b>" + this.points[0].y + "</b>";

            }
        }
    });

    xIndex = 98;
    StockChart[zIndex][98]['zoom1m']();

    //
    // StockChart[zIndex][99] = Highcharts.StockChart({
    //     chart: {
    //         renderTo: 'stationBaoStage',
    //         marginRight: 15,
    //         alignTicks: true
    //     },

    //     rangeSelector: {
    //         selected: 0,
    //         enabled: false,
    //         inputEnabled: false,
    //         buttons: [{
    //             type: 'month',
    //             count: 1,
    //             text: '1月'
    //         }, {
    //             type: 'month',
    //             count: 3,
    //             text: '3月'
    //         }, {
    //             type: 'month',
    //             count: 6,
    //             text: '6月'
    //         }, {
    //             type: 'ytd',
    //             text: '至本日'
    //         }, {
    //             type: 'all',
    //             text: '全年'
    //         }]
    //     },

    //     title: {
    //         text: ''
    //     },
    //     xAxis: {
    //         gridLineWidth: 1,
    //         tickInterval:  28 * 24 * 3600 * 1000,
    //         type: 'datetime',
    //         dateTimeLabelFormats: {
    //             day: '%m/%d',
    //         },
    //         labels: {
    //             // format: '{value:%m/%d %H}',
    //             format: '{value:%m/%d}',
    //             step: null,
    //             // rotation: -45
    //         },
    //         events: {
    //             setExtremes: function (e) {
    //                 console.log(this);
    //                 if (typeof (e.rangeSelectorButton) !== 'undefined') {
    //                     //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
    //                 }
    //             }
    //         }
    //     },
        
    //     yAxis: [{
    //         // tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
    //         // tickPositions: [0, 500],
    //         // tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
    //         // tickPositions: tickPoint,
    //         tickAmount: 12,
    //         allowDecimals: false,
    //         showLastLabel: true,
    //         min:0,
    //         // tickInterval: 1,
    //         // className: '',
    //         opposite: false,
    //         title: {
    //             text: ''
    //         }
    //     }, {
    //         // className: '',
    //         // tickPositions: [130, 140, 150, 160, 170, 180],
    //         // tickPositions: [0, 500],
    //         // tickPositions: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    //         tickAmount: 12,
    //         allowDecimals: false,
    //         // max:220,
    //         // min:0,
    //         // tickPositions: tickPoint_Contain,
    //         showLastLabel: true,
    //         opposite: true,
    //         title: {
    //             text: ''
    //         }
    //     }],

    //     navigator: {
    //         enabled: false
    //     },

    //     // plotOptions: {
    //     //     line: {
    //     //         dataLabels: {
    //     //             enabled: true
    //     //         }
    //     //     }
    //     // },

    //     // series: [{
    //     //     name: ' ',
    //     //     type: 'spline',
    //     //     color: '#4169BC',
    //     //     data: timeblockYStage,
    //     //     tooltip: {
    //     //         headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //     //         valueSuffix: ''
    //     //     }
    //     // }]

    //     series: [{
    //         name: ' ',
    //         type: 'spline',
    //         color: '#3399FF',
    //         data: timeblockYStage,
    //         yAxis: 0,
    //         tooltip: {
    //             valueSuffix: '',
    //             headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //             shared: true,
    //         }
    //     },{
    //         name: ' ',
    //         type: 'spline',
    //         color: '#FF9900',
    //         data: timeblockYContain,
    //         yAxis: 1,
    //         tooltip: {
    //             valueSuffix: '',
    //             headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //             shared: true,
    //         }
    //     }]
    // });

    // xIndex = 99;
    // StockChart[zIndex][99]['zoom1m']();


    //test-----------------------------------------------------
    StockChart[zIndex][99] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBaoStage',
            alignTicks: true,
            marginTop: 15
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
            tickInterval:  28 * 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                // format: '{value:%m/%d %H}',
                format: '{value:%m/%d}',
                step: null,
                // rotation: -45
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
        yAxis: [{
            // tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
            // tickPositions: [0, 500],
            tickPositions: [110,115,120,125,130,135,140,145,150,155],
            // tickPositions: tickPoint,
            //tickAmount: 5,
            //endOnTick: false,
            max: 155,
            min: 110,
            //allowDecimals: false,
            showLastLabel: true,
            // tickInterval: 1,
            // className: '',
            opposite: false,
            title: {
                text: ''
            }
        }, {
            // className: '',
            // tickPositions: [130, 140, 150, 160, 170, 180],
            // tickPositions: [0, 500],
            // tickPositions: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
            tickAmount: 10,
            //allowDecimals: false,
            max: 45,
            min: 0,
            tickInterval: 5,
            // tickPositions: tickPoint_Contain,
            showLastLabel: true,
            opposite: true,
            title: {
                text: ''
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationBaoStage", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationBaoStage", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYStage,
            yAxis: 0,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYContain,
            yAxis: 1,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        }]
        ,tooltip:{
            formatter: function(){
		        // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText; 
            }
        }
    });

    xIndex = 99;
    StockChart[zIndex][99]['zoom1m']();
    //test-----------------------------------------------------

    //
    StockChart[zIndex][100] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBaoFlow',
            marginRight: 15,
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockBaoYInFlow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockBaoYOutFlow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
    });

    xIndex = 100;
    StockChart[zIndex][100]['zoom1m']();

    //
    StockChart[zIndex][97] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationLonNStage',
            marginRight: 15,
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    max: 35,
                    // tickPositions: [110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationLonNStage", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationLonNStage", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblockLonNStage,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() +  "<br/>" +'<span style="color:#4169bc">●</span> : ' + "<b>" + this.points[0].y + "</b>";

            }
        }
    });

    xIndex = 97;
    StockChart[zIndex][97]['zoom1m']();
}

// 寶二區間統計 - 自訂
function getBaoHistoryCustom(msg) {
    // debugger;
    var date = new Date();
    //var currentYear = date.getFullYear();
    // var dataY = msg["getBaoHistory"];
    var dataY = msg["getBao2AddBaoshanHistory"]; //* 20210507 更改 入流量 & 出流量的計算方式 ( 在sql那邊加好了 ) */
    // console.log('getBaoHistoryCustom',dataY)
    var dataToday = msg["getBaoHistoryToday"]; // 取最新的一筆加到今天
    var rainToday = 0; // 取最新的一筆加到今天

    var rainTotalY = 0;
    var inFlowTotalY = 0;
    var outFlowTotalY = 0;
    var overFlowTotalY = 0;
    var LonNTotal = 0;//隆恩堰
    var timeblockBaoYPVCustom = [];
    var timeblockYStageCustom = [];//水位
    var timeblockYContainCustom = [];//蓄水量

    var timeblockBaoYInFlowCustom = [];
    var timeblockBaoYOutFlowCustom = [];
    var timeblockLonNYPVCustom = []; // 隆恩堰
    var timeblockBaoYOverFlowCustom = []; //溢放流量

    var sDate = new Date(searchSBaoDate);
    var eDate = new Date(searchEBaoDate);
    var sYYYY = sDate.getFullYear();
    var sMM = sDate.getMonth() + 1;
    var sDD = sDate.getDate();
    var eYYYY = eDate.getFullYear();
    var eMM = eDate.getMonth() + 1;
    var eDD = eDate.getDate();
    var utcEndday =  Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate());

    // 取得現在的 年月日 
    var nYYYY = date.getFullYear(); 
    var nMM = date.getMonth() + 1 ;
    var nDD = date.getDate();
    var utcToday = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

    rainToday = dataToday[dataToday.length-1].Now; // 今日雨量

    for (var yyyy = sYYYY; yyyy <= eYYYY; yyyy++) {

        for (var m = 1; m <= 12; m++) {
            if (m == 1 && yyyy == sYYYY) {
                m = sMM;
            }
            var days = daysInMonth(m, yyyy);
            for (var i = 1; i <= days; i++) {
                if (i == 1 && yyyy == sYYYY && m == sMM) {
                    i = sDD;
                }
                var utc = Date.UTC(yyyy, m - 1, i);
                var val = null;
                for (var y = 0; y < dataY.length; y++) {
                    if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                        val = dataY[y];
                        break;
                    }
                }

                var valInFlow = null;
                var valOutFlow = null;
                var valOverFlow = null;//溢放流量

                if (val == null) {
                    timeblockBaoYPVCustom.push([utc, null]);
                    timeblockLonNYPVCustom.push([utc, null]); // 隆恩堰
                    timeblockYStageCustom.push([utc, null]);//水位
                    timeblockYContainCustom.push([utc, null]);//蓄水量
                    timeblockBaoYInFlowCustom.push([utc, null]);
                    timeblockBaoYOutFlowCustom.push([utc, null]);
                    timeblockBaoYOverFlowCustom.push([utc, null]);//溢放流量
                }
                else {
                    valInFlow = val.inflow;
                    //valOutFlow = val.supply_BaoWater + val.supply_KEZIHU + val.baoshangoverflow;
                    //2021.03.10 寶二水庫取出水量改接service來的合計值
                    valOutFlow = val.bao2TotalOutWater;
                    valOverFlow = val.baoshangoverflow;

                    valInFlow = (valInFlow == null) ? null : parseFloat(valInFlow.toFixed(2));
                    valOutFlow = (valOutFlow == null) ? null : parseFloat(valOutFlow.toFixed(2));
                    valOverFlow = (valOverFlow == null) ? null : parseFloat(valOverFlow.toFixed(2));//溢放流量

                    timeblockBaoYPVCustom.push([utc, val.rainfall]);
                    timeblockLonNYPVCustom.push([utc, val.take4watercom]); // 隆恩堰
                    timeblockYStageCustom.push([utc, val.stage]);//水位
                    timeblockYContainCustom.push([utc, parseFloat(parseFloat(val.baoshangContain2 / 100).toFixed(2))]);//蓄水量
                    timeblockBaoYInFlowCustom.push([utc, valInFlow]);
                    timeblockBaoYOutFlowCustom.push([utc, valOutFlow]);
                    timeblockBaoYOverFlowCustom.push([utc, valOverFlow]);//溢放流量

                    rainTotalY += val.rainfall;
                    inFlowTotalY += valInFlow;
                    outFlowTotalY += valOutFlow;
                    overFlowTotalY += valOverFlow;//溢放流量
                    LonNTotal += val.take4watercom;//隆恩堰
                }

                if (yyyy == eYYYY && m == eMM && i == eDD) {
                    m = 12;
                    break;
                }
            }
        }
    }

    if (utcEndday >= utcToday) { // 判斷 結束日期 >= 今日
        timeblockBaoYPVCustom[dataY.length][1] += rainToday ;
        rainTotalY += val;
    }

    $("#stationRainBaoVal").html(commafy(rainTotalY.toFixed(1)));
    // $("#stationBaoFlowIN").html(commafy(inFlowTotalY.toFixed(1)));
    // $("#stationBaoFlowOUT").html(commafy(outFlowTotalY.toFixed(1)));
    
    $("#stationBao2AddBaoFlowIN").html(commafy(inFlowTotalY.toFixed(1)));
    $("#stationBao2AddBaoFlowOUT").html(commafy(outFlowTotalY.toFixed(1)));
    $("#stationLonNStageTotal").html(commafy(LonNTotal.toFixed(1)));
    $("#stationBao2AddBaoOverFlow").html(commafy(overFlowTotalY.toFixed(1)));
    
    //var ny = new Date().getFullYear();
    //var nm = new Date().getMonth();
    //chartMin = Date.UTC(ny, nm, 1);
    //chartMax = Date.UTC(ny, nm + 1, 0);
    //reCountBaoRain(chartMin, chartMax);

    //var latestData = dataY[dataY.length - 1];
    //var latestInFlow = latestData.inflow;
    //var latestOutFlow = latestData.supply_BaoWater + latestData.supply_KEZIHU;
    //$("#stationBaoFlowIN").html(latestInFlow.toFixed(2) + " cms");
    //$("#stationBaoFlowOUT").html(latestOutFlow.toFixed(2) + " cms");

    StockChart[zIndex][107] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBaoCustom',
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
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationBaoCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationBaoCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
            {
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
                data: timeblockBaoYPVCustom,
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
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() +  "<br/>" +'<span style="color:#95ceff">●</span> : ' + "<b>" + this.points[0].y + "</b>";
            }
        }
    });
    
    StockChart[zIndex][108] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBaoStageCustom',
            alignTicks: true,
            marginTop: 15
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
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationBaoStageCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationBaoStageCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis: [{
            tickPositions: [110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
            // tickPositions: tickPoint,
            //tickAmount: 12,
            allowDecimals: false,
            showLastLabel: true,
            opposite: false,
            title: {
                text: ''
            }
        }, {
            tickPositions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
            // tickPositions: tickPoint_Contain,
            //tickAmount: 12,
            allowDecimals: false,
            // max:100,
            min:0,
            showLastLabel: true,
            opposite: true,
            title: {
                text: ''
            }
        }],

        // yAxis:
        //     [
        //         { // Primary yAxis
        //             min: 110,
        //             // min: 120,
        //             max: 150,
        //             tickPositions: [110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
        //             // tickPositions: [120, 125, 130, 135, 140, 145, 150, 155],
        //             opposite: false,
        //             labels: {
        //                 format: '{value}',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 }
        //             },
        //             title: {
        //                 text: '',
        //                 style: {
        //                     color: Highcharts.getOptions().colors[1]
        //                 }
        //             }
        //         }],

        navigator: {
            enabled: false
        },

        // plotOptions: {
        //     line: {
        //         dataLabels: {
        //             enabled: true
        //         }
        //     }
        // },

        // series: [{
        //     name: ' ',
        //     type: 'spline',
        //     color: '#4169BC',
        //     data: timeblockYStageCustom,
        //     tooltip: {
        //         headerFormat: '{point.x:%Y/%m/%d}<br/>',
        //         valueSuffix: ''
        //     }
        // }]

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYStageCustom,
            yAxis: 0,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYContainCustom,
            yAxis: 1,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        }]
        ,tooltip:{
            formatter: function(){
		        // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText; 
            }
        }
    });
    
    StockChart[zIndex][109] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationBaoFlowCustom',
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
                },
                // point:{
                //     events:{
                //         click: function(){
                //             // console.log('Moused click');
                //             triggerOtherChart("stationBaoFlowCustom", this.x);
                //         },
                //         mouseOver: function () {
                //             // console.log('Moused over');
                //             triggerOtherChart("stationBaoFlowCustom", this.x);
                //         },
                //         mouseOut: function () {
                //             // console.log( 'Moused out');
                //         }
                //     }
                // }//point
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationBaoFlowCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationBaoFlowCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockBaoYInFlowCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockBaoYOutFlowCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#03bf16',
            data: timeblockBaoYOverFlowCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
        ,tooltip:{
            formatter: function(){
		        // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText; 
            }
        }
    });

    // 隆恩堰
    StockChart[zIndex][112] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationLonNStageCustom',
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    // min: 120,
                    max: 35,
                    // tickPositions: [110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
                    // tickPositions: [120, 125, 130, 135, 140, 145, 150, 155],
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationLonNStageCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationLonNStageCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblockLonNYPVCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() +  "<br/>" +'<span style="color:#4169bc">●</span> : ' + "<b>" + this.points[0].y + "</b>";

            }
        }
    });

    // //顯示區間最新一筆的月份+前2個月，共3個月
    // var chartMin = Date.UTC(eYYYY, eMM - 2, 1);
    // var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);

    // //標籤是否顯示月份每月第一日
    // var isShowMonthLabel = false;
    // //若今天是2021-01-01，顯示資料區間為去年2020-01-01~2020-12-31，則顯示範圍為一整年
    // if (sYYYY == date.getFullYear() - 1 && sMM == 1 && sDD == 1 && eYYYY == date.getFullYear() - 1 && eMM == 12 && eDD == 31) {
    //     isShowMonthLabel = true;
    //     var chartMin = Date.UTC(sYYYY, 0, 1);
    //     var chartMax = Date.UTC(eYYYY, 11, 31);
    // }
    // else if (((sYYYY == date.getFullYear() - 1 && sMM == 11 && sDD == 1) || (sYYYY == date.getFullYear() - 1 && sMM == 12 && sDD == 1)) && (eYYYY == date.getFullYear() && eMM == 1 && eDD == 31)) {
    //     //若為2020-11-01~2021-01-31或是2020-12-01~2021-01-31
    //     if (sMM == 11) {
    //         //若為2020-11-01~2021-01-31，為三個月區間，標籤顯示月每月第一日
    //         isShowMonthLabel = true;
    //     }
    //     var chartMin = Date.UTC(sYYYY, sMM - 1, sDD);
    //     var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);
    // }
    // else if ((sYYYY == date.getFullYear() - 1 && sMM == 12 && sDD == 1) && (eYYYY == date.getFullYear() && eMM == 2 && (eDD == 28 || eDD == 29))) {
    //     //若為2020-12-01~2021-02-28或是29，為三個月區間，標籤顯示月份每月第一日
    //     isShowMonthLabel = true;
    //     var chartMin = Date.UTC(sYYYY, sMM - 1, sDD);
    //     var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);
    // }

    // if (chartMin >= sDate.getTime()) {
    //     StockChart[zIndex][107].xAxis[0].setExtremes(chartMin, chartMax);
    //     StockChart[zIndex][108].xAxis[0].setExtremes(chartMin, chartMax);
    //     StockChart[zIndex][109].xAxis[0].setExtremes(chartMin, chartMax);
    //     StockChart[zIndex][112].xAxis[0].setExtremes(chartMin, chartMax);
    // }

    const baoDateDiff = (new Date(yyy2yyyy($('#sBaoCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eBaoCustomDateText').val()))));
    if (baoDateDiff > 62) {//超過兩個月只顯示第一天
        StockChart[zIndex][107].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
            labels: {
                step: null,
                format: '{value:%m/%d}'
            }
        });
        StockChart[zIndex][108].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
            labels: {
                step: null,
                format: '{value:%m/%d}'
            }
        });
        StockChart[zIndex][109].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
            labels: {
                step: null,
                format: '{value:%m/%d}'
            }
        });
        StockChart[zIndex][112].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
            labels: {
                step: null,
                format: '{value:%m/%d}'
            }
        });
    }
}

function getWaterDetailManagementX_New_Year(msg) {
    var date = new Date();
    var currentYear = date.getFullYear();
    var dataY = msg["getWaterDetailManagementX_New_Year"];

    timeblockYA = [];
    timeblockYB = [];
    timeblockYC = [];
    timeblockYD = [];

    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = null;
            for (var y = 0; y < dataY.length; y++) {

                if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                    val = dataY[y];
                    break;
                }
            }

            if (val == null) {
                timeblockYA.push([utc, null]);
                timeblockYB.push([utc, null]);
                timeblockYC.push([utc, null]);
                timeblockYD.push([utc, null]);
            }
            else {
                
                timeblockYA.push([utc, parseFloat(val.a == null ? null : val.a.toFixed(1))]);
                timeblockYB.push([utc, parseFloat(val.b == null ? null : val.b.toFixed(1))]);
                timeblockYC.push([utc, parseFloat(val.c == null ? null : val.c.toFixed(1))]);
                timeblockYD.push([utc, parseFloat(val.d == null ? null : val.d.toFixed(1))]);
            }
        }
    }

    var ny = new Date().getFullYear();
    var nm = new Date().getMonth();
    chartMin = Date.UTC(ny, nm, 1);
    chartMax = Date.UTC(ny, nm + 1, 0);
    reCountSWS(chartMin, chartMax);

    //
    StockChart[zIndex][90] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSWSA',
            marginRight: 15,
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationSWSA", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationSWSA", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYA,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYB,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText; 
            }
        }
    });

    xIndex = 90;
    StockChart[zIndex][90]['zoom1m']();


    //
    StockChart[zIndex][91] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSWSB',
            marginRight: 15,
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationSWSB", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationSWSB", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYC,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYD,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
		        // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });

    xIndex = 91;
    StockChart[zIndex][91]['zoom1m']();
}

function getWaterDetailManagementX_New_YearCustom(msg) {
    var date = new Date();
    //var currentYear = date.getFullYear();
    var dataY = msg["getWaterDetailManagementX_New_Year"];

    var timeblockYACustom = [];
    var timeblockYBCustom = [];
    var timeblockYCCustom = [];
    var timeblockYDCustom = [];

    var vala = 0;
    var valb = 0;
    var valc = 0;
    var vald = 0;

    var sDate = new Date(searchSSWSDate);
    var eDate = new Date(searchESWSDate);
    var sYYYY = sDate.getFullYear();
    var sMM = sDate.getMonth() + 1;
    var sDD = sDate.getDate();
    var eYYYY = eDate.getFullYear();
    var eMM = eDate.getMonth() + 1;
    var eDD = eDate.getDate();

    for (var yyyy = sYYYY; yyyy <= eYYYY; yyyy++) {
        for (var m = 1; m <= 12; m++) {
            if (m == 1 && yyyy == sYYYY) {
                m = sMM;
            }
            var days = daysInMonth(m, yyyy);
            for (var i = 1; i <= days; i++) {
                if (i == 1 && yyyy == sYYYY && m == sMM) {
                    i = sDD;
                }
                var utc = Date.UTC(yyyy, m - 1, i);
                var val = null;
                for (var y = 0; y < dataY.length; y++) {

                    if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                        val = dataY[y];
                        break;
                    }
                }

                if (val == null) {
                    timeblockYACustom.push([utc, null]);
                    timeblockYBCustom.push([utc, null]);
                    timeblockYCCustom.push([utc, null]);
                    timeblockYDCustom.push([utc, null]);
                }
                else {

                    timeblockYACustom.push([utc, parseFloat(val.a == null ? null : val.a.toFixed(1))]);
                    timeblockYBCustom.push([utc, parseFloat(val.b == null ? null : val.b.toFixed(1))]);
                    timeblockYCCustom.push([utc, parseFloat(val.c == null ? null : val.c.toFixed(1))]);
                    timeblockYDCustom.push([utc, parseFloat(val.d == null ? null : val.d.toFixed(1))]);

                    vala += parseFloat(val.a == null ? 0 : val.a.toFixed(1));
                    valb += parseFloat(val.b == null ? 0 : val.b.toFixed(1));
                    valc += parseFloat(val.c == null ? 0 : val.c.toFixed(1));
                    vald += parseFloat(val.d == null ? 0 : val.d.toFixed(1));

                }

                if (yyyy == eYYYY && m == eMM && i == eDD) {
                    m = 12;
                    break;
                }
            }
        }
    }

    $("#swsta").html(commafy(vala.toFixed(1)));
    $("#swstb").html(commafy(valb.toFixed(1)));
    $("#swstc").html(commafy(valc.toFixed(1)));
    $("#swstd").html(commafy(vald.toFixed(1)));

    //var ny = new Date().getFullYear();
    //var nm = new Date().getMonth();
    //chartMin = Date.UTC(ny, nm, 1);
    //chartMax = Date.UTC(ny, nm + 1, 0);
    //reCountSWS(chartMin, chartMax);

    //
    StockChart[zIndex][110] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSWSACustom',
            marginRight: 15,
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationSWSACustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationSWSACustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYACustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYBCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText; 
            }
        }
    });

    StockChart[zIndex][111] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSWSBCustom',
            marginRight: 15,
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationSWSBCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationSWSBCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYCCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYDCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText; 
            }
        }
    });


    // //顯示區間最新一筆的月份+前2個月，共3個月
    // var chartMin = Date.UTC(eYYYY, eMM - 2, 1);
    // var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);

    // //標籤是否顯示月份每月第一日
    // var isShowMonthLabel = false;
    // //若今天是2021-01-01，顯示資料區間為去年2020-01-01~2020-12-31，則顯示範圍為一整年
    // if (sYYYY == date.getFullYear() - 1 && sMM == 1 && sDD == 1 && eYYYY == date.getFullYear() - 1 && eMM == 12 && eDD == 31) {
    //     isShowMonthLabel = true;
    //     var chartMin = Date.UTC(sYYYY, 0, 1);
    //     var chartMax = Date.UTC(eYYYY, 11, 31);
    // }
    // else if (((sYYYY == date.getFullYear() - 1 && sMM == 11 && sDD == 1) || (sYYYY == date.getFullYear() - 1 && sMM == 12 && sDD == 1)) && (eYYYY == date.getFullYear() && eMM == 1 && eDD == 31)) {
    //     //若為2020-11-01~2021-01-31或是2020-12-01~2021-01-31
    //     if (sMM == 11) {
    //         //若為2020-11-01~2021-01-31，為三個月區間，標籤顯示月每月第一日
    //         isShowMonthLabel = true;
    //     }
    //     var chartMin = Date.UTC(sYYYY, sMM - 1, sDD);
    //     var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);
    // }
    // else if ((sYYYY == date.getFullYear() - 1 && sMM == 12 && sDD == 1) && (eYYYY == date.getFullYear() && eMM == 2 && (eDD == 28 || eDD == 29))) {
    //     //若為2020-12-01~2021-02-28或是29，為三個月區間，標籤顯示月份每月第一日
    //     isShowMonthLabel = true;
    //     var chartMin = Date.UTC(sYYYY, sMM - 1, sDD);
    //     var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);
    // }

    // if (chartMin >= sDate.getTime()) {
    //     StockChart[zIndex][110].xAxis[0].setExtremes(chartMin, chartMax);
    //     StockChart[zIndex][111].xAxis[0].setExtremes(chartMin, chartMax);
    // }

    const shihsupplyDateDiff = (new Date(yyy2yyyy($('#sSWSCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eSWSCustomDateText').val()))));
    if (shihsupplyDateDiff > 62) {
        StockChart[zIndex][110].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
            labels: {
                step: null,
                format: '{value:%m/%d}'
            }
        });
        StockChart[zIndex][111].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
            labels: {
                step: null,
                format: '{value:%m/%d}'
            }
        });
    }
}

//寶二蓄水量歷線
function getBaoHLineCAPACITY(msg) {
    var date = new Date(2020, 0, 1);
    var data5 = msg["getBaoHLineCAPACITY5y"];
    var data1 = msg["getBaoHLineCAPACITYLast"];
    var datat = msg["getBaoHLineCAPACITYThis"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var val0229, val0301, val0302;

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getBaoHLineCAPACITYLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y" + i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;

    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat((valFive0229 / 100).toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat((data5[i].retain / 100).toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].retain;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].retain;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].retain;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].retain, 100)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].retain = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].retain;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].retain;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].retain;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].retain, 100)]);
    }

    StockChart[1][1] = Highcharts.StockChart({
        chart: {
            renderTo: 'picB',
            alignTicks: false,
            marginTop: 20
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
        yAxis: [{ // Primary yAxis
            min: 0,
            max: 35,
            tickInterval: 5,
            showLastLabel: true,
            opposite: false,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("picB_Bao", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("picB_Bao", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });
}

function getBao3HLineCAPACITY(msg) {
    var date = new Date(2020, 0, 1);
    var data5 = msg["getBao3HLineCAPACITY5y"];
    var data1 = msg["getBao3HLineCAPACITYLast"];
    var datat = msg["getBao3HLineCAPACITYThis"];
    var dataw = msg["getBao3HLineCAPACITYWarning"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var timeblockg = [];
    var timeblocky = [];
    var timeblocko = [];
    var timeblockr = [];
    var val0229, val0301, val0302;

    var valFive0229 = 0;
    var endFiveYear = new Date().getFullYear() - 1;
    var startFiveYear = endFiveYear - 4;
    var objLeapYearData = {};
    var dataLeapYear = msg["getBao3HLineCAPACITYLeapYearData"];

    for (var i = startFiveYear; i <= endFiveYear; i++) {
        var obj = {};
        obj.y = i;
        obj.v228 = null;
        obj.v229 = null;
        obj.v31 = null;
        objLeapYearData["y" + i] = obj;
    }

    for (var i = 0; i < dataLeapYear.length; i++) {
        var obj = objLeapYearData["y" + dataLeapYear[i].y];
        obj.y = dataLeapYear[i].y;
        if (dataLeapYear[i].v != null) {
            var key = "v" + dataLeapYear[i].m.toString() + dataLeapYear[i].d.toString();
            obj[key] = dataLeapYear[i].v;
        }
    }

    var cntYear = 0;
    Object.keys(objLeapYearData).forEach(function (k) {
        var obj = objLeapYearData[k];
        if (obj.y % 4 != 0 && obj.v228 != null && obj.v31 != null) {
            valFive0229 += (obj.v228 + obj.v31) / 2;
            cntYear += 1;
        }
        else if (obj.y % 4 == 0 && obj.v229 != null) {
            valFive0229 += obj.v229;
            cntYear += 1;
        }
    });

    if (cntYear != 0)
        valFive0229 = valFive0229 / cntYear;
    else
        valFive0229 = null;

    for (var i = 1; i < data5.length; i++) {
        if (parseInt(data5[i].m) == 2 && parseInt(data5[i].d) == 29) {
            timeblock5y.push([Date.UTC(date.getFullYear(), 1, 28), parseFloat((valFive0229 / 100).toFixed(2))]);
            continue;
        }
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d) - 1), parseFloat((data5[i].retain / 100).toFixed(2))]);
    }

    for (var i = 1; i < data1.length; i++) {
        if (parseInt(data1[i].m) == 2 && parseInt(data1[i].d) == 29) {
            val0229 = data1[i].retain;
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 1) {
            val0301 = data1[i].retain;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(data1[i].m) == 3 && parseInt(data1[i].d) == 2) {
            val0302 = data1[i].retain;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblock1y.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d) - 1), getDividedValueFixed2FloatOrNull(data1[i].retain, 100)]);
    }
    val0229 = undefined, val0301 = undefined, val0302 = undefined;
    //2021.03.08 測試每日0:00附近沒有最新資料，是否造成歷線圖突降到0或顯示異常
    //datat[datat.length - 1].retain = null;
    for (var i = 1; i < datat.length; i++) {
        if (parseInt(datat[i].m) == 2 && parseInt(datat[i].d) == 29) {
            val0229 = datat[i].retain;
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 1) {
            val0301 = datat[i].retain;
            if (val0229 == undefined) {
                //資料日期排序，因此0301時，沒有0229資料表示資料當年為非閏年，因此非閏年0301資料固定放在2/28，不走for最下面的push就不會放到2/29(資料當年為閏年的話不會進if，會走for最下面的push，放到2/29)
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 28), getDividedValueFixed2FloatOrNull(val0301, 100)]);
                continue;
            }
        }
        else if (parseInt(datat[i].m) == 3 && parseInt(datat[i].d) == 2) {
            val0302 = datat[i].retain;
            if (val0229 == undefined) {
                val0229 = (val0301 == null || val0302 == null) ? null : (val0301 + val0302) / 2;
                timeblockty.push([Date.UTC(date.getFullYear(), 2 - 1, 29), getDividedValueFixed2FloatOrNull(val0229, 100)]);
            }
        }
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d) - 1), getDividedValueFixed2FloatOrNull(datat[i].retain, 100)]);
    }

    for (var i = 0; i < dataw.length; i++) {
        timeblockg.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].g/100)]);
        timeblocky.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].y / 100)]);
        timeblocko.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].o / 100)]);
        timeblockr.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].r / 100)]);
    }

    StockChart[1][2] = Highcharts.StockChart({
        chart: {
            renderTo: 'picC',
            alignTicks: false,
            marginTop: 20
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
        yAxis: [{ // Primary yAxis
            min: 0,
            tickInterval: 5,
            opposite: false,
            showLastLabel: true,
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#006400',
            data: timeblock1y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF0000',
            data: timeblockty,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#499D4D',
            data: timeblockg,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FFC545',
            data: timeblocky,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF834D',
            data: timeblocko,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#F74148',
            data: timeblockr,
            dashStyle: 'dash',
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }],

        tooltip: {
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });
}


function chkValueNull(value)
{
    if (value == null)
        return 0;
    else
        return value;
}

function openLink(url) {
    cordova.exec(function() {}, function() {}, "InAppBrowser", "open", [url, '_system', 'location=yes,closebuttoncaption=返回,toolbar=yes']);
}

function countValue(data, values) {
    var val = 0;
    var nullCnt = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i].indexOf("-") == -1) {
            if (data[values[i]] != null && data[values[i]] !== "")
                val += parseFloat(data[values[i]].toFixed(1));
            else
                nullCnt++;
        } else {
            if (data[values[i].substring(1)] != null && data[values[i].substring(1)] !== "")
                val -= parseFloat(data[values[i].substring(1)].toFixed(1));
            else
                nullCnt++;
        }
    }

    //if (values.length == nullCnt)
    if (nullCnt>1)
    {
        val = null;
    }

    return val;
}

function toCount(elem, value, callback) {
    if (value != null) {
        $(elem).countTo({
            from: 0,
            to: value,
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
                if (callback)
                    callback();
            }
        });
    }
    else {
        $(elem).html("--");
        if (callback)
            callback();
    }
}



function getCCTV() {

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getCCTV",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            for (var i = 0; i < msg["getCCTV"].length; i++) {

                var htmlText = $("<h4 class=\"margin-R5\">" + msg["getCCTV"][i]["placeName"] + " " + msg["getCCTV"][i]["cameraName"] + "<button class=\"pull-right margin-T-12 btn btn-xs btn-default \"><img src=\"img/EYES.svg\"/ style=\"width:29px;\">觀看</button></h4><hr/>");
                htmlText.on("click", { cid: msg["getCCTV"][i]["cid"], cameraName: msg["getCCTV"][i]["placeName"] + " " + msg["getCCTV"][i]["cameraName"] }, function (event) {
                    $("#nameCCTV").html(event.data.cameraName);
                    getDetailPageVideo(event.data.cid);
                    // goDetailPageCCTV(event.data.cid);
                    currentCCTV = $(this).parent().attr("alt");
                });
                if (msg["getCCTV"][i]["reservoirID"] == "0")
                    $("#ReservoirA").append(htmlText);
                else if (msg["getCCTV"][i]["reservoirID"] == "1")
                    $("#ReservoirB").append(htmlText);
                else if (msg["getCCTV"][i]["reservoirID"] == "2")
                    $("#ReservoirC").append(htmlText);
                else if(msg["getCCTV"][i]["reservoirID"] == "3")
                    $("#ReservoirD").append(htmlText);
                else
                    $("#ReservoirE").append(htmlText);
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getCCTVFileName(){
    var date = new Date();
    var milliseconds = Date.parse(date)
    milliseconds = milliseconds - (1 * 60 * 1000)
    date = new Date(milliseconds);
    var dyear = date.getFullYear();
    var dmonth = (date.getMonth()+1).toString().padStart(2,'0');
    var ddate = date.getDate().toString().padStart(2,'0');
    var dhour = date.getHours().toString().padStart(2,'0');
    var dmin = date.getMinutes().toString().padStart(2,'0');

    var srcPath = `CCTV_${dyear}-${dmonth}-${ddate}-${dhour}-${dmin}.mov`

    return srcPath;
}

function getDetailPageVideo(cid){
    var timerId_video;
    var fileName = getCCTVFileName();

    $.when(checkVideo(cid, fileName)).done(function(msg){
        if (msg["status"] == "exsist") {
            $("#NoExsistImg").hide();
            $("#myVideo").show();

            $.ajax({
                crossDomain: true,
                cache: false,
                headers: { "cache-control": "no-cache" },
                url: serviceURL + "/getWraNBData.asmx/getCCTVvideo?cid=" + cid,
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function (msg) {
                    var data = msg["getCCTVvideo"];
                    document.getElementById("CCTVsrc").src = serviceURL + data[0]["videoPath"] + fileName;
                    document.getElementById("myVideo").load();


                    // $("#myVideo").on("ended",function(){
                    //     var loopFileName = getCCTVFileName();
                    //     $.when(checkVideo(cid, loopFileName)).done(function(msg){
                    //         if (msg["status"] == "exsist") {
                    //             document.getElementById("CCTVsrc").src = serviceURL + data[0]["videoPath"] + loopFileName;
                    //             document.getElementById("myVideo").load();
                    //             console.log('Loop video success : ', serviceURL + data[0]["videoPath"] + loopFileName)
                    //         }else{
                    //             $("#myVideo").hide();
                    //             $("#NoExsistImg").show();
                    //         }
                    //     })
                    // })

                    
                    clearInterval(timerId_video);
                    function playCCTV(){
                        var loopFileName = getCCTVFileName();
                        $.when(checkVideo(cid, loopFileName)).done(function(msg){
                            if (msg["status"] == "exsist") {
                                document.getElementById("CCTVsrc").src = serviceURL + data[0]["videoPath"] + loopFileName;
                                document.getElementById("myVideo").load();
                                console.log('Loop video success : ',serviceURL + data[0]["videoPath"] + loopFileName)
                            }else{
                                $("#myVideo").hide();
                                $("#NoExsistImg").show();
                            }
                        })
                    }
                    timerId_video = setInterval(playCCTV, 60 * 1000);
                },
                error: function (e) {
                    navigator.notification.alert("無法取得資料", null, "系統異常");
                }
            });

        }else{
            $("#myVideo").hide();
            $("#NoExsistImg").show();
        }
        
    });

    $("#btnRT3").off().on("click", function () {
        clearInterval(timerId_video);
        $("#pageFirst").show();
        $("#pageSixth").hide();

        // video version
        $("#myVideo").hide();
        $("#NoExsistImg").hide();
        // $("#CCTVsrc").attr("src", "");
        document.getElementById("CCTVsrc").src = "";
        document.getElementById("myVideo").load();
        $("#myVideo").off();

        location.href = "#"+currentCCTV;
    });
    $("#pageFirst").hide();
    $("#pageSixth").show();
    
}

function checkVideo(cid, fileName){

    return $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getCCTVVideoExsist?cameraID=" + cid.toString().padStart(2,"0") + "&fileName=" + fileName,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function goDetailPageCCTV(cid) {
    var timerId;
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getCCTVLastTime?cameraID=" + cid,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            if(parseInt(msg["diff"])>600)
                $("#repeatImg > img").attr("src", "./img/offline.png");
            else
            {
                var index = 0;
                clearInterval(timerId);
                function repeatImage() {
                    if (index > 9)
                        index = 0;
                    $("#repeatImg > img").attr("src", serviceURL + "/camera/" + cid + "/" + (index) + ".jpg");
                    index++;
                }

                timerId = setInterval(repeatImage, 1000);
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });


    $("#btnRT3").off().on("click", function () {
        clearInterval(timerId);
        $("#repeatImg > img").attr("src", "");
        $("#pageFirst").show();
        $("#pageSixth").hide();

        location.href = "#"+currentCCTV;
    });
    $("#pageFirst").hide();
    $("#pageSixth").show();
    

}

// 寶二即時統計
function getRTRainHourWithTen(msg) {
    // debugger;
    var rainY = msg["getRTRainBaoByHours"];
    var rainTotalY = 0;
    console.log('上坪堰雨量',rainY);
    var timeblockY = [];
    var timeblockYPV = [];

    var ShowHour;
    var ShowMinute;

    var range = $('.zoom_controls.zoom_controls_HourTen a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    var date = new Date();

    var renderToId = "picRTRainBao";

    if ($("#pageBaoHistory").css("display") != "none") {
        renderToId = "stationBaoCustom";
        var d = (new Date(yyy2yyyy($('#sBaoCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eBaoCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eBaoCustomDateText').val()));
    }
    

    //一次撈10天的資料
    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);


    for (var i = 0; i < totalHours; i++) {
        timeblockYPV.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + i) , null]);
    }

    // //撈回來的小時有+1，每日顯示時間為1~23時
    // for (var q = 0; q < timeblockYPV.length; q++) {
    //     for (var i = 0; i < rainY.length; i++) {
    //         if (timeblockYPV[q][0] == (Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), parseInt(rainY[i].dTime.substring(11, 13))))) {
                
    //             if(rainY[i].dTime.endsWith("01:00:00")) // 處理換天 (2021 -04 -29)
    //             {
    //                 timeblockYPV[i][1] = parseFloat(rainY[i].Now);
    //                 rainTotalY += parseFloat(rainY[i].Now);picI
    //             }
    //             else {
    //                 var v = parseFloat(( parseFloat(rainY[i].Now) - parseFloat(rainY[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出

    //                 if (v < 0) {
    //                     rainY[i].Now = rainY[i - 1].Now;
    //                     v = 0;
    //                 }else{
    //                     rainTotalY += v;
    //                 }

    //                 timeblockYPV[i][1] = parseFloat(v);
    //                 // rainTotalY += v;
    //             }
    //             break;
    //         }
    //     }

    // }

     // 改裝
    
     var isFirstData = true;
     var isNextDate; //需換天的時間( XX日 01:00)
     for (var q = 0; q < timeblockYPV.length; q++) {
         for (var i = 0; i < rainY.length; i++) {
             if (timeblockYPV[q][0] == (Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), parseInt(rainY[i].dTime.substring(11, 13))))) {
                 //第一次進來
                 if (isFirstData) {
                     timeblockYPV[q][1] = parseFloat(rainY[i].Now);
                     rainTotalY += parseFloat(rainY[i].Now);
                     isFirstData = false;
                     isNextDate = new Date(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, parseInt(rainY[i].dTime.substring(8, 10))+1, 1);//隔天的一點
                     break;
                 }
 
                 if ( new Date(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), parseInt(rainY[i].dTime.substring(11, 13))) >= isNextDate) {
                     //換天
                     timeblockYPV[q][1] = parseFloat(rainY[i].Now);
                     rainTotalY += parseFloat(rainY[i].Now);
                     isNextDate = new Date(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, parseInt(rainY[i].dTime.substring(8, 10))+1, 1);//隔天的一點
                     break;
                 }else{
                     var v = parseFloat(( parseFloat(rainY[i].Now) - parseFloat(rainY[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
                     if (v < 0) {
                         rainY[i].Now = rainY[i - 1].Now;
                         v = 0;
                     }else{
                         rainTotalY += v;
                     }
                     timeblockYPV[q][1] = parseFloat(v);
                     break;
                 }
             }
         }
     }
 

    if (rainY.length > 1) {

        var lastIndex = rainY.length - 1;
        var now_minute = Date.UTC(rainY[lastIndex].dTime.substring(0, 4), parseInt(rainY[lastIndex].dTime.substring(5, 7)) - 1, rainY[lastIndex].dTime.substring(8, 10), parseInt(rainY[lastIndex].dTime.substring(11, 13)) ,parseInt(rainY[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainY[lastIndex-1].dTime.substring(0, 4), parseInt(rainY[lastIndex-1].dTime.substring(5, 7)) - 1, rainY[lastIndex-1].dTime.substring(8, 10), parseInt(rainY[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainY[lastIndex-1].dTime.substring(0, 4), parseInt(rainY[lastIndex-1].dTime.substring(5, 7)) - 1, rainY[lastIndex-1].dTime.substring(8, 10), parseInt(rainY[lastIndex-1].dTime.substring(11, 13))+1);
    
        now_minute;
        now_hour;
        next_hour;
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainY[lastIndex].Now) - parseFloat(rainY[lastIndex - 1].Now) ).toPrecision(12)); 
            // timeblockYPV[rainY.length-1][1] += val;
            if (val >= 0) {
                for (let i = 0; i < timeblockYPV.length; i++) {
                    if (timeblockYPV[i][0] == next_hour) {
                        timeblockYPV[i][1] = val;
                        rainTotalY += val;
                    }
                    
                }
            }
        }
        
    }

    if (rainY.length > 0) {//for 00:00~00:50 呈現分鐘資料
        if (rainY[rainY.length-1].dTime.substring(11,13) == "00" && ( parseInt(rainY[rainY.length-1].dTime.substring(14,16)) >= 10 && parseInt(rainY[rainY.length-1].dTime.substring(14,16)) <= 50) ) {
            var val = parseFloat(( parseFloat(rainY[rainY.length-1].Now)).toPrecision(12)); 
            var next_hour = Date.UTC(rainY[rainY.length-1].dTime.substring(0, 4), parseInt(rainY[rainY.length-1].dTime.substring(5, 7)) - 1, rainY[rainY.length-1].dTime.substring(8, 10), parseInt(rainY[rainY.length-1].dTime.substring(11, 13))+1);
            var now_minute = Date.UTC(rainY[rainY.length-1].dTime.substring(0, 4), parseInt(rainY[rainY.length-1].dTime.substring(5, 7)) - 1, rainY[rainY.length-1].dTime.substring(8, 10), parseInt(rainY[rainY.length-1].dTime.substring(11, 13)) ,parseInt(rainY[rainY.length-1].dTime.substring(14, 16)));
            for (let i = 0; i < timeblockYPV.length; i++) {
                if (timeblockYPV[i][0] == next_hour) {
                    timeblockYPV[i][1] = val;
                    rainTotalY += val;
                }
            }
        }
    }
    // timeblockYPV[timeblockYPV.length-1][1] = (parseFloat(rainY[rainY.length -1].Now) - parseFloat(rainY[rainY.length -2].Now));
    // rainTotalY += (parseFloat(rainY[rainY.length -1].Now) - parseFloat(rainY[rainY.length -2].Now));
    $("span[class='totalAll']").html(rainTotalY.toFixed(1));
    

    StockChart[100] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
            alignTicks: false
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
            //minRange: 8 * 3600 * 1000,
            gridLineWidth: 1,
            tickInterval: 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d %H',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: 1,
                rotation: -45
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
            {
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
                    headerFormat: '{point.x:%H:00}/',
                    valueSuffix: '',
                    pointFormatter: function () {
                        return this.options.y.toFixed(1);
                    }
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            if ($("#pageBaoHistory").css("display") != "none")
                                triggerOtherChart("picRTRainBao_hour", this.x);
                            else
                                triggerOtherChart(renderToId, this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            if ($("#pageBaoHistory").css("display") != "none")
                                triggerOtherChart("picRTRainBao_hour", this.x);
                            else
                                triggerOtherChart(renderToId, this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }]
            ,tooltip: {
                formatter: function(){
                    if (this.x == next_hour) {
                        return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
                    }else{
                        // 資料顯示
                        var hour = new Date(this.x).toGMTString().substring(17,19);
                        return hour + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
                    }
                }
            }
    });

    ////zoom to first 8 hours data
    //if (rainY.length > 8)
    //    StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[7][0]);
    // switch (range) {
    //     case "1d":
    //     case "2d":
    //         StockChart[100].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    //         StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    //     case "3d":
    //     case "5d":
    //     case "10d":
    //         StockChart[100].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 //顯示4,8,12,16,20,00
    //                 //step: null
    //                 ////,
    //                 ////formatter: function () {
    //                 ////    var label = this.axis.defaultLabelFormatter.call(this);
                        
    //                 ////    if (label.substr(label.length - 2, 2) == "01")
    //                 ////        return label;
    //                 ////    else if(/*label.substr(label.length - 2, 2) == "06" || */label.substr(label.length - 2, 2) == "12"/* || label.substr(label.length - 2, 2) == "18"*/)
    //                 ////        return label.substr(label.length - 2, 2);
    //                 ////    else
    //                 ////        return "";

    //                 ////}
    //                 //顯示1,6,12,18
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 1);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    //         StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
    //     default:
    //         //預設資料區間和3日以上(3d, 5d, 10d)相同
    //         StockChart[100].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 //顯示4,8,12,16,20,00
    //                 //step: null
    //                 ////,
    //                 ////formatter: function () {
    //                 ////    var label = this.axis.defaultLabelFormatter.call(this);

    //                 ////    if (label.substr(label.length - 2, 2) == "01")
    //                 ////        return label;
    //                 ////    else if(/*label.substr(label.length - 2, 2) == "06" || */label.substr(label.length - 2, 2) == "12"/* || label.substr(label.length - 2, 2) == "18"*/)
    //                 ////        return label.substr(label.length - 2, 2);
    //                 ////    else
    //                 ////        return "";

    //                 ////}
    //                 //顯示1,6,12,18
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 1);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    //         StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    // }

    switch (range) {
        case "1d":
        case "2d":
        case "3d":
        case "4d":
            StockChart[100].xAxis[0].update({
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
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "5d":
        case "6d":
        case "7d":
        case "8d":
        case "9d":
        case "10d":
        case "11d":
            StockChart[100].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);
                        return label;
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }
}
// 石門即時統計 - 雨量
function getRainDataAnalysisDay(msg) {
    // var rainY = msg["getRainDataAnalysisAllRangeByHours"];
    var rainHourY = msg["getRainDataAnalysisAllRangeByHoursNew"];   // 當日的每個小時
    var rainMinuteY = msg["getRainDataAnalysisAllRangeByMinute"];   // 該小時的 10分鐘
    // console.log('石門即時統計 - 小時',rainHourY);
    // console.log('石門即時統計 - 10分鐘',rainMinuteY);

    var rainTotalY = 0;

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowHour;
    var ShowMinute;

    var range = $('.zoom_controls.zoom_controls_day a[class^=active]').attr('data-range');
    var daysToMinus = 1;
    var totalHours = 24;
    switch (range) {
        case "1d":
            totalHours = 24;
            daysToMinus = 0;
            break;
        case "2d":
            totalHours = 48;
            daysToMinus = 1;
            break;
        case "3d":
            totalHours = 72;
            daysToMinus = 2;
            break;
        case "5d":
            totalHours = 120;
            daysToMinus = 4;
            break;
        case "10d":
            totalHours = 240;
            daysToMinus = 9;
            break;
        default:
            break;
    }

    var date = new Date();

    // let isCustomQuery = false;
    // const shihHourDateDiff = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
    var renderToId = "picG";
    if ($("#pageEighth").css("display") != "none") {
        renderToId = "stationShihRainCustom";
        var d = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
        totalHours = (d + 1) * 24;
        daysToMinus = d;
        range = (d + 1) + "d";
        date = new Date(yyy2yyyy($('#eShihCustomDateText').val()));
        // 使用天數查詢，一次顯示全部資料
        // isCustomQuery = true;
    }

    ////一次撈10天的資料
    //var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 9, 1);
    //var totalHours = 240;
    //一次撈10天的資料
    var sDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);

    // 取當天小時十分鐘的 "最後一筆" - "第一筆" 的雨量 (20210419 nicholastuan)
    // debugger;
    var minTotal = 0;
    var dateMinHour = null;
    if (msg["getRainDataAnalysisAllRangeByMinute"].length > 0) {
        dateMinHour = parseInt(msg["getRainDataAnalysisAllRangeByMinute"][0].Indate.substring(11,13));
    }
   
    if (dateMinHour == 0) { // 如果是00點，重新累計
        if (rainMinuteY.length > 1) { //大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
            var lastIndex = rainMinuteY.length - 1;
            minTotal = parseFloat( (rainMinuteY[lastIndex].total - 0) ) / 10;
            ShowHour = rainMinuteY[lastIndex].Indate.substring(11,13);
            ShowMinute = rainMinuteY[lastIndex].Indate.substring(14,16);
        }
    }
    else
    {
        if (rainMinuteY.length > 1) { //大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
            var lastIndex = rainMinuteY.length - 1;
            minTotal = parseFloat( (rainMinuteY[lastIndex].total - rainMinuteY[0].total) ) / 10;
            ShowHour = rainMinuteY[lastIndex].Indate.substring(11,13);
            ShowMinute = rainMinuteY[lastIndex].Indate.substring(14,16);
        }
    }
    // if (rainMinuteY.length > 1) { //大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
    //     var lastIndex = rainMinuteY.length - 1;
    //     minTotal = parseFloat( (rainMinuteY[lastIndex].total - rainMinuteY[0].total) ) / 10;
    // }
    // for (var i = 0; i < rainMinuteY.length; i++) {
    //     minTotal = parseFloat(rainMinuteY[i].total) / 10;
    // }
    if (rainMinuteY.length > 1) { // nextHour
        var utcBlock = (Date.UTC(rainMinuteY[0].Indate.substring(0, 4), parseInt(rainMinuteY[0].Indate.substring(5, 7)) - 1, rainMinuteY[0].Indate.substring(8, 10), parseInt(rainMinuteY[0].Indate.substring(11, 13))+1));
    }


    for (var t = 0; t < totalHours; t++) {
        timeblockYPV.push([Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours() + t) , null]);
    }
    // 小時 + 10分  (20210419 nicholastuan) 
    //撈回來的小時有+1，每日顯示時間為1~23時
    // for (var i = 0; i < rainHourY.length; i++) {
    //     var t1 = timeblockYPV[i][0];
    //     var r1 = (Date.UTC(rainHourY[i].indate.substring(0, 4), parseInt(rainHourY[i].indate.substring(5, 7)) - 1, rainHourY[i].indate.substring(8, 10), parseInt(rainHourY[i].indate.substring(11, 13))));

    //     if (timeblockYPV[i][0] == (Date.UTC(rainHourY[i].indate.substring(0, 4), parseInt(rainHourY[i].indate.substring(5, 7)) - 1, rainHourY[i].indate.substring(8, 10), parseInt(rainHourY[i].indate.substring(11, 13))))) {
        
    //     timeblockYPV[i][1] = parseFloat(rainHourY[i].total / 10);
    //         rainTotalY += parseFloat(rainHourY[i].total / 10);
    //     }


    //     // if(timeblockYPV[i][0] == utcBlock){ 
    //     //     debugger;
    //     //     // var v = timeblockYPV[i][1] + minTotal
    //     //     // timeblockYPV[i][1] = parseFloat( v.toPrecision(12) ); // 顯示
    //     //     // rainTotalY += minTotal;

    //     //     
    //     //     timeblockYPV[i+1][1] = parseFloat(minTotal.toPrecision(12));
    //     //     var v = rainTotalY + parseFloat(minTotal.toPrecision(12));
    //     //     rainTotalY = parseFloat( v.toPrecision(12) );
    //     // }


    // }

    // update 若小時資料有少，對應各個小時填上
    for (let i = 0; i < timeblockYPV.length; i++) {

        for (let k = 0; k < rainHourY.length; k++) {
            if (timeblockYPV[i][0] == (Date.UTC(rainHourY[k].indate.substring(0, 4), parseInt(rainHourY[k].indate.substring(5, 7)) - 1, rainHourY[k].indate.substring(8, 10), parseInt(rainHourY[k].indate.substring(11, 13))))) {
                timeblockYPV[i][1] = parseFloat(rainHourY[k].total / 10);
                rainTotalY += parseFloat(rainHourY[k].total / 10);
            }
        }
        
    }
    // 將10分鐘雨量加在下個小時
    for (let i = 0; i < timeblockYPV.length; i++) {
        if (timeblockYPV[i][0] == utcBlock) {
            minTotal = minTotal < 0 ? 0 : minTotal;
            timeblockYPV[i][1] = parseFloat(minTotal.toPrecision(12));
            // debugger;
            var v = rainTotalY + parseFloat(minTotal.toPrecision(12));
            rainTotalY = parseFloat( v.toPrecision(12) );
        }
        
    }
    
    rainTotalY = Math.round( parseFloat( rainTotalY.toPrecision(12) ) * 10) / 10 ; // 四捨五入
    // rainTotalY = rainTotalY; // 累加
    $("span[class='totalAll']").html(rainTotalY.toFixed(1));
    

    StockChart[100] = Highcharts.StockChart({
        chart: {
            renderTo: renderToId,
            alignTicks: false
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
            //minRange: 8 * 3600 * 1000,
            gridLineWidth: 1,
            tickInterval: 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d %H',
            },
            labels: {
                format: '{value:%m/%d %H}',
                step: 1,
                rotation: -45
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
            {
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
                    headerFormat: '{point.x:%H:00}/',
                    valueSuffix: '',
                    // pointFormatter: function () {
                    //     return this.options.y.toFixed(1);
                    // }
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            if ($("#pageEighth").css("display") != "none")
                                triggerOtherChart("stationShihRainCustom_hour", this.x);//查詢: 小時
                            else
                                triggerOtherChart(renderToId, this.options.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            if ($("#pageEighth").css("display") != "none")
                                triggerOtherChart("stationShihRainCustom_hour", this.x);//查詢: 小時
                            else
                                triggerOtherChart(renderToId, this.options.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }

            }]
        ,tooltip: {
            formatter: function(){
                if (this.x == utcBlock) { // if click nexthour
                    return ShowHour + ":" + ShowMinute + "<br/>" +'<span style="color:#95ceff">●</span> : ' + "<b>" + this.points[0].y + "</b>";
                }
                // 資料顯示
                if (this.points[0].y !== null) {//if null not show tooltip.
                    var hour = new Date(this.x).toGMTString().substring(17,19);
                    return hour + ':00' + "<br/>" +'<span style="color:#95ceff">●</span> : ' + "<b>" + this.points[0].y + "</b>";
                }
            }
        }
    });

    ////zoom to first 8 hours data
    //if (rainY.length > 8)
    //    StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[7][0]);
    // switch (range) {
    //     case "1d":
    //     case "2d":
    //         StockChart[100].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    //         StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    //     case "3d":
    //     case "5d":
    //     case "10d":
    //         StockChart[100].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 //顯示4,8,12,16,20,00
    //                 //step: null
    //                 ////,
    //                 ////formatter: function () {
    //                 ////    var label = this.axis.defaultLabelFormatter.call(this);
                        
    //                 ////    if (label.substr(label.length - 2, 2) == "01")
    //                 ////        return label;
    //                 ////    else if(/*label.substr(label.length - 2, 2) == "06" || */label.substr(label.length - 2, 2) == "12"/* || label.substr(label.length - 2, 2) == "18"*/)
    //                 ////        return label.substr(label.length - 2, 2);
    //                 ////    else
    //                 ////        return "";

    //                 ////}
    //                 //顯示1,6,12,18
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 1);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    //         StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
    //     default:
    //         //預設資料區間和3日以上(3d, 5d, 10d)相同
    //         StockChart[100].xAxis[0].update({
    //             tickInterval: 3600 * 1000,
    //             labels: {
    //                 //顯示4,8,12,16,20,00
    //                 //step: null
    //                 ////,
    //                 ////formatter: function () {
    //                 ////    var label = this.axis.defaultLabelFormatter.call(this);

    //                 ////    if (label.substr(label.length - 2, 2) == "01")
    //                 ////        return label;
    //                 ////    else if(/*label.substr(label.length - 2, 2) == "06" || */label.substr(label.length - 2, 2) == "12"/* || label.substr(label.length - 2, 2) == "18"*/)
    //                 ////        return label.substr(label.length - 2, 2);
    //                 ////    else
    //                 ////        return "";

    //                 ////}
    //                 //顯示1,6,12,18
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "06" || label.substr(label.length - 2, 2) == "12" || label.substr(label.length - 2, 2) == "18")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //         var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 2, 1);
    //         var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
    //         StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
    //         break;
    // }

    switch (range) {
        case "1d":
        case "2d":
        case "3d":
        case "4d":
            StockChart[100].xAxis[0].update({
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
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
            break;
        case "5d":
        case "6d":
        case "7d":
        case "8d":
        case "9d":
        case "10d":
        case "11d":
            StockChart[100].xAxis[0].update({
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    step: 1,
                    formatter: function () {
                        var label = this.axis.defaultLabelFormatter.call(this);
                        return label;
                    }
                }
            });
            var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus, 1);
            var chartMax = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0);
            StockChart[100].xAxis[0].setExtremes(chartMin, chartMax);
            break;
    }
    // if (isCustomQuery) {
    //     const start = null;
    //     const end = null;
    //     StockChart[100].xAxis[0].setExtremes(start, end);
    //     if (shihHourDateDiff > 3) {
    //         StockChart[100].xAxis[0].update({
    //             labels: {
    //                 //顯示1,12
    //                 step: 1,
    //                 formatter: function () {
    //                     var label = this.axis.defaultLabelFormatter.call(this);

    //                     if (label.substr(label.length - 2, 2) == "01")
    //                         return label;
    //                     else if (label.substr(label.length - 2, 2) == "12")
    //                         return label.substr(label.length - 2, 2);
    //                     else
    //                         return "";
    //                 }
    //             }
    //         });
    //     }
    // }
}
// 石門區間統計 - 石門雨量
function getShihmenHistory(msg) {
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var dataY = msg["getShihmenHistory"];
    var dataHour = msg["getShihmenHistoryHour"]; // 小時
    var dataMinute = msg["getShihmenHistoryMinute"]; // 分
    // console.log('石門區間統計 - 天',dataY);
    // console.log('石門區間統計 - 小時',dataHour);
    // console.log('石門區間統計 - 10分鐘',dataMinute);
    var rainTotalY = 0;
    var flowInTotalY = 0;
    var flowOutTotalY = 0;

    timeblockShihYPV = [];
    var timeblockYStage = [];//水位
    var timeblockYContain = [];//蓄水量

    //水位統計圖10日內上下限依最大最小值來調整
    // 水位
    var maxShihmenRealtimeStage = 0;
    var minShihmenRealtimeStage = 9999;
     // 蓄水量
    var maxShihmenRealtimeStage_Contain = 0;
    var minShihmenRealtimeStage_Contain = 9999;
    
    timeblockYInFlow = [];
    timeblockYOutFlow = [];

    // 累加 hour & minnute
    var houtTotal = 0;
    var minuteTotal = 0;
    for (let t = 1; t < dataHour.length; t++) { // hour (1~23 , 第一筆是0點所所以不用加)
        houtTotal += parseFloat(dataHour[t].total);
    }
   
    // 10 min
    // for (let t = 0; t < dataMinute.length; t++) { // 取最後一筆
    //     minuteTotal = parseFloat(dataMinute[t].total);
    // }
    //  debugger;
    var dateMinHour = null;
    if (dataMinute.length > 0) {
        dateMinHour = parseInt(dataMinute[0].indate.substring(11,13));
    }
    if (dateMinHour == 0) { // 如果是00點，重新累計
        if (dataMinute.length > 1) { // 大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
            var lastIndex = dataMinute.length - 1;
            minuteTotal = parseFloat(dataMinute[lastIndex].total - 0);
        }
    }
    else{
        if (dataMinute.length > 1) { // 大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
            var lastIndex = dataMinute.length - 1;
            minuteTotal = parseFloat(dataMinute[lastIndex].total - dataMinute[0].total);
        }
    }
    SMhourAddminute = houtTotal + minuteTotal; // 當天小時 + 10分鐘

    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val=null;
            for (var y = 0; y < dataY.length; y++) {
                if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                    val = dataY[y];
                    break;
                }
            }
            var valRain = null;
            var valStage = null;
            var valContain = null;//蓄水量
            var valInFlow = null;
            var valOutFlow = null;

            if (val != null) {
                valRain = val.SM_RAIN;
                valStage = val.SM_LEVEL;
                valContain = parseFloat(parseFloat(val.SM_CAPACITY / 100).toFixed(2));//蓄水量
                valInFlow = val.SM_INPUT;
                valOutFlow = val.SMGET_layerDIV2 + val.SMGET_layerCSIST + val.SMGET_layerCPC + val.SMGET_layerSMIA + val.SMGET_layerTYIA + val.SMGET_szDIV2 + val.SMGET_szCSIST + val.SMGET_szSMIA + val.SM_POWER + val.SM_PRO + val.SM_OTHER;

                valInFlow = parseFloat(valInFlow.toFixed(2));
                valOutFlow = parseFloat(valOutFlow.toFixed(2));

                //只加總現在這個月
                if (m == currentMonth && valRain != null) {
                    rainTotalY += val.SM_RAIN;
                }
            }

            timeblockShihYPV.push([utc, valRain]); // here
            timeblockYStage.push([utc, valStage]);
            timeblockYContain.push([utc, valContain]);//蓄水量
            timeblockYInFlow.push([utc, valInFlow]);
            timeblockYOutFlow.push([utc, valOutFlow]);
                  
        }
        if (m == currentMonth &&  y == dataY.length) {     // 累加當天
            // var todaySMRain = timeblockShihYPV[y][1];
            var val = Math.round( parseFloat(   ((SMhourAddminute / 10).toPrecision(12) ) ) * 10 ) / 10
            timeblockShihYPV[y][1] += val ; // +300
        }
    }
    //$("#stationRainShihVal").html(rainTotalY.toFixed(1));
    var ny = new Date().getFullYear();
    var nm = new Date().getMonth();
    chartMin = Date.UTC(ny, nm, 1);
    chartMax = Date.UTC(ny, nm + 1, 0);
    reCountShihRain(chartMin, chartMax);

    // 上下限調整
    for (let c = 0; c < timeblockYContain.length; c++) {
        //水位
        if (timeblockYStage[c][1] != null && timeblockYStage[c][1] < minShihmenRealtimeStage)
        minShihmenRealtimeStage = timeblockYStage[c][1];
        if (timeblockYStage[c][1] != null && timeblockYStage[c][1] > maxShihmenRealtimeStage)
        maxShihmenRealtimeStage = timeblockYStage[c][1];
        // 蓄水量
        if (timeblockYContain[c][1] != null && timeblockYContain[c][1] < minShihmenRealtimeStage_Contain)
        minShihmenRealtimeStage_Contain = timeblockYContain[c][1];
        if (timeblockYContain[c][1] != null && timeblockYContain[c][1] > maxShihmenRealtimeStage_Contain)
        maxShihmenRealtimeStage_Contain = timeblockYContain[c][1];
    }
    minShihmenRealtimeStage = Math.round(minShihmenRealtimeStage) ;
    maxShihmenRealtimeStage = Math.round(maxShihmenRealtimeStage) ;
    minShihmenRealtimeStage_Contain = Math.round(minShihmenRealtimeStage_Contain) -5;
    maxShihmenRealtimeStage_Contain = Math.round(maxShihmenRealtimeStage_Contain) +5;
    var tickPoint = [0,0,0,0,0,0,0,0,0,0,0,0];//水位
    var tickPoint_Contain = [0,0,0,0,0,0,0,0,0,0,0,0];//蓄水量
    var tick = 1; //水位
    var tick_Contain = 1; //蓄水量
    if (parseFloat(((maxShihmenRealtimeStage - minShihmenRealtimeStage) / 11).toFixed(0)) > 1) {
        tick = parseFloat(((maxShihmenRealtimeStage - minShihmenRealtimeStage) / 11).toFixed(0));
    }
    if (parseFloat(((maxShihmenRealtimeStage_Contain - minShihmenRealtimeStage_Contain) / 11).toFixed(0)) > 1) {
        tick_Contain = parseFloat(((maxShihmenRealtimeStage_Contain - minShihmenRealtimeStage_Contain) / 11).toFixed(0));
    }
    for (let c = 0; c < tickPoint_Contain.length; c++) {
        if (c == 0) {
            tickPoint[c] = minShihmenRealtimeStage;
            tickPoint_Contain[c] = minShihmenRealtimeStage_Contain;
           }
           else{
            tickPoint[c] = minShihmenRealtimeStage + (tick * c);
            tickPoint_Contain[c] = minShihmenRealtimeStage_Contain + (tick_Contain * c);
           }
        
    }
    //入出流量顯示最新一筆的值
    //var latestData = dataY[dataY.length - 1];
    //var latestInFlow = latestData.SM_INPUT;
    //var latestOutFlow = latestData.SMGET_layerDIV2 + latestData.SMGET_layerCSIST + latestData.SMGET_layerCPC + latestData.SMGET_layerSMIA + latestData.SMGET_layerTYIA + latestData.SMGET_szDIV2 + latestData.SMGET_szCSIST + latestData.SMGET_szSMIA;
    //$("#stationShihFlowIN").html(latestInFlow.toFixed(2));
    //$("#stationShihFlowOUT").html(latestOutFlow.toFixed(2));

    StockChart[zIndex][101] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihRain',
            marginRight: 15,
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
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationShihRain", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationShihRain", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
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
            {
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
                data: timeblockShihYPV,
                // tooltip: {
                //     headerFormat: '{point.x:%Y/%m/%d}<br/>',
                //     valueSuffix: ''
                // }

            }/*,
        {
            name: '水位',
            type: 'spline',
            data: timeblockYWV,
            tooltip: {
                valueSuffix: ' m'
            }
        }*/]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() + " " + "<br/>" +'<span style="color:#95ceff">●</span> : ' + "<b>" + this.points[0].y + "</b>";

            }
        }
    });

    xIndex = 101;
    StockChart[zIndex][101]['zoom1m']();
    //#region old version
    // 水位 + 蓄水量
    // StockChart[zIndex][102] = Highcharts.StockChart({
    //     chart: {
    //         renderTo: 'stationShihStage',
    //         marginRight: 15,
    //         // alignTicks: false
    //         alignTicks: true
    //     },

    //     rangeSelector: {
    //         selected: 0,
    //         enabled: false,
    //         inputEnabled: false,
    //         buttons: [{
    //             type: 'month',
    //             count: 1,
    //             text: '1月'
    //         }, {
    //             type: 'month',
    //             count: 3,
    //             text: '3月'
    //         }, {
    //             type: 'month',
    //             count: 6,
    //             text: '6月'
    //         }, {
    //             type: 'ytd',
    //             text: '至本日'
    //         }, {
    //             type: 'all',
    //             text: '全年'
    //         }]
    //     },

    //     title: {
    //         text: ''
    //     },
    //     xAxis: {
    //         gridLineWidth: 1,
    //         tickInterval: 28 * 24 * 3600 * 1000,
    //         type: 'datetime',
    //         dateTimeLabelFormats: {
    //             day: '%m/%d',
    //         },
    //         labels: {
    //             format: '{value:%m/%d}',
    //             step: null
    //         },
    //         events: {
    //             setExtremes: function (e) {
    //                 console.log(this);
    //                 if (typeof (e.rangeSelectorButton) !== 'undefined') {
    //                     //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
    //                 }
    //             }
    //         }
    //     },
    //     // yAxis:
    //     //     [
    //     //         { // Primary yAxis
    //     //             min: 195,
    //     //             max: 250,
    //     //             tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
    //     //             opposite: false,
    //     //             labels: {
    //     //                 format: '{value}',
    //     //                 style: {
    //     //                     color: Highcharts.getOptions().colors[1]
    //     //                 }
    //     //             },
    //     //             title: {
    //     //                 text: '',
    //     //                 style: {
    //     //                     color: Highcharts.getOptions().colors[1]
    //     //                 }
    //     //             }
    //     //         }],
    //     yAxis: [{
    //         // tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
    //         tickPositions: tickPoint_Contain,
    //         showLastLabel: true,
    //         opposite: false,
    //         title: {
    //             text: ''
    //         }
    //     }, {
    //         // tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
    //         tickPositions: tickPoint_Contain,
    //         showLastLabel: true,
    //         // tickInterval: 1,
    //         opposite: true,
    //         title: {
    //             text: ''
    //         }
    //     }],

    //     navigator: {
    //         enabled: false
    //     },

    //     // plotOptions: {
    //     //     line: {
    //     //         dataLabels: {
    //     //             enabled: true
    //     //         }
    //     //     }
    //     // },

    //     // series: [{
    //     //     name: ' ',
    //     //     type: 'spline',
    //     //     color: '#4169BC',
    //     //     data: timeblockYStage,
    //     //     tooltip: {
    //     //         headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //     //         valueSuffix: ''
    //     //     }
    //     // }]
    //     series: [{
    //         name: ' ',
    //         type: 'spline',
    //         color: '#3399FF',
    //         data: timeblockYStage,
    //         yAxis: 0,
    //         tooltip: {
    //             // headerFormat: '{point.x:%m/%d %H:%M} <br/>',
    //             valueSuffix: '',
    //             shared: true,
    //         }
    //     },{
    //         name: ' ',
    //         type: 'spline',
    //         color: '#FF9900',
    //         data: timeblockYContain,
    //         yAxis: 1,
    //         tooltip: {
    //             // headerFormat: '{point.x:%m/%d %H:%M} <br/>',
    //             valueSuffix: '',
    //             shared: true,
    //         }
    //     }]
    //     // ,tooltip: {
    //     //     shared: true,
    //     //     headerFormat: '{point.x:%m/%d %H:%M} <br/>',
    //     //     formatter: function () {
    //     //         // 最新的10分鐘資料顯示
    //     //     //    if (this.x == utcHour_Next) {
    //     //     //        return  date.getMonth() + "/" + date.getDate() + " " + ShowHour + ':' + ShowMinute + "<br/>" +'<span style="color:#3399FF">●</span> : ' + this.points[0].y.toFixed(2) + "<br/>" +'<span style="color:#FF9900">●</span> : ' + + this.points[1].y.toFixed(2) + "<br/>";
    //     //     //    }
    //     //     //    else
    //     //     //    {   
    //     //     //        var hour = new Date(this.x).toGMTString().substring(17,19);
    //     //     //        var Point_date = new Date(this.x);
    //     //     //        return Point_date.getUTCMonth()+1 + "/" +  Point_date.getUTCDate() + " " + hour + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + this.points[0].y.toFixed(2) + "<br/>" +'<span style="color:#FF9900">●</span> : '  + this.points[1].y.toFixed(2) + "<br/>";
    //     //     //     //    return date.getMonth() + "/" + date.getDate() + " " + hour + ':00' + "<br/>" +'<span style="color:#4169BC">●</span> : ' + this.points[0].y.toFixed(2) + "<br/>" +'<span style="color:#FF9900">●</span> : '  + this.points[1].y.toFixed(2) + "<br/>";

    //     //     //    }
    //     //    }
    //     // }
    // });

    // xIndex = 102;
    // StockChart[zIndex][102]['zoom1m']();
    //#endregion
    //test-----------------------------------------------------
    StockChart[zIndex][102] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihStage',
            alignTicks: true,
            marginTop: 15
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
            tickInterval:  28 * 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                // format: '{value:%m/%d %H}',
                format: '{value:%m/%d}',
                step: null,
                // rotation: -45
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
        yAxis: [{
            // tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250],
            // tickPositions: [0, 500],
            tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
            // tickPositions: tickPoint,
            tickAmount: 12,
            allowDecimals: false,
            showLastLabel: true,
            // tickInterval: 1,
            // className: '',
            opposite: false,
            title: {
                text: ''
            }
        }, {
            // className: '',
            // tickPositions: [130, 140, 150, 160, 170, 180],
            // tickPositions: [0, 500],
            // tickPositions: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
            tickAmount: 12,
            allowDecimals: false,
            max:220,
            min:0,
            // tickPositions: tickPoint_Contain,
            showLastLabel: true,
            opposite: true,
            title: {
                text: ''
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationShihStage", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationShihStage", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYStage,
            yAxis: 0,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYContain,
            yAxis: 1,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });

    xIndex = 102;
    StockChart[zIndex][102]['zoom1m']();
    //test-----------------------------------------------------

    //
    StockChart[zIndex][103] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihFlow',
            marginRight: 15,
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    tickAmount: 6,
                    minTickInterval: 1,
                    allowDecimals: false,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationShihFlow", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationShihFlow", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYInFlow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYOutFlow,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }
    });

    xIndex = 103;
    StockChart[zIndex][103]['zoom1m']();

}
// 石門區間統計 - 石門雨量 (選擇日期)
function getShihmenHistoryCustom(msg) {
    var date = new Date();
    //var currentYear = date.getFullYear();
    //var currentMonth = date.getMonth() + 1;
    var dataY = msg["getShihmenHistory"];
    // var dataY = msg["getShihmenHistory_error"];
    var dataHour = msg["getShihmenHistoryHour"]; // 小時
    var dataMinute = msg["getShihmenHistoryMinute"]; // 分
    // console.log('石門區間統計(自訂) - 天',dataY);
    // console.log('石門區間統計(自訂) - 小時',dataHour);
    // console.log('石門區間統計(自訂) - 10分鐘',dataMinute);
    var rainTotalY = 0;
    var inFlowTotalY = 0;
    var outFlowTotalY = 0;
    var hourTotal = 0;
    var minuteTotal = 0;
    var hourAddMinute = 0;

    var timeblockShihYPVCustom = [];
    var timeblockYStageCustom = [];//水位
    var timeblockYContainCustom = [];//蓄水量
    var timeblockYInFlowCustom = [];
    var timeblockYOutFlowCustom = [];
    var nDate = new Date(); // nicholastuan
    var sDate = new Date(searchSShihDate);
    var eDate = new Date(searchEShihDate);

    // 取得現在的 年月日 
    var nYYYY = nDate.getFullYear(); 
    var nMM = nDate.getMonth() + 1 ;
    var nDD = nDate.getDate();
    var utcToday = Date.UTC(nDate.getFullYear(), nDate.getMonth(), nDate.getDate());

    var sYYYY = sDate.getFullYear();
    var sMM = sDate.getMonth() + 1;
    var sDD = sDate.getDate();
    var eYYYY = eDate.getFullYear();
    var eMM = eDate.getMonth() + 1;
    var eDD = eDate.getDate();
    var utcEndday =  Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate());

    // 累加當天小時
    for (let i = 0; i < dataHour.length; i++) {
        if ( Date.UTC(parseInt(dataHour[i].indate.substring(0,4)), parseInt(dataHour[i].indate.substring(5,7)) - 1, parseInt(dataHour[i].indate.substring(8,10)), dataHour[i].indate.substring(11,13))  >= Date.UTC(nYYYY, nMM-1, nDD, 1) ) {          
            hourTotal += parseFloat(dataHour[i].total);   
        }
    }
    // debugger;
    if (dataMinute.length > 1) { // 大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
        var lastIndex = dataMinute.length - 1;
        minuteTotal = parseFloat(dataMinute[lastIndex].total - dataMinute[0].total);
    }
    
    // for (let i = 0; i < dataMinute.length; i++) { // *取最後一筆的當小時十分鐘
    //     minuteTotal = parseFloat(dataMinute[i].total);   
    // }
    hourAddMinute = hourTotal + minuteTotal; // 當天的小時+10分

    for (var yyyy = sYYYY; yyyy <= eYYYY; yyyy++) {
            
        for (var m = 1; m <= 12; m++) {
            if (m == 1 && yyyy == sYYYY) {
                m = sMM;
            }
            var days = daysInMonth(m, yyyy);
            for (var i = 1; i <= days; i++) {
                if (i == 1 && yyyy == sYYYY && m == sMM) {
                    i = sDD;
                }
                var utc = Date.UTC(yyyy, m - 1, i);
                var val = null;
                for (var y = 0; y < dataY.length; y++) {
                    if (Date.UTC(dataY[y].date.substring(0, 4), parseInt(dataY[y].date.substring(5, 7)) - 1, dataY[y].date.substring(8, 10)) == utc) {
                        val = dataY[y];
                        break;
                    }
                }
                var valRain = null;
                var valStage = null;//水位
                var valContain = null;//蓄水量
                var valInFlow = null;
                var valOutFlow = null;

                if (val != null) {
                    valRain = val.SM_RAIN;
                    valStage = val.SM_LEVEL;//水位
                    valContain = parseFloat(parseFloat(val.SM_CAPACITY / 100).toFixed(2));//蓄水量
                    valInFlow = val.SM_INPUT;
                    valOutFlow = val.SMGET_layerDIV2 + val.SMGET_layerCSIST + val.SMGET_layerCPC + val.SMGET_layerSMIA + val.SMGET_layerTYIA + val.SMGET_szDIV2 + val.SMGET_szCSIST + val.SMGET_szSMIA + val.SM_POWER + val.SM_PRO + val.SM_OTHER;

                    valInFlow = valInFlow != null ? parseFloat(valInFlow.toFixed(2)) : null;
                    valOutFlow = valOutFlow != null ? parseFloat(valOutFlow.toFixed(2)) : null;

                    rainTotalY += val.SM_RAIN;
                    inFlowTotalY += valInFlow;
                    outFlowTotalY += valOutFlow;
                }

                timeblockShihYPVCustom.push([utc, valRain]);
                timeblockYStageCustom.push([utc, valStage]);//水位
                timeblockYContainCustom.push([utc, valContain]);//蓄水量
                timeblockYInFlowCustom.push([utc, valInFlow]);
                timeblockYOutFlowCustom.push([utc, valOutFlow]);

                

                if (yyyy == eYYYY && m == eMM && i == eDD) {
                    m = 12;
                    break;
                }
            }
            
            // if (nYYYY == eYYYY && nMM == eMM && nDD == eDD) { // 判斷今日 = 結束日期
            //     console.log('today!');
            //     timeblockShihYPVCustom[dataY.length-1][1] += hourAddMinute; // 如果結束日期是今天，累加小時以及十分鐘上去
            //     rainTotalY += hourAddMinute;
            // }
        }
        // if (utcEndday >= utcToday) { // 判斷 結束日期 >= 今日
        //         var val = Math.round(parseFloat( (hourAddMinute / 10).toPrecision(12) ) *10 ) /10;
        //         // timeblockShihYPVCustom[dataY.length][1] += val ; // 如果結束日期是今天，累加小時以及十分鐘上去
        //         timeblockShihYPVCustom[timeblockShihYPVCustom.length-1][1] += val ; // 修正，如果跨年度會失敗(ex: 2021/12/01~2022/01/31)
        //         rainTotalY += val ;
        // }
        
    }

    if (utcEndday >= utcToday) { // 判斷 結束日期 >= 今日
        // 修正，如果跨年度會失敗(ex: 2021/12/01~2022/01/31)
        var val = Math.round(parseFloat( (hourAddMinute / 10).toPrecision(12) ) *10 ) /10;
        timeblockShihYPVCustom[dataY.length][1] += val ;
        rainTotalY += val;
    }
    
    $("#stationRainShihVal").html(commafy(rainTotalY.toFixed(1)));
    $("#stationShihFlowIN").html(commafy(inFlowTotalY.toFixed(1)));
    $("#stationShihFlowOUT").html(commafy(outFlowTotalY.toFixed(1)));

    //var latestData = dataY[dataY.length - 1];
    //var latestInFlow = latestData.SM_INPUT;
    //var latestOutFlow = latestData.SMGET_layerDIV2 + latestData.SMGET_layerCSIST + latestData.SMGET_layerCPC + latestData.SMGET_layerSMIA + latestData.SMGET_layerTYIA + latestData.SMGET_szDIV2 + latestData.SMGET_szCSIST + latestData.SMGET_szSMIA;
    //$("#stationShihFlowIN").html(latestInFlow.toFixed(2) + " cms");
    //$("#stationShihFlowOUT").html(latestOutFlow.toFixed(2) + " cms");

    
    // //顯示區間最新一筆的月份+前2個月，共3個月
    // var chartMin = Date.UTC(eYYYY, eMM - 2, 1);
    // var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);

    // //標籤是否顯示月份每月第一日
    // var isShowMonthLabel = false;
    // //若今天是2021-01-01，顯示資料區間為去年2020-01-01~2020-12-31，則顯示範圍為一整年
    // if (sYYYY == date.getFullYear() - 1 && sMM == 1 && sDD == 1 && eYYYY == date.getFullYear() - 1 && eMM == 12 && eDD == 31) {
    //     isShowMonthLabel = true;
    //     var chartMin = Date.UTC(sYYYY, 0, 1);
    //     var chartMax = Date.UTC(eYYYY, 11, 31);
    // }
    // else if (((sYYYY == date.getFullYear() - 1 && sMM == 11 && sDD == 1) || (sYYYY == date.getFullYear() - 1 && sMM == 12 && sDD == 1)) && (eYYYY == date.getFullYear() && eMM == 1 && eDD == 31)) {
    //     //若為2020-11-01~2021-01-31或是2020-12-01~2021-01-31
    //     if (sMM == 11) {
    //         //若為2020-11-01~2021-01-31，為三個月區間，標籤顯示月每月第一日
    //         isShowMonthLabel = true;
    //     }
    //     var chartMin = Date.UTC(sYYYY, sMM - 1, sDD);
    //     var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);
    // }
    // else if ((sYYYY == date.getFullYear() - 1 && sMM == 12 && sDD == 1) && (eYYYY == date.getFullYear() && eMM == 2 && (eDD == 28 || eDD == 29))) {
    //     //若為2020-12-01~2021-02-28或是29，為三個月區間，標籤顯示月份每月第一日
    //     isShowMonthLabel = true;
    //     var chartMin = Date.UTC(sYYYY, sMM - 1, sDD);
    //     var chartMax = Date.UTC(eYYYY, eMM - 1, eDD);
    // }


    StockChart[zIndex][104] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihRainCustom',
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
                },
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationShihRainCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationShihRainCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
            }
        },
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10,

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
            {
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
                data: timeblockShihYPVCustom,
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
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() +  "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";

            }
        }

    });
    //#region old
// 水位 + 蓄水量
    // StockChart[zIndex][105] = Highcharts.StockChart({
    //     chart: {
    //         renderTo: 'stationShihStageCustom',
    //         marginRight: 15,
    //         alignTicks: false
    //     },

    //     rangeSelector: {
    //         selected: 0,
    //         enabled: false,
    //         inputEnabled: false,
    //         buttons: [{
    //             type: 'month',
    //             count: 1,
    //             text: '1月'
    //         }, {
    //             type: 'month',
    //             count: 3,
    //             text: '3月'
    //         }, {
    //             type: 'month',
    //             count: 6,
    //             text: '6月'
    //         }, {
    //             type: 'ytd',
    //             text: '至本日'
    //         }, {
    //             type: 'all',
    //             text: '全年'
    //         }]
    //     },

    //     title: {
    //         text: ''
    //     },
    //     xAxis: {
    //         gridLineWidth: 1,
    //         tickInterval: 24 * 3600 * 1000,
    //         type: 'datetime',
    //         dateTimeLabelFormats: {
    //             day: '%m/%d',
    //         },
            // labels: {
            //     //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
            //     //format: '{value:%m/%d}',
            //     //step: 10

            //     //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
            //     step: 1,
            //     formatter: function () {
            //         var label = this.axis.defaultLabelFormatter.call(this);
                    
            //         if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
            //             return label;
            //         else
            //             return "";
            //     }
            // },
    //         events: {
    //             setExtremes: function (e) {
    //                 console.log(this);
    //                 if (typeof (e.rangeSelectorButton) !== 'undefined') {
    //                     //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
    //                 }
    //             }
    //         }
    //     },
    //     yAxis:
    //         [
    //             { // Primary yAxis
    //                 min: 210,
    //                 max: 250,
    //                 tickPositions: [210, 215, 220, 225, 230, 235, 240, 245, 250, 255],
    //                 opposite: false,
    //                 labels: {
    //                     format: '{value}',
    //                     style: {
    //                         color: Highcharts.getOptions().colors[1]
    //                     }
    //                 },
    //                 title: {
    //                     text: '',
    //                     style: {
    //                         color: Highcharts.getOptions().colors[1]
    //                     }
    //                 }
    //             }],

    //     navigator: {
    //         enabled: false
    //     },

    //     plotOptions: {
    //         line: {
    //             dataLabels: {
    //                 enabled: true
    //             }
    //         }
    //     },

    //     series: [{
    //         name: ' ',
    //         type: 'spline',
    //         color: '#4169BC',
    //         data: timeblockYStageCustom,
    //         tooltip: {
    //             headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //             valueSuffix: ''
    //         }
    //     }]
    // });
    //#endregion
    
    // test------------
    StockChart[zIndex][105] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihStageAddContainCustom',
            alignTicks: true,
            marginTop: 15
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
        // plotOptions: {
        //     series: {
        //         dataGrouping: {
        //             enabled: false
        //         }
        //     }
        // },
        xAxis: {
            gridLineWidth: 1,
            tickInterval:  24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis: [{
            tickPositions: [195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250],
            // tickPositions: tickPoint,
            allowDecimals: false,
            showLastLabel: true,
            opposite: false,
            title: {
                text: ''
            }
        }, {
            // tickPositions: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
            // tickPositions: tickPoint_Contain,
            tickAmount: 12,
            allowDecimals: false,
            max:220,
            min:0,
            showLastLabel: true,
            opposite: true,
            title: {
                text: ''
            }
        }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationShihStageAddContainCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationShihStageAddContainCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYStageCustom,
            yAxis: 0,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        },{
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYContainCustom,
            yAxis: 1,
            tooltip: {
                valueSuffix: '',
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                shared: true,
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }

    });
    // test------------

    StockChart[zIndex][106] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihFlowCustom',
            marginRight: 15,
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
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                //十天顯示日期，日期會隨著捲軸更新 ex 1/5 2/5 3/5 or 5/8 6/8 7/8, tickInterval: 28 * 24 * 3600 * 1000
                //format: '{value:%m/%d}',
                //step: 10

                //只顯示日期01、11、21(不顯示31，會和01擠在一起) ex 10/01 10/11 10/21, tickInterval: 24 * 3600 * 1000
                step: 1,
                formatter: function () {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    
                    if (label.substr(label.length - 2, 2) == "01" || label.substr(label.length - 2, 2) == "11" || label.substr(label.length - 2, 2) == "21" /*|| label.substr(label.length - 2, 2) == "31"*/)
                        return label;
                    else
                        return "";
                }
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
        yAxis:
            [
                { // Primary yAxis
                    min: 0,
                    tickAmount: 6,
                    minTickInterval: 1,
                    allowDecimals: false,
                    opposite: false,
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],

        navigator: {
            enabled: false
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                point:{
                    events:{
                        click: function(){
                            // console.log('Moused click');
                            triggerOtherChart("stationShihFlowCustom", this.x);
                        },
                        mouseOver: function () {
                            // console.log('Moused over');
                            triggerOtherChart("stationShihFlowCustom", this.x);
                        },
                        mouseOut: function () {
                            // console.log( 'Moused out');
                        }
                    }
                }//point
                
            }//series
        },

        series: [{
            name: ' ',
            type: 'spline',
            color: '#3399FF',
            data: timeblockYInFlowCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }, {
            name: ' ',
            type: 'spline',
            color: '#FF9900',
            data: timeblockYOutFlowCustom,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
                valueSuffix: ''
            }
        }]
        ,tooltip:{
            formatter: function(){
                // 資料顯示
                var Point_date = new Date(this.x);

                // 在圖表上，高的先顯示 (判斷畫面的Y座標)
                let temp = [];
                for (let i = 0; i < this.points.length; i++) {
                    let key = this.points[i].color;
                    let valY = this.points[i].point.plotY; // 數字越小越高 (跟一般相反)
                    let val = this.points[i].y.toFixed(2);
                    temp.push({"plotY": valY, "color": key, "val": val});
                }
                temp.sort(function(a, b) {
                    return a.plotY - b.plotY; // 大到小
                });
                let ShowText = Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate()  + "<br/>" ;
                for (let i = 0; i < temp.length; i++) {
                    ShowText += `<span style="color:${temp[i].color}">●</span> : <b>${temp[i].val}</b><br/>`;
                }
                return ShowText;
            }
        }

    });

    //
    const shihDateDiff = (new Date(yyy2yyyy($('#sShihCustomDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eShihCustomDateText').val()))));
    if (shihDateDiff > 62 ) {//超過兩個月只顯示第一天
        StockChart[zIndex][104].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
                labels: {
                    step: null,
                    format: '{value:%m/%d}'
                }
        });
        StockChart[zIndex][105].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
                labels: {
                    step: null,
                    format: '{value:%m/%d}'
                }
        });
        StockChart[zIndex][106].xAxis[0].update({
            tickInterval: 28 * 24 * 3600 * 1000,
                labels: {
                    step: null,
                    format: '{value:%m/%d}'
                }
        });
    }
    // if (chartMin >= sDate.getTime()) {
    //     StockChart[zIndex][104].xAxis[0].setExtremes(chartMin, chartMax);
    //     StockChart[zIndex][105].xAxis[0].setExtremes(chartMin, chartMax);
    //     StockChart[zIndex][106].xAxis[0].setExtremes(chartMin, chartMax);
    // }

    // if (isShowMonthLabel) {
    //     StockChart[zIndex][104].xAxis[0].update({
    //         tickInterval: 28 * 24 * 3600 * 1000,
    //         labels: {
    //             step: null,
    //             format: '{value:%m/%d}'
    //         }
    //     });
    //     StockChart[zIndex][105].xAxis[0].update({
    //         tickInterval: 28 * 24 * 3600 * 1000,
    //         labels: {
    //             step: null,
    //             format: '{value:%m/%d}'
    //         }
    //     });
    //     StockChart[zIndex][106].xAxis[0].update({
    //         tickInterval: 28 * 24 * 3600 * 1000,
    //         labels: {
    //             step: null,
    //             format: '{value:%m/%d}'
    //         }
    //     });
    // }
    
}

function getRainDataAnalysisAll(msg) {// 棄用
    //撈區間(不是撈整年)
    var rainY = msg["getRainDataAnalysisAllRangeByDays"];
    var rainTotalY = 0;
    timeblockShihYPV = [];



    ////加總
    //for (var i = 0; i < rainY.length; i++) {
    //    rainTotalY += parseFloat(rainY[i].value);
    //}
    //$("#stationRainShihVal").html(rainTotalY.toFixed(1));

    //var range = $('.zoom_controls.zoom_controls_range a[class^=active]').attr('data-range');
    //var delta = 1;
    //switch (range) {
    //    case "1m":
    //        delta = 0;
    //        break;
    //    case "2m":
    //        delta = 1;
    //        break;
    //    case "3m":
    //        delta = 2;
    //        break;
    //    case "1y":
    //        delta = 11;
    //        break;
    //    default:
    //        break;
    //}

    var date = new Date();

    //var maxM = date.getMonth();
    //var minM = maxM - delta;
    //if (minM < 0) {
    //    minM = 0;
    //    maxM = delta;
    //}

    //for (var m = minM + 1; m <= maxM + 1; m++) {
    //    var days = daysInMonth(m, date.getFullYear());
    //    for (var i = 1; i <= days; i++) {
    //        var utc = Date.UTC(date.getFullYear(), m - 1, i);
    //        var val = 0;
    //        for (var y = 0; y < rainY.length; y++) {
    //            if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
    //                val = parseFloat(rainY[y].value);
    //                break;
    //            }
    //        }
    //        timeblockShihYPV.push([utc, val]);
    //    }
    //}
    var nowM = new Date().getMonth()+1;

    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, date.getFullYear());
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(date.getFullYear(), m - 1, i);
            var val = 0;
            for (var y = 0; y < rainY.length; y++) {
                if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
                    val = parseFloat(rainY[y].value);
                    break;
                }
            }
            timeblockShihYPV.push([utc, val]);

            //只加總現在這個月
            if (m == nowM) {
                rainTotalY += val;
            }
        }
    }

    $("#stationRainShihVal").html(rainTotalY.toFixed(1));

    StockChart[zIndex][101] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationShihRain',
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
            {
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
                data: timeblockShihYPV
                // tooltip: {
                //     headerFormat: '{point.x:%Y/%m/%d}<br/>',
                //     valueSuffix: ''
                // }

            }]
        ,tooltip:{
            formatter: function(){
                if (triggerShimenTime.Rain) {
                    triggerOtherChart("stationShihRain", this.x);
                }
                // 資料顯示
                var hour = new Date(this.x).toGMTString().substring(17,19);
                var Point_date = new Date(this.x);
                return Point_date.getFullYear() + "/" + (Point_date.getUTCMonth()+1) + "/" +  Point_date.getUTCDate() + " " + hour + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";

            }
        }
    });




    //var maxM = new Date().getMonth();
    //var minM = new Date().getMonth() - delta;
    //if (minM < 0) {
    //    minM = 0;

    //    maxM = delta;
    //}
    //var chartMin = Date.UTC(y, minM, 1);
    //var chartMax = new Date().getTime();
    //if (delta == 0 || delta == 2 || delta == 5)
    //    chartMax = Date.UTC(y, maxM, new Date(y, maxM, 0).getDate());
    //else if (delta == 11)
    //    chartMax = Date.UTC(y, 11, 31);//chartMax = Date.UTC(y, maxM, new Date(y, maxM, 0).getDate());
    //    //chartMax = Date.UTC(y, 11, 31);

    //switch (delta) {
    //    case 0:
    //        StockChart[3][0].xAxis[0].update({
    //            tickInterval: 24 * 3600 * 1000,
    //            labels: {
    //                step: 5
    //            },
    //        });
    //        break;
    //    case 1:
    //    case 2:
    //    case 11:
    //        //StockChart[3][0].xAxis[0].update({
    //        //    tickInterval: 28 * 24 * 3600 * 1000,
    //        //    labels: {
    //        //        step: null
    //        //    }
    //        //});
    //        StockChart[3][0].xAxis[0].update({
    //            tickInterval: 24 * 3600 * 1000,
    //            labels: {
    //                step: 10
    //            },
    //        });
    //        break;
    //}

    //var chartMin = Date.UTC(date.getFullYear(), date.getMonth(), 1);
    //var chartMax = Date.UTC(date.getFullYear(), date.getMonth() + 1, 0);
    //xIndex = 0;
    //zIndex = 3;
    //StockChart[3][0]['zoom' + range]
    //StockChart[3][0].xAxis[0].setExtremes(chartMin, chartMax);

    xIndex = 101;
    StockChart[zIndex][101]['zoom1m']();

    
        

    //StockChart[3][0].xAxis[0].setExtremes(chartMin, chartMax);
    ////撈整年
    //var rainY = msg["getRainDataAnalysisAllRangeByDays"];
    //var rainTotalY = 0;
    //var timeblockShihYPV = [];

    //var date = new Date();
    //var currentYear = date.getFullYear();
    //var currentMonth = date.getMonth() + 1;

    //// year
    //for (var m = 1; m <= 12; m++) {
    //    var days = daysInMonth(m, currentYear);
    //    for (var i = 1; i <= days; i++) {
    //        var utc = Date.UTC(currentYear, m - 1, i);
    //        var val = 0;
    //        for (var y = 0; y < rainY.length; y++) {
    //            if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
    //                val = parseFloat(rainY[y].value);
    //                break;
    //            }
    //        }
    //        timeblockShihYPV.push([utc, val]);
    //    }
    //}
    //for (var i = 0; i < rainY.length; i++) {
    //    rainTotalY += parseFloat(rainY[i].value);
    //}

    //StockChart[3][0] = Highcharts.StockChart({
    //    chart: {
    //        renderTo: 'stationAM0',
    //        alignTicks: false
    //    },

    //    rangeSelector: {
    //        selected: 0,
    //        enabled: false,
    //        inputEnabled: false,
    //        buttons: [{
    //            type: 'month',
    //            count: 1,
    //            text: '1月'
    //        }, {
    //            type: 'month',
    //            count: 3,
    //            text: '3月'
    //        }, {
    //            type: 'month',
    //            count: 6,
    //            text: '6月'
    //        }, {
    //            type: 'ytd',
    //            count: 7,
    //            text: '至本日'
    //        }, {
    //            type: 'all',
    //            count: 8,
    //            text: '全年'
    //        }]
    //    },

    //    title: {
    //        text: ''
    //    },
    //    xAxis: {
    //        gridLineWidth: 1,
    //        tickInterval: 28 * 24 * 3600 * 1000,
    //        type: 'datetime',
    //        dateTimeLabelFormats: {
    //            day: '%m/%d',
    //        },
    //        labels: {
    //            format: '{value:%m/%d}',
    //            step: null
    //        },
    //        events: {
    //            setExtremes: function (e) {
    //                console.log(this);
    //                if (typeof (e.rangeSelectorButton) !== 'undefined') {
    //                    //alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
    //                }
    //            }
    //        }
    //    },
    //    yAxis: [
    //        {
    //        },
    //        { // Primary yAxis
    //            labels: {
    //                format: '{value}',
    //                style: {
    //                    color: Highcharts.getOptions().colors[0]
    //                }
    //            },
    //            title: {
    //                text: '',
    //                style: {
    //                    color: Highcharts.getOptions().colors[0]
    //                }
    //            },
    //            opposite: false
    //        }],

    //    navigator: {
    //        enabled: false
    //    },

    //    series: [
    //        {
    //            name: ' ',
    //            type: 'column',
    //            yAxis: 1,
    //            data: timeblockShihYPV,
    //            tooltip: {
    //                headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //                valueSuffix: ''
    //            }

    //        }]
    //});

    //xIndex = 0;
    //zIndex = 3;

    //var range = $('.zoom_controls.zoom_controls_range a[class^=active]').attr('data-range');
    //var delta = 1;
    //switch (range) {
    //    case "1m":
    //        delta = 0;
    //        break;
    //    case "2m":
    //        delta = 1;
    //        break;
    //    case "3m":
    //        delta = 2;
    //        break;
    //    case "1y":
    //        delta = 11;
    //        break;
    //    default:
    //        break;
    //}

    //var y = new Date().getFullYear();
    //var maxM = new Date().getMonth();
    //var minM = new Date().getMonth() - delta;
    //if (minM < 0) {
    //    minM = 0;

    //    maxM = delta;
    //}
    ////var chartMin = Date.UTC(y, new Date().getMonth(), 1);
    ////var chartMax = Date.UTC(y, new Date().getMonth()+1, 0);

    //var chartMin = Date.UTC(y, minM, 1);
    //var chartMax = new Date().getTime();
    //chartMax = Date.UTC(y, maxM, new Date(y, maxM, 0).getDate());
    //StockChart[zIndex][xIndex].xAxis[0].setExtremes(chartMin, chartMax);
    ////StockChart[3][0]['zoom' + range]();

    

}

function reCountBao2AddBaoRain(sTime, eTime)
{
    var val = 0;
    var valInFlow = 0;
    var valOutFlow = 0;
    var valFlow = 0; //溢放流量
    for (var i = 0; i < timeblockBao2AddBaoshanYInflow.length; i++) {
        if (timeblockBao2AddBaoshanYInflow[i][0] >= sTime && timeblockBao2AddBaoshanYInflow[i][0] <= eTime) {
            // val += timeblockBaoYPV[i][1];
            valInFlow += timeblockBao2AddBaoshanYInflow[i][1];
            valOutFlow += timeblockBao2AddBaoshanYOutflow[i][1];
            valFlow += timeblockBao2overflow[i][1];
        }
    }
    // $("#stationRainBaoVal").html(commafy(val.toFixed(1)));
    $("#stationBao2AddBaoFlowIN").html(commafy(valInFlow.toFixed(1)));
    $("#stationBao2AddBaoFlowOUT").html(commafy(valOutFlow.toFixed(1)));
    $("#stationBao2AddBaoOverFlow").html(commafy(valFlow.toFixed(1)));
}

function reCountBaoRain(sTime, eTime)
{
    var val = 0;
    var valInFlow = 0;
    var valOutFlow = 0;
    var LonNVal = 0;
    for (var i = 0; i < timeblockBaoYInFlow.length; i++) {
        if (timeblockBaoYPV[i][0] >= sTime && timeblockBaoYPV[i][0] <= eTime) {
            
            valInFlow += timeblockBaoYInFlow[i][1];
            valOutFlow += timeblockBaoYOutFlow[i][1];
        }
    }
    for (var i = 0; i < timeblockBaoYPV.length; i++) {
        if (timeblockBaoYPV[i][0] >= sTime && timeblockBaoYPV[i][0] <= eTime) {
            val += timeblockBaoYPV[i][1];
            
        }
    }
    //隆恩堰
    for (var i = 0; i < timeblockLonNStage.length; i++) {
        if (timeblockLonNStage[i][0] >= sTime && timeblockLonNStage[i][0] <= eTime) {
            LonNVal += timeblockLonNStage[i][1];
            
        }
    }
    // debugger;
    $("#stationRainBaoVal").html(commafy(val.toFixed(1)));
    $("#stationBaoFlowIN").html(commafy(valInFlow.toFixed(1)));
    $("#stationBaoFlowOUT").html(commafy(valOutFlow.toFixed(1)));
    $("#stationLonNStageTotal").html(commafy(LonNVal.toFixed(1)));

}

function reCountShihRain(sTime, eTime) {
    var val = 0;
    var valInFlow = 0;
    var valOutFlow = 0;
    for (var i = 0; i < timeblockShihYPV.length; i++) {
        if (timeblockShihYPV[i][0] >= sTime && timeblockShihYPV[i][0] <= eTime) {
            val += timeblockShihYPV[i][1];
            valInFlow += timeblockYInFlow[i][1];
            valOutFlow += timeblockYOutFlow[i][1];
        }
    }
    $("#stationRainShihVal").html(commafy(val.toFixed(1)));
    $("#stationShihFlowIN").html(commafy(valInFlow.toFixed(1)));
    $("#stationShihFlowOUT").html(commafy(valOutFlow.toFixed(1)));
}

function reCountSWS(sTime, eTime) {
    var vala = 0;
    var valb = 0;
    var valc = 0;
    var vald = 0;
    for (var i = 0; i < timeblockYA.length; i++) {
        if (timeblockYA[i][0] >= sTime && timeblockYA[i][0] <= eTime) {
            vala += timeblockYA[i][1];
            valb += timeblockYB[i][1];
            valc += timeblockYC[i][1];
            vald += timeblockYD[i][1];
        }
    }

    $("#swsta").html(commafy(vala.toFixed(1)));
    $("#swstb").html(commafy(valb.toFixed(1)));
    $("#swstc").html(commafy(valc.toFixed(1)));
    $("#swstd").html(commafy(vald.toFixed(1)));
}

function ShowCustomDateUI(siteName, sdd, edd) {
    if (siteName == "shimen-day-range") {
        searchSShihDate = new Date(sdd).getTime();
        searchEShihDate = new Date(edd).getTime();

        doAjax("getShihmenHistoryCustomDate", { "sDate": sdd, "eDate": edd }, getShihmenHistoryCustom);
        $("#spShihCustomDate").html("資料區間: " + yyyy2yyy(sdd) + "~" + yyyy2yyy(edd)); //@@@
        $("#stationShihRain").hide();
        $("#stationShihRainCustom").show();
        $("#stationShihStage").hide();
        $("#stationShihStageAddContainCustom").show();
        $("#stationShihFlow").hide();
        $("#stationShihFlowCustom").show();
        //重置石門區間統計水量及流量UI
        $("#divShihStageAndFlow").show();
    }
    else if (siteName == "shimen") {
        searchSSWSDate = new Date(sdd).getTime();
        searchESWSDate = new Date(edd).getTime();

        doAjax("getWaterDetailManagementX_New_YearCustomDate", { "sDate": sdd, "eDate": edd }, getWaterDetailManagementX_New_YearCustom);
        $("#spSWSCustomDate").html("資料區間: " + yyyy2yyy(sdd) + "~" + yyyy2yyy(edd));
        $("#stationSWSA").hide();
        $("#stationSWSACustom").show();
        $("#stationSWSB").hide();
        $("#stationSWSBCustom").show();
    }
    else {
        searchSBaoDate = new Date(sdd).getTime();
        searchEBaoDate = new Date(edd).getTime();

        doAjax("getBaoHistoryCustomDate", { "sDate": sdd, "eDate": edd }, getBaoHistoryCustom);
        $("#spBaoCustomDate").html("資料區間: " + yyyy2yyy(sdd) + "~" + yyyy2yyy(edd)); //@@@
        $("#stationBao").hide();
        $("#stationBaoCustom").show();
        $("#stationBaoStage").hide();
        $("#stationBaoStageCustom").show();
        $("#stationBaoFlow").hide();
        $("#stationBao2AddBaoFlow").hide();
        $("#stationBaoFlowCustom").show();
        $("#stationLonNStage").hide();
        $("#stationLonNStageCustom").show();
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

//function to add commas to textboxes
function getCommaNumString(str) {
    var Num = str;
    while (Num.indexOf(',') >= 0) {
        Num = Num.replace(',', '');
    }
    var CommaNumString = Intl.NumberFormat('en-US').format(Num);

    if (CommaNumString == "NaN" || str == "")//textbox為空或是不是數字時回傳空值
        return "";
    else
        return CommaNumString;
}

function checkDataTimeIsOverdue(realTimeDate, overdueMinutes = 30) {
    //若資料為null，則為錯誤日期，因此回傳false
    if (realTimeDate.getTime() == new Date(null).getTime()) {
        return false;
    }

    var nowDate = new Date();
    if (Math.ceil((nowDate.getTime() - realTimeDate.getTime()) / 60000) > overdueMinutes) {
        return true;
    }
    else {
        return false;
    }
}

function getDividedValueFixed2FloatOrNull(val, denominator = 1) {
    if (val == null) {
        return null;
    }
    else {
        return parseFloat((val / denominator).toFixed(2));
    }
}

function chkDateIsOverTen(sDate , eDate){
    var aDate, oDate1, oDate2, iDays;
  aDate = sDate.split("-")
  oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]) // 轉換為 06/18/2016 格式
  aDate = eDate.split("-")
  oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒數轉換為天數
  return iDays;
};


function triggerOtherChart(pic, point){
    
    var t = new Date(point - ( 8 * 3600 * 1000 ));
    var ShowDate = `${t.getFullYear()}/${(t.getMonth()+1).toString().padStart(2,"0")}/${t.getDate().toString().padStart(2,"0")}/  ${t.getHours().toString().padStart(2,"0")} : ${t.getMinutes().toString().padStart(2,"0")}`
    // console.log(pic +' :　'+ ShowDate);
    switch (pic) {
        // 石門即時統計
        case "picT":
        case "stationShihStageAddContainCustom_hour"://查詢: 小時
            picGtrigger(point);
            picItrigger(point);
            break;
        case "picI":
        case "stationShihFlowCustom_hour"://查詢: 小時
            picGtrigger(point);
            picTtrigger(point);
            break;
        case "picG":
        case "stationShihRainCustom_hour"://查詢: 小時
            picItrigger(point);
            picTtrigger(point);
            break;
        //石門水位蓄水量歷線圖
        case "picA":
            picBTrigger(point);
            break;
         case "picB":
            picATrigger(point);
            break;
        //石門區間統計 + 查詢(日)
        case "stationShihRain":
        case "stationShihRainCustom":
            stationShihFlowTrigger(point);
            stationShihStageTrigger(point);
            break;
        case "stationShihFlow":
        case "stationShihFlowCustom":
            stationShihRainTrigger(point);
            stationShihStageTrigger(point);
            break;
        case "stationShihStage":
        case "stationShihStageAddContainCustom":
            stationShihRainTrigger(point);
            stationShihFlowTrigger(point);
            break;
        //寶二即時統計 + 查詢(小時)
        case "picRTRainBao":
        case "picRTRainBao_hour":
            // picRTRainBaoTrigger(point)
            picRTFlowBaoTrigger(point);
            picRTStageBaoTrigger(point);
            break;
        case "picRTStageBao":
        case "picRTStageBao_hour":
            picRTRainBaoTrigger(point);
            picRTFlowBaoTrigger(point);
            // picRTStageBaoTrigger(point)
            break;
        case "picRTFlowBao":
        case "picRTFlowBao_hour":
            picRTRainBaoTrigger(point)
            // picRTFlowBaoTrigger(point)
            picRTStageBaoTrigger(point)
            break;
        //寶二區間統計 + 查詢(日)
        case "stationBao":
        case "stationBaoCustom":
            stationBao2AddBaoFlowTrigger(point);
            stationBaoStageTrigger(point);
            stationLonNStageTrigger(point);
            break;
        case "stationBao2AddBaoFlow":
        case "stationBaoFlowCustom":
            stationBaoTrigger(point);
            stationBaoStageTrigger(point);
            stationLonNStageTrigger(point);
            break;
        case "stationBaoStage":
        case "stationBaoStageCustom":
            stationBaoTrigger(point);
            stationBao2AddBaoFlowTrigger(point);
            stationLonNStageTrigger(point);
            break;
        case "stationLonNStage":
        case "stationLonNStageCustom":
            stationBaoTrigger(point);
            stationBao2AddBaoFlowTrigger(point);
            stationBaoStageTrigger(point);
            break;
        //寶二水庫歷線圖
        case "picA_Bao":
            Bao_picBTrigger(point);
            break;
        case "picB_Bao":
            Bao_picATrigger(point);
            break;
        //石門供水
        case "stationSWSA":
        case "stationSWSACustom":
            stationSWSBTrigger(point);
            break;
        case "stationSWSB":
        case "stationSWSBCustom":
            stationSWSATrigger(point);
            break;
    }
    
    
    


}

//#region 連動顯示
// 石門即時統計: 雨量  + 查詢(小時)
function picGtrigger(pointX){
    var flag = true;
    var idx = 0;
    for (let i = 0; i < StockChart[100].series[0].points.length; i++) {
        if (pointX == StockChart[100].series[0].points[i].x) {
            StockChart[100].series[0].points[i].setState('hover');
            StockChart[100].series[0].points[i].state = '';// You need this to fix hover bug
            StockChart[100].tooltip.refresh([StockChart[100].series[0].points[i]]);
            flag = false;
            break;
        }
        else{
            // StockChart[100].series[0].points[i].setState('');
            // StockChart[100].tooltip.hide();
            idx = i;
        }
    }

    if (flag) {
        for (let i = 0; i < StockChart[100].series[0].points.length; i++) {
            StockChart[100].series[0].points[i].setState('');
        }
        // StockChart[100].series[0].points[idx].setState('');
        StockChart[100].tooltip.hide();
    }
}
// 石門即時統計: 時均流量 + 查詢(小時)
function picItrigger(pointX){
    var flag = true;
    var idx = 0;
    for (let i = 0; i < StockChart[5].series[0].points.length; i++) {
        if ( 
            (StockChart[5].series[0].points[i].y !== null || StockChart[5].series[1].points[i].y !== null) 
        && (pointX == StockChart[5].series[0].points[i].x && pointX == StockChart[5].series[1].points[i].x) 
        ) {
            StockChart[5].series[0].points[i].setState('hover');
            StockChart[5].series[0].points[i].state = '';// You need this to fix hover bug
            StockChart[5].series[1].points[i].setState('hover');
            StockChart[5].series[1].points[i].state = '';// You need this to fix hover bug
            StockChart[5].tooltip.refresh([StockChart[5].series[0].points[i] , StockChart[5].series[1].points[i]]);
            flag = false;
            break;
        }
        else{
            // StockChart[5].series[0].points[i].setState('');
            // StockChart[5].series[1].points[i].setState('');
            // StockChart[5].tooltip.hide();
            idx = i;
        }
    }

    if (flag) {
        for (let i = 0; i < StockChart[5].series[0].points.length; i++) {
            StockChart[5].series[0].points[i].setState('');
            StockChart[5].series[1].points[i].setState('');
        }
        // StockChart[5].series[0].points[idx].setState('');
        // StockChart[5].series[1].points[idx].setState('');
        StockChart[5].tooltip.hide();
    }
}
// 石門即時統計: 水位蓄水量 + 查詢(小時)
function picTtrigger(pointX){
    var flag = true;
    var idx = 0;
    if (StockChart[4] !== undefined) {
        for (let i = 0; i < StockChart[4].series[0].points.length; i++) {
            if ( 
                (StockChart[4].series[0].points[i].y !== null || StockChart[4].series[1].points[i].y !== null) 
            && (pointX == StockChart[4].series[0].points[i].x && pointX == StockChart[4].series[1].points[i].x) 
            ) {
                StockChart[4].series[0].points[i].setState('hover');
                StockChart[4].series[0].points[i].state = '';// You need this to fix hover bug
                StockChart[4].series[1].points[i].setState('hover');
                StockChart[4].series[1].points[i].state = '';// You need this to fix hover bug
                StockChart[4].tooltip.refresh([StockChart[4].series[0].points[i] , StockChart[4].series[1].points[i]]);
                flag = false;
                break;
            }
            else{
                // StockChart[4].series[0].points[i].setState('');
                // StockChart[4].series[1].points[i].setState('');
                // StockChart[4].tooltip.hide();
                idx = i;
            }
        }
    
        if (flag) {
            for (let i = 0; i < StockChart[4].series[0].points.length; i++) {
                StockChart[4].series[0].points[i].setState('');
                StockChart[4].series[1].points[i].setState('');
            }
            // StockChart[4].series[0].points[idx].setState('');
            // StockChart[4].series[1].points[idx].setState('');
            StockChart[4].tooltip.hide();
        }
    }
    
}


//石門歷線圖
function picATrigger(pointX){
    var Picdata = StockChart[0][0];
    var thisYearLimit = Picdata.series[2].points.length;//今年

    var flag = true;
    var idx = 0;
    var v0 = null ,  v1 = null , v2 = null;
    Picdata.series[0].points.length;
    Picdata.series[1].points.length;
    Picdata.series[2].points.length;// this year
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        v0 = Picdata.series[0].points[i].y;
        v1 = Picdata.series[1].points[i].y;
        if (i < thisYearLimit) {
            v2 = Picdata.series[2].points[i].y;
        }

        if (   
            (v0 !== null || v1 !== null || v2 !== null)
            && 
            (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug

            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug

            if (i < thisYearLimit) {
                Picdata.series[2].points[i].setState('hover');
                Picdata.series[2].points[i].state = '';// You need this to fix hover bug

                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i],
                    Picdata.series[2].points[i]
                ]);
            }else{
                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i]
                ]);
            }
            flag = false;
            break;
        }//
        else{ idx = i; }

        if (idx >= thisYearLimit) {
            for (let i = 0; i <  Picdata.series[2].points.length; i++) {
             Picdata.series[2].points[i].setState('');
            }
        }
        if (flag) {
            Picdata.series[0].points[idx].setState('');
            Picdata.series[1].points[idx].setState('');
            Picdata.tooltip.hide();
        }
    }
}
function picBTrigger(pointX){
    var flag = true;
    var noDataFlag = true;
    var idx = 0;
    var Picdata = StockChart[0][1];
    var thisYearLimit = Picdata.series[2].points.length;
    var v0 = null;
    var v1 = null;
    var v2 = null;
    var v3 = null;
    var v4 = null;
    var v5 = null;
    // for (let i = 0; i < Picdata.series[2].points.length; i++) {
    //     if (pointX ==  Picdata.series[2].points[i].x) {
    //         noDataFlag = false;
    //     }
    // }
    

    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        v0 = Picdata.series[0].points[i].y;
        v1 = Picdata.series[1].points[i].y;
        // var v2 = Picdata.series[2].points[i].y;
        v3 = Picdata.series[3].points[i].y;
        v4 = Picdata.series[4].points[i].y;
        v5 = Picdata.series[5].points[i].y;
        if (i < thisYearLimit) {
            v2 = Picdata.series[2].points[i].y;
        }
        if ( 
            (v0 !== null || v1 !== null || v2 !== null || v3 !== null || v4 !== null || v5 !== null) 
        && (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug
            Picdata.series[3].points[i].setState('hover');
            Picdata.series[3].points[i].state = '';// You need this to fix hover bug
            Picdata.series[4].points[i].setState('hover');
            Picdata.series[4].points[i].state = '';// You need this to fix hover bug
            Picdata.series[5].points[i].setState('hover');
            Picdata.series[5].points[i].state = '';// You need this to fix hover bug

            if (i < thisYearLimit) {
                Picdata.series[2].points[i].setState('hover');
                Picdata.series[2].points[i].state = '';// You need this to fix hover bug

                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i],
                    Picdata.series[2].points[i],
                    Picdata.series[3].points[i],
                    Picdata.series[4].points[i],
                    Picdata.series[5].points[i],
                ]);
            }else{
                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i],
                    Picdata.series[3].points[i],
                    Picdata.series[4].points[i],
                    Picdata.series[5].points[i],
                ]);
            }
            flag = false;
            break;
        }
        else{ idx = i;}
    }
// debugger;
    if (idx >= thisYearLimit) {
       for (let i = 0; i <  Picdata.series[2].points.length; i++) {
        Picdata.series[2].points[i].setState('');
       }
    }

    if (flag) {
        Picdata.series[0].points[idx].setState('');
        Picdata.series[1].points[idx].setState('');
        Picdata.series[2].points[idx].setState('');
        Picdata.series[3].points[idx].setState('');
        Picdata.series[4].points[idx].setState('');
        Picdata.series[5].points[idx].setState('');
        Picdata.tooltip.hide();
    }
}

//石門區間統計 + 查詢(日)
function stationShihRainTrigger(pointX){//石門雨量
    var Picdata = StockChart[zIndex][101];
    //查詢
    if ($('#stationShihRain').css('display') == "none")
        Picdata = StockChart[zIndex][104];
    

    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if (pointX == Picdata.series[0].points[i].x) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([Picdata.series[0].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}

function stationShihFlowTrigger(pointX){//石門流量
    var Picdata = StockChart[zIndex][103];
    //查詢
    if ($('#stationShihFlow').css('display') == "none")
        Picdata = StockChart[zIndex][106];


    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if ( 
            (Picdata.series[0].points[i].y !== null || Picdata.series[1].points[i].y !== null) 
        && (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([Picdata.series[0].points[i] , Picdata.series[1].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        // Picdata.series[1].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            Picdata.series[1].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}

function stationShihStageTrigger(pointX){//石門水位
    var Picdata = StockChart[zIndex][102];
    //查詢
    if ($('#stationShihStage').css('display') == "none")
        Picdata = StockChart[zIndex][105];



    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if ( 
            (Picdata.series[0].points[i].y !== null || Picdata.series[1].points[i].y !== null) 
        && (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([Picdata.series[0].points[i] , Picdata.series[1].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        // Picdata.series[1].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            Picdata.series[1].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}



//寶二即時統計
function picRTRainBaoTrigger(pointX){
    var flag = true;
    var idx = 0;
    for (let i = 0; i < StockChart[100].series[0].points.length; i++) {
        if (pointX == StockChart[100].series[0].points[i].x && StockChart[100].series[0].points[i].y !== null) {
            StockChart[100].series[0].points[i].setState('hover');
            StockChart[100].series[0].points[i].state = '';// You need this to fix hover bug
            StockChart[100].tooltip.refresh([StockChart[100].series[0].points[i]]);
            flag = false;
            break;
        }
        else{
            
            idx = i;
        }
    }

    if (flag) {
        for (let i = 0; i < StockChart[100].series[0].points.length; i++) {
            StockChart[100].series[0].points[i].setState('');
        }
        // StockChart[100].series[0].points[idx].setState('');
        StockChart[100].tooltip.hide();
    }
}
function picRTFlowBaoTrigger(pointX){
    var flag = true;
    var idx = 0;
    for (let i = 0; i < StockChart[5].series[0].points.length; i++) {
        if ( 
            (StockChart[5].series[0].points[i].y !== null || StockChart[5].series[1].points[i].y !== null) 
        && (pointX == StockChart[5].series[0].points[i].x && pointX == StockChart[5].series[1].points[i].x) 
        ) {
            StockChart[5].series[0].points[i].setState('hover');
            StockChart[5].series[0].points[i].state = '';// You need this to fix hover bug
            StockChart[5].series[1].points[i].setState('hover');
            StockChart[5].series[1].points[i].state = '';// You need this to fix hover bug
            StockChart[5].series[2].points[i].setState('hover');
            StockChart[5].series[2].points[i].state = '';// You need this to fix hover bug
            StockChart[5].tooltip.refresh([StockChart[5].series[0].points[i] , StockChart[5].series[1].points[i], StockChart[5].series[2].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        for (let i = 0; i < StockChart[5].series[0].points.length; i++) {
            StockChart[5].series[0].points[i].setState('');
            StockChart[5].series[1].points[i].setState('');
            StockChart[5].series[2].points[i].setState('');
        }
        // StockChart[5].series[0].points[idx].setState('');
        // StockChart[5].series[1].points[idx].setState('');
        StockChart[5].tooltip.hide();
    }
}
function picRTStageBaoTrigger(pointX){
    var flag = true;
    var idx = 0;
    for (let i = 0; i < StockChart[4].series[0].points.length; i++) {
        if ( 
            (StockChart[4].series[0].points[i].y !== null || StockChart[4].series[1].points[i].y !== null) 
        && (pointX == StockChart[4].series[0].points[i].x && pointX == StockChart[4].series[1].points[i].x) 
        ) {
            StockChart[4].series[0].points[i].setState('hover');
            StockChart[4].series[0].points[i].state = '';// You need this to fix hover bug
            StockChart[4].series[1].points[i].setState('hover');
            StockChart[4].series[1].points[i].state = '';// You need this to fix hover bug
            StockChart[4].tooltip.refresh([StockChart[4].series[0].points[i] , StockChart[4].series[1].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        for (let i = 0; i < StockChart[4].series[0].points.length; i++) {
            StockChart[4].series[0].points[i].setState('');
            StockChart[4].series[1].points[i].setState('');
        }
        // StockChart[4].series[0].points[idx].setState('');
        // StockChart[4].series[1].points[idx].setState('');
        StockChart[4].tooltip.hide();
    }
}


//寶二區間統計
function stationBaoTrigger(pointX){//寶二雨量
    var Picdata = StockChart[zIndex][98];
    //查詢
    if ($('#stationBao').css('display') == "none")
        Picdata = StockChart[zIndex][107];
    

    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if (pointX == Picdata.series[0].points[i].x) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug

            Picdata.tooltip.refresh([Picdata.series[0].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            // Picdata.series[1].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}
function stationBao2AddBaoFlowTrigger(pointX){//寶二流量
    var Picdata = StockChart[zIndex][120];
    //查詢
    if ($('#stationBao2AddBaoFlow').css('display') == "none")
        Picdata = StockChart[zIndex][109];


    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if ( 
            (Picdata.series[0].points[i].y !== null || Picdata.series[1].points[i].y !== null) 
        && (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug
            Picdata.series[2].points[i].setState('hover');
            Picdata.series[2].points[i].state = '';// You need this to fix hover bug

            Picdata.tooltip.refresh([Picdata.series[0].points[i] , Picdata.series[1].points[i], Picdata.series[2].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        // Picdata.series[1].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            Picdata.series[1].points[i].setState('');
            Picdata.series[2].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}
function stationBaoStageTrigger(pointX){
    var Picdata = StockChart[zIndex][99];
    // StockChart[zIndex][102]
    //查詢
    if ($('#stationBaoStage').css('display') == "none")
        Picdata = StockChart[zIndex][108];



    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if ( 
            (Picdata.series[0].points[i].y !== null || Picdata.series[1].points[i].y !== null) 
        && (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug

            Picdata.tooltip.refresh([Picdata.series[0].points[i] , Picdata.series[1].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        // Picdata.series[1].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            Picdata.series[1].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}
function stationLonNStageTrigger(pointX){
    var Picdata = StockChart[zIndex][97];
    //查詢
    if ($('#stationLonNStage').css('display') == "none")
        Picdata = StockChart[zIndex][112];
    

    var flag = true;
    var idx = 0;
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        if (pointX == Picdata.series[0].points[i].x && Picdata.series[0].points[i].y !== null) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([Picdata.series[0].points[i]]);
            flag = false;
            break;
        }
        else{
            idx = i;
        }
    }

    if (flag) {
        // Picdata.series[0].points[idx].setState('');
        for (let i = 0; i < Picdata.series[0].points.length; i++) {
            Picdata.series[0].points[i].setState('');
            // Picdata.series[1].points[i].setState('');
        }
        Picdata.tooltip.hide();
    }
}


//寶二水庫 & 寶山水庫 歷線圖
function Bao_picATrigger(pointX){
    var Picdata = StockChart[1][0];
    var thisYearLimit = Picdata.series[2].points.length;//今年

    var flag = true;
    var idx = 0;
    var v0 = null ,  v1 = null , v2 = null;
    Picdata.series[0].points.length;
    Picdata.series[1].points.length;
    Picdata.series[2].points.length;// this year
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        v0 = Picdata.series[0].points[i].y;
        v1 = Picdata.series[1].points[i].y;
        if (i < thisYearLimit) {
            v2 = Picdata.series[2].points[i].y;
        }

        if (   
            (v0 !== null || v1 !== null || v2 !== null)
            && 
            (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug

            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug

            if (i < thisYearLimit) {
                Picdata.series[2].points[i].setState('hover');
                Picdata.series[2].points[i].state = '';// You need this to fix hover bug

                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i],
                    Picdata.series[2].points[i]
                ]);
            }else{
                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i]
                ]);
            }
            flag = false;
            break;
        }//
        else{ idx = i; }

        if (idx >= thisYearLimit) {
            for (let i = 0; i <  Picdata.series[2].points.length; i++) {
             Picdata.series[2].points[i].setState('');
            }
        }
        if (flag) {
            Picdata.series[0].points[idx].setState('');
            Picdata.series[1].points[idx].setState('');
            Picdata.tooltip.hide();
        }
    }
}
function Bao_picBTrigger(pointX){
    var Picdata = StockChart[1][1];
    var thisYearLimit = Picdata.series[2].points.length;//今年

    var flag = true;
    var idx = 0;
    var v0 = null ,  v1 = null , v2 = null;
    Picdata.series[0].points.length;
    Picdata.series[1].points.length;
    Picdata.series[2].points.length;// this year
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        v0 = Picdata.series[0].points[i].y;
        v1 = Picdata.series[1].points[i].y;
        if (i < thisYearLimit) {
            v2 = Picdata.series[2].points[i].y;
        }

        if (   
            (v0 !== null || v1 !== null || v2 !== null)
            && 
            (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug

            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug

            if (i < thisYearLimit) {
                Picdata.series[2].points[i].setState('hover');
                Picdata.series[2].points[i].state = '';// You need this to fix hover bug
                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i],
                    Picdata.series[2].points[i]
                ]);
            }else{
                Picdata.tooltip.refresh([
                    Picdata.series[0].points[i],
                    Picdata.series[1].points[i]
                ]);
            }
            flag = false;
            break;
        }//
        else{ idx = i; }

        if (idx >= thisYearLimit) {
            for (let i = 0; i <  Picdata.series[2].points.length; i++) {
             Picdata.series[2].points[i].setState('');
            }
        }
        if (flag) {
            Picdata.series[0].points[idx].setState('');
            Picdata.series[1].points[idx].setState('');
            Picdata.tooltip.hide();
        }
    }
}


//石門供水
function stationSWSATrigger(pointX){
    var Picdata = StockChart[zIndex][90];
    //查詢
    if ($('#stationSWSA').css('display') == "none")
        Picdata = StockChart[zIndex][110];
    
    var flag = true;
    var idx = 0;
    var v0 = null ,  v1 = null ;
    Picdata.series[0].points.length;
    Picdata.series[1].points.length;
   
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        v0 = Picdata.series[0].points[i].y;
        v1 = Picdata.series[1].points[i].y;

        if (   
            (v0 !== null || v1 !== null )
            && 
            (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([
                Picdata.series[0].points[i],
                Picdata.series[1].points[i]
            ]);
            
            flag = false;
            break;
        }//
        else{ idx = i; }
        
        if (flag) {
            for (let i = 0; i <  Picdata.series[0].points.length; i++) {
                Picdata.series[0].points[i].setState('');
                Picdata.series[1].points[i].setState('');
            }
            Picdata.tooltip.hide();
        }
    }
}

function stationSWSBTrigger(pointX){
    var Picdata = StockChart[zIndex][91];
    //查詢
    if ($('#stationSWSB').css('display') == "none")
        Picdata = StockChart[zIndex][111];
    
    var flag = true;
    var idx = 0;
    var v0 = null ,  v1 = null ;
    Picdata.series[0].points.length;
    Picdata.series[1].points.length;
   
    for (let i = 0; i < Picdata.series[0].points.length; i++) {
        v0 = Picdata.series[0].points[i].y;
        v1 = Picdata.series[1].points[i].y;

        if (   
            (v0 !== null || v1 !== null )
            && 
            (pointX == Picdata.series[0].points[i].x && pointX == Picdata.series[1].points[i].x) 
        ) {
            Picdata.series[0].points[i].setState('hover');
            Picdata.series[0].points[i].state = '';// You need this to fix hover bug
            Picdata.series[1].points[i].setState('hover');
            Picdata.series[1].points[i].state = '';// You need this to fix hover bug
            Picdata.tooltip.refresh([
                Picdata.series[0].points[i],
                Picdata.series[1].points[i]
            ]);
            
            flag = false;
            break;
        }//
        else{ idx = i; }
        
        if (flag) {
            for (let i = 0; i <  Picdata.series[0].points.length; i++) {
                Picdata.series[0].points[i].setState('');
                Picdata.series[1].points[i].setState('');
            }
            Picdata.tooltip.hide();
        }
    }
}
//#endregion
//發電流量
function getElectricityStationData_WaterPage(){
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getElectricityStationData_WaterPage",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function(msg) {
            var data01 = msg["getElectricityStationData_WaterPage_shimen1"];
            var data02 = msg["getElectricityStationData_WaterPage_shimen2"];
            
            var val01 = 0;
            var val02 = 0;
            var data_time01 = '';
            var data_time02 = '';
            var total = 0;
            var data_time = '';
            var realtimeData;
            
            if (data01.length > 0 && data01[0]["data_time"] !== null) {
                val01 = parseFloat((data01[0]["water_use"]).toFixed(2));
                data_time01 = data01[0]["data_time"];
            }
            if (data02.length > 0 && data02[0]["data_time"] !== null) {
                val02 = parseFloat((data02[0]["water_use"]).toFixed(2));
                data_time02 = data02[0]["data_time"];
            }
            total = val01 + val02;

            if (data_time01 !== '' && data_time02 !== '') {
                realtimeData = new Date(data_time01) >= new Date(data_time02) ? data_time01 : data_time02;
                data_time = "(" + realtimeData.substring(11, 13) + ":" + realtimeData.substring(14, 16) + ")";
            }else if (data_time01 !== '') {
                data_time = "(" + data_time01.substring(11, 13) + ":" + data_time01.substring(14, 16) + ")";
                realtimeData = data_time01;
            }else if(data_time02 !== ''){
                data_time = "(" + data_time02.substring(11, 13) + ":" + data_time02.substring(14, 16) + ")";
                realtimeData = data_time02;
            }else{
                data_time = "(--:--)";
            }

            if (realtimeData == undefined || checkDataTimeIsOverdue(new Date(realtimeData))) {
                //即時水情資料沒有進來或異常超過30分鐘，就顯示 "0" & 當下時間
                // $("#shihmenRealtimeFlowIn_Electricity").html("--");
                // $(".shihmenRealtimeFlowIn_Electricity_timeMm").html("(--:--)");
                // 2021 12 14 發電沒資料：數值顯示0.00、時間顯示當下時間。
                $("#shihmenRealtimeFlowIn_Electricity").html("0.00");
                var date = new Date();
                var time = "(" + date.getHours().toString().padStart(2,"0") + ":" + date.getMinutes().toString().padStart(2,"0") + ")";
                $(".shihmenRealtimeFlowIn_Electricity_timeMm").html(time);
            }else{
                $("#shihmenRealtimeFlowIn_Electricity").countTo({
                    from: 0,
                    to: total,
                    speed: 1500,
                    decimals: 2,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });
                $(".shihmenRealtimeFlowIn_Electricity_timeMm").html(data_time);
            }
            
        },
        error: function(e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function checkBaoCustomDate(sDate, eDate){
    var RtString = '';

    // 各資料項目的最早時間
    // 100/12/31      104/05/31        106/06/06        106/11/13         108/06/20
    // |-----------------|-----------------|----------------|------------------|
    // 水位            雨量              隆恩堰            流量               蓄水量
    var DayEarly = new Date(2011, 11, 31);
    var StageEarly = new Date(2011, 11, 31);
    var RainEarly = new Date(2015, 4, 31);
    var LonNEarly = new Date(2017,5, 6);
    var FlowEarly = new Date(2017, 10, 13);
    var ContainEarly = new Date(2019, 5, 20);


    if (sDate < RainEarly.getTime() || eDate < RainEarly.getTime())
        RtString += '、104/05/31以前無雨量';
    
    if (sDate < LonNEarly.getTime() || eDate < LonNEarly.getTime())
        RtString += '、106/06/06以前無隆恩堰';

    if (sDate < FlowEarly.getTime() || eDate < FlowEarly.getTime())
        RtString += '、106/11/13以前無流量';

    if (sDate < ContainEarly.getTime() || eDate < ContainEarly.getTime())
        RtString += '、108/06/20以前無蓄水量';


    return RtString !== '' ? RtString.substring(1) + '資料' : '';
}