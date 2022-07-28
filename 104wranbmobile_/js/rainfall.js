// params
var now_indate, now_avgFall, now_shemen, now_clouds, now_high, now_bar, now_scrunch, now_jade, now_white, now_burg, now_west, now_mere;
var indate, avgFall, shemen, clouds, high, bar, scrunch, jade, white, burg, west, mere;
var yd_indate, yd_avgFall, yd_shemen, yd_clouds, yd_high, yd_bar, yd_scrunch, yd_jade, yd_white, yd_burg, yd_west, yd_mere;
var initVal = "--";
var nullStation = [];
var nullStationX = [[], [], [], [], [], [], [], []];
var StockChart = [];
var specificdate = getParameterByName("date");
var specifictime = getParameterByName("time");
var action = "";
var tabIndex = 0;

// var timeblockYearPV = []; // nicholas (石門)
var ShementimeblockYearPV = []; // nicholas (石門)
var SanXiatimeblockYearPV = []; // 三峽
var YuanShantimeblockYearPV = []; // 鳶山
var TaoGuantimeblockYearPV = []; // 桃灌
var ShihGuantimeblockYearPV = []; // 石灌
var ShangPingtimeblockYearPV = []; // 上坪堰
var LonNtimeblockYearPV = []; // 隆恩堰

//雲圖
var tempD1 = [];
var tempD2 = [];
var tempR1 = [];//一日
var tempR2 = [];//二日
var tempR3 = [];//三日
var tempS1 = [];
var tempS2 = [];
var tempS3 = [];
var tempC1 = [];
var tempC2 = [];
var tempC3 = [];
var IskeepGO = false;//D
var keepGo = 0;//D
var IskeepGO_R = false;//R
var keepGo_R = 0;//R
var IskeepGO_C = false;//C
var keepGo_C = 0;//C
var IskeepGO_S = false;//S
var keepGo_S = 0;//S
var IskeepGO_RF = false;//6小時降雨預報
var keepGo_RF = 0;//6小時降雨預報
var DtimerId = null;
var RtimerId = null;
var CtimerId = null;
var StimerId = null;
var RFtimerId = null;//6小時降雨預報

