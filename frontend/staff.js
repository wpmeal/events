
/*
* A function to hide/show html form
*params: from Id:string, show:boolean
*/ 


// initilize main class only once
if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

const token = initEvent.authUser.getToken();

if(token){
    location.href = 'verifyBiljett.html';
}

let loginButton = document.querySelector("input[name=login]");

// an event listener to login click
loginButton.addEventListener("click", async (e) => {

    e.preventDefault();
     // receive credentials from user
    let username = document.querySelector("input[name=username]").value;

    let password = document.querySelector("input[name=password]").value;

    let resultDom =  document.querySelector("#result");

    // call login mehtod
    let result = await initEvent.authUser.login(username, password);

    // if login is successful then hide login form and display verify Biljett form
    if(!result.error){

        resultDom.innerHTML = '';

      //   displayForm('staffLoginForm', false);


        // save token received from backed 
        await initEvent.authUser.saveToken(result);


        location.href = "verifyBiljett.html";

     
    }else{ // otherwise error occurs, display it!!
    
        resultDom.innerHTML = `<b>${result.message}</b>`;

    }   
});





