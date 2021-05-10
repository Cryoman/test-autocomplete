import {User} from "./UserTypes";
import {Photo} from "./PhotoTypes"
export const searchUsers = async (): Promise<User[]> => {
     return await fetch(
        `https://jsonplaceholder.typicode.com/users`
    ).then((users: any) => users.json())
}
export const searchPhotos = async (user: User): Promise<Photo> => { 
    return await fetch(
    `https://jsonplaceholder.typicode.com/photos/${user.id}`
  ).then((data: any) => data.json());
}