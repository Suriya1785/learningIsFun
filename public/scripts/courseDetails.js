/* Script to list the course details and registered students for selected course from course page & redirect
 * for registration page
 * Author: HartCode programmer
 * Date: 08/16/2019
 */
"Use Strict";
/* window onload/ready function to load page with course details and assign reference to event handler */
$(function() {
    let urlParams = new URLSearchParams(location.search);
    let tempId = urlParams.get("id");
    let isDelStudent;
    //Usage of passing parms in URL to drive multiple actions, in this case, it is with 'del' and 'id'
    delOprlength = tempId.indexOf('del');
    if (delOprlength != -1) {
        courseId = tempId.substr(0, delOprlength);
        isDelStudent = true;
    } else {
        courseId = tempId;
    }
    // course id is pulled from url for server call
    let errorMsgIdField = $("#errorMsgId");
    // set it as button to have validation in the future if there are no more slots available
    let registerBtnField = $("#registerBtn");
    let delBtnField = $("delBtn");
    let cancelBtnField = $("cancelBtn");

    // Store the JSON data in javaScript objects.  
    $.getJSON("/api/courses/" + courseId, function(data) {
            courseDetails = data;
        })
        .done(function() {
            // upon successful AJAX call perform the below
            loadCourseDetails(courseDetails);
            loadStudentList(courseDetails, errorMsgIdField, courseId)

        })
        .fail(function() {
            // upon failure response, send message to user
            errorMsg = "Failure to get server data, please refresh the page"
            errorMsgIdField.html(errorMsg);
            errorMsgIdField.addClass("badInput");
        });

    // Modal changes
    $('#unRegisterDiv').on('shown.bs.modal', function() {
        console.log("true");
        $("#unRegisterDiv").modal(focus);
    });


    // Register button event handler
    registerBtnField.on("click", function() {
        // Redirect to registration page upon clicking on registration and opens up on the same page
        let regUrl = "register.html?id=" + courseId;
        window.location.replace(regUrl, "_self");
    })
})

/* function is to load registered student details during onload process
 * @param courseDetails (javastring object) - contains selected course detail
 * @param errorMsgIdField (jquery reference to error message id) - sets error/informational message
 * calls: createTableVerticalHead(), createTableBody()
 */
function loadStudentList(courseDetails, errorMsgIdField, courseId) {
    let table = $("#studentsList");
    // set class for table through bootstrap 4
    table.addClass("table container table-responsive table-striped mt-2");
    let tableHeadId = "studentTheadId";
    let tableBodyId = "studentTbodyId";
    // checks for registered students, if not, set an promotional message to user
    if (courseDetails.Students.length == 0) {
        errorMsg = "No Student registered yet! Get Started to grab available Sheet";
        errorMsgIdField.html(errorMsg);
    } else {
        // create student table head and body & assign ID for course table
        createStudentTableHead(table, tableHeadId);
        createTableBody(table, tableBodyId);
        // Run through student object array and populate student registered list table
        $.each(courseDetails.Students, function(key, value) {
            // let anchorId = 'a' + courseId + key;
            // let uri = 'unregister.html?id=' + courseId + '&studentname=' + value.StudentName + '&email=' + value.Email;
            // uri = encodeURI(uri);
            // table.append("<tr><td>" + value.StudentName + "</td><td>" + value.Email + "</td><td><a id='" + anchorId + "' class='btn-sm btn-danger' href='" + uri + "'><i class='fa fa-remove'></i></a></td></tr>");
            // // Unregister Click event handler assignment
            // $(anchorId).on("click", function() {
            //     deleteStudent();
            // })
            let anchorId = 'a' + courseId + key;
            table.append("<tr><td>" + value.StudentName + "</td><td>" + value.Email + "</td><td><a id='" + anchorId + "' class='btn-sm btn-danger' data-toggle='modal' data-target='#unRegisterDiv' href=#><i class='fa fa-remove'></i></a></td></tr>");
            // Unregister Click event handler assignment
            $("#" + anchorId).on("click", function() {
                // Modal pop up and deletion for unregistration
                $("#courseid").val(courseDetails.CourseId);
                $("#studentname").val(value.StudentName);
                $("#email").val(value.Email);

                // Cancel button event handler assignment for modal and goes back to same delted item 
                $("#cancelBtn").on("click", function() {
                    let regUrl = "details.html?id=" + $("#courseid").val();
                    window.location.replace(regUrl, "_self");
                });
                // Delete button event handler (goes back to courses details page)
                $("#delBtn").on("click", function() {
                    deleteStudent();
                });
            })
        })
    }
}

