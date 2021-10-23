function sendMail(contactForm) {
    console.log("function called")
    emailjs.send("service_m29ys4m","project-request", {
        "from-name": contactForm.name.value,
        "from-email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );

    return false;
}

console.log("WORKING")