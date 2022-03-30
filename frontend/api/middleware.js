// module.exports = (req, res, next) => {
//   if (req.method === 'PUT') {
//     req.method = 'GET';
//     req.oldMethod = 'PUT';
//   }
//   if (res.oldMethod && res.oldMethod === 'PUT') {
//     req.method = 'POST';
//   }
//   // res.header('X-Hello', 'World')
//   next()
// }
