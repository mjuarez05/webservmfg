'use strict';

// module.exports = function(app, callback) {
//   // Obtain the datasource registered with the name "vmsv"
// var path = require('path');
// var fs = require('fs');
// var app = require(path.resolve(__dirname, '../server'));
// var outputPath = path.resolve(__dirname, '../../common/models');

// var dataSource = app.dataSources.vmsv;

//   dataSource.discoverSchema(
//     'productos',
//     {relations: true,schema:'beeftran'},
//     function(err, schema) {
//       if(schema) {
//         console.log("Auto discovery success: " + schema.name);
//         var outputName = outputPath + '/' +schema.name + '.json';
//         fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
//           if(err) {
//             console.log(err);
//           } else {
//             console.log("JSON saved to " + outputName);
//           }
//         });
//       }
//       if(err) {
//         console.error(err);
//         return;
//       }
//       return;
//     });
// };