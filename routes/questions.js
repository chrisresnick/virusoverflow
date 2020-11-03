const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler, requireAuth } = require("./utils");

router.get("/", (req, res) => {
    res.render("voteTest");
});


router.post("/:id(\\d)/vote", requireAuth, asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const {isUpVote} = req.body
    const userId = res.locals.user.Id
    const existingVote = db.Vote.findOne({where:{questionId, userId}})
    if(!existingVote){ //if the user hasnt voted on this question yet, create a new vote
        const vote = await db.Vote.create({questionId, userId, isUpVote});
    }
    else if(existingVote.isUpVote != isUpVote) { //change the vote
        existingVote.isUpVote = isUpVote;
        await existingVote.save();
    } else { //delete the vote if they're clicking on the same button again
        await existingVote.destroy();
    }
    return res.json({count: voteSum(questionId)});
}));

async function voteSum(questionId){
    const votes = await Vote.findAll({where:{questionId}})
    return votes.reduce((acc, vote) => acc + vote.isUpVote ? 1 : -1);
}

module.exports = router;
