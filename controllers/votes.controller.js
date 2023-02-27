const VotesServices = require('../services/votes.service');
const votesService = new VotesServices();

const createVote = async (request, response, next) => {
  try {
    const {id:publication_id} = request.params;
    const {id:user_id} = request.user;
    const vote = await votesService.verifyVote(publication_id, user_id)
    // response.json(vote)
    response.json(vote)

  } catch (error) {
    next(error)
  }
};


module.exports = {
  createVote
}