const ProfilesService = require('../services/profiles.service');
const RolesService = require('../services/roles.service');
const { CustomError } = require('../utils/helpers');

const rolesService = new RolesService();
const profilesService = new ProfilesService()

const checkRole = async (request, response, next) => {
  try {
    const user= request.user;

    const {id:roleId} = await rolesService.findRoleByName('admin');
    const {role_id:roleIdInProfile} = await profilesService.findProfileByUserID(user.id);

    if (roleId === roleIdInProfile && user.isUrlPublic) {
      user.isAdmin = true
      return next()
    }
    else if (user.isUrlPublic) {
      return next()
    }
    else if ( roleId === roleIdInProfile && ! user.isUrlPublic ) {
      return next();
    }
    // response.status(403).json({message: 'Unauthorized'});
    throw new CustomError('is not admin', 403, 'Unauthorized');
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkRole,
}