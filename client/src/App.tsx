import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Welcome from './pages/Welcome/Welcome';

function App() {

  return (
    <BrowserRouter> 
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
