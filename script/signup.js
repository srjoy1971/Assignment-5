document.getElementById("signup-btn").addEventListener("click", function() {
    // 1 > get the username input
    const username = document.getElementById("input-username").value;
    console.log(username);
    // 2 > get the password input
    const password = document.getElementById("input-password").value;
    console.log(password);
    // 3 > match the password and confirm password
    if (username === "admin" && password === "admin123") {
    // 3.1 > true::: alert> (GitHub Issues Tracker) page
        alert("Login successful! Redirecting to GitHub Issues Tracker...");
        window.location.assign("./issues.html");
    }else {
    // 3.2 > false::: alert> return
        alert("Login failed! Please check your username and password.");
        return;
    }
});