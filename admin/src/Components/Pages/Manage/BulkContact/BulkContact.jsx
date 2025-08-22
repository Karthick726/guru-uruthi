import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";
import { Button, Pagination, Stack, TablePagination } from "@mui/material";
import client from "../../../Common/Client/Client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BulkContact = () => {
  const [contact, setContact] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getUserContact();
  }, []);

  const getUserContact = async () => {
    try {
      const response = await client.get("/bulk-order/get-bulk-order", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setContact(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to fetch user contact details");
      }
    }
  };

  const itemsPerPage = 5;

  const handlepageChange = (event, value) => {
    setPage(value);
  };

  const paginatedContact = contact.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleDownloadContacts = (contacts) => {
    if (!contact || contact.length === 0) {
      toast.error("No  bulk contact data available to download.");
      return;
    }

    // Map contact data for Excel
    const data = contact?.map((item, index) => ({
      "S.No": index + 1,
      "Date and Time": formatDateTime(item.createdAt),
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Country: item.country,
      Products: item.products.join(", "),
      Message: item.message,
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    // Export to file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, `contacts-${new Date().toISOString().split("T")[0]}.xlsx`);
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
              <li className="breadcrumb-item active">
                Manage/Bulk Order Contact{" "}
              </li>
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
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body" style={{ padding: "20px" }}>
              <h5
                className="card-title"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                Manage Bulk Order contact
              </h5>
              <div className="table-responsive">
                {contact.length > 0 ? (
                  <div>
                    <div
                      style={{
                        marginBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleDownloadContacts}
                        style={{
                          backgroundColor: "green ",
                        }}
                      >
                        Download in Excel
                      </Button>
                    </div>
                    <table className="table table-striped table-hover table-bordered ">
                      <thead>
                        <tr>
                          <th style={{ padding: "8px" }}>Name</th>
                          <th style={{ padding: "8px" }}>Email</th>
                          <th style={{ padding: "8px" }}>Phone Number</th>
                          <th style={{ padding: "8px" }}>Country</th>
                          <th style={{ padding: "8px" }}>products</th>
                          <th style={{ padding: "8px", width: "33%" }}>
                            Message
                          </th>
                          <th style={{ padding: "8px" }}>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedContact.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ padding: "8px" }}>{item.name}</td>
                              <td style={{ padding: "8px" }}>{item.email}</td>
                              <td style={{ padding: "8px" }}>{item.phone}</td>
                              <td style={{ padding: "8px" }}>{item.country}</td>
                              <td style={{ padding: "8px" }}>
                                {item.products.join(", ")}
                              </td>
                              <td style={{ padding: "8px" }}>{item.message}</td>
                              <td style={{ padding: "8px" }}>
                                {new Date(item.createdAt).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  }
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center mt-3">
                      <Stack spacing={2}>
                        <Pagination
                          count={Math.ceil(contact.length / itemsPerPage)}
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
                      No Bulk Contact Available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default BulkContact;
