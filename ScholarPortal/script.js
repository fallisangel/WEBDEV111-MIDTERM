function showLogin() {
    document.getElementById("login-form").style.display = "block"
    document.getElementById("register-form").style.display = "none"
    document.getElementById("tab-login").className = "active"
    document.getElementById("tab-register").className = ""
}

function showRegister() {
    document.getElementById("register-form").style.display = "block"
    document.getElementById("login-form").style.display = "none"
    document.getElementById("tab-register").className = "active"
    document.getElementById("tab-login").className = ""
}
var tabLogin = document.getElementById("tab-login")
var tabRegister = document.getElementById("tab-register")

if (tabLogin != null) {
    tabLogin.onclick = showLogin
}

if (tabRegister != null) {
    tabRegister.onclick = showRegister
}


var loginBtn = document.getElementById("login-btn")

if (loginBtn != null) {
    loginBtn.onclick = function () {

        var studentId = document.getElementById("login-id").value
        var password = document.getElementById("login-password").value

        var isValid = true

        if (studentId == "") {
            document.getElementById("login-id-error").textContent = "Student ID is required."
            document.getElementById("login-id-error").className = "error-msg show"
            document.getElementById("login-id").className = "error"
            isValid = false
        } else if (studentId.length < 6) {
            document.getElementById("login-id-error").textContent = "Student ID must be at least 6 characters."
            document.getElementById("login-id-error").className = "error-msg show"
            document.getElementById("login-id").className = "error"
            isValid = false
        } else {
            document.getElementById("login-id-error").className = "error-msg"
            document.getElementById("login-id").className = ""
        }

        if (password == "") {
            document.getElementById("login-password-error").textContent = "Password is required."
            document.getElementById("login-password-error").className = "error-msg show"
            document.getElementById("login-password").className = "error"
            isValid = false
        } else if (password.length < 6) {
            document.getElementById("login-password-error").textContent = "Password must be at least 6 characters."
            document.getElementById("login-password-error").className = "error-msg show"
            document.getElementById("login-password").className = "error"
            isValid = false
        } else {
            document.getElementById("login-password-error").className = "error-msg"
            document.getElementById("login-password").className = ""
        }
        if (isValid == true) {
            document.getElementById("login-success").textContent = "Login successful! Redirecting..."
            document.getElementById("login-success").className = "success-msg show"
        }
    }
}

var registerBtn = document.getElementById("register-btn")

if (registerBtn != null) {
    registerBtn.onclick = function () {

        var firstName = document.getElementById("reg-firstname").value
        var lastName  = document.getElementById("reg-lastname").value
        var studentId = document.getElementById("reg-id").value
        var email     = document.getElementById("reg-email").value
        var password  = document.getElementById("reg-password").value
        var confirm   = document.getElementById("reg-confirm").value

        var isValid = true
        if (firstName == "") {
            document.getElementById("reg-firstname-error").textContent = "First name is required."
            document.getElementById("reg-firstname-error").className = "error-msg show"
            document.getElementById("reg-firstname").className = "error"
            isValid = false
        } else {
            document.getElementById("reg-firstname-error").className = "error-msg"
            document.getElementById("reg-firstname").className = ""
        }
        if (lastName == "") {
            document.getElementById("reg-lastname-error").textContent = "Last name is required."
            document.getElementById("reg-lastname-error").className = "error-msg show"
            document.getElementById("reg-lastname").className = "error"
            isValid = false
        } else {
            document.getElementById("reg-lastname-error").className = "error-msg"
            document.getElementById("reg-lastname").className = ""
        }

        if (studentId == "") {
            document.getElementById("reg-id-error").textContent = "Student ID is required."
            document.getElementById("reg-id-error").className = "error-msg show"
            document.getElementById("reg-id").className = "error"
            isValid = false
        } else if (studentId.length < 6) {
            document.getElementById("reg-id-error").textContent = "Student ID must be at least 6 characters."
            document.getElementById("reg-id-error").className = "error-msg show"
            document.getElementById("reg-id").className = "error"
            isValid = false
        } else {
            document.getElementById("reg-id-error").className = "error-msg"
            document.getElementById("reg-id").className = ""
        }

        if (email == "") {
            document.getElementById("reg-email-error").textContent = "Email is required."
            document.getElementById("reg-email-error").className = "error-msg show"
            document.getElementById("reg-email").className = "error"
            isValid = false
        } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
            document.getElementById("reg-email-error").textContent = "Please enter a valid email."
            document.getElementById("reg-email-error").className = "error-msg show"
            document.getElementById("reg-email").className = "error"
            isValid = false
        } else {
            document.getElementById("reg-email-error").className = "error-msg"
            document.getElementById("reg-email").className = ""
        }

        if (password == "") {
            document.getElementById("reg-password-error").textContent = "Password is required."
            document.getElementById("reg-password-error").className = "error-msg show"
            document.getElementById("reg-password").className = "error"
            isValid = false
        } else if (password.length < 6) {
            document.getElementById("reg-password-error").textContent = "Password must be at least 6 characters."
            document.getElementById("reg-password-error").className = "error-msg show"
            document.getElementById("reg-password").className = "error"
            isValid = false
        } else {
            document.getElementById("reg-password-error").className = "error-msg"
            document.getElementById("reg-password").className = ""
        }

        if (confirm == "") {
            document.getElementById("reg-confirm-error").textContent = "Please confirm your password."
            document.getElementById("reg-confirm-error").className = "error-msg show"
            document.getElementById("reg-confirm").className = "error"
            isValid = false
        } else if (confirm != password) {
            document.getElementById("reg-confirm-error").textContent = "Passwords do not match."
            document.getElementById("reg-confirm-error").className = "error-msg show"
            document.getElementById("reg-confirm").className = "error"
            isValid = false
        } else {
            document.getElementById("reg-confirm-error").className = "error-msg"
            document.getElementById("reg-confirm").className = ""
        }

        if (isValid == true) {
            document.getElementById("register-success").textContent = "Account created! You can now log in."
            document.getElementById("register-success").className = "success-msg show"
        }
    }
}


