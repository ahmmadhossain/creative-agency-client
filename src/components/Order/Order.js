import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import DashboardHeader from "../Dashboard/DashboardHeader/DashboardHeader";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import * as ReactBootstrap from 'react-bootstrap';

const Order = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [loggedInUser] = useContext(UserContext);
  const history = useHistory();

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("project", data.file[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("service", data.service);
    formData.append("detail", data.detail);
    formData.append("price", data.price);

    fetch("https://my-creative-agency.herokuapp.com/addorder", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Order placed successfully");
          reset();
          history.push("/clientservicelist");
        }
      });
  };

  useEffect(() => {
    fetch(`https://my-creative-agency.herokuapp.com/service/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      })
      .catch(() => {
        setService({});
      });
  }, [id]);

  return (
    <div>
      <Row>
        <Col md={2} sm={2} xs={2}>
          <Sidebar />
        </Col>
        <Col md={10} sm={10} xs={10} className="responsive-dashboard">
          <DashboardHeader title="Order" />

          {service._id ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                name="name"
                defaultValue={loggedInUser.name}
                ref={register({ required: true })}
                className="form-control w-50"
                placeholder="Your name / company’s name"
                readOnly
              />
            
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
              <br />
              <input
                name="email"
                defaultValue={loggedInUser.email}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                className="form-control w-50"
                placeholder="Your email address"
                readOnly
              />
              
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
              <br />
              <input
                name="service"
                defaultValue={service.title}
                ref={register({ required: true })}
                className="form-control w-50"
                placeholder="Graphic Design"
                readOnly
              />
              
              {errors.service && (
                <span className="text-danger">This field is required</span>
              )}
              <br />
              <textarea
                name="detail"
                ref={register({ required: true })}
                className="form-control w-50"
                placeholder="Project Details"
              />
              
              {errors.detail && (
                <span className="text-danger">This field is required</span>
              )}
              <br />
              <input
                name="price"
                ref={register({ required: true })}
                className="form-control w-50"
                placeholder="Price"
              />
              
              {errors.price && (
                <span className="text-danger">This field is required</span>
              )}
              <br />
              <label htmlFor="project">Project Screenshot</label>
              <br />
              <input
                type="file"
                name="file"
                ref={register({ required: true })}
                className="w-25"
              />
              <br />
              
              {errors.file && (
                <span className="text-danger">This field is required</span>
              )}
              <br />
              <br />
              <input
                type="submit"
                className="btn btn-dark d-block"
                value="Send"
              />
            </form>
          ) : (
            <div className="text-danger m-5 d-flex align-items-center font-weight-bold">
                <ReactBootstrap.Spinner animation="border" />
                <span className="ml-3"> Loading please wait......</span>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Order;
