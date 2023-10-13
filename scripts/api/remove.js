const API_BASE_URL = "https://api.noroff.dev/api/v1/social/posts/";

export async function remove(id = 0){
    const token = localStorage.getItem('accessToken');
    const url = `${API_BASE_URL}${id}`

    console.log(token);

    if(!token){
        throw new Error("You must be logged in to delete a post.");
    }

    if(!id){
        throw new Error("You must pass a valid post id");
    }

    const options = {
        method: "delete",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await fetch(url, options);

    if (response.ok){
        return await response.json();
    }

    throw new Error("could not delete this item.");
}

// async function listener() {
//     try{
//         const removeBtn = document.querySelector(".remove_btn");
//         removeBtn.addEventListener("click", async ({ target }) => {
//             await remove(target.id)
//         });
//     }
//     catch (error){
//         showError("Something went wrong.")
//         console.warn(error);
//     }
    
// }