// In-progress
function deleteStudent() {
    // AJAX call to send the form data to server upon serialization 
    let formCollection = $("#unRegisterForm");
    $.post("/api/unregister", $("#unRegisterForm").serialize(),
            function(data) {
                let regUrl = "details.html?id=" + $("#courseid").val();
                window.location.replace(regUrl);
            })
        .done(function() {
            console.log("Success");
        })
        .fail(function() {
            errorMsg = "Failure to get server data, please retry"
            errorMsgIdField.html(errorMsg);
            errorMsgIdField.addClass("badInput");
        });
    return false;
}

/* function is to load course details during onload in the dropdown
 * @param courseDetails (javastring object) - contains selected course detail
 * calls: createTableHead(), createTableBody() and insertTableRow   
 */
function loadCourseDetails(courseDetails) {
    let table = $("#coursesDetails");
    let tableBodyId = "courseTbodyId"
    let tableHeadId = "courseTheadId"
        // set class for table through bootstrap 4
    table.addClass("table table-responsive table-striped mt-2");
    // create table head and body & assign ID for course table
    createTableHead(table, tableHeadId);
    createTableBody(table, tableBodyId);

    // Create table rows for the selected course & call the function with data to insert the row
    data1 = "Course ID";
    data2 = courseDetails.CourseId;
    insertTableRow(data1, data2, table);
    data1 = "Title";
    data2 = courseDetails.Title;
    insertTableRow(data1, data2, table);
    data1 = "Category";
    data2 = courseDetails.Category;
    insertTableRow(data1, data2, table);
    data1 = "Location";
    data2 = courseDetails.Location;
    insertTableRow(data1, data2, table);
    data1 = "Start Date";
    data2 = courseDetails.StartDate;
    insertTableRow(data1, data2, table);
    data1 = "End Date";
    data2 = courseDetails.EndDate;
    insertTableRow(data1, data2, table);
    data1 = "Meets";
    data2 = courseDetails.Meets;
    insertTableRow(data1, data2, table);
    data1 = "Fee";
    data2 = courseDetails.Fee;
    insertTableRow(data1, data2, table);
}

/* function is to insert table row with two table columns and table reference to be inserted  
 * @param data1 (string) - table data (td1 of row)
 * @param data2 (string) - table data (td2 of row)
 * @param table (table reference) - contains jQuery reference to table
 * calls: None
 */
function insertTableRow(data1, data2, table) {
    table.append("<tr><td class='font-weight-bold'>" + data1 + "</td><td>" + data2 + "</td></tr>");
}

/* function is to create a table horizontal dummy head
 * @param table (table reference) - contains table reference to course table
 * @param tableHeadId (string) - contains the id of student course head
 */
function createTableHead(table, tableHeadId) {
    let thead = $(tableHeadId);
    // check for course table head, if it does not exist create it.
    if (thead.length == 0) {
        table.append("<thead id='" + tableHeadId + "'></thead>");
    }
}

/* function is to create a table body, if not available  
 * @param table (table reference) - contains table reference to student table
 * @param tableBodyId (string) - contains the id of student table body
 * calls: None
 */
function createTableBody(table, tableBodyId) {
    // create tbody if it does not exist and assign an ID, if already exists, clear them  
    // table.innerHTML = " "; use if we want to clear the whole table
    let tbody = $(tableBodyId);
    // check for tbody, if it does not exist, create it.
    if (tbody.length == 0) {
        table.append("<tbody id='" + tableBodyId + "'></tbody>")
    }
}

/* function is to create student table head to support many items and one header
 * @param table (table reference) - contains table reference to student table
 * @param tableHeadId (string) - contains the id of student table head
 * calls: None
 */
function createStudentTableHead(table, tableHeadId) {
    // check for table head, if does not exist, create it.
    let thead = $(tableHeadId);
    if (thead.length == 0) {
        table.append("<thead id='" + tableHeadId + "'><tr><th>Student Name</th><th>E-mail</th><th>Action</th></tr></thead>");
    }
}