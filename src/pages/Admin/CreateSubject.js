import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import SubjectForm from "../../components/Form/SubjectForm";
import axios from "axios";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { Modal } from "antd";
import "../../styles/button.css";

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/subject/create-subject", {
        name,
      });
      if (data?.success) {
        swal("Congrats", `${name} Subject Added`, "success");
        getAllSubjects();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/subjects");
      if (data?.success) {
        setSubjects(data?.subject);
      }
      console.log(data?.subject);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subject");
    }
  };
  useEffect(() => {
    getAllSubjects();
  }, []);

  //update subject
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/subject/update-subject/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        swal("Congrats!", "Category Updated Successfully!", "success");
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllSubjects();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete subject
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/subject/delete-subject/${pId}`
      );
      if (data.success) {
        swal("SuccessFull", `${name}Category Deleted Successfully!`, "success");
        getAllSubjects();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Subjects</h1>
            <div className="p-3 w-100">
              <SubjectForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
              <div className="w-75">
                <table className="table">
                  <thead>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </thead>
                  <tbody>
                    {subjects?.map((s) => (
                      <>
                        <tr>
                          <td key={s._id}>{s.name}</td>
                          <td>
                            <button
                              className="edit-button"
                              onClick={() => {
                                setVisible(true);
                                setUpdateName(s.name);
                                setSelected(s);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="dlt-button ms-2"
                              onClick={() => {
                                handleDelete(s._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <SubjectForm
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSubject;
