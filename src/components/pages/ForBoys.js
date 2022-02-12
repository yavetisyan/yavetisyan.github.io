import CategoriesContext from "context/CategoriesContext";
import React, { useEffect } from "react";
import { useContext } from "react";
import AddCategories from "./AddCategories";

const ForBoys = () => {
  const { setGetCatName } = useContext(CategoriesContext);

  useEffect(() => {
    setGetCatName("Boys");
  }, [setGetCatName]);

  return (
    <div className="sectionContainer">
      <AddCategories />
    </div>
  );
};

export default ForBoys;
