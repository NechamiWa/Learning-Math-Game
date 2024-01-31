let studentsArr = JSON.parse(localStorage.getItem('studentsArr')) || [];

init();
function init() {
    document.getElementById("Submit").addEventListener('click', saveStudentData);
}

function saveStudentData(e) {
    const studentFname = document.getElementById("fname").value;
    const studentLname = document.getElementById("lname").value;
    const studentID = document.getElementById("ID").value;
    
    if(studentID.length!=9){
        alert("not valid id");
        e.preventDefault();
    }
    if (studentFname && studentID) {
        if (isStudentExist(studentID)) {
            alert("You have an account, log in");
            e.preventDefault();
        }
        if(studentID.length==9&&!isStudentExist(studentID)) {
            studentsArr.push({ Fname: studentFname, Lname: studentLname, ID: studentID });
            localStorage.setItem('studentsArr', JSON.stringify(studentsArr));
        }
    }
    else {
        alert("You must enter ID and your name");
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