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

//Init
dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
    getWaterDetail4Shihmen("");
    getWaterDetail4Baoshan("");
    getCCTV();

    countSpeed();
}

// bind event
function bindEvent() 
{
    StockChart[0] = [];
    StockChart[1] = [];

    $("#myTab>li").off().on("click",function(){
        if($(this).find("a").attr("id")=="tab3-tab")
        {
            $("#a_date").hide();
            $("#c_date").hide();
            $("#b_date").show();
            zIndex = 1;
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
            zIndex = 0;
        }

        if ($(this).find("a").attr("id") == "tab1-tab" || $(this).find("a").attr("id") == "tab3-tab")
        {
            $("#realtimeStageValue").html("0.0");
            if ($(this).find("a").attr("id") == "tab1-tab") {
                $("#realtimeBao").html("石門");
                
                $.ajax({
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
                });
            }
            else {
                $("#realtimeBao").html("寶二");
                $.ajax({
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
                });
            }

            if($('#btnBack').css('display') == 'none')
                $("#realtimeStage").show();
            
        }
        else {
            $("#realtimeStage").hide();
        }

        if ($(this).find("a").attr("id") == "tab1-tab" || $(this).find("a").attr("id") == "tab2-tab" || $(this).find("a").attr("id") == "tab3-tab") {
            $("#timeicon").removeClass("glyphicon glyphicon-time");
            $("#timeicon").addClass("glyphicon glyphicon-calendar");
        }
        else {
            $("#timeicon").removeClass("glyphicon glyphicon-calendar");
            $("#timeicon").addClass("glyphicon glyphicon-time");
            $("#timeblock").off()
        }

    });
    
    $("#timeblock").off().on("click", function(){
    });

    $("#sSDateText").off().on("click", function () {
        $('#sSDate').datetimepicker('show');
    });


    $("#clear").off().on("click", function () {
        $('#sSDateText').val("");
    });

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
    });

    $("#search").off().on("click", function () {
        if ($('#sSDateText').val() == "" || $('#sEDateText').val() == "")
            alert("請選擇日期");
        else {
            $("#a_date").html($('#sSDateText').val());
            var str = (parseInt($('#sSDateText').val().substring(0, 3)) + 1911) + $('#sSDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            getWaterDetail4Shihmen(str);
            getWaterDetail4Baoshan(str);

            $("#realtimeStage").hide();
            $("#btnLineShimen").hide();
            $("#btnLineBaoW").hide();
            $("#btnLineBaoC").hide();
            
            $("#btnBack").show();
            

            $("#timeicon").click();
        }
    });

    $("#btnBack").off().on("click", function () {
        $("#realtimeStage").show();
        $("#btnLineShimen").show();
        $("#btnLineBaoW").show();
        $("#btnLineBaoC").show();

        $("#btnBack").hide();

        getWaterDetail4Shihmen("");
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

    $("#btnLineShimen").off().on("click", function () {
        $("#pageFirst").toggle();
        $("#pageFourth").toggle();
        $("#stationW").html("");
        $("#stationC").html("");
        $("#picA").empty();
        $("#picB").empty();
        $("#lightArea").show();
        doAjax("getShimenHLine", "", getShimenHLine);
        doAjax("getShimenHLineCAPACITY", "", getShimenHLineCAPACITY);
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

    $("#btnXXX").off().on("click", function () {
        $("#pageFive").hide();
        $("#pageFirst").show();
    });

    var proto = Highcharts.Chart.prototype;
    proto.zoomToD = function (delta) {
        var y = new Date().getFullYear();
        var m = new Date().getMonth() - delta;
        if (m < 0)
            m = 0;
        var chartMin = Date.UTC(y, m, 1);
        var chartMax = new Date().getTime();
        if (delta == 11)
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
    proto.zoom3m = function () {
        return this.zoomToD(2);
    };
    proto.zoom6m = function () {
        return this.zoomToD(5);
    };
    proto.zoom1y = function () {
        return this.zoomToD(11);
    };

    $('.zoom_controls a').click(function (e) {
        e.preventDefault();
        var call = 'zoom' + $(this).attr('data-range');
        if ($(this).attr('data-chart') == "search")
            xIndex = $(this).attr('data-index');
        StockChart[zIndex][xIndex][call]();
        $(this).parent().children("a").removeClass('active');
        $(this).addClass('active');

    });
}



// getData Function
function getWaterDetail4Shihmen(date) {
    var action = "X?sid=0&date=" + date;
    var specificdate = getParameterByName("date");
    if (specificdate != null && specificdate != "")
        action = "Date?sid=0&date=" + specificdate;

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getWaterDetailManagement" + action,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function(msg) {
            var data = msg["getWaterDetailManagement"][0];
            var decimals2Arr = ["SM_LEVEL", "HC_LEVEL", "CC_LEVEL", "YS_LEVEL"];

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
                    $("span[class='" + key + "']").countTo({
                        from: 0,
                        to: objV,
                        speed: 1500,
                        decimals: decimalsVal,
                        refreshInterval: 50,
                        onComplete: function(value) {
                            console.debug(this);
                            $(this).html(commafy(value.toFixed(decimalsVal)));
                        }
                    });
                } else {
                    $("span[class='" + key + "']").html("--");
                }
            });

            date = data["minusOneDay"];
            $("#a_date").html("資料區間: " + (date.substring(0, 4) - 1911) + "年" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日 00時~24時");

            //----------------------石門水情----------------------//

            // 分層取水工
            toCount("span[class='SMGET_Layer']", countValue(data, ["SMGET_layerDIV2", "SMGET_layerCSIST", "SMGET_layerCPC", "SMGET_layerSMIA", "SMGET_layerTYIA"]));
            // 石門大圳
            toCount("span[class='SMGET_Sz']", countValue(data, ["SMGET_szDIV2", "SMGET_szCSIST", "SMGET_szSMIA"]), function () {
                // 農業
                toCount("span[class='SMGET_ALL']", countValue(data, ["SMGET_szDIV2", "SMGET_szCSIST", "SMGET_szSMIA", "SMGET_Layer"]));
            });
            //放水量
            toCount("span[class='SM_OutflowALL']", countValue(data, ["SM_POWER", "SM_PRO", "SM_OTHER"]));

            // 入流量
            toCount("span[class='HCINPUT_ALL']", countValue(data, ["SM_POWER", "SM_PRO", "SM_OTHER"]));

            // 桃園大圳
            toCount("span[class='HC_TAO']", countValue(data, ["HCGET_tzDIV2", "HCGET_tzCSIST", "HCGET_tzCPC", "HCGET_tzTYIA"]), function () {
                // 取出水量
                toCount("span[class='HCGET_ALL']", countValue(data, ["HCGET_tzDIV2", "HCGET_tzCSIST", "HCGET_tzCPC", "HCGET_tzTYIA", "HCGET_pumpDIV2", "HCGET_xz"]));
            });

            // 沖刷道放流(計量)
            toCount("span[class='HC_OutflowQuan']", countValue(data, ["HC_TYIA", "HC_CCWEIR", "YSGET_DIV2", "YSGET_DIV12"]), function () {
                // 放水量
                toCount("span[class='HC_OutflowALL']", countValue(data, ["HC_TYIA", "HC_CCWEIR", "YSGET_DIV2", "YSGET_DIV12", "HC_Overflow", "HC_OutflowGate"]));
            });

            // 中庄調整池
            toCount("span[class='CCGET_ALL']", countValue(data, ["CCGET_DIV2", "CCGET_DIV12"]));

            // 取出水量
            toCount("span[class='YSGET_ALL']", countValue(data, ["YSGET_DIV12", "PUB_DIV12_uncontrol", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol"]));

            // 水公司十二區處(板新)
            toCount("span[class='YSGET_DIV12 T']", countValue(data, ["YSGET_DIV12", "PUB_DIV12_uncontrol"]));

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
                toCount("span[class='CC_GETJK']", countValue(data, ["SMGET_layerCPC", "HCGET_tzCPC", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST"]), function () {
                    // 帳面總共
                    toCount("span[class='billAll']", countValue(data, ["SMGET_layerSMIA", "SMGET_szSMIA", "SMGET_layerTYIA", "HCGET_tzTYIA", "HCGET_xz", "HC_TYIA", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "YSGET_DIV2", "CCGET_DIV12", "YSGET_DIV12", "SMGET_layerCPC", "HCGET_tzCPC", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST"]));
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

            // 支援支援水公司二區處
            toCount("span[class='AGRI_SMsupplyDIV2']", countValue(data, ["-AGRI_SMsupplyDIV2"]));
            toCount("span[class='AGRI_SMsupplyDIV2 G']", countValue(data, ["AGRI_SMsupplyDIV2"]));
            
            // 支援二區處
            toCount("span[class='PUB_DIV12support']", countValue(data, ["-PUB_DIV12support"]));
            toCount("span[class='PUB_DIV12support positive']", countValue(data, ["PUB_DIV12support"]));

            // 實際
            // 水公司12
            toCount("span[class='CCGET_U']", countValue(data, ["CCGET_DIV12", "YSGET_DIV12", "PUB_DIV12_uncontrol"]));
            toCount("span[class='PUB_DIV12pumpYS']", countValue(data, ["PUB_DIV12_DAMsupply", "PUB_DIV12_uncontrol"]));

            // 水公司2
            // 水庫取水
            toCount("span[class='CCGET_16910']", countValue(data, ["SMGET_layerDIV2", "SMGET_szDIV2", "-HCGET_tzDIV2", "HCGET_pumpDIV2"]));
            // 鳶山堰(抽水)
            toCount("span[class='PUB_DIV2pumpYS']", countValue(data, ["PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol"]));
            toCount("span[class='CCGET_T']", countValue(data, ["SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2"]), function () {
                // 公共給水
                toCount("span[class='CCGET_TU']", countValue(data, ["CCGET_DIV12", "YSGET_DIV12", "PUB_DIV12_uncontrol", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2"]));
            });

            // 實際
            // 中山科
            toCount("span[class='CC_GETP']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST"]));

            // 中油
            toCount("span[class='CC_GETQ']", countValue(data, ["SMGET_layerCPC", "HCGET_tzCPC"]));

            //華亞科
            toCount("span[class='CC_GETRLIST']", countValue(data, ["AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD"]), function () {
                // 個別工業
                toCount("span[class='CC_GETPQRSTU']", countValue(data, ["SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD"]), function () {
                    // 帳面總共
                    toCount("span[class='realAll']", countValue(data, ["SMGET_layerTYIA", "HCGET_xz", "HC_TYIA", "HCGET_tzTYIA", "-AGRI_TYsupplyDIV2", "-AGRI_TYsupplyHYK", "-AGRI_TYsupplyNYK", "-AGRI_TYsupplyTK", "-AGRI_TYsupplyYD", "SMGET_layerSMIA", "SMGET_szSMIA", "-AGRI_SMsupplyDIV2", "CCGET_DIV12", "YSGET_DIV12", "PUB_DIV12_uncontrol", "SMGET_layerDIV2", "SMGET_szDIV2", "HCGET_pumpDIV2", "HCGET_tzDIV2", "CCGET_DIV2", "PUB_DIV2_DAMsupply", "PUB_DIV2_uncontrol", "AGRI_SMsupplyDIV2", "AGRI_TYsupplyDIV2", "SMGET_layerCSIST", "SMGET_szCSIST", "HCGET_tzCSIST", "SMGET_layerCPC", "HCGET_tzCPC", "AGRI_TYsupplyHYK", "AGRI_TYsupplyNYK", "AGRI_TYsupplyTK", "AGRI_TYsupplyYD"]));
                });
            });

            // 處理上升下降
            var dataYesterday = msg["getWaterDetailManagement"][1];

            var compareValueArr = ["SM_LEVEL", "SM_CAPACITY", "HC_LEVEL", "HC_CAPACITY", "CC_LEVEL", "CC_CAPACITY", "YS_LEVEL", "YS_CAPACITY"];
            var comparePointArr = [2, 1, 2, 1, 2, 1, 2, 1];

            for (var i = 0; i < compareValueArr.length; i++) {
                var value = data[compareValueArr[i]] - dataYesterday[compareValueArr[i]];
                $("#d_" + compareValueArr[i]).countTo({
                    from: 0,
                    to: value,
                    speed: 1500,
                    decimals: comparePointArr[i],
                    refreshInterval: 50,
                    onComplete: function(value) {
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

    $("#realtimeStageValue").html("0.0");
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getRealStageShemen",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            $("#realtimeStageValue").html(msg["getRealStageShemen"][0]["Shemen"] != null ? msg["getRealStageShemen"][0]["Shemen"] : 0.0);
            $("#realtimeStageValueMm").html("(" + msg["getRealStageShemen"][0]["InDate"].substring(11, 13)+":" + msg["getRealStageShemen"][0]["InDate"].substring(14, 16)+")");
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
        url: serviceURL + "/getWraNBData.asmx/getWaterDetailManagementX" + action,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function(msg) {
            var data = msg["getWaterDetailManagement"][0];
            var decimals2Arr = ["stage", "stage_Baoshan"];
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
                    $("#Baoshan" + key).countTo({
                        from: 0,
                        to: objV,
                        speed: 1500,
                        decimals: decimalsVal,
                        refreshInterval: 50,
                        onComplete: function(value) {
                            console.debug(this);
                        }
                    });
                } else {
                    $("#Baoshan" + key).html("--");
                }
            });

            b_date = data["minusOneDay"];
            $("#b_date").html("資料區間: " + (b_date.substring(0, 4) - 1911) + "年" + b_date.substring(5, 7) + "月" + b_date.substring(8, 10) + "日 00時~24時");

            // 竹東圳取水
            toCount("#BaoshanA12", countValue(data, ["SHANGPING_irrigation", "SHANGPING_watercom", "SHANGPING_watercomYD"]));
            // 取出水量
            toCount("#BaoshansupplyFlow_BaoEr", countValue(data, ["supply_BaoWater", "supply_KEZIHU"]));
            // 寶山水庫
            toCount("#Baoshanretain_Baoshan", countValue(data, ["retain_Baoshan"]));
            toCount("#BaoshanretainRate_Baoshan", countValue(data, ["retainRate_Baoshan"]));
            toCount("#Baoshaninflow_Baoshan", countValue(data, ["inflow_Baoshan"]));
            toCount("#BaoshansupplyFlow_Baoshan", countValue(data, ["supplyFlow_Baoshan"]));
            //寶二+寶山
            toCount("#BaoshanCOMBINE_Retain", countValue(data, ["retain", "retain_Baoshan"]));
            toCount("#BaoshanCOMBINE_RetainRate", (countValue(data, ["retain", "retain_Baoshan"]) / 3650.68) * 100);
            toCount("#BaoshanCOMBINE_Inflow", countValue(data, ["inflow", "inflow_Baoshan"]));
            toCount("#BaoshanCOMBINE_Supplyflow", countValue(data, ["supply_BaoWater", "supply_KEZIHU", "supplyFlow_Baoshan"]));

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

function getShimenHLine(msg)
{
    var date = new Date();
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

    for (var i = 0; i < data5.length; i++) {
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d)), parseFloat(data5[i].SM_LEVEL.toFixed(2))]);
    }

    for (var i = 0; i < data1.length; i++) {
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d)), parseFloat(data1[i].SM_LEVEL.toFixed(2))]);
    }

    for (var i = 0; i < datat.length; i++) {
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d)), parseFloat(datat[i].SM_LEVEL.toFixed(2))]);
    }

    for (var i = 0; i < dataw.length; i++) {
        timeblockwuy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].u)]);
        timeblockwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].ud)]);
        timeblockwwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].wd)]);
    }

    StockChart[0][0] = Highcharts.StockChart({
        chart: {
            renderTo: 'picA',
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
            min: 210,
            max: 250,
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
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
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
        }]
    });
}

