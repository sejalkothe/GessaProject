import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./Components/CreatorComponents/AboutUs/AboutUs.js";
import CreateForm from './Components/CreatorComponents/CreateForm/CreateForm.js';
import Home from "./Components/CreatorComponents/Home/Home.js";
import Preview from "./Components/CreatorComponents/Preview/Preview.js";
import Publish from "./Components/CreatorComponents/Publish/Publish.js";
import Response from "./Components/CreatorComponents/Response/Response.js";
import UserEnd from "./Components/UserComponents/UserEnd.js";

function App() {
  const [email, setEmail] = useState("");

  const getEmail = (par) => {
    setEmail(par)
  }

  return (
    <div>
      <Routes>
        <Route index element={<Home />} path="/" />
        <Route element={<CreateForm email={email} />} path="/edit" />
        <Route element={<Preview />} path="/preview" />
        <Route element={<AboutUs />} path="/about" />
        <Route element={<Publish />} path="/publish" />
        <Route element={<UserEnd />} path="/userend/:id" />
        <Route element={<Response />} path="/:id/responses" />
      </Routes>
    </div>
  );
}

export default App;
