(function ($) {
"use strict";
// TOP Menu Sticky

$('.formQuestion>button').click(function(){
	var errors = false
	var inputs = $(".formQuestion>input")
	for (var i = 0; i < inputs.length; i++) {
  	if (inputs[i].value == ""){
			errors = true
			$(inputs[i]).parent().find(".inputerror").css("display", "block");
		}
		if (inputs[i].id == "phonenumber"){
			if(phonenumber(inputs[i].value) == false){
				errors = true
				$(inputs[i]).parent().find(".inputerror").css("display", "block");
			}
		}
		if (inputs[i].id == "email"){
			if(ValidateEmail(inputs[i].value) == false){
				errors = true
				$(inputs[i]).parent().find(".inputerror").css("display", "block");
			}
		}
	}
	var select = $(".formQuestion>select option:selected")[0]
	if (select.value == 0){
		errors = true
		$(select).parent().parent().find(".inputerror").css("display", "block");
	}
	var checkbox = $(".formQuestion>label>input")
	if (checkbox.is(":checked") == false){
		errors = true
		$(checkbox).parent().parent().find(".inputerror").css("display", "block");
	}
	if(errors == false){
		saveToFirebase($("#firstname")[0].value, $("#lastname")[0].value, $("#email")[0].value, $("#clienttype option:selected")[0].value, $("#phonenumber")[0].value)
	}
});
$('.formQuestion>input').keydown(function(){
	if ($(this).value != ""){
		$(this).parent().find(".inputerror").css("display", "none");
	}else{
		$(this).parent().find(".inputerror").css("display", "block");
	}
})
$('.formQuestion>input').keyup(function(){
	if ($(this).attr("id") == "phonenumber"){
		if ($(this).val().length == 3){
			$(this).val($(this).val() + "-");
		}
		if ($(this).val().length == 7){
			$(this).val($(this).val() + "-");
		}
	}
})
$('.formQuestion>select').change(function(){
	$(this).parent().find(".inputerror").css("display", "none");
})
$('.formQuestion>label>input').change(function(){
	if ($(this).is(":checked")){
		$(this).parent().parent().find(".inputerror").css("display", "none");
	}else{
		$(this).parent().parent().find(".inputerror").css("display", "block");
	}
})

function saveToFirebase(firstname, lastname, email, clienttype, phonenumber) {
    var signupObject = {
        firstname: firstname,
				lastname: lastname,
				email: email,
				clienttype: clienttype,
				phonenumber: phonenumber
    };

    firebase.database().ref('nopioid-signup-form').push().set(signupObject)
        .then(function(snapshot) {
            submitFormSuccess(); // some success method
        }, function(error) {
            console.log('Error submitting form: ' + error);
						$("#submiterror").css("display", "block");
        });
}

function submitFormSuccess(){
	$("#firstname")[0].value = "";
	$("#lastname")[0].value = "";
	$("#email")[0].value = "";
	$("#clienttype")[0].value = 0;
	$("#phonenumber")[0].value = "";
	$(".formQuestion>label>input").prop("checked", false);
	$(".inputerror").css("display", "none");
}

function phonenumber(inputtxt)
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.match(phoneno))
        {
      return true;
        }
      else
        {
        return false;
        }
}
function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

})(jQuery);
