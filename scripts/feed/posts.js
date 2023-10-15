const API_BASE_URL = "https://api.noroff.dev";
const fetchPosts_URL = `${API_BASE_URL}/api/v1/social/posts?limit=20&offset=125&_comments=true&_author=true&_reactions=true&_count=true`;

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

      function postArray(post){

        const posts_section = document.getElementById('posts_section');
        //const popular = document.querySelector("#popular");

        if(post.title){

            const anchor = document.createElement("a");
            const postDiv = document.createElement("div");
            postDiv.classList.add("post", "p-4", "border-bottom", "border-top");
            postDiv.id = post.id;  

            const avatarDiv = document.createElement("div");
            avatarDiv.classList.add("w-25", "pb-2");

            const avatarImg = document.createElement("img"); 
            avatarImg.classList.add("w-25", "img-fluid", "rounded-circle", "float", "start");
            avatarImg.alt = "Avatar Image";
            avatarImg.src = "/images/avatar.avif";

            if(post.author.avatar){
                avatarImg.src = post.author.avatar;
            }

            const username = document.createElement("h5");
            username.classList.add("username");
            username.innerHTML = `@${post.author.name}`;

            const title = document.createElement("h4");
            title.classList.add("title", "fw-bolder");
            title.innerHTML = post.title;
            
            const description = document.createElement("p");
            description.classList.add("description");
            description.innerHTML = post.body;

            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("w-100", "mt-4");

            const viewBtn = document.createElement("a");
            viewBtn.classList.add("view-btn", "float-end", "text-decoration-none");
            viewBtn.innerHTML = "View post";
            viewBtn.id = post.id;
            viewBtn.href = `/post/?id=${post.id}`; 

            const comments = document.createElement("h8");
            avatarDiv.classList.add("comments");
            comments.innerHTML = `Comments: ${post.comments.length}`;

            posts_section.appendChild(anchor);
            anchor.appendChild(postDiv);
            postDiv.appendChild(avatarDiv);
            avatarDiv.appendChild(avatarImg);
            postDiv.appendChild(username);
            postDiv.appendChild(title);
            postDiv.appendChild(description);
            
            if(post.media){
                const postImg = document.createElement("img"); 
                postImg.classList.add("w-25");
                postImg.alt = "Post Image";
                postImg.src = post.media;

                postDiv.appendChild(postImg);
            }

            postDiv.appendChild(buttonDiv);  
            buttonDiv.appendChild(comments);
            buttonDiv.appendChild(viewBtn);


            // SEARCH BAR
            const searchInput = document.querySelector("#search-focus");

            searchInput.addEventListener("keyup", (event) => {
                const { value } = event.target;
            
                const searchQuery = value.toLowerCase();
              
                let body = post.body.toLowerCase();
                let title = post.title.toLowerCase();
              
                if (body.includes(searchQuery) || title.includes(searchQuery)) {
            
                    postDiv.style.display = "block";
                } else {

                    postDiv.style.display = "none";
                }
            });

           
            }

        }
    }

    catch(error) {
        console.log(error);
    }
            
}
  
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




