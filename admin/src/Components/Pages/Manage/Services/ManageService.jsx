import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";
import { Button, Pagination, Stack, TablePagination } from "@mui/material";
import client from "../../../Common/Client/Client";
import "./ManageService.css";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { Modal, Form, FormLabel } from "react-bootstrap";
import { TextField, Box, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Loader from "../../../Common/Layout/Loader/Loader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const ManageService = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [showAddImage, setShowAddImage] = useState(0);

  const [showImage, setShowImage] = useState(null);
  const [feature, setFeature] = useState([]);
  const [error, setError] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    getProducts();
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

  //delete
  const cancel = (e) => {
    toast.dismiss()
    toast.error("You Cancle delete");
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    try {
      const response = await client.post(
        "/products/delete-products",
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Products successfully deleted");
        getProducts();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to delete the Products details");
      }
    }
  };

  const itemsPerPage = 5;

  const handlepageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleUpdate = (value) => {
    setOpen(true);
    setId(value._id);
    setDescription(value.description);
    const newFeature = value.benefits.map((value) => {
      return {
        value: value,
        error: "",
      };
    });
    setFeature(newFeature);
    setName(value.name);
    setImage(value.image);
  };

  const handleCancel = () => {
    toast.dismiss();

    setOpen(false);
    setLoading(false);
    setId("");
    setShowImage(null);
    setShowAddImage(0);
    setImage(null);
    setDescription("");
    setName("");
    setError({
      name: "",
      description: "",
      image: "",
    });
    setFeature([]);
  };

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
    }  else {
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

  const handleFeatureChange = (index, e) => {
    const { value } = e.target;
    const newFeature = [...feature];
    newFeature[index].value = value;

    if (value.length < 10) {
      newFeature[index].error =
        "Benefits content must be at least 10 characters.";
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
    toast.dismiss();
    if (feature.length >= 5) {
      toast.error("Maximum of 5 Benefits fields can be added.");
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
    toast.dismiss();
    if (feature.length <= 1) {
      toast.error("At least one Benefits field must remain.");
      return;
    }

    const newFeature = [...feature];
    newFeature.splice(index, 1);
    setFeature(newFeature);
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
        var reader = new FileReader();
        reader.onload = function () {
          setShowImage(reader.result);
        };
        reader.readAsDataURL(file);

        setError((prev) => {
          return { ...prev, image: "" };
        });
      }
    }
  };

  const handleSubmit = () => {
    const hasError = feature.some((field) => field.value === "");
    if (name === "" || description === "" || image === null || hasError) {
      toast.error("All fields are required.");
    } else if (error.name !== "") {
      toast.error("Name is required");
      toast.error(error.name);
    } else if (error.description !== "") {
      toast.error(error.description);
    } else if (error.image !== "") {
      toast.error(error.image);
    } else if (feature.some((field) => field.error !== "")) {
      toast.error("Fix the error in Feature field");
    } else {
      setLoading(true);
      sendData();
    }
  };

  const sendData = async () => {
    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("id", id);
      formData.append("name", name);
      formData.append("description", description);
      feature.forEach((field, index) => {
        formData.append("benefits", field.value);
      });

      const response = await client.post("/products/update-products", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("products Update Successfully");
        getProducts();
        setOpen(false);
        setLoading(false);
        setId("");
        setShowImage(null);
        setShowAddImage(0);
        setImage(null);
        setDescription("");
        setName("");
        setError({
          name: "",
          description: "",
          image: "",
        });
        setFeature([]);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to Update products details");
      }
    }
  };

  console.log(id);

  return (
    <Fragment>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Manage Products </li>
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
          <div
            className="card"
            style={{
              width: "100%",
            }}
          >
            <div className="card-body" style={{ padding: "20px" }}>
              <h5
                className="card-title"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                Manage Products
              </h5>
              <div className="table-responsive">
                {products.length > 0 ? (
                  <div>
                    <table className="table table-striped table-hover table-bordered ">
                      <thead>
                        <tr>
                          <th style={{ padding: "8px" }}>Products Name</th>
                          <th style={{ padding: "8px" }}>Images</th>
                          {/* <th style={{ padding: "8px" }}>Description</th> */}

                          <th style={{ padding: "8px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedProducts.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ padding: "8px" }}>{item.name}</td>
                              <td style={{ padding: "8px" }}>
                                <img
                                  src={item.image}
                                  alt="image service"
                                  className="image-table"
                                />
                              </td>
                              {/* <td style={{ padding: "8px" }}>{item.description}</td> */}

                              <td>
                                <span
                                  className="icon edit-icon mb-3 "
                                  onClick={() => handleUpdate(item)}
                                >
                                  <FaPencilAlt />
                                </span>
                                <Popconfirm
                                  title="Delete the Products Details"
                                  description="Are you sure to delete this Products Details?"
                                  onConfirm={() => handleDelete(item._id)}
                                  onCancel={cancel}
                                  okText="Yes"
                                  cancelText="No"
                                  className="table-button"
                                >
                                  <span className="icon delete-icon">
                                    <RiDeleteBinFill />
                                  </span>
                                </Popconfirm>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center mt-3">
                      <Stack spacing={2}>
                        <Pagination
                          count={Math.ceil(products.length / itemsPerPage)}
                          page={page}
                          onChange={handlepageChange}
                          shape="rounded"
                          color="primary"
                        />
                      </Stack>
                    </div>
                  </div>
                ) : (
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
                      No Products Available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <Modal show={open} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Update Products Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group>
                      <div className="mt-2">
                        <div className="mb-1">
                          <FormLabel>
                            <span>Products Name *</span>
                          </FormLabel>
                        </div>
                        <TextField
                          label="Products Name"
                          slotProps={{
                            htmlInput: {
                              maxLength: 50,
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
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group>
                      <div className="mt-2">
                        <div className="mb-1">
                          <FormLabel>
                            <span>Description *</span>
                          </FormLabel>
                        </div>
                        <TextField
                          label="Description"
                          name="description"
                          multiline
                          slotProps={{
                            htmlInput: {
                              maxLength: 500,
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
                      </div>
                    </Form.Group>
                  </div>
             
                  <div className="col-md-12">
                    <Form.Group>
                      <div className="mt-2">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5 style={{ textAlign: "center" }}>
                            Benefits Content*
                          </h5>
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
                                  maxLength: 500,
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
                                if (
                                  !allowedKeys.includes(e.key) &&
                                  !allowedCharPattern.test(e.key)
                                ) {
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
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group>
                      <div className="up-main-image" style={{ width: "100%" }}>
                        <div>
                          <FormLabel>
                            Image
                            {showAddImage === 1 ? (
                              <span>(choose one Image) *</span>
                            ) : (
                              <></>
                            )}
                          </FormLabel>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          {showAddImage === 1 ? (
                            <>
                              <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                style={{ marginTop: "10px" }}
                                disabled={image !== null}
                              >
                                Product Image
                                <VisuallyHiddenInput
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </Button>
                              <div>
                                {showImage === null ? (
                                  <></>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                      alignItems: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <img
                                      src={showImage}
                                      alt=""
                                      width="100px"
                                      height="100px"
                                    />
                                    <Button
                                      color="error"
                                      variant="contained"
                                      onClick={() => {
                                        setShowImage(null);
                                        setImage(null);
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="image-delete-button">
                              <img
                                src={image}
                                alt=" "
                                width="100px"
                                height="100px"
                              />
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  setShowAddImage(1);
                                  setImage(null);
                                }}
                                style={{
                                  marginTop: "27px",
                                  marginLeft: "15px",
                                  width: "20px",
                                  height: "40px",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                          {error.image && (
                            <div
                              style={{
                                color: "red",
                                marginLeft: "20px",
                                fontSize: "13px",
                              }}
                            >
                              {error.image}
                            </div>
                          )}
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", margin: "20px auto" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
                {loading && <Loader/>}
          </Modal>
       
        </div>
       
      </main>
      
    </Fragment>
  );
};

export default ManageService;
