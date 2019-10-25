questionArr = ["What is your first name?",
"Where did you grow up?",
"What is your mother’s maiden name?",
"What is your favorite pasta shape?",
"What was your first pet?",
"Where did you attend secondary school?",
"What was your first car?",
"What is your favorite ice cream flavor? Haagen Daz vs Ben and Jerry’s? Pick one!",
"At what age did you learn how to walk?",
"What is your favorite cuisine?",
"Do you enjoy sushi?",
"How many hours do you sleep on a given night?",
"How many children do you have?",
"Do you drink coffee?",
"How often do you go grocery shopping per month?",
"Have you ever binge watched a Netflix series?",
"What does binge watching mean to you?"]
currentQuestion = 1;
function registerKey(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { //Enter keycode
		$('.formQuestion').remove();
		currentQuestion += 1;
  	$('#questionArea').append("<div class='formQuestion'><h2>" + currentQuestion + ". " + questionArr[currentQuestion - 1]+ "</h2><input onkeydown='registerKey(event)' class='lui-input  lui-input--large'/></div>");
	}
}
