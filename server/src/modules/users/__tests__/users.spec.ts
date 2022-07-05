import CreateUserService from "../services/CreateUserService";
import connectDatabase from "../../../database";
import DeleteUserService from "../services/DeleteUserService";
import findOneByIdService from "../services/FindOneByIdService";

beforeAll(() => connectDatabase());

describe("Create user service", () => {
  const userData = {
    name: "Johnny Test",
    email: "john2@test.com",
    password: "123456",
    id: "",
  };
  const create = new CreateUserService();

  it("should create an user", async () => {
    const createUser = await create.execute(userData);
    expect(createUser).toHaveProperty("token");
    if (!!createUser) userData["id"] = createUser.user._id.toString();
  });

  it("should throw error when trying to create an user with dexisting email", async () => {
    await expect(create.execute(userData)).rejects.toEqual(
      new Error("Email already exists")
    );
  });

  it("should delete test user", async () => {
    const deleteService = new DeleteUserService();
    const deleteUser = await deleteService.execute(userData.id);
    expect(deleteUser).toBe(true);
  });
});

describe("Find one user", () => {
  const findService = new findOneByIdService();
  it("should find and return the user Johnny Test", async () => {
    const user = await findService.execute("62c3568b2187c38058b1e5f8");
    expect(user).toHaveProperty("_id");
  });

  it("should throw error when trying to find an user with dexisting id", async () => {
    await expect(
      findService.execute("62bf263a4c0380657deeed76")
    ).rejects.toEqual(new Error("User not found"));
  });

  it("should throw error when trying to find an user with an invalid id", async () => {
    await expect(
      findService.execute("62bf26Im3a4c038not0657deeehered76")
    ).rejects.toEqual(new Error("Invalid id"));
  });
});
