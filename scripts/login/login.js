const API_BASE_URL = "https://api.noroff.dev";

async function loginUser(url, userData) {
  try {
    const postData = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (response.status === 200) {
      console.log("Login successful!");
      window.location.href = "/profile/index.html";
    }

    else {
      console.log("Login failed!");
    }

    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);

    let loggedInUser = json.name;
    localStorage.setItem("loggedInUser", loggedInUser);
    console.log(`Name: ${localStorage.getItem("loggedInUser")}`);
    return json;

  }
  catch(error) {
    console.error(error);
  }
}

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  try {
    const emailInput = document.getElementById("email_input").value;
    const pwdInput = document.getElementById("pwd").value;
  
    let userToLogin = {
      email: emailInput,
      password: pwdInput
    };

    const login_URL = `${API_BASE_URL}/api/v1/social/auth/login`;

    await loginUser(login_URL, userToLogin);
  }
  catch(error) {
    console.log(error);
  }
});



