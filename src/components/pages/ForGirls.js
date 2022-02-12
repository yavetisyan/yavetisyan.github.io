import CategoriesContext from "context/CategoriesContext";
import React, { useEffect } from "react";
import { useContext } from "react";
import AddCategories from "./AddCategories";

const ForGirls = () => {
  const { setGetCatName } = useContext(CategoriesContext);

  useEffect(() => {
    setGetCatName("Girls");
  }, [setGetCatName]);

  return (
    <div className="sectionContainer">
      <AddCategories />
    </div>
  );
};

export default ForGirls;
