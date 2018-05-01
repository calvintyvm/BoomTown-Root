import DataLoader from 'dataloader';
import { getUserOwnedItems, getUserBorrowedItems, getItemownerUser,ItemBorrowerUser } from './resources/jsonServer'

export function Loaders({jsonServer}) {
    return {
        UserOwnedItems: new DataLoader((ids) => {
            return Promise.all(ids.map(id => jsonServer.getUserOwnedItems(id)))
        }),
        UserBorrowedItems: new DataLoader((ids) =>{
            return Promise.all(ids.map(id => jsonServer.getBorrowedItems(id)))
        }),
        ItemownerUser: new DataLoader((ids)=>{
            return Promise.all(ids.map(id=> jsonServer.getItemownerUser(id)))
        }),
        ItemBorrowerUser: new DataLoader((ids)=>{
            return Promise.all(ids.map(id=> jsonServer.getItemBorrowerUser(id)))
        })


    }
}
