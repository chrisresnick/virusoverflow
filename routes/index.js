var express = require('express');
var router = express.Router();

const { asyncHandler } = require("./utils");
<<<<<<< HEAD
const { User } = require("../db/models/index");
const db = require("../db/models")
=======
const { User, Question, Answer } = require("../db/models/index");
>>>>>>> master

const bcrypt = require("bcryptjs");
const session = require('express-session');
const sw = require("stopword");
const Op = require("sequelize").Op
const { check, validationResult } = require("express-validator");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });

async function requireAuth(req, res, next) {
  if (!res.locals.authenticated) {
    return res.redirect("/login")
  }
  return next();
}

router.get("/test", requireAuth, asyncHandler(async (req, res) => {
  res.send(res.locals.user.username);
}))

router.get("/", async (req, res, next) => {
  try {
<<<<<<< HEAD
    const questions = await db.Question.findAll({
      include: [User, db.Answer]
=======
    const questions = await Question.findAll({
      include: [User, Answer]
>>>>>>> master
    })
    // console.log(questions);
    res.render('questions', { questions });
  } catch (err) {
    next(err);
  }
})

router.get("/questions-form", (req, res) => {
  res.render("questions-form");
})



router.get("/login", (req, res) => {
  res.render("login");
})


router.post('/logout', (req, res) => {
  delete req.session.auth;
  res.redirect(req.header('Referer'));
})

const loginValidator = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")]

router.post('/login', loginValidator, asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.render("login", { errors: validationErrors.errors.map(err => err.msg) });
  }
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.render("login", { errors: ["Username and Password Combination not valid"] })
  }
  if (await bcrypt.compare(password, user.password.toString())) {
    req.session.auth = {
      userId: user.id,
    };
    res.locals.authenticated = true;
    res.locals.user = user.id;
    // res.redirect(req.header('Referer'));
    res.redirect("/");

  }
  else {
    return res.render("login", { errors: ["Username and Password Combination not valid"] })
<<<<<<< HEAD
=======
  }
}));

router.post("/search", asyncHandler(async (req, res) => {
  const searchTerm = req.body.searchTerm.trim();
  if(searchTerm.length === 0) return res.redirect("/")
  const words = sw.removeStopwords(searchTerm.split(" "));
  //if(words.length === 0) return res.redirect("/");
  const re = words.map(word => `%${word}%`);
  console.log("re", re);
  const results = {}
  for(let term of re) {
    console.log("term", term);
    let questions = await Question.findAll({where:
      {[Op.or]:
        [{textArea: {[Op.iLike]: term}},
        {title:    {[Op.iLike]: term}}]
      },
      include: User
    })
    //console.log("questions:", questions);
    let answers = await Answer.findAll({where:{textField: {[Op.iLike]: term}}})
    //console.log("answers:", answers);
    questions.forEach(question => {
      if(!(question.id in results)) results[question.id] = {count:0, question};
      results[question.id].count += countOccur(question.textArea, term.substring(1, term.length-1));
      results[question.id].count += 2*countOccur(question.title, term.substring(1, term.length-1));
    });
    answers.forEach(async answer => {
        console.log("questionId", answer.questionId)
        if(!(answer.questionId in results)){
          let thisQues = await Question.findByPk(answer.questionId, {include: User});
          results[answer.questionId] = {count: 0, question: thisQues};
        };
        results[answer.questionId].count += countOccur(answer.textFeild, term.substring(1, term.length-1));;
    });
>>>>>>> master
  }
  const releventQuestions = Object.keys(results);
  if(releventQuestions.length === 0) return res.render("noneFound");
  releventQuestions.sort((a,b) => {
    const aVal = results[a].count;
    const bVal = results[b].count;
    if(aVal===bVal) return 0;
    return aVal > bVal ? -1 : 1;
  });
  const questions = releventQuestions.map(q => results[q].question);
  res.render("questions", {questions})
}));

function countOccur(str, subString){
  let count = 0;
  let indexOfSub = str.indexOf(subString)
  while(indexOfSub != -1) {
    count++;
    indexOfSub = str.indexOf(subString, indexOfSub+subString.length);
  }
  return count;
}

module.exports = router;
