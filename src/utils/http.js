
const http = {
   
    get (url) {
        return fetch(url).then(res => res.json())
    },
    
    
    post ({url, body}) {
        return fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(res => res.json())
    }
};

export default http;