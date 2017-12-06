webpackJsonp([0],{

/***/ 1394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WdcComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layers_layer_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mapping_mapping_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapping_geocoding_service__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__table_model__ = __webpack_require__(1398);





__webpack_require__(1399);
var WdcComponent = /** @class */ (function () {
    function WdcComponent(layerService, mapService, geocoder, router) {
        this.layerService = layerService;
        this.mapService = mapService;
        this.geocoder = geocoder;
        this.router = router;
        this.layers = [];
        var myConnector = tableau.makeConnector();
        myConnector.init = function (initCallback) {
            var version = tableau.platformVersion;
            var inx = version.lastIndexOf(".");
            var testVersion = Number(version.substring(0, inx));
            tableau.log(testVersion);
            if (testVersion < 10.4) {
                router.navigateByUrl('/wdc-legacy');
            }
            geocoder.getCurrentLocation()
                .subscribe(function (location) {
                myConnector.setConnection(location);
                initCallback();
                tableau.submit();
            }, function (err) { return tableau.log(err); });
        };
        myConnector.getSchema = function (schemaCallback) {
            var _this = this;
            tableau.log("Getting Schema");
            mapService.recordStats('getSchema', null, JSON.parse(tableau.connectionData))
                .subscribe(function (data) { return tableau.log(data); }, function (error) { return tableau.log(error); });
            layerService.getAllMeta()
                .subscribe(function (layers) {
                _this.layers = layers;
                var ret = [];
                removeLegacyMeta(layers, function (newLayers) {
                    for (var _i = 0, newLayers_1 = newLayers; _i < newLayers_1.length; _i++) {
                        var layer = newLayers_1[_i];
                        ret.push(new __WEBPACK_IMPORTED_MODULE_4__table_model__["a" /* Table */](layer._id, layer.tableSchema.alias, layer.tableSchema.columns));
                    }
                    //tableau.log(ret);
                    schemaCallback(ret);
                });
            });
        };
        myConnector.getData = function (table, doneCallback) {
            tableau.log("Getting table " + table.tableInfo.id);
            tableau.reportProgress("Requesting GeoJson");
            mapService.recordStats('getData', table.tableInfo.id, JSON.parse(tableau.connectionData))
                .subscribe(function (data) { return tableau.log(data); }, function (error) { return tableau.log(error); });
            layerService.getData({ id: table.tableInfo.id })
                .subscribe(function (geojson) {
                tableau.reportProgress("Parsing data");
                featureCol2PolygonArr(geojson, function (data) {
                    tableau.reportProgress("Returning data to Tableau");
                    table.appendRows(data);
                    doneCallback();
                });
            });
            // pageData(table, 1, table.tableInfo.id, function(table) {
            //   doneCallback();
            // });
        };
        myConnector.setConnection = function (userData) {
            tableau.connectionName = "TableauMapping.bi";
            tableau.connectionData = JSON.stringify(userData);
            tableau.submit();
        };
        tableau.registerConnector(myConnector);
        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }
        var removeLegacyMeta = function (metaArr, callback) {
            for (var i = 0; i < metaArr.length; i++) {
                var cols = metaArr[i].tableSchema.columns;
                cols.splice(findWithAttr(cols, 'id', 'latitude'), 1);
                cols.splice(findWithAttr(cols, 'id', 'longitude'), 1);
                cols.splice(findWithAttr(cols, 'id', 'polygonId'), 1);
                cols.splice(findWithAttr(cols, 'id', 'subPolygonId'), 1);
                cols.splice(findWithAttr(cols, 'id', 'path'), 1);
                tableau.log(cols);
                cols.push({
                    id: "geometry",
                    dataType: "geometry",
                    alias: "Geometry"
                });
                metaArr[i].tableSchema.columns = cols;
            }
            callback(metaArr);
        };
        var featureCol2PolygonArr = function (geojson, callback) {
            var features = geojson.features;
            var ret = [];
            for (var i = 0; i < features.length; i++) {
                var obj = features[i].properties;
                obj.geometry = features[i].geometry;
                ret.push(obj);
            }
            callback(ret);
        };
    }
    return WdcComponent;
}());



/***/ }),

/***/ 1396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WdcModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__(193);

var WdcModule = /** @class */ (function () {
    function WdcModule() {
    }
    return WdcModule;
}());



/***/ }),

