'use strict';
let app = require('../../server/server');
var loopback = require('loopback');

module.exports = function (Transaccion) {
  Transaccion.getModels = function (cb) {
    console.log(MarfrigWebAppComponent);
    let models = app.models();
    let result = [];
    result.push('*');
    models.forEach(function (Model) {
      result.push(Model.modelName);
    });
    cb(null, result);
  };

  Transaccion.remoteMethod('getModels', {
    description: 'get all models',
    http: {
      path: '/getModels',
      verb: 'get',
    },
    returns: {
      arg: 'models',
      type: 'string',
    },
  });

  Transaccion.getMethods = function (modelName, cb) {
    let model = app.models[modelName];
    let methods = model.sharedClass.methods().map((method) => {
      return (method.isStatic ? '' : 'prototype.') + method.name;
    });
    methods.unshift('*');
    cb(null, methods);
  };

  Transaccion.remoteMethod('getMethods', {
    description: 'get all Methods',
    http: {
      path: '/getMethods',
      verb: 'get',
    },
    accepts: {
      arg: 'model',
      description: 'model name',
      type: 'string',
      http: {
        source: 'query',
      },
    },
    returns: {
      arg: 'methods',
      type: 'string',
    },
  });

  Transaccion.getUserMenu = function (userId, cb) {
    let RolMap = app.models.RoleMapping;

    RolMap.find(
      {
        where: {
          principalId: userId.toString(),
        },
      },
      function (err, res) {
        if (err) console.error(err);
        let roles = [];
        res.forEach((el) => {
          roles.push(el.roleId);
        });
        let TRXmap = app.models.TransMap;
        TRXmap.find(
          {
            where: {
              roleId: {
                inq: roles,
              },
            },
          },
          function (err, res) {
            if (err) console.error(err);
            let trxs = [];
            res.forEach((el) => {
              trxs.push(el.transId);
            });
            let TRX = app.models.Transaccion;
            TRX.find(
              {
                where: {
                  and: [
                    {
                      menuId: 0,
                    },
                    {
                      id: {
                        inq: trxs,
                      },
                    },
                  ],
                },
                include: {
                  relation: 'children',
                  scope: {
                    where: {
                      id: {
                        inq: trxs,
                      },
                    },
                    include: {
                      relation: 'children',
                      scope: {
                        where: {
                          id: {
                            inq: trxs,
                          },
                        },
                        include: {
                          relation: 'children',
                        },
                      },
                    },
                  },
                },
              },
              function (err, res) {
                if (err) console.error(err);
                cb(null, res);
              },
            );
          },
        );
      },
    );
  };

  Transaccion.remoteMethod('getUserMenu', {
    description: 'get all Methods',
    http: {
      path: '/getUserMenu',
      verb: 'get',
    },
    accepts: {
      arg: 'id',
      description: 'user id',
      type: 'string',
      http: {
        source: 'query',
      },
    },
    returns: {
      arg: 'menu',
      type: 'Transaccion',
    },
  });
};