var TyphoonWarning = {};

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
    getRainFall(0);

    if (specificdate != null && specificdate != "")
        action = "TestDate?date=" + specificdate;
    doAjax("getRainDataAnalysisAll" + action, {}, getRainDataAnalysisAll); //DayRAList // 今日/本月/當年 集水區平均雨量
    doAjax("getTyphoonWarning", {} , getTyphoonWarning);//載入颱風事件清單
    //doAjax("getRainDataAnalysisAllRainfallList" + action, {}, getRainDataAnalysisAll); //RainfallList

    // 2021 05 24 因效能問題，不預先載入
    // doAjax("getRainDataShangPingAnalysisAll", {}, getRainDataShangPingAnalysisAll);
    // doAjax("getRainDataSanXiaAnalysisAll", {}, getRainDataSanXiaAnalysisAll);
    // doAjax("getRainDataYuanShanAnalysisAll", {}, getRainDataYuanShanAnalysisAll);
    // doAjax("getRainDataTaoGuanAnalysisAll", {}, getRainDataTaoGuanAnalysisAll);
    // doAjax("getRainDataShihGuanAnalysisAll", {}, getRainDataShihGuanAnalysisAll);

    setInterval(reloadData, 10 * 60 * 1000);

    countSpeed();
    $("#rainFallList > li").on("click", function () { getRainFall($(this).attr("value")); doAjax("getRainDataAnalysisAll" + action, {}, getRainDataAnalysisAll); $("#shemen-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#shemen_thisMonth_btn").addClass("active"); }); //DayRAList
    //$("#rainFallList > li").on("click", function () { getRainFall($(this).attr("value")); doAjax("getRainDataAnalysisAllRainfallList" + action, {}, getRainDataAnalysisAll); }); //RainfallList
    $("#rainFallList1 > li").on("click", function () { getRainFallDataGov(1, $(this).attr("value")); doAjax("getRainDataSanXiaAnalysisAll", {}, getRainDataSanXiaAnalysisAll); $("#sanxia-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#sanxia_thisMonth_btn").addClass("active"); });
    $("#rainFallList2 > li").on("click", function () { getRainFallDataGov(2, $(this).attr("value")); doAjax("getRainDataYuanShanAnalysisAll", {}, getRainDataYuanShanAnalysisAll); $("#yuanshan-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#yuanshan_thisMonth_btn").addClass("active"); });
    $("#rainFallList3 > li").on("click", function () { getRainFallDataGov(3, $(this).attr("value")); doAjax("getRainDataTaoGuanAnalysisAll", {}, getRainDataTaoGuanAnalysisAll); $("#taoguan-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#taoguan_thisMonth_btn").addClass("active") });
    $("#rainFallList4 > li").on("click", function () { getRainFallDataGov(4, $(this).attr("value")); doAjax("getRainDataShihGuanAnalysisAll", {}, getRainDataShihGuanAnalysisAll); $("#shihguan-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#shihguan_thisMonth_btn").addClass("active"); });
    $("#rainFallList5 > li").on("click", function () { getRainFallDataGov(5, $(this).attr("value")); doAjax("getRainDataShangPingAnalysisAll", {}, getRainDataShangPingAnalysisAll); $("#shangping-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#shangping_thisMonth_btn").addClass("active"); });
    $("#rainFallList6 > li").on("click", function () { getRainFallDataGov(6, $(this).attr("value")); doAjax("getRainDataLonNAnalysisAll", {}, getRainDataLonNAnalysisAll); $("#lonn-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#lonn_thisMonth_btn").addClass("active"); }); // 隆恩堰
    $("#myTab > li").eq(0).off().on("click", function () { getRainFall(0); tabIndex = 0; $("#timeicon").attr("class", "glyphicon glyphicon-search"); doAjax("getRainDataAnalysisAll" + action, {}, getRainDataAnalysisAll); $("#shemen-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#shemen_thisMonth_btn").addClass("active"); }); //DayRAList
    //$("#myTab > li").eq(0).off().on("click", function () { getRainFall(0); tabIndex = 0; $("#timeicon").attr("class", "glyphicon glyphicon-search"); doAjax("getRainDataAnalysisAllRainfallList" + action, {}, getRainDataAnalysisAll); }); //RainfallList
    $("#myTab > li").eq(1).off().on("click", function () { getRainFallDataGov(1, 0); tabIndex = 1; closeTimeBlock(); $("#timeicon").attr("class", "glyphicon glyphicon-calendar"); doAjax("getRainDataSanXiaAnalysisAll", {}, getRainDataSanXiaAnalysisAll); $("#sanxia-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#sanxia_thisMonth_btn").addClass("active"); /*顯示本月按鈕*/ });
    $("#myTab > li").eq(2).off().on("click", function () { getRainFallDataGov(2, 0); tabIndex = 2; closeTimeBlock(); $("#timeicon").attr("class", "glyphicon glyphicon-calendar"); doAjax("getRainDataYuanShanAnalysisAll", {}, getRainDataYuanShanAnalysisAll); $("#yuanshan-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#yuanshan_thisMonth_btn").addClass("active"); /*顯示本月按鈕*/ });
    $("#myTab > li").eq(3).off().on("click", function () { getRainFallDataGov(3, 0); tabIndex = 3; closeTimeBlock(); $("#timeicon").attr("class", "glyphicon glyphicon-calendar"); doAjax("getRainDataTaoGuanAnalysisAll", {}, getRainDataTaoGuanAnalysisAll); $("#taoguan-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#taoguan_thisMonth_btn").addClass("active");/*顯示本月按鈕*/ });
    $("#myTab > li").eq(4).off().on("click", function () { getRainFallDataGov(4, 0); tabIndex = 4; closeTimeBlock(); $("#timeicon").attr("class", "glyphicon glyphicon-calendar"); doAjax("getRainDataShihGuanAnalysisAll", {}, getRainDataShihGuanAnalysisAll); $("#shihguan-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#shihguan_thisMonth_btn").addClass("active");/*顯示本月按鈕*/ });
    $("#myTab > li").eq(6).off().on("click", function () { getRainFallDataGov(5, 0); tabIndex = 5; $("#timeicon").attr("class", "glyphicon glyphicon-search"); doAjax("getRainDataShangPingAnalysisAll", {}, getRainDataShangPingAnalysisAll); $("#shangping-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#shangping_thisMonth_btn").addClass("active");/*顯示本月按鈕*/ });
    // 隆恩堰
    // $("#myTab > li").eq(5).off().on("click", function () {  alert('123') });
    $("#myTab > li").eq(5).off().on("click", function () { getRainFallDataGov(6, 0); tabIndex = 8;  closeTimeBlock(); $("#timeicon").attr("class", "glyphicon glyphicon-calendar"); doAjax("getRainDataLonNAnalysisAll", {}, getRainDataLonNAnalysisAll); $("#lonn-range-text").html('本月集水區平均雨量累計'); $('.zoom_controls a').removeClass('active'); $("#lonn_thisMonth_btn").addClass("active");/*顯示本月按鈕*/ });

    $("#myTab > li").eq(7).off().on("click", function () { tabIndex = 6; $("#timeicon").attr("class", "glyphicon glyphicon-calendar");  
    var sDate =  new Date().addHours(-24);
    var eDate =  new Date();
    // formate : yyyy-MM-dd HH:00
    // // debugger;
    // render & init
    for (let i = 0; i <= 23; i++) { // 0 ~ 23
        $('.CDsHours').append(`<option value='${i.toString().padStart(2,"0")}'>${i.toString().padStart(2,"0")}</option>`);
        $('.CDeHours').append(`<option value='${i.toString().padStart(2,"0")}'>${i.toString().padStart(2,"0")}</option>`);
    }
    // 日期
    // $('.CDsDateText').val(`${sDate.getFullYear()}/${(sDate.getMonth()+1).toString().padStart(2,"0")}/${(sDate.getDate()).toString().padStart(2,"0")}`);
    // $('.CDeDateText').val(`${eDate.getFullYear()}/${(eDate.getMonth()+1).toString().padStart(2,"0")}/${(eDate.getDate()).toString().padStart(2,"0")}`);
    $('.CDsDateText').val(time2formateByCloud(sDate).substring(0,10));
    $('.CDeDateText').val(time2formateByCloud(eDate).substring(0,10));

    // 時間
    $('.CDsHours > option').each(function(){
        var sHour = $(this).text();
        if(sHour == sDate.getHours())
        $('.CDsHours').val(sHour).change();
    });    
    $('.CDeHours > option').each(function(){
        var eHour = $(this).text();
        if(eHour == eDate.getHours())
        $('.CDeHours').val(eHour).change();
    });
    
    // var new_sDate = `${sDate.getFullYear()}-${ (sDate.getMonth()+1).toString().padStart(2,"0") }-${ (sDate.getDate()).toString().padStart(2,"0")} ${sDate.getHours().toString().padStart(2,"0")}:00`;
    // var new_eDate = `${eDate.getFullYear()}-${ (eDate.getMonth()+1).toString().padStart(2,"0") }-${ (eDate.getDate()).toString().padStart(2,"0")} ${ (eDate.getHours()+1).toString().padStart(2,"0")}:00`;
    var new_sDate = time2formateByCloud(sDate);
    var new_eDate = time2formateByCloud(eDate.addHours(1));
    
    // get data
    doAjax("getCloud", {"type": "" , "subtype": "" , "sDate": new_sDate, "eDate": new_eDate} , getCloud) //getAll
    doAjax("getCloudByRain", {"sDate": new_sDate, "eDate": new_eDate} , getCloudByRain) //getAll

    //Reset All
    clearInterval(DtimerId);clearInterval(RtimerId);clearInterval(CtimerId);clearInterval(StimerId);
    $('#startD').prop('disabled', false);
    $('#stopD').prop('disabled', true);
    $('.Doption').prop('disabled', false);
    //
    $('#startS').prop('disabled', false);
    $('#stopS').prop('disabled', true);
    $('.Soption').prop('disabled', false);
    //
    $('#startR').prop('disabled', false);
    $('#stopR').prop('disabled', true);
    $('.Roption').prop('disabled', false);
    //
    $('#startC').prop('disabled', false);
    $('#stopC').prop('disabled', true);
    $('.Coption').prop('disabled', false);
});

    $("img[class^='rmIcon']").on("click", function (event) {
        toMap("rainfall", $(this).attr("class").split('_')[1], $(this).attr("class").split('_')[2]);
        event.stopPropagation();
    });

    //雲圖相關 Event
    //#region 6小時定量降水預報
    $('#RainForecast').change(function(){
        var valeq =$("#RainForecast option:selected").index();
        var val = $("#RainForecast option:selected").val()

        keepGo_RF = val;

        for (let i = 0; i <= 3 ; i++) {
            if( i == val )
                $('#rainforecast_' + i).show();                
            else
                $('#rainforecast_' + i).hide();
        }
    })
    //播放
    $('#startRF').off().on('click', function(){
        var sec = 1000; // 1s = 1000ms.
        clearInterval(RFtimerId)
        RFtimerId = setInterval(repeatImageRF, sec);

        $('#startRF').prop('disabled', true);
        $('#stopRF').prop('disabled', false);
        $('#RainForecast').prop('disabled', true);

        //停止
        $('#stopRF').off().on('click',function(){
            IskeepGO_RF = true
            clearInterval(RFtimerId)

            $('#startRF').prop('disabled', false);
            $('#stopRF').prop('disabled', true);
            $('#RainForecast').prop('disabled', false);
        })
        
    })
    function repeatImageRF(){
        const limit = 4;
        let i = 1;


        i = keepGo_RF
        if(i >= limit){
            i = 0
            keepGo_RF = i
        }
        for (let k = 0; k <= 3; k++) {
            if(i == k)
                $('#rainforecast_' + k).show()
            else
                $('#rainforecast_' + k).hide()
        }
        $('#RainForecast').val(i);
        i++;
        keepGo_RF++;



        // if(IskeepGO_RF){
        //     i = keepGo_RF
        //     if(i >= limit){
        //         i = 0
        //         keepGo_RF = i
        //     }
        //     for (let k = 1; k <= 4; k++) {
        //         if(i == k)
        //             $('#rainforecast_' + k).show()
        //         else
        //             $('#rainforecast_' + k).hide()
        //     }
        //     i++;
        //     keepGo_RF++;
        // }
        // else{
        //     keepGo_RF = i
        //     if(i >= limit){
        //         i = 0
        //         keepGo_RF = i
        //     }
        //     for (let k = 1; k <= 4; k++) {
        //         if(i == k)
        //             $('#rainforecast_' + k).show()
        //         else
        //             $('#rainforecast_' + k).hide()
        //     }
        //     i++;
        // }
    }
    //#endregion


    //#region 雲圖 - 按鈕相關
    //預設時間
    $('.defaultTime').off().on('click',function(){ 
        debugger;
        var eDate =  new Date();
        var sDate =  new Date().addHours(-24);
        var Place = "";
        // 日期
        $(this).parent().find('.CDsDateText').val(`${sDate.getFullYear()}/${ (sDate.getMonth()+1).toString().padStart(2,"0") }/${(sDate.getDate()).toString().padStart(2,"0")}`);
        $(this).parent().find('.CDeDateText').val(`${eDate.getFullYear()}/${ (eDate.getMonth()+1).toString().padStart(2,"0") }/${(eDate.getDate()).toString().padStart(2,"0")}`);
        // 時間
        $(this).parent().find('.CDsHours').val( sDate.getHours().toString().padStart(2,"0") ).change();
        $(this).parent().find('.CDeHours').val( eDate.getHours().toString().padStart(2,"0") ).change();
        // var new_sDate = `${sDate.getFullYear()}-${ (sDate.getMonth()+1).toString().padStart(2,"0") }-${ (sDate.getDate()).toString().padStart(2,"0")} ${sDate.getHours().toString().padStart(2,"0")}:00`;
        // var new_eDate = `${eDate.getFullYear()}-${ (eDate.getMonth()+1).toString().padStart(2,"0") }-${ (eDate.getDate()).toString().padStart(2,"0")} ${ (eDate.getHours()+1).toString().padStart(2,"0")}:00`;
        var new_sDate = time2formateByCloud(new Date().addHours(-24)).substring(0,13) + ":00";
        var new_eDate = time2formateByCloud(new Date().addHours(1)).substring(0,13) + ":00";
        //
        if ($(this).parent().eq(0).attr('id') == "Rain")
            doAjax("getCloudByRain", {"sDate": new_sDate, "eDate": new_eDate} , getCloudByRain) //getAll
        else
            doAjax("getCloud", {"type": $(this).parent().eq(0).attr('id') , "subtype": "" , "sDate": new_sDate, "eDate": new_eDate} , getCloud) //getAll
        // Reset
        switch ($(this).parent().eq(0).attr('id')) {
            case "Radar":
                Place = "D";
                 $('#D1').show();  $('#D2').hide(); clearInterval(DtimerId); 
                break;
            case "Rain":
                Place = "R";
                $('#R1').show();  $('#R2').hide();  $('#R3').hide();  clearInterval(RtimerId);
                break;
            case "Cloud":
                Place = "C";
                $('#C1').show();  $('#C2').hide();  $('#C3').hide();  clearInterval(CtimerId);
                break;
            case "Sateline":
                Place = "S";
                $('#S1').show();  $('#S2').hide();  $('#S3').hide();  clearInterval(StimerId);
                break;
        }
        //Button & DropdownList
        $('.' + Place + 'option').prop('disabled', false);
        $('#start' + Place).prop('disabled', false);
        $('#stop' + Place).prop('disabled', true);


    });


    //確定
    $('.CDquery').off().on('click',function(){
        debugger;
        var sD = $(this).parent().find('.CDsDateText').val();
        var sH = $(this).parent().find('.CDsHours').val();
        var eD = $(this).parent().find('.CDeDateText').val();
        var eH = $(this).parent().find('.CDeHours').val();
        // var sDate = new Date(sD).addHours(sH);
        // var eDate = new Date(eD).addHours(eH).addHours(1);
        // var new_sDate = `${sDate.getFullYear()}-${ (sDate.getMonth()+1).toString().padStart(2,"0") }-${ (sDate.getDate()).toString().padStart(2,"0")} ${sDate.getHours().toString().padStart(2,"0")}:00`;
        // var new_eDate = `${eDate.getFullYear()}-${ (eDate.getMonth()+1).toString().padStart(2,"0") }-${ (eDate.getDate()).toString().padStart(2,"0")} ${ (eDate.getHours()+1).toString().padStart(2,"0")}:00`;
        var new_sDate = time2formateByCloud(new Date(sD).addHours(sH));
        var new_eDate = time2formateByCloud(new Date(eD).addHours(eH).addHours(1));

        if (new Date(sD).addHours(sH) > new Date(eD).addHours(eH)) {//開始大於結束
            alert('日期錯誤！')
        } 
        else {
            if($(this).parent().eq(0).attr('id') == "Rain")
                doAjax("getCloudByRain", {"sDate": new_sDate, "eDate": new_eDate} , getCloudByRain) //getAll
            else
                doAjax("getCloud", {"type": $(this).parent().eq(0).attr('id') , "subtype": "" , "sDate": new_sDate, "eDate": new_eDate} , getCloud) //getAll
        }
    });
    //#endregion
    
    

    //#region 改裝
    //播放
    $('.CDstart').off().on('click',function(){
        var id = $(this).parent().eq(0).attr('id');
        var Place = "";
        var PlaceId = "";
        $('#' + id).find('.ImgPlace').each(function(){
            if ($(this).css('display') != "none")
                PlaceId = $(this).attr('id');
        });
        
        // debugger;
        
        
        Place = PlaceId.substring(0,1);
        var sec = 1000; // 1s = 1000ms.
        switch (Place) {
            case "D":
                clearInterval(DtimerId);
                DtimerId = setInterval(repeatImageD, sec);
                break;
            case "R":
                clearInterval(RtimerId);
                RtimerId = setInterval(repeatImageR, sec);
                break;
            case "C":
                clearInterval(CtimerId);
                CtimerId = setInterval(repeatImageC, sec);
                break;
            case "S":
                clearInterval(StimerId);
                StimerId = setInterval(repeatImageS, sec);
                break;     
        }
        //按鈕控制
        $('#start' + Place).prop('disabled', true);
        $('#stop' + Place).prop('disabled', false);
        $('.' + Place +'option').prop('disabled', true);

        //停止
        $('#stop' + Place ).off().on('click', function(){
            // debugger;
            switch (Place) {
                case "D":
                    IskeepGO = true;
                    clearInterval(DtimerId);
                    break;
                case "R":
                    IskeepGO_R = true;
                    clearInterval(RtimerId);
                    break;
                case "C":
                    IskeepGO_C = true;
                    clearInterval(CtimerId);
                    break;
                case "S":
                    IskeepGO_S = true;
                    clearInterval(StimerId);
                    break;     
            }

            $('#start' + Place).prop('disabled', false);
            $('#stop' + Place).prop('disabled', true);
            $('.' + Place +'option').prop('disabled', false);
        });

    });
    //下拉
    $('.CDoption').change(function(){
        // debugger;
        
        var id = $(this).parent().eq(0).attr('id');
        var temp;
        var Place = "";
        var PlaceId = "";
        $('#' + id).find('.ImgPlace').each(function(){
            if ($(this).css('display') != "none")
                PlaceId = $(this).attr('id');
        });
        Place = PlaceId.substring(0,1);
        var valeq =$("." + Place  +"option option:selected").index();
        switch (PlaceId) {
            case "D1":
                temp = tempD1;
                IskeepGO = true;
                keepGo = valeq;
                break;
            case "D2":
                temp = tempD2;
                IskeepGO = true;
                keepGo = valeq;
                break;
            case "R1":
                temp = tempR1;
                IskeepGO_R = true;
                keepGo_R = valeq;
                break;
            case "R2":
                temp = tempR2;
                IskeepGO_R = true;
                keepGo_R = valeq;
                break;
            case "R3":
                temp = tempR3;
                IskeepGO_R = true;
                keepGo_R = valeq;
                break;
            case "C1":
                temp = tempC1;
                IskeepGO_C = true;
                keepGo_C = valeq;
                break;
            case "C2":
                temp = tempC2;
                IskeepGO_C = true;
                keepGo_C = valeq;
                break;
            case "C3":
                temp = tempC3;
                IskeepGO_C = true;
                keepGo_C = valeq;
                break;
            case "S1":
                temp = tempS1;
                IskeepGO_S = true;
                keepGo_S = valeq;
                break;
            case "S2":
                temp = tempS2;
                IskeepGO_S = true;
                keepGo_S = valeq;
                break;
            case "S3":
                temp = tempS3;
                IskeepGO_S = true;
                keepGo_S = valeq;
                break;
            
        }

        var val = $(this).val();
        for (let i = 0; i < temp.length; i++) {
            if (temp[i][1] == val) {
                $('#'+ PlaceId +' > img').attr('src', temp[i][0]);
            }
        }

    });

    //下拉選單

    //#endregion

    

    

    //#region 雷達回波圖
    //播放
    // $('#startD').off().on('click', function(){
    //     $('#startD').prop('disabled', true);
    //     $('#stopD').prop('disabled', false);
    //     $('.Doption').prop('disabled', true);
    //     // // debugger;
    //     var PlaceId = "";
    //     var temp ;
    //     if ($('#D1').css('display') != "none") 
    //     {
    //         PlaceId = "D1"
    //         temp = tempD1;
    //     }
    //     else
    //     {
    //         PlaceId = "D2";
    //         temp = tempD2;
    //     }
        
    //     var limit = temp.length;
    //     var i = 0;
    //     clearInterval(DtimerId);
    //     function repeatImage(){
            
    //         if (IskeepGO) {
    //             i = keepGo;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Doption').val(temp[i][1]);
    //             i++;
    //             keepGo++;
    //         }
    //         else
    //         {
    //             keepGo = i;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Doption').val(temp[i][1]);
    //             i++;
    //         }
            
    //     }
    //     DtimerId = setInterval(repeatImage, 1000);


    //     $('#stopD').off().on('click', function(){
    //         IskeepGO = true;
    //         clearInterval(DtimerId);
    //         $('#startD').prop('disabled', false);
    //         $('#stopD').prop('disabled', true);
    //         $('.Doption').prop('disabled', false);
    //     });
    // });
    // 下拉選單
    // $('.Doption').change(function(){
    //     debugger;
    //     var val = $(this).val();
    //     var valeq =$(".Doption option:selected").index();
    //     var PlaceId = "";
    //     // alert(val.replaceAll("/","-"));
    //     // $(this).parents();
    //     if ($('#D1').css('display') != "none") 
    //     {
    //         PlaceId = "D1";
    //         temp = tempD1;
    //     }
    //     else
    //     {
    //         PlaceId = "D2";
    //         temp = tempD2;
    //     }
    //     $('.Doption').val(val);
    //     for (let i = 0; i < temp.length; i++) {
    //         if (temp[i][1] == val) {
    //             $('#'+ PlaceId +' > img').attr('src', temp[i][0]);
    //         }
    //     }
    //     IskeepGO = true;
    //     keepGo = valeq;
    // });
    //鄰近區域
    $('#PlaceD1').on('click', function(){ 
        $('#D1').show(); $('#D2').hide();
        //更新 dropdownlist
        $('.Doption').empty();
        for (let i = 0; i < tempD1.length; i++) {
            var htmlItem = `<option class="itemD" value="${tempD1[i][1]}">${tempD1[i][1]}</option>`;
            $('.Doption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Doption").val(tempD1[tempD1.length-1][1]).change();
        $('#D1 > img').attr('src',tempD1[tempD1.length-1][0]);
        //更新狀態
        // IskeepGO = false;
        IskeepGO = true;
        keepGo = 0;
        //停止
        clearInterval(DtimerId);
        //按鈕狀態reset
        $('#startD').prop('disabled', false);
        $('#stopD').prop('disabled', true);
        $('.Doption').prop('disabled', false);
    });
    //較大範圍
    $('#PlaceD2').on('click', function(){
        // // debugger;
        $('#D2').show(); $('#D1').hide();
        //更新 dropdownlist
        $('.Doption').empty();
        for (let i = 0; i < tempD2.length; i++) {
            var htmlItem = `<option class="itemD" value="${tempD2[i][1]}">${tempD2[i][1]}</option>`;
            $('.Doption').append(htmlItem);
        }
         //更新圖片到最新
         $(".Doption").val(tempD2[tempD2.length-1][1]).change();
         $('#D2 > img').attr('src',tempD2[tempD2.length-1][0]);
        //更新狀態
        // IskeepGO = false;
        IskeepGO = true;
        keepGo = 0;
        //停止
        clearInterval(DtimerId);
        //按鈕狀態reset
        $('#startD').prop('disabled', false);
        $('#stopD').prop('disabled', true);
        $('.Doption').prop('disabled', false);
    });
    //#endregion

    //#region 氣象雲圖
    //播放
    // $('#startC').off().on('click', function(){
    //     $('#startC').prop('disabled', true);
    //     $('#stopC').prop('disabled', false);
    //     $('.Coption').prop('disabled', true);
    //     // // debugger;
    //     var PlaceId = "";
    //     var temp;
    //     if ($('#C1').css('display') != "none") 
    //     {
    //         PlaceId = "C1"
    //         temp = tempC1;
    //     }
    //     else if($('#C2').css('display') != "none")
    //     {
    //         PlaceId = "C2"
    //         temp = tempC2;
    //     }
    //     else
    //     {
    //         PlaceId = "C3"
    //         temp = tempC3;
    //     }
    //     var limit = temp.length;
    //     var i = 0;
    //     clearInterval(CtimerId);
    //     function repeatImage(){
            
    //         if (IskeepGO_C) {
    //             i = keepGo_C;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo_C = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Coption').val(temp[i][1]);
    //             i++;
    //             keepGo_C++;
    //         }
    //         else
    //         {
    //             keepGo_C = i;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo_C = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Coption').val(temp[i][1]);
    //             i++;
    //         }
            
    //     }
    //     CtimerId = setInterval(repeatImage, 1000);


    //     $('#stopC').off().on('click', function(){
    //         IskeepGO_C = true;
    //         clearInterval(CtimerId);
    //         $('#startC').prop('disabled', false);
    //         $('#stopC').prop('disabled', true);
    //         $('.Coption').prop('disabled', false);
    //     });
    // });
    // 下拉選單
    // $('.Coption').change(function(){
    //     // // debugger;
    //     var val = $(this).val();
    //     var valeq =$(".Coption option:selected").index()
    //     // alert(val.replaceAll("/","-"));
    //     // $(this).parents();
    //     if ($('#C1').css('display') != "none") 
    //     {
    //         temp = tempC1;
    //     }
    //     else if($('#C2').css('display') != "none")
    //     {
    //         temp = tempC2;
    //     }
    //     else
    //     {
    //         temp = tempC3;
    //     }
    //     $('.Coption').val(val);
    //     for (let i = 0; i < temp.length; i++) {
    //         if (temp[i][1] == val) {
    //             $('#C1 > img').attr('src', temp[i][0]);
    //         }
    //     }
    //     IskeepGO_C = true;
    //     keepGo_C = valeq;
    // });
    //台灣
    $('#PlaceC1').on('click', function(){ 
        $('#C1').show(); $('#C2').hide(); $('#C3').hide();
        //更新 dropdownlist
        $('.Coption').empty();
        for (let i = 0; i < tempC1.length; i++) {
            var htmlItem = `<option class="itemC" value="${tempC1[i][1]}">${tempC1[i][1]}</option>`;
            $('.Coption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Coption").val(tempC1[tempC1.length-1][1]).change();
        $('#C1 > img').attr('src',tempC1[tempC1.length-1][0]);
        //更新狀態
        // IskeepGO_C = false;
        IskeepGO_C = true;
        keepGo_C = 0;
        //停止
        clearInterval(CtimerId);
        //按鈕狀態reset
        $('#startC').prop('disabled', false);
        $('#stopC').prop('disabled', true);
        $('.Coption').prop('disabled', false);

    });
    //東亞
    $('#PlaceC2').on('click', function(){
        // // debugger;
        $('#C2').show(); $('#C1').hide(); $('#C3').hide();
        //更新 dropdownlist
        $('.Coption').empty();
        for (let i = 0; i < tempC2.length; i++) {
            var htmlItem = `<option class="itemC" value="${tempC2[i][1]}">${tempC2[i][1]}</option>`;
            $('.Coption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Coption").val(tempC2[tempC2.length-1][1]).change();
        $('#C2 > img').attr('src',tempC2[tempC2.length-1][0]);
        //更新狀態
        // IskeepGO_C = false;
        IskeepGO_C = true;

        keepGo_C = 0;
        //停止
        clearInterval(CtimerId);
        //按鈕狀態reset
        $('#startC').prop('disabled', false);
        $('#stopC').prop('disabled', true);
        $('.Coption').prop('disabled', false);

    });
    //全球
    $('#PlaceC3').on('click', function(){
        // // debugger;
        $('#C3').show(); $('#C2').hide(); $('#C1').hide();
        //更新 dropdownlist
        $('.Coption').empty();
        for (let i = 0; i < tempC3.length; i++) {
            var htmlItem = `<option class="itemC" value="${tempC3[i][1]}">${tempC3[i][1]}</option>`;
            $('.Coption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Coption").val(tempC3[tempC3.length-1][1]).change();
        $('#C3 > img').attr('src',tempC3[tempC3.length-1][0]);
        //更新狀態
        // IskeepGO_C = false;
        IskeepGO_C = true;

        keepGo_C = 0;
        //停止
        clearInterval(CtimerId);
        //按鈕狀態reset
        $('#startC').prop('disabled', false);
        $('#stopC').prop('disabled', true);
        $('.Coption').prop('disabled', false);

    });
    //#endregion
    
    //#region 色調強化圖
    //播放
    // $('#startS').off().on('click', function(){
    //     $('#startS').prop('disabled', true);
    //     $('#stopS').prop('disabled', false);
    //     $('.Soption').prop('disabled', true);
    //     // // debugger;
    //     var PlaceId = "";
    //     var temp;
    //     if ($('#S1').css('display') != "none") 
    //     {
    //         PlaceId = "S1"
    //         temp = tempS1;
    //     }
    //     else if($('#S2').css('display') != "none")
    //     {
    //         PlaceId = "S2"
    //         temp = tempS2;
    //     }
    //     else
    //     {
    //         PlaceId = "S3"
    //         temp = tempS3;
    //     }
    //     var limit = temp.length;
    //     var i = 0;
    //     clearInterval(StimerId);
    //     function repeatImage(){
            
    //         if (IskeepGO_S) {
    //             i = keepGo_S;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo_S = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Soption').val(temp[i][1]);
    //             i++;
    //             keepGo_S++;
    //         }
    //         else
    //         {
    //             keepGo_S = i;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo_S = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Soption').val(temp[i][1]);
    //             i++;
    //         }
            
    //     }
    //     StimerId = setInterval(repeatImage, 1000);


    //     $('#stopS').off().on('click', function(){
    //         IskeepGO_S = true;
    //         clearInterval(StimerId);
    //         $('#startS').prop('disabled', false);
    //         $('#stopS').prop('disabled', true);
    //         $('.Soption').prop('disabled', false);
    //     });
    // });
    // // 下拉選單
    // $('.Soption').change(function(){
    //     // // debugger;
    //     var val = $(this).val();
    //     var valeq =$(".Soption option:selected").index()
    //     // alert(val.replaceAll("/","-"));
    //     // $(this).parents();
    //     if ($('#S1').css('display') != "none") 
    //     {
    //         PlaceId = "S1"
    //         temp = tempS1;
    //     }
    //     else if($('#S2').css('display') != "none")
    //     {
    //         PlaceId = "S2"
    //         temp = tempS2;
    //     }
    //     else
    //     {
    //         PlaceId = "S3"
    //         temp = tempS3;
    //     }
    //     $('.Soption').val(val);
    //     for (let i = 0; i < temp.length; i++) {
    //         if (temp[i][1] == val) {
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //         }
    //     }
    //     IskeepGO_S = true;
    //     keepGo_S = valeq;
    // });
    //台灣
    $('#PlaceS1').on('click', function(){ 
        $('#S1').show(); $('#S2').hide(); $('#S3').hide();
        //更新 dropdownlist
        $('.Soption').empty();
        for (let i = 0; i < tempS1.length; i++) {
            var htmlItem = `<option class="itemS" value="${tempS1[i][1]}">${tempS1[i][1]}</option>`;
            $('.Soption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Soption").val(tempS1[tempS1.length-1][1]).change();
        $('#S1 > img').attr('src',tempS1[tempS1.length-1][0]);
        //更新狀態
        // IskeepGO_S = false;
        IskeepGO_S = true;
        keepGo_S = 0;
        //停止
        clearInterval(StimerId);
        //按鈕狀態reset
        $('#startS').prop('disabled', false);
        $('#stopS').prop('disabled', true);
        $('.Soption').prop('disabled', false);
    });
     //東亞
     $('#PlaceS2').on('click', function(){
        // debugger;
        $('#S2').show(); $('#S1').hide(); $('#S3').hide();
        //更新 dropdownlist
        $('.Soption').empty();
        for (let i = 0; i < tempS2.length; i++) {
            var htmlItem = `<option class="itemS" value="${tempS2[i][1]}">${tempS2[i][1]}</option>`;
            $('.Soption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Soption").val(tempS2[tempS2.length-1][1]).change();
        $('#S2 > img').attr('src',tempS2[tempS2.length-1][0]);
        //更新狀態
        // IskeepGO_S = false;
        IskeepGO_S = true;

        keepGo_S = 0;
        //停止
        clearInterval(StimerId);
        //按鈕狀態reset
        $('#startS').prop('disabled', false);
        $('#stopS').prop('disabled', true);
        $('.Soption').prop('disabled', false);

    });
    //全球
    $('#PlaceS3').on('click', function(){
        // debugger;
        $('#S3').show(); $('#S2').hide(); $('#S1').hide();
        //更新 dropdownlist
        $('.Soption').empty();
        for (let i = 0; i < tempS3.length; i++) {
            var htmlItem = `<option class="itemS" value="${tempS3[i][1]}">${tempS3[i][1]}</option>`;
            $('.Soption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Soption").val(tempS3[tempS3.length-1][1]).change();
        $('#S3 > img').attr('src',tempS3[tempS3.length-1][0]);
        //更新狀態
        // IskeepGO_S = false;
        IskeepGO_S = true;

        keepGo_S = 0;
        //停止
        clearInterval(StimerId);
        //按鈕狀態reset
        $('#startS').prop('disabled', false);
        $('#stopS').prop('disabled', true);
        $('.Soption').prop('disabled', false);

    });
    //#endregion

    //#region 雨量累積
    //播放
    // $('#startR').off().on('click', function(){
    //     $('#startR').prop('disabled', true);
    //     $('#stopR').prop('disabled', false);
    //     $('.Roption').prop('disabled', true);
    //     // // debugger;
    //     var PlaceId = "";
    //     var temp;
    //     if ($('#R1').css('display') != "none") 
    //     {
    //         PlaceId = "R1"
    //         temp = tempR1;
    //     }
    //     else if($('#R2').css('display') != "none")
    //     {
    //         PlaceId = "R2"
    //         temp = tempR2;
    //     }
    //     else
    //     {
    //         PlaceId = "R3"
    //         temp = tempR3;
    //     }
    //     var limit = temp.length;
    //     var i = 0;
    //     clearInterval(RtimerId);
    //     function repeatImage(){
            
    //         if (IskeepGO_R) {
    //             i = keepGo_R;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo_R = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Roption').val(temp[i][1]);
    //             i++;
    //             keepGo_R++;
    //         }
    //         else
    //         {
    //             keepGo_R = i;
    //             if (i >= limit){
    //                 i = 0;
    //                 keepGo_R = i;
    //             }
    //             // $('#D1 > img').attr('src', tempD1[i][0]);
    //             // $('.Doption').val(tempD1[i][1]);
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //             $('.Roption').val(temp[i][1]);
    //             i++;
    //         }
            
    //     }
    //     RtimerId = setInterval(repeatImage, 1000);


    //     $('#stopR').off().on('click', function(){
    //         IskeepGO_R = true;
    //         clearInterval(RtimerId);
    //         $('#startR').prop('disabled', false);
    //         $('#stopR').prop('disabled', true);
    //         $('.Roption').prop('disabled', false);
    //     });
    // });
     // 下拉選單
    // $('.Roption').change(function(){
    //     // // debugger;
    //     var val = $(this).val();
    //     var valeq =$(".Roption option:selected").index()
    //     // alert(val.replaceAll("/","-"));
    //     // $(this).parents();
    //     if ($('#R1').css('display') != "none") 
    //     {
    //         PlaceId = "R1"
    //         temp = tempR1;
    //     }
    //     else if($('#R2').css('display') != "none")
    //     {
    //         PlaceId = "R2"
    //         temp = tempR2;
    //     }
    //     else
    //     {
    //         PlaceId = "R3"
    //         temp = tempR3;
    //     }
    //     $('.Roption').val(val);
    //     for (let i = 0; i < temp.length; i++) {
    //         if (temp[i][1] == val) {
    //             $('#' + PlaceId +' > img').attr('src', temp[i][0]);
    //         }
    //     }
    //     IskeepGO_R = true;
    //     keepGo_R = valeq;
    // });
    //一日累積
    $('#PlaceR1').on('click', function(){ 
        $('#R1').show(); $('#R2').hide(); $('#R3').hide();
        //更新 dropdownlist
        $('.Roption').empty();
        for (let i = 0; i < tempR1.length; i++) {
            var htmlItem = `<option class="itemR" value="${tempR1[i][1]}">${tempR1[i][1]}</option>`;
            $('.Roption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Roption").val(tempR1[tempR1.length-1][1]).change();
        $('#R1 > img').attr('src',tempR1[tempR1.length-1][0]);
        //更新狀態
        // IskeepGO_R = false;
        IskeepGO_R = true;
        keepGo_R = 0;
        //停止
        clearInterval(RtimerId);
        //按鈕狀態reset
        $('#startR').prop('disabled', false);
        $('#stopR').prop('disabled', true);
        $('.Roption').prop('disabled', false);
    });
    //二日累積
    $('#PlaceR2').on('click', function(){
        // debugger;
        $('#R2').show(); $('#R1').hide(); $('#R3').hide();
        //更新 dropdownlist
        $('.Roption').empty();
        for (let i = 0; i < tempR2.length; i++) {
            var htmlItem = `<option class="itemR" value="${tempR2[i][1]}">${tempR2[i][1]}</option>`;
            $('.Roption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Roption").val(tempR2[tempR2.length-1][1]).change();
        $('#R2 > img').attr('src',tempR2[tempR2.length-1][0]);
        //更新狀態
        // IskeepGO_R = false;
        IskeepGO_R = true;
        keepGo_R = 0;
        //停止
        clearInterval(RtimerId);
        //按鈕狀態reset
        $('#startR').prop('disabled', false);
        $('#stopR').prop('disabled', true);
        $('.Roption').prop('disabled', false);
    });
    //三日累積
    $('#PlaceR3').on('click', function(){
        // debugger;
        $('#R3').show(); $('#R1').hide(); $('#R2').hide();
        //更新 dropdownlist
        $('.Roption').empty();
        for (let i = 0; i < tempR3.length; i++) {
            var htmlItem = `<option class="itemR" value="${tempR3[i][1]}">${tempR3[i][1]}</option>`;
            $('.Roption').append(htmlItem);
        }
        //更新圖片到最新
        $(".Roption").val(tempR3[tempR3.length-1][1]).change();
        $('#R3 > img').attr('src',tempR3[tempR3.length-1][0]);
        //更新狀態
        // IskeepGO_R = false;
        IskeepGO_R = true;
        keepGo_R = 0;
        //停止
        clearInterval(RtimerId);
        //按鈕狀態reset
        $('#startR').prop('disabled', false);
        $('#stopR').prop('disabled', true);
        $('.Roption').prop('disabled', false);
    });
    //#endregion
    
    //雲圖相關 Event end


    //#region 颱風歷史事件
    $('.TyphoonYear').change(function(){
        var valeq =$(".TyphoonYear option:selected").index();
        var val = $(".TyphoonYear option:selected").filter(':selected').val();

        $('.TyphoonEvent').empty(); // clear first
        if (valeq == 0) {
            $('.TyphoonEvent').append(`<option value="">事件</option>`);
            $('#sSDateText').val('');
            $('#eSDateText').val('');

        }else{
            for (let i = 0; i < TyphoonWarning[val].length; i++) {
                // console.log(TyphoonWarning[val][i].names);
                $('.TyphoonEvent').append(`<option value='${TyphoonWarning[val][i].names}'>${TyphoonWarning[val][i].names}</option>`);
            }
            // display first data at Textbox
            var sTime = TyphoonWarning[val][0].sTime.substring(0,9).split('-');
            var eTime = TyphoonWarning[val][0].eTime.substring(0,9).split('-');
            $('#sSDateText').val(sTime[0] + "年" + sTime[1] + "月" + sTime[2] + "日");
            $('#eSDateText').val(eTime[0] + "年" + eTime[1] + "月" + eTime[2] + "日");
        }
    });


    $('.TyphoonEvent').change(function(){
        var valeq =$(".TyphoonYear option:selected").index();
        var val = $(".TyphoonYear option:selected").filter(':selected').val();
        var Typhoon = $(".TyphoonEvent option:selected").filter(':selected').val();

        for (let i = 0; i < TyphoonWarning[val].length; i++) {
            if (TyphoonWarning[val][i].names == Typhoon) {
                var sTime = TyphoonWarning[val][i].sTime.substring(0,9).split('-');
                var eTime = TyphoonWarning[val][i].eTime.substring(0,9).split('-');

                $('#sSDateText').val(sTime[0] + "年" + sTime[1] + "月" + sTime[2] + "日");
                $('#eSDateText').val(eTime[0] + "年" + eTime[1] + "月" + eTime[2] + "日");
            }
        }
        
    });
    //#endregion

    $("#timeblock").off().on("click", function () {
        if ((tabIndex > 0 && tabIndex < 5) || tabIndex == 6 || tabIndex == 8) {
            event.stopPropagation();
        }
    });

    var value = $(window).width() / 414;
    //alert(value);
    $(".frame").css({
        'width': '414px',
        'height': '570px',
        'border': '0',
        '-webkit-transform': 'scale(' + value + ')',
        '-moz-transform': 'scale(' + value + ')',
        '-ms-transform': 'scale(' + value + ')',
        '-o-transform': 'scale(' + value + ')',
        'transform': 'scale(' + value + ')',
        '-ms-transform-origin': '0 0',
        '-moz-transform-origin': '0 0',
        '-o-transform-origin': '0 0',
        '-webkit-transform-origin': '0 0',
        'transform-origin': '0 0'
    });

    $("#sSDateText").off().on("click", function () {
        //$('#sSDate').datetimepicker('show');
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
            minDate: getMinDate(), //new Date(new Date().getFullYear() + '/01/01'),
            maxDate: new Date(getCurrentDateAD()),
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
                var rocDate = leftPad(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[0], 3) + "年" + yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[1];
                $("#sSDateText").val(rocDate);
                $("#eSDateText").val(rocDate);
                //$("#sSDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
                //$("#eSDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
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

    /*$('#sSDateText').datetimepicker({
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

    //雲圖
    $(".CDsDateText").off().on("click", function () {
        var myDate = new Date(); // From model.
        var thisText = $(this).parent().find('.CDsDateText');
        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: getMinDate(), //new Date(new Date().getFullYear() + '/01/01'),
            maxDate: new Date(getCurrentDateAD()),
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
                thisText.val(time2formateByCloud(newDate).substring(0,10));
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

    
    $(".CDeDateText").off().on("click", function () {
        var myDate = new Date(); // From model.
        var thisText = $(this).parent().find('.CDeDateText');
        cordova.plugins.DateTimePicker.show({
            mode: "date",
            date: myDate,
            allowOldDates: true,
            allowFutureDates: true,
            minDate: getMinDate(), //new Date(new Date().getFullYear() + '/01/01'),
            maxDate: new Date(getCurrentDateAD()),
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
                thisText.val(time2formateByCloud(newDate).substring(0,10));
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

    //雲圖end
    $("#eSDateText").off().on("click", function () {
        //$('#eSDate').datetimepicker('show');
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
            minDate: getMinDate(), //new Date(new Date().getFullYear() + '/01/01'),
            maxDate: new Date(getCurrentDateAD()),
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
                var rocDate = leftPad(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[0], 3) + "年" + yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)).split('年')[1];
                $("#eSDateText").val(rocDate);
                //$("#eSDateText").val(yyyy2yyy(timeStamp2StringAddDays(newDate, true, 0)));
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

    /*$('#eSDateText').datetimepicker({
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
            $("#eSDateText").val((ct.getFullYear() - 1911) + "年" + leftPad(ct.getMonth() + 1, 2) + "月" + leftPad(ct.getDate(), 2) + "日");
        }
    });*/

    $("#search").off().on("click", function () {
        if ($('#sSDateText').val() == "" || $('#eSDateText').val() == "")
            alert("請選擇日期");
        else if (chkRainDateHasValue())
            alert('此日期區間，尚無資料，請重新選擇！');
        else {
            $("#b_date").html($('#sSDateText').val() + "~" + $('#eSDateText').val()); // 顯示查詢的日期區間
            //typhoone display formate
            var valeq = $(".TyphoonYear option:selected").index();
            var val = $(".TyphoonEvent option:selected").filter(':selected').val();
            if (valeq != 0) {//如果不是顯示'年度'，代表有選擇日期
                $("#b_date").html('('+ val+ ')' + $('#sSDateText').val() + "~" + $('#eSDateText').val());
            }

            var d = (new Date(yyy2yyyy($('#sSDateText').val())).dateDiff("d", new Date(yyy2yyyy($('#eSDateText').val()))));
            if (d < 0) {
                alert("結束日期須大於開始日期！");
                return;
            }
            var sdd = (parseInt($('#sSDateText').val().substring(0, 3)) + 1911) + $('#sSDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            var edd = (parseInt($('#eSDateText').val().substring(0, 3)) + 1911) + $('#eSDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
            var todayDate = new Date();

            if (sdd != edd) {
                var nwdate = new Date(edd);
                nwdate.setDate(nwdate.getDate() + 1);
                var d = (new Date(yyy2yyyy($('#sSDateText').val())).dateDiff("d", new Date(nwdate)));

                edd = nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate();
            }
            else {
                var nwdate = new Date(edd);
                nwdate.setDate(nwdate.getDate() + 1);

                edd = nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate();
            }

            if (tabIndex == 0) { // 雨量查詢：石門
                if (d < 11) {
                    //doAjax("getRainDataAnalysisAllRangeByHours", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByHours); //DayRAList
                    doAjax("getRainDataAnalysisAllRainfallListRangeByHours", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByHours); //RainfallList
                }
                else {
                    //doAjax("getRainDataAnalysisAllRangeByDays", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByDays); //DayRAList
                    nwdate.setDate(nwdate.getDate() -1);
                    edd = nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate();
                    doAjax("getRainDataAnalysisAllRainfallListRangeByDays", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByDays); //RainfallList
                }
            }
            else if (tabIndex == 5) { // 雨量查詢：上坪堰
                if (d < 11){
                    doAjax("getRainDataShangPingAnalysisAllRangeByHours", { "sDate": sdd, "eDate": edd }, getRainDataShangPingAnalysisAllRangeByHours);
                }
                else{
                    nwdate.setDate(nwdate.getDate() -1);
                    edd = nwdate.getFullYear() + "-" + (nwdate.getMonth() + 1) + "-" + nwdate.getDate();
                    doAjax("getRainDataShangPingAnalysisAllRangeByDays", { "sDate": sdd, "eDate": edd }, getRainDataAnalysisAllRangeByDays);
                }
            }
            $("#pageFirst").hide();
            $("#pageSearch").show();
        }
    });

    $("#btnRTs").off().on("click", function () {
        $("#pageSearch").hide();
        $("#pageFirst").show();
    });

    var proto = Highcharts.Chart.prototype;
    proto.zoomToD = function (delta, xIndex) {
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
            chartMax = Date.UTC(y, maxM, new Date(y, maxM+1, 0).getDate());
        else if (delta == 11)
            chartMax = Date.UTC(y, 11, 31);

        switch (delta) {
            case 0:
            case 1:
                StockChart[xIndex].xAxis[0].update({
                    tickInterval: 24 * 3600 * 1000,
                    labels: {
                        step: 10
                    },
                });
                break;
            case 2:
            case 5:
            case 11:
                StockChart[xIndex].xAxis[0].update({
                    tickInterval: 28 * 24 * 3600 * 1000,
                    labels: {
                        step: null
                    }
                });
                break;
        }
        StockChart[xIndex].xAxis[0].setExtremes(chartMin, chartMax);

        return false;
    };
    proto.zoom1m = function (xIndex) {
        return this.zoomToD(0, xIndex);
    };
    proto.zoom2m = function (xIndex) {
        return this.zoomToD(1, xIndex);
    };
    proto.zoom3m = function (xIndex) {
        return this.zoomToD(2, xIndex);
    };
    proto.zoom6m = function (xIndex) {
        return this.zoomToD(5, xIndex);
    };
    proto.zoom1y = function (xIndex) {
        return this.zoomToD(11, xIndex);
    };

    $('.zoom_controls a').click(function (e) {
        e.preventDefault();
        $('.zoom_controls a').removeClass('active');
        $(this).addClass('active');
        if($(this).attr('data-range') == "last1y" || $(this).attr('data-range') == "last5y"){
            switch ($(this).attr('data-site')) {
                case "shemen-rain-range":
                    $("#stationAM0_Year").show();
                    $("#stationAM0").hide();
                    doAjax("getShiPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getShiPastYearRain);
                    break;
                case "sanxia-rain-range":
                    $("#stationSXAM0_Year").show();
                    $("#stationSXAM0").hide();
                    doAjax("getSanXiaPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getSanXiaPastYearRain);
                    break;
                case "yuanshan-rain-range":
                    $("#stationYSAM0_Year").show();
                    $("#stationYSAM0").hide();
                    doAjax("getYuanShanPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getYuanShanPastYearRain);
                    break;
                case "taoguan-rain-range":
                    $("#stationTGAM0_Year").show();
                    $("#stationTGAM0").hide();
                    doAjax("getTaoGuanPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getTaoGuanPastYearRain);
                    break;
                case "shihguan-rain-range":
                    $("#stationSGAM0_Year").show();
                    $("#stationSGAM0").hide();
                    doAjax("getShiGuanPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getShiGuanPastYearRain);
                    break;
                case "shangping-rain-range":
                    $("#stationSPAM0_Year").show();
                    $("#stationSPAM0").hide();
                    doAjax("getShanPingPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getShanPingPastYearRain);
                    break;
                case "lonn-rain-range":
                    $("#stationLNAM0_Year").show();
                    $("#stationLNAM0").hide();
                    doAjax("getLonNPastYearRain", { "year": $(this).attr('data-range').split("last")[1].replace("y", "") }, getLonNPastYearRain);
                    break;
            }
        }
        else{//本月, 2個月, 3個月, 今年
            var call = 'zoom' + $(this).attr('data-range');
            var xIndex = $(this).parent().attr('xIndex');
            StockChart[xIndex][call](xIndex);
            // console.log(this);
    
            // 連動顯示
            var ny = new Date().getFullYear();
            var nm = new Date().getMonth();
            switch ($(this).attr('data-site')) {
                case "shemen-rain-range":
                        $("#stationAM0_Year").hide();
                        $("#stationAM0").show();
                        break;
                    case "sanxia-rain-range":
                        $("#stationSXAM0_Year").hide();
                        $("#stationSXAM0").show();
                        break;
                    case "yuanshan-rain-range":
                        $("#stationYSAM0_Year").hide();
                        $("#stationYSAM0").show();
                        break;
                    case "taoguan-rain-range":
                        $("#stationTGAM0_Year").hide();
                        $("#stationTGAM0").show();
                        break;
                    case "shihguan-rain-range":
                        $("#stationSGAM0_Year").hide();
                        $("#stationSGAM0").show();
                        break;
                    case "shangping-rain-range":
                        $("#stationSPAM0_Year").hide();
                        $("#stationSPAM0").show();
                        break;
                    case "lonn-rain-range":
                        $("#stationLNAM0_Year").hide();
                        $("#stationLNAM0").show();
                        break;
            }
            if ($(this).index() == 0) {
    
                var DisplayText = "1"; // 控制顯示的文字
                chartMin = Date.UTC(ny, nm, 1);
                chartMax = Date.UTC(ny, nm + 1, 0);
                var stage = $(this).attr('data-site'); // 判斷是哪個測站的本月
                switch (stage) {
                    case "shemen-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "sanxia-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "yuanshan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "taoguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shihguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shangping-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "lonn-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
                }
                // var c1 = new Date(chartMin);
                // var c2 = new Date(chartMax);
                // // console.log('轉換後開始日:',c1,'，結束日',c2)                
            }
            else if ($(this).index() == 1) {
    
                var DisplayText = "2"; // 控制顯示的文字
                chartMin = Date.UTC(ny, nm - 1, 1);
                chartMax = Date.UTC(ny, nm + 1, 0);
                var stage = $(this).attr('data-site'); // 判斷是哪個測站的2個月
                switch (stage) {
                    case "shemen-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "sanxia-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "yuanshan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "taoguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shihguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shangping-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "lonn-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
                }
                // var c1 = new Date(chartMin);
                // var c2 = new Date(chartMax);
                // // console.log('轉換後開始日:',c1,'，結束日',c2)
            }
            else if ($(this).index() == 2) {
    
                var DisplayText = "3"; // 控制顯示的文字
                chartMin = Date.UTC(ny, nm - 2, 1);
                chartMax = Date.UTC(ny, nm + 1, 0);
                var stage = $(this).attr('data-site'); // 判斷是哪個測站的3個月
                switch (stage) {
                    case "shemen-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "sanxia-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "yuanshan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "taoguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shihguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shangping-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "lonn-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
                }
                // var c1 = new Date(chartMin);
                // var c2 = new Date(chartMax);
                // // console.log('轉換後開始日:',c1,'，結束日',c2)
            }
            else if ($(this).index() == 3) {
    
                var DisplayText = "Year"; // 控制顯示的文字
                chartMin = Date.UTC(ny, 0, 1);
                chartMax = Date.UTC(ny, 12, 0);
                var stage = $(this).attr('data-site'); // 判斷是哪個測站的今年
                switch (stage) {
                    case "shemen-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "sanxia-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "yuanshan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "taoguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shihguan-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
    
                    case "shangping-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
                    
                    case "lonn-rain-range":
                        ReCountRainDataAnalysisAll(chartMin, chartMax, DisplayText, stage);
                        break;
                }
                // var c1 = new Date(chartMin);
                // var c2 = new Date(chartMax);
                // // console.log('轉換後開始日:',c1,'，結束日',c2)
            }
        }






    });

    $("#clear").off().on("click", function () {
        $("#timeicon").click();
    });
}

function reloadData() {
    var selectedIndex = 0;

    if (tabIndex >= 0 && tabIndex <= 5 || tabIndex == 8) {
        var index;
        if (tabIndex == 0) {
            index = "";
        }
        else if (tabIndex == 8) {//隆恩堰
            index = 6;
        }
        else{
            index = tabIndex;
        }
        var selectedTitle = $("#btnTitle" + index).html();
        selectedIndex = $("#rainFallList" + index + " > li > a:contains('" + selectedTitle + "')").parent().val();
    }

    switch (tabIndex) {
        case 0:
            getRainFall(selectedIndex);
            doAjax("getRainDataAnalysisAll" + action, {}, getRainDataAnalysisAll); //DayRAList
            //doAjax("getRainDataAnalysisAllRainfallList" + action, {}, getRainDataAnalysisAll); //RainfallList
            break;
        case 1:
            getRainFallDataGov(1, selectedIndex);
            doAjax("getRainDataSanXiaAnalysisAll", {}, getRainDataSanXiaAnalysisAll);
            break;
        case 2:
            getRainFallDataGov(2, selectedIndex);
            doAjax("getRainDataYuanShanAnalysisAll", {}, getRainDataYuanShanAnalysisAll);
            break;
        case 3:
            getRainFallDataGov(3, selectedIndex);
            doAjax("getRainDataTaoGuanAnalysisAll", {}, getRainDataTaoGuanAnalysisAll);
            break;
        case 4:
            getRainFallDataGov(4, selectedIndex);
            doAjax("getRainDataShihGuanAnalysisAll", {}, getRainDataShihGuanAnalysisAll);
            break;
        case 5:
            getRainFallDataGov(5, selectedIndex);
            doAjax("getRainDataShangPingAnalysisAll", {}, getRainDataShangPingAnalysisAll);
            break;
        case 8:
            getRainFallDataGov(6, selectedIndex);
            doAjax("getRainDataLonNAnalysisAll", {}, getRainDataLonNAnalysisAll);
            break;
    }
    countSpeed();
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
// 石門各站雨量
function getRainFall(index) {
    $("#btnTitle").html($("#rainFallList>li>a").eq(index).html());
    //$("#dTitle").html($("#rainFallList>li>a").eq(index).html());
    $("#avgFall").html(initVal);
    $("#shemen").html(initVal);
    $("#clouds").html(initVal);
    $("#high").html(initVal);
    $("#bar").html(initVal);
    $("#scrunch").html(initVal);
    $("#jade").html(initVal);
    $("#white").html(initVal);
    $("#burg").html(initVal);
    $("#west").html(initVal);
    $("#mere").html(initVal);

    if (specificdate != null && specificdate != "")
        action = "TestDate?date=" + specificdate;
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getRainfall" + action,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            nullStation = [];
            //日期顯示
            try {
                now_indate = msg["getRainfallMinute"][msg["getRainfallMinute"].length-1]["InDate"];// 10分鐘最後一筆 = 最新
                if (now_indate.substring(11, 16) == "00:00") {//當天從00:10分開始累計
                    $("#dDate").html('本日暫無資料');
                    $("#a_date").html('本日暫無資料');
                }else{
                    $("#dDate").html((now_indate.substring(0, 4) - 1911) + "年" + now_indate.substring(5, 7) + "月" + now_indate.substring(8, 10) + "日" + now_indate.substring(11, 16));
                    $("#a_date").html((now_indate.substring(0, 4) - 1911) + "年" + now_indate.substring(5, 7) + "月" + now_indate.substring(8, 10) + "日" + now_indate.substring(11, 16));
                }
            } catch (error) {
                $("#dDate").html('本日暫無資料');
                $("#a_date").html('本日暫無資料');
            }

            // 2021 04 15 當日累積雨量 = 當天所有小時 + 當下小時的10分鐘
            var new_indate = "", new_shemen = 0, new_clouds = 0, new_high = 0, new_bar = 0, new_scrunch = 0, new_jade = 0, new_white = 0, new_burg = 0, new_west = 0, new_mere = 0, new_avgFall = 0; // 2021 04 15 add

            // 小時
            for (var i = 0; i < msg["getRainfallHourToday"].length; i++) {

                new_shemen += msg["getRainfallHourToday"][i]["Shemen"] != null ? msg["getRainfallHourToday"][i]["Shemen"] : 0;
                new_clouds += msg["getRainfallHourToday"][i]["Clouds"] != null ? msg["getRainfallHourToday"][i]["Clouds"] : 0;
                new_high += msg["getRainfallHourToday"][i]["High"] != null ? msg["getRainfallHourToday"][i]["High"] : 0;
                new_bar += msg["getRainfallHourToday"][i]["Bar"] != null ? msg["getRainfallHourToday"][i]["Bar"] : 0;
                new_scrunch += msg["getRainfallHourToday"][i]["Scrunch"] != null ? msg["getRainfallHourToday"][i]["Scrunch"] : 0;
                new_jade += msg["getRainfallHourToday"][i]["Jade"] != null ? msg["getRainfallHourToday"][i]["Jade"] : 0;
                new_white += msg["getRainfallHourToday"][i]["White"] != null ? msg["getRainfallHourToday"][i]["White"] : 0;
                new_burg += msg["getRainfallHourToday"][i]["Burg"] != null ? msg["getRainfallHourToday"][i]["Burg"] : 0;
                new_west += msg["getRainfallHourToday"][i]["West"] != null ? msg["getRainfallHourToday"][i]["West"] : 0;
                new_mere += msg["getRainfallHourToday"][i]["Mere"] != null ? msg["getRainfallHourToday"][i]["Mere"] : 0;
            }
            //判斷如果是00點，重新累計
            var dateMinHour = null;
            if (msg["getRainfallMinute"].length > 0) {
                dateMinHour = parseInt(msg["getRainfallMinute"][0].InDate.substring(11,13));
            }
            if (dateMinHour == 0) {
                // 加 10分鐘的 ( 最後一筆 - 0 = 變化量 )
                if (msg["getRainfallMinute"].length > 1) { // 大於1 , 是因為整點的時候第一筆不用加

                    var lastIndex = msg["getRainfallMinute"].length - 1;
    
                    // new_shemen += msg["getRainfallMinute"][lastIndex]["Shemen"] != null ? msg["getRainfallMinute"][lastIndex]["Shemen"] - 0 : 0;
                    // new_clouds += msg["getRainfallMinute"][lastIndex]["Clouds"] != null ? msg["getRainfallMinute"][lastIndex]["Clouds"] - 0 : 0;
                    // new_high += msg["getRainfallMinute"][lastIndex]["High"] != null ? msg["getRainfallMinute"][lastIndex]["High"] - 0 : 0;
                    // new_bar += msg["getRainfallMinute"][lastIndex]["Bar"] != null ? msg["getRainfallMinute"][lastIndex]["Bar"] - 0 : 0;
                    // new_scrunch += msg["getRainfallMinute"][lastIndex]["Scrunch"] != null ? msg["getRainfallMinute"][lastIndex]["Scrunch"] - 0 : 0;
                    // new_jade += msg["getRainfallMinute"][lastIndex]["Jade"] != null ? msg["getRainfallMinute"][lastIndex]["Jade"] - 0 : 0;
                    // new_white += msg["getRainfallMinute"][lastIndex]["White"] != null ? msg["getRainfallMinute"][lastIndex]["White"] - 0 : 0;
                    // new_burg += msg["getRainfallMinute"][lastIndex]["Burg"] != null ? msg["getRainfallMinute"][lastIndex]["Burg"] - 0 : 0;
                    // new_west += msg["getRainfallMinute"][lastIndex]["West"] != null ? msg["getRainfallMinute"][lastIndex]["West"] - 0 : 0;
                    // new_mere += msg["getRainfallMinute"][lastIndex]["Mere"] != null ? msg["getRainfallMinute"][lastIndex]["Mere"] - 0 : 0;

                    new_shemen += msg["getRainfallMinute"][lastIndex]["Shemen"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Shemen"] - 0  < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Shemen"] - 0;
                    new_clouds += msg["getRainfallMinute"][lastIndex]["Clouds"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Clouds"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Clouds"] - 0;
                    new_high += msg["getRainfallMinute"][lastIndex]["High"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["High"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["High"] - 0;
                    new_bar += msg["getRainfallMinute"][lastIndex]["Bar"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Bar"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Bar"] - 0;
                    new_scrunch += msg["getRainfallMinute"][lastIndex]["Scrunch"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Scrunch"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Scrunch"] - 0;
                    new_jade += msg["getRainfallMinute"][lastIndex]["Jade"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Jade"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Jade"] - 0;
                    new_white += msg["getRainfallMinute"][lastIndex]["White"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["White"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["White"] - 0;
                    new_burg += msg["getRainfallMinute"][lastIndex]["Burg"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Burg"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Burg"] - 0;
                    new_west += msg["getRainfallMinute"][lastIndex]["West"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["West"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["West"] - 0;
                    new_mere += msg["getRainfallMinute"][lastIndex]["Mere"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Mere"] - 0 < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Mere"] - 0;
                }
            }
            else
            {
                // 加 10分鐘的 ( 最後一筆 - 第一筆 = 變化量 )
                if (msg["getRainfallMinute"].length > 1) { // 大於1 , 是因為整點的時候第一筆不用加

                    var lastIndex = msg["getRainfallMinute"].length - 1;

                    // new_shemen += msg["getRainfallMinute"][lastIndex]["Shemen"] != null ? msg["getRainfallMinute"][lastIndex]["Shemen"] - msg["getRainfallMinute"][0]["Shemen"] : 0;
                    // new_clouds += msg["getRainfallMinute"][lastIndex]["Clouds"] != null ? msg["getRainfallMinute"][lastIndex]["Clouds"] - msg["getRainfallMinute"][0]["Clouds"] : 0;
                    // new_high += msg["getRainfallMinute"][lastIndex]["High"] != null ? msg["getRainfallMinute"][lastIndex]["High"] - msg["getRainfallMinute"][0]["High"] : 0;
                    // new_bar += msg["getRainfallMinute"][lastIndex]["Bar"] != null ? msg["getRainfallMinute"][lastIndex]["Bar"] - msg["getRainfallMinute"][0]["Bar"] : 0;
                    // new_scrunch += msg["getRainfallMinute"][lastIndex]["Scrunch"] != null ? msg["getRainfallMinute"][lastIndex]["Scrunch"] - msg["getRainfallMinute"][0]["Scrunch"] : 0;
                    // new_jade += msg["getRainfallMinute"][lastIndex]["Jade"] != null ? msg["getRainfallMinute"][lastIndex]["Jade"] - msg["getRainfallMinute"][0]["Jade"] : 0;
                    // new_white += msg["getRainfallMinute"][lastIndex]["White"] != null ? msg["getRainfallMinute"][lastIndex]["White"] - msg["getRainfallMinute"][0]["White"] : 0;
                    // new_burg += msg["getRainfallMinute"][lastIndex]["Burg"] != null ? msg["getRainfallMinute"][lastIndex]["Burg"] - msg["getRainfallMinute"][0]["Burg"] : 0;
                    // new_west += msg["getRainfallMinute"][lastIndex]["West"] != null ? msg["getRainfallMinute"][lastIndex]["West"] - msg["getRainfallMinute"][0]["West"] : 0;
                    // new_mere += msg["getRainfallMinute"][lastIndex]["Mere"] != null ? msg["getRainfallMinute"][lastIndex]["Mere"] - msg["getRainfallMinute"][0]["Mere"] : 0;

                    new_shemen += msg["getRainfallMinute"][lastIndex]["Shemen"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Shemen"] - msg["getRainfallMinute"][0]["Shemen"]  < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Shemen"] - msg["getRainfallMinute"][0]["Shemen"];
                    new_clouds += msg["getRainfallMinute"][lastIndex]["Clouds"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Clouds"] - msg["getRainfallMinute"][0]["Clouds"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Clouds"] - msg["getRainfallMinute"][0]["Clouds"];
                    new_high += msg["getRainfallMinute"][lastIndex]["High"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["High"] -  msg["getRainfallMinute"][0]["High"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["High"] - msg["getRainfallMinute"][0]["High"];
                    new_bar += msg["getRainfallMinute"][lastIndex]["Bar"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Bar"] - msg["getRainfallMinute"][0]["Bar"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Bar"] - msg["getRainfallMinute"][0]["Bar"];
                    new_scrunch += msg["getRainfallMinute"][lastIndex]["Scrunch"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Scrunch"] - msg["getRainfallMinute"][0]["Scrunch"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Scrunch"] - msg["getRainfallMinute"][0]["Scrunch"];
                    new_jade += msg["getRainfallMinute"][lastIndex]["Jade"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Jade"] -  msg["getRainfallMinute"][0]["Jade"]< 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Jade"] - msg["getRainfallMinute"][0]["Jade"];
                    new_white += msg["getRainfallMinute"][lastIndex]["White"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["White"] -   msg["getRainfallMinute"][0]["White"]< 0 ? 0 : msg["getRainfallMinute"][lastIndex]["White"] - msg["getRainfallMinute"][0]["White"];
                    new_burg += msg["getRainfallMinute"][lastIndex]["Burg"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Burg"] -  msg["getRainfallMinute"][0]["Burg"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Burg"] - msg["getRainfallMinute"][0]["Burg"];
                    new_west += msg["getRainfallMinute"][lastIndex]["West"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["West"] - msg["getRainfallMinute"][0]["West"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["West"] - msg["getRainfallMinute"][0]["West"];
                    new_mere += msg["getRainfallMinute"][lastIndex]["Mere"] == null ? 0 : msg["getRainfallMinute"][lastIndex]["Mere"] - msg["getRainfallMinute"][0]["Mere"] < 0 ? 0 : msg["getRainfallMinute"][lastIndex]["Mere"] - msg["getRainfallMinute"][0]["Mere"];
                }
            }



            new_avgFall = (new_shemen + new_clouds + new_high + new_bar + new_scrunch + new_jade + new_white + new_burg + new_west + new_mere);
            // console.log('石門各站 - 小時', msg["getRainfallHourToday"]);
            // console.log('石門各站 - 10分鐘', msg["getRainfallMinute"]);

            // console.log(new_avgFall);
            // console.log(new_shemen , new_clouds, new_high, new_bar, new_scrunch, new_jade, new_white, new_burg, new_west, new_mere);





            now_indate = msg["getRainfall0"][0]["InDate"] != null ? msg["getRainfall0"][0]["InDate"] : 0; // 日期
            now_shemen = msg["getRainfall0"][0]["Shemen"] != null ? msg["getRainfall0"][0]["Shemen"] : 0;
            now_clouds = msg["getRainfall0"][0]["Clouds"] != null ? msg["getRainfall0"][0]["Clouds"] : 0;
            now_high = msg["getRainfall0"][0]["High"] != null ? msg["getRainfall0"][0]["High"] : 0;
            now_bar = msg["getRainfall0"][0]["Bar"] != null ? msg["getRainfall0"][0]["Bar"] : 0;
            now_scrunch = msg["getRainfall0"][0]["Scrunch"] != null ? msg["getRainfall0"][0]["Scrunch"] : 0;
            now_jade = msg["getRainfall0"][0]["Jade"] != null ? msg["getRainfall0"][0]["Jade"] : 0;
            now_white = msg["getRainfall0"][0]["White"] != null ? msg["getRainfall0"][0]["White"] : 0;
            now_burg = msg["getRainfall0"][0]["Burg"] != null ? msg["getRainfall0"][0]["Burg"] : 0;
            now_west = msg["getRainfall0"][0]["West"] != null ? msg["getRainfall0"][0]["West"] : 0;
            now_mere = msg["getRainfall0"][0]["Mere"] != null ? msg["getRainfall0"][0]["Mere"] : 0;
            now_avgFall = (now_shemen + now_clouds + now_high + now_bar + now_scrunch + now_jade + now_white + now_burg + now_west + now_mere);

            indate = msg["getRainfall" + index][0]["InDate"] != null ? msg["getRainfall" + index][0]["InDate"] : 0;
            shemen = msg["getRainfall" + index][0]["Shemen"] != null ? msg["getRainfall" + index][0]["Shemen"] : 0;
            clouds = msg["getRainfall" + index][0]["Clouds"] != null ? msg["getRainfall" + index][0]["Clouds"] : 0;
            high = msg["getRainfall" + index][0]["High"] != null ? msg["getRainfall" + index][0]["High"] : 0;
            bar = msg["getRainfall" + index][0]["Bar"] != null ? msg["getRainfall" + index][0]["Bar"] : 0;
            scrunch = msg["getRainfall" + index][0]["Scrunch"] != null ? msg["getRainfall" + index][0]["Scrunch"] : 0;
            jade = msg["getRainfall" + index][0]["Jade"] != null ? msg["getRainfall" + index][0]["Jade"] : 0;
            white = msg["getRainfall" + index][0]["White"] != null ? msg["getRainfall" + index][0]["White"] : 0;
            burg = msg["getRainfall" + index][0]["Burg"] != null ? msg["getRainfall" + index][0]["Burg"] : 0;
            west = msg["getRainfall" + index][0]["West"] != null ? msg["getRainfall" + index][0]["West"] : 0;
            mere = msg["getRainfall" + index][0]["Mere"] != null ? msg["getRainfall" + index][0]["Mere"] : 0;
            avgFall = (shemen + clouds + high + bar + scrunch + jade + white + burg + west + mere);

            yd_indate = msg["getRainfallYesterday"][0]["InDate"] != null ? msg["getRainfallYesterday"][0]["InDate"] : 0;
            yd_shemen = msg["getRainfallYesterday"][0]["Shemen"] != null ? msg["getRainfallYesterday"][0]["Shemen"] : 0;
            yd_clouds = msg["getRainfallYesterday"][0]["Clouds"] != null ? msg["getRainfallYesterday"][0]["Clouds"] : 0;
            yd_high = msg["getRainfallYesterday"][0]["High"] != null ? msg["getRainfallYesterday"][0]["High"] : 0;
            yd_bar = msg["getRainfallYesterday"][0]["Bar"] != null ? msg["getRainfallYesterday"][0]["Bar"] : 0;
            yd_scrunch = msg["getRainfallYesterday"][0]["Scrunch"] != null ? msg["getRainfallYesterday"][0]["Scrunch"] : 0;
            yd_jade = msg["getRainfallYesterday"][0]["Jade"] != null ? msg["getRainfallYesterday"][0]["Jade"] : 0;
            yd_white = msg["getRainfallYesterday"][0]["White"] != null ? msg["getRainfallYesterday"][0]["White"] : 0;
            yd_burg = msg["getRainfallYesterday"][0]["Burg"] != null ? msg["getRainfallYesterday"][0]["Burg"] : 0;
            yd_west = msg["getRainfallYesterday"][0]["West"] != null ? msg["getRainfallYesterday"][0]["West"] : 0;
            yd_mere = msg["getRainfallYesterday"][0]["Mere"] != null ? msg["getRainfallYesterday"][0]["Mere"] : 0;
            yd_avgFall = (yd_shemen + yd_clouds + yd_high + yd_bar + yd_scrunch + yd_jade + yd_white + yd_burg + yd_west + yd_mere);
            //var date = new Date(now_indate.substring(0, 4), now_indate.substring(5, 7), now_indate.substring(8, 10));
            //var date2 = new Date(indate.substring(0, 4), indate.substring(5, 7), indate.substring(8, 10));

            var currentH = parseInt(now_indate.substring(11, 13));
            var currentM = parseInt(now_indate.substring(14, 16));
            var isYesterday = 0;
            switch (parseInt(index)) {
                case 2:
                    isYesterday = (currentH - 1) < 0 ? 1 : 0;
                    break;
                case 3:
                    isYesterday = (currentH - 3) < 0 ? 1 : 0;
                    break;
                case 4:
                    isYesterday = (currentH - 6) < 0 ? 1 : 0;
                    break;
                case 5:
                    isYesterday = (currentH - 12) < 0 ? 1 : 0;
                    break;
                case 6:
                    isYesterday = (currentH - 24) < 0 ? 1 : 0;
                    break;
            }

            if (currentH == 0 && currentM < 10)
                isYesterday = 2;
            else if (index == 1 && currentH == 0 && currentM == 10) // special case is below
                isYesterday = -1;
            else if (index == 2 && currentH == 1 && currentM == 0)
                isYesterday = -1;
            else if (index == 3 && currentH == 3 && currentM == 0)
                isYesterday = -1;
            else if (index == 4 && currentH == 6 && currentM == 0)
                isYesterday = -1;
            else if (index == 5 && currentH == 12 && currentM == 0)
                isYesterday = -1;

            if (index > 0) {
                if (isYesterday == -1) {
                    shemen = chkNoData([msg["getRainfall0"][0]["Shemen"]], now_shemen, "Shemen");
                    clouds = chkNoData([msg["getRainfall0"][0]["Clouds"]], now_clouds, "Clouds");
                    high = chkNoData([msg["getRainfall0"][0]["High"]], now_high, "High");
                    bar = chkNoData([msg["getRainfall0"][0]["Bar"]], now_bar, "Bar");
                    scrunch = chkNoData([msg["getRainfall0"][0]["Scrunch"]], now_scrunch, "Scrunch");
                    jade = chkNoData([msg["getRainfall0"][0]["Jade"]], now_jade, "Jade");
                    white = chkNoData([msg["getRainfall0"][0]["White"]], now_white, "White");
                    burg = chkNoData([msg["getRainfall0"][0]["Burg"]], now_burg, "Burg");
                    west = chkNoData([msg["getRainfall0"][0]["West"]], now_west, "West");
                    mere = chkNoData([msg["getRainfall0"][0]["Mere"]], now_mere, "Mere");
                    avgFall = now_avgFall;
                }
                else if (isYesterday == 0) {
                    //alert('today');
                    shemen = chkNoData([msg["getRainfall0"][0]["Shemen"], msg["getRainfall" + index][0]["Shemen"]], now_shemen - shemen, "Shemen");
                    clouds = chkNoData([msg["getRainfall0"][0]["Clouds"], msg["getRainfall" + index][0]["Clouds"]], now_clouds - clouds, "Clouds");
                    high = chkNoData([msg["getRainfall0"][0]["High"], msg["getRainfall" + index][0]["High"]], now_high - high, "High");
                    bar = chkNoData([msg["getRainfall0"][0]["Bar"], msg["getRainfall" + index][0]["Bar"]], now_bar - bar, "Bar");
                    scrunch = chkNoData([msg["getRainfall0"][0]["Scrunch"], msg["getRainfall" + index][0]["Scrunch"]], now_scrunch - scrunch, "Scrunch");
                    jade = chkNoData([msg["getRainfall0"][0]["Jade"], msg["getRainfall" + index][0]["Jade"]], now_jade - jade, "Jade");
                    white = chkNoData([msg["getRainfall0"][0]["White"], msg["getRainfall" + index][0]["White"]], now_white - white, "White");
                    burg = chkNoData([msg["getRainfall0"][0]["Burg"], msg["getRainfall" + index][0]["Burg"]], now_burg - burg, "Burg");
                    west = chkNoData([msg["getRainfall0"][0]["West"], msg["getRainfall" + index][0]["West"]], now_west - west, "West");
                    mere = chkNoData([msg["getRainfall0"][0]["Mere"], msg["getRainfall" + index][0]["Mere"]], now_mere - mere, "Mere");

                    //minus null data with the same station
                    for (var i = 0; i < nullStation.length; i++) {
                        if (msg["getRainfall0"][0][nullStation[i]] != null)
                            now_avgFall -= msg["getRainfall0"][0][nullStation[i]];
                        if (msg["getRainfall" + index][0][nullStation[i]] != null)
                            avgFall -= msg["getRainfall" + index][0][nullStation[i]];
                    }
                    avgFall = now_avgFall - avgFall;
                }
                else if (isYesterday == 2 && parseInt(index) == 6) {
                    shemen = chkNoData([msg["getRainfallYesterday"][0]["Shemen"]], yd_shemen, "Shemen");
                    clouds = chkNoData([msg["getRainfallYesterday"][0]["Clouds"]], yd_clouds, "Clouds");
                    high = chkNoData([msg["getRainfallYesterday"][0]["High"]], yd_high, "High");
                    bar = chkNoData([msg["getRainfallYesterday"][0]["Bar"]], yd_bar, "Bar");
                    scrunch = chkNoData([msg["getRainfallYesterday"][0]["Scrunch"]], yd_scrunch, "Scrunch");
                    jade = chkNoData([msg["getRainfallYesterday"][0]["Jade"]], yd_jade, "Jade");
                    white = chkNoData([msg["getRainfallYesterday"][0]["White"]], yd_white, "White");
                    burg = chkNoData([msg["getRainfallYesterday"][0]["Burg"]], yd_burg, "Burg");
                    west = chkNoData([msg["getRainfallYesterday"][0]["West"]], yd_west, "West");
                    mere = chkNoData([msg["getRainfallYesterday"][0]["Mere"]], yd_mere, "Mere");
                    avgFall = yd_avgFall;
                }
                else if (isYesterday == 2) {
                    shemen = chkNoData([msg["getRainfallYesterday"][0]["Shemen"], msg["getRainfall" + index][0]["Shemen"]], yd_shemen - shemen, "Shemen");
                    clouds = chkNoData([msg["getRainfallYesterday"][0]["Clouds"], msg["getRainfall" + index][0]["Clouds"]], yd_clouds - clouds, "Clouds");
                    high = chkNoData([msg["getRainfallYesterday"][0]["High"], msg["getRainfall" + index][0]["High"]], yd_high - high, "High");
                    bar = chkNoData([msg["getRainfallYesterday"][0]["Bar"], msg["getRainfall" + index][0]["Bar"]], yd_bar - bar, "Bar");
                    scrunch = chkNoData([msg["getRainfallYesterday"][0]["Scrunch"], msg["getRainfall" + index][0]["Scrunch"]], yd_scrunch - scrunch, "Scrunch");
                    jade = chkNoData([msg["getRainfallYesterday"][0]["Jade"], msg["getRainfall" + index][0]["Jade"]], yd_jade - jade, "Jade");
                    white = chkNoData([msg["getRainfallYesterday"][0]["White"], msg["getRainfall" + index][0]["White"]], yd_white - white, "White");
                    burg = chkNoData([msg["getRainfallYesterday"][0]["Burg"], msg["getRainfall" + index][0]["Burg"]], yd_burg - burg, "Burg");
                    west = chkNoData([msg["getRainfallYesterday"][0]["West"], msg["getRainfall" + index][0]["West"]], yd_west - west, "West");
                    mere = chkNoData([msg["getRainfallYesterday"][0]["Mere"], msg["getRainfall" + index][0]["Mere"]], yd_mere - mere, "Mere");
                    for (var i = 0; i < nullStation.length; i++) {
                        if (msg["getRainfall" + index][0][nullStation[i]] != null)
                            avgFall -= msg["getRainfall" + index][0][nullStation[i]];
                        if (msg["getRainfallYesterday"][0][nullStation[i]] != null)
                            yd_avgFall -= msg["getRainfallYesterday"][0][nullStation[i]];
                    }
                    avgFall = yd_avgFall - avgFall;
                }
                else { // if the date is yesterday
                    //alert('yesterday');
                    shemen = chkNoData([msg["getRainfall0"][0]["Shemen"], msg["getRainfallYesterday"][0]["Shemen"], msg["getRainfall" + index][0]["Shemen"]], now_shemen + (yd_shemen - shemen), "Shemen");
                    clouds = chkNoData([msg["getRainfall0"][0]["Clouds"], msg["getRainfallYesterday"][0]["Clouds"], msg["getRainfall" + index][0]["Clouds"]], now_clouds + (yd_clouds - clouds), "Clouds");
                    high = chkNoData([msg["getRainfall0"][0]["High"], msg["getRainfallYesterday"][0]["High"], msg["getRainfall" + index][0]["High"]], now_high + (yd_high - high), "High");
                    bar = chkNoData([msg["getRainfall0"][0]["Bar"], msg["getRainfallYesterday"][0]["Bar"], msg["getRainfall" + index][0]["Bar"]], now_bar + (yd_bar - bar), "Bar");
                    scrunch = chkNoData([msg["getRainfall0"][0]["Scrunch"], msg["getRainfallYesterday"][0]["Scrunch"], msg["getRainfall" + index][0]["Scrunch"]], now_scrunch + (yd_scrunch - scrunch), "Scrunch");
                    jade = chkNoData([msg["getRainfall0"][0]["Jade"], msg["getRainfallYesterday"][0]["Jade"], msg["getRainfall" + index][0]["Jade"]], now_jade + (yd_jade - jade), "Jade");
                    white = chkNoData([msg["getRainfall0"][0]["White"], msg["getRainfallYesterday"][0]["White"], msg["getRainfall" + index][0]["White"]], now_white + (yd_white - white), "White");
                    burg = chkNoData([msg["getRainfall0"][0]["Burg"], msg["getRainfallYesterday"][0]["Burg"], msg["getRainfall" + index][0]["Burg"]], now_burg + (yd_burg - burg), "Burg");
                    west = chkNoData([msg["getRainfall0"][0]["West"], msg["getRainfallYesterday"][0]["West"], msg["getRainfall" + index][0]["West"]], now_west + (yd_west - west), "West");
                    mere = chkNoData([msg["getRainfall0"][0]["Mere"], msg["getRainfallYesterday"][0]["Mere"], msg["getRainfall" + index][0]["Mere"]], now_mere + (yd_mere - mere), "Mere");

                    for (var i = 0; i < nullStation.length; i++) {
                        if (msg["getRainfall0"][0][nullStation[i]] != null)
                            now_avgFall -= msg["getRainfall0"][0][nullStation[i]];
                        if (msg["getRainfall" + index][0][nullStation[i]] != null)
                            avgFall -= msg["getRainfall" + index][0][nullStation[i]];
                        if (msg["getRainfallYesterday"][0][nullStation[i]] != null)
                            yd_avgFall -= msg["getRainfallYesterday"][0][nullStation[i]];
                    }

                    avgFall = now_avgFall + (yd_avgFall - avgFall);
                }
            }
            else { // index = 0 = 今日累積雨量
                shemen = new_shemen;
                clouds = new_clouds;
                high = new_high;
                bar = new_bar;
                scrunch = new_scrunch;
                jade = new_jade;
                white = new_white;
                burg = new_burg;
                west = new_west;
                mere = new_mere;
                // shemen = chkNoData([msg["getRainfall" + index][0]["Shemen"]], shemen, "Shemen");
                // clouds = chkNoData([msg["getRainfall" + index][0]["Clouds"]], clouds, "Clouds");
                // high = chkNoData([msg["getRainfall" + index][0]["High"]], high, "High");
                // bar = chkNoData([msg["getRainfall" + index][0]["Bar"]], bar, "Bar");
                // scrunch = chkNoData([msg["getRainfall" + index][0]["Scrunch"]], scrunch, "Scrunch");
                // jade = chkNoData([msg["getRainfall" + index][0]["Jade"]], jade, "Jade");
                // white = chkNoData([msg["getRainfall" + index][0]["White"]], white, "White");
                // burg = chkNoData([msg["getRainfall" + index][0]["Burg"]], burg, "Burg");
                // west = chkNoData([msg["getRainfall" + index][0]["West"]], west, "West");
                // mere = chkNoData([msg["getRainfall" + index][0]["Mere"]], mere, "Mere");
            }
            // $("#dDate").html((now_indate.substring(0, 4) - 1911) + "年" + now_indate.substring(5, 7) + "月" + now_indate.substring(8, 10) + "日" + now_indate.substring(11, 16))

            if (index == 0) {
                $("#avgFall").html(new_avgFall / (10 - nullStation.length));

            }
            else {
                $("#avgFall").html(avgFall / (10 - nullStation.length));
            }
            $("#shemen").html(shemen);
            $("#clouds").html(clouds);
            $("#high").html(high);
            $("#bar").html(bar);
            $("#scrunch").html(scrunch);
            $("#jade").html(jade);
            $("#white").html(white);
            $("#burg").html(burg);
            $("#west").html(west);
            $("#mere").html(mere);

            if (index == 0) {
                $("#avgFall").countTo(
                    {
                        from: 0,
                        to: Math.round(new_avgFall / (10 - nullStation.length) * 10) / 10,
                        speed: 1500,
                        refreshInterval: 50,
                        decimals: 1,
                        onComplete: function (value) {
                            console.debug(this);
                            getRainFallAVG(true);
                            getRainFallAVG(false);
                        }
                    });
            }
            else {
                $("#avgFall").countTo(
                    {
                        from: 0,
                        to: Math.round(avgFall / (10 - nullStation.length) * 10) / 10,
                        speed: 1500,
                        refreshInterval: 50,
                        decimals: 1,
                        onComplete: function (value) {
                            console.debug(this);
                            getRainFallAVG(true);
                            getRainFallAVG(false);
                        }
                    });
            }


            $("#shemen").countTo(
                {
                    from: 0,
                    to: shemen,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#clouds").countTo(
                {
                    from: 0,
                    to: clouds,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#high").countTo(
                {
                    from: 0,
                    to: high,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#bar").countTo(
                {
                    from: 0,
                    to: bar,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#scrunch").countTo(
                {
                    from: 0,
                    to: scrunch,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#jade").countTo(
                {
                    from: 0,
                    to: jade,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#white").countTo(
                {
                    from: 0,
                    to: white,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#burg").countTo(
                {
                    from: 0,
                    to: burg,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#west").countTo(
                {
                    from: 0,
                    to: west,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            $("#mere").countTo(
                {
                    from: 0,
                    to: mere,
                    speed: 1500,
                    decimals: 1,
                    refreshInterval: 50,
                    onComplete: function (value) {
                        console.debug(this);
                    }
                });

            //$("#a_date").html((date.substring(0, 4) - 1911) + "年" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日");
            // $("#a_dates").html(date.substring(5, 7) + "月 " + date.substring(8, 10) + "日");

            var avgFall = [];
            var shemenAll = [];
            var cloudsAll = [];
            var highAll = [];
            var barAll = [];
            var scrunchAll = [];
            var jadeAll = [];
            var whiteAll = [];
            var burgAll = [];
            var westAll = [];
            var mereAll = [];

            nullStationX = [[], [], [], [], [], [], [], []];

            for (var i = 0; i < 7; i++) {
                if (i == 0){
                    // $("#a_date").html((msg["getRainfall0"][0]["InDate"].substring(0, 4) - 1911) + "年" + msg["getRainfall0"][0]["InDate"].substring(5, 7) + "月" + msg["getRainfall0"][0]["InDate"].substring(8, 10) + "日 " + msg["getRainfall0"][0]["InDate"].substring(11, 19));
                }
                if (msg["getRainfall" + i][0] != null) {
                    var currentH = parseInt(msg["getRainfall0"][0]["InDate"].substring(11, 13));
                    var currentM = parseInt(msg["getRainfall0"][0]["InDate"].substring(14, 16));
                    var isYesterday = 0;
                    switch (parseInt(i)) {
                        case 2:
                            isYesterday = (currentH - 1) < 0 ? 1 : 0;
                            break;
                        case 3:
                            isYesterday = (currentH - 3) < 0 ? 1 : 0;
                            break;
                        case 4:
                            isYesterday = (currentH - 6) < 0 ? 1 : 0;
                            break;
                        case 5:
                            isYesterday = (currentH - 12) < 0 ? 1 : 0;
                            break;
                        case 6:
                            isYesterday = (currentH - 24) < 0 ? 1 : 0;
                            break;
                    }

                    if (i == 0 && currentH == 0 && currentM == 00)
                        isYesterday = -1;
                    else if (currentH == 0 && currentM < 10)
                        isYesterday = 2;
                    else if (i == 1 && currentH == 0 && currentM == 10) // special case is below
                        isYesterday = -1;
                    else if (i == 2 && currentH == 1 && currentM == 0)
                        isYesterday = -1;
                    else if (i == 3 && currentH == 3 && currentM == 0)
                        isYesterday = -1;
                    else if (i == 4 && currentH == 6 && currentM == 0)
                        isYesterday = -1;
                    else if (i == 5 && currentH == 12 && currentM == 0)
                        isYesterday = -1;

                    shemen = chkNoDataX(msg["getRainfall" + i][0]["Shemen"], i, "Shemen");
                    clouds = chkNoDataX(msg["getRainfall" + i][0]["Clouds"], i, "Clouds");
                    high = chkNoDataX(msg["getRainfall" + i][0]["High"], i, "High");
                    bar = chkNoDataX(msg["getRainfall" + i][0]["Bar"], i, "Bar");
                    scrunch = chkNoDataX(msg["getRainfall" + i][0]["Scrunch"], i, "Scrunch");
                    jade = chkNoDataX(msg["getRainfall" + i][0]["Jade"], i, "Jade");
                    white = chkNoDataX(msg["getRainfall" + i][0]["White"], i, "White");
                    burg = chkNoDataX(msg["getRainfall" + i][0]["Burg"], i, "Burg");
                    west = chkNoDataX(msg["getRainfall" + i][0]["West"], i, "West");
                    mere = chkNoDataX(msg["getRainfall" + i][0]["Mere"], i, "Mere");

                    if (i > 0) {
                        if (isYesterday == -1) {
                            shemen = chkNoDataX(msg["getRainfall0"][0]["Shemen"], i, "Shemen");
                            clouds = chkNoDataX(msg["getRainfall0"][0]["Clouds"], i, "Clouds");
                            high = chkNoDataX(msg["getRainfall0"][0]["High"], i, "High");
                            bar = chkNoDataX(msg["getRainfall0"][0]["Bar"], i, "Bar");
                            scrunch = chkNoDataX(msg["getRainfall0"][0]["Scrunch"], i, "Scrunch");
                            jade = chkNoDataX(msg["getRainfall0"][0]["Jade"], i, "Jade");
                            white = chkNoDataX(msg["getRainfall0"][0]["White"], i, "White");
                            burg = chkNoDataX(msg["getRainfall0"][0]["Burg"], i, "Burg");
                            west = chkNoDataX(msg["getRainfall0"][0]["West"], i, "West");
                            mere = chkNoDataX(msg["getRainfall0"][0]["Mere"], i, "Mere");
                        }
                        else if (isYesterday == 0) {
                            shemen = chkDataValue(msg["getRainfall0"][0]["Shemen"], shemen, i, "Shemen");
                            clouds = chkDataValue(msg["getRainfall0"][0]["Clouds"], clouds, i, "Clouds");
                            high = chkDataValue(msg["getRainfall0"][0]["High"], high, i, "High");
                            bar = chkDataValue(msg["getRainfall0"][0]["Bar"], bar, i, "Bar");
                            scrunch = chkDataValue(msg["getRainfall0"][0]["Scrunch"], scrunch, i, "Scrunch");
                            jade = chkDataValue(msg["getRainfall0"][0]["Jade"], jade, i, "Jade");
                            white = chkDataValue(msg["getRainfall0"][0]["White"], white, i, "White");
                            burg = chkDataValue(msg["getRainfall0"][0]["Burg"], burg, i, "Burg");
                            west = chkDataValue(msg["getRainfall0"][0]["West"], west, i, "West");
                            mere = chkDataValue(msg["getRainfall0"][0]["Mere"], mere, i, "Mere");
                        }
                        else if (isYesterday == 2 && parseInt(i) == 6) {
                            shemen = chkDataValue(msg["getRainfallYesterday"][0]["Shemen"], 0, i, "Shemen");
                            clouds = chkDataValue(msg["getRainfallYesterday"][0]["Clouds"], 0, i, "Clouds");
                            high = chkDataValue(msg["getRainfallYesterday"][0]["High"], 0, i, "High");
                            bar = chkDataValue(msg["getRainfallYesterday"][0]["Bar"], 0, i, "Bar");
                            scrunch = chkDataValue(msg["getRainfallYesterday"][0]["Scrunch"], 0, i, "Scrunch");
                            jade = chkDataValue(msg["getRainfallYesterday"][0]["Jade"], 0, i, "Jade");
                            white = chkDataValue(msg["getRainfallYesterday"][0]["White"], 0, i, "White");
                            burg = chkDataValue(msg["getRainfallYesterday"][0]["Burg"], 0, i, "Burg");
                            west = chkDataValue(msg["getRainfallYesterday"][0]["West"], 0, i, "West");
                            mere = chkDataValue(msg["getRainfallYesterday"][0]["Mere"], 0, i, "Mere");
                        }
                        else if (isYesterday == 2) {
                            /*shemen = chkDataValue(msg["getRainfallYesterday"][0]["Shemen"], shemen, i, "Shemen");
                            clouds = chkDataValue(msg["getRainfallYesterday"][0]["Clouds"], clouds, i, "Clouds");
                            high = chkDataValue(msg["getRainfallYesterday"][0]["High"], high, i, "High");
                            bar = chkDataValue(msg["getRainfallYesterday"][0]["Bar"], bar, i, "Bar");
                            scrunch = chkDataValue(msg["getRainfallYesterday"][0]["Scrunch"], scrunch, i, "Scrunch");
                            jade = chkDataValue(msg["getRainfallYesterday"][0]["Jade"], jade, i, "Jade");
                            white = chkDataValue(msg["getRainfallYesterday"][0]["White"], white, i, "White");
                            burg = chkDataValue(msg["getRainfallYesterday"][0]["Burg"], burg, i, "Burg");
                            west = chkDataValue(msg["getRainfallYesterday"][0]["West"], west, i, "West");
                            mere = chkDataValue(msg["getRainfallYesterday"][0]["Mere"], mere, i, "Mere");*/

                            shemen = chkNoData([msg["getRainfallYesterday"][0]["Shemen"], msg["getRainfall" + i][0]["Shemen"]], yd_shemen - shemen, "Shemen");
                            clouds = chkNoData([msg["getRainfallYesterday"][0]["Clouds"], msg["getRainfall" + i][0]["Clouds"]], yd_clouds - clouds, "Clouds");
                            high = chkNoData([msg["getRainfallYesterday"][0]["High"], msg["getRainfall" + i][0]["High"]], yd_high - high, "High");
                            bar = chkNoData([msg["getRainfallYesterday"][0]["Bar"], msg["getRainfall" + i][0]["Bar"]], yd_bar - bar, "Bar");
                            scrunch = chkNoData([msg["getRainfallYesterday"][0]["Scrunch"], msg["getRainfall" + i][0]["Scrunch"]], yd_scrunch - scrunch, "Scrunch");
                            jade = chkNoData([msg["getRainfallYesterday"][0]["Jade"], msg["getRainfall" + i][0]["Jade"]], yd_jade - jade, "Jade");
                            white = chkNoData([msg["getRainfallYesterday"][0]["White"], msg["getRainfall" + i][0]["White"]], yd_white - white, "White");
                            burg = chkNoData([msg["getRainfallYesterday"][0]["Burg"], msg["getRainfall" + i][0]["Burg"]], yd_burg - burg, "Burg");
                            west = chkNoData([msg["getRainfallYesterday"][0]["West"], msg["getRainfall" + i][0]["West"]], yd_west - west, "West");
                            mere = chkNoData([msg["getRainfallYesterday"][0]["Mere"], msg["getRainfall" + i][0]["Mere"]], yd_mere - mere, "Mere");
                        }
                        else {
                            shemen = chk2DataValue(msg["getRainfall0"][0]["Shemen"], msg["getRainfallYesterday"][0]["Shemen"], shemen);
                            clouds = chk2DataValue(msg["getRainfall0"][0]["Clouds"], msg["getRainfallYesterday"][0]["Clouds"], clouds);
                            high = chk2DataValue(msg["getRainfall0"][0]["High"], msg["getRainfallYesterday"][0]["High"], high);
                            bar = chk2DataValue(msg["getRainfall0"][0]["Bar"], msg["getRainfallYesterday"][0]["Bar"], bar);
                            scrunch = chk2DataValue(msg["getRainfall0"][0]["Scrunch"], msg["getRainfallYesterday"][0]["Scrunch"], scrunch);
                            jade = chk2DataValue(msg["getRainfall0"][0]["Jade"], msg["getRainfallYesterday"][0]["Jade"], jade);
                            white = chk2DataValue(msg["getRainfall0"][0]["White"], msg["getRainfallYesterday"][0]["White"], white);
                            burg = chk2DataValue(msg["getRainfall0"][0]["Burg"], msg["getRainfallYesterday"][0]["Burg"], burg);
                            west = chk2DataValue(msg["getRainfall0"][0]["West"], msg["getRainfallYesterday"][0]["West"], west);
                            mere = chk2DataValue(msg["getRainfall0"][0]["Mere"], msg["getRainfallYesterday"][0]["Mere"], mere);
                        }
                    }

                    avgFall[i] = (shemen + clouds + high + bar + scrunch + jade + white + burg + west + mere) / (10 - nullStationX[i].length);

                    /*
                    shemen = chkNullOrZero(msg["getRainfall" + i][0]["Shemen"]);
                    clouds = chkNullOrZero(msg["getRainfall" + i][0]["Clouds"]);
                    high = chkNullOrZero(msg["getRainfall" + i][0]["High"]);
                    bar = chkNullOrZero(msg["getRainfall" + i][0]["Bar"]);
                    scrunch = chkNullOrZero(msg["getRainfall" + i][0]["Scrunch"]);
                    jade = chkNullOrZero(msg["getRainfall" + i][0]["Jade"]);
                    white = chkNullOrZero(msg["getRainfall" + i][0]["White"]);
                    burg = chkNullOrZero(msg["getRainfall" + i][0]["Burg"]);
                    west = chkNullOrZero(msg["getRainfall" + i][0]["West"]);
                    mere = chkNullOrZero(msg["getRainfall" + i][0]["Mere"]);*/

                    shemen = chkNullOrZero(msg["getRainfall" + i][0]["Shemen"], shemen);
                    clouds = chkNullOrZero(msg["getRainfall" + i][0]["Clouds"], clouds);
                    high = chkNullOrZero(msg["getRainfall" + i][0]["High"], high);
                    bar = chkNullOrZero(msg["getRainfall" + i][0]["Bar"], bar);
                    scrunch = chkNullOrZero(msg["getRainfall" + i][0]["Scrunch"], scrunch);
                    jade = chkNullOrZero(msg["getRainfall" + i][0]["Jade"], jade);
                    white = chkNullOrZero(msg["getRainfall" + i][0]["White"], white);
                    burg = chkNullOrZero(msg["getRainfall" + i][0]["Burg"], burg);
                    west = chkNullOrZero(msg["getRainfall" + i][0]["West"], west);
                    mere = chkNullOrZero(msg["getRainfall" + i][0]["Mere"], mere);

                    if (isYesterday > 0) {
                        shemen = chkNullOrZero(msg["getRainfallYesterday"][0]["Shemen"], shemen);
                        clouds = chkNullOrZero(msg["getRainfallYesterday"][0]["Clouds"], clouds);
                        high = chkNullOrZero(msg["getRainfallYesterday"][0]["High"], high);
                        bar = chkNullOrZero(msg["getRainfallYesterday"][0]["Bar"], bar);
                        scrunch = chkNullOrZero(msg["getRainfallYesterday"][0]["Scrunch"], scrunch);
                        jade = chkNullOrZero(msg["getRainfallYesterday"][0]["Jade"], jade);
                        white = chkNullOrZero(msg["getRainfallYesterday"][0]["White"], white);
                        burg = chkNullOrZero(msg["getRainfallYesterday"][0]["Burg"], burg);
                        west = chkNullOrZero(msg["getRainfallYesterday"][0]["West"], west);
                        mere = chkNullOrZero(msg["getRainfallYesterday"][0]["Mere"], mere);
                    }

                    shemenAll[i] = shemen;
                    cloudsAll[i] = clouds;
                    highAll[i] = high;
                    barAll[i] = bar;
                    scrunchAll[i] = scrunch;
                    jadeAll[i] = jade;
                    whiteAll[i] = white;
                    burgAll[i] = burg;
                    westAll[i] = west;
                    mereAll[i] = mere;
                }
                else {
                    avgFall[i] = 0;
                    shemenAll[i] = 0;
                    cloudsAll[i] = 0;
                    highAll[i] = 0;
                    barAll[i] = 0;
                    scrunchAll[i] = 0;
                    jadeAll[i] = 0;
                    whiteAll[i] = 0;
                    burgAll[i] = 0;
                    westAll[i] = 0;
                    mereAll[i] = 0;
                }

            }
            if (chkValueNoData($("#avgFall").html()))
                // 今日累積雨量的值寫入detail頁面裡面  ( 20210430 )
                // 外層顯示的值(今日累積雨量) = detail的今日累積雨量
                $("#avgFall").parent().parent().off().on("click", function () { $("#stName").html("石門平均雨量"); goDetailPage(Math.round(     parseFloat((new_avgFall / (10 - nullStation.length)).toPrecision(12))         * 10) / 10, avgFall[1], avgFall[2], avgFall[3], avgFall[4], avgFall[5], avgFall[6]); });
            $("#shemen").parent().parent().off().on("click", function () { $("#stName").html("石門站"); goDetailPage(new_shemen, shemenAll[1], shemenAll[2], shemenAll[3], shemenAll[4], shemenAll[5], shemenAll[6]); });
            $("#clouds").parent().parent().off().on("click", function () { $("#stName").html("霞雲站"); goDetailPage(new_clouds, cloudsAll[1], cloudsAll[2], cloudsAll[3], cloudsAll[4], cloudsAll[5], cloudsAll[6]); });
            $("#high").parent().parent().off().on("click", function () { $("#stName").html("高義站"); goDetailPage(new_high, highAll[1], highAll[2], highAll[3], highAll[4], highAll[5], highAll[6]); });
            $("#bar").parent().parent().off().on("click", function () { $("#stName").html("巴陵站"); goDetailPage(new_bar, barAll[1], barAll[2], barAll[3], barAll[4], barAll[5], barAll[6]); });
            $("#scrunch").parent().parent().off().on("click", function () { $("#stName").html("嘎拉賀站"); goDetailPage(new_scrunch, scrunchAll[1], scrunchAll[2], scrunchAll[3], scrunchAll[4], scrunchAll[5], scrunchAll[6]); });
            $("#jade").parent().parent().off().on("click", function () { $("#stName").html("玉峰站"); goDetailPage(new_jade, jadeAll[1], jadeAll[2], jadeAll[3], jadeAll[4], jadeAll[5], jadeAll[6]); });
            $("#white").parent().parent().off().on("click", function () { $("#stName").html("白石站"); goDetailPage(new_white, whiteAll[1], whiteAll[2], whiteAll[3], whiteAll[4], whiteAll[5], whiteAll[6]); });
            $("#burg").parent().parent().off().on("click", function () { $("#stName").html("鎮西堡站"); goDetailPage(new_burg, burgAll[1], burgAll[2], burgAll[3], burgAll[4], burgAll[5], burgAll[6]); });
            $("#west").parent().parent().off().on("click", function () { $("#stName").html("西丘斯山站"); goDetailPage(new_west, westAll[1], westAll[2], westAll[3], westAll[4], westAll[5], westAll[6]); });
            if (chkValueNoData($("#mere").html()))
                $("#mere").parent().parent().off().on("click", function () { $("#stName").html("池端站"); goDetailPage(new_mere, mereAll[1], mereAll[2], mereAll[3], mereAll[4], mereAll[5], mereAll[6]); });

            // $("#linkA").attr("src", "http://fhy.wra.gov.tw/dmchy/wra/webcia/components/CloudRadar.aspx?groupList=12,21,99&userId=ddmt17&userEmail=&userTel=&title=wramoea&dept=0&system=dmchyV2");
            // $("#linkB").attr("src", "http://fhy.wra.gov.tw/dmchy/wra/webcia/components/RainSummery.aspx?groupList=12,21,99&userId=ddmt17&userEmail=&userTel=&title=wramoea&dept=0&system=dmchyV2");
            // $("#linkC").attr("src", "http://fhy.wra.gov.tw/dmchy/wra/webcia/components/CloudRad.aspx?groupList=12,21,99&userId=ddmt17&userEmail=&userTel=&title=wramoea&dept=0&system=dmchyV2");
            // $("#linkD").attr("src", "http://fhy.wra.gov.tw/dmchy/wra/WebCIA/components/CloudRed.aspx?groupList=12,21,99&userId=ddmt17&userEmail=&userTel=&title=wramoea&dept=0&system=dmchyV2");

        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getRainFallAVG(isDay) {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getRainfallAVG?isDay=" + isDay,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {


            var d = new Date();
            if (d.getMonth() == "0" && d.getDate() == "1") {
                $("#dTotalM").html($("#avgFall").html());
                $("#dTotalY").html($("#avgFall").html());
            }
            else if (d.getDate() == "1") {
                $("#dTotalM").html($("#avgFall").html());
            }
            else {
                var xc = msg["getRainfallAVG"]
                if (isDay) {
                    $("#dTotalM").countTo(
                        {
                            from: 0,
                            to: xc[0]["allTotal"].toFixed(1),
                            speed: 1500,
                            refreshInterval: 50,
                            decimals: 2,
                            onComplete: function (value) {
                                console.debug(this);
                            }
                        });
                }
                else {
                    $("#dTotalY").countTo(
                        {
                            from: 0,
                            to: xc[0]["allTotal"].toFixed(1),
                            speed: 1500,
                            refreshInterval: 50,
                            decimals: 2,
                            onComplete: function (value) {
                                console.debug(this);
                            }
                        });
                }
            }
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function getRainDataAnalysisAllRangeByHours(msg) {
    // var rainY = msg["getRainDataAnalysisAllRangeByHours"];
    var New_rainY = msg["getRainDataAnalysisAllRangeByHours_New"]; // here
    var data_Minute = msg["getRainDataAnalysisAllRangeByMinute"];
    // console.log('雨量查詢小時 原始',rainY);
    // console.log('雨量查詢小時 更改',New_rainY);
    
    var rainTotalY = 0;
    
    var timeblockY = [];
    var timeblockYPV = [];
    
    var date = new Date();
    var utcSearch = Date.UTC(parseInt($('#eSDateText').val().substring(0, 3)) + 1911, parseInt($('#eSDateText').val().substring(4, 6)) - 1, parseInt($('#eSDateText').val().substring(7, 9)));
    var utcToday = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    var utcHourNow = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
    var utcHourNext = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()+1);
    var dateMinHour = parseInt(msg["getRainDataAnalysisAllRangeByMinute"][0].Indate.substring(11,13));
    
    for (let i = 1; i < New_rainY.length; i++) { // 從1開始是因為當天的00點不算
        
        timeblockYPV.push([Date.UTC(New_rainY[i].indate.substring(0, 4), parseInt(New_rainY[i].indate.substring(5, 7)) - 1, New_rainY[i].indate.substring(8, 10), New_rainY[i].indate.substring(11, 13)), parseFloat(New_rainY[i].total) / 10]);
        // rainTotalY += parseFloat(parseFloat(New_rainY[i].total / 10).toFixed(1));
        rainTotalY += parseFloat(New_rainY[i].total / 10);
        
    }
    if (utcSearch == utcToday) { /* 查詢結束日期等於今天 加上10分鐘的值在下個小時 */
        if (dateMinHour == 0) {
            if (data_Minute.length > 1) {
                var MinVal = parseFloat(((data_Minute[data_Minute.length - 1].total - 0) / 10).toFixed(2));
                timeblockYPV.push([utcHourNext,MinVal]);
                var v = rainTotalY + MinVal;
                rainTotalY = parseFloat(v.toPrecision(12));
            }
        }
        else
        {
            if (data_Minute.length > 1) {
                // // debugger;
                // var utclastBlock = timeblockYPV[timeblockYPV.length - 1][0];
                var MinVal = parseFloat(((data_Minute[data_Minute.length - 1].total - data_Minute[0].total) / 10).toFixed(2));
                timeblockYPV.push([utcHourNext,MinVal]);
                var v = rainTotalY + MinVal;
                rainTotalY = parseFloat(v.toPrecision(12));
                // if (utclastBlock == utcHourNow) {
                //     var v = timeblockYPV[timeblockYPV.length - 1][1] + MinVal;
                //     timeblockYPV[timeblockYPV.length - 1][1] = parseFloat(v.toPrecision(12)); // 避免浮點數運算後導致小數點造成突出
                //     rainTotalY += MinVal;
                // }
    
                // if (utclastBlock != utcHourNow) {
                //     timeblockYPV.push([utcHourNow, MinVal])
                //     rainTotalY += MinVal;
                // }
                // else if (utclastBlock == utcHourNow) {
                //     timeblockYPV[timeblockYPV.length-1][1] += MinVal;
                //     rainTotalY += MinVal;
                // }
            }
        }
    }
    // year
    // for (var i = 0; i < rainY.length; i++) {
    //     ////DayRAList
    //     if (i == 0/* || rainY[i].dTime.endsWith("00:00:00")*/) {
    //         timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10)), parseFloat(rainY[i].value)]);
    //         rainTotalY = parseFloat(rainY[i].value);
    //     }
    //     else {
    //         var v = (parseFloat(rainY[i].value) - parseFloat(rainY[i - 1].value));
    //         if (v < 0) {
    //             rainY[i].value = rainY[i - 1].value;
    //             v = 0;
    //         }

    //         timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), rainY[i].dTime.substring(11, 13)), v]);
    //         rainTotalY += v;
    //     }

    //     ////RainfallList
    //     //if (i == 0/* || rainY[i].dTime.endsWith("00:00:00")*/) {
    //     //    timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), parseInt(rainY[i].dTime.substring(11, 13)) + 1), parseFloat(rainY[i].value)]);
    //     //    rainTotalY = parseFloat(rainY[i].value);
    //     //}
    //     //else if (i != 0 && rainY[i].dTime.endsWith("00:00:00")) {
    //     //    timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), parseInt(rainY[i].dTime.substring(11, 13)) + 1 ), parseFloat(rainY[i].value)]);
    //     //    rainTotalY += parseFloat(rainY[i].value);
    //     //}
    //     //else {
    //     //    var v = (parseFloat(rainY[i].value) - parseFloat(rainY[i - 1].value));
    //     //    if (v < 0) {
    //     //        rainY[i].value = rainY[i - 1].value;
    //     //        v = 0;
    //     //    }

    //     //    timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), parseInt(rainY[i].dTime.substring(11, 13)) + 1 ), v]);
    //     //    rainTotalY += v;
    //     //}
    // }
    rainTotalY = Math.round( rainTotalY  * 10) / 10 ; // 四捨五入
    $("span[class='totalAll']").html(rainTotalY.toFixed(1));

    StockChart[100] = Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
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
        xAxis: {
            minRange: 8 * 3600 * 1000,
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
                    headerFormat: '{point.x:%Y/%m/%d %H:00}<br/>',
                    // valueSuffix: '',
                    // pointFormatter: function () {
                    //     return this.options.y.toFixed(2); // here
                    // }
                }

            }]
    });

    //zoom to first 8 hours data
    if (New_rainY.length > 8)
        StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[7][0]);
}

function getRainDataAnalysisAllRangeByDays(msg) {
    // // debugger;
    var rainY = msg["getRainDataAnalysisAllRangeByDays"];
    var rainY_shangPing = msg["getRainDataAnalysisAllRangeByDays_new"];
    var New_rainY = msg["getRainDataAnalysisAllRangeByDays_New"];
    var shimen_Hour = msg["getRainDataAnalysisAllRangeByDays_Hour"];
    var shemen_Minute = msg["getRainDataAnalysisAllRangeByDays_Minute"];
    // console.log('雨量查詢天 原始',rainY);
    // console.log('雨量查詢天 更改',New_rainY);

    var rainTotalY = 0;

    var timeblockY = [];
    var timeblockYPV = [];

    var date = new Date();
    var utcSearch = Date.UTC(parseInt($('#eSDateText').val().substring(0, 3)) + 1911, parseInt($('#eSDateText').val().substring(4, 6)) - 1, parseInt($('#eSDateText').val().substring(7, 9)));
    var utcToday = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());


    // *因為石門跟上坪堰 天的呈現是共用的，所以當上坪堰查詢時，會沒有這個資料來源 ==> line : 233
    if (New_rainY != undefined) {  /* 石門 */

        for (var i = 0; i < New_rainY.length; i++) {
            timeblockYPV.push([Date.UTC(New_rainY[i].date.substring(0, 4), parseInt(New_rainY[i].date.substring(5, 7)) - 1, New_rainY[i].date.substring(8, 10)), parseFloat(New_rainY[i].SM_RAIN)]);
            rainTotalY += parseFloat(New_rainY[i].SM_RAIN);

        }
        if (shimen_Hour != undefined && shemen_Minute != undefined) {
            var shimen_HourAddMin = 0;
            for (let i = 0; i < shimen_Hour.length; i++) { // Hour
                shimen_HourAddMin += parseFloat((shimen_Hour[i].total / 10).toFixed(2));
            }
            if (shemen_Minute.length > 1) { // Minute
                var val = parseFloat(((shemen_Minute[shemen_Minute.length - 1].total - shemen_Minute[0].total) / 10).toFixed(2));
                shimen_HourAddMin += val;
            }
        }
        if (utcSearch == utcToday) { // *如果結束日期是今天，加上今天的值上去
            timeblockYPV.push([utcToday,  parseFloat( shimen_HourAddMin.toPrecision(12) )]);
            
            rainTotalY += parseFloat( shimen_HourAddMin.toPrecision(12) );
        }
    }
    else /* 上坪堰 */ {
        // for (var i = 0; i < rainY.length; i++) {
        //     timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10)), parseFloat(rainY[i].value)]);
        //     rainTotalY += parseFloat(rainY[i].value);
        // }
        
        for (var i = 0; i < rainY_shangPing.length; i++) {
            timeblockYPV.push([Date.UTC(rainY_shangPing[i].date.substring(0, 4), parseInt(rainY_shangPing[i].date.substring(5, 7)) - 1, rainY_shangPing[i].date.substring(8, 10)), parseFloat(rainY_shangPing[i].rainfall)]);
            rainTotalY += parseFloat(rainY_shangPing[i].rainfall);
        }
        if (utcSearch == utcToday) { // *如果結束日期是今天，加上今天的值上去
            var todayVal = parseFloat( (rainY[rainY.length-1].value).toPrecision(12) );
            timeblockYPV.push([utcToday, todayVal ]);
            var v = rainTotalY + todayVal;
            rainTotalY = parseFloat( v.toPrecision(12) );
        }
    }



    // year
    // for (var i = 0; i < rainY.length; i++) {
    //         timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10)), parseFloat(rainY[i].value)]);
    //         rainTotalY += parseFloat(rainY[i].value);
    // }
    rainTotalY = Math.round( rainTotalY * 10 ) / 10;
    $("span[class='totalAll']").html(rainTotalY.toFixed(1));

    StockChart[100] = Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
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
        xAxis: {
            gridLineWidth: 1,
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%m/%d',
            },
            labels: {
                format: '{value:%m/%d}',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: '',
                    pointFormatter: function () {
                        return this.options.y.toFixed(1);
                    }
                }

            }]
    });
    if (New_rainY != undefined) {
        if (New_rainY.length > 10) // 顯示 X軸 一次顯示幾天
            StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[9][0]);
    }
    else {
        if (rainY.length > 10)
            StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[9][0]);
    }

    //if (rainY.length > 90)
    //    StockChart[100]['zoom3m'](100);

    // if (rainY.length > 10)
    //     StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[9][0]);
}

function getRainDataShangPingAnalysisAllRangeByHours(msg) {
    var rainY = msg["getRainDataShangPingAnalysisAllRangeByHours"];
    // console.log('查詢上坪堰', rainY)
    // // debugger;
    var rainTotalY = 0;
    var timeblockY = [];
    var timeblockYPV = [];

    // year
    for (var i = 0; i < rainY.length; i++) {
        if (i == 0 || rainY[i].dTime.endsWith("01:00:00")) {
            timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), rainY[i].dTime.substring(11, 13)), parseFloat(rainY[i].value)]);
            rainTotalY += parseFloat(rainY[i].value);
        }
        else {
            // var v = (parseFloat(rainY[i].value) - parseFloat(rainY[i - 1].value));
            var v = parseFloat( (parseFloat(rainY[i].value) - parseFloat(rainY[i - 1].value )).toPrecision(12) ); // 浮點數 處理
            if (v < 0) {
                rainY[i].value = rainY[i - 1].value;
                v = 0;
            }

            timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10), rainY[i].dTime.substring(11, 13)), v]);
            rainTotalY += v;
        }
    }
    
    var date = new Date();
    var lastIndex = rainY.length - 1;
    var utcSearch = Date.UTC(parseInt($('#eSDateText').val().substring(0, 3)) + 1911, parseInt($('#eSDateText').val().substring(4, 6)) - 1, parseInt($('#eSDateText').val().substring(7, 9)));
    var utcToday = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    var next_hour = Date.UTC(rainY[lastIndex-1].dTime.substring(0, 4), parseInt(rainY[lastIndex-1].dTime.substring(5, 7)) - 1, rainY[lastIndex-1].dTime.substring(8, 10), parseInt(rainY[lastIndex-1].dTime.substring(11, 13))+1);
    
    if (utcSearch == utcToday) { /* 查詢結束日期等於今天 加上10分鐘的值在下個小時 */
        if (rainY.length > 1) {
            var MinVal = parseFloat((rainY[lastIndex].value - rainY[lastIndex - 1].value).toPrecision(12));
            if (MinVal > 0) {// 大於0再加上去
                timeblockYPV.push([next_hour,MinVal]);
                var val = rainTotalY + MinVal;
                rainTotalY = parseFloat(val.toPrecision(12));
            }
        }
    }
                
               
                                
    $("span[class='totalAll']").html(rainTotalY.toFixed(1));
    StockChart[100] = Highcharts.StockChart({
        chart: {
            renderTo: 'searchall',
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
        xAxis: {
            ordinal: false,
            minRange: 8 * 3600 * 1000,
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
                    headerFormat: '{point.x:%Y/%m/%d %H:00}<br/>',
                    valueSuffix: '',
                    // pointFormatter: function () {
                    //     return this.options.y.toFixed(1);
                    // }
                }

            }]
    });

    //zoom to first 8 hours data
    if (rainY.length > 8)
        StockChart[100].xAxis[0].setExtremes(timeblockYPV[0][0], timeblockYPV[7][0]);
}

function goDetailPage(now, m10, h1, h3, h6, h12, h24) {
    //$("#btnRT").show();
    $("#btnRT").off().on("click", function () {
        $("#pageFirst").show();
        $("#pageSecond").hide();
        //$("#btnRT").hide();
    });

    // now = now != null ? now : 0;
    // m10 = m10 != null ? m10 : 0;
    // h1 = h1 != null ? h1 : 0;
    // h3 = h3 != null ? h3 : 0;
    // h6 = h6 != null ? h6 : 0;
    // h12 = h12 != null ? h12 : 0;
    // h24 = h24 != null ? h24 : 0;

    now = now == null ? 0 : Number.isNaN(now) ? "暫無資料" : now;
    m10 = m10 == null ? 0 : Number.isNaN(m10) ? "暫無資料" : m10;
    h1 = h1 == null ? 0 : Number.isNaN(h1) ? "暫無資料" : h1;
    h3 = h3 == null ? 0 : Number.isNaN(h3) ? "暫無資料" : h3;
    h6 = h6 == null ? 0 : Number.isNaN(h6) ? "暫無資料" : h6;
    h12 = h12 == null ? 0 : Number.isNaN(h12) ? "暫無資料" : h12;
    h24 = h24 == null ? 0 : Number.isNaN(h24) ? "暫無資料" : h24;

    $("#pageFirst").hide();
    $("#pageSecond").show();

    $("#now").countTo(
        {
            from: 0,
            // to: now.toFixed(1),
            to: now === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(now) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });

    $("#m10").countTo(
        {
            from: 0,
            // to: m10.toFixed(1),
            to: m10 === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(m10) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });

    $("#h1").countTo(
        {
            from: 0,
            // to: h1.toFixed(1),
            to: h1 === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(h1) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });

    $("#h3").countTo(
        {
            from: 0,
            // to: h3.toFixed(1),
            to: h3 === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(h3) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });

    $("#h6").countTo(
        {
            from: 0,
            // to: h6.toFixed(1),
            to: h6 === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(h6) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });

    $("#h12").countTo(
        {
            from: 0,
            // to: h12.toFixed(1),
            to: h12 === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(h12) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });

    $("#h24").countTo(
        {
            from: 0,
            // to: h24.toFixed(1),
            to: h24 === "暫無資料" ? "暫無資料" : (Math.round(parseFloat(h24) * 10) / 10).toFixed(1),
            speed: 1500,
            decimals: 1,
            refreshInterval: 50,
            onComplete: function (value) {
                console.debug(this);
            }
        });
}

function getRainFallDataGov(tab, index) {
    $("#btnTitle" + tab).html($("#rainFallList" + tab).children("li").children("a").eq(index).html());
    //$("#dTitle" + tab).html($("#rainFallList" + tab).children("li").children("a").eq(index).html());
    $("#avgFall1").html(initVal);
    $("#AG10").html(initVal);
    $("#A210").html(initVal);
    $("#avgFall2").html(initVal);
    $("#C490").html(initVal);
    $("#C630").html(initVal);
    $("#AD50").html(initVal);
    $("#avgFall3").html(initVal);
    $("#D550").html(initVal);
    $("#D410").html(initVal);
    $("#D420").html(initVal);

    $("#E467050").html(initVal);
    $("#C0C590").html(initVal);
    $("#C0C700").html(initVal);
    $("#C0C540").html(initVal);
    $("#C0C480").html(initVal);
    $("#C0C620").html(initVal);
    $("#C0D650").html(initVal);
    $("#C0C660").html(initVal);
    $("#C0C700").html(initVal);
    $("#C0C490").html(initVal);
    $("#C1C510").html(initVal);
    $("#C0C650").html(initVal);
    //隆恩堰
    $("#C0D560").html(initVal);
    $("#C1D630").html(initVal);
    $("#C0D540").html(initVal);

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getRainfallGov",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var avg1Val = 0, avg2Val = 0, avg3Val = 0, avg4Val = 0, avg5Val = 0, avg6Val = 0;//隆恩堰
            var mnow = 0, m10 = 0, h1 = 0, h3 = 0, h6 = 0, h12 = 0, h24 = 0;
            var avg3now = 0, avg3m10 = 0, avg3h1 = 0, avg3h3 = 0, avg3h6 = 0, avg3h12 = 0, avg3h24 = 0;
            var siteIDArr = [
                ["01AG10", "01A210"],
                ["C0C490", "C0C630", "C0AD50"],
                ["467050", "C0C590", "C0C700", "C0C540", "C0C480", "C0C620"],
                ["C0D650", "C0C660", "C0C700", "C0C490", "C1C510", "C0C650"],
                ["C0D550", "C1D410", "C1D420"],
                ["C0D560", "C1D630", "C0D540"] //隆恩堰
            ];
            var siteIDHtmlArr = [
                ["AG10", "A210"],
                ["C490", "C630", "AD50"],
                ["E467050", "C0C590", "C0C700", "C0C540", "C0C480", "C0C620"],
                ["C0D650", "C0C660", "C0C700", "C0C490", "C1C510", "C0C650"],
                ["D550", "D410", "D420"],
                ["C0D560", "C1D630", "C0D540"] //隆恩堰
            ];
            var siteNameArr = [
                ["熊空山", "大豹"],
                ["八德國小", "員樹林國小", "鶯歌國小"],
                ["新屋", "觀音", "中壢", "埔心", "桃園", "蘆竹"],
                ["湖口", "楊梅", "中壢", "八德", "水尾", "平鎮"],
                ["雪霸", "白蘭", "太閣南"],
                ["竹東(支流上坪溪)", "飛鳳山(支流大坑溪)", "橫山(支流油羅溪)"] //隆恩堰
            ];

            var t = tab - 1;

            for (var i = 0; i < msg["getRainfall"].length; i++) {
                mnow = msg["getRainfall"][i]["Rainfall0"];
                m10 = msg["getRainfall"][i]["Rainfall1"];
                h1 = msg["getRainfall"][i]["Rainfall2"];
                h3 = msg["getRainfall"][i]["Rainfall3"];
                h6 = msg["getRainfall"][i]["Rainfall4"];
                h12 = msg["getRainfall"][i]["Rainfall5"];
                h24 = msg["getRainfall"][i]["Rainfall6"];

                var br = false;
                //for (var t = 0; t < siteIDArr.length; t++) {
                for (var q = 0; q < siteIDArr[t].length; q++) {
                    if (msg["getRainfall"][i]["SiteID"] == siteIDArr[t][q]) {

                        var rValue = msg["getRainfall"][i]["Rainfall" + index];
                        avg3now += mnow;
                        avg3m10 += m10;
                        avg3h1 += h1;
                        avg3h3 += h3;
                        avg3h6 += h6;
                        avg3h12 += h12;
                        avg3h24 += h24;

                        switch (t) {
                            case 0:
                                avg1Val += rValue;
                                break;
                            case 1:
                                avg2Val += rValue;
                                break;
                            case 2:
                                avg3Val += rValue;
                                break;
                            case 3:
                                avg4Val += rValue;
                                break;
                            case 4:
                                avg5Val += rValue;
                                break;
                            case 5:
                                avg6Val += rValue;
                                break;

                        }
                        $("#" + siteIDHtmlArr[t][q]).countTo(
                            {
                                from: 0,
                                to: rValue,
                                speed: 1500,
                                decimals: 1,
                                refreshInterval: 50,
                                onComplete: function (value) {
                                    console.debug(this);
                                }
                            });

                        $("#" + siteIDHtmlArr[t][q]).parent().parent().off().on("click", { mnow: mnow, m10: m10, h1: h1, h3: h3, h6: h6, h12: h12, h24: h24, name: siteNameArr[t][q] }, function (event) { $("#stName").html(event.data.name); goDetailPage(event.data.mnow, event.data.m10, event.data.h1, event.data.h3, event.data.h6, event.data.h12, event.data.h24); });

                        if (siteIDArr[t][q] == "C0C490" || siteIDArr[t][q] == "C0C700") {
                            $("#F" + siteIDArr[t][q]).countTo(
                                {
                                    from: 0,
                                    to: rValue,
                                    speed: 1500,
                                    decimals: 1,
                                    refreshInterval: 50,
                                    onComplete: function (value) {
                                        console.debug(this);
                                    }
                                });
                            $("#F" + siteIDArr[t][q]).parent().parent().off().on("click", { mnow: mnow, m10: m10, h1: h1, h3: h3, h6: h6, h12: h12, h24: h24 }, function (event) { $("#stName").html(siteNameArr[t][q]); goDetailPage(event.data.mnow, event.data.m10, event.data.h1, event.data.h3, event.data.h6, event.data.h12, event.data.h24); });

                        }
                        br = true;
                        break;
                    }
                }
                //due to there's duplicate sites, dont break this.
                //if (br)
                //    break;
                //}
            }

            avg3now = (avg3now / siteIDArr[t].length).toFixed(2);
            avg3m10 = (avg3m10 / siteIDArr[t].length).toFixed(2);;
            avg3h1 = (avg3h1 / siteIDArr[t].length).toFixed(2);;
            avg3h3 = (avg3h3 / siteIDArr[t].length).toFixed(2);;
            avg3h6 = (avg3h6 / siteIDArr[t].length).toFixed(2);;
            avg3h12 = (avg3h12 / siteIDArr[t].length).toFixed(2);;
            avg3h24 = (avg3h24 / siteIDArr[t].length).toFixed(2);;
            try {
                $("#dDate").html((msg["getRainfall"][0]["PublishTime"].substring(0, 4) - 1911) + "年" + msg["getRainfall"][0]["PublishTime"].substring(5, 7) + "月" + msg["getRainfall"][0]["PublishTime"].substring(8, 10) + "日" + msg["getRainfall"][0]["PublishTime"].substring(11, 16));
                $("#a_date").html((msg["getRainfall"][0]["PublishTime"].substring(0, 4) - 1911) + "年" + msg["getRainfall"][0]["PublishTime"].substring(5, 7) + "月" + msg["getRainfall"][0]["PublishTime"].substring(8, 10) + "日" + msg["getRainfall"][0]["PublishTime"].substring(11, 16));
            } catch (error) {
                $("#dDate").html("暫無資料");
                $("#a_date").html("暫無資料");
            }
            
            $("#avgFall1").html((avg1Val / siteIDArr[0].length).toFixed(1));
            $("#avgFall2").html((avg2Val / siteIDArr[1].length).toFixed(1));
            $("#avgFall3").html((avg3Val / siteIDArr[2].length).toFixed(1));
            $("#avgFall4").html((avg4Val / siteIDArr[3].length).toFixed(1));
            $("#avgFall5").html((avg5Val / siteIDArr[4].length).toFixed(1));
            $("#avgFall6").html((avg6Val / siteIDArr[5].length).toFixed(1));//隆恩堰 
            $("#avgFall1").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("三峽河平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
            $("#avgFall2").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("鳶山堰平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
            $("#avgFall3").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("桃灌平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
            $("#avgFall4").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("石灌平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
            $("#avgFall5").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("上坪堰平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
            // 隆恩堰
            $("#avgFall6").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("隆恩堰平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
        },
        error: function (e) {
            navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });

    // // 測試雨量站的sql
    // $.ajax({
    //     crossDomain: true,
    //     cache: false,
    //     headers: { "cache-control": "no-cache" },
    //     url: serviceURL + "/getWraNBData.asmx/getRainfallGov",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "jsonp",
    //     success: function (msg) {
    //         var avg1Val = 0, avg2Val = 0, avg3Val = 0, avg4Val = 0, avg5Val = 0, avg6Val = 0;//隆恩堰
    //         var mnow = 0, m10 = 0, h1 = 0, h3 = 0, h6 = 0, h12 = 0, h24 = 0;
    //         var avg3now = 0, avg3m10 = 0, avg3h1 = 0, avg3h3 = 0, avg3h6 = 0, avg3h12 = 0, avg3h24 = 0;
    //         var siteIDArr = [
    //             ["01AG10", "01A210"],
    //             ["C0C490", "C0C630", "C0AD50"],
    //             ["467050", "C0C590", "C0C700", "C0C540", "C0C480", "C0C620"],
    //             ["C0D650", "C0C660", "C0C700", "C0C490", "C1C510", "C0C650"],
    //             ["C0D550", "C1D410", "C1D420"],
    //             ["C0D560", "C1D630", "C0D540"] //隆恩堰
    //         ];
    //         var siteIDHtmlArr = [
    //             ["AG10", "A210"],
    //             ["C490", "C630", "AD50"],
    //             ["E467050", "C0C590", "C0C700", "C0C540", "C0C480", "C0C620"],
    //             ["C0D650", "C0C660", "C0C700", "C0C490", "C1C510", "C0C650"],
    //             ["D550", "D410", "D420"],
    //             ["C0D560", "C1D630", "C0D540"] //隆恩堰
    //         ];
    //         var siteNameArr = [
    //             ["熊空山", "大豹"],
    //             ["八德國小", "員樹林國小", "鶯歌國小"],
    //             ["新屋", "觀音", "中壢", "埔心", "桃園", "蘆竹"],
    //             ["湖口", "楊梅", "中壢", "八德", "水尾", "平鎮"],
    //             ["雪霸", "白蘭", "太閣南"],
    //             ["竹東(支流上坪溪)", "飛鳳山(支流大坑溪)", "橫山(支流油羅溪)"] //隆恩堰
    //         ];

    //         var t = tab - 1;

    //         for (var i = 0; i < msg["getRainfall_new"].length; i++) {
    //             mnow = msg["getRainfall_new"][i]["Rainfall0"];
    //             m10 = msg["getRainfall_new"][i]["Rainfall1"];
    //             h1 = msg["getRainfall_new"][i]["Rainfall2"];
    //             h3 = msg["getRainfall_new"][i]["Rainfall3"];
    //             h6 = msg["getRainfall_new"][i]["Rainfall4"];
    //             h12 = msg["getRainfall_new"][i]["Rainfall5"];
    //             h24 = msg["getRainfall_new"][i]["Rainfall6"];

    //             var br = false;
    //             //for (var t = 0; t < siteIDArr.length; t++) {
    //             for (var q = 0; q < siteIDArr[t].length; q++) {
    //                 if (msg["getRainfall_new"][i]["SiteID"] == siteIDArr[t][q]) {

    //                     var rValue = msg["getRainfall_new"][i]["Rainfall" + index];
    //                     avg3now += mnow;
    //                     avg3m10 += m10;
    //                     avg3h1 += h1;
    //                     avg3h3 += h3;
    //                     avg3h6 += h6;
    //                     avg3h12 += h12;
    //                     avg3h24 += h24;

    //                     switch (t) {
    //                         case 0:
    //                             avg1Val += rValue;
    //                             break;
    //                         case 1:
    //                             avg2Val += rValue;
    //                             break;
    //                         case 2:
    //                             avg3Val += rValue;
    //                             break;
    //                         case 3:
    //                             avg4Val += rValue;
    //                             break;
    //                         case 4:
    //                             avg5Val += rValue;
    //                             break;
    //                         case 5:
    //                             avg6Val += rValue;
    //                             break;

    //                     }
    //                     $("#" + siteIDHtmlArr[t][q]).countTo(
    //                         {
    //                             from: 0,
    //                             to: rValue,
    //                             speed: 1500,
    //                             decimals: 1,
    //                             refreshInterval: 50,
    //                             onComplete: function (value) {
    //                                 console.debug(this);
    //                             }
    //                         });

    //                     $("#" + siteIDHtmlArr[t][q]).parent().parent().off().on("click", { mnow: mnow, m10: m10, h1: h1, h3: h3, h6: h6, h12: h12, h24: h24, name: siteNameArr[t][q] }, function (event) { $("#stName").html(event.data.name); goDetailPage(event.data.mnow, event.data.m10, event.data.h1, event.data.h3, event.data.h6, event.data.h12, event.data.h24); });

    //                     if (siteIDArr[t][q] == "C0C490" || siteIDArr[t][q] == "C0C700") {
    //                         $("#F" + siteIDArr[t][q]).countTo(
    //                             {
    //                                 from: 0,
    //                                 to: rValue,
    //                                 speed: 1500,
    //                                 decimals: 1,
    //                                 refreshInterval: 50,
    //                                 onComplete: function (value) {
    //                                     console.debug(this);
    //                                 }
    //                             });
    //                         $("#F" + siteIDArr[t][q]).parent().parent().off().on("click", { mnow: mnow, m10: m10, h1: h1, h3: h3, h6: h6, h12: h12, h24: h24 }, function (event) { $("#stName").html(siteNameArr[t][q]); goDetailPage(event.data.mnow, event.data.m10, event.data.h1, event.data.h3, event.data.h6, event.data.h12, event.data.h24); });

    //                     }
    //                     br = true;
    //                     break;
    //                 }
    //             }
    //             //due to there's duplicate sites, dont break this.
    //             //if (br)
    //             //    break;
    //             //}
    //         }

    //         avg3now = (avg3now / siteIDArr[t].length).toFixed(2);
    //         avg3m10 = (avg3m10 / siteIDArr[t].length).toFixed(2);;
    //         avg3h1 = (avg3h1 / siteIDArr[t].length).toFixed(2);;
    //         avg3h3 = (avg3h3 / siteIDArr[t].length).toFixed(2);;
    //         avg3h6 = (avg3h6 / siteIDArr[t].length).toFixed(2);;
    //         avg3h12 = (avg3h12 / siteIDArr[t].length).toFixed(2);;
    //         avg3h24 = (avg3h24 / siteIDArr[t].length).toFixed(2);;

    //         $("#dDate").html((msg["getRainfall_new"][0]["PublishTime"].substring(0, 4) - 1911) + "年" + msg["getRainfall_new"][0]["PublishTime"].substring(5, 7) + "月" + msg["getRainfall_new"][0]["PublishTime"].substring(8, 10) + "日" + msg["getRainfall_new"][0]["PublishTime"].substring(11, 19));
    //         $("#a_date").html((msg["getRainfall_new"][0]["PublishTime"].substring(0, 4) - 1911) + "年" + msg["getRainfall_new"][0]["PublishTime"].substring(5, 7) + "月" + msg["getRainfall_new"][0]["PublishTime"].substring(8, 10) + "日" + msg["getRainfall_new"][0]["PublishTime"].substring(11, 19));
    //         $("#avgFall1").html((avg1Val / siteIDArr[0].length).toFixed(1));
    //         $("#avgFall2").html((avg2Val / siteIDArr[1].length).toFixed(1));
    //         $("#avgFall3").html((avg3Val / siteIDArr[2].length).toFixed(1));
    //         $("#avgFall4").html((avg4Val / siteIDArr[3].length).toFixed(1));
    //         $("#avgFall5").html((avg5Val / siteIDArr[4].length).toFixed(1));
    //         $("#avgFall6").html((avg6Val / siteIDArr[5].length).toFixed(1));//隆恩堰 
    //         $("#avgFall1").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("三峽河平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
    //         $("#avgFall2").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("鳶山堰平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
    //         $("#avgFall3").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("桃灌平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
    //         $("#avgFall4").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("石灌平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
    //         $("#avgFall5").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("上坪堰平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
    //         // 隆恩堰
    //         $("#avgFall6").parent().parent().off().on("click", { avg3now: avg3now, avg3m10: avg3m10, avg3h1: avg3h1, avg3h3: avg3h3, avg3h6: avg3h6, avg3h12: avg3h12, avg3h24: avg3h24 }, function (event) { $("#stName").html("隆恩堰平均雨量"); goDetailPage(event.data.avg3now, event.data.avg3m10, event.data.avg3h1, event.data.avg3h3, event.data.avg3h6, event.data.avg3h12, event.data.avg3h24); });
    //     },
    //     error: function (e) {
    //         navigator.notification.alert("無法取得資料", null, "系統異常");
    //     }
    // });

    // 測試雨量站的sql結束

}
// 今日/本月/當年 集水區平均雨量
function getRainDataAnalysisAll(msg) {
    var rainDays = msg["getRainDataAnalysisAllDay"];
    var rainHours = msg["getRainDataAnalysisAllHour"];
    var rainMinutes = msg["getRainDataAnalysisAllMinute"];
    // console.log("圖表 - 人工填值: ", rainDays);
    console.log("今日/當月/本年累積 - 小時: ", rainHours);
    console.log("今日/當月/本年累積 - 分鐘: ", rainMinutes);

    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    // var timeblockDPV = [];
    var timeblockDayPV = []; // nicholas

    var timeblockM = [];
    var timeblockMPV = [];
    var timeblockMonthPV = []; // nicholas

    var timeblockY = [];
    var timeblockYPV = [];
    // timeblockYearPV = []; 
    ShementimeblockYearPV = []; // nicholas (石門累加使用)
    // if (rainHours.length > 0) {
    //     if (rainHours[rainHours.length-1].indate.substring(11,13) == '00') {// if 00:00 reset
    //         rainHours = [];
    //         rainMinutes = [];
    //     }
    // }
    

    var ShowMinute;//10分鐘顯示
    var ShowHour;

    // 1. new day (小時 + 分)
    for (var i = 0; i <= 23; i++) { // x軸顯示
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDayPV.push([leftPad(i + 1, 2), null]);
    }
    var minTotal = 0;
    var dateMinHour = null;
    if (msg["getRainDataAnalysisAllMinute"].length > 0) {
        dateMinHour = parseInt(msg["getRainDataAnalysisAllMinute"][0].indate.substring(11,13));
    }

    // 如果是00點，重新累計
    if (dateMinHour == 0) {
        if (rainMinutes.length > 1) { // 大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
            var lastIndex = rainMinutes.length - 1;
            minTotal = parseFloat((rainMinutes[lastIndex].total - 0) / 10);
        }
    }
    else
    {
        if (rainMinutes.length > 1) { // 大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
            var lastIndex = rainMinutes.length - 1;
            minTotal = parseFloat((rainMinutes[lastIndex].total - rainMinutes[0].total) / 10);
        }
    }
    // if (rainMinutes.length > 1) { // 大於1是因為整點的資料不用加 , ( 最後一筆 - 第一筆 = 變化量 )
    //     var lastIndex = rainMinutes.length - 1;
    //     minTotal = parseFloat((rainMinutes[lastIndex].total - rainMinutes[0].total) / 10);

    // }
    // 用原始資料的小時做對應
    for (let i = 0; i < timeblockDayPV.length; i++) {
        for (let k = 0; k < rainHours.length; k++) {
            if (timeblockDayPV[i][0] == rainHours[k].indate.substring(11,13)) {
                timeblockDayPV[i][1] = parseFloat(parseFloat(rainHours[k].total / 10).toFixed(2));
                rainTotalD += parseFloat(rainHours[k].total / 10);
            }
        }
    }
    // 將10分鐘雨量加在下一個小時
    if (rainMinutes.length > 1) {
        ShowMinute = rainMinutes[rainMinutes.length-1].indate.substring(14,16);
        ShowHour = rainMinutes[rainMinutes.length-1].indate.substring(11,13);
        // utcHour_Next = Date.UTC(parseInt(rainMinutes[rainMinutes.length-1].y), parseInt(datad[datad.length-1].m) - 1, parseInt(datad[datad.length-1].d), parseInt(datad[datad.length-1].h) +1); // 下小時
        if (rainHours.length <= timeblockDayPV.length) {
            minTotal = minTotal < 0 ? 0 : minTotal;
            timeblockDayPV[parseInt(ShowHour)][1] = parseFloat(parseFloat(minTotal).toFixed(2));
            var v = rainTotalD + parseFloat(parseFloat(minTotal).toFixed(2));
            rainTotalD = parseFloat( v.toPrecision(12) );
        }
    }

    // for (var i = 0; i < rainHours.length; i++) { // 小時 + 分
    //     // timeblockDayPV[parseInt(rainHours[i].indate.substring(11, 13))] = parseFloat(rainHours[i].total);
    //     // timeblockDayPV[i] = parseFloat(rainHours[i].total / 10).toFixed(2);
    //     timeblockDayPV[i] = parseFloat(parseFloat(rainHours[i].total / 10).toFixed(2));

    //     rainTotalD += parseFloat(rainHours[i].total / 10);

    //     // if (i == rainHours.length -1 ) {  // 將最後一筆加上每小時 10分鐘
    //     //     // debugger;
    //     //     // timeblockDayPV[i] += minTotal  ; 
    //     //     var v = timeblockDayPV[i] + parseFloat(parseFloat(minTotal).toFixed(2)); // 將最後一筆加上每小時 10分鐘
    //     //     timeblockDayPV[i] = parseFloat( v.toPrecision(12) ); // 避免浮點數運算後導致小數點突出

    //     //     rainTotalD += minTotal;
    //     // }
    // }
    // // 將10分鐘雨量加在下一個小時
    // if (rainMinutes.length > 1) {
    //     ShowMinute = rainMinutes[rainMinutes.length-1].indate.substring(14,16);
    //     ShowHour = rainMinutes[rainMinutes.length-1].indate.substring(11,13);
    //     // utcHour_Next = Date.UTC(parseInt(rainMinutes[rainMinutes.length-1].y), parseInt(datad[datad.length-1].m) - 1, parseInt(datad[datad.length-1].d), parseInt(datad[datad.length-1].h) +1); // 下小時
    //     if (rainHours.length <= timeblockDayPV.length) {
    //         // // debugger;
    //         minTotal = minTotal < 0 ? 0 : minTotal;
    //         timeblockDayPV[rainHours.length] = parseFloat(parseFloat(minTotal).toFixed(2));
    //         var v = rainTotalD + parseFloat(parseFloat(minTotal).toFixed(2));
    //         rainTotalD = parseFloat( v.toPrecision(12) );
    //     }
    // }
    
    // // debugger;

    rainTotalD = Math.round(    parseFloat(rainTotalD.toPrecision(12))   * 10) / 10; // 強制四捨五入 // 4.05 + 0.6 出過問題


    // 3. Month & Year
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1; //4
    var utcToday = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()); // 取得今天的 utc
    // 加四捨五入過後的值

    for (var m = 1; m <= 12; m++) { // day
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < rainDays.length; y++) {
                if (Date.UTC(rainDays[y].date.substring(0, 4), parseInt(rainDays[y].date.substring(5, 7)) - 1, rainDays[y].date.substring(8, 10)) == utc) {
                    val = parseFloat(rainDays[y].SM_RAIN);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
                }

            }

            ShementimeblockYearPV.push([utc, val]);

            if (m == currentMonth) { // 累加該月的雨量 (ex:5/1 ~ 5/3)
                rainTotalY += parseFloat(val.toFixed(2));
            }

            if (utc == utcToday) { //  (即當天) 加入小時即該小時十分鐘
                ShementimeblockYearPV[y][1] += parseFloat(rainTotalD.toFixed(1));
                rainTotalY += parseFloat(rainTotalD.toFixed(1));
            }

        }

    }

    $("span[class='rainTotalAD0']").html(rainTotalD.toFixed(1)); // 當日
    $("#rainTotalAM0").html(rainTotalY.toFixed(1)); // 石門
    // var ny = new Date().getFullYear();
    // var nm = new Date().getMonth();
    // chartMin = Date.UTC(ny, nm, 1);
    // chartMax = Date.UTC(ny, nm + 1, 0);
    // ReCountRainDataAnalysisAll(chartMin, chartMax); // 重新計算

    // day
    // for (var i = 0; i <= 23; i++) {
    //     timeblockD.push(leftPad(i + 1, 2));
    //     timeblockDPV.push(null);
    // }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0)
    //     timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].value);
    //     else {
    //         var v = (parseFloat(rainD[i].value) - parseFloat(rainD[i - 1].value));
    //         if (v < 0)
    //         {
    //             rainD[i].value = rainD[i - 1].value;
    //             v = 0;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //     }
    // }

    // month
    // var date = new Date();
    // var currentYear = date.getFullYear();
    // var currentMonth = date.getMonth() + 1;

    // var days = daysInMonth(currentMonth, currentYear);
    // for (var i = 1; i <= days; i++) {
    //     timeblockM.push(leftPad(i, 2));
    //     timeblockMPV.push(null);
    // }

    // for (var i = 0; i < rainM.length; i++) {
    //     rainTotalM += parseFloat(rainM[i].value);
    //     timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].value);
    // }
    // $("span[class='rainTotalAD0']").html(rainM[rainM.length - 1].value.toFixed(1));
    // $("span[class='rainTotalAM0']").html(rainTotalM.toFixed(1));

    // year
    // for (var m = 1; m <= 12; m++) {
    //     var days = daysInMonth(m, currentYear);
    //     for (var i = 1; i <= days; i++) {
    //         var utc = Date.UTC(currentYear, m-1, i);
    //         var val = 0;
    //         for (var y = 0; y < rainY.length; y++) {
    //             if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc)
    //             {
    //                 val = parseFloat(rainY[y].value);
    //                 break;
    //             }
    //         }
    //         timeblockYPV.push([utc, val]);
    //     }
    // }
    // for (var i = 0; i < rainY.length; i++) {
    //     rainTotalY += parseFloat(rainY[i].value);
    //     //timeblockYPV.push([Date.UTC(rainY[i].dTime.substring(0, 4), parseInt(rainY[i].dTime.substring(5, 7)) - 1, rainY[i].dTime.substring(8, 10)), parseFloat(rainY[i].value)]);
    // }
    // $("span[class='rainTotalAY0']").html(rainTotalY.toFixed(1));

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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
               if (this.x == rainHours.length+1) {
                   return ShowHour  + ':' + ShowMinute + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
        },
        series: [
            {
                showInLegend: false,
                name: ' ',
                type: 'column',
                yAxis: 1,
                data: timeblockDayPV,
                // tooltip: {
                //     valueSuffix: ''
                // }
                tooltip: {
                    // headerFormat: '{point.x:%H:00}/',
                    valueSuffix: '',
                    // pointFormatter: function () {
                    //     return this.options.y.toFixed(1);
                    // }
                }

            }]
    });

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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                // data: timeblockYearPV,
                data: ShementimeblockYearPV,
                tooltip: {
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });

    StockChart[98]['zoom1m'](98);

    // StockChart[99] = Highcharts.StockChart({
    //     chart: {
    //         renderTo: 'stationAY0',
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
    //             count: 7,
    //             text: '至本日'
    //         }, {
    //             type: 'all',
    //             count: 8,
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
    //     yAxis: [
    //     {
    //     },
    //     { // Primary yAxis
    //         labels: {
    //             format: '{value}',
    //             style: {
    //                 color: Highcharts.getOptions().colors[0]
    //             }
    //         },
    //         title: {
    //             text: '',
    //             style: {
    //                 color: Highcharts.getOptions().colors[0]
    //             }
    //         },
    //         opposite: false
    //     }],

    //     navigator: {
    //         enabled: false
    //     },

    //     series: [
    //     {
    //         name: ' ',
    //         type: 'area',
    //         // type: 'column',
    //         yAxis: 1,
    //         data: timeblockYearPV,
    //         tooltip: {
    //             headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //             valueSuffix: ''
    //         }

    //     }]
    // });
}
// 隆恩堰
function getRainDataLonNAnalysisAll(msg) {
    // // debugger;
    var rainD = msg["getRainDataLonNAnalysisAllD"];/*console.log('隆恩堰(日)',rainD);*/
    var rainD_new = msg["getRainDataLonNAnalysisAllD_new"];console.log('隆恩堰(日)',rainD_new);
    var rainM = msg["getRainDataLonNAnalysisAllM"];
    var rainY = msg["getRainDataLonNAnalysisAllY"];/*console.log('隆恩堰(年)',rainY);*/
    
    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];

    var timeblockM = [];
    var timeblockMPV = [];

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowMinute;
    var ShowHour;

    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
    }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0){
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].Now);
    //         rainTotalD += parseFloat(rainD[i].Now);
    //     }
    //     else {
    //         var v = parseFloat(( parseFloat(rainD[i].Now) - parseFloat(rainD[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點凸出
    //         if (v < 0) {
    //             rainD[i].Now = rainD[i - 1].Now;
    //             v = 0;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //         var valD = rainTotalD + parseFloat(v.toFixed(2));
    //         rainTotalD = parseFloat( valD.toPrecision(12) );
    //     }
    // }

    // 顯示到分鐘
    for (var i = 0; i < rainD_new.length -1; i++) {
        if (i == 0) {
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(rainD_new[i].Now);
            rainTotalD += parseFloat(rainD_new[i].Now);
        }
        else {
            var v = parseFloat(( parseFloat(rainD_new[i].Now) - parseFloat(rainD_new[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
            if (v < 0) {
                rainD_new[i].Now = rainD_new[i - 1].Now;
                v = 0;
            }else{
                rainTotalD += v;
            }
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(v.toFixed(2));
        }
    }
    // add 10 minute
    if (rainD_new.length > 1) {
        var lastIndex = rainD_new.length - 1;
        var now_minute = Date.UTC(rainD_new[lastIndex].dTime.substring(0, 4), parseInt(rainD_new[lastIndex].dTime.substring(5, 7)) - 1, rainD_new[lastIndex].dTime.substring(8, 10), parseInt(rainD_new[lastIndex].dTime.substring(11, 13)) ,parseInt(rainD_new[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))+1);
    
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainD_new[lastIndex].Now) - parseFloat(rainD_new[lastIndex - 1].Now) ).toPrecision(12)); 
            if (val >= 0) {
                timeblockDPV[parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))] = val;
                rainTotalD += val;
            }
        }
        
    }

    // for 00:10~00:50
    if (rainD_new.length == 1 && rainD_new[rainD_new.length-1].dTime.substring(11,13) == "00") {
        timeblockDPV[0] = rainD_new[0].Now;
        rainTotalD +=  rainD_new[0].Now;
        var now_minute = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13)) ,parseInt(rainD_new[0].dTime.substring(14, 16)));
        var next_hour = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13))+1);
    }

    $("span[class='rainTotalLNAD0']").html(rainTotalD.toFixed(1));

    // month
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;

    var days = daysInMonth(currentMonth, currentYear);
    // for (var i = 1; i <= days; i++) {
    //     timeblockM.push(leftPad(i, 2));
    //     timeblockMPV.push(null);
    // }

    // for (var i = 0; i < rainM.length; i++) {
    //     if (rainM[i].Now >= 0) {
    //         rainTotalM += parseFloat(rainM[i].Now);
    //         timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].Now);
    //     }
    // }
    // rainTotalD = rainM[rainM.length - 1].Now.toFixed(1) >= 0 ? rainM[rainM.length - 1].Now.toFixed(1) : 0;
    // $("span[class='rainTotalYSAD0']").html(rainTotalD);
    // $("span[class='rainTotalYSAM0']").html(rainTotalM.toFixed(1));

    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < rainY.length; y++) {
                if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
                    if (rainY[y].Now >= 0)
                        val = parseFloat(rainY[y].Now);
                    break;
                }
            }
            if (m == currentMonth) {
                rainTotalY += parseFloat(val.toFixed(2))
            }
            
            timeblockYPV.push([utc, val]);
        }
    }
    // for (var i = 0; i < rainY.length; i++) {
    //     if (rainY[i].Now >= 0)
    //         rainTotalY += parseFloat(rainY[i].Now);
    // }
    LonNtimeblockYearPV = timeblockYPV; // 連動顯示
    $("span[class='rainTotalLNAM0']").html(rainTotalY.toFixed(1));

    $('#stationLNAD0').highcharts({
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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
                new Date(next_hour).getHours();
               if (this.x == new Date(next_hour).toGMTString().substring(17,19)) {
                   return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
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

            }]
    });

    StockChart[698] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationLNAM0',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
    StockChart[698]['zoom1m'](698);

    // StockChart[399] = Highcharts.StockChart({
    //     chart: {
    //         renderTo: 'stationYSAY0',
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
    //             count: 7,
    //             text: '至本日'
    //         }, {
    //             type: 'all',
    //             count: 8,
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
    //     yAxis: [
    //         {
    //         },
    //         { // Primary yAxis
    //             labels: {
    //                 format: '{value}',
    //                 style: {
    //                     color: Highcharts.getOptions().colors[0]
    //                 }
    //             },
    //             title: {
    //                 text: '',
    //                 style: {
    //                     color: Highcharts.getOptions().colors[0]
    //                 }
    //             },
    //             opposite: false
    //         }],

    //     navigator: {
    //         enabled: false
    //     },

    //     series: [
    //         {
    //             name: ' ',
    //             // type: 'area',
    //             type: 'column',
    //             yAxis: 1,
    //             data: timeblockYPV,
    //             tooltip: {
    //                 headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //                 valueSuffix: ''
    //             }

    //         }]
    // });
}

function getRainDataShangPingAnalysisAll(msg) {
    // // debugger;
    var rainD = msg["getRainDataShangPingAnalysisAllD"];
    var rainD_new = msg["getRainDataShangPingAnalysisAllD_new2"];
    // var rainM = msg["getRainDataShangPingAnalysisAllM"];
    // var rainY = msg["getRainDataShangPingAnalysisAllY"];
    var new_rainY = msg["new_getRainDataShangPingAnalysisAllY"];
    console.log('上坪堰',rainD_new)
    // console.log('上坪堰 - month',rainM)
    // console.log('上坪堰 - Year',new_rainY)
    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];

    var timeblockM = [];
    var timeblockMPV = [];

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowMinute;
    var ShowHour;

    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
    }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0) {
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].Now);
    //         rainTotalD += parseFloat(rainD[i].Now);
    //     }
    //     else {
    //         var v = parseFloat(( parseFloat(rainD[i].Now) - parseFloat(rainD[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
    //         if (v < 0) {
    //             rainD[i].Now = rainD[i - 1].Now;
    //             v = 0;
    //         }else{
    //             rainTotalD += v;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //     }
    // }

    // 測試新寫法(與即時統計一樣，出錯才會長一樣)
    for (var i = 0; i < rainD_new.length -1; i++) {
        if (i == 0) {
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(rainD_new[i].Now);
            rainTotalD += parseFloat(rainD_new[i].Now);
        }
        else {
            var v = parseFloat(( parseFloat(rainD_new[i].Now) - parseFloat(rainD_new[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
            if (v < 0) {
                rainD_new[i].Now = rainD_new[i - 1].Now;
                v = 0;
            }else{
                rainTotalD += v;
            }
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(v.toFixed(2));
        }
    }
    // add 10 minute
    if (rainD_new.length > 1) {
        var lastIndex = rainD_new.length - 1;
        var now_minute = Date.UTC(rainD_new[lastIndex].dTime.substring(0, 4), parseInt(rainD_new[lastIndex].dTime.substring(5, 7)) - 1, rainD_new[lastIndex].dTime.substring(8, 10), parseInt(rainD_new[lastIndex].dTime.substring(11, 13)) ,parseInt(rainD_new[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))+1);
    
        now_minute;
        now_hour;
        next_hour;
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainD_new[lastIndex].Now) - parseFloat(rainD_new[lastIndex - 1].Now) ).toPrecision(12)); 
            // timeblockYPV[rainY.length-1][1] += val;
            if (val >= 0) {
                timeblockDPV[parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))] = val;
                rainTotalD += val;
            }
        }
        
    }
    // for 00:10~00:50
    if (rainD_new.length == 1 && rainD_new[rainD_new.length-1].dTime.substring(11,13) == "00") {
        timeblockDPV[0] = rainD_new[0].Now;
        rainTotalD +=  rainD_new[0].Now;
        var now_minute = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13)) ,parseInt(rainD_new[0].dTime.substring(14, 16)));
        var next_hour = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13))+1);
    }

    // month
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;

    // var days = daysInMonth(currentMonth, currentYear);
    // for (var i = 1; i <= days; i++) {
    //     timeblockM.push(leftPad(i, 2));
    //     timeblockMPV.push(null);
    // }

    // for (var i = 0; i < rainM.length; i++) {
    //     if (rainM[i].Now >= 0) {
    //         rainTotalM += parseFloat(rainM[i].Now);
    //         timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].Now);
    //     }
    // }

    // rainTotalD = rainM[rainM.length - 1].Now.toFixed(1) >= 0 ? rainM[rainM.length - 1].Now.toFixed(1) : 0;
    rainTotalD = parseFloat( rainTotalD.toFixed(1) );
    $("span[class='rainTotalSPAD0']").html(rainTotalD);
    // $("span[class='rainTotalSPAM0']").html(rainTotalM.toFixed(1));
    // var LastIndex = rainM.length-1
    // var utcBlock = (Date.UTC(rainM[LastIndex].dTime.substring(0, 4), parseInt(rainM[LastIndex].dTime.substring(5, 7)) - 1, rainM[LastIndex].dTime.substring(8, 10)));
    var utcBlock = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()); // 取得今天的 utc
    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < new_rainY.length; y++) {
                if (Date.UTC(new_rainY[y].dTime.substring(0, 4), parseInt(new_rainY[y].dTime.substring(5, 7)) - 1, new_rainY[y].dTime.substring(8, 10)) == utc) {
                    if (new_rainY[y].Now >= 0) {
                        val = parseFloat(new_rainY[y].Now);
                    }
                    break;
                }
            }

            if (utc == utcBlock) { // 加日今日的數值
                timeblockYPV.push([utc, rainTotalD]);
                rainTotalY += rainTotalD;
            }
            else {
                if (m == currentMonth) {
                    rainTotalY += parseFloat(val.toFixed(2))
                }
                timeblockYPV.push([utc, val]);
            }

        }
    }
    // for (var i = 0; i < new_rainY.length; i++) {
    //     if (new_rainY[i].Now >= 0) {
    //         rainTotalY += parseFloat(new_rainY[i].Now);
    //     }
    // }
    ShangPingtimeblockYearPV = timeblockYPV; // 連動顯示
    $("#rainTotalSPAM0").html(rainTotalY.toFixed(1)); // 上坪堰

    // $("span[class='rainTotalSPAY0']").html(rainTotalY.toFixed(1));
    // var ny = new Date().getFullYear();
    // var nm = new Date().getMonth();
    // chartMin = Date.UTC(ny, nm, 1);
    // chartMax = Date.UTC(ny, nm + 1, 0);
    // ReCountRainDataAnalysisAll(chartMin, chartMax); // 重新計算

    $('#stationSPAD0').highcharts({
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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
                new Date(next_hour).getHours();
                
               if (this.x == new Date(next_hour).toGMTString().substring(17,19)) {
                   return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else if(this.x == "24"){
                    return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
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

            }]
    });

    StockChart[198] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSPAM0',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
    StockChart[198]['zoom1m'](198);
    //#region 
    // StockChart[199] = Highcharts.StockChart({
    //     chart: {
    //         renderTo: 'stationSPAY0',
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
    //             count: 7,
    //             text: '至本日'
    //         }, {
    //             type: 'all',
    //             count: 8,
    //             text: '全年'
    //         }]
    //     },

    //     title: {
    //         text: ''
    //     },
    //     plotOptions: {
    //         series: {
    //             dataGrouping: {
    //                 enabled: false
    //             }
    //         }
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
    //     yAxis: [
    //     {
    //     },
    //     { // Primary yAxis
    //         labels: {
    //             format: '{value}',
    //             style: {
    //                 color: Highcharts.getOptions().colors[0]
    //             }
    //         },
    //         title: {
    //             text: '',
    //             style: {
    //                 color: Highcharts.getOptions().colors[0]
    //             }
    //         },
    //         opposite: false
    //     }],

    //     navigator: {
    //         enabled: false
    //     },

    //     series: [
    //     {
    //         name: ' ',
    //         type: 'area',
    //         yAxis: 1,
    //         data: timeblockYPV,
    //         tooltip: {
    //             headerFormat: '{point.x:%Y/%m/%d}<br/>',
    //             valueSuffix: ''
    //         }

    //     }]
    // });
    //#endregion

}