function getShimenHLineCAPACITY(msg) {
    var date = new Date();
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
    var timeblockr = [];

    for (var i = 0; i < data5.length; i++) {
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d)), parseFloat((data5[i].SM_CAPACITY/100).toFixed(2))]);
    }

    for (var i = 0; i < data1.length; i++) {
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d)), parseFloat((data1[i].SM_CAPACITY/100).toFixed(2))]);
    }

    for (var i = 0; i < datat.length; i++) {
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d)), parseFloat((datat[i].SM_CAPACITY/100).toFixed(2))]);
    }

    for (var i = 0; i < dataw.length; i++) {
        timeblockg.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].g / 100)]);
        timeblocky.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].y / 100)]);
        timeblocko.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].o / 100)]);
        timeblockr.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].r / 100)]);
    }

    StockChart[0][1] = Highcharts.StockChart({
        chart: {
            renderTo: 'picB',
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
        yAxis: [{ // Primary yAxis
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
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
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
        }]
    });
}

function getBaoHLine(msg) {
    var date = new Date();
    var data5 = msg["getBaoHLine5y"];
    var data1 = msg["getBaoHLineLast"];
    var datat = msg["getBaoHLineThis"];
    var dataw = msg["getBaoHLineWarning"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];
    var timeblockwdy = [];
    var timeblockwwdy = [];

    for (var i = 0; i < data5.length; i++) {
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d)), parseFloat(data5[i].stage.toFixed(2))]);
    }

    for (var i = 0; i < data1.length; i++) {
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d)), parseFloat(data1[i].stage.toFixed(2))]);
    }

    for (var i = 0; i < datat.length; i++) {
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d)), parseFloat(datat[i].stage.toFixed(2))]);
    }
    /*
    for (var i = 0; i < dataw.length; i++) {
        timeblockwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].ud)]);
        timeblockwwdy.push([Date.UTC(date.getFullYear(), parseInt(dataw[i].m) - 1, parseInt(dataw[i].d)), parseFloat(dataw[i].wd)]);
    }*/

    StockChart[1][0] = Highcharts.StockChart({
        chart: {
            renderTo: 'picA',
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
        yAxis: [{ // Primary yAxis
            min: 120,
            max: 155,
            tickInterval: 5,
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
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
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
        }]
    });
}

