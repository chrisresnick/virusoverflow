const express = require("express");
const answer = require("../db/models/answer");
const router = express.Router();
const { AnswerVotes } = require("../db/models/index");
const { requireAuth, asyncHandler } = require("./utils");

const db = require("./../db/models");

async function ansVoteSum(answerId) {
	let votes = await AnswerVotes.findAll({ where: { answerId } });
	votes = votes.map((vote) => vote.toJSON());
	return votes.reduce((acc, vote) => {
		return acc + (vote.isUpVote ? 1 : -1);
	}, 0);
}
router.get(
	"/:id(\\d+)/vote",
	asyncHandler(async (req, res) => {
		res.json({ count: await ansVoteSum(req.params.id) });
	})
);
router.post(
	"/:id(\\d+)/vote",
	requireAuth,
	asyncHandler(async (req, res) => {
		const answerId = req.params.id;
		const { isUpVote } = req.body;
		const userId = res.locals.user.id;
		const existingVote = await AnswerVotes.findOne({
			where: { answerId, userId },
		});
		if (!existingVote) {
			//if the user hasnt voted on this question yet, create a new vote
			const vote = await AnswerVotes.create({
				answerId,
				userId,
				isUpVote,
			});
		} else if (existingVote.isUpVote != isUpVote) {
			//change the vote
			existingVote.isUpVote = isUpVote;
			await existingVote.save();
		} else {
			//delete the vote if they're clicking on the same button again
			await existingVote.destroy();
		}
		return res.json({ count: await ansVoteSum(answerId) });
	})
);

// edit the answer

router.get(
	"/:id(\\d+)/edit",
	requireAuth,
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);

		let answer = await db.Answer.findByPk(id);
		if (res.locals.user.id != answer.userId) {
			return res.render("edit-answer", {
				errors: ["401: Unauthorized"],
				logedIn: req.userLogedIn,
				answer,
			});
		}
		res.render("edit-answer", {
			answer,
			logedIn: req.userLogedIn,
		});
	})
);

router.patch(
	"/:id(\\d+)",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);

		const newAnswer = req.body.textField;

		let answer = await db.Answer.findByPk(id);
		// if (res.locals.user.id != answer.userId) {
		// 	return res.render("edit-answer", {
		// 		errors: ["You are not authorized to edit the answer"],
		// 		logedIn: req.userLogedIn,
		// 		answer: answer,
		// 	});
		// }
		// const foundAnswer = answer.find((ans) => ans.id === id);

		answer.textField = newAnswer;
		await answer.save();
		res.redirect(`/questions/${answer.questionId}`);
	})
);

// delete an answer
router.delete(
	"/:id(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const answer = await db.Answer.findByPk(id);

		if (res.locals.user.id != answer.userId) {
			return res.render("edit-answer", {
				errors: ["You are not authorized to DELETE the answer"],
				logedIn: req.userLogedIn,
				answer: answer,
			});
		}

		console.log("::::::::::", answer);
		await answer.destroy();
		res.redirect(req.header("Referer"));
	})
);

async function ansVoteSum(answerId) {
	let votes = await AnswerVotes.findAll({ where: { answerId } });
	votes = votes.map((vote) => vote.toJSON());
	return votes.reduce((acc, vote) => {
		return acc + (vote.isUpVote ? 1 : -1);
	}, 0);
}

router.get(
	"/:id(\\d+)/vote",
	asyncHandler(async (req, res) => {
		res.json({ count: await ansVoteSum(req.params.id) });
	})
);
router.post(
	"/:id(\\d+)/vote",
	requireAuth,
	asyncHandler(async (req, res) => {
		const answerId = req.params.id;
		const { isUpVote } = req.body;
		const userId = res.locals.user.id;
		const existingVote = await AnswerVotes.findOne({
			where: { answerId, userId },
		});
		if (!existingVote) {
			//if the user hasnt voted on this question yet, create a new vote
			const vote = await AnswerVotes.create({
				answerId,
				userId,
				isUpVote,
			});
		} else if (existingVote.isUpVote != isUpVote) {
			//change the vote
			existingVote.isUpVote = isUpVote;
			await existingVote.save();
		} else {
			//delete the vote if they're clicking on the same button again
			await existingVote.destroy();
		}
		return res.json({ count: await ansVoteSum(answerId) });
	})
);

module.exports = router;
