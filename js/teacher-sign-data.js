let teachersArr = JSON.parse(localStorage.getItem('teachersArr')) || [];

init();
function init() {
    document.getElementById("Submit").addEventListener('click', saveTeacherData);
}

function saveTeacherData(e) {
    const teacherFname = document.getElementById("Tfname").value;
    const teacherLname = document.getElementById("Tlname").value;
    const teacherID = document.getElementById("TID").value;
    const teacherEmail = document.getElementById("Temail").value;
    const teacherCode = document.getElementById("Tcode").value;

    if (teacherFname && teacherLname && teacherID && teacherEmail && teacherCode) {
        if (teacherID.length != 9) {
            alert("not valid id");
            e.preventDefault();
        }
        if (!isValidEmail(teacherEmail)) {
            alert("not valid email");
            e.preventDefault();
        }
        if (isTeacherExist(teacherID, teacherCode)) {
            alert("You have an account, log in");
            e.preventDefault();
        }
        if (isValidEmail(teacherEmail) && teacherID.length == 9 && !isTeacherExist(teacherID, teacherCode)) {
            teachersArr.push({ Fname: teacherFname, Lname: teacherLname, ID: teacherID, Email: teacherEmail, code: teacherCode });
            localStorage.setItem('teachersArr', JSON.stringify(teachersArr));
        }
    }
    else {
        alert("You must enter all details")
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

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
