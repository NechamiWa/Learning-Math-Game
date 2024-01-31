let studentsArr = JSON.parse(localStorage.getItem('studentsArr')) || [];

init();
function init() {
    document.getElementById("SlogIn").addEventListener('click', logInStudentData);
}

function logInStudentData(e) {
    const studentID = document.getElementById("ID").value;
    if(studentID.length!=9){
        alert("not valid id");
        e.preventDefault();
    }

    if (studentID) {
        if (!isStudentExist(studentID)) {
            alert("There is not such user, try again or sign up");
            e.preventDefault();
        }

    }
    else {
        alert("You must enter ID");
        e.preventDefault();
    }
}

function isStudentExist(studentID) {
    for (let index = 0; index < studentsArr.length; index++) {
        if ((studentsArr[index].ID == studentID))
            return true;
    }
    return false;
}