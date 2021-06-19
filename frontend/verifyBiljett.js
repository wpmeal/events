// initialize Event class only once
if (typeof initEvent == "undefined") {

    initEvent = new Event();

}

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

        location.href = 'staff.html';

        // if ther server responses with other errors then notify the user with them
    }else{

        resultDom.innerHTML = `<b>${result.message}</b>`;
        
    }
    
});