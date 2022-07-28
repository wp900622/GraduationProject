// params
var data;
//Init
dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
    bindDredgEvent();
}

// bind event
function bindEvent() {

    $("#tab1-tab").off().on("click", function () {
        $("#dstatus").show();
        getEngList();
    });

    $("#tab2-tab").off().on("click", function () {
        $("#dstatus").show();
        getEngStatusList();
    });

    $("#tab3-tab").off().on("click", function () {
        $("#dstatus").hide();
        getEngFee();
    });

    $("#search").off().on("click", function () {
        getEngList();
        getEngStatusList();
        getEngFee();
    });

    $("#clear").off().on("click", function () {
        $("#keywords").val("");
    });

    $("#btnBack").off().on("click", function () {
        $("#page1").show();
        $("#page2").hide();
    });

    $("#btnBack2").off().on("click", function () {
        $("#btnBack2Area").hide();
        $("#engNamePage").hide();
        $("#feeHeader2").hide();
        $("#activeHeader2").hide();
        $("#myTab").show();
        $("#feePage").show();
        $("#feeHeader").show();
        $("#activeHeader").show();
    });

    $("#engIcon").off().on("click", function () {
        var latlng = $("#Coordinates").html().split(',');
        toMap("eng", latlng[0], latlng[1]);
    });

    $("#tab1-tab").off().on("click", function () {
        $("#dstatus").show();
    });

    $("#tab4-tab").off().on("click", function () {
        $("#dstatus").hide();
    });

    getEngList();
}

