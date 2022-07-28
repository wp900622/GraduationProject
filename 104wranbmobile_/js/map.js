var layers = [];
var layerObj = null;
var map = null;
var mapView = null;

var vectorSourceRainfall = [];

dynamicScriptByOS();

function initialize() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    bindEvent();
    initLayers();
    initMap();
}

function bindEvent() {
    $("#btnBack").on("click", function(){
        window.history.back();
    });
    
    $("#goMyArea").on("click", function () {
        panZoomMap(24.6807, 121.4951, 9);
    });
}

function initLayers() {
    var wmsWranbEndPoint = "https://wrms.wranb.gov.tw/geoserver/wranb/wms";
    var wfsWranbEndPoint = "https://wrms.wranb.gov.tw/geoserver/ows?service=WFS&version=1.1.0&request=GetFeature&outputFormat=application/json&srsname=EPSG:3857&typename=wranb:";
    //var wmsWranbEndPoint = "http://140.134.48.13:8080/geoserver/wranb/ows?service=wms";
    //var wfsWranbEndPoint = "http://140.134.48.13:8080/geoserver/wranb/ows?service=WFS&version=1.1.0&request=GetFeature&outputFormat=application/json&srsname=EPSG:3857&typename=wranb:";
    var wmsWraEndPoint = "http://maps.wra.gov.tw/arcgis/services/WMS/APLayer_WMS_E/MapServer/WMSServer";
    var wmtsNLSCEndPoint = "http://wmts.nlsc.gov.tw/wmts";
    var wmtsXYZSinicaEndPoint = "http://gis.sinica.edu.tw/tgos/file-exists.php?img=";

    var wmsWranbIconEndPoint = "https://wrms.wranb.gov.tw/geoserver/wranb/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=16&height=16&layer=wranb:";
    //var wmsWranbIconEndPoint = "http://140.134.48.13:8080/geoserver/wranb/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=16&height=16&layer=wranb:";
    var wmsWraIconEndPoint = "http://maps.wra.gov.tw/arcgis/services/WMS/APLayer_WMS_E/MapServer/WmsServer?request=GetLegendGraphic&version=1.1.1&format=image/png&layer=";
    var wmtsNLSCIconEndPoint = "http://wmts.nlsc.gov.tw/wmts";
    var wmtsXYZSinicaIconEndPoint = "http://gis.sinica.edu.tw/tgos/file-exists.php?img=";

    var proxy = "https://wrms.wranb.gov.tw/WraNBMobile104/getWraNBData.asmx/proxy?callback=a&url=";

    layerObj = 
    {
        name: "圖層物件",
        allLayers:
        [
            {
                name: "底圖",
                layers:
                [
                    {
                        cName: "通用版電子地圖",
                        eName: "EMAP5",
                        service: "wmts",
                        url: wmtsNLSCEndPoint,
                        icon: wmtsNLSCIconEndPoint,
                        visible: true
                    },
                    {
                        cName: "正射影像(通用版)",
                        eName: "PHOTO2",
                        service: "wmts",
                        url: wmtsNLSCEndPoint,
                        icon: wmtsNLSCIconEndPoint,
                        visible: false
                    },
                    {
                        cName: "地形暈渲混合圖",
                        eName: "HILLSHADEMIX_W",
                        service: "wmtsXYZ",
                        url: wmtsXYZSinicaEndPoint + "HILLSHADEMIX_W-png-{z}-{x}-{y}",
                        icon: wmtsXYZSinicaIconEndPoint,
                        visible: false
                    }
                ]
                },
            {
                name: "圖層套疊",
                layers:
                [
                    {
                        cName: "轄區範圍",
                        eName: "map_wranb_range",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_wranb_range" }

                    },
                    {
                        cName: "縣市界",
                        eName: "map_county",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_county" }
                    },
                    {
                        cName: "鄉鎮區界",
                        eName: "map_town",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_town" }
                    },
                    {
                        cName: "水庫蓄水範圍",
                        eName: "map_reservoir",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_reservoir" }
                    },
                    {
                        cName: "集水區範圍",
                        eName: "map_catchment_area",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_catchment_area" }
                    },
                    {
                        cName: "河川流域",
                        eName: "map_basin",
                        service: "wms",
                        url: wmsWraEndPoint,
                        icon: wmsWraIconEndPoint,
                        visible: false,
                        projection: "EPSG:102443",
                        params: { layers: "2" }
                    },
                    {
                        cName: "水質水量保護區",
                        eName: "map_protect",
                        service: "wms",
                        url: wmsWraEndPoint,
                        icon: wmsWraIconEndPoint,
                        visible: false,
                        projection: "EPSG:102443",
                        params: { layers: "7" }
                    }
                ]
            },
            {
                name: "監測資源 - 雨量站",
                layers:
                [
                    {
                        cName: "石門",
                        eName: "map_rainfall_shemen",
                        service: "wfs",
                        url: wfsWranbEndPoint,
                        icon: "./img/rain_gauge_g.svg",
                        visible: false,
                        projection: "EPSG:3857",
                    },
                    {
                        cName: "三峽",
                        eName: "map_rainfall_sanxia",
                        service: "wfs",
                        url: wfsWranbEndPoint,
                        icon: "./img/rain_gauge_g.svg",
                        visible: false,
                        projection: "EPSG:3857",
                    },
                    {
                        cName: "鳶山堰",
                        eName: "map_rainfall_yuanshan",
                        service: "wfs",
                        url: wfsWranbEndPoint,
                        icon: "./img/rain_gauge_g.svg",
                        visible: false,
                        projection: "EPSG:3857",
                    },
                    {
                        cName: "上坪堰",
                        eName: "map_rainfall_shangping",
                        service: "wfs",
                        url: wfsWranbEndPoint,
                        icon: "./img/rain_gauge_g.svg",
                        visible: false,
                        projection: "EPSG:3857",
                    },
                    {
                        cName: "桃灌",
                        eName: "map_rainfall_taoguan",
                        service: "wfs",
                        url: wfsWranbEndPoint,
                        icon: "./img/rain_gauge_g.svg",
                        visible: false,
                        projection: "EPSG:3857",
                    },
                    {
                        cName: "石灌",
                        eName: "map_rainfall_shiguan",
                        service: "wfs",
                        url: wfsWranbEndPoint,
                        icon: "./img/rain_gauge_g.svg",
                        visible: false,
                        projection: "EPSG:3857",
                    }
                ]
            },
            {
                name: "監測資源 - 水質站",
                layers:
                [
                    {
                        cName: "石門",
                        eName: "Shemen",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_water_quality_meter", cql_filter: "object_id<=31" }

                    },
                    {
                        cName: "寶二",
                        eName: "Bao",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "map_water_quality_meter", cql_filter: "object_id is null" }
                    }
                ]
            },
            {
                name: "監測資源 - 歷年工程",
                layers:
                [
                    {
                        cName: "歷年工程點位",
                        eName: "eng",
                        service: "wms",
                        url: wmsWranbEndPoint,
                        icon: wmsWranbIconEndPoint,
                        visible: false,
                        projection: "EPSG:4326",
                        params: { layers: "V_ProjectBasicData"}

                    }
                ]
            }
        ]
    };

    var projection = ol.proj.get('EPSG:3857');
    var projectionExtent = projection.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var resolutions = new Array(14);
    var matrixIds = new Array(14);
    for (var z = 0; z < 19; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    // 底圖
    $("#baseMapLayers").empty();
    for (var i = 0; i < layerObj.allLayers[0].layers.length; i++) {
        if (layerObj.allLayers[0].layers[i].service == "wmts") {
            layers.push(new ol.layer.Tile({
                source: new ol.source.WMTS({
                    url: layerObj.allLayers[0].layers[i].url,
                    layer: layerObj.allLayers[0].layers[i].eName,
                    matrixSet: 'GoogleMapsCompatible',
                    format: 'image/png',
                    projection: projection,
                    tileGrid: new ol.tilegrid.WMTS({
                        origin: ol.extent.getTopLeft(projectionExtent),
                        resolutions: resolutions,
                        matrixIds: matrixIds
                    })
                }),
                visible: layerObj.allLayers[0].layers[i].visible
            }));
        }
        else if (layerObj.allLayers[0].layers[i].service == "wmtsXYZ")
        {
            layers.push(new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: layerObj.allLayers[0].layers[i].url
                }),
                visible: layerObj.allLayers[0].layers[i].visible
            }));
        }

        var checked = "";
        if (i == 0)
            checked = "checked";
        var html = $("<li><input type=\"checkbox\" name=\"" + layerObj.allLayers[0].layers[i].eName + "\" " + checked + "><span><img src=\"./img/" + layerObj.allLayers[0].layers[i].eName + ".png\"></span>" + layerObj.allLayers[0].layers[i].cName + "</li>");
        html.on("click", function () {
            if ($(this).find("input").attr("name") == "EMAP5") {
                $(this).find("input").attr("checked", "checked");
                return false;
            }
            for (var i = 0; i < layerObj.allLayers.length; i++) {
                for (var z = 0; z < layerObj.allLayers[i].layers.length; z++) {
                    if (layerObj.allLayers[i].layers[z].eName == $(this).find("input").attr("name")) {
                        layers[i * 3 + z].setVisible($(this).find("input").is(":checked"));
                        break;
                    }
                }
            }
        });
        $("#baseMapLayers").append(html);
    }

    // 圖層套疊
    $("#mapLayers").empty();
    for (var i = 0; i < layerObj.allLayers[1].layers.length; i++) {
        var html = $("<li><img class=\"chkicon\" src=\"./img/uncheckbox.png\" name=\"" + layerObj.allLayers[1].layers[i].eName + "\" value=\"false\"/><span><img src=\"" + layerObj.allLayers[1].layers[i].icon + layerObj.allLayers[1].layers[i].params.layers + "\"></span>" + layerObj.allLayers[1].layers[i].cName + "</li>");
        html.on("click", function () {
            if($(this).find("img[class='chkicon']").attr("value") == "false")
                $(this).find("img[class='chkicon']").attr("src","./img/checkbox.png").attr("value","true");
            else
                $(this).find("img[class='chkicon']").attr("src","./img/uncheckbox.png").attr("value","false");

            for (var i = 0; i < layerObj.allLayers.length; i++) {
                for (var z = 0; z < layerObj.allLayers[i].layers.length; z++) {
                    if (layerObj.allLayers[i].layers[z].eName == $(this).find("img[class='chkicon']").attr("name")) {
                        layers[i * 3 + z].setVisible($(this).find("img[class='chkicon']").attr("value")=="true");
                        break;
                    }
                }
            }
        });
        $("#mapLayers").append(html);
        layers.push(new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: layerObj.allLayers[1].layers[i].url,
                params: layerObj.allLayers[1].layers[i].params,
                projection: layerObj.allLayers[1].layers[i].projection,
                serverType: 'geoserver'
            }),
            visible: layerObj.allLayers[1].layers[i].visible
        }));
    }

    // 監測資源 - 雨量站
    for (var i = 0; i < layerObj.allLayers[2].layers.length; i++)
    {
        (function(x)
        {
            var subVectorSourceRainfall = new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return proxy+encodeURIComponent(layerObj.allLayers[2].layers[x].url + layerObj.allLayers[2].layers[x].eName);// +
                    //'&bbox=' + extent.join(',') + ',EPSG:3857';
                }//,
                //strategy: ol.loadingstrategy.bbox
            });
            subVectorSourceRainfall.setProperties({'siteID':layerObj.allLayers[2].layers[x].eName.split('_')[2], 'arrX': 2, 'arrY': x});

            var vector = new ol.layer.Vector({
                source: subVectorSourceRainfall,
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [10, 32],
                        anchorXUnits: 'pixels',
                        anchorYUnits: 'pixels',
                        src: layerObj.allLayers[2].layers[x].icon
                    })
                }),
                visible: layerObj.allLayers[2].layers[x].visible
            });

            vectorSourceRainfall.push(subVectorSourceRainfall);
            layers.push(vector);
        })(i);
    }

    // 監測資源 - 水質站
    for (var i = 0; i < layerObj.allLayers[3].layers.length; i++) {
        layers.push(new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: layerObj.allLayers[3].layers[i].url,
                params: layerObj.allLayers[3].layers[i].params,
                projection: layerObj.allLayers[3].layers[i].projection,
                serverType: 'geoserver'
            }),
            visible: layerObj.allLayers[3].layers[i].visible
        }));
    }

    // 監測資源 - 工程
    for (var i = 0; i < layerObj.allLayers[4].layers.length; i++) {
        layers.push(new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: layerObj.allLayers[4].layers[i].url,
                params: layerObj.allLayers[4].layers[i].params,
                projection: layerObj.allLayers[4].layers[i].projection,
                serverType: 'geoserver'
            }),
            visible: layerObj.allLayers[4].layers[i].visible
        }));
    }
}

