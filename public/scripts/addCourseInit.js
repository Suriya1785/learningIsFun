/* Script to list the form to enter details for new course to be added
 * Author: HartCode programmer
 * Date: 08/20/2019
 */
"Use Strict";
$(function() {
    let errorMsgIdField = $("#errorMsgId");
    // set it as button to have validation in the future if there are no more slots available
    let submitBtnField = $("#submitBtn");
    let resetBtnField = $("#resetBtn");
    let cancelBtnField = $("#cancelBtn");
    let categoryField = $("#category");
    let listOfCategoriesObjs;

    // Store the JSON category data by making AJAX - JSON call to load the category dropdown during onload.
    $.getJSON("/api/categories", function(data) {
            listOfCategoriesObjs = data;
        })
        // on success load the page with the dropdown
        .done(function() {
            loadCategoriesDropDown(listOfCategoriesObjs, categoryField);
        })
        // on failure, Request user to retry
        .fail(function() {
            errorMsg = "Failure to get server data, please retry"
            errorMsgIdField.html(errorMsg);
            errorMsgIdField.addClass("badInput");
        });

    //Submit button event handler
    submitBtnField.on("click", sendNewCourseForm);

    // Reset button event handler
    resetBtnField.on("click", function() {
        // jquery does not have any reset method, get the form through jquery and reset through javascript
        $("#newCourseForm").get(0).reset();
        $("#errorMsgId").empty();
    })

    // Cancel button event handler (goes back to courses page)
    cancelBtnField.on("click", function() {
        // Redirect to course page upon clicking on cancel button and opens up on the same page
        let regUrl = "courses.html";
        window.location.replace(regUrl, "_self");
    })
});

/* Event Handler function to load categories Menu dropdown during windows Onload 
 * @param = listOfCategoriesObjs (javascript object) - contains list of category and value from server  
 * @param = categoryField (dropdown) - contains reference to course category dropdown
 * calls to None
 */
function loadCategoriesDropDown(listOfCategoriesObjs, categoryField) {
    for (let i = 0; i < listOfCategoriesObjs.length; i++) {
        categoryField.append($("<option></option>").val(listOfCategoriesObjs[i].Value).html(listOfCategoriesObjs[i].Category));
    }
}

/* function is to send the user entered registration form to server
 * @param: None
 * Calls: None
 */
function sendNewCourseForm() {
    // following did not follow camelCase, as name attribute expected 
    let errorMsgIdField = $("#errorMsgId");
    let errorMsg;
    // validate user input before posting to server
    let isDataValid = validateForm(errorMsgIdField);
    if (isDataValid) {
        // AJAX call to send the form data to server upon serialization 
        $.post("/api/courses", $("#newCourseForm").serialize(),
                function(data) {
                    let regUrl = "courses.html";
                    window.location.replace(regUrl);
                })
            .success(function() {
                console.log("success");
            })
            .fail(function() {
                errorMsg = "Failure to get server data, please retry"
                errorMsgIdField.html(errorMsg);
                errorMsgIdField.addClass("badInput");
            });
        return false;
    }
}

/* function is to build javascript object and call common validate function
 *  and read the error status and build error message appropriately
 * @param: None
 * Calls: validate()
 */
function validateForm(errorMsgIdField) {
    let temp = "";
    let inputData = {
        courseid: "",
        title: "",
        category: "",
        location: "",
        startdate: "",
        enddate: "",
        meets: "",
        fee: ""
    };
    inputData.courseid = $("#courseid").val();
    inputData.title = $("#title").val();
    inputData.category = $("#category").val();
    inputData.location = $("#location").val();
    inputData.startdate = $("#startdate").val();
    inputData.enddate = $("#enddate").val();
    inputData.meets = $("#meets").val();
    inputData.fee = $("#fee").val();
    // Send input form data and create javascript object
    let resp = validate(inputData);

    if (resp.status == true) {
        // Run through error message array and build message and update the ta
        $.each(resp.errorMsg, function(key, value) {
            temp = temp + "</br>" + value;
        })
        errorMsgIdField.html(temp);
        errorMsgIdField.addClass("badInput");
        return false;
    } else {
        return true;
    }
}