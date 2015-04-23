'use strict';

angular.module('1yd-coach')
  .factory('BaseService', function ($q) {

    var BaseService = {
      rest: {},
      _store: {},
      _search: _search,
      _fresh: _fresh,
      _instance: _retrieveInstance,
      _freshCollection: _freshCollection,
      find: find,
      fresh: fresh,
      save: save,
      create: create,
      all: all,
      list: list
    };

    return BaseService;
    /**
     * 具体实现
     */
    function _fresh(id, deferred) {
      var self = this;
      console.log(self);
      var promise = self.rest.get(id);
      promise.then(function (data) {
        var model = self._instance(data.id, data);
        deferred.resolve(model);
      }, function () {
        deferred.reject();
      })
    }

    function _retrieveInstance(id, modelData) {
      var self = this;
      var instance = self._store[id];
      if (instance) {
        angular.extend(instance, modelData);
      } else {
        instance = modelData;
        self._store[id] = instance;
      }

      return instance;
    }

    function _search(id) {
      var self = this;
      return self._store[id];
    };


    /**
     * 刷新数据列表
     * @param params
     * @param headers
     * @param deferred
     * @private
     */
    function _freshCollection(params, headers, deferred) {
      var self = this;
      var promise = self.rest.getList(params, headers);
      promise.then(function (data) {
        var collection = [];
        data.forEach(function (modelData) {
          var model = self._instance(modelData.id, modelData);
          collection.push(model);
        });

        deferred.resolve(collection);
      }, function () {
        deferred.reject();
      })
    };


    /**
     * 查询单个教练信息
     * @param id
     * @return {promise}
     */
    function find(id) {
      var deferred = $q.defer();
      var model = this._search(id);
      if (model) {
        deferred.resolve(model);
      } else {
        this._fresh(id, deferred);
      }
      console.log(this._store);
      return deferred.promise;
    };

    /**
     * 刷新一个教练信息
     * @param id
     * @return {promise}
     */
    function fresh(id) {
      var deferred = $q.defer();
      this._fresh(id, deferred);
      return deferred.promise
    };

    /**
     * 保存教练信息
     * @param model
     * @param queryParams
     * @param headers
     * @return {promise}
     */
    function save(model, queryParams, headers) {

      return this.rest.post(model, queryParams, headers);
    };

    /**
     * 创建一个教练信息
     * @param model
     * @param queryParams
     * @param headers
     * @return {promise}
     */
    function create(model, queryParams, headers) {
      return this.rest.post(model, queryParams, headers);
    };

    /**
     * 获取全部教练信息
     */
    function all() {
      return this.list();
    };

    /**
     * 获取教练信息列表
     */
    function list(queryParams, headers) {
      var deferred = $q.defer();
      this._freshCollection(queryParams, headers, deferred);
      return deferred.promise;
    };


  })
  .service('coachService', function (Restangular, $q, BaseService) {
    angular.extend(this, BaseService);
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

      /**
       * 刷新当前教练信息
       * @returns {promise}
       */
      elem.fresh = function () {
        return this.get();
      };

      return elem;
    });
    this.rest = Restangular.all('coaches');
  })

  .service('meatDataService', function (Restangular) {
    var meatDataPath = Restangular.one('meta-data');
    this.meatData = function () {
      return meatDataPath.get();
    };
  });