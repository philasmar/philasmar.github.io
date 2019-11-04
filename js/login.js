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
					$("#signup-form-details").css("display", "block");
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

firebase.database().ref('nopioid-signup-form').orderByChild('firstname').on("value", function(snapshot) {
	var json = JSON.parse(JSON.stringify(snapshot.val()));
	for (x in json) {
		var clienttype = ""
		if (json[x].clienttype == "1"){
			clienttype = "Patient";
		}else{
			clienttype = "Healthcare Provider";
		}
		$(".signup-detail-container").append("<div class='signup-detail'>" +
			"<div class='signup-detail-highlight'>" + json[x].firstname + " " + json[x].lastname + "</div>" +
			"<div class='signup-detail-breakdown'>" +
					"<div class='client-detail'>" +
						"<div class='client-detail-title'>First Name</div>" +
						"<div class='client-detail-description'>" + json[x].firstname + "</div>" +
					"</div>" +
					"<div class='client-detail'>" +
						"<div class='client-detail-title'>Last Name</div>" +
						"<div class='client-detail-description'>" + json[x].lastname + "</div>" +
					"</div>" +
					"<div class='client-detail'>" +
						"<div class='client-detail-title'>Email</div>" +
						"<div class='client-detail-description'>" + json[x].email + "</div>" +
					"</div>" +
					"<div class='client-detail'>" +
						"<div class='client-detail-title'>Client Type</div>" +
						"<div class='client-detail-description'>" + clienttype + "</div>" +
					"</div>" +
					"<div class='client-detail'>" +
						"<div class='client-detail-title'>Phone Number</div>" +
						"<div class='client-detail-description'>" + json[x].phonenumber + "</div>" +
					"</div>" +
			"</div>" +
		"</div>");
	}

	$(".signup-detail-highlight").click(function(){
		if ($(this).parent().find(".signup-detail-breakdown").css("display") == "none"){
			$(this).parent().find(".signup-detail-breakdown").css("display", "flex");
		}else{
			$(this).parent().find(".signup-detail-breakdown").hide();
		}
	});
});
