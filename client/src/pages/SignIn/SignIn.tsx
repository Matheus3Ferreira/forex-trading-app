import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./index.scss";
import api from "../../services/api";
import ValidationAuthenticationData from "../../components/ValidationAuthenticationData/ValidationAuthenticationData";

interface IInputField {
  email: string;
  password: string;
}

interface IResponseData {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    wallet: number;
    trades: string[];
    createdAt: Date;
  };
}

export default function SignIn() {
  const [inputField, setInputField] = useState<IInputField>({
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

  async function signInFunction({ email, password }: IInputField) {
    const response = await api.post("/sessions/", { email, password });
    return response;
  }

  async function submitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ValidationAuthenticationData(inputField)) return;
    const signInRequest = await toast.promise(signInFunction(inputField), {
      loading: "Loading",
      success: "Login Success!",
      error: "Email/Password incorrect.",
    });
    if (signInRequest.status === 200) {
      localStorage.setItem("token", signInRequest.data.token);
      setLogged(true);
    }
  }

  return (
    <div className="sign-in-page bg-dark text-white">
      <Toaster />
      {logged && <Navigate to="/dashboard" replace={true} />}
      <Form onSubmit={submitForm} className="form-container">
        <header className="form-header">
          <h2>Sign In</h2>
        </header>
        <div className="line-form" />
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
            Don t have an account? <Link to="/">Sign Up</Link>
          </span>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </footer>
      </Form>
    </div>
  );
}
