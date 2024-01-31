let teachersArr = JSON.parse(localStorage.getItem('teachersArr')) || [];

init();
function init() {
    document.getElementById("logIn").addEventListener('click', logInData);
}

function logInData(e) {
    const teacherID = document.getElementById("TID").value;
    if (teacherID.length != 9) {
        alert("not valid id");
        e.preventDefault();
    }
    const teacherCodeTeacher = document.getElementById("TteacherCode").value;

    if (teacherID && teacherCodeTeacher) {
        if (!isTeacherExist(teacherID, teacherCodeTeacher)) {
            alert("There is not such user, try again or sign up");
            e.preventDefault();
        }
    }
    else {
        alert("You must enter ID and teacher code");
        e.preventDefault();
    }
}

function isTeacherExist(teacherID, teacherCodeTeacher) {
    for (let i = 0; i < teachersArr.length; i++) {
        if (teachersArr[i].ID === teacherID && teachersArr[i].code === teacherCodeTeacher) {
            return true;
        }
    }
    return false;
}



