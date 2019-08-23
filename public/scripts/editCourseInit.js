/* Script to list the form to enter details for new course to be added
 * Author: HartCode programmer
 * Date: 08/21/2019
 */
"Use Strict";
$(function() {
    let errorMsgIdField = $("#errorMsgId");
    // set it as button to have validation in the future if there are no more slots available
    let submitBtnField = $("#submitBtn");
    let resetBtnField = $("#resetBtn");
    let cancelBtnField = $("#cancelBtn");
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");

    // Store the JSON data in javaScript objects.  
    $.getJSON("/api/courses/" + courseId, function(data) {
            courseDetails = data;
        })
        .done(function() {
            // upon successful AJAX call perform the below
            loadCourseDetails(courseDetails);
        })
        .fail(function() {
            // upon failure response, send message to user
            errorMsg = "Failure to get server data, please refresh the page"
            errorMsgIdField.html(errorMsg);
            errorMsgIdField.addClass("badInput");
        });

    //Submit button event handler
    submitBtnField.on("click", sendCourseForm);

    // Reset button event handler
    resetBtnField.on("click", function() {
        // jquery does not have any reset method, get the form through jquery and reset through javascript
        $("#editCourseForm").get(0).reset();
        $("#errorMsgId").empty();

    })

    // Cancel button event handler (goes back to courses page)
    cancelBtnField.on("click", function() {
        // Redirect to course page upon clicking on cancel button and opens up on the same page
        let regUrl = "courses.html";
        window.location.replace(regUrl, "_self");
    })
});

/* function is to load course details during onload in the dropdown
 * @param courseDetails (javastring object) - contains selected course detail
 * calls: createTableHead(), createTableBody() and insertTableRow   
 */
function loadCourseDetails(courseDetails) {
    $("#courseid").val(courseDetails.CourseId);
    $("#title").val(courseDetails.Title);
    $("#category").val(courseDetails.Category);
    $("#location").val(courseDetails.Location);
    $("#startdate").val(courseDetails.StartDate);
    $("#enddate").val(courseDetails.EndDate);
    $("#meets").val(courseDetails.Meets);
    $("#fee").val(courseDetails.Fee);
}


/* function is to send the user entered registration form to server
 * @param: None
 * Calls: None
 */
function sendCourseForm() {
    // following did not follow camelCase, as name attribute expected 
    let errorMsgIdField = $("#errorMsgId");
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");
    let errorMsg;
    // validate user input before posting to server
    let isDataValid = validateForm(errorMsgIdField);
    if (isDataValid) {
        // AJAX call to send the form data to server upon serialization 
        // Different types of Ajax call (old way)
        // $.ajax({
        //     url: "/api/courses",
        //     method: "PUT",
        //     data: $("#editCourseForm").serialize(),
        //     success: function(data) {
        //         console.log('success');
        //         let regUrl = "details.html?id=" + courseId;
        //         window.location.replace(regUrl);
        //     }
        // });
        $.ajax({
            url: "/api/courses",
            type: "PUT",
            data: $("#editCourseForm").serialize()
                // contentType: 'application/json'
        }).done(function() {
            let regUrl = "details.html?id=" + courseId;
            window.location.replace(regUrl);
        }).fail(function() {
            errorMsg = "Failure to get server data during course lookup, please retry"
            errorMsgIdField.html(errorMsg);
            errorMsgIdField.addClass("badInput");
        })
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