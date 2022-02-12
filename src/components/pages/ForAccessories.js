import CategoriesContext from "context/CategoriesContext";
import React, { useContext, useEffect } from "react";
import AddCategories from "./AddCategories";

const ForAccessories = () => {
  const { setGetCatName } = useContext(CategoriesContext);

  useEffect(() => {
    setGetCatName("Accessories");
  }, [setGetCatName]);

  return (
    <div className="sectionContainer">
      <AddCategories />
    </div>
  );
};

export default ForAccessories;
