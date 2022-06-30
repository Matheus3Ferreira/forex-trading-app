import "./index.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Welcome(){

    return (
        <div className="bg-dark text-white page-container">
            <h1>Welcome to your new Forex Trading App</h1>
            <p>Lets start creating an account 👉 <Link to="/sign-in/"><Button variant="primary"> Sign Up </Button></Link></p>
            <p>Or</p>
            <Link to="/sign-in/">
                <Button variant="primary"> Sign In </Button>
            </Link>


        </div>
    )
}