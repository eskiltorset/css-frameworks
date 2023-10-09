const API_BASE_URL = "https://api.noroff.dev";

async function fetchPosts(url) {
    try {
      console.log(url);
      const token = localStorage.getItem("accessToken");
      console.log(token);
      const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
      }
  
      const response = await fetch(url, fetchOptions);
      console.log(response);
      const json = await response.json();
      console.log(json);

      json.forEach(postArray);

      function postArray(post, i, arr){

        const posts_section = document.getElementById('posts_section');

        if(json[i].title && json[i].body){

            const postDiv = document.createElement("div");
            postDiv.classList.add("post", "p-4", "border-bottom", "border-top")

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("w-25", "pb-2");

            const avatarImg = document.createElement("img"); 
            avatarImg.classList.add("w-25", "img-fluid", "rounded-circle", "float", "start");
            avatarImg.alt = "Avatar Image";
            avatarImg.src = "/images/avatar.avif";

            if(json[i].author.avatar){
                avatarImg.src = json[i].author.avatar;
            }

            const username = document.createElement("h5");
            username.classList.add("username");
            username.innerHTML = `@${json[i].author.name}`;

            const title = document.createElement("h4");
            title.classList.add("title", "fw-bolder");
            title.innerHTML = json[i].title;
            
            const description = document.createElement("p");
            description.classList.add("description");
            description.innerHTML = json[i].body;

            const comments = document.createElement("h8");
            avatarDiv.classList.add("comments");
            comments.innerHTML = `Comments: ${json[i].comments.length}`;

            posts_section.appendChild(postDiv);
            postDiv.appendChild(avatarDiv);
            avatarDiv.appendChild(avatarImg);
            postDiv.appendChild(username);
            postDiv.appendChild(title);
            postDiv.appendChild(description);

            if(json[i].media){
                const postImg = document.createElement("img"); 
                postImg.classList.add("w-25");
                postImg.alt = "Post Image";
                postImg.src = json[i].media;

                postDiv.appendChild(postImg);
                
            }

            postDiv.appendChild(comments);
            
        }

        

      };
    }
  
    catch(error) {
      console.log(error);
    }
  }
  
  const fetchPosts_URL = `${API_BASE_URL}/api/v1/social/posts?limit=15&offset=125&_comments=true&_author=true&_reactions=true&_count=true`;
  
  fetchPosts(fetchPosts_URL);


async function createPost(url, postData) {

    try {
        console.log(url);
        const token = localStorage.getItem("accessToken");
        console.log(token);
        const fetchOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(postData),
        }
    
        const response = await fetch(url, fetchOptions);
        console.log(response);
        const json = await response.json();
        console.log(json);

        fetchPosts(fetchPosts_URL);
  
    }
    
    catch(error) {
        console.log(error);
    }
}

const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const titleInput = document.getElementById("title_input").value;
    const bodyInput = document.getElementById("description_input").value;
    const mediaInput = document.getElementById("media_input").value;

    if(titleInput.length > 0) {

        try {

            let userPost = {
                title: titleInput,
                body: bodyInput,
                media: mediaInput
            };

            const createPosts_URL = `${API_BASE_URL}/api/v1/social/posts`;

            await createPost(createPosts_URL, userPost);
        }

        catch(error) {
            console.log(error);
        }
    }

    else {
        alert("You need to write a title!")
    }
});