function initMap() {
    mapView = new ol.View({
        center: ol.proj.transform([120.970825, 23.607679], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8.4,
        minZoom: 8.4
    });

    map = new ol.Map({
        layers: layers,
        target: 'map',
        controls: ol.control.defaults({
            attributionOptions:({
                collapsible: false
            })
        }),
        view: mapView,
        controls: []
    });

    $("#map").width($(window).width()).height($(window).height());
    map.updateSize();

    enableLayer(getParameterByName("type"), getParameterByName("site"));
}

function enableLayer(type, site)
{
    if(getParameterByName("type") == "rainfall")
    {
        var m=layerObj.allLayers[0].layers.length+layerObj.allLayers[1].layers.length; // 雨量在第3個layer
        for(var n=0; n<vectorSourceRainfall.length; n++)
        {
            if(vectorSourceRainfall[n].getProperties()["siteID"] == site)
            {
                layers[ m + n].setVisible(true);
                (function(nn){
                    setTimeout(function()
                    {
                        findRainfallFeatureById(nn, getParameterByName("id"));
                    }, 500);
                })(n);
                break;
            }
        }
    }
    else if(getParameterByName("type") == "quality")
    {
        var m = layerObj.allLayers[0].layers.length+layerObj.allLayers[1].layers.length+layerObj.allLayers[2].layers.length; // 雨量在第3個layer
        for (var i = 0; i < layerObj.allLayers[3].layers.length; i++) 
        {
            if(layerObj.allLayers[3].layers[i].eName == site)
            {
                layers[ m + i].setVisible(true);
                var latlng = twd97_to_latlng(getParameterByName("x"), getParameterByName("y"));
                setTimeout(function()
                {
                    panZoomMap(latlng["lat"], latlng["lng"], 18, 'EPSG:4326', 'EPSG:3857');
                }, 500);
                
                break;
            }
        }
    }
    else if(getParameterByName("type") == "eng")
    {
        var m = layerObj.allLayers[0].layers.length+layerObj.allLayers[1].layers.length+layerObj.allLayers[2].layers.length+layerObj.allLayers[3].layers.length; // 雨量在第3個layer
        layers[m].setVisible(true);
        var latlng = twd97_to_latlng(getParameterByName("x"), getParameterByName("y"));
        setTimeout(function()
        {
            panZoomMap(latlng["lat"], latlng["lng"], 18, 'EPSG:4326', 'EPSG:3857');
        }, 500);
    }
}

function findRainfallFeatureById(x, id)
{
    var m = vectorSourceRainfall[x].getProperties()["arrX"];
    var n = vectorSourceRainfall[x].getProperties()["arrY"];
    for(var y=0; y<vectorSourceRainfall[x].getFeatures().length; y++)
    {
        if(vectorSourceRainfall[x].getFeatures()[y].getProperties()["id"] == id)
        {
            panZoomMap(vectorSourceRainfall[x].getFeatures()[y].getProperties()["y"], vectorSourceRainfall[x].getFeatures()[y].getProperties()["x"], 14, 'EPSG:4326', 'EPSG:3857');
            break;
        }
    }
}

function panZoomMap(lat, lng, zoomLevel, srcEPSG, targetRPSG)
{
    var pan = ol.animation.pan({ duration: 1000, source: map.getView().getCenter() });
    var zoom = ol.animation.zoom({ duration: 1000, resolution: map.getView().getResolution() });
    map.beforeRender(pan, zoom);
    map.getView().setZoom(zoomLevel);
    mapView.setCenter(ol.proj.transform([lng, lat], srcEPSG, targetRPSG));
}
