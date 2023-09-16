import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMealTypes, updateMealTypes } from "./mealTypeSlice";
import ReactSelect from "../../components/ReactSelect";

const MealTypeView = (props) => {
  const [mealTypeOptions, setMealTypeOptions] = useState([]);
  const mealTypes = useSelector((state) => state.mealTypes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMealTypes());
  }, [dispatch]);
  useEffect(() => {
    if (
      mealTypes &&
      mealTypes.mealTypeData &&
      mealTypes.mealTypeData.length > 0
    ) {
      let options = mealTypes.mealTypeData.map((mealType) => {
        return {
          value: mealType.strCategory,
          label: mealType.strCategory,
        };
      });
      setMealTypeOptions([...options]);
    }
  }, [mealTypes, mealTypes.mealTypeData]);

  const onMealTypeChange = (value) => {
    console.log(value);
    dispatch(updateMealTypes(value.value));
  };

  return (
    <>
      {mealTypeOptions && mealTypeOptions.length > 0 && (
        <>
          <div className="filter-container">
            <h2>Choose your Meal Type</h2>
            <div className="dropdown-container">
              <ReactSelect
                options={mealTypeOptions}
                placeholder="Select Meal Types"
                onChange={onMealTypeChange}
                isMulti={false}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MealTypeView;
