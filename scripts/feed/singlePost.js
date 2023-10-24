import { remove } from "../api/remove.js";
import { update } from "../api/update.js";

const API_BASE_URL = "https://api.noroff.dev";

function getId() {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}

const postId = getId();

window.onload = fetchPost();

/**
 * Fetches the viewed post by ID
 * @param {string} url Rest API URL for post by ID 
 * @returns {string} The post that is clicked by the user
 */
async function fetchPost(url) {
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

            const posts_section = document.querySelector('.post_container');

            if(json.title){
    
                const anchor = document.createElement("a");
                const postDiv = document.createElement("div");
                postDiv.classList.add("post", "p-4", "border-bottom", "border-top");
                postDiv.id = json.id;  
    
                const avatarDiv = document.createElement("div");
                avatarDiv.classList.add("w-25", "pb-2");
    
                const avatarImg = document.createElement("img"); 
                avatarImg.classList.add("w-25", "img-fluid", "rounded-circle", "float", "start");
                avatarImg.alt = "Avatar Image";
                avatarImg.src = "/images/avatar.avif";
    
                if(json.author.avatar){
                    avatarImg.src = json.author.avatar;
                }
    
                const username = document.createElement("h5");
                username.classList.add("username");
                username.innerHTML = `@${json.author.name}`;
    
                const title = document.createElement("h4");
                title.classList.add("title", "fw-bolder");
                title.innerHTML = json.title;
                
                const description = document.createElement("p");
                description.classList.add("description");
                description.innerHTML = json.body;

                const buttonDiv = document.createElement("div");
                buttonDiv.classList.add("w-100", "mt-4");
    
                const editBtn = document.createElement("button");
                editBtn.classList.add("edit-btn", "btn-primary", "float-end", "mx-2");
                editBtn.innerHTML = "Edit post";
                editBtn.addEventListener("click", async () => {
                    const postToUpdate = removeBtn.id;
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
            removeBtn.id = json.id;
            removeBtn.innerHTML = "Delete post";
            removeBtn.addEventListener("click", async () => {
                try{
                    await remove(removeBtn.id);
                    console.log("post deleted")
                }
                catch (error){
                    console.log(error);
                };
                
            });

            const reactions = document.createElement("h8");
            reactions.classList.add("reactions");
            reactions.innerHTML = `Reactions: ${json.reactions.length}`;
    
            const comments = document.createElement("h8");
            comments.classList.add("comments", "mx-2");
            comments.innerHTML = `Comments: ${json.comments.length}`;

            posts_section.appendChild(anchor);
            anchor.appendChild(postDiv);
            postDiv.appendChild(avatarDiv);
            avatarDiv.appendChild(avatarImg);
            postDiv.appendChild(username);
            postDiv.appendChild(title);
            postDiv.appendChild(description);
            
            if(json.media){
                const postImg = document.createElement("img"); 
                postImg.classList.add("w-25");
                postImg.alt = "Post Image";
                postImg.src = json.media;

                postDiv.appendChild(postImg);
            }

            postDiv.appendChild(buttonDiv);
            buttonDiv.appendChild(reactions);
            buttonDiv.appendChild(comments);
            buttonDiv.appendChild(editBtn);
            buttonDiv.appendChild(removeBtn);
            }
        }

        catch(error) {
            console.log(error);
        }
}

const fetchPost_URL = `${API_BASE_URL}/api/v1/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;
            
fetchPost(fetchPost_URL);

