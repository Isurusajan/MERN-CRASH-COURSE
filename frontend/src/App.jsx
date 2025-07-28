import { Box,} from "@chakra-ui/react";
import {Route,Routes}from "react-router-dom";
import HomePage from "../pages/HomePage";
import Createpage from "../pages/Createpage";
import Navbar from "../components/Navbar";

function App() {
  return (
   <Box minH={"100vh"}>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/> }/>
      <Route path="/create" element={<Createpage/> }/>
      </Routes>
   </Box>
  );
}

export default App;
