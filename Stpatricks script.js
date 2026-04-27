let requests = JSON.parse(localStorage.getItem("requests")) || [];

/* NAVIGATION */
function goTo(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

/* FORM OPEN/CLOSE */
function openForm(){
    document.getElementById("formBox").style.display = "block";
}

function closeForm(){
    document.getElementById("formBox").style.display = "none";
}

/* SUBMIT ADMISSION FORM */
function submitForm(){
    let name = document.getElementById("name").value;
    let cls = document.getElementById("class").value;
    let msg = document.getElementById("message").value;

    if(name === "" || cls === ""){
        alert("Please fill required fields");
        return;
    }

    let data = {
        name: name,
        class: cls,
        message: msg,
        time: new Date().toLocaleString()
    };

    requests.push(data);
    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Application submitted successfully!");

    let text = `Admission Request%0AName: ${name}%0AClass: ${cls}%0AMessage: ${msg}`;
    window.open("https://wa.me/2348169683044?text=" + text, "_blank");

    closeForm();
}

/* WHATSAPP */
function whatsapp(){
    window.open("https://wa.me/2348169683044", "_blank");
}

/* ================= ADMIN SYSTEM ================= */

const ADMIN_PASSWORD = "patric123"; // CHANGE THIS LATER

function loginAdmin(){
    let pass = document.getElementById("adminPass").value;

    if(pass === ADMIN_PASSWORD){
        sessionStorage.setItem("admin", "true");
        showDashboard();
    } else {
        alert("Wrong password");
    }
}

function showDashboard(){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadRequests();
}

function logout(){
    sessionStorage.removeItem("admin");
    location.reload();
}

function loadRequests(){
    let box = document.getElementById("requests");
    if(!box) return;

    if(requests.length === 0){
        box.innerHTML = "<p>No admissions yet</p>";
        return;
    }

    box.innerHTML = "";

    requests.forEach((r, index) => {
        box.innerHTML += `
            <div style="background:#eee;padding:10px;margin:10px;border-radius:8px;">
                <b>Name:</b> ${r.name}<br>
                <b>Class:</b> ${r.class}<br>
                <b>Message:</b> ${r.message}<br>
                <b>Time:</b> ${r.time}
            </div>
        `;
    });
}

/* AUTO CHECK ADMIN */
window.onload = function(){
    if(sessionStorage.getItem("admin") === "true"){
        showDashboard();
    }
};