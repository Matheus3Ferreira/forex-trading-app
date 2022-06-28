import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import {Button, Modal, Form} from "react-bootstrap"
import toast, { Toaster } from "react-hot-toast";

interface IInputField {
  fullName: string;
  email: string;
  password: string;
}


function SignUpModal() {
    const [show, setShow] = useState<boolean>(true);
    const [inputField, setInputField] = useState<IInputField>({
      fullName: "",
      email: "",
      password: "",

    })
  
    const handleClose = () => setShow(false);
      
      const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setInputField({...inputField, [event.currentTarget.name]: event.currentTarget.value});
      };
      
      
      const emailValidation = (email: string) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (inputField.fullName.trim() === ""){
          toast.error("Full name is not valid.");
          return false;
        }
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
      
      const ValidateData = () => {
        if (!emailValidation(inputField.email))
          return false;
        handleClose();
      };


    return (
      <div>
        <Toaster/>
        <Modal show={show} onHide={handleClose} backdrop={"static"} keyboard={false}>
          <Modal.Header className="bg-dark text-white ">
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Matheus da Silva Ferreira"
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
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between bg-dark text-white">
            <span>Already have an account? <a href="#" onClick={handleClose}>Sign In</a></span>
            <Button variant="primary" onClick={ValidateData}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }  
  
export default SignUpModal;