
function displayForm(elDomId = null, show = false){
    let form = document.querySelector("#"+elDomId);
    if(show){
        form.style.display = "block";
    }else{
        form.style.display = "none";
    }

}

// displayForm('staffLoginForm');

// displayForm('verifyBiljett');

if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

if(initEvent.authUser.getToken()){
    displayForm('staffLoginForm', false);
    displayForm('verifyBiljett', true);
}else{
    //console.log(staffLoginForm.);
    displayForm('staffLoginForm', true);
    displayForm('verifyBiljett', false);

    // verifyBiljettForm  = "hidden";
}




let loginButton = document.querySelector("input[name=login]");

loginButton.addEventListener("click", async (e) => {

    e.preventDefault();

    let username = document.querySelector("input[name=username]").value;

    let password = document.querySelector("input[name=password]").value;

    let resultDom =  document.querySelector("#result");




    let result = await initEvent.authUser.login(username, password);

    if(!result.error){
        resultDom.innerHTML = '';
        //staffLoginForm  = "hidden";
        //verifyBiljettForm  = "visible";
        displayForm('staffLoginForm', false);
        displayForm('verifyBiljett', true);


        await initEvent.authUser.saveToken(result);
     
    }else{
    
        resultDom.innerHTML = `<b>${result.message}</b>`;

    }



    

});

let verifyBiljettButton = document.querySelector("input[name=verify]");

verifyBiljettButton.addEventListener("click", async (e) => {

    e.preventDefault();

    let biljettCode = document.querySelector("input[name=biljettCode]").value;

    let result = await initEvent.verifyBiljett(biljettCode);

    console.log(result);

      
    let resultDom =  document.querySelector("#result");
    

    if(result.id){

        resultDom.innerHTML = `<b>Biljett är verifierad</b>`;  

    }else if(result.error == "tokenVerifyError"){

        initEvent.authUser.deleteToken();
        location.reload();

       // staffLoginForm = "visible";
       // verifyBiljettForm  = "hidden";
      // displayForm('staffLoginForm', true);
      // displayForm('verifyBiljett', false);


        // resultDom.innerHTML = `<b>Please Login first!</b>`;
    
    }else{

        resultDom.innerHTML = `<b>${result.message}</b>`;

    }
    


});



