var del = require('delete');
const makeDir = require('make-dir');
var copy = require('recursive-copy');

del.promise(['../public/**'], {force: true}).then(function (deleted) {
  // deleted files
  console.log('Limpiando public');
  console.log(deleted);

  makeDir('../public').then((path) => {
    console.log('Creando nuevo public');
    console.log(path);

    copy('build', '../public')
      .then(function (results) {
        console.info('Copiedos: ' + results.length + ' archivos');
      })
      .catch(function (error) {
        console.error('Error al copiar build: ' + error);
      });
  });
});
