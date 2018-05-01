import fetch from 'node-fetch';
import { getItems } from '../../../../client/src/redux/modules/items';

export default function(app){
    return{

getUserOwnedItems(id){
    return fetch(`http://localhost:3001/items/?itemowner=${id}`)
            .then(response=>response.json())
},

getUserBorrowedItems(id){
    return fetch(`http://localhost:3001/items/?borrower=${id}`)
            .then(response=>response.json())
},

getItemownerUser(id){
    return fetch (`http://localhost:3001/users/${id}`)
            .then(response=>response.json())
},

getItemBorrowerUser(id){
    return fetch (`http://localhost:3001/users/${id}`)
            .then(response=>response.json())
},
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
//  borrower({ borrower }) {
//     const user = await fetch(`http://localhost:3001/users/${borrower}`);
//     const json = await user.json();
//     if (!json.id) return null;
//     return json;
// },
itemowner({itemowner}){
    return fetch(`http://localhost:3001/users/${itemowner}`)
    .then(response=>response.json())
},
owneditems({id}){
    return fetch(`http://localhost:3001/items/?itemowner=${id}`)
    .then(response=>response.json())
},
borroweditems({id }){
    return fetch(`http://localhost:3001/items/?borrower=${id}`)
    .then(response=>response.json())
},
addItem(root, item) {
    // var body = { a: 1 };
      const newItem = {
        title: item.title,
        description: item.description,
        imageurl: item.imageurl,
        tags: item.tags,
        itemowner: item.itemowner,
        created:item.created,
        available:item.available,
        borrower: item.borrower
      }

      try{
        fetch(`http://localhost:3001/items/`,{method: 'POST', body: JSON.stringify(newItem),
        headers: { 'Content-Type': 'application/json' }})
        .then(response=>response.json())
        return newItem;
      } catch(e){
          return null;
      }

    

    }



    }

};