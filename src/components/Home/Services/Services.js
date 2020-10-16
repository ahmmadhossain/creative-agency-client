import React, { useEffect,  useState }  from "react";
import { Container, Row } from "react-bootstrap";
import ServiceDetails from "../ServiceDeatils/ServiceDetails";
import * as ReactBootstrap from 'react-bootstrap';

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://my-creative-agency.herokuapp.com/services")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setServices(data);
      })
      .catch((error) => {
        window.location.reload(); 
      });
  }, []);

  return (
    <Container className="services my-5">
      <h2 className="text-center">
        Provide awesome <span style={{ color: "#7AB259" }}>services</span>{" "}
      </h2>

      <Row className="mt-5 mx-auto text-center">
        {loading &&
          <div className="text-danger m-5 d-flex align-items-center font-weight-bold">
            <ReactBootstrap.Spinner animation="border" />
            <span className="ml-3"> Loading order summary...........</span>
          </div>}

        {services.map((service) => (
          <ServiceDetails key={service._id} service={service} />
        ))}
      </Row>
    </Container>
  );
};

export default Services;
