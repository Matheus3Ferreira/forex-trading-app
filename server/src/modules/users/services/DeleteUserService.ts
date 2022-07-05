import User from "../models/user";

export default class DeleteUserService {
  public async execute(id: string): Promise<boolean> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    return true;
  }
}
