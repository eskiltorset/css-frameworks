import { remove } from "../api/remove.js";
import { update } from "../api/update.js";

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

      function postArray(post, i, arr){

        const posts_section = document.getElementById('posts_section');
        const popular = document.querySelector("#popular");

        if(json[i].title){

            const anchor = document.createElement("a");
            const postDiv = document.createElement("div");
            postDiv.classList.add("post", "p-4", "border-bottom", "border-top");
            postDiv.id = json[i].id;
            // postDiv.href = "";
            // postDiv.onclick = (fetchSinglePost(json[i].id));
            
            // function fetchSinglePost(id){
            //     //anchor.href = `/post/index.html`;
            //     console.log(id);
            //     const singlePost_URL = `${API_BASE_URL}/api/v1/social/posts/${json.id}`;

                

            // };
            

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
            viewBtn.classList.add("view-btn", "float-end", "text-decoration-none");
            viewBtn.innerHTML = "View post";
            viewBtn.id = json[i].id;
            viewBtn.href = `/post/?id=${json[i].id}`; 

            // const editBtn = document.createElement("button");
            // editBtn.classList.add("edit-btn", "btn", "btn-primary");
            // editBtn.innerHTML = "Edit post";
            // //editBtn.onclick = openModal;
            // // editBtn.dataset.bsToggle = "modal"
            // // editBtn.dataset.bsTarget = "#exampleModalCenter";
            // editBtn.onclick = '/post/update'; 

            // const removeBtn = document.createElement("button");
            // removeBtn.classList.add("remove_btn", "btn", "btn-primary");
            // removeBtn.id = json[i].id;
            // removeBtn.innerHTML = "Delete post";
            // removeBtn.addEventListener("click", async () => {
            //     console.log(removeBtn.id);
            //     try{
            //         await remove(4586);
            //         console.log("post deleted")
            //     }
            //     catch (error){
            //         console.log(error);
            //     };
                
            // });

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
            buttonDiv.appendChild(viewBtn);
            // buttonDiv.appendChild(editBtn);
            // buttonDiv.appendChild(removeBtn);

            //const modal = document.querySelector(".modal");

            //json.map(getPostId);

            //function getPostId(post, i, arr){
            
            //editBtn.addEventListener("click", async (e) => {
            
                // const id = removeBtn.id;
                // console.log(id);

                // if (arr[i].id == id){
                //     console.log(id);
                //     //break;
                // }
            
            //     modal.innerHTML = ` 
            //     <div class="modal-dialog modal-dialog-centered" role="document">
            //     <div class="modal-content" id="${id}">
            //         <div class="modal-header">
            //         <h5 class="modal-title" id="exampleModalLongTitle">${json[i].title} ${id}</h5>
            //         <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            //             <span aria-hidden="true">&times;</span>
            //         </button>
            //         </div>
            //         <div class="modal-body">
            //         ${json[i].body}
            //         </div>
            //         <div class="modal-footer">
            //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            //         <button type="button" class="btn btn-primary">Save changes</button>
            //         </div>
            //     </div>
            //     </div>
            // `;

            // const popular = document.querySelector("#popular");
        
            // popular.onclick = popularFilter;

            // function popularFilter() {
            //     //console.log(json[i].title)
            //     // if(json[i].media){
            //     //     fetchPosts(fetchPosts_URL);
            //     //     console.log(json[i].media);

            //     //     continue;
            //     // }

            //     if(json[i].media == null){
            //         anchor.innerHTML = '';
            //         console.log(json[i].media);
            //         return;
            //     }
            // }
            }

        }
    }

    catch(error) {
        console.log(error);
        }
            
}

           
        
  
//const fetchPosts_URL = `${API_BASE_URL}/api/v1/social/posts?limit=10&offset=125&_comments=true&_author=true&_reactions=true&_count=true`;
  
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


