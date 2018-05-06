import fetch from "node-fetch";

const jsonApi = "http://localhost:3001";

export default function(app) {
  return {
    getUserOwnedItems(id) {
      return fetch(`${jsonApi}/items/?itemowner=${id}`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    getBorrowedItems(id) {
      return fetch(`${jsonApi}/items/?itemowner=${id}`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    getItem(id) {
      return fetch(`${jsonApi}/items/${id}`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    getUser(id) {
      return fetch(`${jsonApi}/users/${id}`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    getItems() {
      return fetch(`${jsonApi}/items`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    getUsers() {
      return fetch(`${jsonApi}/users`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    async getBorrower(borrower) {
      const user = await fetch(`${jsonApi}/users/${borrower}`);
      const json = await user.json();
      if (!json.id) return null;
      console.log("hello");
      return json;
    },
    getItemOwner(itemowner) {
      return fetch(`${jsonApi}/users/${itemowner}`)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    addItem(args) {
      const newItem = {
        name: args.name,
        title: args.title,
        description: args.description,
        imageurl: args.imageurl,
        tags: args.tags,
        itemowner: args.itemowner,
        created: args.created,
        available: args.available,
        borrower: args.borrower
      };

      fetch(`${jsonApi}/items`, {
        body: JSON.stringify(newItem),
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      }).then(response => response.json());
      return newItem;
    }
  };
}