var totalFee = 0

var addButtons = document.querySelectorAll(".btn-add")

for (var i = 0; i < addButtons.length; i++) {

    addButtons[i].onclick = function () {

        var name  = this.getAttribute("data-name")
        var units = this.getAttribute("data-units")
        var fee   = Number(this.getAttribute("data-fee"))
        var rows = document.querySelectorAll(".semester-row")
        var alreadyAdded = false

        for (var j = 0; j < rows.length; j++) {
            if (rows[j].getAttribute("data-name") == name) {
                alreadyAdded = true
            }
        }

        if (alreadyAdded == true) {
            alert(name + " is already in your semester.")
            return
        }

        document.getElementById("semester-empty").style.display = "none"

        var newRow = document.createElement("tr")
        newRow.className = "semester-row"
        newRow.setAttribute("data-name", name)
        newRow.setAttribute("data-fee", fee)

        newRow.innerHTML = "<td>" + name + "</td>" +
                           "<td>" + units + " units</td>" +
                           "<td>Php " + fee.toLocaleString() + "</td>" +
                           "<td><button onclick='removeCourse(this)' style='background:#fee2e2; color:#b91c1c; border:none; border-radius:4px; padding:4px 10px; cursor:pointer; font-size:0.8rem;'>Remove</button></td>"

        document.getElementById("semester-list").appendChild(newRow)

        totalFee = totalFee + fee
        document.getElementById("semester-total").textContent = "Php " + totalFee.toLocaleString()

        this.textContent = "Added"
        this.disabled = true
        this.style.background = "#e6f4ea"
        this.style.color = "#276749"
    }
}

function removeCourse(button) {

    var row = button.parentNode.parentNode
    var name = row.getAttribute("data-name")
    var fee  = Number(row.getAttribute("data-fee"))


    row.parentNode.removeChild(row)

    totalFee = totalFee - fee
    document.getElementById("semester-total").textContent = "Php " + totalFee.toLocaleString()


    var allAddButtons = document.querySelectorAll(".btn-add")
    for (var i = 0; i < allAddButtons.length; i++) {
        if (allAddButtons[i].getAttribute("data-name") == name) {
            allAddButtons[i].textContent = "+ Add to Semester"
            allAddButtons[i].disabled = false
            allAddButtons[i].style.background = ""
            allAddButtons[i].style.color = ""
        }
    }


    var remaining = document.querySelectorAll(".semester-row")
    if (remaining.length == 0) {
        document.getElementById("semester-empty").style.display = "block"
    }
}


var payBtn = document.getElementById("pay-btn")

if (payBtn != null) {
    payBtn.onclick = function () {
        if (totalFee == 0) {
            alert("Please add at least one course first.")
        } else {
            alert("Redirecting to payment gateway for Php " + totalFee.toLocaleString() + "...")
        }
    }
}
