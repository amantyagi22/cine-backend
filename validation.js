// const Joi = require("joi");

// // //registervalidation

// // const registervalidation = function(data){

// //     const schema = Joi.object({
// //       name:Joi.string().min(3).required(),
// //       email:Joi.string().required().email(),
// //       password:Joi.string().min(6).required()
// //     });

// //   return schema.validate(data);
// // };

// //loginvalidation

// const loginvalidation = function(data){

//   const schema = Joi.object().keys({

//         email:Joi.string().min(6).required().email(),
//           password:Joi.string().min(6).required()
//     });
//     return schema.validate(data);

// }


// module.exports.loginvalidation = loginvalidation;