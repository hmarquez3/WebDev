function validate(e) {
	//	Hides all error elements on the page
	hideAllErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}

	return true;
}

function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear Answers?' + ' Are you sure?')) {
		// Ensure all error fields are hidden
		hideAllErrors();

		// Set focus to the first text field on the page
		document.getElementById("fname").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

function formHasErrors() {
	let errorFlag = false;
	let requiredFields = ["Question", "videoGameQuestionsGenre", "videoGameQuestionsFavourite", "videoGameQuestionsFavouriteSeries",
	"videoGameQuestionsFavouriteCharacter", "videoGameQuestionsFavouriteVillain", "videoGameQuestionsWorst", "BiowareQuestion", "BiowareAnswer", "videoGameQuestionsImapct"];

	for (let i = 0; i < requiredFields.length, i++;){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
			if(!errorFlag){
				textField.focus();
				textField.select();
			}
			errorFlag = true;
		}

		let radioButtons = ["Yes", "No", "BiowareYes", "BiowareNo", "DragonAge", "MassEffect"];
		let radioButtonsCheck = false;
		for(let i = 0; i < radioButtons.length && !radioButtonsCheck; i++){
			if(document.getElementById(radioButtons[i]).check){
				radioButtonsCheck = true;
			}
		}

		if(!radioButtonsCheck){
			document.getElementById("Question_error").style.display = "block";
			document.getElementById("BiowareQuestion_error").style.display = "block";
			document.getElementById("BiowareAnswer_error").style.display = "block";
			errorFlag = true;
		}
	}
}

function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || trim(fieldElement.value) == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors() {
	let errTags = document.getElementsByClassName("error");
	for(let i = 0; i < errTags.length; i++){
		errTags[i].style.display = "none";
	}
}


function trim(str){
	return str.replace(/^\s+|\s+$/g, "");
}

function showVideoGameAnswer(videoGameAnswer){
	if(videoGameAnswer == "Yes"){
		document.getElementById("videoGameQuestions").style.display = "block";
	} else{
		document.getElementById("videoGameQuestions").style.display = "none";
	}
}

function hideVideoGameAnswers(){
	document.getElementById("videoGameQuestions").style.display = "none";
}

function showBiowareAnswer(biowareAnswer){
	document.getElementById("BiowareAnswerHeading").style.display = "block"
	if(biowareAnswer == "BiowareYes"){
		document.getElementById("BiowareAnswer").style.display = "block";
	} else{
		document.getElementById("BiowareAnswer").style.display = "none";
	}
}

function hideBiowareAnswers(){
	document.getElementById("BiowareAnswerHeading").style.display = "none"
	document.getElementById("BiowareAnswer").style.display = "none";
}

function load(){
	document.getElementById("survey_form").addEventListener("submit", validate);

	document.getElementById("survey_form").reset();

	document.getElementById("survey_form").addEventListener("reset", resetForm);

	document.getElementById("Yes").addEventListener("click", function() {
		showVideoGameAnswer("Yes");
	} );

	document.getElementById("No").addEventListener("click", hideVideoGameAnswers);

	document.getElementById("BiowareYes").addEventListener("click", function() {
		showBiowareAnswer("BiowareYes");
	} );

	document.getElementById("BiowareNo").addEventListener("click", hideBiowareAnswers);

}

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", load);
