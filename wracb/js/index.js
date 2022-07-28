
$(document).ready(function () {
    console.log("ready!");
    bindEvent();
});


function bindEvent() { //靜態事件綁定

    $.get("header.html", function(data){
        $(".headerpage").replaceWith(data);
    });

    //$(".headerpage").load("header.html");

    $(".locbut").off().on("click", function () {
        const reservoirid = $(this).attr("data-reservoirid");
        console.log(reservoirid);
        downloadList(reservoirid);
    })
    $(".cwbbut").off().on("click", function () {
        console.log("click cwb button");
        getCwbEqk();
    })

    $(".list").off().on("change", function () {
        console.log("click list");
        let page = $(this).val();
        console.log(page);
        ChangePage($("[title|='Pages']"), $("#" + page));
    })

    $(".CctvLocBut").off().on("click", function () {
        console.log("click cctv loc but");
        const reservoirid = $(this).attr("data-reservoirid");
        console.log(reservoirid);
        getCctvList(reservoirid);

    })

    $(".CctvLocBut").off().on("click", function () {
        const reservoirid = $(this).attr("data-reservoirid");
        console.log(reservoirid);
        getCctvList(reservoirid);
    })

    $("[title|='Pages']").hide();
    $("#MainPage").show();

}

function ChangePage(page1, page2) { //可以用toggle切換
    page1.hide();
    page2.show();
}

function downloadList(rid) {
    $.ajax({
        type: "GET",
        url: "https://hydro2.wracb.gov.tw/WracbApi/App/Earthquake/Realtime/" + rid,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            $(".Result").empty();
            $.each(msg, function (index, locdata) {
                $('.Result').append(`<p id="PointName">${locdata.PointName}</p>
                <span id="InfoTime">${locdata.InfoTime}</span>
                <span id="MappingIntensity">${locdata.MappingIntensity}</span>
                <span><button data-pointid="${locdata.PointID}" class="EqkDetail">click</button></span></p>`);
            });

            //動態事件綁定
            $(".EqkDetail").off().on("click", function () {
                console.log("inside EqkDetail");
                const pid = $(this).attr("data-pointid");
                ChangePage($("#MainPage"), $("#SecPage"));
                showDetail(msg, pid);
            })

            $("#EqkReturn").off().on("click", function () {
                console.log("inside EqkReturn");
                ChangePage($("#SecPage"), $("#MainPage"));
            })
        },
        error: function (e) {
            console.log('Failed');
        }
    });


}

function showDetail(msg, pid) {

    console.log("pid = " + pid);
    $(".ResultDetail").empty();
    $("#EqkSecTittle").empty();

    let pidorder;
    for (let i = 0; i < msg.length; i++) {
        if (msg[i]["PointID"] == pid) {
            pidorder = i;
        }
    }
    $('.EqkSecTittle').append(`<p class="DataL">${msg[pidorder]["PointName"]}</p>`);
    $('.ResultDetail').append(`
    <p><span class="DataT">地震發生時間</span><span class="DataD">${msg[pidorder]["InfoTime"]}</span></p><hr> 
    <p><span class="DataT">震度</span><span class="DataD">${msg[pidorder]["MappingIntensity"]}</span><span class="DataU">級</span></p><hr>
    <p><span class="DataT">X軸最大加速度</span><span class="DataD">${msg[pidorder]["PgaX"]}</span><span class="DataU">gal</span></p><hr>
    <p><span class="DataT">Y軸最大加速度</span><span class="DataD">${msg[pidorder]["PgaY"]}</span><span class="DataU">gal</span></p><hr>
    <p><span class="DataT">Z軸最大加速度</span><span class="DataD">${msg[pidorder]["PgaZ"]}</span><span class="DataU">gal</span></p><hr>
    <p><span class="DataT">X軸速度</span><span class="DataD">${msg[pidorder]["PgvX"]}</span><span class="DataU">cm/sec</span></p><hr>
    <p><span class="DataT">Y軸速度</span><span class="DataD">${msg[pidorder]["PgvY"]}</span><span class="DataU">cm/sec</span></p><hr>
    <p><span class="DataT">Z軸速度</span><span class="DataD">${msg[pidorder]["PgvZ"]}</span><span class="DataU">cm/sec</span></p><hr>
    <p><span class="DataT">三軸向加速度地震歷時圖</p>
    <img src="${msg[0]["WaveImageUrl"]}"></img>`);

}

