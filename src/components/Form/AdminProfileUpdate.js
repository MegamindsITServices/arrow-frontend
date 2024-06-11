import React from "react";

const AdminProfileUpdate = ({ handleSubmit, value, setValue }) => {
  return (
    <form className="form-user-profile" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Name"
          autoFocus
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          value={value.email}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Email "
          disabled
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          defaultValue={""}
          value={value.password}
          onChange={(e) => setValue({ ...value, password: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Password"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.phone}
          onChange={(e) => setValue({ ...value, phone: e.target.value })}
          className="form-control input-login"
          placeholder="Enter Your Phone"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address.landmark}
          onChange={(e) =>
            setValue({
              ...value,
              address: {
                ...value.address,
                landmark: e.target.value,
              },
            })
          }
          className="form-control input-login"
          placeholder="Enter you Landmar"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address.locality}
          onChange={(e) =>
            setValue({
              ...value,
              address: {
                ...value.address,
                locality: e.target.value,
              },
            })
          }
          className="form-control input-login"
          placeholder="Locality"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address.city}
          onChange={(e) =>
            setValue({
              ...value,
              address: {
                ...value.address,
                city: e.target.value,
              },
            })
          }
          className="form-control input-login"
          placeholder="Enter Your City"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address.district}
          onChange={(e) =>
            setValue({
              ...value,
              address: {
                ...value.address,
                district: e.target.value,
              },
            })
          }
          className="form-control input-login"
          placeholder="Enter Your District"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address.state}
          onChange={(e) =>
            setValue({
              ...value,
              address: {
                ...value.address,
                state: e.target.value,
              },
            })
          }
          className="form-control input-login"
          placeholder="Enter Your State"
          // style={{ width: "83%" }}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={value.address.pincode}
          onChange={(e) =>
            setValue({
              ...value,
              address: {
                ...value.address,
                pincode: e.target.value,
              },
            })
          }
          className="form-control input-login"
          placeholder="Enter Your Pincode"
          pattern="\d*"
          // style={{ width: "83%" }}
        />
      </div>

      <button type="submit" className="p-2 px-4 profile-update-Butn">
        UPDATE
      </button>
    </form>
  );
};

export default AdminProfileUpdate;
