function post() {

    const titleInput = document.getElementById("title_input").value;
    const descriptionInput = document.getElementById("description_input").value;

    const post = {
        title: titleInput,
        description: descriptionInput
    }

    const postArray = JSON.parse(localStorage.getItem('posts') || '[]');
    postArray.push(post);

    localStorage.setItem('posts', JSON.stringify(postArray));
}  