function checkRegister() {

    const emailInput = document.getElementById("email_input").value;
    const pwdInput = document.getElementById("pwd").value;

    const form = document.querySelector("#loginForm");
    
    console.log(emailInput);
  
    const val = "@noroff.no";
    const val2 = "@stud.noroff.no";
  
    const check = (emailInput.includes(val) || emailInput.includes(val2));
    console.log(check);
  
    if (check === false) {
      console.log("Incorrect");
      alert("Your e-mail must contain either '@noroff.no' or '@stud.noroff.no'");
    }
  
    else {
      form.action = "../index.html";
      alert("You have succesfully registered an account!");

      /*const userArray = [
        emailInput,
        pwdInput
      ];*/

      localStorage.setItem("email", (emailInput));
      localStorage.setItem("password", (pwdInput));

    }
  
}  

function checkLogin()
{
    //get set stored data
    let emailStored = localStorage.getItem('email');
    let passwordStored = localStorage.getItem('password');

    const emailMsg = document.querySelector('.email-msg');
    const pwdMsg = document.querySelector('.pwd-msg');

    const form = document.querySelector("#loginForm");

    //data entered from login-form
    let emailInput = document.querySelector('#email_input').value;
    let passwordInput = document.querySelector('#pwd').value;
    console.log(emailStored);
    console.log(passwordStored);

    if(emailInput != emailStored)
    {
       console.log("Please enter valid email address");
       emailMsg.innerHTML = "Please enter valid email address";
       
    }

    if(passwordInput != passwordStored)
    {
        console.log("Please enter password associated with email address");
        pwdMsg.innerHTML = "Please enter password associated with email address";
    }

    if((emailInput == emailStored) && (passwordInput == passwordStored)){
        form.action = "/feed/index.html";
    }

}

/*function ajaxpost () {
    // (A) GET FORM DATA
    var data = new FormData(document.getElementById("loginForm"));
   
    // (B) AJAX REQUEST
    // (B1) POST DATA TO SERVER, RETURN RESPONSE AS TEXT
    fetch("1c-server.html", { method:"POST", body:data })
    .then(res => res.text())
   
    // (B2) SHOW MESSAGE ON SERVER RESPONSE
    .then(response => {
      console.log(response);
      if (response == "OK") { alert("SUCCESSFUL!"); }
      else { alert("FAILURE!"); }
    })
   
    // (B3) OPTIONAL - HANDLE FETCH ERROR
    .catch(err => console.error(err));
   
    // (C) PREVENT FORM SUBMIT
    return false;
  }*/