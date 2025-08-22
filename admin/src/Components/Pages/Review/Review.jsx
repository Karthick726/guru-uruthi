import React, { useState } from "react";
import { TextField, Button, Box, Rating } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FormLabel } from "@mui/material";
import client from "../../Common/Client/Client";
import Loader from "../../Common/Layout/Loader/Loader";

const Review = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState({
    name: "",
    review: "",
    image: "",
    rating: "",
  });

  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "name") {
      if (fieldValue.length < 3) {
        message = `Name is Invalid`;
      } else {
        message = "";
      }
    }
    if (fieldName === "review") {
      if (fieldValue.length < 10) {
        message = `Review is Invalid`;
      } else {
        message = "";
      }
    }
    return { message: message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    if (name === "name") {
      setName(value);
    } else {
      setReview(value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // Convert size to MB

      if (!fileType.startsWith("image/")) {
        setImage(null);
        setError((pre) => {
          return { ...pre, image: "Please select an valid image file." };
        });
      } else if (fileSize > 1) {
        setImage(null);
        setError((pre) => {
          return { ...pre, image: "File size exceeds 1 MB." };
        });
      } else {
        setImage(file);

        setError((prev) => {
          return { ...prev, image: "" };
        });
      }
    }
  };

  const handleSubmit = () => {
    if (name === "" || review === "" || image === null || rating === 0) {
      toast.error("All fields are required.");
    } else if (error.name !== "") {
      toast.error("Name is required");
      toast.error(error.name);
    } else if (error.review !== "") {
      toast.error(error.review);
    } else if (error.image !== "") {
      toast.error(error.image);
    } else if (error.rating !== "") {
      toast.error(error.rating);
    } else {
      setLoading(true);
      sendData();
    }
  };

  const sendData = async () => {
    try {
        const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("review", review);
      formData.append("rating", rating);


      const response = await client.post("/review/addreview", formData,{
        withCredentials:true
      });
      if (response.status === 200) {
        toast.success("Review Added Successfully");
        setName("");
        setReview("");
        setImage(null);
        setRating(0);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to add review details");
      }
    }
  };

  console.log(error);
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav
          style={{
            marginTop: "10px",
          }}
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Reviews</li>
          </ol>
        </nav>
      </div>
      <section
        className="section dashboard"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
        <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
          <div
            className="card-body"
            style={{
              padding: "20px",
            }}
          >
            <h5
              className="card-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Add Reviews
            </h5>
            <form>
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  label="Name"
                  slotProps={{
                    htmlInput: {
                      maxLength: 20,
                    },
                  }}
                 
                
              
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  error={!!error.name}
                  helperText={error.name}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                      " ",
                    ];
                    const allowedCharPattern = /^[A-Za-z.,_-]$/;
                    // Prevent spaces as the first character
                    if (name.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }
              
                    // Check if the pressed key is not allowed
                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault(); // Prevent the default action of the disallowed key
                    }
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  label="Review"
                  name="review"
                  multiline
                  rows={4}
                  slotProps={{
                    htmlInput: {
                      maxLength: 250,
                    },
                  }}
               
                
                  onKeyDown={(e) => {
                 
                    // Prevent spaces as the first character
                    if (review.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }
              
                  
                  }}
                  fullWidth
                  variant="outlined"
                  value={review}
                  onChange={handleChange}
                  error={!!error.review}
                  helperText={error.review}
                  onBlur={handleBlur}
                />
              </Box>

              <Box
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormLabel
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <span>Student Image(choose one Image)</span>
                </FormLabel>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                {image && <p>{image.name}</p>}
                {error.image && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {error.image}
                  </p>
                )}
              </Box>

              <Box
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <FormLabel
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  <span> Rating</span>
                </FormLabel>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>

              {error.rating && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {error.rating}
                </p>
              )}

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit Review
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </section>
      {loading && <Loader />}
    </main>
  );
};

export default Review;