import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import {Button, Form} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./index.css"

interface IInputField {
    email: string;
    password: string;
  }

export default function SignIn() {
    const [inputField, setInputField] = useState<IInputField>({
      email: "",
      password: "",
    })
  
      
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInputField({...inputField, [event.currentTarget.name]: event.currentTarget.value});
    };
    
    
    const emailValidation = (email: string) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(regex.test(email)) || !email){
        toast.error("Email is not valid.")
        return false;
    }
    if (inputField.password.trim() === ""){
        toast.error("Password is not valid.");
        return false;
    }
    return true;
    }
    
    const ValidateData = (event: any) => {
        event.preventDefault();
    if (!emailValidation(inputField.email))
        return false;
    };


    return (
      <div className="sign-in-page bg-dark text-white">
        <Toaster/>
            <Form onSubmit={ValidateData} className="form-container">
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
                  Don't have an account? <Link to="/sign-up">Sign Up</Link>
                </span>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </footer>
            </Form>
      </div>
    );
}