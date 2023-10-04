const API_BASE_URL = "https://api.noroff.dev";
//import { API_BASE_URL } from "./variables/script.js";
// const API_BASE_URL = "https://api.noroff.dev";
// import { preFillFormFields } from "./utils/login.js";

function preFillFormFields() {
  const savedEmail = localStorage.getItem("savedEmail");
function preFillFormFields() {
    document.getElementById("remember").checked = true;
  }
}

// import { loginUser } from "./utils/login.js";
async function loginUser(url, userData) {
  try {
    const postData = {
async function loginUser(url, userData) {
    }
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    const loggedInUser = json.name;
    let loggedInUser = json.name;
    localStorage.setItem("loggedInUser", loggedInUser);
    console.log(`Name: ${localStorage.getItem("loggedInUser")}`);
    return json;
document.addEventListener("DOMContentLoaded", function () {
      const loginEmail = document.getElementById("loginEmail").value;
      const loginPassword = document.getElementById("loginPassword").value;

      userToLogin = {
      let userToLogin = {
        email: loginEmail,
        password: loginPassword,
      };