'use strict';

angular.module('1yd-coach')

.service('courseService', function(Restangular) {

	var basePath = {
    course: Restangular.allUrl('courses')
  };

  Restangular = Restangular.withConfig(function(Configurer) {

    // 拓展order返回的数据模型
    Configurer.extendModel('courses', function(elem) {

      /**
       * coach的操作
       * @returns {Object}  Restangular Object
       */

      /**
       * 教练详情
       * @returns {Object}  Coach Object
       */
      elem.getCourseDetail = function() {
        return this.get();
      };
      return elem;
    });

  });

  /**
   * 获取教练列表数据
   * @param  {[obj]} param [page,size,category_id,gender]
   * @return {[array]}       [coachList]
   */
  this.allCourses = function(param) {
    console.log(param);
    return basePath.course.getList(param);
  };

  /**
   * 获取单个教练数据
   * @param  {[number]} id [coachId]
   * @return {[obj]}    [coachData]
   */
  this.oneCourse = function(id) {
    return basePath.course.get(id);
  };

});
