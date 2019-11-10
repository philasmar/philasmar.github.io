firebase.database().ref('nopioid-sample-patients').on("value", function(snapshot) {
	var json = JSON.parse(JSON.stringify(snapshot.val()));
	for (x in json) {
		// var clienttype = ""
		// if (json[x].clienttype == "1"){
		// 	clienttype = "Patient";
		// }else{
		// 	clienttype = "Healthcare Provider";
		// }
		var details = "";
		for (item in json[x].order){
			details +=
					"<div class='patient-property'>" +
						"<div class='patient-detail-title'>" + json[x].order[item] + ": " + json[x][json[x].order[item]] + "</div>" +
					"</div><br/>";
		}
		for (item in json[x].order){
			$(".patients-detail-container").append("<div class='patient-detail'>" +
				"<div class='patient-detail-highlight'>" + json[x][json[x].order[item]] + "</div>" +
				"<div class='patient-detail-breakdown'>" +
						details +
						"<h4>Insert recommendation below </h4><input class='patientRecommendation lui-input  lui-input--large'/>" +
				"</div>" +
			"</div>");
			break;
		}
		// for (y in json[x]){
		// 	details +=
		// 			"<div class='patient-property'>" +
		// 				"<div class='patient-detail-title'>" + y + ": " + json[x][y] + "</div>" +
		// 			"</div><br/>";
		// }
		// for (y in json[x]){
		// 	$(".patients-detail-container").append("<div class='patient-detail'>" +
		// 		"<div class='patient-detail-highlight'>" + json[x][y] + "</div>" +
		// 		"<div class='patient-detail-breakdown'>" +
		// 				details +
		// 				"<h4>Insert recommendation below </h4><input class='patientRecommendation lui-input  lui-input--large'/>" +
		// 		"</div>" +
		// 	"</div>");
		// 	break;
		// }
	}

	$(".patient-detail-highlight").click(function(){
		if ($(this).parent().find(".patient-detail-breakdown").css("display") == "none"){
			$(this).parent().find(".patient-detail-breakdown").css("display", "flex");
		}else{
			$(this).parent().find(".patient-detail-breakdown").hide();
		}
	});

	$(".patientRecommendation").keydown(function(e){
		var input = $(this);
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) {
			if($(this).val() != ""){
				var rec = {
		        recommendation: $(this).val()
		    };
				firebase.database().ref('nopioid-sample-patients-recommendations').push().set(rec)
		        .then(function(snapshot) {
		            $(input).val("");
		        }, function(error) {
		            console.log('Error submitting form: ' + error);

		        });
			}
		}
	});
});
