import React from "react";

const SearchResultsContainer = props => {
  return (
    <div>
      <h4>Results</h4>
      <div>{props.children}</div>
    </div>
  );
};

export default SearchResultsContainer;
