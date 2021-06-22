import { BrowserRouter, Route } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Categoria from "./pages/Categoria";
import Home from "./pages/Home";


toast.configure();
function App() {
  return (
    <BrowserRouter>
         <Route exact path="/" component={Home}/>
         <Route exact path="/categoria" component={Categoria}/>
         <Route exact path="/Login" component={Home}/>
    </BrowserRouter>

  );
}

export default App;
