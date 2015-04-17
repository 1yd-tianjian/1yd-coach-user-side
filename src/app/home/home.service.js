'use strict';

angular.module('1yd-coach')

.service('Geolocation', function() {

  var GeoObj = {
    supportsGeo: false
  };
  /** 
   * 以下为html5代码,获取地理位置 
   */
  GeoObj.getLocation = function() {
    //检查浏览器是否支持地理位置获取 
    if (navigator.geolocation) {
      //若支持地理位置获取,成功调用showPosition(),失败调用showError 
      // alert("正在努力获取位置..."); 
      var config = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000
      };
      navigator.geolocation.getCurrentPosition(showPosition, showError, config);
    } else {
      alert("定位失败,用户已禁用位置获取权限");
    }
  };

  /** 
   * 获取地址位置成功 
   */
  function showPosition(position) {
    //获得经度纬度 
    var x = position.coords.longitude;
    var y = position.coords.latitude;
    alert('x：' + x + '\n' + 'y：' + y);
    console.log('x：' + x + '\n' + 'y：' + y);
    GeoObj.supportsGeo = true;
  };

  /** 
   * 获取地址位置失败[暂不处理] 
   */
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("定位失败,用户拒绝请求地理定位");
        console.log("定位失败,用户拒绝请求地理定位");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("定位失败,位置信息是不可用");
        console.log("定位失败,位置信息是不可用");
        break;
      case error.TIMEOUT:
        alert("定位失败,请求获取用户位置超时");
        console.log("定位失败,请求获取用户位置超时");
        break;
      case error.UNKNOWN_ERROR:
        alert("定位失败,定位系统失效");
        console.log("定位失败,定位系统失效");
        break;
    }
  };

  return GeoObj;

});
