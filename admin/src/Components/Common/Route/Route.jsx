import Home from "../../Pages/Home/Home";
import BulkContact from "../../Pages/Manage/BulkContact/BulkContact";
import Contact from "../../Pages/Manage/Contact/Contact";
import ManageReview from "../../Pages/Manage/ManageReview/ManageReview";
import ManageService from "../../Pages/Manage/Services/ManageService";
import UserContact from "../../Pages/Manage/UserContact/UserContact";
import Review from "../../Pages/Review/Review";
import Services from "../../Pages/Services/Services";
import NotFound from "../NotFound/NotFound";


const route = [
  { path: "/", element: <Home /> },
  { path: "/manage/contact", element: <Contact /> },
  { path: "/manage/products", element: <ManageService /> },
  { path: "/products", element: <Services /> },
  { path: "/review", element: <Review /> },
  { path: "/manage/user-contact", element: <UserContact /> },
  { path: "/manage/review", element: <ManageReview /> },
  { path: "/manage/bulk-order", element: <BulkContact /> },
  { path: "*", element: <NotFound /> },
];

export default route;
