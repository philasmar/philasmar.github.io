questionArr = []
currentQuestion = 1;
function registerKey(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { //Enter keycode

		var question = {
			id: $(".formQuestion").attr("questionid"),
			answer: $(".formQuestion").find("input").val()
		}
		firebase.database().ref('nopioid-dynamic-form-results').push().set(question);
		$('.formQuestion').remove();
		currentQuestion += 1;
		if (questionArr.length < currentQuestion){
			$('#questionArea').append("<h2>Thanks for the help! The form has ended!</h2>");
		}else{
	  	$('#questionArea').append("<div class='formQuestion' questionid='" + currentQuestion + "'><h2>" + currentQuestion + ". " + questionArr[currentQuestion - 1]+ "</h2><input onkeydown='registerKey(event)' class='lui-input  lui-input--large'/></div>");
			$('.formQuestion>input').select();
		}
	}
}


firebase.database().ref('nopioid-dynamic-form-questions/').orderByChild('question').on("value", function(snapshot) {
	var json = JSON.parse(JSON.stringify(snapshot.val()));
	for (x in json) {
	  questionArr.push(json[x].question);
	}
	$('#questionArea').append("<div class='formQuestion' questionid='" + 1 + "'><h2>1. " + questionArr[0]+ "</h2><input onkeydown='registerKey(event)' class='lui-input  lui-input--large'/></div>");
	$('.formQuestion>input').select();
});
