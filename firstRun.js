"use strict";
//loading the high score in localStorage
document.getElementById('hScore').innerHTML = localStorage.getItem('High Score');

//this is where we store the object to use in trivia
let data = {};

// declaring our answer buttons globally with correct answer option
let a1
let a2
let a3
let a4
let correctAnswer

//check to see if difficulty value is selected
let difficultyCheck = function(){
  if (dvalue =="blank") {
  alert('Please select a difficulty and hit go to begin!');
  }
}

//check for correct answer and change background to green
let checkCorrectAnswer = function() {
  if (answer1.textContent === correctAnswer) {
    document.getElementById('answer1').style.backgroundColor = 'green';
  }
  else if (answer2.textContent === correctAnswer) {
    document.getElementById('answer2').style.backgroundColor = 'green';
  }
  else if (answer3.textContent === correctAnswer) {
    document.getElementById('answer3').style.backgroundColor = 'green';
  }
  else if (answer4.textContent === correctAnswer) {
    document.getElementById('answer4').style.backgroundColor = 'green';
  }
  else {
    console.log('something went wrong')
  }
}

//function disabling the questions so you can't choose multiple answers/rack up the score
let disableQuestions = function () {
  let x = document.getElementById('answerBox');
  x.classList.add("blockBox")
  x.classList.remove("answerBox");
}

//funtion reenabling question answers
let enableQuestions = function() {
  let x = document.getElementById('answerBox');
  x.classList.remove("blockBox")
  x.classList.add("answerBox");
}

//declaring answer variables
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');

let answerArray = [answer1, answer2, answer3, answer4];

//reseting the background color of answer divs
const whiteout = function() {
    for (let x = 0; x < 4; x++){
      answerArray[x].style.backgroundColor = '#1A7CFA';
    }
//I got it to work with a for loop but I'm afraid to delete this just yet....
  // document.getElementById('answer1').style.backgroundColor = '#1A7CFA';
  // document.getElementById('answer2').style.backgroundColor = '#1A7CFA';
  // document.getElementById('answer3').style.backgroundColor = '#1A7CFA';
  // document.getElementById('answer4').style.backgroundColor = '#1A7CFA';
}

//capturing the scoreboard ids
let currentScore = document.getElementById('cScore');
let highScore = document.getElementById('hScore');
currentScore = 0;
highScore = 0;

//function for correct score update
let cUptdate = function () {
  currentScore++
  document.getElementById('cScore').innerHTML = currentScore;
}

//function for incorrect score update
let iUpdate = function() {
  if (currentScore > 0){
  currentScore--
  document.getElementById('cScore').innerHTML = currentScore;
  }
}

//function to compare current and high score
let compareScore = function() {
  if (currentScore > localStorage.getItem('High Score')) {
    document.getElementById('hScore').innerHTML = currentScore;
    localStorage.setItem('High Score', currentScore);
  }
}

//function to load trivia game
let triviaStart = function (data){
  //caputring each field's information
  let category = data.results[0].category;
  let question = data.results[0].question;
  let wrong1 = data.results[0].incorrect_answers[0];
  let wrong2 = data.results[0].incorrect_answers[1];
  let wrong3 = data.results[0].incorrect_answers[2];
  correctAnswer = data.results[0].correct_answer;
  //randomize the answers with sort
  let randomArray = [correctAnswer, wrong1, wrong2, wrong3];
  let answerList = randomArray.sort();
  //using the captured fields to populate the question on the page
  document.getElementById('category').innerHTML = category;
  document.getElementById('question').innerHTML = question;
  answer1.innerHTML = answerList[0];
  answer2.innerHTML = answerList[1];
  answer3.innerHTML = answerList[2];
  answer4.innerHTML = answerList[3];
  //resetting the background color if there was a previously answered question
  whiteout();
  //allowing questions to be answered again by sending the div to the back
  enableQuestions();
//making sure the counter gets reset for the new question button
  questionCounter = 1;
  return questionCounter;
}

//trying to capture the category value to use in url equation
let categoryValue = document.getElementById('categorySelector')
let cvalue ='any'
categoryValue.addEventListener('change', function(){
  cvalue = categoryValue.value;
  console.log(cvalue);
  return cvalue;
});

