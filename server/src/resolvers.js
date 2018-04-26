import fetch from "node-fetch";
const resolveFunctions = {
    Query: {
     items(root){
        return fetch(`http://localhost:3001/items`)
        .then(response=>response.json())
        .catch(error=>console.log(error));
     },
     users(root){
        return fetch(`http://localhost:3001/users`)
        .then(response=>response.json())
        .catch(error=>console.log(error));
     },
     item(root,{id}){
        return fetch (`http://localhost:3001/items/${id}`)
        .then(response=>response.json())

     },
     user(root,{id}){
        return fetch (`http://localhost:3001/users/${id}`)
        .then(response=>response.json())

     },
     
    },
    Item:{
        async borrower({ borrower }) {
            const user = await fetch(`http://localhost:3001/users/${borrower}`);
            const json = await user.json();
            if (!json.id) return null;
            return json;
        },
        itemowner({itemowner}){
            return fetch(`http://localhost:3001/users/${itemowner}`)
            .then(response=>response.json())
        }
        
    },

    User:{
        owneditems({id}){
            return fetch(`http://localhost:3001/items/?itemowner=${id}`)
            .then(response=>response.json())
        },
        borroweditems({id }){
            return fetch(`http://localhost:3001/items/?borrower=${id}`)
            .then(response=>response.json())
        }
    }


};
export default resolveFunctions;