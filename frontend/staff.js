//const initEvent = undefined;

if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

if(initEvent.authUser.getToken()){
    document.querySelector("#staffLoginForm").style.visibility = "hidden";
    document.querySelector("#verifyBiljett").style.visibility = "visible";
}else{
    document.querySelector("#staffLoginForm").style.visibility = "visible";
    document.querySelector("#verifyBiljett").style.visibility = "hidden";
}




let loginButton = document.querySelector("input[name=login]");

loginButton.addEventListener("click", async (e) => {

    e.preventDefault();

    let username = document.querySelector("input[name=username]").value;

    let password = document.querySelector("input[name=password]").value;

    let resultDom =  document.querySelector("#result");




    let result = await initEvent.authUser.login(username, password);

    if(!result.name){
        resultDom.innerHTML = '';
        document.querySelector("#staffLoginForm").style.visibility = "hidden";
        document.querySelector("#verifyBiljett").style.visibility = "visible";
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

    }else if(result.name == "tokenVerifyError"){

        document.querySelector("#staffLoginForm").style.visibility = "visible";
        document.querySelector("#verifyBiljett").style.visibility = "hidden";
        resultDom.innerHTML = `<b>Please Login first!</b>`;
    
    }else{

        resultDom.innerHTML = `<b>${result.message}</b>`;

    }
    


});



