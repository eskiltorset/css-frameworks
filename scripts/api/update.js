const API_BASE_URL = "https://api.noroff.dev/api/v1/social/posts/";

export async function update(id, newPostData){
    const token = localStorage.getItem('accessToken');
    const url = `${API_BASE_URL}${id}`

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

// UPDATE CALL
export async function test (){
    const postToUpdate = 747;

    try{
        await update(postToUpdate, {
            title: "Updated title v2",
            body: "Updated text v2",
            media: "https://picsum.photos/200"
        });
        console.log("Test succeed")
    }
    catch(error){
        console.log("Test failed");
    }
}

