
//this is where we store the obeject to use in trivia
let data = {};

//function to load trivia game
let triviaStart = function (data){
  let category = data.results[0].category;
  let question = data.results[0].question;
  let correct = data.results[0].correct_answer;
  let wrong1 = data.results[0].incorrect_answers[0];
  let wrong2 = data.results[0].incorrect_answers[1];
  let wrong3 = data.results[0].incorrect_answers[2];
  let randomArray = [correct, wrong1, wrong2, wrong3];
  let answerList = randomArray.sort();
  document.getElementById('category').innerHTML = category;
  document.getElementById('question').innerHTML = question;
  document.getElementById('answer1').innerHTML = answerList[0];
  document.getElementById('answer2').innerHTML = answerList[1];
  document.getElementById('answer3').innerHTML = answerList[2];
  document.getElementById('answer4').innerHTML = answerList[3];
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
  if (dvalue =="blank") {
    alert('Please select a difficulty!')
  }
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
      data = JSON.parse(ajaxRequest.responseText);
      console.log(data);
      console.log(data.results[0]);
      // I'm not sure why creating a function to call trivia start works here but a straight call doesn't......but it seems to work
      let startTrivia = function (){
        triviaStart(data);
      }
      startTrivia();

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


ajaxRequest.open("GET", url , true);
ajaxRequest.send();
 }
//setting a counter for the new question button so that a new AJAX call has to be made to get new questions.
let questionCounter = 1;
let qButton = document.getElementById('newQuestion');
qButton.addEventListener('click', function() {
  if (questionCounter <=20) {
    let category = data.results[questionCounter].category;
    let question = data.results[questionCounter].question;
    let correct = data.results[questionCounter].correct_answer;
    let wrong1 = data.results[questionCounter].incorrect_answers[0];
    let wrong2 = data.results[questionCounter].incorrect_answers[1];
    let wrong3 = data.results[questionCounter].incorrect_answers[2];
    let randomArray = [correct, wrong1, wrong2, wrong3];
    let answerList = randomArray.sort();
    document.getElementById('category').innerHTML = category;
    document.getElementById('question').innerHTML = question;
    document.getElementById('answer1').innerHTML = answerList[0];
    document.getElementById('answer2').innerHTML = answerList[1];
    document.getElementById('answer3').innerHTML = answerList[2];
    document.getElementById('answer4').innerHTML = answerList[3];

    let answer1 = document.getElementById('answer1');
    let answer2 = document.getElementById('answer2');
    let answer3 = document.getElementById('answer3');
    let answer4 = document.getElementById('answer4');

    answer1.addEventListener ('click', function() {
      if (answer1.textContent === correct) {
        console.log('correct!')
      }
      else {
        console.log('fail')
      }
    });
    console.log(answer1.textContent);
    console.log(data.results[questionCounter].correct_answer)

    console.log(questionCounter)
    questionCounter++
  }
    else {
      console.log('no more questions')
      alert('Please pick a new category/difficulty');
    }
});
