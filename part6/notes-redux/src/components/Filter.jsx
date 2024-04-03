import { useDispatch } from "react-redux";
import { filterSelected } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const filterBy = (option) => {
    dispatch(filterSelected(option));
  };

  return (
    <div>
      all <input type="radio" name="filter" onChange={() => filterBy("ALL")} />
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterBy("IMPORTANT")}
      />
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterBy("NONIMPORTANT")}
      />
    </div>
  );
};

export default Filter;
