$("#loginButton").click(function(){
	var user = $("#username")[0].value;
	var pass = $("#password")[0].value;
	if (user == "" || pass == ""){
		$("#loginerror").css("display", "block");
	}else{
		firebase.database().ref('registered-users').orderByChild('user').on("value", function(snapshot) {
			var json = JSON.parse(JSON.stringify(snapshot.val()));
			for (x in json) {

				if (json[x].user == user && json[x].password == pass){
					$("#loginForm").css("display", "none");
					$("#dynamicFormSettings").css("display", "block");
					$("#signup-form-details").css("display", "block");
					$("#dynamic-form-details").css("display", "block");
					$("#patient-form-creation").css("display", "block");
				}else{
					$("#loginerror").css("display", "block");
				}
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

$("#addProperty").click(function(){
	$("#patientFormPropertiesArea").append("<div class='patientKeyValue'>" +
		"<div class='patientKeyDiv'>" +
			"<h2>Property</h2><input class='patientKey lui-input  lui-input--large'/>" +
		"</div>" +
		"<div class='patientValueDiv'>" +
			"<h2>Detail</h2><input class='patientValue lui-input  lui-input--large'/>" +
		"</div>" +
	"</div><br/>");
});

$("#createPatient").click(function(){
	var patientProperties = $(".patientKeyValue");
	var dict = {};
	var order = [];
	for(var i = 0; i < patientProperties.length; i++){
		var property = $(patientProperties[i]).find(".patientKeyDiv > input").val();
		var detail = $(patientProperties[i]).find(".patientValueDiv > input").val();
		if (property != "" && detail != "")
			dict[property] = detail;
			order.push(property);
	}
	dict['order'] = order;
	if (Object.keys(dict).length > 1){
		firebase.database().ref('nopioid-sample-patients').push().set(dict)
	      .then(function(snapshot) {
	          $("#patientFormPropertiesArea").empty();
							$("#patientFormPropertiesArea").append("<div class='patientKeyValue'>" +
								"<div class='patientKeyDiv'>" +
									"<h2>Property</h2><input class='patientKey lui-input  lui-input--large'/>" +
								"</div>" +
								"<div class='patientValueDiv'>" +
									"<h2>Detail</h2><input class='patientValue lui-input  lui-input--large'/>" +
								"</div>" +
							"</div><br/>");
	      }, function(error) {
	          console.log('Error creating patient: ' + error);
						$("#addPropertyError").css("display", "block");
	      });
	}else{
		$("#addPropertyError").css("display", "block");
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
	var dynamicFormStatistics = {};

	firebase.database().ref('nopioid-dynamic-form-results').orderByChild('id').on("value", function(snapshot) {
		var json = JSON.parse(JSON.stringify(snapshot.val()));
		for (x in json) {
			if ("Question " + json[x].id in dynamicFormStatistics){
				dynamicFormStatistics["Question " + json[x].id] += 1
			}else{
				dynamicFormStatistics["Question " + json[x].id] = 1
			}
		}
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: Object.keys(dynamicFormStatistics),
		        datasets: [{
		            label: '# of Votes',
		            data: Object.values(dynamicFormStatistics),
		            backgroundColor: 'rgba(255, 99, 132, 0.2)',
		            borderColor: 'rgba(255, 99, 132, 1)',
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero: true
		                }
		            }]
		        }
		    }
		});
		var responses = 0;
		for (x in dynamicFormStatistics){
			responses += dynamicFormStatistics[x];
		}
		var average = Math.floor(responses/Object.keys(dynamicFormStatistics).length);
		$(".baloonAverage").append(average);
	});
