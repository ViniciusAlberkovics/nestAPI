export class UserModel{
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public active: boolean = true;
    public imgProfile: string;
    public roles: Array<String>;
}