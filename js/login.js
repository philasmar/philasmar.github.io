$("#loginButton").click(function(){
	var user = $("#username")[0].value;
	var pass = $("#password")[0].value;
	if (user == "" || pass == ""){
		$("#loginerror").css("display", "block");
	}else{
		firebase.database().ref('registered-users/' + user).orderByChild('user').on("value", function(snapshot) {
		    if (pass == snapshot.val().password){
					$("#loginForm").css("display", "none");
					$("#dynamicFormSettings").css("display", "block");
				}else{
					$("#loginerror").css("display", "block");
				}
		});
	}
});

$("#addQuestion").click(function(){
	var question = $("#newquestion")[0].value;
	if(question==""){
		$("#questionerror").css("display", "block");
	}else{
		$("#questionerror").css("display", "none");
		var question = {
        question: question
    };
		firebase.database().ref('nopioid-dynamic-form-questions').push().set(question)
        .then(function(snapshot) {
            $("#newquestion")[0].value = ""; // some success method
        }, function(error) {
            console.log('Error submitting form: ' + error);
						$("#questionerror").css("display", "block");
        });
	}
});
