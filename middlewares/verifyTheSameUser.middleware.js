const { checkRole } = require('./checkRole');

const verifyTheSameUser = async ( request, response, next ) => {
  try {
    const user = request.user;
    const {id} = request.params;
    user.isUrlPublic = true
    if ( user.id === id ) {
      user.isSameUser = true
    }
    
    return next();
  } catch (error) {
    next(error)
  }
};


module.exports = {
  verifyTheSameUser
}