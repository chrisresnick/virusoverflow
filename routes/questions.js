const express = require("express");
const router = express.Router();
const db = require("../db/models");
const answer = require("../db/models/answer");
const { QuestionVote } = require("../db/models/index");
const { asyncHandler, requireAuth } = require("./utils");
const { User, Question, Answer } = db;

const methodOverride = require("method-override");

router.get("/", (req, res) => {
	res.redirect("/");
});

const questionNotFoundError = (id) => {
	const err = new Error(`Question with id of ${id} not found`);
	err.title = "Question not found";
	err.status = 404;
	return err;
};

// questions post route

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { title, textArea } = req.body;
		const userId = res.locals.user.id;
		const question = await Question.create({
			userId,
			title,
			textArea,
		});
		console.log(question.toJSON);
		// res.redirect(`/questions/${question.id}`).json({ question });
		res.redirect(`/questions/${question.id}`);
	})
);

// get route for all the questions
router.get(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const question = await db.Question.findByPk(id, { include: [User] });
		let answers = await db.Answer.findAll({
			where: {
				questionId: id,
			},
			include: [User],
			order: ["createdAt"],
		});
		answers = answers.map((answer) => answer.toJSON());

		res.render("answers", {
			userId: res.locals.user.id,
			question,
			answers,
			logedIn: req.userLogedIn,
		});
	})
);

// post an answer route
router.post(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		// console.log("body======", req.body);
		const { answer } = req.body;
		const userId = res.locals.user.id;
		// console.log(`UserId:`, userId);
		// console.log(answer);
		const questionId = parseInt(req.params.id, 10);

		await Answer.create({
			textField: answer,
			questionId,
			userId,
		});
		res.redirect(`/questions/${questionId}`);
	})
);

// vote route
router.post(
	"/:id(\\d+)/vote",
	requireAuth,
	asyncHandler(async (req, res) => {
		const questionId = req.params.id;
		const { isUpVote } = req.body;
		const userId = res.locals.user.id;
		const existingVote = await QuestionVote.findOne({
			where: { questionId, userId },
		});
		if (!existingVote) {
			//if the user hasnt voted on this question yet, create a new vote
			const vote = await QuestionVote.create({
				questionId,
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
		return res.json({ count: await voteSum(questionId) });
	})
);

async function voteSum(questionId) {
	let votes = await QuestionVote.findAll({ where: { questionId } });
	votes = votes.map((vote) => vote.toJSON());
	return votes.reduce((acc, vote) => {
		return acc + (vote.isUpVote ? 1 : -1);
	}, 0);
}
router.get(
	"/:id(\\d+)/vote",
	asyncHandler(async (req, res) => {
		res.json({ count: await voteSum(req.params.id) });
	})
);

module.exports = router;
