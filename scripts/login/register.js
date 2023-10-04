//import { API_BASE_URL } from "./variables/script.js";
const API_BASE_URL = "https://api.noroff.dev";
const register_URL = `${API_BASE_URL}/api/v1/social/auth/register`;

let nameStored = localStorage.getItem('name');
let emailStored = localStorage.getItem('email');
let passwordStored = localStorage.getItem('password');

const user = {
    name: nameStored,
    email: emailStored,
    password: passwordStored, 
};

async function registerUser(url, userData) {

    let nameInput = document.getElementById("name_input").value;
    let emailInput = document.getElementById("email_input").value;
    let pwdInput = document.getElementById("pwd").value;

    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        localStorage.setItem("name", (nameInput));
        localStorage.setItem("email", (emailInput));
        localStorage.setItem("password", (pwdInput));

        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        return json;

    } catch (error) {
        console.log(error);
    }
}

registerUser(register_URL, user);





