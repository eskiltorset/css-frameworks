import { remove } from "../api/remove.js";
import { update } from "../api/update.js";

const API_BASE_URL = "https://api.noroff.dev";

function getId() {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}

const postId = getId();

window.onload = fetchPost();

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














// function getPostIdFromURL() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('postId');
// };

// export async function fetchGetPostById(postId) {
//     const endpoint = `${POSTS_ENDPOINT}/${postId}`;
//     return await get(endpoint, '?_author=true&_comments=true&_reactions=true)');
// }

// async function displayPost() {
//     try {
//         // Extract the post ID from the URL
//         const urlParams = new URLSearchParams(window.location.search);
//         const postId = Number(urlParams.get('postId'));

//         if (!postId) {
//             console.error('Invalid post ID');
//             return;
//         }

//         // Fetch the post by its ID
//         const post = await fetchGetPostById(postId);

//         // Retrieve the current user's ID
//         const currentUserId = getCurrentUserId();

//         // Define necessary variables
//         const postTitle = post.title ? `<h3>${post.title}</h3>` : '';
//         const postAuthor = post.author?.name || "Unknown Author";
//         const userAvatar = post.author?.avatar || "../../images/img/avatar/default-avatar.jpg";
//         const postImage = post.media ? `<img src="${post.media}" alt="Post Image" class="img-fluid rounded mb-3">` : '';
//         const postCreated = formatDateAndTime(post.created);
//         const postTags = post.tags ? `<h6 class="text-white">${formatTags(post.tags).join(', ')}</h6>` : '';


//         // Render the post details
//         const postHTML = `
//         <div class="col-12">
//             <div class="card mb-5 bg-primary border-dark-subtle">
//                 <div class="card-header d-flex align-items-center justify-content-between text-light bg-primary border-bottom border-dark-subtle">
//                     <div class="d-flex align-items-center">
//                         <div class="rounded-circle overflow-hidden" style="width: 50px; height: 50px;">
//                             <img src="${userAvatar}" alt="Profile Avatar" class="h-100">
//                         </div>
//                         <div class="ms-3">
//                             <h6 class="mb-0">${postAuthor}</h6>
//                             <small>${postCreated}</small>
//                         </div>
//                     </div>
//                     <div class="d-flex">
//                         <button class="btn list-item border-0"><span><i class="fa-regular fa-star fa-lg"></i></span></button>
//                     </div>
//                 </div>
//                 <div class="card-body">
//                     ${postTitle}
//                     ${postImage}
//                     <h4 class="mb-0">${post.body}</h4>
//                     ${postTags}
//                 </div>
//                 <div class="card-footer d-flex justify-content-between text-white border-top border-dark-subtle bg-info">
//                     <span><i class="far fa-thumbs-up"></i> ${post._count.reactions} Likes</span>
//                     <span><i class="far fa-comment"></i> ${post._count.comments} Comments</span>
//                     <span><i class="far fa-share-square"></i> Share</span>
//                 </div>
//             </div>
//         </div>
//         `;

//         const container = document.querySelector('.post');
//         container.innerHTML = postHTML;


//     } catch (error) {
//         console.error('Error displaying post:', error);
//     }
// };
            








// const API_BASE_URL = "https://api.noroff.dev";

// const postContainer = document.querySelector(".post_container");

// window.onload = fetchPost();

// async function fetchPost(url) {
//     try {
//         console.log(url);
//         const token = localStorage.getItem("accessToken");
//         console.log(token);
//         const fetchOptions = {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`
//           },
//         }
    
//         const response = await fetch(url, fetchOptions);
//         console.log(response);
//         const json = await response.json();
//         console.log(json);
//         console.log(json.id)

//         json.forEach(postArray);

//         function postArray(post, i, arr){
//             const singlePost_URL = `${API_BASE_URL}/api/v1/social/posts/3688`;
//             fetchPost(singlePost_URL);
//         }

//         postContainer.innerHTML = `
//                                     <div class="details">
//                                         <div class="details-image" style="background-image: url(${details.data.image});"></div>
//                                         <h4 class="details-name">${details.data.name}</h4>
//                                         <h4 class="details-location">Location: ${details.data.location}</h4>
//                                         <h4 class="details-description">Description: ${details.data.description}</h4>                                                                                                                                                    
//                                     </div>`
//         }

//     catch(error) {
//         console.log(error);
//       }
// }





// const detailContainer = document.querySelector(".creature-details");

// const queryString = document.location.search;

// const params = new URLSearchParams(queryString);

// const id = params.get("id");

// console.log(id);


// const url = "https://eldenring.fanapis.com/api/creatures/" + id;

// console.log(url);

// async function fetchCreature() {

//     try {
//         const response = await fetch(url);
//         const details = await response.json();

//         console.log(details);

//         createHtml(details);
      
//     }
//     catch(error) {
//         console.log(error);
//         detailContainer.innerHTML = alert("error", error);
//     }
    
// }

// fetchCreature();

// function createHtml(details) {
//     detailContainer.innerHTML = `
//                                     <div class="details">
//                                         <div class="details-image" style="background-image: url(${details.data.image});"></div>
//                                         <h4 class="details-name">${details.data.name}</h4>
//                                         <h4 class="details-location">Location: ${details.data.location}</h4>
//                                         <h4 class="details-description">Description: ${details.data.description}</h4>                                                                                                                                                    
//                                     </div>`
// }