'use strict';

angular.module('1yd-coach')

.service('coachService', function(Restangular) {

  var coachPath = Restangular.all('coaches');

  /**
   * 获取教练列表数据
   * @param  {[obj]} param [page,size,category_id,gender]
   * @return {[array]}       [coachList]
   */
  this.allCoaches = function(param) {
    console.log(param);
    return coachPath.getList(param);
  };

  /**
   * 获取单个教练数据
   * @param  {[number]} id [coachId]
   * @return {[obj]}    [coachData]
   */
  this.oneCoach = function(id) {
    return coachPath.get(id);
  };
})

.service('meatDataService', function(Restangular) {
  var meatDataPath = Restangular.one('meta-data');
  this.meatData = function() {
    return meatDataPath.get();
  };
});
