var express = require("express");
var router = express.Router();

const { asyncHandler } = require("./utils");
const { User, Question, Answer } = require("../db/models/index");

const bcrypt = require("bcryptjs");
const session = require("express-session");
const sw = require("stopword");
const Op = require("sequelize").Op;
const { check, validationResult } = require("express-validator");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });

async function requireAuth(req, res, next) {
	if (!res.locals.authenticated) {
		return res.redirect("/login");
	}
	return next();
}

router.get(
	"/test",
	requireAuth,
	asyncHandler(async (req, res) => {
		res.send(res.locals.user.username);
	})
);

router.get("/", async (req, res, next) => {
	try {
		let questions = await Question.findAll({
			include: [User, Answer],
		});
		questions = questions.map(question => question.toJSON())
		res.render("questions", { questions, logedIn: req.userLogedIn });
	} catch (err) {
		next(err);
	}
})

router.get("/questions-form", (req, res) => {
	res.render("questions-form", { logedIn: req.userLogedIn, userId: res.locals.user.id });
});

router.get("/login", (req, res) => {
	res.render("login", { logedIn: req.userLogedIn });
});

router.post("/logout", (req, res) => {
	delete req.session.auth;
	res.redirect("/");
});

const loginValidator = [
	check("username")
		.exists({ checkFalsy: true })
		.withMessage("Username is required"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required"),
];

router.post(
	"/login",
	loginValidator,
	asyncHandler(async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.render("login", {
				errors: validationErrors.errors.map((err) => err.msg),
				logedIn: req.userLogedIn,
			});
		}
		let { username, password } = req.body;
		if (!username || !password) {
			username = req.query.username;
			password = req.query.password;
		}
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.render("login", {
				errors: ["Username and Password Combination not valid"],
				logedIn: req.userLogedIn,
			});
		}
		if (await bcrypt.compare(password, user.password.toString())) {
			req.session.auth = {
				userId: user.id,
			};
			res.locals.authenticated = true;
			res.locals.user = user.id;
			// res.redirect(req.header('Referer'));
			res.redirect("/");
		} else {
			return res.render("login", {
				errors: ["Username and Password Combination not valid"],
				logedIn: req.userLogedIn,
			});
		}
	})
);

router.post(
	"/search",
	asyncHandler(async (req, res) => {
		const searchTerm = req.body.searchTerm.trim();
		if (searchTerm.length === 0) return res.redirect("/");
		const words = sw.removeStopwords(searchTerm.split(" "));
		if (words.length === 0) return res.redirect("/");
		const re = words.map((word) => `%${word}%`);
		//console.log("re", re);
		const results = {};
		for (let term of re) {
			//console.log("term", term);
			let questions = await Question.findAll({
				where: {
					[Op.or]: [
						{ textArea: { [Op.iLike]: term } },
						{ title: { [Op.iLike]: term } },
					],
				},
				include: [User, Answer],
			});
			//console.log("questions:", questions);
			let answers = await Answer.findAll({
				where: { textField: { [Op.iLike]: term } },
				include: { model: Question, include: [User, Answer] },
			});
			//console.log("answers:", answers);
			questions.forEach((question) => {
				if (!(question.id in results))
					results[question.id] = { count: 0, question };
				results[question.id].count += countOccur(
					question.textArea,
					term.substring(1, term.length - 1)
				);
				results[question.id].count +=
					2 *
					countOccur(
						question.title,
						term.substring(1, term.length - 1)
					);
			});
			answers.forEach((answer) => {
				//console.log("questionId", answer.questionId);
				if (!(answer.questionId in results)) {
					//let thisQues = await Question.findByPk(answer.questionId, {include: User});
					results[answer.questionId] = {
						count: 0,
						question: answer.Question,
					};
				}
				results[answer.questionId].count += countOccur(
					answer.textField,
					term.substring(1, term.length - 1)
				);
			});
		}
		const releventQuestions = Object.keys(results);

		if (releventQuestions.length === 0)
			return res.render("noneFound", { logedIn: req.userLogedIn });

		releventQuestions.sort((a, b) => {
			const aVal = results[a].count;
			const bVal = results[b].count;
			if (aVal === bVal) return 0;
			return aVal > bVal ? -1 : 1;
		});
		const questions = releventQuestions.map((q) => results[q].question);
		res.render("questions", { questions, logedIn: req.userLogedIn, userId: res.locals.user.id });
	})
);

function countOccur(str, subString) {
	let count = 0;
	let indexOfSub = str.indexOf(subString);
	while (indexOfSub != -1) {
		count++;
		indexOfSub = str.indexOf(subString, indexOfSub + subString.length);
	}
	return count;
}

module.exports = router;
