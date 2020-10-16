import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import DashboardHeader from "../Dashboard/DashboardHeader/DashboardHeader";
import Sidebar from "../Dashboard/Sidebar/Sidebar";

const AddService = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("icon", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);

    fetch("http://localhost:5000/addservice", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Service added");
          reset();
        }
      });
  };

  return (
    <div>
      <Row>
        <Col md={2} sm={2} xs={2}>
          <Sidebar />
        </Col>
        <Col md={10} sm={10} xs={10} className="responsive-dashboard">
          <DashboardHeader title="Add Service" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="d-block">
              <Col md={6}>
                <label htmlFor="title">Service Title</label>
                <input
                  name="title"
                  ref={register({ required: true })}
                  className="form-control mb-3"
                />
                {errors.title && (
                  <span className="text-danger">This field is required</span>
                )}
                <br />
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  ref={register({ required: true })}
                  className="form-control mb-3"
                />
                {errors.description && (
                  <span className="text-danger">This field is required</span>
                )}
                <br />
              </Col>

              <Col md={6}>
                <label htmlFor="servicetitle">Icon</label>
                <input
                  type="file"
                  name="file"
                  ref={register({ required: true })}
                  className="w-25 mb-2"
                />
                <br />
                {errors.file && (
                  <span className="text-danger">This field is required</span>
                )}
                <br />
                <input type="submit" className="btn btn-success text-right " />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default AddService;