/***/ 1397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_WdcComponent */
/* unused harmony export View_WdcComponent_0 */
/* unused harmony export View_WdcComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WdcComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_angular_material_card_typings_index_ngfactory__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material_card__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_icon_typings_index_ngfactory__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_icon__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wdc_component__ = __webpack_require__(1394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layers_layer_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mapping_mapping_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mapping_geocoding_service__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(71);
/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 










var styles_WdcComponent = [".demo-card-container[_ngcontent-%COMP%] {\n      display: flex;\n      flex-flow: column nowrap;\n      margin-top:30px;\n    }\n\n    .help-card[_ngcontent-%COMP%] {\n      margin: 0 100px 16px 100px;\n    }\n\n    .help-card-title[_ngcontent-%COMP%] {\n      font-size: 22px !important;\n    }"];
var RenderType_WdcComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_WdcComponent, data: {} });

function View_WdcComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](0, 0, null, null, 37, "div", [["class", "demo-card-container"], ["layout", "row"], ["layout-align", "center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](2, 0, null, null, 34, "mat-card", [["class", "help-card mat-card"]], null, null, null, __WEBPACK_IMPORTED_MODULE_1__node_modules_angular_material_card_typings_index_ngfactory__["d" /* View_MatCard_0 */], __WEBPACK_IMPORTED_MODULE_1__node_modules_angular_material_card_typings_index_ngfactory__["a" /* RenderType_MatCard */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](3, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_material_card__["a" /* MatCard */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](5, 0, null, 0, 11, "mat-card-header", [["class", "mat-card-header"]], null, null, null, __WEBPACK_IMPORTED_MODULE_1__node_modules_angular_material_card_typings_index_ngfactory__["c" /* View_MatCardHeader_0 */], __WEBPACK_IMPORTED_MODULE_1__node_modules_angular_material_card_typings_index_ngfactory__["b" /* RenderType_MatCardHeader */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](6, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_material_card__["d" /* MatCardHeader */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](8, 0, null, 0, 3, "mat-icon", [["class", "mat-card-avatar mat-icon"], ["mat-card-avatar", ""], ["role", "img"]], null, null, null, __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_icon_typings_index_ngfactory__["b" /* View_MatIcon_0 */], __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_icon_typings_index_ngfactory__["a" /* RenderType_MatIcon */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](9, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_material_card__["b" /* MatCardAvatar */], [], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](10, 638976, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_icon__["b" /* MatIcon */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_material_icon__["d" /* MatIconRegistry */], [8, null]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 0, ["cloud_download"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](13, 0, null, 1, 2, "mat-card-title", [["class", "help-card-title mat-card-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](14, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_material_card__["f" /* MatCardTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["Connecting with Web Data Connector"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](18, 0, null, 0, 17, "mat-card-content", [["class", "mat-card-content"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_material_card__["c" /* MatCardContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](21, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["If you're seeing this message you need to access the URL using Tableau's Web Data Connector."])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](24, 0, null, null, 4, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["Copy the URL from your web browser "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](26, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["https://www.tableaumapping.bi/wdc"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, [", open Tableau Desktop, in the connections list select 'Web Data Connector' and paste the URL into the connector. Then it's just like a regular Tableau data source."])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](30, 0, null, null, 4, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["You'll need Tableau 10.4 or newer. If you have 10.1, 10.2 or 10.3 you can use our legacy connector "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](32, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["https://www.tableaumapping.bi/wdc-legacy"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, [" (give it a second, you should be auto forwarded)"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { _ck(_v, 10, 0); }, null); }
function View_WdcComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵeld"](0, 0, null, null, 1, "wdc", [], null, null, null, View_WdcComponent_0, RenderType_WdcComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_5__wdc_component__["a" /* WdcComponent */], [__WEBPACK_IMPORTED_MODULE_6__layers_layer_service__["a" /* LayerService */], __WEBPACK_IMPORTED_MODULE_7__mapping_mapping_service__["a" /* MapService */], __WEBPACK_IMPORTED_MODULE_8__mapping_geocoding_service__["a" /* GeocodingService */], __WEBPACK_IMPORTED_MODULE_9__angular_router__["k" /* Router */]], null, null)], null, null); }
var WdcComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵccf"]("wdc", __WEBPACK_IMPORTED_MODULE_5__wdc_component__["a" /* WdcComponent */], View_WdcComponent_Host_0, {}, {}, []);



/***/ }),

/***/ 1398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Table; });
var Table = /** @class */ (function () {
    function Table(id, alias, columns) {
        this.id = id;
        this.alias = alias;
        this.columns = columns;
    }
    return Table;
}());



/***/ }),

/***/ 1399:
/***/ (function(module, exports) {

/*! Build Number: 2.3.0 */
!function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){var o=i(20);o.init()},function(t,e,i){function o(){var t=c.get(s);return t}function n(t){var e=t.join(l);console.log("Saving approved origins '"+e+"'");var i=c.set(s,e);return i}function a(t){if(t){var e=r();e.push(t),n(e)}}function r(){var t=o();if(!t||0===t.length)return[];var e=t.split(l);return e}var s="wdc_approved_origins",l=",",c=i(9);t.exports.addApprovedOrigin=a,t.exports.getApprovedOrigins=r},function(t,e){function i(t){for(var e in o)t[e]=o[e]}var o={phaseEnum:{interactivePhase:"interactive",authPhase:"auth",gatherDataPhase:"gatherData"},authPurposeEnum:{ephemeral:"ephemeral",enduring:"enduring"},authTypeEnum:{none:"none",basic:"basic",custom:"custom"},dataTypeEnum:{bool:"bool",date:"date",datetime:"datetime",float:"float",int:"int",string:"string",geometry:"geometry"},columnRoleEnum:{dimension:"dimension",measure:"measure"},columnTypeEnum:{continuous:"continuous",discrete:"discrete"},aggTypeEnum:{sum:"sum",avg:"avg",median:"median",count:"count",countd:"count_dist"},geographicRoleEnum:{area_code:"area_code",cbsa_msa:"cbsa_msa",city:"city",congressional_district:"congressional_district",country_region:"country_region",county:"county",state_province:"state_province",zip_code_postcode:"zip_code_postcode",latitude:"latitude",longitude:"longitude"},unitsFormatEnum:{thousands:"thousands",millions:"millions",billions_english:"billions_english",billions_standard:"billions_standard"},numberFormatEnum:{number:"number",currency:"currency",scientific:"scientific",percentage:"percentage"},localeEnum:{america:"en-us",brazil:"pt-br",china:"zh-cn",france:"fr-fr",germany:"de-de",japan:"ja-jp",korea:"ko-kr",spain:"es-es"},joinEnum:{inner:"inner",left:"left"}};t.exports.apply=i},function(t,e){function i(t){this.nativeApiRootObj=t,this._initPublicInterface(),this._initPrivateInterface()}i.prototype._initPublicInterface=function(){console.log("Initializing public interface for NativeDispatcher"),this._submitCalled=!1;var t={};t.abortForAuth=this._abortForAuth.bind(this),t.abortWithError=this._abortWithError.bind(this),t.addCrossOriginException=this._addCrossOriginException.bind(this),t.log=this._log.bind(this),t.submit=this._submit.bind(this),t.reportProgress=this._reportProgress.bind(this),this.publicInterface=t},i.prototype._abortForAuth=function(t){this.nativeApiRootObj.WDCBridge_Api_abortForAuth.api(t)},i.prototype._abortWithError=function(t){this.nativeApiRootObj.WDCBridge_Api_abortWithError.api(t)},i.prototype._addCrossOriginException=function(t){this.nativeApiRootObj.WDCBridge_Api_addCrossOriginException.api(t)},i.prototype._log=function(t){this.nativeApiRootObj.WDCBridge_Api_log.api(t)},i.prototype._submit=function(){return this._submitCalled?void console.log("submit called more than once"):(this._submitCalled=!0,void this.nativeApiRootObj.WDCBridge_Api_submit.api())},i.prototype._initPrivateInterface=function(){console.log("Initializing private interface for NativeDispatcher"),this._initCallbackCalled=!1,this._shutdownCallbackCalled=!1;var t={};t._initCallback=this._initCallback.bind(this),t._shutdownCallback=this._shutdownCallback.bind(this),t._schemaCallback=this._schemaCallback.bind(this),t._tableDataCallback=this._tableDataCallback.bind(this),t._dataDoneCallback=this._dataDoneCallback.bind(this),this.privateInterface=t},i.prototype._initCallback=function(){return this._initCallbackCalled?void console.log("initCallback called more than once"):(this._initCallbackCalled=!0,void this.nativeApiRootObj.WDCBridge_Api_initCallback.api())},i.prototype._shutdownCallback=function(){return this._shutdownCallbackCalled?void console.log("shutdownCallback called more than once"):(this._shutdownCallbackCalled=!0,void this.nativeApiRootObj.WDCBridge_Api_shutdownCallback.api())},i.prototype._schemaCallback=function(t,e){this.nativeApiRootObj.WDCBridge_Api_schemaCallbackEx?this.nativeApiRootObj.WDCBridge_Api_schemaCallbackEx.api(t,e||[]):this.nativeApiRootObj.WDCBridge_Api_schemaCallback.api(t)},i.prototype._tableDataCallback=function(t,e){this.nativeApiRootObj.WDCBridge_Api_tableDataCallback.api(t,e)},i.prototype._reportProgress=function(t){this.nativeApiRootObj.WDCBridge_Api_reportProgress?this.nativeApiRootObj.WDCBridge_Api_reportProgress.api(t):console.log("reportProgress not available from this Tableau version")},i.prototype._dataDoneCallback=function(){this.nativeApiRootObj.WDCBridge_Api_dataDoneCallback.api()},t.exports=i},function(t,e,i){function o(t,e,i){this.privateApiObj=e,this.globalObj=i,this._hasAlreadyThrownErrorSoDontThrowAgain=!1,this.changeTableauApiObj(t)}var n=i(6),a=i(2);o.prototype.init=function(){console.log("Initializing shared WDC"),this.globalObj.onerror=this._errorHandler.bind(this),this._initTriggerFunctions(),this._initDeprecatedFunctions()},o.prototype.changeTableauApiObj=function(t){this.tableauApiObj=t,this.tableauApiObj.makeConnector=this._makeConnector.bind(this),this.tableauApiObj.registerConnector=this._registerConnector.bind(this),a.apply(this.tableauApiObj)},o.prototype._errorHandler=function(t,e,i,o,n){if(console.error(n),this._hasAlreadyThrownErrorSoDontThrowAgain)return!0;var a=t;if(n?a+="   stack:"+n.stack:(a+="   file: "+e,a+="   line: "+i),!this.tableauApiObj||!this.tableauApiObj.abortWithError)throw a;return this.tableauApiObj.abortWithError(a),this._hasAlreadyThrownErrorSoDontThrowAgain=!0,!0},o.prototype._makeConnector=function(){var t={init:function(t){t()},shutdown:function(t){t()}};return t},o.prototype._registerConnector=function(t){for(var e=["init","shutdown","getSchema","getData"],i=e.length-1;i>=0;i--)if("function"!=typeof t[e[i]])throw"The connector did not define the required function: "+e[i];console.log("Connector registered"),this.globalObj._wdc=t,this._wdc=t},o.prototype._initTriggerFunctions=function(){this.privateApiObj.triggerInitialization=this._triggerInitialization.bind(this),this.privateApiObj.triggerSchemaGathering=this._triggerSchemaGathering.bind(this),this.privateApiObj.triggerDataGathering=this._triggerDataGathering.bind(this),this.privateApiObj.triggerShutdown=this._triggerShutdown.bind(this)},o.prototype._triggerInitialization=function(){this._wdc.init(this.privateApiObj._initCallback)},o.prototype._triggerSchemaGathering=function(){this._wdc.getSchema(this.privateApiObj._schemaCallback)},o.prototype._triggerDataGathering=function(t){if(1!=t.length)throw"Unexpected number of tables specified. Expected 1, actual "+t.length.toString();var e=t[0],i=!!e.filterColumnId,o=new n(e.tableInfo,e.incrementValue,i,e.filterColumnId||"",e.filterValues||[],this.privateApiObj._tableDataCallback);this._wdc.getData(o,this.privateApiObj._dataDoneCallback)},o.prototype._triggerShutdown=function(){this._wdc.shutdown(this.privateApiObj._shutdownCallback)},o.prototype._initDeprecatedFunctions=function(){this.tableauApiObj.initCallback=this._initCallback.bind(this),this.tableauApiObj.headersCallback=this._headersCallback.bind(this),this.tableauApiObj.dataCallback=this._dataCallback.bind(this),this.tableauApiObj.shutdownCallback=this._shutdownCallback.bind(this)},o.prototype._initCallback=function(){this.tableauApiObj.abortWithError("tableau.initCallback has been deprecated in version 2.0.0. Please use the callback function passed to init")},o.prototype._headersCallback=function(t,e){this.tableauApiObj.abortWithError("tableau.headersCallback has been deprecated in version 2.0.0")},o.prototype._dataCallback=function(t,e,i){this.tableauApiObj.abortWithError("tableau.dataCallback has been deprecated in version 2.0.0")},o.prototype._shutdownCallback=function(){this.tableauApiObj.abortWithError("tableau.shutdownCallback has been deprecated in version 2.0.0. Please use the callback function passed to shutdown")},t.exports=o},function(t,e,i){function o(t){this.globalObj=t,this._initMessageHandling(),this._initPublicInterface(),this._initPrivateInterface()}var n=i(1);i(8),o.prototype._initMessageHandling=function(){console.log("Initializing message handling"),this.globalObj.addEventListener("message",this._receiveMessage.bind(this),!1),this.globalObj.document.addEventListener("DOMContentLoaded",this._onDomContentLoaded.bind(this))},o.prototype._onDomContentLoaded=function(){if(this.globalObj.parent!==window&&this.globalObj.parent.postMessage(this._buildMessagePayload("loaded"),"*"),this.globalObj.opener)try{this.globalObj.opener.postMessage(this._buildMessagePayload("loaded"),"*")}catch(t){console.warn("Some versions of IE may not accurately simulate the Web Data Connector. Please retry on a Webkit based browser")}},o.prototype._packagePropertyValues=function(){var t={connectionName:this.globalObj.tableau.connectionName,connectionData:this.globalObj.tableau.connectionData,password:this.globalObj.tableau.password,username:this.globalObj.tableau.username,usernameAlias:this.globalObj.tableau.usernameAlias,incrementalExtractColumn:this.globalObj.tableau.incrementalExtractColumn,versionNumber:this.globalObj.tableau.versionNumber,locale:this.globalObj.tableau.locale,authPurpose:this.globalObj.tableau.authPurpose,platformOS:this.globalObj.tableau.platformOS,platformVersion:this.globalObj.tableau.platformVersion,platformEdition:this.globalObj.tableau.platformEdition,platformBuildNumber:this.globalObj.tableau.platformBuildNumber};return t},o.prototype._applyPropertyValues=function(t){t&&(this.globalObj.tableau.connectionName=t.connectionName,this.globalObj.tableau.connectionData=t.connectionData,this.globalObj.tableau.password=t.password,this.globalObj.tableau.username=t.username,this.globalObj.tableau.usernameAlias=t.usernameAlias,this.globalObj.tableau.incrementalExtractColumn=t.incrementalExtractColumn,this.globalObj.tableau.locale=t.locale,this.globalObj.tableau.language=t.locale,this.globalObj.tableau.authPurpose=t.authPurpose,this.globalObj.tableau.platformOS=t.platformOS,this.globalObj.tableau.platformVersion=t.platformVersion,this.globalObj.tableau.platformEdition=t.platformEdition,this.globalObj.tableau.platformBuildNumber=t.platformBuildNumber)},o.prototype._buildMessagePayload=function(t,e,i){var o={msgName:t,msgData:e,props:i,version:"2.3.0"};return JSON.stringify(o)},o.prototype._sendMessage=function(t,e){var i=this._buildMessagePayload(t,e,this._packagePropertyValues());if("undefined"!=typeof this.globalObj.webkit&&"undefined"!=typeof this.globalObj.webkit.messageHandlers&&"undefined"!=typeof this.globalObj.webkit.messageHandlers.wdcHandler)this.globalObj.webkit.messageHandlers.wdcHandler.postMessage(i);else{if(!this._sourceWindow)throw"Looks like the WDC is calling a tableau function before tableau.init() has been called.";this._sourceWindow.postMessage(i,this._sourceOrigin)}},o.prototype._getPayloadObj=function(t){var e=null;try{e=JSON.parse(t)}catch(t){return null}return e},o.prototype._getWebSecurityWarningConfirm=function(){var t=this._sourceOrigin,e=i(18),o=new e(t),a=o.host(),r=["localhost","tableau.github.io"];if(r.indexOf(a)>=0)return!0;if(a&&a.endsWith("online.tableau.com"))return!0;var s=n.getApprovedOrigins();if(s.indexOf(t)>=0)return console.log("Already approved the origin'"+t+"', not asking again"),!0;var l=this._getLocalizedString("webSecurityWarning"),c=l+"\n\n"+a+"\n",u=confirm(c);return u&&n.addApprovedOrigin(t),u},o.prototype._getCurrentLocale=function(){var t=navigator.language||navigator.userLanguage,e=t?t.substring(0,2):"en",i=["de","en","es","fr","ja","ko","pt","zh"];return i.indexOf(e)<0&&(e="en"),e},o.prototype._getLocalizedString=function(t){var e=this._getCurrentLocale(),o=i(10),n=i(11),a=i(12),r=i(14),s=i(13),l=i(15),c=i(16),u=i(17),h={de:o,en:n,es:a,fr:s,ja:r,ko:l,pt:c,zh:u},p=h[e];return p[t]},o.prototype._receiveMessage=function(t){console.log("Received message!");var e=this.globalObj._wdc;if(!e)throw"No WDC registered. Did you forget to call tableau.registerConnector?";var i=this._getPayloadObj(t.data);if(i){this._sourceWindow||(this._sourceWindow=t.source,this._sourceOrigin=t.origin);var o=i.msgData;switch(this._applyPropertyValues(i.props),i.msgName){case"init":var n=this._getWebSecurityWarningConfirm();n?(this.globalObj.tableau.phase=o.phase,this.globalObj._tableau.triggerInitialization()):window.close();break;case"shutdown":this.globalObj._tableau.triggerShutdown();break;case"getSchema":this.globalObj._tableau.triggerSchemaGathering();break;case"getData":this.globalObj._tableau.triggerDataGathering(o.tablesAndIncrementValues)}}},o.prototype._initPublicInterface=function(){console.log("Initializing public interface"),this._submitCalled=!1;var t={};t.abortForAuth=this._abortForAuth.bind(this),t.abortWithError=this._abortWithError.bind(this),t.addCrossOriginException=this._addCrossOriginException.bind(this),t.log=this._log.bind(this),t.reportProgress=this._reportProgress.bind(this),t.submit=this._submit.bind(this),this.publicInterface=t},o.prototype._abortForAuth=function(t){this._sendMessage("abortForAuth",{msg:t})},o.prototype._abortWithError=function(t){this._sendMessage("abortWithError",{errorMsg:t})},o.prototype._addCrossOriginException=function(t){console.log("Cross Origin Exception requested in the simulator. Pretending to work."),setTimeout(function(){this.globalObj._wdc.addCrossOriginExceptionCompleted(t)}.bind(this),0)},o.prototype._log=function(t){this._sendMessage("log",{logMsg:t})},o.prototype._reportProgress=function(t){this._sendMessage("reportProgress",{progressMsg:t})},o.prototype._submit=function(){this._sendMessage("submit")},o.prototype._initPrivateInterface=function(){console.log("Initializing private interface");var t={};t._initCallback=this._initCallback.bind(this),t._shutdownCallback=this._shutdownCallback.bind(this),t._schemaCallback=this._schemaCallback.bind(this),t._tableDataCallback=this._tableDataCallback.bind(this),t._dataDoneCallback=this._dataDoneCallback.bind(this),this.privateInterface=t},o.prototype._initCallback=function(){this._sendMessage("initCallback")},o.prototype._shutdownCallback=function(){this._sendMessage("shutdownCallback")},o.prototype._schemaCallback=function(t,e){this._sendMessage("_schemaCallback",{schema:t,standardConnections:e||[]})},o.prototype._tableDataCallback=function(t,e){this._sendMessage("_tableDataCallback",{tableName:t,data:e})},o.prototype._dataDoneCallback=function(){this._sendMessage("_dataDoneCallback")},t.exports=o},function(t,e){function i(t,e,i,o,n,a){this.tableInfo=t,this.incrementValue=e||"",this.isJoinFiltered=i,this.filterColumnId=o,this.filterValues=n,this._dataCallbackFn=a,this.appendRows=this._appendRows.bind(this)}i.prototype._appendRows=function(t){return t?Array.isArray(t)?void this._dataCallbackFn(this.tableInfo.id,t):void console.warn("Table.appendRows must take an array of arrays or array of objects"):void console.warn("rows data is null or undefined")},t.exports=i},function(t,e){function i(t,e){for(var i in t)"function"==typeof t[i]&&(e[i]=t[i])}t.exports.copyFunctions=i},function(t,e){/*! http://mths.be/endswith v0.2.0 by @mathias */
String.prototype.endsWith||!function(){"use strict";var t=function(){try{var t={},e=Object.defineProperty,i=e(t,t,t)&&e}catch(t){}return i}(),e={}.toString,i=function(t){if(null==this)throw TypeError();var i=String(this);if(t&&"[object RegExp]"==e.call(t))throw TypeError();var o=i.length,n=String(t),a=n.length,r=o;if(arguments.length>1){var s=arguments[1];void 0!==s&&(r=s?Number(s):0,r!=r&&(r=0))}var l=Math.min(Math.max(r,0),o),c=l-a;if(c<0)return!1;for(var u=-1;++u<a;)if(i.charCodeAt(c+u)!=n.charCodeAt(u))return!1;return!0};t?t(String.prototype,"endsWith",{value:i,configurable:!0,writable:!0}):String.prototype.endsWith=i}()},function(t,e,i){var o;!function(n,a){"use strict";var r=function(t){if("object"!=typeof t.document)throw new Error("Cookies.js requires a `window` with a `document` object");var e=function(t,i,o){return 1===arguments.length?e.get(t):e.set(t,i,o)};return e._document=t.document,e._cacheKeyPrefix="cookey.",e._maxExpireDate=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),e.defaults={path:"/",secure:!1},e.get=function(t){e._cachedDocumentCookie!==e._document.cookie&&e._renewCache();var i=e._cache[e._cacheKeyPrefix+t];return i===a?a:decodeURIComponent(i)},e.set=function(t,i,o){return o=e._getExtendedOptions(o),o.expires=e._getExpiresDate(i===a?-1:o.expires),e._document.cookie=e._generateCookieString(t,i,o),e},e.expire=function(t,i){return e.set(t,a,i)},e._getExtendedOptions=function(t){return{path:t&&t.path||e.defaults.path,domain:t&&t.domain||e.defaults.domain,expires:t&&t.expires||e.defaults.expires,secure:t&&t.secure!==a?t.secure:e.defaults.secure}},e._isValidDate=function(t){return"[object Date]"===Object.prototype.toString.call(t)&&!isNaN(t.getTime())},e._getExpiresDate=function(t,i){if(i=i||new Date,"number"==typeof t?t=t===1/0?e._maxExpireDate:new Date(i.getTime()+1e3*t):"string"==typeof t&&(t=new Date(t)),t&&!e._isValidDate(t))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return t},e._generateCookieString=function(t,e,i){t=t.replace(/[^#$&+\^`|]/g,encodeURIComponent),t=t.replace(/\(/g,"%28").replace(/\)/g,"%29"),e=(e+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent),i=i||{};var o=t+"="+e;return o+=i.path?";path="+i.path:"",o+=i.domain?";domain="+i.domain:"",o+=i.expires?";expires="+i.expires.toUTCString():"",o+=i.secure?";secure":""},e._getCacheFromString=function(t){for(var i={},o=t?t.split("; "):[],n=0;n<o.length;n++){var r=e._getKeyValuePairFromCookieString(o[n]);i[e._cacheKeyPrefix+r.key]===a&&(i[e._cacheKeyPrefix+r.key]=r.value)}return i},e._getKeyValuePairFromCookieString=function(t){var e=t.indexOf("=");e=e<0?t.length:e;var i,o=t.substr(0,e);try{i=decodeURIComponent(o)}catch(t){console&&"function"==typeof console.error&&console.error('Could not decode cookie with key "'+o+'"',t)}return{key:i,value:t.substr(e+1)}},e._renewCache=function(){e._cache=e._getCacheFromString(e._document.cookie),e._cachedDocumentCookie=e._document.cookie},e._areEnabled=function(){var t="cookies.js",i="1"===e.set(t,1).get(t);return e.expire(t),i},e.enabled=e._areEnabled(),e},s=n&&"object"==typeof n.document?r(n):r;o=function(){return s}.call(e,i,e,t),!(o!==a&&(t.exports=o))}("undefined"==typeof window?this:window)},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"To help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e){t.exports={webSecurityWarning:"wwTo help prevent malicious sites from getting access to your confidential data, confirm that you trust the following site:"}},function(t,e,i){var o;/*!
	 * jsUri
	 * https://github.com/derek-watson/jsUri
	 *
	 * Copyright 2013, Derek Watson
	 * Released under the MIT license.
	 *
	 * Includes parseUri regular expressions
	 * http://blog.stevenlevithan.com/archives/parseuri
	 * Copyright 2007, Steven Levithan
	 * Released under the MIT license.
	 */
!function(n){function a(t){return t&&(t=t.toString().replace(c.pluses,"%20"),t=decodeURIComponent(t)),t}function r(t){var e=c.uri_parser,i=["source","protocol","authority","userInfo","user","password","host","port","isColonUri","relative","path","directory","file","query","anchor"],o=e.exec(t||""),n={};return i.forEach(function(t,e){n[t]=o[e]||""}),n}function s(t){var e,i,o,n,r,s,l,u=[];if("undefined"==typeof t||null===t||""===t)return u;for(0===t.indexOf("?")&&(t=t.substring(1)),i=t.toString().split(c.query_separator),e=0,l=i.length;e<l;e++)o=i[e],n=o.indexOf("="),0!==n&&(r=a(o.substring(0,n)),s=a(o.substring(n+1)),u.push(n===-1?[o,null]:[r,s]));return u}function l(t){this.uriParts=r(t),this.queryPairs=s(this.uriParts.query),this.hasAuthorityPrefixUserPref=null}var c={starts_with_slashes:/^\/+/,ends_with_slashes:/\/+$/,pluses:/\+/g,query_separator:/[&;]/,uri_parser:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/};Array.prototype.forEach||(Array.prototype.forEach=function(t,e){var i,o;if(null==this)throw new TypeError(" this is null or not defined");var n=Object(this),a=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(i=e),o=0;o<a;){var r;o in n&&(r=n[o],t.call(i,r,o,n)),o++}}),["protocol","userInfo","host","port","path","anchor"].forEach(function(t){l.prototype[t]=function(e){return"undefined"!=typeof e&&(this.uriParts[t]=e),this.uriParts[t]}}),l.prototype.hasAuthorityPrefix=function(t){return"undefined"!=typeof t&&(this.hasAuthorityPrefixUserPref=t),null===this.hasAuthorityPrefixUserPref?this.uriParts.source.indexOf("//")!==-1:this.hasAuthorityPrefixUserPref},l.prototype.isColonUri=function(t){return"undefined"==typeof t?!!this.uriParts.isColonUri:void(this.uriParts.isColonUri=!!t)},l.prototype.query=function(t){var e,i,o,n="";for("undefined"!=typeof t&&(this.queryPairs=s(t)),e=0,o=this.queryPairs.length;e<o;e++)i=this.queryPairs[e],n.length>0&&(n+="&"),null===i[1]?n+=i[0]:(n+=i[0],n+="=","undefined"!=typeof i[1]&&(n+=encodeURIComponent(i[1])));return n.length>0?"?"+n:n},l.prototype.getQueryParamValue=function(t){var e,i,o;for(i=0,o=this.queryPairs.length;i<o;i++)if(e=this.queryPairs[i],t===e[0])return e[1]},l.prototype.getQueryParamValues=function(t){var e,i,o,n=[];for(e=0,o=this.queryPairs.length;e<o;e++)i=this.queryPairs[e],t===i[0]&&n.push(i[1]);return n},l.prototype.deleteQueryParam=function(t,e){var i,o,n,r,s,l=[];for(i=0,s=this.queryPairs.length;i<s;i++)o=this.queryPairs[i],n=a(o[0])===a(t),r=o[1]===e,(1!==arguments.length||n)&&(2!==arguments.length||n&&r)||l.push(o);return this.queryPairs=l,this},l.prototype.addQueryParam=function(t,e,i){return 3===arguments.length&&i!==-1?(i=Math.min(i,this.queryPairs.length),this.queryPairs.splice(i,0,[t,e])):arguments.length>0&&this.queryPairs.push([t,e]),this},l.prototype.hasQueryParam=function(t){var e,i=this.queryPairs.length;for(e=0;e<i;e++)if(this.queryPairs[e][0]==t)return!0;return!1},l.prototype.replaceQueryParam=function(t,e,i){var o,n,r=-1,s=this.queryPairs.length;if(3===arguments.length){for(o=0;o<s;o++)if(n=this.queryPairs[o],a(n[0])===a(t)&&decodeURIComponent(n[1])===a(i)){r=o;break}r>=0&&this.deleteQueryParam(t,a(i)).addQueryParam(t,e,r)}else{for(o=0;o<s;o++)if(n=this.queryPairs[o],a(n[0])===a(t)){r=o;break}this.deleteQueryParam(t),this.addQueryParam(t,e,r)}return this},["protocol","hasAuthorityPrefix","isColonUri","userInfo","host","port","path","query","anchor"].forEach(function(t){var e="set"+t.charAt(0).toUpperCase()+t.slice(1);l.prototype[e]=function(e){return this[t](e),this}}),l.prototype.scheme=function(){var t="";return this.protocol()?(t+=this.protocol(),this.protocol().indexOf(":")!==this.protocol().length-1&&(t+=":"),t+="//"):this.hasAuthorityPrefix()&&this.host()&&(t+="//"),t},l.prototype.origin=function(){var t=this.scheme();return this.userInfo()&&this.host()&&(t+=this.userInfo(),this.userInfo().indexOf("@")!==this.userInfo().length-1&&(t+="@")),this.host()&&(t+=this.host(),(this.port()||this.path()&&this.path().substr(0,1).match(/[0-9]/))&&(t+=":"+this.port())),t},l.prototype.addTrailingSlash=function(){var t=this.path()||"";return"/"!==t.substr(-1)&&this.path(t+"/"),this},l.prototype.toString=function(){var t,e=this.origin();return this.isColonUri()?this.path()&&(e+=":"+this.path()):this.path()?(t=this.path(),c.ends_with_slashes.test(e)||c.starts_with_slashes.test(t)?(e&&e.replace(c.ends_with_slashes,"/"),t=t.replace(c.starts_with_slashes,"/")):e+="/",e+=t):this.host()&&(this.query().toString()||this.anchor())&&(e+="/"),this.query().toString()&&(e+=this.query().toString()),this.anchor()&&(0!==this.anchor().indexOf("#")&&(e+="#"),e+=this.anchor()),e},l.prototype.clone=function(){return new l(this.toString())},o=function(){return l}.call(e,i,e,t),!(void 0!==o&&(t.exports=o))}(this)},function(t,e,i){"use strict";function o(t,e,i){function a(t,e){var o=t[0],a=t[1];c[o]={connect:function(t){return"function"!=typeof t?void console.error("Bad callback given to connect to signal "+o):(c.__objectSignals__[a]=c.__objectSignals__[a]||[],c.__objectSignals__[a].push(t),void(e||"destroyed"===o||i.exec({type:n.connectToSignal,object:c.__id__,signal:a})))},disconnect:function(t){if("function"!=typeof t)return void console.error("Bad callback given to disconnect from signal "+o);c.__objectSignals__[a]=c.__objectSignals__[a]||[];var r=c.__objectSignals__[a].indexOf(t);return r===-1?void console.error("Cannot find connection of signal "+o+" to "+t.name):(c.__objectSignals__[a].splice(r,1),void(e||0!==c.__objectSignals__[a].length||i.exec({type:n.disconnectFromSignal,object:c.__id__,signal:a})))}}}function r(t,e){var i=c.__objectSignals__[t];i&&i.forEach(function(t){t.apply(t,e)})}function s(t){var e=t[0],o=t[1];c[e]=function(){for(var t,e=[],a=0;a<arguments.length;++a)"function"==typeof arguments[a]?t=arguments[a]:e.push(arguments[a]);i.exec({type:n.invokeMethod,object:c.__id__,method:o,args:e},function(e){if(void 0!==e){var i=c.unwrapQObject(e);t&&t(i)}})}}function l(t){var e=t[0],o=t[1],r=t[2];c.__propertyCache__[e]=t[3],r&&(1===r[0]&&(r[0]=o+"Changed"),a(r,!0)),Object.defineProperty(c,o,{get:function(){var t=c.__propertyCache__[e];return void 0===t&&console.warn('Undefined value in property cache for property "'+o+'" in object '+c.__id__),t},set:function(t){return void 0===t?void console.warn("Property setter for "+o+" called with undefined value!"):(c.__propertyCache__[e]=t,void i.exec({type:n.setProperty,object:c.__id__,property:e,value:t}))}})}this.__id__=t,i.objects[t]=this,this.__objectSignals__={},this.__propertyCache__={};var c=this;this.unwrapQObject=function(t){if(t instanceof Array){for(var e=new Array(t.length),n=0;n<t.length;++n)e[n]=c.unwrapQObject(t[n]);return e}if(!t||!t["__QObject*__"]||void 0===t.id)return t;var a=t.id;if(i.objects[a])return i.objects[a];if(!t.data)return void console.error("Cannot unwrap unknown QObject "+a+" without data.");var r=new o(a,t.data,i);return r.destroyed.connect(function(){if(i.objects[a]===r){delete i.objects[a];var t=[];for(var e in r)t.push(e);for(var o in t)delete r[t[o]]}}),r.unwrapProperties(),r},this.unwrapProperties=function(){for(var t in c.__propertyCache__)c.__propertyCache__[t]=c.unwrapQObject(c.__propertyCache__[t])},this.propertyUpdate=function(t,e){for(var i in e){var o=e[i];c.__propertyCache__[i]=o}for(var n in t)r(n,t[n])},this.signalEmitted=function(t,e){r(t,e)},e.methods.forEach(s),e.properties.forEach(l),e.signals.forEach(function(t){a(t,!1)});for(var t in e.enums)c[t]=e.enums[t]}var n={signal:1,propertyUpdate:2,init:3,idle:4,debug:5,invokeMethod:6,connectToSignal:7,disconnectFromSignal:8,setProperty:9,response:10},a=function(t,e){if("object"!=typeof t||"function"!=typeof t.send)return void console.error("The QWebChannel expects a transport object with a send function and onmessage callback property. Given is: transport: "+typeof t+", transport.send: "+typeof t.send);var i=this;this.transport=t,this.send=function(t){"string"!=typeof t&&(t=JSON.stringify(t)),i.transport.send(t)},this.transport.onmessage=function(t){var e=t.data;switch("string"==typeof e&&(e=JSON.parse(e)),e.type){case n.signal:i.handleSignal(e);break;case n.response:i.handleResponse(e);break;case n.propertyUpdate:i.handlePropertyUpdate(e);break;default:console.error("invalid message received:",t.data)}},this.execCallbacks={},this.execId=0,this.exec=function(t,e){return e?(i.execId===Number.MAX_VALUE&&(i.execId=Number.MIN_VALUE),t.hasOwnProperty("id")?void console.error("Cannot exec message with property id: "+JSON.stringify(t)):(t.id=i.execId++,i.execCallbacks[t.id]=e,void i.send(t))):void i.send(t)},this.objects={},this.handleSignal=function(t){var e=i.objects[t.object];e?e.signalEmitted(t.signal,t.args):console.warn("Unhandled signal: "+t.object+"::"+t.signal)},this.handleResponse=function(t){return t.hasOwnProperty("id")?(i.execCallbacks[t.id](t.data),void delete i.execCallbacks[t.id]):void console.error("Invalid response message received: ",JSON.stringify(t))},this.handlePropertyUpdate=function(t){for(var e in t.data){var o=t.data[e],a=i.objects[o.object];a?a.propertyUpdate(o.signals,o.properties):console.warn("Unhandled property update: "+o.object+"::"+o.signal)}i.exec({type:n.idle})},this.debug=function(t){i.send({type:n.debug,data:t})},i.exec({type:n.init},function(t){for(var a in t)var r=new o(a,t[a],i);for(var a in i.objects)i.objects[a].unwrapProperties();e&&e(i),i.exec({type:n.idle})})};t.exports={QWebChannel:a}},function(t,e,i){"use strict";function o(t,e){n.copyFunctions(t.publicInterface,window.tableau),n.copyFunctions(t.privateInterface,window._tableau),e.init()}var n=i(7),a=i(4),r=i(3),s=i(5),l=i(19);t.exports.init=function(){var t=null,e=null;window._tableau={},window.tableauVersionBootstrap?(console.log("Initializing NativeDispatcher, Reporting version number"),window.tableauVersionBootstrap.ReportVersionNumber("2.3.0"),t=new r(window)):window.qt&&window.qt.webChannelTransport?(console.log("Initializing NativeDispatcher for qwebchannel"),window.tableau={},window.channel=new l.QWebChannel(qt.webChannelTransport,function(i){console.log("QWebChannel created successfully"),window._tableau._nativeSetupCompleted=function(){t=new r(i.objects),window.tableau=i.objects.tableau,e.changeTableauApiObj(window.tableau),o(t,e)},i.objects.tableauVersionBootstrap.ReportVersionNumber("2.3.0")})):(console.log("Version Bootstrap is not defined, Initializing SimulatorDispatcher"),window.tableau={},t=new s(window)),e=new a(window.tableau,window._tableau,window),t&&o(t,e)}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1pbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9idW5kbGUubWluLmpzIl0sIm1hcHBpbmdzIjoiO0FBQ0E7QUEwM0JBOzs7Ozs7Ozs7Ozs7QUFpVUEiLCJzb3VyY2VSb290IjoiIn0=

/***/ }),

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WdcModuleNgFactory", function() { return WdcModuleNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wdc_module__ = __webpack_require__(1396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wdc_component_ngfactory__ = __webpack_require__(1397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material_icon__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_card__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__wdc_component__ = __webpack_require__(1394);
/**
* @fileoverview This file is generated by the Angular template compiler.
* Do not edit.
* @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
* tslint:disable
*/ 












var WdcModuleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcmf"](__WEBPACK_IMPORTED_MODULE_1__wdc_module__["a" /* WdcModule */], [], function (_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmod"]([__WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵCodegenComponentFactoryResolver"], [[8, [__WEBPACK_IMPORTED_MODULE_2__wdc_component_ngfactory__["a" /* WdcComponentNgFactory */]]], [3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_3__angular_common__["NgLocalization"], __WEBPACK_IMPORTED_MODULE_3__angular_common__["NgLocaleLocalization"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], [2, __WEBPACK_IMPORTED_MODULE_3__angular_common__["ɵa"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__["b" /* DIR_DOCUMENT */], null, [__WEBPACK_IMPORTED_MODULE_3__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__["c" /* Directionality */], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__["c" /* Directionality */], [[2, __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__["b" /* DIR_DOCUMENT */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_5__angular_material_icon__["d" /* MatIconRegistry */], __WEBPACK_IMPORTED_MODULE_5__angular_material_icon__["a" /* ICON_REGISTRY_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_5__angular_material_icon__["d" /* MatIconRegistry */]], [2, __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */]], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_8__angular_router__["m" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_8__angular_router__["m" /* RouterModule */], [[2, __WEBPACK_IMPORTED_MODULE_8__angular_router__["r" /* ɵa */]], [2, __WEBPACK_IMPORTED_MODULE_8__angular_router__["k" /* Router */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__["a" /* BidiModule */], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_bidi__["a" /* BidiModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["f" /* MATERIAL_SANITY_CHECKS */], true, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["m" /* MatCommonModule */], __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["m" /* MatCommonModule */], [[2, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["f" /* MATERIAL_SANITY_CHECKS */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_10__angular_material_card__["e" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_10__angular_material_card__["e" /* MatCardModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_5__angular_material_icon__["c" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material_icon__["c" /* MatIconModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_1__wdc_module__["a" /* WdcModule */], __WEBPACK_IMPORTED_MODULE_1__wdc_module__["a" /* WdcModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_8__angular_router__["i" /* ROUTES */], function () { return [[{ path: "", component: __WEBPACK_IMPORTED_MODULE_11__wdc_component__["a" /* WdcComponent */] }]]; }, [])]); });



/***/ })

});