// getData Function
function getEngList() {
    $("#engList").html("");
    $("#engList2").html("");
    $("#engList3").html("");
    $("#engList4").html("");
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngList?year=" + $("#year").val() + "&keywords=" + $("#keywords").val(),
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var state = [0, 0, 0, 0];
            var html = "";

            if ($("#year").val()!="")
                $("#dprog").html($("#year").val() + "年度");
            else
                $("#dprog").html("在建工程");
            data = msg["getEngList"];

            if (data.length > 0) {
                //$("#engDate").html((data[0]["UpdateTime"].substring(0, 4) - 1911) + "年" + (data[0]["UpdateTime"].substring(5, 7)) + "月" + (data[0]["UpdateTime"].substring(8, 10)) + "日 " + (data[0]["UpdateTime"].substring(11, 16)))
                //$("#engDateDetail").html((data[0]["UpdateTime"].substring(0, 4) - 1911) + "年" + (data[0]["UpdateTime"].substring(5, 7)) + "月" + (data[0]["UpdateTime"].substring(8, 10)) + "日 " + (data[0]["UpdateTime"].substring(11, 16)))
                $(".engDate").html("(" + (data[0]["UpdateDate"].substring(0, 3)) + "." + (data[0]["UpdateDate"].substring(3, 5)) + ")");

                for (var i = 0; i < data.length; i++) {
                    if ($("#year").val() == "" && data[i]["ActualTotalProgress"] == 100.00)
                        continue;
                    if(data[i]["ExecutingState"]=="解約" || data[i]["ExecutingState"]=="停工中")
                    	continue;
                    
                    state[0]++;

                    html = "";
                    html += "<a onclick=\"getEngDetail('" + data[i]["ProjectNo"] + "')\" class=\"list-group-item\"><div class=\"pull-left\">";
                    html += "<div data-toggle=\"easypiechart\" class=\"easyPieChart\" data-percent=\"" + data[i]["ActualTotalProgress"] + "\" data-animate=\"1000\" data-barcolor=\"#428bca\" data-size=\"70\" data-trackcolor=\"#addbfc\" data-linewidth=\"7\" data-linecap=\"butt\" style=\"width: 55px; height: 55px; line-height: 55px;\">";
                    html += formatNumber(data[i]["ActualTotalProgress"], 2) + "%";
                    html += "<canvas width=\"55\" height=\"55\"></canvas></div><div class=\"piechart-footer\"><code>施工進度</code></div></div>";
                    html += "<h4 class=\"list-group-item-heading\">" + data[i]["ProjectName"] + "</h4>";
                    html += "<p class=\"font16 fix-arrow\"><span class=\"pull-right darkgray glyphicon glyphicon-chevron-right\"></span></p>";

                    var color = "f-conform";
                    var value = data[i]["ActualTotalProgress"] - data[i]["ScheduledTotalProgress"];
                    if (value > 0) {
                        state[3]++;
                        color = "f-lead";
                    }
                    else if (value < 0) {
                        state[1]++;
                        color = "f-behind";
                    }
                    else
                        state[2]++;
                    html += "<p class=\"list-group-item-text margin-T10 darkgray \">進度差異&nbsp;<span class=\" font18 " + color + " font-bold\">" + formatNumber(value, 2) + "%</span></p></a>";

                    if (value > 0) {
                        $("#engList4").append(html);
                    }
                    else if (value < 0) {
                        $("#engList2").append(html);
                    }
                    else
                        $("#engList3").append(html);

                    $("#engList").append(html);
                }
            }

            $("#state_0").html(state[0]);
            $("#state_1").html(state[1]);
            $("#state_2").html(state[2]);
            $("#state_3").html(state[3]);
            InitiateEasyPieChart.init();
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngDetail(ProjectNo) {
    $("#page1").hide();
    $("#page2").show();

    getEngDetailProgress(ProjectNo);
    getEngDetailRCMPercent(ProjectNo);
    getEngDetailRCMPhoto(ProjectNo);

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngDetail?projectNo=" + ProjectNo,
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngDetail"];

            $("#ProjectNo").html(data[0]["ProjectNo"]);
            $("#ExecutingUnit").html(data[0]["ExecutingUnit"]);
            $("#ProjectName").html(data[0]["ProjectName"]);
            $("#ProjectCategory").html(data[0]["ProjectCategory"]);
            $("#CountyProjectLocation").html(data[0]["CountyProjectLocation"]);
            $("#Coordinates").html(data[0]["Coordinates"]);
            $("#ProjectLocation").html(data[0]["ProjectLocation"]);
            $("#ProjectCompetentAuthority").html(data[0]["ProjectCompetentAuthority"]);
            $("#ProjectExecuteAuthority").html(data[0]["ProjectExecuteAuthority"]);
            $("#ProjectInChargeEntity").html(data[0]["ProjectInChargeEntity"]);
            $("#ProjectAdministrator_Name").html(data[0]["ProjectAdministrator_Name"]);
            $("#ProjectAdministrator_Telephone").html(data[0]["ProjectAdministrator_Telephone"]);
            $("#ProjectAdministrator_EmailAddress").html(data[0]["ProjectAdministrator_EmailAddress"]);
            $("#ProjectSummary").html(data[0]["ProjectSummary"]);
            $("#ContractDuration").html(data[0]["ContractDuration"]);
            $("#NoteContractDuration").html(data[0]["NoteContractDuration"]);
            $("#Planner").html(data[0]["Planner"]);
            $("#Designer").html(data[0]["Designer"]);
            $("#Supervisory").html(data[0]["Supervisory"]);
            $("#Contractor").html(data[0]["Contractor"]);

            $("#ScheduledDateTenderAwarding").html(formatDate(data[0]["ScheduledDateTenderAwarding"]));
            $("#ScheduledCommencementDate").html(formatDate(data[0]["ScheduledCommencementDate"]));
            $("#ScheduledCompletionDate").html(formatDate(data[0]["ScheduledCompletionDate"]));

            $("#ActualDatePublication").html(formatDate(data[0]["ActualDatePublication"]));
            $("#ActualDateTenderOpening").html(formatDate(data[0]["ActualDateTenderOpening"]));
            $("#ActualDateTenderAwarding").html(formatDate(data[0]["ActualDateTenderAwarding"]));
            $("#ActualCommencementDate").html(formatDate(data[0]["ActualCommencementDate"]));
            $("#ActualCompletionDate").html(formatDate(data[0]["ActualCompletionDate"]));

            $("#TotalBudget").html(data[0]["TotalBudget"]);
            $("#ContractBudget").html(data[0]["ContractBudget"]);
            $("#TenderAwardingValue").html(data[0]["TenderAwardingValue"]);
            $("#AccountingTitle").html(data[0]["AccountingTitle"]);
            $("#BudgetSource").html(data[0]["BudgetSource"]);
            $("#BudgetCategory").html(data[0]["BudgetCategory"]);
            $("#EstimatedBasePrice").html(data[0]["EstimatedBasePrice"]);
            $("#AuthorizedBasePrice").html(data[0]["AuthorizedBasePrice"]);

            $("html, body").animate({ scrollTop: 0 }, "slow");
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngDetailProgress(ProjectNo) {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngDetailProgress?projectNo=" + ProjectNo,
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngDetailProgress"];

            $("#UpdateDate").html(formatDate(data[0]["UpdateDate"]));
            $("#ScheduledTotalAmount").html(data[0]["ScheduledTotalAmount"]);
            $("#ActualTotalAmount").html(data[0]["ActualTotalAmount"]);
            $("#ScheduledYearAmount").html(data[0]["ScheduledYearAmount"]);
            $("#ActualYearAmount").html(data[0]["ActualYearAmount"]);
            $("#UnPayable").html(data[0]["UnPayable"]);

            $("#UpdateDate2").html(formatDate(data[0]["UpdateDate"]));
            $("#ScheduledTotalProgress").html(data[0]["ScheduledTotalProgress"]);
            $("#ActualTotalProgress").html(data[0]["ActualTotalProgress"]);
            $("#ScheduledYearProgress").html(data[0]["ScheduledYearProgress"]);
            $("#ActualYearProgress").html(data[0]["ActualYearProgress"]);
            $("#ActualExecutiveSummary").html(data[0]["ActualExecutiveSummary"]);
            $("#ExecutingState").html(data[0]["ExecutingState"]);

            $("#UpdateDate3").html(formatDate(data[0]["UpdateDate"]));
            $("#BehindFactors").html(data[0]["BehindFactors"]);
            $("#AnalyzeFactor").html(data[0]["AnalyzeFactor"]);
            $("#Solutions").html(data[0]["Solutions"]);
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngDetailRCMPercent(ProjectNo) {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngDetailRCMPercent?projectNo=" + ProjectNo,
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["RCM_ConstructionPercent"];
            var data2 = msg["RCM_ConstructionPercent"];

            $("#date").html(formatDate(data[0]["date"]));
            $("#design_percent").html(data[0]["design_percent"]);
            $("#act_percent").html(data[0]["act_percent"]);
            $("#design_percent2").html(data2[0]["design_percent"]);
            $("#act_percent2").html(data2[0]["act_percent"]);
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngDetailRCMPhoto(ProjectNo) {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngDetailRCMPhoto?projectNo=" + ProjectNo,
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngDetailRCMPhoto"];

            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += "<tr><th>查驗點名稱</th><td>" + data[i]["Chkpoint"] + "</td></tr>";
                html += "<tr><th>照片檔案</th><td><img src=\"" + serviceIP + "/" + data[i]["filepath"] + "\" width=\"100%\"/></td></tr>";
                html += "<tr><th>上傳時間</th><td>" + formatDate(data[i]["uploadtime"]) + "</td></tr>";
            }
            $("#photo").html(html);
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

//
function getEngStatusList() {
    $("#ES_detailTab_tab1 > div").html("");
    $("#ES_detailTab_tab2 > div").html("");
    $("#ES_detailTab_tab3 > div").html("");
    $("#ES_detailTab_tab4 > div").html("");

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngStatusList?year=" + $("#year").val() + "&keywords=" + $("#keywords").val(),
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            var html = "";
            var state = [0, 0, 0, 0];

            data = msg["getEngStatusList"];

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if ($("#year").val() == "" && data[i]["ActualTotalProgress"] == 100.00)
                        continue;
                    state[0]++;

                    html = "";
                    html += "<a class=\"list-group-item\" onclick=\"getEngDetail('" + data[i]["ProjectNo"] + "')\">";
                    html += "<h4 class=\"list-group-item-heading\">" + data[i]["ProjectName"] + "</h4>";
                    html += "<p class=\"font16 fix-arrow\"><span class=\"pull-right darkgray glyphicon glyphicon-chevron-right\"></span></p></a> ";
                    if (data[i]["ExecutingState"] == "施工中" ||
                    data[i]["ExecutingState"] == "停工中" ||
                    data[i]["ExecutingState"] == "已決標") {
                        state[1]++;
                        $("#ES_detailTab_tab2 > div").append(html)
                    }
                    else if (
                    data[i]["ExecutingState"] == "已完工" ||
                    data[i]["ExecutingState"] == "完工待驗收") {
                        state[2]++;
                        $("#ES_detailTab_tab3 > div").append(html)
                    }
                    else if (
                    data[i]["ExecutingState"] == "保固中" ||
                    data[i]["ExecutingState"] == "驗收完成" ||
                    data[i]["ExecutingState"] == "已結案" ||
                    data[i]["ExecutingState"] == "已付款") {
                        state[3]++;
                        $("#ES_detailTab_tab4 > div").append(html)
                    }
                    $("#ES_detailTab_tab1> div").append(html);
                }
            }

            $("#stateAll").html(state[0]);
            $("#stateA").html(state[1]);
            $("#stateB").html(state[2]);
            $("#stateC").html(state[3]);
            $("#stateAll2").html(state[0]);
            $("#stateA2").html(state[1]);
            $("#stateB2").html(state[2]);
            $("#stateC2").html(state[3]);

            getEngStatusTitle();
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngStatusTitle() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngStatusTitle?year=" + $("#year").val() + "&keywords=" + $("#keywords").val(),
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngStatusTitle"];
            var categorieAll = [];
            var stateA = [];
            var stateB = [];
            var stateC = [];
            for (var i = 0; i < data.length; i++) {
                if ($("#year").val() == "" && data[i]["ActualTotalProgress"] == 100.00)
                    continue;
                if (data[i]["AccountingTitle"] != "") {
                    categorieAll.push(data[i]["AccountingTitle"]);
                    stateA.push(data[i]["stateA"]);
                    stateB.push(data[i]["stateB"]);
                    stateC.push(data[i]["stateC"]);
                }
            }

            $("#engStatusTitle").css("width", "100%").css("height", categorieAll.length * 30).css("background-color", "#ff0000");

            $("#engStatusTitle").highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: categorieAll,
                    labels: {
                        formatter: function () {
                            var text = this.value,
						    formatted = text.length > 12 ? text.substring(0, 12) + '...' : text;

                            return '<div class="js-ellipse" style="width:150px; overflow:hidden" title="' + text + '">' + formatted + '</div>';
                        },
                        style: {
                            width: '150px'
                        },
                        useHTML: true
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                colors: ['#7d4a82', '#81c538', '#ff6d60'],
                series: [
                            {
                                name: '已驗收',
                                data: stateC
                            },
                            {
                                name: '已完工',
                                data: stateB
                            },
                            {
                                name: '已發包',
                                data: stateA
                            }
                        ]
            });
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngFee() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngFee?year=" + $("#year").val() + "&keywords=" + $("#keywords").val(),
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngFee"];

            if (data.length > 0) {
                $("#feeTotalBudget").html(data[0]["TotalBudget"]);
                $("#feeActualTotalAmount").html(data[0]["ActualTotalAmount"]);
                $("#feeUnPayable").html(data[0]["UnPayable"]);
                $("#ExecutionRateO").attr("data-percent", formatNumber(data[0]["ExecutionRate"], 2));
                $("#ExecutionRate").html(formatNumber(data[0]["ExecutionRate"], 2) + "%");
                $("#ConversionRateO").attr("data-percent", formatNumber(data[0]["ConversionRate"], 2));
                $("#ConversionRate").html(formatNumber(data[0]["ConversionRate"], 2) + "%");

                InitiateEasyPieChart.init();
                getEngFeeTitle();
            }
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngFeeTitle() {
    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngFeeTitle?year=" + $("#year").val() + "&keywords=" + $("#keywords").val(),
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngFeeTitle"];
            var categorieAll = [];
            var dataA = [];
            var dataB = [];
            var dataC = [];
            $("#engFeeTitleList").html("");
            for (var i = 0; i < data.length; i++) {
                if ($("#year").val() == "" && data[i]["ActualTotalProgress"] == 100.00)
                    continue;
                if (data[i]["AccountingTitle"] != "") {
                    categorieAll.push(data[i]["AccountingTitle"]);
                    dataA.push(data[i]["ActualTotalAmount"]);
                    //dataB.push(data[i]["ExecutionRate"]);
                    //dataC.push(data[i]["ConversionRate"]);

                    $("#engFeeTitleList").append("<a onclick=\"getEngNameTitle('" + data[i]["AccountingTitle"] + "')\" class=\"list-group-item\"><h4 class=\"list-group-item-heading\">" + data[i]["AccountingTitle"] + "</h4><p class=\"font16 fix-arrow\"><span class=\"pull-right  darkgray glyphicon glyphicon-chevron-right\"></span></p></a>");
                }
            }

            $("#engFeeTitle").css("width", "100%").css("height", categorieAll.length * 30).css("background-color", "#ff0000");

            $("#engFeeTitle").highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: categorieAll,
                    labels: {
                        formatter: function () {
                            var text = this.value,
						    formatted = text.length > 12 ? text.substring(0, 12) + '...' : text;

                            return '<div class="js-ellipse" style="width:150px; overflow:hidden" title="' + text + '">' + formatted + '</div>';
                        },
                        style: {
                            width: '150px'
                        },
                        useHTML: true
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '千元',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 千元'
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                colors: ['#7d4a82'],
                series: [
                            {
                                name: '目前執行經費',
                                data: dataA
                            }
                        ]
            });
            /*
            $('#engFeeTitle').highcharts({
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
                    categories: categorieAll,
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value} %',
                        style: {
                            color: '#81c538'
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: '#81c538'
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#7bc5fa'
                        }
                    },
                    labels: {
                        format: '{value} K',
                        style: {
                            color: '#7bc5fa'
                        }
                    }

                }, { // Tertiary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#7d4a82'
                        }
                    },
                    labels: {
                        format: '{value} %',
                        style: {
                            color: '#7d4a82'
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 80,
                    verticalAlign: 'top',
                    y: 55,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    name: '目前執行經費',
                    type: 'column',
                    color: '#7bc5fa',
                    yAxis: 1,
                    data: dataA,
                    tooltip: {
                        valueSuffix: ' K'
                    }

                }, {
                    name: '目前執行率',
                    type: 'spline',
                    color: '#7d4a82',
                    yAxis: 2,
                    data: dataB,
                    marker: {
                        enabled: false
                    },
                    dashStyle: 'shortdot',

                    tooltip: {
                        valueSuffix: ' %'
                    }

                }, {
                    name: '目前達成率',
                    type: 'spline',
                    color: '#81c538',
                    data: dataC,
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }]
            });*/
        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function getEngNameTitle(accountingTitle) {
    $("#feePage").hide();
    $("#myTab").hide();
    $("#feeHeader").hide();
    $("#activeHeader").hide();
    $("#feeHeader2").show();
    $("#activeHeader2").show();
    $("#btnBack2Area").show();
    $("#engNameHeader").html(accountingTitle);
    $("#engNamePage").show();

    $.ajax({
        crossDomain: true,
        cache: false,
        headers: { "cache-control": "no-cache" },
        url: serviceURL + "/getWraNBData.asmx/getEngNameTitle?accountingTitle=" + accountingTitle,
        contentType: "text/html; charset=utf-8",
        dataType: "jsonp",
        success: function (msg) {
            data = msg["getEngNameTitle"];
            var categorieAll = [];
            var feeA = 0.0;
            var feeB = 0.0;
            var feeC = 0.0;
            var feeD = 0.0;
            var feeE = 0.0;
            var dataA = [];
            var dataB = [];
            var dataC = [];
            var dataD = [];
            $("#engNameTitleList").html("");
            for (var i = 0; i < data.length; i++) {
                if (data[i]["ProjectName"] != "") {
                    categorieAll.push(data[i]["ProjectName"]);
                    feeA += data[i]["TotalBudget"];
                    feeB += data[i]["TenderAwardingValue"];
                    feeC += data[i]["ActualTotalAmount"];
                    feeD += data[i]["UnPayable"];
                    feeE += data[i]["ScheduledTotalAmount"];
                    dataA.push(data[i]["TotalBudget"]);
                    dataB.push(data[i]["ActualTotalAmount"]);
                    dataC.push(data[i]["UnPayable"]);
                    dataD.push(data[i]["TotalBudget"] - data[i]["TenderAwardingValue"]);
                    var e = 0.0;
                    var c = 0.0;

                    if (parseFloat(data[i]["ScheduledTotalAmount"]) > 0)
                        e = formatNumber(((parseFloat(data[i]["ActualTotalAmount"]) + parseFloat(data[i]["UnPayable"]) + (parseFloat(data[i]["TotalBudget"]) - parseFloat(data[i]["TenderAwardingValue"]))) / parseFloat(data[i]["ScheduledTotalAmount"])) * 100, 2);

                    if (parseFloat(data[i]["TotalBudget"]) > 0)
                        c = formatNumber(((parseFloat(data[i]["ActualTotalAmount"]) + parseFloat(data[i]["UnPayable"]) + (parseFloat(data[i]["TotalBudget"]) - parseFloat(data[i]["TenderAwardingValue"]))) / parseFloat(data[i]["TotalBudget"])) * 100, 2);

                    $("#engNameTitleList").append("<a class=\"list-group-item\"><h4 class=\"list-group-item-heading\">" + data[i]["ProjectName"] + "</h4><p class=\"list-group-item-text darkgray  p_value\">執行率&nbsp;<span class=\" font18 f-all font-bold\">" + e + "%</span><label class=\"margin-L25\">達成率</label><span class=\"font18 f-conform font-bold\">&nbsp;" + c + "%</span></p></a>");
                }
            }

            $("#feeTotalBudget2").html(formatNumber(parseFloat(feeA), 2));
            $("#feeActualTotalAmount2").html(formatNumber(parseFloat(feeC), 2));
            $("#feeUnPayable2").html(formatNumber(parseFloat(feeD), 2));
            var rate = ((feeC + feeD + (feeA - feeB)) / feeE) * 100;
            rate = formatNumber(rate, 2);
            if (parseFloat(feeE) <= 0)
                rate = 0;
            $("#ExecutionRateO2").attr("data-percent", rate);
            $("#ExecutionRate2").html(rate + "%");

            rate = ((feeC + feeD + (feeA - feeB)) / feeA) * 100;
            rate = formatNumber(rate, 2);
            if (parseFloat(feeA) <= 0)
                rate = 0;
            $("#ConversionRateO2").attr("data-percent", rate);
            $("#ConversionRate2").html(rate + "%");

            $("#engNameTitle").css("width", "100%").css("height", categorieAll.length * 150).css("background-color", "#ff0000");

            $('#engNameTitle').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: categorieAll,
                    labels: {
                        formatter: function () {
                            var text = this.value,
						    formatted = text.length > 12 ? text.substring(0, 12) + '...' : text;

                            return '<div class="js-ellipse" style="width:150px; overflow:hidden" title="' + text + '">' + formatted + '</div>';
                        },
                        style: {
                            width: '150px'
                        },
                        useHTML: true
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '千元',
                        align: 'high'
                    },
                    labels: {

                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 千元'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '總預算',
                    data: dataA
                }, {
                    name: '執行經費',
                    data: dataB
                }, {
                    name: '應付未付',
                    data: dataC
                }, {
                    name: '節餘數',
                    data: dataD
                }]
            });

        },
        error: function (e) {
            alert("無法取得資料", null, "系統異常");
        }
    });
}

function formatDate(date) {
    if (date.indexOf("-") == -1) {
        if ((!isNaN(date)) && date.length == 7)
            return date.substring(0, 3) + "年" + date.substring(3, 5) + "月" + date.substring(5, 7) + "日";
        else if ((!isNaN(date)) && date.length == 5)
            return date.substring(0, 3) + "年" + date.substring(3, 5) + "月";
        else if ((!isNaN(date)) && date.length == 3)
            return date.substring(0, 3) + "年";
        else
            return "";
    }
    else if (date.indexOf("-") > -1)
        return (date.substring(0, 4) - 1911) + "年" + (date.substring(5, 7)) + "月" + (date.substring(8, 10)) + "日";
    else
        return "";
}

function toMap(type, x, y) {
    location.href = "00_Map.html?type=" + type + "&x=" + x + "&y=" + y;
}