import Home from "../../Pages/Home/Home";
import Contact from "../../Pages/Manage/Contact/Contact";
import UserContact from "../../Pages/Manage/UserContact/UserContact";
import NotFound from "../NotFound/NotFound";


const route = [
  { path: "/", element: <Home /> },
  { path: "/manage/contact", element: <Contact /> },
  { path: "/manage/user-contact", element: <UserContact /> },
  { path: "*", element: <NotFound /> },
];

export default route;
