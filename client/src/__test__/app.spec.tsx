import { render, screen, waitFor } from "@testing-library/react";
import SignUp from "../pages/SignUp/SignUp";
import "@testing-library/jest-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Sign Up page", () => {
  it("should render SignUp page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(getByText("Sign Up")).toBeTruthy();
  });
  it("should render Sign In page clicking on link", () => {
    const { getByText } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const addLink = getByText("Sign In");

    userEvent.click(addLink);

    expect(screen.getByText("Full name")).toBeInTheDocument();
  });
  // it("should insert inside inputs and submit, beeing redirected to Dashboard page", async () => {
  //   const { getByText, getByPlaceholderText } = render(
  //     <BrowserRouter>
  //       <SignUp />
  //     </BrowserRouter>
  //   );

  //   const inputFullName = getByPlaceholderText("Enter your name");
  //   const inputEmail = getByPlaceholderText("youremail@example.com");
  //   const inputPassword = getByPlaceholderText("********");
  //   const submitButton = getByText("Registry");

  //   userEvent.type(inputFullName, "Matheus Teste");
  //   userEvent.type(inputEmail, "NewEmailTest12143@email.com");
  //   userEvent.type(inputPassword, "thisIsSecret123");

  //   userEvent.click(submitButton);
  //   setTimeout(() => {
  //     expect(screen.getByText("Forex")).toBeInTheDocument();
  //   }, 2000);
  // });
});
