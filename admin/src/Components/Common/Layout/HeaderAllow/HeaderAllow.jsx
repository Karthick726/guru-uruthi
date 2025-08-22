import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const HeaderAllow = (props) => {
  const { setAdmin } = props;
  const location = useLocation();
  const headerPaths = [
    "/",
    "/products",
    "/manage/contact",
    "/manage/user-contact",
    "/manage/products",
    "/review",
    "/manage/review",
    "/manage/bulk-order"
  ];
  return (
    <>
      {headerPaths.includes(location.pathname) && (
        <Header setAdmin={setAdmin} />
      )}
    </>
  );
};

export default HeaderAllow;