function getCwbEqk() {

    $.ajax({
        type: "GET",
        url: "http://opendata.cwb.gov.tw/govdownload?dataid=E-A0015-001R&authorizationkey=rdec-key-123-45678-011121314",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            $(".Result").empty();
            $.each(msg, function (index, locdata) {
                $('.Result').append(`<p id="PointName">${locdata.PointName}</p>
                <p id="InfoTime">${locdata.InfoTime}</p>
                <p id="MappingIntensity">${locdata.MappingIntensity}</p>
                <button data-pointid="${locdata.PointID}" class="EqkDetail">click</button>`);
            });

            //動態事件綁定
            $(".EqkDetail").off().on("click", function () {
                console.log("inside EqkDetail");
                ChangePage($("#MainPage"), $("#SecPage"));
                showCwbEqk();
            })

        },
        error: function (e) {
            console.log('Failed');
        }
    });
}

function showCwbEqk() {

    console.log("in showcwbeqk");
    $(".ResultDetail").empty();
    $("#EqkSecTittle").empty();


}

function getCctvList(rid) {
    $.ajax({
        type: "GET",
        url: "https://hydro2.wracb.gov.tw/WracbApi/App/CCTV/Info/Realtime",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (cctv) {
            console.log(cctv);
            $(".CctvResult").empty();

            let ridorder;
            for (let i = 0; i < cctv.length; i++) {
                if (cctv[i]["Category"]["CategoryID"] == rid) {
                    ridorder = i;
                    console.log("ridorder is " + ridorder);
                    break;
                }
            }

            $.each(cctv[ridorder]["CctvInfos"], function (index, location) {
                $('.CctvResult').append(`
                <p>${location.Location}</p> 
                <button data-cctvinfoid="${location.ID}" data-name="${location.Location}" class="CctvDetail">觀看</button><hr>
                `);

            });

            //動態事件綁定
            $(".CctvDetail").off().on("click", function () {
                console.log("inside CctvDetail");
                const iid = $(this).attr("data-cctvinfoid"); //iid = Info id
                const ln = $(this).attr("data-name"); //reservoir name
                ChangePage($("#CctvMainPage"), $("#CctvSecPage"));
                getCctvImage(rid, iid, ln);
            })
        },
        error: function (e) {
            console.log('Failed');
        }
    });

}

function getCctvImage(rid, iid, ln) {
    console.log("rid is " + rid + "  iid is " + iid);
    $.ajax({
        type: "GET",
        url: "https://hydro2.wracb.gov.tw/WracbApi/App/CCTV/Info/Interval/" + rid + "/" + iid,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (cctvimage) {
            console.log(cctvimage);
            $(".ResultImage").empty();
            $("#CctvSecTittle").empty();
            $('#CctvSecTittle').append(`<p>${ln}</p> `);
            $.each(cctvimage, function (index, imageurl) {
                $('.ResultImage').append(`<img src="${imageurl["ImageUrl"]}" alt=""/>`);
            });

            //動態事件綁定
            let showImages;
            $('.ResultImage').each(function () {
                let slideImgs = $(this).find('img'),
                    slideImgsCount = slideImgs.length, //圖片總數
                    currentIndex = 0;

                slideImgs.eq(currentIndex).fadeIn(); //指定特定個元素
                showImages = setInterval(showNextSlide, 1000); //定時循環執行
                function showNextSlide() {
                    let nextIndex = (currentIndex + 1) % slideImgsCount;
                    console.log(nextIndex)
                    slideImgs.eq(currentIndex).fadeOut();
                    slideImgs.eq(nextIndex).fadeIn();
                    currentIndex = nextIndex;
                }
            })

            $("#CctvReturn").off().on("click", function () {
                clearInterval(showImages);
                console.log("Interval_showImages STOP");
                console.log("inside CctvReturn");
                ChangePage($("#CctvSecPage"), $("#CctvMainPage"));
            })
        },
        error: function (e) {
            console.log('Failed');
        }
    });

}


