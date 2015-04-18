'use strict';

angular.module('1yd-coach')

.service('coachService', function(Restangular) {

  var basePath = {
    coach: Restangular.all('coaches')
  };

  /**
   * 获取教练列表数据
   * @param  {[obj]} param [page,size,category_id,gender]
   * @return {[array]}       [coachList]
   */
  this.allCoaches = function(param) {
    console.log(param);
    return basePath.coach.getList(param);
  };

  /**
   * 获取单个教练数据
   * @param  {[number]} id [coachId]
   * @return {[obj]}    [coachData]
   */
  this.oneCoach = function(id) {
    return basePath.coach.get(id);
  };
});
