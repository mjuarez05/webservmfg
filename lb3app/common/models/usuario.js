'use strict';
var app = require('../../server/server');
module.exports = function(Usuario) {
  Usuario.getFullName = function(id, cb) {
    Usuario.findById(id, function(err, instance) {
      var response = instance.nombre + ' ' + instance.apellido;
      cb(null, response);
    });
  };

  Usuario.add = function(newUsuario, cb) {
    Usuario.create(newUsuario, function(err, userInstance) {
      if (err) {
        console.error('create user ', err);
        return cb(err);
      }
      var Role = app.models.Role;
      Role.findOne(
        {
          where: {
            name: 'General',
          },
        },
        function(err, role) {
          if (err) {
            console.error('find role ', err);
            return cb(err);
          }
          var RoleMapping = app.models.RoleMapping;
          RoleMapping.create(
            {
              principalType: RoleMapping.USER,
              principalId: userInstance.id,
              roleId: role.id,
            },
            function(err, principal) {
              if (err) {
                console.error('asignar rol ', err);
                return cb(err);
              }
              cb(null, userInstance);
            }
          );
        }
      );
    });
  };

  Usuario.edit = function(newModel, cb) {
    console.log(newModel);
    // Usuario.findById(newModel.id, function(err, instance) {
    //   console.log(instance);
    //   // instance.nombre = newModel.nombre;
    //   // instance.apellido = newModel.apellido;
    //   // instance.email = newModel.email;
    //   // instance.username = newModel.username;
    //   // instance.updateAttributes({
    //   //   nombre: newModel.nombre
    //   // }, {
    //   //   apellido: newModel.apellido
    //   // }, {
    //   //   email: newModel.email
    //   // }, {
    //   //   username: newModel.username
    //   // }, function (err, result) {
    //   //   console.log(err, count)
    //   // });

    //   // Usuario.replaceOrCreate(instance, [], function (err, model) {   if (err) {
    cb(null, () => {
      return newModel;
    });
    // });
  };

  Usuario.remoteMethod('getFullName', {
    description: 'get user full name',
    http: {
      path: '/getFullName',
      verb: 'get',
    },
    accepts: {
      arg: 'id',
      description: 'user id',
      type: 'number',
      http: {
        source: 'query',
      },
    },
    returns: {
      arg: 'fullname',
      type: 'string',
    },
  });

  Usuario.remoteMethod('add', {
    description: 'Add Usuario with General Rol',
    http: {
      path: '/add',
      verb: 'post',
    },
    accepts: {
      arg: 'usuario',
      description: 'Usuario Model',
      type: 'Usuario',
      required: true,
      http: {
        source: 'body',
      },
    },
    returns: {
      arg: 'response',
      type: 'Object',
    },
  });

  Usuario.remoteMethod('edit', {
    description: 'Edit Usuario without password',
    http: {
      path: '/edit',
      verb: 'put',
    },
    accepts: {
      arg: 'newUser',
      description: 'Usuario Model',
      type: 'Usuario',
      required: true,
      http: {
        source: 'body',
      },
    },
    returns: {
      arg: 'status',
      type: 'Object',
    },
  });

  Usuario.remoteMethod('new', {
    description: 'Edit Usuario without password',
    http: {
      path: '/edit',
      verb: 'put',
    },
    accepts: {
      arg: 'newUser',
      description: 'Usuario Model',
      type: 'Usuario',
      required: true,
      http: {
        source: 'body',
      },
    },
    returns: {
      arg: 'status',
      type: 'Object',
    },
  });
};
