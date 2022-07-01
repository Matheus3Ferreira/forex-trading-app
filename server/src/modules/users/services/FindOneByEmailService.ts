import User from "../models/user";

export default class FindOneByEmailService {
    public async execute(email: string) {
        
        const user = await User.findOne({email: email});
        if (!user)
            throw new Error("User not found");

        return user;
    }
}