function getBaoHLineCAPACITY(msg) {
    var date = new Date();
    var data5 = msg["getBaoHLineCAPACITY5y"];
    var data1 = msg["getBaoHLineCAPACITYLast"];
    var datat = msg["getBaoHLineCAPACITYThis"];

    var timeblock5y = [];
    var timeblock1y = [];
    var timeblockty = [];

    for (var i = 0; i < data5.length; i++) {
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d)), parseFloat((data5[i].retain/100).toFixed(2))]);
    }

    for (var i = 0; i < data1.length; i++) {
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d)), parseFloat((data1[i].retain/100).toFixed(2))]);
    }

    for (var i = 0; i < datat.length; i++) {
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d)), parseFloat((datat[i].retain / 100).toFixed(2))]);
    }

    StockChart[1][1] = Highcharts.StockChart({
        chart: {
            renderTo: 'picB',
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
        yAxis: [{ // Primary yAxis
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
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
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
        }]
    });
}

function getBao3HLineCAPACITY(msg) {
    var date = new Date();
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

    for (var i = 0; i < data5.length; i++) {
        timeblock5y.push([Date.UTC(date.getFullYear(), parseInt(data5[i].m) - 1, parseInt(data5[i].d)), parseFloat((data5[i].retain/100).toFixed(2))]);
    }

    for (var i = 0; i < data1.length; i++) {
        timeblock1y.push([Date.UTC(date.getFullYear(), parseInt(data1[i].m) - 1, parseInt(data1[i].d)), parseFloat((data1[i].retain/100).toFixed(2))]);
    }

    for (var i = 0; i < datat.length; i++) {
        timeblockty.push([Date.UTC(date.getFullYear(), parseInt(datat[i].m) - 1, parseInt(datat[i].d)), parseFloat((datat[i].retain / 100).toFixed(2))]);
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
        yAxis: [{ // Primary yAxis
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
            color: '#4169BC',
            data: timeblock5y,
            tooltip: {
                headerFormat: '{point.x:%Y/%m/%d}<br/>',
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
        }]
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
            if (data[values[i]] != null && data[values[i]] != "")
                val += parseFloat(data[values[i]].toFixed(1));
            else
                nullCnt++;
        } else {
            if (data[values[i].substring(1)] != null && data[values[i].substring(1)] != "")
                val -= parseFloat(data[values[i].substring(1)].toFixed(1));
            else
                nullCnt++;
        }
    }

    if (values.length == nullCnt)
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
                    goDetailPageCCTV(event.data.cid);
                });
                if (msg["getCCTV"][i]["reservoirID"] == "0")
                    $("#ReservoirA").append(htmlText);
                else if (msg["getCCTV"][i]["reservoirID"] == "1")
                    $("#ReservoirB").append(htmlText);
                else if (msg["getCCTV"][i]["reservoirID"] == "2")
                    $("#ReservoirC").append(htmlText);
                else
                    $("#ReservoirD").append(htmlText);
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function goDetailPageCCTV(cid) {
    $("#btnRT3").off().on("click", function () {
        clearInterval(timerId);
        $("#repeatImg > img").attr("src", "");
        $("#pageFirst").show();
        $("#pageSixth").hide();
    });
    $("#pageFirst").hide();
    $("#pageSixth").show();
    var index = 0;
    clearInterval(timerId);
    function repeatImage() {
        if (index > 9)
            index = 0;
        $("#repeatImg > img").attr("src", serviceURL + "/camera/" + cid + "/" + (index) + ".jpg");
        index++;
    }

    var timerId = setInterval(repeatImage, 1000);

}
