import { ChangeEvent, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import ValidationAuthenticationData from "../../components/ValidationAuthenticationData/ValidationAuthenticationData";
import api from "../../services/api";

interface IInputField {
  fullName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [inputField, setInputField] = useState<IInputField>({
    fullName: "",
    email: "",
    password: "",
  });

  const [logged, setLogged] = useState<boolean>(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setInputField({
      ...inputField,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function signUpFunction({ fullName, email, password }: IInputField) {
    const response = await api.post("/users", {
      name: fullName,
      email: email,
      password: password,
    });
    return response;
  }

  async function submitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ValidationAuthenticationData(inputField)) return;
    const signUpRequest = await toast.promise(signUpFunction(inputField), {
      loading: "Loading",
      success: "Registration successful!",
      error: "Email already exists. Try sign in.",
    });
    if (signUpRequest.status === 201) {
      localStorage.setItem("token", signUpRequest.data.token);
      setLogged(true);
    }
  }

  return (
    <div className="sign-in-page bg-dark text-white">
      <Toaster />
      {logged && <Navigate to="/dashboard" replace={true} />}
      <Form onSubmit={submitForm} className="form-container">
        <header className="form-header">
          <h2>Sign Up</h2>
        </header>
        <div className="line-form" />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Enter your name"
            autoFocus
            value={inputField.fullName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="youremail@example.com"
            value={inputField.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="********"
            value={inputField.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="line-form" />
        <footer className="form-footer">
          <span>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </span>
          <Button variant="primary" type="submit">
            Registry
          </Button>
        </footer>
      </Form>
    </div>
  );
}
