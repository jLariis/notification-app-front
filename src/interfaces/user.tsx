import Category from "./category";
import Channel from "./channels";

export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    subscribed: Category[];
    channels: Channel[]
}