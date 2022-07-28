//var serviceIP = "http://210.69.129.130";
var serviceIP = "https://wrms.wranb.gov.tw";
var serviceURL = serviceIP+"/WraNBMobile104";
// var serviceURL = serviceIP+"/WraNBMobile104Test";
// var serviceURL = "https://tm.gis.tw/wranbMobileWebService";
function dynamicScriptByOS() // load before device ready
{
    var userAgent = "";
    if ((navigator.userAgent.match(/(Android|android|Chrome)/g)))
		userAgent = "Android";
	else if((navigator.userAgent.match(/(iPad|iPhone|iPod)/g)))
		userAgent = "iOS";
	else if((navigator.userAgent.match(/(MSApp)/g)))
		userAgent = "Windows";
	console.log('userAgent: ' + userAgent);
    switch (userAgent) {
        case "iOS":
            $("<script/>").attr({
                                src: './js/cordova/ioscordova_455.js',
                                type: 'text/javascript'
                                }).appendTo($('head'));
            break;
        case "Android":
            $("<script/>").attr({ src: './js/cordova/andcordova_700.js', type: 'text/javascript' }).appendTo($('head'));
            break;
        case "Windows":
            break;
        default:
    }
    window.localStorage["platform"] = userAgent;
}

function doAjax(action, params, callback, errCallback) {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/" + action,
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            callback(msg, params);
        },
        error: function (e) {
            if (errCallback)
                errCallback(msg, params);
            else
                navigator.notification.alert("無法取得資料", null, "系統異常");
        }
    });
}

function RemoveArray(array, attachId) {
    ///<summary>刪除陣列元素</summary>
    for (var i = 0, n = 0; i < array.length; i++) {
        if (i != attachId) {
            array[n++] = array[i]
        }
    }
    array.length -= 1;
}

Array.prototype.remove = function (obj) {
    ///<summary>擴充陣列remove method</summary>
    return RemoveArray(this, obj);
};

