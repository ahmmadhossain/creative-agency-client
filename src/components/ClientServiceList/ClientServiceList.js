import React, { useState, useEffect, useContext} from "react";
import { Col, Row } from "react-bootstrap";
import DashboardHeader from "../Dashboard/DashboardHeader/DashboardHeader";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { UserContext } from "../../App";
import ClientServiceData from "../ClientServiceData/ClientServiceData";
import * as ReactBootstrap from 'react-bootstrap';

const ClientServiceList = () => {
  const [loggedInUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("https://my-creative-agency.herokuapp.com/allorders", {
      method: "POST",
      body: JSON.stringify({ email: loggedInUser.email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServicesData(data);
        setLoading(false);
      })
      .catch(() => alert("An Error occurred"));
  }, [loggedInUser]);

  return (
    <div>
      <Row>
        <Col md={2} sm={2} xs={2}>
          <Sidebar />
        </Col>
        <Col md={10} sm={10} xs={10} className="responsive-dashboard">
          <DashboardHeader title="All Orders" />

          <Row>
            {loading && (
              <div className="text-danger m-5 d-flex align-items-center font-weight-bold">
                <ReactBootstrap.Spinner animation="border" />
                <span className="ml-3"> Loading please wait......</span>
            </div>
            )}
            {servicesData.map((service) => (
              <ClientServiceData key={service._id} service={service} />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ClientServiceList;
