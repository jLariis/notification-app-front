import Category from "./category";
import Channel from "./channels";
import User from "./user";

export default interface Log {
    id: string;
    message: string;
    category: Category;
    channel: Channel;
    user: User;
    createdAt: Date;
}