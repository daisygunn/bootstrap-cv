function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_black">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br>
        Repos: ${user.public_repos}
        </p>
    </div>`
}

function fetchGitHubInformation(event) {
    var username = $("#gh-username"). val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    $("#gh-user-data").html(`<div id="loader"><img src="../assets/css/loader.gif" alt="loading..."></img></div>`);
    // Promise when: something is done then: do something
    $.when(
        // get JSON response from github API using username entered
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        // use the response from the API to add the user info html into the div
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
            // display error messages 404 / page not found otherwise just print the error message to the console
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").hmtl(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(console.errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

