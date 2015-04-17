'use strict';

angular.module('1yd-coach')

.service('coachService', function(Restangular) {

  var basePath = {
    coach: Restangular.all('coaches')
  };

  Restangular.extendModel('coaches', function(elem) {
      


      /**
       * coach的操作
       * @returns {Object}  Restangular Object
       */
      

      elem.getCoachCourseList = function(coachId) {
        alert(1);
        console.log('this', coachId);
        return this.getList('courses', coachId);
      };
      // console.log(elem.getCoachCourseList());
      return elem;
    });



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