String.prototype.trim = function () {
    ///<summary>擴充字串trim method - 去除頭尾空白</summary>
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

Math.Round = function (P, K) {
    ///<summary>小數四捨五入</summary>
    try {
        if (typeof (K) == "undefined") { var K = 0; }
        return Math.round(P * Math.pow(10, K)) / Math.pow(10, K)
    } catch (z) { return NaN }
}

Number.prototype.pad = function (size) {
    ///<summary>擴充數字補0</summary>
    if (typeof (size) !== "number") { size = 2; }
    var s = String(this);
    while (s.length < size) s = "0" + s;
    return s;
}

Date.prototype.dateDiff = function (interval, objDate) {
    var dtEnd = new Date(objDate);
    if (isNaN(dtEnd)) return undefined;
    switch (interval) {
        case "s": return parseInt((dtEnd - this) / 1000);
        case "n": return parseInt((dtEnd - this) / 60000);
        case "h": return parseInt((dtEnd - this) / 3600000);
        case "d": return parseInt((dtEnd - this) / 86400000);
        case "w": return parseInt((dtEnd - this) / (86400000 * 7));
        case "m": return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
        case "y": return dtEnd.getFullYear() - this.getFullYear();
    }
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var toast = function (msg) {
    ///<summary>顯示系統訊息</summary>
    $("<div class='ui-loader ui-overlay-shadow ui-body-a ui-corner-all'><h3>" + msg + "</h3></div>")
    .css({
        display: "block",
        opacity: 0.90,
        position: "fixed",
        padding: "7px",
        "text-align": "center",
        width: "270px",
        left: ($(window).width() - 284) / 2,
        top: $(window).height() / 2
    })
    .appendTo($.mobile.pageContainer).delay(1500)
    .fadeOut(400, function () {
        $(this).remove();
    });
}

function formatNumber(number, point) {
    ///<summary>格式化數字</summary>
    var num;
    try
    {
        number = number.toFixed(point) + '';
        x = number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        num =  x1 + x2;
    }
    catch(err)
    {
        num=0;
    }
    return num;
}

function removeDirty(words)
{
    return words.replace(/'/g, "").replace(/\"/g, "");
}

function commafy(num) {
    ///<summary>千分位</summary>
    num = num + "";
    var re = /(-?\d+)(\d{3})/
    while (re.test(num)) {
        num = num.replace(re, "$1,$2")
    }
    return num;
}

function limitStrLength(str) {
    if ($(window).width() > 600)
        return str;
    else if (str != null && str != "" && str.length > 10)
        return str.substring(0, 10) + "...";
    else 
        return str;
}


function countSpeed() { 

    (function($) {
        $.fn.countTo = function(options) {
            // merge the default plugin settings with the custom options
            options = $.extend({}, $.fn.countTo.defaults, options || {});
            //alert(options.to)
            //alert(isNaN(options.to));
            if(!isNaN(options.to))
            {
            
                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(options.speed / options.refreshInterval),
                    increment = (options.to - options.from) / loops;

                return $(this).each(function() {
                    var _this = this,
                        loopCount = 0,
                        value = options.from,
                        interval = setInterval(updateTimer, options.refreshInterval);

                    function updateTimer() {
                        value += increment;
                        loopCount++;
                        $(_this).html(commafy(value.toFixed(options.decimals)));

                        if (typeof(options.onUpdate) == 'function') {
                            options.onUpdate.call(_this, value);
                        }

                        if (loopCount >= loops) {
                            clearInterval(interval);
                            value = options.to;

                            if (typeof(options.onComplete) == 'function') {
                                options.onComplete.call(_this, value);
                            }
                        }
                    }
                
                });
            }
            else
            {
                if (Object.is(options.to, NaN))
                    $(this).html("暫無資料");
                else
                    $(this).html(options.to);
            }
        };

        $.fn.countTo.defaults = {
            from: 0,  // the number the element should start at
            to: 100,  // the number the element should end at
            speed: 1000,  // how long it should take to count between the target numbers
            refreshInterval: 1000,  // how often the element should be updated
            decimals: 0,  // the number of decimal places to show
            onUpdate: null,  // callback method for every time the element is updated,
            onComplete: null,  // callback method for when the element finishes updating
        };
    })(jQuery);
}

function getCurrentDate() {
    var date = new Date();
    var currentYear = date.getFullYear() - 1911;
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();
    return leftPad(String(currentYear), 3) + "年" +
        leftPad(String(currentMonth), 2) + "月" +
        leftPad(currentDate, 2) + "日";
}
                         
function yyyy2yyy(date) {
    if (date != null) {
     date = (date.substring(0, 4) - 1911) + "年" + date.substring(5, 7) + "月" + date.substring(8, 10) + "日 " + date.substring(11, 16);
     date = date.trim();
    return date;
    }
    else
    return "--";
}

function yyy2yyyy(date) {
    if (date != null) {
        return (parseInt(date.substring(0, 3)) + 1911) + "-" + date.substring(4, 6) + "-" + date.substring(7, 9);
    }
    else
        return "--";
}

function getCurrentDateAD() {
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();
    return leftPad(String(currentYear), 3) + "/" +
        leftPad(String(currentMonth), 2) + "/" +
        leftPad(currentDate, 2);
}

function getCurrentDateADDiff(diff) {
    var date = new Date();
    date.setDate(date.getDate() - diff);
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();
    return leftPad(String(currentYear), 3) + "/" +
        leftPad(String(currentMonth), 2) + "/" +
        leftPad(currentDate, 2);
}

function getCurrentTime()
{
    var d = new Date();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();

    var curr_sec = d.getSeconds();

    return curr_hour + "時" + curr_min+"分";//+ ":" + curr_sec;
}

function getLastMonthCurrentDate()
{
    var x = new Date();
    x.setMonth(x.getMonth() - 1);
    return x;
}

function getNextMonthCurrentDate() {
    var x = new Date();
    x.setMonth(x.getMonth() + 1);
    return x;
}

function leftPad(val, length) {
    var str = '' + val;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
                         
function timeStamp2StringAddDays(time, isDate, addDays){
    var datetime = new Date();
    datetime.setTime(time);
    datetime.setDate(datetime.getDate() + addDays);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var second = datetime.getSeconds();
    var mseconds = datetime.getMilliseconds();
    if (isDate)
    return year + "-" + leftPad(month, 2) + "-" + leftPad(date, 2);
    else
    return year + "-" + leftPad(month, 2) + "-" + leftPad(date, 2) + " " + hour + ":" + minute + ":" + second + "." + mseconds;
};

function twd97_to_latlng($x, $y) {
  var pow = Math.pow, M_PI = Math.PI;
  var sin = Math.sin, cos = Math.cos, tan = Math.tan;
  var $a = 6378137.0, $b = 6356752.314245;
  var $lng0 = 121 * M_PI / 180, $k0 = 0.9999, $dx = 250000, $dy = 0;
  var $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5);
  $x -= $dx;
  $y -= $dy;
  var $M = $y / $k0;
  var $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0));
  var $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5));
  var $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0);
  var $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0);
  var $J3 = (151 * pow($e1, 3) / 96.0);
  var $J4 = (1097 * pow($e1, 4) / 512.0);
  var $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu);
  var $e2 = pow(($e * $a / $b), 2);
  var $C1 = pow($e2 * cos($fp), 2);
  var $T1 = pow(tan($fp), 2);
  var $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0));
  var $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5);
  var $D = $x / ($N1 * $k0);
  var $Q1 = $N1 * tan($fp) / $R1;
  var $Q2 = (pow($D, 2) / 2.0);
  var $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0;
  var $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0;
  var $lat = $fp - $Q1 * ($Q2 - $Q3 + $Q4);
  var $Q5 = $D;
  var $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6;
  var $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0;
  var $lng = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp);
  $lat = ($lat * 180) / M_PI;
  $lng = ($lng * 180) / M_PI;
  return {
    lat: $lat,
    lng: $lng
  };
}
