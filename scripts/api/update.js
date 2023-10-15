import { API_BASE_URL } from "../variables/script.js";

const update_URL = `${API_BASE_URL}/api/v1/social/posts/`;

/**
 * Updates a post from the Rest API
 * @param {number} id ID of the post
 * @returns {string} updates the post if the user has authentication for it
 */
export async function update(id, newPostData){
    const token = localStorage.getItem('accessToken');
    const url = `${update_URL}${id}`

    if(!token){
        throw new Error("You must be logged in to update a post.");
    }

    if(!id){
        throw new Error("You must pass a valid post id");
    }

    const options = {
        method: "put",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newPostData)
    };

    const response = await fetch(url, options);

    if (response.ok){
        return await response.json();
    }

    throw new Error("could not update this item.");
}

