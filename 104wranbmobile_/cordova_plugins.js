cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "skwas-cordova-plugin-datetimepicker.DateTimePicker",
    "file": "plugins/skwas-cordova-plugin-datetimepicker/www/datetimepicker.js",
    "pluginId": "skwas-cordova-plugin-datetimepicker",
    "clobbers": [
      "cordova.plugins.DateTimePicker"
    ]
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "skwas-cordova-plugin-datetimepicker": "1.1.3",
  "cordova-plugin-inappbrowser": "3.0.0"
};
// BOTTOM OF METADATA
});