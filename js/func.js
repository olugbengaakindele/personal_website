const ystr = document.querySelector("#yrtrt");
const samt = document.querySelector("#samt");
const intr = document.querySelector("#intr");
const sfreq = document.querySelector("#sfreq");
const bstgt = document.querySelector("#bstgt");
const res = document.querySelector("#result");
const res_tb = document.querySelector('#table_body');
const gtser = document.querySelector("#gitsearchbox");
const profile_result = document.querySelector("#github-result-row")



function profileCard(repo,gist,followers, following, joined, updated, location, profile_name, githubpage){
    //  clear all the child element of the reult element
    const element = profile_result;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    // Create the main div
    const divpic = document.createElement("div");
    divpic.className = "bg-primary rounded-circle mx-auto mb-3";
    divpic.style.width = "100px";
    divpic.style.height = "100px";

    // Create the inner span
    const span = document.createElement("span");
    span.className = "text-white d-flex align-items-center justify-content-center h-100";

    // Create the icon element
    const icon = document.createElement("i");
    icon.className = "bi bi-person fs-1";

    // Append icon to span, and span to div
    span.appendChild(icon);
    divpic.appendChild(span);

    // Create the h5 element for the name
    const profilename = document.createElement("h5");
    profilename.classList = "card-title fw-bold mb-1";
    profilename.innerHTML= profile_name;

    // Create the paragraph element for the location
    const loc = document.createElement("p");
    loc.classList = "text-muted mb-2";
    loc.innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${location}`;

    // Create the anchor element for the blog link
    const githubLink = document.createElement("a");
    githubLink.href = githubpage;
    githubLink.className = "text-primary text-decoration-none d-block mb-3";
    githubLink.target = "_blank";
    githubLink.textContent = "Visit github";

    ////////////////// Statistics setion//////////////////////////////////
    const statdiv = document.createElement("div");
    statdiv.classList ="d-flex justify-content-around mb-3"

    const divrepo = document.createElement("div");

    const hrepo = document.createElement("h6");
    hrepo.classList = "fw-bold mb-0"
    hrepo.innerHTML = repo;

    const reposmall = document.createElement("small");
    reposmall.classList = "text-muted"
    reposmall.innerHTML = "Repos";

    const divgist = document.createElement("div");

    const hgist = document.createElement("h6");
    hgist.classList = "fw-bold mb-0"
    hgist.innerHTML = gist;

    const smallgist = document.createElement("small");
    smallgist.classList = "text-muted"
    smallgist.innerHTML = "Gists";

    const divfollowers = document.createElement("div");

    const hfollowers = document.createElement("h6");
    hfollowers.classList = "fw-bold mb-0"
    hfollowers.innerHTML = followers;

    const smallfollowers = document.createElement("small");
    smallfollowers.innerHTML ="Followers"

    const divfollowing = document.createElement("div");

    const hfollowing = document.createElement("h6");
    hfollowing.classList = "fw-bold mb-0"
    hfollowing.innerHTML = following;

    const smallfollowing = document.createElement("small");
    smallfollowing.classList = "fw-bold mb-0"
    smallfollowing.innerHTML = "Following";

    const pjoin = document.createElement("p");
    pjoin.classList = "text-muted small mb-0";
    pjoin.innerHTML = `Joined on: ${joined}`

    const plastupdated = document.createElement("p");
    plastupdated.classList = "text-muted small mb-0";
    plastupdated.innerHTML = `Last Updated: ${updated}`

    divrepo.appendChild(hrepo);
    divrepo.appendChild(reposmall);

    divgist.appendChild(hgist);
    divgist.appendChild(smallgist);

    divfollowers.appendChild(hfollowers);
    divfollowers.appendChild(smallfollowers);

    divfollowing.appendChild(hfollowing);
    divfollowing.appendChild(smallfollowing);

    
    statdiv.appendChild(divrepo);
    statdiv.appendChild(divgist);
    statdiv.appendChild(divfollowers);
    statdiv.appendChild(divfollowing);
   
    
    

    const divcard = document.createElement("div");
    divcard.classList = "card h-100";
    divcard.appendChild(divpic);
    divcard.appendChild(profilename);
    divcard.appendChild(loc);
    divcard.appendChild(githubLink);
    divcard.appendChild(statdiv);
    divcard.appendChild(pjoin);
    divcard.appendChild(plastupdated);
    const divuseprofile = document.createElement("div");
    divuseprofile.classList = "col-sm-12 col-md-4";

    divuseprofile.appendChild(divcard);

    profile_result.appendChild(divuseprofile);
}



export function presetValue(){
    

    samt.value = 300;
    intr.value =3;
    sfreq.value = "3";
    ystr.value = 10;

}

export function calculateFutureValue() {
    const ctb = document.querySelector("#samt").value;
    const intr = document.querySelector("#intr").value;
    const ystr = document.querySelector("#yrtrt").value;
    const freq = document.querySelector("#sfreq").value;
    let divisor = 0
    if (freq === "1" ){
        divisor = 52;
    }else if (freq === "2") {
        divisor = 26;
    }else if (freq === "3") {
        divisor = 24;
    }else if (freq === "4") {
        divisor = 12;
    }else if (freq === "5") {
        divisor = 2;
    }else if (freq === "6") {
        divisor = 1;
    }
    console.log(divisor);
    // Define the parameters
    const biweeklyRate =  Math.pow(1 + intr / 100, 1 / divisor) - 1;; // Convert annual rate to biweekly
    const totalPeriods = ystr * divisor; // Total biweekly contributions over 10 years

    // Apply the future value of annuity formula
    const futureValue = (ctb * ((Math.pow(1 + biweeklyRate, totalPeriods) - 1) / biweeklyRate));
    res.innerHTML =`The future value of your saving will be:  ${futureValue.toLocaleString()}`
    // return futureValue.toFixed(2); // Return the result rounded to 2 decimal places
}


//////////// Github Functions ///////////////////////
export function gitHubFinder() {
    let ser_val = gtser.value;
    let url = `https://api.github.com/search/users?q=${ser_val}+in:login`;

    fetch(url)
        .then(response => {
            if (response.status === 200){
                return response.json();
            }else{
                throw new Error("Rate limit exceeded");
            }
        })
        .then(data => {
            if (!data.message){
                let users = data.items;
                users.forEach(element => {
                    // get the url for each user
                    let user_url = element.url;
                    fetch(user_url)
                        .then(res => {
                            if (res.status === 403) {
                                console.log("Rate limit exceeded when fetching user data. Please try again later.");
                                throw new Error("Rate limit exceeded on user data fetch");
                            }
                            return res.json();
                        })
                        .then(datauser => {
                            profileCard(
                                datauser.public_repos,
                                datauser.public_gists,
                                datauser.followers,
                                datauser.following,
                                datauser.created_at,
                                datauser.updated_at,
                                datauser.location,
                                datauser.name,
                                datauser.html_url
                            );
                        })

                });
            }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }



export function oldgitHubFinder() {
    let ser_val = gtser.value;
    let url = `https://api.github.com/search/users?q=${ser_val}+in:login`;
    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log(response.status);
                profile_result.innerHTML= "We have exceeded the GitHub API rate limit. Please try again later."; 
                throw new Error("Rate limit exceeded");
                
            }
            return response.json();
        })
        .then(data => {
            const users = data.items
            //  || [];
            // if (users.length === 0) {
            //     console.log("No users found or rate limit exceeded.");
            //     return;
            // }

            users.forEach(user => {
                let user_name = user.login;
                if (!user_name) {
                    console.log("Error retrieving user data or rate limit exceeded.");
                } else {
                    let user_url = `https://api.github.com/users/${user_name}`;
                    console.log(user_url);

                    fetch(user_url)
                        .then(res => {
                            if (res.status === 403) {
                                console.log("Rate limit exceeded when fetching user data. Please try again later.");
                                throw new Error("Rate limit exceeded on user data fetch");
                            }
                            return res.json();
                        })
                        .then(datauser => {
                            profileCard(
                                datauser.public_repos,
                                datauser.public_gists,
                                datauser.followers,
                                datauser.following,
                                datauser.created_at,
                                datauser.updated_at,
                                datauser.location,
                                datauser.name,
                                datauser.html_url
                            );
                        })
                        .catch(error => console.error("Error fetching user data:", error));
                }
            });
        })
        .catch(error => console.error("Error with main request:", error));
}

// export function allGitHubFinder(){
//     let ser_val = gtser.value;
//     let url = `https://api.github.com/users/femi`;
//     fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             console.error("Error with the request:", response.status);
//             throw new Error("Request failed with status " + response.status);
//         }
//         return response.json();
// }).catch(error => console.error("Error with main request:", error));
//     //     .then((data) => 
//     //         data.forEach(element => {
//     //             // check if the search value is the starting character of the login of each profile
//     //             console.log(element.login);
//     //             if (((element.login).toLowerCase()).startsWith(ser_val.toLowerCase())) {
//     //                 console.log(element.login);
//     //               } else {
//     //                 console.log("No match. The string does not start with 'olu'.");
//     //               }
//     //         })
//     // );
// }

// allGitHubFinder();
