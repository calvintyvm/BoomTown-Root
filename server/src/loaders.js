import DataLoader from 'dataloader';
import { getUserOwnedItems, getUserBorrowedItems, getItemownerUser,ItemBorrowerUser } from './jsonServer'

export function Loaders() {
    return {
        UserOwnedItems: new DataLoader((ids) => {
            return Promise.all(ids.map(id => getUserOwnedItems(id)))
        }),
        UserBorrowedItems: new DataLoader((ids) =>{
            return Promise.all(ids.map(id => getBorrowedItems(id)))
        }),
        ItemownerUser: new DataLoader((ids)=>{
            return Promise.all(ids.map(id=>getItemownerUser(id)))
        }),
        ItemBorrowerUser: new DataLoader((ids)=>{
            return Promise.all(ids.map(id=>getItemBorrowerUser(id)))
        })


    }
}
