const { checkRole } = require('./checkRole');

const verifyTheSameUser = async ( request, response, next ) => {
  try {
    const user = request.user;
    const {id} = request.params;
    user.isUrlPublic = true
    if ( user.id === id ) {
      user.isSameUser = true
      const isAdmin = await checkRole(request, response, next);
      if (isAdmin) {
        user.isAdmin = true
        return next();
      }
      return next();
    }
    const isAdmin = await checkRole(request, response, next);
    if (isAdmin) {
      user.isAdmin = true
      return next();
    }
    return next();
  } catch (error) {
    next(error)
  }
};


module.exports = {
  verifyTheSameUser
}