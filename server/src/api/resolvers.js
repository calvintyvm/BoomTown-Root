import fetch from "node-fetch";
import { isContext } from "vm";


export default function Resolvers({jsonServer}){
return{
    Query: {
     items(root){
        return jsonServer.items();
     },
     users(root){
        return jsonServer.users();
     },
     item(root,{id}){
        return jsonServer.item();

     },
     user(root,{id}){
        return jsonServer.user();

     },
     
    },
    Item:{
        async borrower({ borrower }, args,context) {
            return borrower
                ? await context.loaders.getItemBorrowerUser.load(borrower)
                :null;
        },
        itemowner({itemowner}){
            return context.loaders.getItemownerUser.load(itemowner);
        }
        
    },

    User:{
        owneditems({id}, args,context){
            return context.loaders.getUserOwnedItems.load(id);
        },
        borroweditems({id },args,context){
            return context.loaders.getUserBorrowedItems.load(id);
        }
    },
     Mutation: {
        async addItem(root, item) {
        // var body = { a: 1 };
          return jsonServer.additem();

        

        }
      }

    
}
};

