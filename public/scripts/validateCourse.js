/* Script to validate the course form, builds error status and error message upon 
 * validation
 * Author: HartCode programmer
 * Date: 08/20/2019
 */
"Use Strict";

function validate(inputData) {
    let resp = {
        status: "",
        errorMsg: []
    };
    resp.status = false;
    // validate courseid 
    // trim() - takes off trailing and leading spaces
    if (inputData.courseid.trim() == "") {
        resp.errorMsg[resp.errorMsg.length] = "Please enter courseId";
    }
    if (inputData.title.trim() == "") {
        resp.errorMsg[resp.errorMsg.length] = "Please enter Title";
    }
    if (inputData.category.trim() == "") {
        resp.errorMsg[resp.errorMsg.length] = "Please enter category";
    }

    if (inputData.location.trim() == "") {
        resp.errorMsg[resp.errorMsg.length] = "Please enter location";
    }
    // format MM/DD/YY validation
    let dateReg = /^\d{2}\/\d{2}\/\d{2}$/;
    if (dateReg.test(inputData.startdate) == false) {
        resp.errorMsg[resp.errorMsg.length] = "Start Date must be MM/DD/YY formatd";
    }
    if (dateReg.test(inputData.enddate) == false) {
        resp.errorMsg[resp.errorMsg.length] = "End Date must be MM/DD/YY formatd";
    }
    if (inputData.meets.trim() == "") {
        resp.errorMsg[resp.errorMsg.length] = "Please enter Meets";
    }

    let numReg = /^\d{1,4}$/;
    if (numReg.test(inputData.fee) == false) {
        resp.errorMsg[resp.errorMsg.length] = "Please enter valid $1 - $9999";
    }

    if (resp.errorMsg.length > 0) {
        resp.status = true;
    }
    return resp;
}