function getRainDataSanXiaAnalysisAll(msg) {
    var rainD = msg["getRainDataSanXiaAnalysisAllD"];
    var rainD_new = msg["getRainDataSanXiaAnalysisAllD_new"];console.log('san xia rain day',rainD_new);
    var rainM = msg["getRainDataSanXiaAnalysisAllM"];
    var rainY = msg["getRainDataSanXiaAnalysisAllY"];

    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];

    var timeblockM = [];
    var timeblockMPV = [];

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowMinute;
    var ShowHour;


    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
    }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0)
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].Now);
    //     else {
    //         var v = parseFloat(( parseFloat(rainD[i].Now) - parseFloat(rainD[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點凸出
    //         if (v < 0) {
    //             rainD[i].Now = rainD[i - 1].Now;
    //             v = 0;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //     }
    // }

    // 顯示到分鐘
    for (var i = 0; i < rainD_new.length -1; i++) {
        if (i == 0) {
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(rainD_new[i].Now);
            rainTotalD += parseFloat(rainD_new[i].Now);
        }
        else {
            var v = parseFloat(( parseFloat(rainD_new[i].Now) - parseFloat(rainD_new[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
            if (v < 0) {
                rainD_new[i].Now = rainD_new[i - 1].Now;
                v = 0;
            }else{
                rainTotalD += v;
            }
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(v.toFixed(2));
        }
    }
    // add 10 minute
    if (rainD_new.length > 1) {
        var lastIndex = rainD_new.length - 1;
        var now_minute = Date.UTC(rainD_new[lastIndex].dTime.substring(0, 4), parseInt(rainD_new[lastIndex].dTime.substring(5, 7)) - 1, rainD_new[lastIndex].dTime.substring(8, 10), parseInt(rainD_new[lastIndex].dTime.substring(11, 13)) ,parseInt(rainD_new[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))+1);
    
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainD_new[lastIndex].Now) - parseFloat(rainD_new[lastIndex - 1].Now) ).toPrecision(12)); 
            if (val >= 0) {
                timeblockDPV[parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))] = val;
                rainTotalD += val;
            }
        }
        
    }

    // for 00:10~00:50
    if (rainD_new.length == 1 && rainD_new[rainD_new.length-1].dTime.substring(11,13) == "00") {
        timeblockDPV[0] = rainD_new[0].Now;
        rainTotalD +=  rainD_new[0].Now;
        var now_minute = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13)) ,parseInt(rainD_new[0].dTime.substring(14, 16)));
        var next_hour = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13))+1);
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

    for (var i = 0; i < rainM.length; i++) {
        if (rainM[i].Now >= 0) {
            rainTotalM += parseFloat(rainM[i].Now);
            timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].Now);
        }
    }

    rainTotalD = rainM[rainM.length - 1].Now.toFixed(1) >= 0 ? rainM[rainM.length - 1].Now.toFixed(1) : 0;
    $("span[class='rainTotalSXAD0']").html(rainTotalD);
    $("span[class='rainTotalSXAM0']").html(rainTotalM.toFixed(1));

    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < rainY.length; y++) {
                if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
                    if (rainY[y].Now >= 0)
                        val = parseFloat(rainY[y].Now);
                    break;
                }
            }
            timeblockYPV.push([utc, val]);
        }
    }
    for (var i = 0; i < rainY.length; i++) {
        if (rainY[i].Now >= 0)
            rainTotalY += parseFloat(rainY[i].Now);
    }
    SanXiatimeblockYearPV = timeblockYPV; // 連動顯示使用
    $("span[class='rainTotalSXAY0']").html(rainTotalY.toFixed(1));
    $('#stationSXAD0').highcharts({
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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
                new Date(next_hour).getHours();
               if (this.x == new Date(next_hour).toGMTString().substring(17,19)) {
                   return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
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

            }]
    });

    StockChart[298] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSXAM0',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
    StockChart[298]['zoom1m'](298);

    StockChart[299] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSXAY0',
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
                // type: 'area',
                type: 'column',
                yAxis: 1,
                data: timeblockYPV,
                tooltip: {
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getRainDataYuanShanAnalysisAll(msg) {
    // var rainD = msg["getRainDataYuanShanAnalysisAllD"];
    var rainD_new = msg["getRainDataYuanShanAnalysisAllD_new"];console.log('鳶山堰當日雨量',rainD_new);
    var rainM = msg["getRainDataYuanShanAnalysisAllM"];
    var rainY = msg["getRainDataYuanShanAnalysisAllY"];

    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];

    var timeblockM = [];
    var timeblockMPV = [];

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowMinute;
    var ShowHour;

    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
    }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0)
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].Now);
    //     else {
    //         var v = parseFloat(( parseFloat(rainD[i].Now) - parseFloat(rainD[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點凸出
    //         if (v < 0) {
    //             rainD[i].Now = rainD[i - 1].Now;
    //             v = 0;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //     }
    // }

    // 顯示到分鐘
    for (var i = 0; i < rainD_new.length -1; i++) {
        if (i == 0) {
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(rainD_new[i].Now);
            rainTotalD += parseFloat(rainD_new[i].Now);
        }
        else {
            var v = parseFloat(( parseFloat(rainD_new[i].Now) - parseFloat(rainD_new[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
            if (v < 0) {
                rainD_new[i].Now = rainD_new[i - 1].Now;
                v = 0;
            }else{
                rainTotalD += v;
            }
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(v.toFixed(2));
        }
    }
    // add 10 minute
    if (rainD_new.length > 1) {
        var lastIndex = rainD_new.length - 1;
        var now_minute = Date.UTC(rainD_new[lastIndex].dTime.substring(0, 4), parseInt(rainD_new[lastIndex].dTime.substring(5, 7)) - 1, rainD_new[lastIndex].dTime.substring(8, 10), parseInt(rainD_new[lastIndex].dTime.substring(11, 13)) ,parseInt(rainD_new[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))+1);
    
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainD_new[lastIndex].Now) - parseFloat(rainD_new[lastIndex - 1].Now) ).toPrecision(12)); 
            if (val >= 0) {
                timeblockDPV[parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))] = val;
                rainTotalD += val;
            }
        }
        
    }
    // for 00:10~00:50
    if (rainD_new.length == 1 && rainD_new[rainD_new.length-1].dTime.substring(11,13) == "00") {
        timeblockDPV[0] = rainD_new[0].Now;
        rainTotalD +=  rainD_new[0].Now;
        var now_minute = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13)) ,parseInt(rainD_new[0].dTime.substring(14, 16)));
        var next_hour = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13))+1);
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

    for (var i = 0; i < rainM.length; i++) {
        if (rainM[i].Now >= 0) {
            rainTotalM += parseFloat(rainM[i].Now);
            timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].Now);
        }
    }
    rainTotalD = rainM[rainM.length - 1].Now.toFixed(1) >= 0 ? rainM[rainM.length - 1].Now.toFixed(1) : 0;
    $("span[class='rainTotalYSAD0']").html(rainTotalD);
    $("span[class='rainTotalYSAM0']").html(rainTotalM.toFixed(1));

    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < rainY.length; y++) {
                if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
                    if (rainY[y].Now >= 0)
                        val = parseFloat(rainY[y].Now);
                    break;
                }
            }
            timeblockYPV.push([utc, val]);
        }
    }
    for (var i = 0; i < rainY.length; i++) {
        if (rainY[i].Now >= 0)
            rainTotalY += parseFloat(rainY[i].Now);
    }
    YuanShantimeblockYearPV = timeblockYPV; // 連動顯示
    $("span[class='rainTotalYSAY0']").html(rainTotalY.toFixed(1));

    $('#stationYSAD0').highcharts({
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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
                new Date(next_hour).getHours();
               if (this.x == new Date(next_hour).toGMTString().substring(17,19)) {
                   return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
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

            }]
    });

    StockChart[398] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationYSAM0',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
    StockChart[398]['zoom1m'](398);

    StockChart[399] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationYSAY0',
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
                // type: 'area',
                type: 'column',
                yAxis: 1,
                data: timeblockYPV,
                tooltip: {
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getRainDataTaoGuanAnalysisAll(msg) {
    // var rainD = msg["getRainDataTaoGuanAnalysisAllD"];
    var rainD_new = msg["getRainDataTaoGuanAnalysisAllD_new"];console.log('桃灌當日雨量',rainD_new);
    var rainM = msg["getRainDataTaoGuanAnalysisAllM"];
    var rainY = msg["getRainDataTaoGuanAnalysisAllY"];

    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];

    var timeblockM = [];
    var timeblockMPV = [];

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowMinute;
    var ShowHour;


    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
    }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0)
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].Now);
    //     else {
    //         var v = parseFloat(( parseFloat(rainD[i].Now) - parseFloat(rainD[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點凸出
    //         if (v < 0) {
    //             rainD[i].Now = rainD[i - 1].Now;
    //             v = 0;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //     }
    // }

    // 顯示到分鐘
    for (var i = 0; i < rainD_new.length -1; i++) {
        if (i == 0) {
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(rainD_new[i].Now);
            rainTotalD += parseFloat(rainD_new[i].Now);
        }
        else {
            var v = parseFloat(( parseFloat(rainD_new[i].Now) - parseFloat(rainD_new[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
            if (v < 0) {
                rainD_new[i].Now = rainD_new[i - 1].Now;
                v = 0;
            }else{
                rainTotalD += v;
            }
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(v.toFixed(2));
        }
    }
    // add 10 minute
    if (rainD_new.length > 1) {
        var lastIndex = rainD_new.length - 1;
        var now_minute = Date.UTC(rainD_new[lastIndex].dTime.substring(0, 4), parseInt(rainD_new[lastIndex].dTime.substring(5, 7)) - 1, rainD_new[lastIndex].dTime.substring(8, 10), parseInt(rainD_new[lastIndex].dTime.substring(11, 13)) ,parseInt(rainD_new[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))+1);
    
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainD_new[lastIndex].Now) - parseFloat(rainD_new[lastIndex - 1].Now) ).toPrecision(12)); 
            if (val >= 0) {
                timeblockDPV[parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))] = val;
                rainTotalD += val;
            }
        }
        
    }
    // for 00:10~00:50
    if (rainD_new.length == 1 && rainD_new[rainD_new.length-1].dTime.substring(11,13) == "00") {
        timeblockDPV[0] = rainD_new[0].Now;
        rainTotalD +=  rainD_new[0].Now;
        var now_minute = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13)) ,parseInt(rainD_new[0].dTime.substring(14, 16)));
        var next_hour = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13))+1);
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

    for (var i = 0; i < rainM.length; i++) {
        if (rainM[i].Now >= 0) {
            rainTotalM += parseFloat(rainM[i].Now);
            timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].Now);
        }
    }
    rainTotalD = rainM[rainM.length - 1].Now.toFixed(1) >= 0 ? rainM[rainM.length - 1].Now.toFixed(1) : 0;
    $("span[class='rainTotalTGAD0']").html(rainTotalD);
    $("span[class='rainTotalTGAM0']").html(rainTotalM.toFixed(1));

    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < rainY.length; y++) {
                if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
                    if (rainY[y].Now >= 0) {
                        val = parseFloat(rainY[y].Now);
                    }
                    break;
                }
            }
            timeblockYPV.push([utc, val]);
        }
    }
    for (var i = 0; i < rainY.length; i++) {
        if (rainY[i].Now >= 0) {
            rainTotalY += parseFloat(rainY[i].Now);
        }
    }
    TaoGuantimeblockYearPV = timeblockYPV; // 連動顯示
    $("span[class='rainTotalTGAY0']").html(rainTotalY.toFixed(1));

    $('#stationTGAD0').highcharts({
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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
                new Date(next_hour).getHours();
               if (this.x == new Date(next_hour).toGMTString().substring(17,19)) {
                   return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
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

            }]
    });

    StockChart[498] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationTGAM0',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
    StockChart[498]['zoom1m'](498);

    StockChart[499] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationTGAY0',
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
                // type: 'area',
                type: 'column',
                yAxis: 1,
                data: timeblockYPV,
                tooltip: {
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getRainDataShihGuanAnalysisAll(msg) {
    // var rainD = msg["getRainDataShihGuanAnalysisAllD"];
    var rainD_new = msg["getRainDataShihGuanAnalysisAllD_new"];console.log('石灌當日雨量',rainD_new);
    var rainM = msg["getRainDataShihGuanAnalysisAllM"];
    var rainY = msg["getRainDataShihGuanAnalysisAllY"];

    var rainTotalD = 0;
    var rainTotalM = 0;
    var rainTotalY = 0;

    var timeblockD = [];
    var timeblockDPV = [];

    var timeblockM = [];
    var timeblockMPV = [];

    var timeblockY = [];
    var timeblockYPV = [];

    var ShowMinute;
    var ShowHour;

    // day
    for (var i = 0; i <= 23; i++) {
        timeblockD.push(leftPad(i + 1, 2));
        timeblockDPV.push(null);
    }

    // for (var i = 0; i < rainD.length; i++) {
    //     if (i == 0)
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(rainD[i].Now);
    //     else {
    //         var v = parseFloat(( parseFloat(rainD[i].Now) - parseFloat(rainD[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點凸出
    //         if (v < 0) {
    //             rainD[i].Now = rainD[i - 1].Now;
    //             v = 0;
    //         }
    //         timeblockDPV[parseInt(rainD[i].dTime)] = parseFloat(v.toFixed(2));
    //     }
    // }

    // 顯示到分鐘
    for (var i = 0; i < rainD_new.length -1; i++) {
        if (i == 0) {
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(rainD_new[i].Now);
            rainTotalD += parseFloat(rainD_new[i].Now);
        }
        else {
            var v = parseFloat(( parseFloat(rainD_new[i].Now) - parseFloat(rainD_new[i - 1].Now) ).toPrecision(12)); // 避免浮點數運算導致小數點禿出
            if (v < 0) {
                rainD_new[i].Now = rainD_new[i - 1].Now;
                v = 0;
            }else{
                rainTotalD += v;
            }
            timeblockDPV[parseInt(rainD_new[i].dTime.substring(11,13)) - 1] = parseFloat(v.toFixed(2));
        }
    }
    // add 10 minute
    if (rainD_new.length > 1) {
        var lastIndex = rainD_new.length - 1;
        var now_minute = Date.UTC(rainD_new[lastIndex].dTime.substring(0, 4), parseInt(rainD_new[lastIndex].dTime.substring(5, 7)) - 1, rainD_new[lastIndex].dTime.substring(8, 10), parseInt(rainD_new[lastIndex].dTime.substring(11, 13)) ,parseInt(rainD_new[lastIndex].dTime.substring(14, 16)));
        var now_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13)));
        var next_hour = Date.UTC(rainD_new[lastIndex-1].dTime.substring(0, 4), parseInt(rainD_new[lastIndex-1].dTime.substring(5, 7)) - 1, rainD_new[lastIndex-1].dTime.substring(8, 10), parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))+1);
    
        if (now_minute > now_hour && now_minute < next_hour) {
            var val = parseFloat(( parseFloat(rainD_new[lastIndex].Now) - parseFloat(rainD_new[lastIndex - 1].Now) ).toPrecision(12)); 
            if (val >= 0) {
                timeblockDPV[parseInt(rainD_new[lastIndex-1].dTime.substring(11, 13))] = val;
                rainTotalD += val;
            }
        }
        
    }
    // for 00:10~00:50
    if (rainD_new.length == 1 && rainD_new[rainD_new.length-1].dTime.substring(11,13) == "00") {
        timeblockDPV[0] = rainD_new[0].Now;
        rainTotalD +=  rainD_new[0].Now;
        var now_minute = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13)) ,parseInt(rainD_new[0].dTime.substring(14, 16)));
        var next_hour = Date.UTC(rainD_new[0].dTime.substring(0, 4), parseInt(rainD_new[0].dTime.substring(5, 7)) - 1, rainD_new[0].dTime.substring(8, 10), parseInt(rainD_new[0].dTime.substring(11, 13))+1);
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

    for (var i = 0; i < rainM.length; i++) {
        if (rainM[i].Now >= 0) {
            rainTotalM += parseFloat(rainM[i].Now);
            timeblockMPV[parseInt(rainM[i].dTime) - 1] = parseFloat(rainM[i].Now);
        }
    }
    rainTotalD = rainM[rainM.length - 1].Now.toFixed(1) >= 0 ? rainM[rainM.length - 1].Now.toFixed(1) : 0;
    $("span[class='rainTotalSGAD0']").html(rainTotalD);
    $("span[class='rainTotalSGAM0']").html(rainTotalM.toFixed(1));

    // year
    for (var m = 1; m <= 12; m++) {
        var days = daysInMonth(m, currentYear);
        for (var i = 1; i <= days; i++) {
            var utc = Date.UTC(currentYear, m - 1, i);
            var val = 0;
            for (var y = 0; y < rainY.length; y++) {
                if (Date.UTC(rainY[y].dTime.substring(0, 4), parseInt(rainY[y].dTime.substring(5, 7)) - 1, rainY[y].dTime.substring(8, 10)) == utc) {
                    if (rainY[y].Now >= 0) {
                        val = parseFloat(rainY[y].Now);
                    }
                    break;
                }
            }
            timeblockYPV.push([utc, val]);
        }
    }
    for (var i = 0; i < rainY.length; i++) {
        if (rainY[i].Now >= 0) {
            rainTotalY += parseFloat(rainY[i].Now);
        }
    }
    ShihGuantimeblockYearPV = timeblockYPV; // 連動顯示
    $("span[class='rainTotalSGAY0']").html(rainTotalY.toFixed(1));

    $('#stationSGAD0').highcharts({
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
            min: 0,
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
            shared: true,
            formatter: function () {
                // 最新的10分鐘資料顯示
                new Date(next_hour).getHours();
               if (this.x == new Date(next_hour).toGMTString().substring(17,19)) {
                   return new Date(now_minute).toGMTString().substring(17,19)  + ':' + new Date(now_minute).toGMTString().substring(20,22) + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
               else
               {   
                   var Point_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.x);
                   return  Point_date.getHours().toString().padStart(2,'0') + ':00' + "<br/>" +'<span style="color:#3399FF">●</span> : ' + "<b>" + this.points[0].y + "</b>";
               }
           }
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

            }]
    });

    StockChart[598] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSGAM0',
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
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
    StockChart[598]['zoom1m'](598);

    StockChart[599] = Highcharts.StockChart({
        chart: {
            renderTo: 'stationSGAY0',
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
                // type: 'area',
                type: 'column',
                yAxis: 1,
                data: timeblockYPV,
                tooltip: {
                    headerFormat: '{point.x:%Y/%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getCloud(msg){
    // debugger;
    //測試
    var serviceURL = serviceIP+"/WraNBMobile104";
    //測試
    var data = msg["getCloud"];

    var flagD1 = true; flagD2 = true; flagR1 = true; flagC1 = true; flagC2 = true; flagC3 = true; flagS1 = true; flagS2 = true; flagS3 = true;
    for (let i = 0; i < data.length; i++) {
        switch (data[i].subType) {
            case "D1":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagD1) {
                    //
                    tempD1 = [];//清空
                    $('.Doption').empty();
                    $('#D1').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#D1').append(htmlText);
                    flagD1 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                
                // 預設顯示，切換至另一個頁籤會更新成他的
                var htmlItem = `<option class="itemD" value="${key}">${key}</option>`;
                $('.Doption').append(htmlItem);
                // push item
                tempD1.push([imgpath , key]);
                //顯示到最新的一張
                $(".Doption").val(key).change();
                $('#D1 > img').empty().attr(imgpath);
            break;
            case "D2":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagD2) {
                    //
                    tempD2 = [];//清空
                    $('#D2').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#D2').append(htmlText);
                    flagD2 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                // push item
                tempD2.push([imgpath , key]);
                //顯示到最新的一張
                $('#D2 > img').empty().attr(imgpath);
            break;

            case "C1":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagC1) {
                    //
                    tempC1 = [];//清空
                    $('.Coption').empty();
                    $('#C1').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#C1').append(htmlText);
                    flagC1 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                // 預設顯示，切換至另一個頁籤會更新成他的
                var htmlItem = `<option class="itemC" value="${key}">${key}</option>`;
                $('.Coption').append(htmlItem);
                tempC1.push([imgpath , key]);
                //顯示到最新的一張
                $(".Coption").val(key).change();
                $('#C1 > img').empty().attr(imgpath);
            break;
            case "C2":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagC2) {
                    //
                    tempC2 = [];//清空
                    $('#C2').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#C2').append(htmlText);
                    flagC2 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                tempC2.push([imgpath , key]);
                //顯示到最新的一張
                $('#C2 > img').empty().attr(imgpath);
            break;
            case "C3":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagC3) {
                    //
                    tempC3 = [];//清空
                    $('#C3').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#C3').append(htmlText);
                    flagC3 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                tempC3.push([imgpath , key]);
                //顯示到最新的一張
                $('#C3 > img').empty().attr(imgpath);
            break;


            case "S1":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagS1) {
                    //
                    tempS1 = [];//清空
                    $('.Soption').empty();
                    $('#S1').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#S1').append(htmlText);
                    flagS1 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                // 預設顯示，切換至另一個頁籤會更新成他的
                var htmlItem = `<option class="itemC" value="${key}">${key}</option>`;
                $('.Soption').append(htmlItem);
                tempS1.push([imgpath , key]);
                //顯示到最新的一張
                $(".Soption").val(key).change();
                $('#S1 > img').empty().attr(imgpath);
            break;
            case "S2":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagS2) {
                    //
                    tempS2 = [];//清空
                    $('#S2').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#S2').append(htmlText);
                    flagS2 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                tempS2.push([imgpath , key]);
                //顯示到最新的一張
                $('#S2 > img').empty().attr(imgpath);
            break;
            case "S3":
                var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                if (flagS3) {
                    //
                    tempS3 = [];//清空
                    $('#S3').empty();
                    //
                    // var imgpath = serviceURL + (data[i].ImgPath).substring(7).replace(/\\/g,"/");
                    var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
                    $('#S3').append(htmlText);
                    flagS3 = false;
                }
                // add item to select
                // var d= new Date(data[i].Date);
                // var key = d.getFullYear() + "/" + (d.getMonth() +1) + "/" + (d.getDate()).toString().padStart(2,"0") + " " + (d.getHours()).toString().padStart(2,"0") + ":" + (d.getMinutes()).toString().padStart(2,"0");
                var key = time2formateByCloud(new Date(data[i].Date));
                tempS3.push([imgpath , key]);
                //顯示到最新的一張
                $('#S3 > img').empty().attr(imgpath);
            break;
        }

       
        
    }

    //#region 根據停留的畫面 顯示到最新的一張
    if ($('#D2').css('display') != "none") 
    {
        var lastIdx = tempD2.length-1;
        $('#D2 > img').attr('src',tempD2[lastIdx][0]);
        $('.Doption').empty();
        for (let i = 0; i < tempD2.length; i++) {
            var htmlItem = `<option class="itemD" value="${tempD2[i][1]}">${tempD2[i][1]}</option>`;
            $('.Doption').append(htmlItem);
        }
        $(".Doption").val(tempD2[lastIdx][1]).change();
    }
    
    //
    if ($('#C2').css('display') != "none") 
    {
        var lastIdx = tempC2.length-1;
        $('#C2 > img').attr('src',tempC2[lastIdx][0]);
        $('.Coption').empty();
        for (let i = 0; i < tempC2.length; i++) {
            var htmlItem = `<option class="itemC" value="${tempC2[i][1]}">${tempC2[i][1]}</option>`;
            $('.Coption').append(htmlItem);
        }
        $(".Coption").val(tempC2[lastIdx][1]).change();
    }
    else if($('#C3').css('display') != "none")
    {
        var lastIdx = tempC3.length-1;
        $('#C3 > img').attr('src',tempC3[lastIdx][0]);
        $('.Coption').empty();
        for (let i = 0; i < tempC3.length; i++) {
            var htmlItem = `<option class="itemC" value="${tempC3[i][1]}">${tempC3[i][1]}</option>`;
            $('.Coption').append(htmlItem);
        }
        $(".Coption").val(tempC3[lastIdx][1]).change();
    }

    //
    if ($('#S2').css('display') != "none") 
    {
        var lastIdx = tempS2.length-1;
        $('#S2 > img').attr('src',tempS2[lastIdx][0]);
        $('.Coption').empty();
        for (let i = 0; i < tempS2.length; i++) {
            var htmlItem = `<option class="itemS" value="${tempS2[i][1]}">${tempS2[i][1]}</option>`;
            $('.Soption').append(htmlItem);
        }
        $(".Soption").val(tempS2[lastIdx][1]).change();
    }
    else if($('#S3').css('display') != "none")
    {
        var lastIdx = tempS3.length-1;
        $('#S3 > img').attr('src',tempS3[lastIdx][0]);
        $('.Soption').empty();
        for (let i = 0; i < tempS3.length; i++) {
            var htmlItem = `<option class="itemS" value="${tempS3[i][1]}">${tempS3[i][1]}</option>`;
            $('.Soption').append(htmlItem);
        }
        $(".Soption").val(tempS3[lastIdx][1]).change();
    }
    //#endregion
}

// return : yyyy / MM / dd HH:mm
function time2formateByCloud(dataDate){
    var RtVal = "";
    RtVal = dataDate.getFullYear() + "/" + (dataDate.getMonth() +1).toString().padStart(2,"0") + "/" + (dataDate.getDate()).toString().padStart(2,"0") + " " + (dataDate.getHours()).toString().padStart(2,"0") + ":" + (dataDate.getMinutes()).toString().padStart(2,"0");
    
    return RtVal
}

function getCloudByRain(msg){
    var serviceURL = serviceIP+"/WraNBMobile104";//測試使用
    // debugger;
    var data1D = msg["getCloudByRain1D"]; 
    var data2D = msg["getCloudByRain2D"]; 
    var data3D = msg["getCloudByRain3D"];
    var flagR1 = true;  flagR2 = true;  flagR3 = true;
    for (let i = 0; i < data1D.length; i++) {
        var imgpath = serviceURL + (data1D[i].ImgPath).substring(7).replace(/\\/g,"/");
        if (flagR1) {
            //
            tempR1 = [];//清空
            $('.Roption').empty();
            $('#R1').empty();
            //
            var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
            $('#R1').append(htmlText);
            flagR1 = false;
        }
        // add item to select
        var d= new Date(data1D[i].Date);
        var key = time2formateByCloud(d);
        // 預設顯示，切換至另一個頁籤會更新成他的
        var htmlItem = `<option class="itemR" value="${key}">${key}</option>`;
        $('.Roption').append(htmlItem);
        // push item
        tempR1.push([imgpath , key]);
        //顯示到最新的一張
        $(".Roption").val(key).change();
        $('#R1 > img').empty().attr('src', imgpath);

    }
    for (let i = 0; i < data2D.length; i++) {
        var imgpath = serviceURL + (data2D[i].ImgPath).substring(7).replace(/\\/g,"/");
        if (flagR2) {
            //
            tempR2 = [];//清空
            $('#R2').empty();
            //
            var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
            $('#R2').append(htmlText);
            flagR2 = false;
        }
        // add item to select
        var key = time2formateByCloud(new Date(data2D[i].Date));
        tempR2.push([imgpath , key]);
        //顯示到最新的一張
        $('#R2 > img').empty().attr('src', imgpath);

    }
    for (let i = 0; i < data3D.length; i++) {
        var imgpath = serviceURL + (data3D[i].ImgPath).substring(7).replace(/\\/g,"/");
        if (flagR3) {
            //
            tempR3 = [];//清空
            $('#R3').empty();
            //
            var htmlText = `<img id="" style="width: 100%;" src="${imgpath}" alt="">`;
            $('#R3').append(htmlText);
            flagR3 = false;
        }
        // add item to select
        var key = time2formateByCloud(new Date(data3D[i].Date));
        tempR3.push([imgpath , key]);
        //顯示到最新的一張
        $('#R3 > img').empty().attr('src', imgpath);
    }

    //根據停留的畫面 顯示到最新的一張
    if ($('#R2').css('display') != "none") 
    {
        var lastIdx = tempR2.length-1;
        $('#R2 > img').attr('src',tempR2[lastIdx][0]);
        $('.Roption').empty();
        for (let i = 0; i < tempR2.length; i++) {
            var htmlItem = `<option class="itemR" value="${tempR2[i][1]}">${tempR2[i][1]}</option>`;
            $('.Roption').append(htmlItem);
        }
        $(".Roption").val(tempR2[lastIdx][1]).change();
    }
    else if($('#R3').css('display') != "none")
    {
        var lastIdx = tempR3.length-1;
        $('#R3 > img').attr('src',tempR3[lastIdx][0]);
        $('.Roption').empty();
        for (let i = 0; i < tempR3.length; i++) {
            var htmlItem = `<option class="itemR" value="${tempR3[i][1]}">${tempR3[i][1]}</option>`;
            $('.Roption').append(htmlItem);
        }
        $(".Roption").val(tempR3[lastIdx][1]).change();
    }



}

//播放
function repeatImageD(){
    // debugger;

    var PlaceId = "";
    var temp ;
    if ($('#D1').css('display') != "none") 
    {
        PlaceId = "D1"
        temp = tempD1;
    }
    else
    {
        PlaceId = "D2";
        temp = tempD2;
    }

    var limit = temp.length;
    var i = 0;
    if (IskeepGO) {
        i = keepGo;
        if (i >= limit){
            i = 0;
            keepGo = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Doption').val(temp[i][1]);
        i++;
        keepGo++;
    }
    else
    {
        keepGo = i;
        if (i >= limit){
            i = 0;
            keepGo = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Doption').val(temp[i][1]);
        i++;
    }
    
}

function repeatImageR(){
    // debugger;


    var PlaceId = "";
    var temp;
    if ($('#R1').css('display') != "none") 
    {
        PlaceId = "R1"
        temp = tempR1;
    }
    else if($('#R2').css('display') != "none")
    {
        PlaceId = "R2"
        temp = tempR2;
    }
    else
    {
        PlaceId = "R3"
        temp = tempR3;
    }
    var limit = temp.length;
    var i = 0;
    if (IskeepGO_R) {
        i = keepGo_R;
        if (i >= limit){
            i = 0;
            keepGo_R = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Roption').val(temp[i][1]);
        i++;
        keepGo_R++;
    }
    else
    {
        keepGo_R = i;
        if (i >= limit){
            i = 0;
            keepGo_R = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Roption').val(temp[i][1]);
        i++;
    }
}

function repeatImageC(){
    // debugger;
    
    var PlaceId = "";
    var temp;
    if ($('#C1').css('display') != "none") 
    {
        PlaceId = "C1"
        temp = tempC1;
    }
    else if($('#C2').css('display') != "none")
    {
        PlaceId = "C2"
        temp = tempC2;
    }
    else
    {
        PlaceId = "C3"
        temp = tempC3;
    }
    var limit = temp.length;
    var i = 0;
    if (IskeepGO_C) {
        i = keepGo_C;
        if (i >= limit){
            i = 0;
            keepGo_C = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Coption').val(temp[i][1]);
        i++;
        keepGo_C++;
    }
    else
    {
        keepGo_C = i;
        if (i >= limit){
            i = 0;
            keepGo_C = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Coption').val(temp[i][1]);
        i++;
    }
}

function repeatImageS(){
    // debugger;



    var PlaceId = "";
    var temp;
    if ($('#S1').css('display') != "none") 
    {
        PlaceId = "S1"
        temp = tempS1;
    }
    else if($('#S2').css('display') != "none")
    {
        PlaceId = "S2"
        temp = tempS2;
    }
    else
    {
        PlaceId = "S3"
        temp = tempS3;
    }
    var limit = temp.length;
    var i = 0;
    if (IskeepGO_S) {
        i = keepGo_S;
        if (i >= limit){
            i = 0;
            keepGo_S = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Soption').val(temp[i][1]);
        i++;
        keepGo_S++;
    }
    else
    {
        keepGo_S = i;
        if (i >= limit){
            i = 0;
            keepGo_S = i;
        }
        $('#' + PlaceId +' > img').attr('src', temp[i][0]);
        $('.Soption').val(temp[i][1]);
        i++;
    }
}



//



function toMap(type, site, id) {
    location.href = "00_Map.html?type=" + type + "&site=" + site + "&id=" + id;
}

function chkNoData(data, value, station) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == null) {
            nullStation.push(station);
            return "暫無資料";
        }
    }
    return value;
}

function chkNoDataX(value, x, station) {
    if (value == null) {
        if (nullStationX[x].indexOf(station) == -1)
            nullStationX[x].push(station);
        return 0;
    }
    else {
        return value;
    }
}

function chkValueNoData(data) {
    return (data != "暫無資料");
}

function chkDataValue(dataA, dataB, x, station) {
    for (var i = 0; i < nullStationX[x].length; i++) {
        if (station == nullStationX[x][i])
            return 0;
    }

    var value = 0;
    if (dataA != null)
        value = dataA - dataB;

    return value;
}

function chk2DataValue(dataA, dataB, dataC) {
    var value = 0;
    if (dataA != null && dataB != null)
        value = dataA + (dataB - dataC);

    return value;
}

function chkNullOrZero(data, value) {
    if (data != null)
        return value;
    else
        return "暫無資料";
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function closeTimeBlock() {
    if ($("#dDate").attr("aria-expanded") == "true") {
        $("#timeicon").click();
    }
}

function getMinDate() {
    if (tabIndex == 0) {
        return new Date('2002/10/08'); //DayRAList
        //return new Date('2002/09/11'); //RainfallList
    }
    else if (tabIndex == 5) {
        return new Date('2018/01/10');
    }
    else {
        return new Date(new Date().getFullYear() + '/01/01');
    }
}

function ReCountRainDataAnalysisAll(sTime, eTime, DisplayText, stage) {
    var ShemenVal = 0;
    var SanXiaVal = 0;
    var YuanShanVal = 0;
    var TaoGuanVal = 0;
    var ShihGuanVal = 0;
    var ShangPingVal = 0;
    var LonNVal = 0;//隆恩堰

    switch (stage) {
        case "shemen-rain-range":
            for (var i = 0; i < ShementimeblockYearPV.length; i++) { // 石門
                if (ShementimeblockYearPV[i][0] >= sTime && ShementimeblockYearPV[i][0] <= eTime) {
                    ShemenVal += ShementimeblockYearPV[i][1];
                }
            }
            $("#rainTotalAM0").html(commafy(ShemenVal.toFixed(1))); // 石門
            break;

        case "sanxia-rain-range":
            for (var i = 0; i < SanXiatimeblockYearPV.length; i++) { // 三峽
                if (SanXiatimeblockYearPV[i][0] >= sTime && SanXiatimeblockYearPV[i][0] <= eTime) {
                    SanXiaVal += SanXiatimeblockYearPV[i][1];
                }
            }
            $("#rainTotalSXAM0").html(commafy(SanXiaVal.toFixed(1))); // 三峽
            break;

        case "yuanshan-rain-range":
            for (var i = 0; i < YuanShantimeblockYearPV.length; i++) { // 鳶山
                if (YuanShantimeblockYearPV[i][0] >= sTime && YuanShantimeblockYearPV[i][0] <= eTime) {
                    YuanShanVal += YuanShantimeblockYearPV[i][1];
                }
            }
            $("#rainTotalYSAM0").html(commafy(YuanShanVal.toFixed(1))); // 鳶山
            break;

        case "taoguan-rain-range":
            for (var i = 0; i < TaoGuantimeblockYearPV.length; i++) { // 桃灌
                if (TaoGuantimeblockYearPV[i][0] >= sTime && TaoGuantimeblockYearPV[i][0] <= eTime) {
                    TaoGuanVal += TaoGuantimeblockYearPV[i][1];
                }
            }
            $("#rainTotalTGAM0").html(commafy(TaoGuanVal.toFixed(1))); // 桃灌
            break;

        case "shihguan-rain-range":
            for (var i = 0; i < ShihGuantimeblockYearPV.length; i++) { // 石灌
                if (ShihGuantimeblockYearPV[i][0] >= sTime && ShihGuantimeblockYearPV[i][0] <= eTime) {
                    ShihGuanVal += ShihGuantimeblockYearPV[i][1];
                }
            }
            $("#rainTotalSGAM0").html(commafy(ShihGuanVal.toFixed(1))); // 石灌
            break;

        case "shangping-rain-range":
            for (var i = 0; i < ShangPingtimeblockYearPV.length; i++) { // 上坪堰
                if (ShangPingtimeblockYearPV[i][0] >= sTime && ShangPingtimeblockYearPV[i][0] <= eTime) {
                    ShangPingVal += ShangPingtimeblockYearPV[i][1];
                }
            }
            $("#rainTotalSPAM0").html(commafy(ShangPingVal.toFixed(1))); // 上坪堰
            break;

        case "lonn-rain-range":
                for (var i = 0; i < LonNtimeblockYearPV.length; i++) { // 隆恩堰
                    if (LonNtimeblockYearPV[i][0] >= sTime && LonNtimeblockYearPV[i][0] <= eTime) {
                        LonNVal += LonNtimeblockYearPV[i][1];
                    }
                }
            $("#rainTotalLNAM0").html(commafy(LonNVal.toFixed(1))); // 隆恩堰
            break;
    }

   
    switch (DisplayText) {
        case "1":
            $("#shemen-range-text").html('本月集水區平均雨量累計');
            $("#sanxia-range-text").html('本月集水區平均雨量累計');
            $("#yuanshan-range-text").html('本月集水區平均雨量累計');
            $("#taoguan-range-text").html('本月集水區平均雨量累計');
            $("#shihguan-range-text").html('本月集水區平均雨量累計');
            $("#shangping-range-text").html('本月集水區平均雨量累計');
            break;

        case "2":
            $("#shemen-range-text").html('2個月集水區平均雨量累計');
            $("#sanxia-range-text").html('2個月集水區平均雨量累計');
            $("#yuanshan-range-text").html('2個月集水區平均雨量累計');
            $("#taoguan-range-text").html('2個月集水區平均雨量累計');
            $("#shihguan-range-text").html('2個月集水區平均雨量累計');
            $("#shangping-range-text").html('2個月集水區平均雨量累計');
            break;

        case "3":
            $("#shemen-range-text").html('3個月集水區平均雨量累計');
            $("#sanxia-range-text").html('3個月集水區平均雨量累計');
            $("#yuanshan-range-text").html('3個月集水區平均雨量累計');
            $("#taoguan-range-text").html('3個月集水區平均雨量累計');
            $("#shihguan-range-text").html('3個月集水區平均雨量累計');
            $("#shangping-range-text").html('3個月集水區平均雨量累計');
            break;

        case "Year":
            $("#shemen-range-text").html('今年集水區平均雨量累計');
            $("#sanxia-range-text").html('今年集水區平均雨量累計');
            $("#yuanshan-range-text").html('今年集水區平均雨量累計');
            $("#taoguan-range-text").html('今年集水區平均雨量累計');
            $("#shihguan-range-text").html('今年集水區平均雨量累計');
            $("#shangping-range-text").html('今年集水區平均雨量累計');
            break;
    }
}

function chkRainDateHasValue(){
    var flag = false;
    
    var sdd = (parseInt($('#sSDateText').val().substring(0, 3)) + 1911) + $('#sSDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
    var edd = (parseInt($('#eSDateText').val().substring(0, 3)) + 1911) + $('#eSDateText').val().substring(3).replace("年", "-").replace("月", "-").replace("日", "");
    var ChkSTime =  new Date(sdd);
    var ChkETime =  new Date(edd);
    if (tabIndex == 0) { // 雨量查詢：石門
        
    }
    else if (tabIndex == 5) { // 雨量查詢：上坪堰
        if (ChkSTime < new Date(2018, 0 ,10))
            flag = true;

    }
    
    return flag;
}

function getShiPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getShiPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }


    $("#rainTotalAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#shemen-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#shemen-range-text").html("過去5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getShanPingPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getShanPingPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }


    $("#rainTotalSPAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#shangping-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#shangping-range-text").html("5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationSPAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getSanXiaPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getSanXiaPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }

    $("#rainTotalSXAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#sanxia-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#sanxia-range-text").html("5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationSXAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getYuanShanPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getYuanShanPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }

    $("#rainTotalYSAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#yuanshan-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#yuanshan-range-text").html("5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationYSAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getTaoGuanPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getTaoGuanPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }

    $("#rainTotalTGAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#taoguan-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#taoguan-range-text").html("5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationTGAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getShiGuanPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getShiGuanPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }

    $("#rainTotalSGAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#shihguan-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#shihguan-range-text").html("5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationSGAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}

function getLonNPastYearRain(msg, params){
    const date = new Date(2021, 0 , 1);
    const data = msg["getLonNPastYearRain"];
    let rainTotal = 0;
    let timeblockY = [];

    for (var i = 0; i < data.length; i++) {
        if (Number.isFinite(data[i].avg) && data[i].avg >= 0)
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), parseFloat(data[i].avg)]);
        else
            timeblockY.push([Date.UTC(date.getFullYear(), parseInt(data[i].m) - 1, parseInt(data[i].d)), 0]);

        let v = rainTotal + parseFloat(data[i].avg);
        rainTotal = parseFloat( v.toPrecision(12) );
    }

    $("#rainTotalLNAM0").html(commafy(rainTotal.toFixed(1)));
    switch (params.year) {
        case "1":
            $("#lonn-range-text").html("去年集水區平均雨量累計");
            break;
        case "5":
            $("#lonn-range-text").html("5年集水區平均雨量累計");
            break;
    }
    Highcharts.StockChart({
        chart: {
            renderTo: 'stationLNAM0_Year',
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
                        // alert('count: '+e.rangeSelectorButton.count + 'text: ' +e.rangeSelectorButton.text + ' type:' + e.rangeSelectorButton.type);
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
                data: timeblockY,
                tooltip: {
                    headerFormat: '{point.x:%m/%d}<br/>',
                    valueSuffix: ''
                }

            }]
    });
}