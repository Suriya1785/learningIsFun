/* Script to list the form to enter for student to register for selected course from detail pages  
 * Author: HartCode programmer
 * Date: 08/16/2019
 */
"Use Strict";

$(function() {
    // Read URL and get the user selection to build the courseid
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("id");
    let email = urlParams.get("email");
    let studentname = urlParams.get("studentname");
    let errorMsgIdField = $("#errorMsgId");
    // Set course ID in registration form by catching it from URL during onload
    $("#courseid").val(courseid);
    $("#studentname").val(studentname);
    $("#email").val(email);

    // set it as button to have validation in the future if there are no more slots available
    let submitBtnField = $("#submitBtn");
    let cancelBtnField = $("#cancelBtn");

    //Submit button event handler
    submitBtnField.on("click", sendUnRegistrationForm);

    // Cancel button event handler (goes back to courses page)
    cancelBtnField.on("click", function() {
        // Redirect to course page upon clicking on cancel button and opens up on the same page
        let regUrl = "details.html?id=" + courseid;
        window.location.replace(regUrl, "_self");
    })
});

/* function is to send the user entered registration form to server
 * @param: None
 * Calls: None
 */
function sendUnRegistrationForm() {
    // following did not follow camelCase, as name attribute expected 
    let courseid = $("#courseid").val();
    let inputStudentName = $("#studentname").val();
    let inputEmail = $("#email").val();
    let errorMsgIdField = $("#errorMsgId");
    let errorMsg;
    // validate user input before posting to server
    let isDataValid = validateForm(inputStudentName, inputEmail, errorMsgIdField);
    if (isDataValid) {
        // AJAX call to send the form data to server upon serialization 
        $.post("/api/unregister", $("#UnRegisterForm").serialize(),
                function(data) {
                    let regUrl = "details.html?id=" + courseid;
                    window.location.replace(regUrl);
                })
            .fail(function() {
                errorMsg = "Failure to get server data, please retry"
                errorMsgIdField.html(errorMsg);
                errorMsgIdField.addClass("badInput");
            });
        return false;
    }
}

/* function is to validate the filled form and build error message block if applicable 
 * @param: None
 * Calls: None
 */
function validateForm(inputStudentName, inputEmail, errorMsgIdField) {
    let errorMsg = [];
    let isError = false;
    let temp = "";
    // validate empty student name
    // trim() - takes off trailing and leading spaces
    if (inputStudentName.trim() == "") {
        errorMsg[errorMsg.length] = "Please enter Student name";
        isError = true;
    }
    //validate e-mail address 
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) == false) {
        errorMsg[errorMsg.length] = "Please enter valid email";
        isError = true;
    }
    if (isError == true) {
        // Read error message array and build the error block
        // jquery each function loop
        $.each(errorMsg, function(key, value) {
                temp = temp + "</br>" + value;
            })
            // for loop function to run through error message array
            // let temp = "";
            // for (let i = 0; i < errorMsg.length; i++) {
            //     temp = temp + errorMsg[i] + "</br>";
            // }
        errorMsgIdField.html(temp);
        errorMsgIdField.addClass("badInput");
        return false;
    } else {
        return true;
    }
}