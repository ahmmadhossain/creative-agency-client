import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import DashboardHeader from "../Dashboard/DashboardHeader/DashboardHeader";
import Sidebar from "../Dashboard/Sidebar/Sidebar";


const MakeAdmin = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = (data) => {
    fetch("https://my-creative-agency.herokuapp.com/makeadmin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Set email address as admin successfully");
          reset();
        }
      })
      .catch(() => alert("An Error occurred"));
  };

  return (
    <div>
      <Row>
        <Col md={2} sm={2} xs={2}>
          <Sidebar />
        </Col>
        <Col md={10} sm={10} xs={10} className="responsive-dashboard">
          <DashboardHeader title="Make Admin" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              name="email"
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              placeholder="emailId@gmail.com"
              className="form-control w-25 d-inline"
            />
            <input type="submit" className="btn btn-success d-inline mr-5" />
            <br />
            {errors.email && (
              <span className="text-danger">* Invalid Email address</span>
            )}
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default MakeAdmin;
