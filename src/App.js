import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import { Alert } from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message = "This is Noteitem Alert!!"/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} ></Route>
              <Route path="/about" element={<About />}> </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
