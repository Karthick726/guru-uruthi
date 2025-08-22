import React, { useState,Fragment } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FormLabel } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import client from "../../Common/Client/Client";
import Grid from "@mui/material/Grid";
import "./Service.css"
import Loader from "../../Common/Layout/Loader/Loader";


const Services = () => {
      const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [feature, setFeature] = useState([{ value: "", error: "" }]);
  const [error, setError] = useState({
    name: "",
    description: "",
    image: "",
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
    if (fieldName === "description") {
      if (fieldValue.length < 10) {
        message = `Description is Invalid`;
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
    }else {
      setDescription(value);
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
      const fileSize = file.size / 1024 / 1024;

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



  const handleFeatureChange = (index, e) => {
    const { value } = e.target;
    const newFeature = [...feature];
    newFeature[index].value = value;

    if (value.length < 10) {
      newFeature[index].error = "Benefits content must be at least 10 characters.";
    } else {
      newFeature[index].error = "";
    }

    setFeature(newFeature);
  };

 
  const handleFeatureBlur = (index, e) => {
    const { value } = e.target;
    const newFeature = [...feature];
    if (value === "") {
      newFeature[index].error = "Benefits content is required.";
    }
    setFeature(newFeature);
  };


  const addFeatureField = () => {
    if (feature.length >= 10) {
      toast.error("Maximum of 10 Benefits fields can be added.");
      return;
    }

    const lastField = feature[feature.length - 1];
    if (lastField.value === "") {
      toast.error("Complete the current field.");
    } else if (lastField.error) {
      toast.error("Fix the error in Benefits field");
    } else {
      setFeature([...feature, { value: "", error: "" }]);
    }
  };


  const deleteFeatureField = (index) => {
    if (feature.length <= 1) {
      toast.error("At least one Benefits field must remain.");
      return;
    }

    const newFeature = [...feature];
    newFeature.splice(index, 1);
    setFeature(newFeature);
  };

  const handleSubmit = () => {
    const hasError = feature.some(field => field.value === "" );
    if (name === "" || description === "" || image === null || hasError) {
      toast.error("All fields are required.");
    } else if (error.name !== "") {
      toast.error("Name is required");
      toast.error(error.name);
    } else if (error.description !== "") {
      toast.error(error.description);
    } else if (error.image !== "") {
      toast.error(error.image);
    }else if ( feature.some(field =>  field.error!=="")){
      toast.error("Fix the error in Feature field");
    }else {
      setLoading(true);
      sendData();
    }
  };

  const sendData = async () => {
    try {
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      feature.forEach((field, index) => {
      formData.append("benefits",field.value);})
    
      const response = await client.post("/products/add-products", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("products Added Successfully");
        setName("");
        setDescription("");
        setImage(null);
        setLoading(false);
        setFeature([{ value: "", error: "" }]);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to add Products details");
      }
    }
  };
  return (
     <Fragment>
         <main id="main" className="main">
      <div className="pagetitle">
    
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Products </li>
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
        <div className="card"  >
          <div className="card-body" style={{ padding: "20px" }}>
          <h5
              className="card-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
             Add Products
            </h5>
              <form>
              
              <div className="card-item">
   <Box sx={{ marginBottom: "20px" }}>
                            <TextField
                              label="Products Name"
                              slotProps={{
                                htmlInput: {
                                  maxLength: 50,
                                },
                              }}
                              fullWidth
                              required
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
                          <Box sx={{marginBottom:"20px" }}>
                            <TextField
                              label="Description"
                              name="description"
                              required
                        
                 
                              slotProps={{
                                htmlInput: {
                                  maxLength: 1000,
                                },
                              }}
                              onKeyDown={(e) => {
                                // Prevent spaces as the first character
                                if (description.length === 0 && e.key === " ") {
                                  e.preventDefault();
                                  return;
                                }
                              }}
                              fullWidth
                              variant="outlined"
                              value={description}
                              onChange={handleChange}
                              error={!!error.description}
                              helperText={error.description}
                              onBlur={handleBlur}
                            />
                          </Box>
                       
                        
                             <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <FormLabel
                              sx={{
                                marginBottom: "10px",
                              }}
                            >
                              <span> Image(choose one Image)</span>
                            </FormLabel>
                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload Image *
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
              </div>
               
                       
                          
            
                          
            
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <h5 style={{ textAlign: "center" }}>Benefits Content *</h5>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="success"
                                onClick={addFeatureField}
                              >
                                Add
                              </Button>
                            </Box>
                          </div>
            
                          {feature.map((field, index) => (
                            <Box
                              key={index}
                              sx={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <TextField
                                label={`Benefits Content ${index + 1}`}
                                fullWidth
                                variant="outlined"
                                slotProps={{
                                  htmlInput: {
                                    maxLength: 200,
                                  },
                                }}
                                rows={2}
                                multiline
                                value={field.value}
                                onChange={(e) => handleFeatureChange(index, e)}
                                onBlur={(e) => handleFeatureBlur(index, e)}
                                error={!!field.error}
                                helperText={field.error}
                                onKeyDown={(e) => {
                                  const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                      " ",
                                  ];
                                  const allowedCharPattern = /^[A-Za-z.,-_ ]$/; // Allow letters, spaces, and some special characters
                  
                                  // Prevent spaces as the first character
                                  if (field.value.length === 0 && e.key === " ") {
                                      e.preventDefault();
                                      return;
                                  }
                  
                                  // Check if the pressed key is not allowed
                                  if (!allowedKeys.includes(e.key) && !allowedCharPattern.test(e.key)) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                  }
                              }}
                  
                              />
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleteFeatureField(index)}
                                disabled={feature.length <= 1} // Disable for the last field
                                sx={{ marginLeft: "10px" }}
                              >
                                Delete
                              </Button>
                            </Box>
                          ))}
            
                       
            
                         
            
                          <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSubmit}
                            >
                              Submit 
                            </Button>
                          </Box>
                        </form>
            </div>
            </div>
            {loading && <Loader />}
            </section>
                      
            </main>
    
            </Fragment>
  )
}

export default Services