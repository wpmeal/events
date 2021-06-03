
/*
* A function to hide/show html form
*params: from Id:string, show:boolean
*/ 
function displayForm(elDomId = null, show = false){

    let form = document.querySelector("#"+elDomId);

    if(show){

        form.style.display = "block";

    }else{

        form.style.display = "none";
    }

}

// initilize main class only once
if (typeof initEvent == "undefined") {

    initEvent = new Event();

}
// if we have logged in staff then hide login form and show verify biljett form 
if(initEvent.authUser.getToken()){

    displayForm('staffLoginForm', false);

    displayForm('verifyBiljett', true);

}else{

    // otherwise do the opposite
    displayForm('staffLoginForm', true);

    displayForm('verifyBiljett', false);

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

         displayForm('staffLoginForm', false);

        displayForm('verifyBiljett', true);

        // save token received from backed 
        await initEvent.authUser.saveToken(result);
     
    }else{ // otherwise error occurs, display it!!
    
        resultDom.innerHTML = `<b>${result.message}</b>`;

    }   
});

let verifyBiljettButton = document.querySelector("input[name=verify]");

// an event listener to verify biljett click

verifyBiljettButton.addEventListener("click", async (e) => {

    e.preventDefault();
    
    // collect the biljett code from user input
    let biljettCode = document.querySelector("input[name=biljettCode]").value;
 

    // call verifyBiljett method
    let result = await initEvent.verifyBiljett(biljettCode);

    console.log(result);

      
    let resultDom =  document.querySelector("#result");
    
    // if ther server responses with the biljett data then it is verified successfully
    if(result.id){

        resultDom.innerHTML = `<b>Biljett är verifierad</b>`;  

    // if ther server responses with an tokenVerifyError error then login token is invalid/expired
    }else if(result.error == "tokenVerifyError"){ 

        initEvent.authUser.deleteToken();

        location.reload();

        // if ther server responses with other errors then notify the user with them
    }else{

        resultDom.innerHTML = `<b>${result.message}</b>`;
        
    }
    
});



