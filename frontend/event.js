async function verifyBiljett() {
    const token = getToken();
    console.log(token);
    const obj = {
        biljetId: "BVEAtKmtr5uliMPhIHEoV"
    }
    const response = await fetch('http://localhost:8000/api/event/verify/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj),
    });
    const data = await response.json();

    console.log(data);
  
    // await saveToken(data.token);
      }



      async function bestallBiljett() {
        const token = getToken();
        const eventId = 1;
        console.log(token);
      //  const obj = {
      //      biljetId: "BVEAtKmtr5uliMPhIHEoV"
      //  }
        const response = await fetch(`http://localhost:8000/api/event/book/${eventId}`, {
            headers: {
        //      'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
          //  body: JSON.stringify(obj),
        });
        const data = await response.json();
    
        console.log(data);
      
        // await saveToken(data.token);
          }

          
      async function getEvents() {
        //const token = getToken();
        //const eventId = 1;
        //console.log(token);
      //  const obj = {
      //      biljetId: "BVEAtKmtr5uliMPhIHEoV"
      //  }
        const response = await fetch(`http://localhost:8000/api/event/`, {
            headers: {
        //      'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            method: 'GET',
          //  body: JSON.stringify(obj),
        });
        const data = await response.json();
    
        console.log(data);
      
        // await saveToken(data.token);
          }
    
    verifyBiljett();     
 // bestallBiljett();
 // getEvents();
