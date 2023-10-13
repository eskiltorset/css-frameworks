import { remove } from "../api/remove.js";
import { update } from "../api/update.js";

const API_BASE_URL = "https://api.noroff.dev";

const loggedInUser = localStorage.getItem("loggedInUser");

async function fetchPosts(url) {
    try {
      const token = localStorage.getItem("accessToken");
      const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
      }
  
      const response = await fetch(url, fetchOptions);
      
      const json = await response.json();
      console.log(json);

      json.forEach(postArray);

      function postArray(post, i, arr){

        const posts_section = document.getElementById('posts_section');
        const profile = document.querySelector(".profile");

        profile.innerHTML = `<div class="card">
                    <img src="/images/avatar.avif" class="rounded-circle rounded mx-auto d-block w-50 h-50 center mt-3" alt="Profile Picture">
                    <div class="card-body">
                      <h5 class="card-title text-center">@${loggedInUser}</h5>
                      <p class="card-text text-center">Frontend-developer / Student</p>
                    </div>
                    <div class="followers row mx-0 border-top">
                        <button class="btn col-md-12 text-center align-items-center rounded-0">Follow</button>
                        <p class="col-md-6 text-center m-auto p-3">Follows: 328</p>
                        <p class="col-md-6 text-center m-auto p-3 ">Followers: 13.1k</p>
                    </div>
                  </div>`;

        if(json[i].author.name === loggedInUser){

            const anchor = document.createElement("a");
            const postDiv = document.createElement("div");
            postDiv.classList.add("post", "p-4", "border-bottom", "border-top");
            postDiv.id = json[i].id;

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

            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("w-100", "mt-4");

            const viewBtn = document.createElement("a");
            viewBtn.classList.add("view-btn", "btn-primary", "float-end", "text-decoration-none", "mx-2");
            viewBtn.innerHTML = "View post";
            viewBtn.id = json[i].id;

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn", "btn-primary", "float-end", "mx-2");
            editBtn.innerHTML = "Edit post";
            editBtn.addEventListener("click", async () => {
                console.log(viewBtn.id);
                const postToUpdate = viewBtn.id;
                try{
                    await update(postToUpdate, {
                        title: "Updated title",
                        body: "Updated text",
                        media: "https://picsum.photos/200"
                    });
                    console.log("Test succeed")
                }
                catch(error){
                    console.log(error);
                }
                
            });

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove_btn", "btn-primary", "float-end", "mx-2");
            removeBtn.id = json[i].id;
            removeBtn.innerHTML = "Delete post";
            removeBtn.addEventListener("click", async () => {
                console.log(removeBtn.id);
                try{
                    await remove(removeBtn.id);
                    console.log("post deleted")
                }
                catch (error){
                    console.log(error);
                };
                
            });

            const comments = document.createElement("h8");
            avatarDiv.classList.add("comments");
            comments.innerHTML = `Comments: ${json[i].comments.length}`;

            posts_section.appendChild(anchor);
            anchor.appendChild(postDiv);
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

            postDiv.appendChild(buttonDiv);
            buttonDiv.appendChild(comments);
            buttonDiv.appendChild(editBtn);
            buttonDiv.appendChild(removeBtn);
            buttonDiv.appendChild(viewBtn);
            
        }

      };
    }
  
    catch(error) {
      console.log(error);
    }
}
  
const fetchPosts_URL = `${API_BASE_URL}/api/v1/social/profiles/${loggedInUser}/posts?&_comments=true&_author=true&_reactions=true&_count=true`;
  
fetchPosts(fetchPosts_URL);