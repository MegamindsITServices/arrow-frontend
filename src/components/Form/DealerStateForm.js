import React from "react";

const DealerStateForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control admin-form"
          placeholder="Executive State"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button type="submit" className="Butn">
        Submit
      </button>
    </form>
  );
};

export default DealerStateForm;
