
// window.onload = function renderPosts() {

//     // GET ITEM
//     const posts_section = document.getElementById('posts_section');
//     console.log(posts_section);

//     const posts = localStorage.getItem('posts');       
//     const parsedPosts = JSON.parse(posts);

//     Object.entries(parsedPosts).forEach(([key, value]) => {
//         console.log('key:', key, 'title:', value.description, 'description: ', value.description);

//         posts_section.innerHTML += `
//             <div class="post p-4 border-bottom border-top">
//                 <div class="w-25 pb-2">
//                     <img src="/images/meg2.jpg" class="w-25 img-fluid rounded-circle float start">
//                 </div>
//                 <h5 class="username">@anon${key}</h5>
//                 <h4 class="title">${value.title}</h4>
//                 <p class="description">${value.description}</p>
//             </div>
//         `;
//         });
//     }


// function post() {

//     const titleInput = document.getElementById("title_input").value;
//     const descriptionInput = document.getElementById("description_input").value;

//     const post = {
//         title: titleInput,
//         description: descriptionInput
//     }
    
//     if(titleInput.length < 1 || descriptionInput.length < 1) {
//         alert("You have to type characters")
//     }

//     if(titleInput.length > 0 && descriptionInput.length > 0) {

//         // SET ITEM
//         const postArray = JSON.parse(localStorage.getItem('posts') || '[]');
//         postArray.push(post);

//         localStorage.setItem('posts', JSON.stringify(postArray));
//     }
// }  





