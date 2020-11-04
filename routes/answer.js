const express = require("express");
const router = express.Router();

async function ansVoteSum(answerId){
    let votes = await AnswerVote.findAll({where:{answerId}})
    votes = votes.map(vote => vote.toJSON())
     return votes.reduce((acc, vote) => {
        return acc + (vote.isUpVote ? 1 : -1);
    }, 0);
}

router.post("/answer/:id(\\d+)/vote", requireAuth, asyncHandler(async(req, res) => {

    const answerId = req.params.id;
    const {isUpVote} = req.body
    const userId = res.locals.user.id;
    const existingVote = await AnswerVote.findOne({where:{answerId, userId}})
    if(!existingVote){ //if the user hasnt voted on this question yet, create a new vote
        const vote = await AnswerVote.create({answerId, userId, isUpVote});
    }
    else if(existingVote.isUpVote != isUpVote) { //change the vote
        existingVote.isUpVote = isUpVote;
        await existingVote.save();
    } else { //delete the vote if they're clicking on the same button again
        await existingVote.destroy();
    }
    return res.json({count: await ansVoteSum(answerId)});
}));

module.exports = router;
