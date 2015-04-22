'use strict';

angular.module('1yd-coach')

  .service('coachService', function (Restangular) {

    //var coachPath = Restangular.all('coaches');
    //
    ///**
    // * 获取教练列表数据
    // * @param  {[obj]} param [page,size,category_id,gender]
    // * @return {[array]}       [coachList]
    // */
    //this.allCoaches = function (param) {
    //  console.log(param);
    //  return coachPath.getList(param);
    //};
    //
    ///**
    // * 获取单个教练数据
    // * @param  {[number]} id [coachId]
    // * @return {[obj]}    [coachData]
    // */
    //this.oneCoach = function (id) {
    //  return coachPath.get(id);
    //};
    var base = Restangular.all('coaches')
    Restangular.extendModel('coaches', function (elem) {

      /**
       * 获获取教练课程信息
       * @param queryParams 查询参数
       * @param headers header参数
       * @returns {Object} Collection Promise
       */
      elem.courses = function (queryParams, headers) {
        return this.getList('courses', queryParams, headers);
      };

      return elem;
    });


    /**
     * 查询单个教练信息
     * @param id
     * @return {promise}
     */
    this.find = function (id) {
      return base.get(id);
    };

    /**
     * 刷新一个教练信息
     * @param id
     * @return {promise}
     */
    this.fresh = function (id) {
      return base.get(id);
    };

    /**
     * 保存教练信息
     * @param data
     * @param queryParams
     * @param headers
     * @return {promise}
     */
    this.save = function (data, queryParams, headers) {
      return base.post(data, queryParams, headers);
    };

    /**
     * 创建一个教练信息
     * @param data
     * @param queryParams
     * @param headers
     * @return {promise}
     */
    this.create = function (data, queryParams, headers) {
      return base.post(data, queryParams, headers);
    };

  })

  .service('meatDataService', function (Restangular) {
    var meatDataPath = Restangular.one('meta-data');
    this.meatData = function () {
      return meatDataPath.get();
    };
  });


angular.module('1yd-coach')
  //.factory('Coach', function () {
  //  function Book(bookData) {
  //    if (bookData) {
  //      this.setData(bookData);
  //    }
  //    // Some other initializations related to book
  //  };
  //  Book.prototype = {
  //    setData: function (bookData) {
  //      angular.extend(this, bookData);
  //    },
  //    load: function (id) {
  //      var scope = this;
  //      $http.get('ourserver/books/' + bookId).success(function (bookData) {
  //        scope.setData(bookData);
  //      });
  //    },
  //    delete: function () {
  //      $http.delete('ourserver/books/' + bookId);
  //    },
  //    update: function () {
  //      $http.put('ourserver/books/' + bookId, this);
  //    },
  //    getImageUrl: function (width, height) {
  //      return 'our/image/service/' + this.book.id + '/' + width + '/' + height;
  //    },
  //    isAvailable: function () {
  //      if (!this.book.stores || this.book.stores.length === 0) {
  //        return false;
  //      }
  //      return this.book.stores.some(function (store) {
  //        return store.quantity > 0;
  //      });
  //    }
  //  };
  //  return Book;
  //})
  .factory('CoachSvc', function (Restangular) {
    Restangular.extendModel('coaches', function (elem) {

      elem.courses = function (queryParams, headers) {
        return this.getList('courses', queryParams, headers);
      };

      return elem;
    });
    return Restangular.all('coaches');
  })