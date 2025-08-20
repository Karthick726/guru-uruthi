import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const HeaderAllow = (props) => {
  const { setAdmin } = props;
  const location = useLocation();
  const headerPaths = [
    "/",
    "/service",
    "/business",
    "/manage/contact",
    "/manage/user-contact",
    "/manage/service",
    "/manage/business"
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
