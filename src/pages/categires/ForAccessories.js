import React from "react";
import AddCategories from "../../components/AddCategories";
import {useSelector} from "react-redux";
import {selectCategoriesName} from "../../store/slices/userSlices";

const ForAccessories = () => {

  const categoriesName = useSelector(selectCategoriesName)

  return (
    <div className="sectionContainer">
      <AddCategories categoriesName={categoriesName}/>
    </div>
  
  );
};

export default ForAccessories;
