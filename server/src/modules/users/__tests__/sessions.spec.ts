import connectDatabase from "../../../database";
import CreateSessionService from "../services/CreateSessionService";

describe("Create Session Service", () => {
  beforeAll(() => connectDatabase());

  const createSession = new CreateSessionService();

  it("should create a session and provide a token", async () => {
    const userData = {
      email: "john@test.com",
      password: "test123",
    };

    const session = await createSession.execute(userData);
    expect(session).toHaveProperty("token");
  });

  it("shouldn't create a session with invalid email", async () => {
    await expect(
      createSession.execute({ email: "jon1@test.com", password: "test123" })
    ).rejects.toEqual(new Error("Incorrect email/password."));
  });

  it("shouldn't create a session with invalid password", async () => {
    await expect(
      createSession.execute({ email: "john1@test.com", password: "test1234" })
    ).rejects.toEqual(new Error("Incorrect email/password."));
  });
});