//trying to capture the difficulty value to use in url equation
let difficultyValue = document.getElementById('difficultySelector');
let dvalue ='blank'
difficultyValue.addEventListener('change', function(){
  dvalue = difficultyValue.value;
  console.log(dvalue);
  return dvalue;
})

//using the go button to initiate our url call
document.getElementById('go').addEventListener('click', function() {
// forcing a difficulty value to proceed
  difficultyCheck();
//any category has a different url syntax so trying to weed it out
  if (cvalue == "any"){
      urlCallFunc('https://opentdb.com/api.php?amount=50&difficulty='+dvalue+'&type=multiple');
    }
//All other categories have the same syntax so we can reuse this link
  else {
    urlCallFunc('https://opentdb.com/api.php?amount=20&category='+cvalue+'&difficulty='+dvalue+'&type=multiple')
  }
});

//ajax call and data return
let urlCallFunc = function(url) {
let ajaxRequest = new XMLHttpRequest(url);
ajaxRequest.onreadystatechange = function(){
  if(ajaxRequest.readyState == 4){
		//the request is completed, now check its status
		if(ajaxRequest.status == 200){
      //capture the JSON info
      data = JSON.parse(ajaxRequest.responseText);
      //triggering the trivia game to start
      triviaStart(data);
      return data;
    }
		else{
			console.log("Status error: " + ajaxRequest.status);
		}
	}
	else{
		console.log("Ignored readyState: " + ajaxRequest.readyState);
	}
}
//using the url feed to get JSON file
ajaxRequest.open("GET", url , true);
ajaxRequest.send();
}

//setting a counter for the new question button so that a new AJAX call has to be made to get new questions.
let questionCounter = 1;
let qButton = document.getElementById('newQuestion');

qButton.addEventListener('click', function() {
  //make sure the category/difficulty is selected
  difficultyCheck();
  //set limit for question and fill in data[i]
  if (questionCounter <=20) {
    let category = data.results[questionCounter].category;
    let question = data.results[questionCounter].question;
    let wrong1 = data.results[questionCounter].incorrect_answers[0];
    let wrong2 = data.results[questionCounter].incorrect_answers[1];
    let wrong3 = data.results[questionCounter].incorrect_answers[2];
    correctAnswer = data.results[questionCounter].correct_answer;
    //randomize the answers with a sort
    let randomArray = [correctAnswer, wrong1, wrong2, wrong3];
    let answerList = randomArray.sort();
    document.getElementById('category').innerHTML = category;
    document.getElementById('question').innerHTML = question;
    answer1.innerHTML = answerList[0];
    answer2.innerHTML = answerList[1];
    answer3.innerHTML = answerList[2];
    answer4.innerHTML = answerList[3];
    //caputring the answers to check
    a1 = answer1
    a2 = answer2
    a3 = answer3;
    a4 = answer4
    //increase counter one each time
    questionCounter++
    //resetting backgrounds to white for new question
    whiteout();
    //making sure you can click questions again
    enableQuestions();
  }
    else {
      alert('Please pick a new category/difficulty');
    }
});
//function to check the correct answer and then change background color based on white box you click
let clickAnswer = function () {
  {
    difficultyCheck();
    if (this.textContent === correctAnswer) {
      //update current score for correct answer
      cUptdate();
      //compare current score and high score
      compareScore();
      this.style.backgroundColor = 'green';
    }
    else {
      //update incorrect score
      iUpdate();
      this.style.backgroundColor = 'red';
      //check for the correct answer and change that background
      checkCorrectAnswer();
    }
    disableQuestions();
  };
}
//interactive answer boxes
answer1.addEventListener ('click', clickAnswer);
answer2.addEventListener ('click', clickAnswer);
answer3.addEventListener ('click', clickAnswer);
answer4.addEventListener ('click', clickAnswer);

//reset button for the high score
let resetB = document.getElementById('reset');
resetB.addEventListener('click', function(){
  console.log('this works');
  localStorage.setItem('High Score', 0);
  document.getElementById('hScore').innerHTML = 0;
});
