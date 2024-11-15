function gitHubFinder() {
    // let ser_val = gtser.value;
    let url = `https://api.github.com/search/users?q=olu+in:login`;

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
                users = data.items;
                users.forEach(element => {
                    // get the url for each user
                    let user_url = element.url;
                    console.log(user_url);
                    

                });
            }
        })
        .catch(error => console.error("Error fetching user data:", error));
    }

gitHubFinder()