class ConnectionClass {

    // let's construct it by setting default values to our api
    constructor() {
        // default values 
        this.fetchInfo = {
            baseUrl: 'http://localhost:8000/api/',
            method: "GET",
            endpoint: "",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            paramName: "",
            paramValue: "",
            requestBody: "",
            page: ""
        };
    }

    // prepare api url with the help of our fetchinfo property
    // return a url string
    prepareUrl = () => {
        let url;
        url = this.fetchInfo.baseUrl +
             this.fetchInfo.endpoint + "/" ;

        if (this.fetchInfo.paramName)
            url += this.fetchInfo.paramName  + "/" ;

        if (this.fetchInfo.paramValue)
            url += this.fetchInfo.paramValue  + "/" ;

        return url;

    }

    // execute the connection to the api 
    connectTopApi = async () => {
        const url = this.prepareUrl();
        const init = {
            "method": this.fetchInfo.method,
            "headers": this.fetchInfo.headers
        }
        console.log(init);
        // add a body to our request only on POST method otherwise it will throw an exception
        if (this.fetchInfo.method == "POST")
            init.body = JSON.stringify(this.fetchInfo.requestBody);
         
       // console.log(this.fetchInfo.requestBody);    
        // exectute the connection to backedn api 
        const res = await fetch(
            url,
            init
        );
        // format the reponse as json
        return await res.json();

    }
}