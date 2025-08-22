import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import client from "../../Common/Client/Client";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ContactsIcon from '@mui/icons-material/Contacts';
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReviewsIcon from '@mui/icons-material/Reviews';
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import bookings from "../../../Assets/Images/bg-imgae-login.avif";


const Home = () => {
  const [products, setProducts] = useState([]);
     const [reviews,setReviews]=useState([])
         const [userContact,setUserContact]=useState([])

    useEffect(() => {
      getProducts();
      getReviews();
      getUserContact();
    }, []);
  
    const getProducts = async () => {
      try {
        const response = await client.get("/products/get-products", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Login again");
        } else {
          toast.error("Failed to fetch Products details");
        }
      }
    };

      const getReviews=async()=>{
        try{
            const response = await client.get('/review/getreview',{
                withCredentials:true
            })
            if(response.status===200){
                setReviews(response.data)
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                toast.error("Login again");
              } else {
                toast.error("Failed to fetch user contact details");
              }
        }
    }

     const getUserContact=async()=>{
        try{
            const response = await client.get('/usercontact/get-user-contact',{
                withCredentials:true
            })
            if(response.status===200){
                setUserContact(response.data)
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                toast.error("Login again");
              } else {
                toast.error("Failed to fetch user contact details");
              }
        }
    }

      const lastFiveBookings = userContact.slice(-5);
  return (
    <Fragment>
      <main
        id="main"
        className="main"
        style={{ backgroundColor: "#F9F9F9", padding: "20px" }}
      >
        <div className="pagetitle">
          <h1 style={{ fontWeight: "bold", color: "#333" }}>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: "#6C757D" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

          <Grid container spacing={10} sx={{ mt: 2, mb: 4 }}>
                  <Grid item size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{
                        position: "relative",
                        color: "#000",
                        p: 3,
                        boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)",
                        borderRadius: 2,
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${bookings})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "brightness(0.5)",
                          zIndex: 1,
                        },
                        "&:hover": {
                          transform: "scale(1.02)",
                          transition: "0.3s",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        <BookOnlineIcon sx={{ fontSize: 40, color: "#fbc02d" }} />
                        <Typography variant="h6" align="center">
                         Products Count
                        </Typography>
                        <Typography variant="h4" align="center">
                          {products?.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
        
                  <Grid item size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{
                        position: "relative",
                         bgcolor: "#000",
                        color: "#000",
                        p: 3,
                        boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)",
                        borderRadius: 2,
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${bookings})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.6,
                          zIndex: 1,
                        },
                        "&:hover": {
                          transform: "scale(1.02)",
                          transition: "0.3s",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ReviewsIcon sx={{ fontSize: 40, color: "#fbc02d" }} />
                        <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
                         Review  Count
                        </Typography>
                        <Typography variant="h4" align="center" sx={{ color: "#fff" }}>
                               {reviews?.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                    <Grid item size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{
                        position: "relative",
                        bgcolor: "#000",
                        color: "#000",
                        p: 3,
                        boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)",
                        borderRadius: 2,
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${bookings})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.6,
                          zIndex: 1,
                        },
                        "&:hover": {
                          transform: "scale(1.02)",
                          transition: "0.3s",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ContactsIcon sx={{ fontSize: 40, color: "#fbc02d" }} />
                        <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
                          User Contact Count
                        </Typography>
                        <Typography variant="h4" align="center" sx={{ color: "#fff" }}>
                         {userContact?.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

          <div className="recent-bookings">
                   <Typography
                     variant="h6"
                     gutterBottom
                     sx={{
                       color: "#333",
                       fontWeight: "bold",
                       fontSize: "1.2rem",
                       mb: 2,
                     }}
                   >
                    Last 5 User Contact
                   </Typography>
                   <div className="table-responsive">
                      {userContact.length> 0 ? (
                       <div>
                           <table className="table table-striped table-hover table-bordered ">
                           <thead>
                             <tr
                              
                             >
                               <th style={{ padding: "8px" }}>Name</th>
                               <th style={{ padding: "8px" }}>Email</th>
                               <th style={{ padding: "8px" }}>Phone Number</th>
                               <th style={{ padding: "8px", width: "33%" }}>Message</th>
           
                             
                             </tr>
                           </thead>
                           <tbody>
                             {lastFiveBookings.map((item,index)=>{
                                 return(
                                     <tr key={index}>
                                         <td style={{ padding: "8px" }}>{item.name}</td>
                                         <td style={{ padding: "8px" }}>{item.email}</td>
                                         <td style={{ padding: "8px" }}>{item.phoneNumber}</td>
                                         <td style={{ padding: "8px" }}>{item.message}</td>
                              
                                     </tr>)
                             })}
                             </tbody>
                             </table>
                            
                   </div>
                      ):(
                             <div
                             style={{
                               display: "flex",
                               flexDirection: "column",
                               alignItems: "center",
                               justifyContent: "center",
                               padding: "24px",
                               border: "1px solid #ddd",
                               borderRadius: "12px",
                               backgroundColor: "#f9f9f9",
                               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                               maxWidth: "300px",
                               margin: "20px auto",
                               textAlign: "center",
                             }}
                           >
                             <span
                               className="mb-2"
                               style={{
                                 marginBottom: "12px",
                                 fontSize: "16px",
                                 fontWeight: "500",
                                 color: "#555",
                               }}
                             >
                               No User Contact Available
                             </span>
             
                            
                           </div>
                      )}
                     </div>
                 </div>
      </main>
    </Fragment>
  );
};

export default Home;
