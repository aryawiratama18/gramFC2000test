"use strict";

exports.ok = (values, res) => {
  var data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
};

// exports.nested = (values, res) => {
//   var data = {
//     status: 200,
//     values: values,
//   };

//   res.json(data);
//   res.end();
// };
