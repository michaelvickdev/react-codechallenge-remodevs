import { useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, List } from "reactstrap";
import { selectPlanetValue } from "../../store/slices/planets";
import Films from "../Films/Films";
import Residents from "../Residents/Residents";
import "./PlanetDetails.css";

const PlanetDetails = () => {
  const { planetId } = useParams();
  const planetDetails = useSelector(selectPlanetValue(Number(planetId)));

  const details = [
    "rotation_period",
    "orbital_period",
    "diameter",
    "climate",
    "gravity",
    "terrain",
    "surface_water",
    "population",
  ];

  if (!planetDetails) {
    return <Redirect to="/planets" />;
  }

  return (
    <div className="planet-details">
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="span">
          <Link to="/planets">Planets</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active tag="span">
          {planetDetails.name}
        </BreadcrumbItem>
      </Breadcrumb>
      <section className="details">
        <List type="unstyled">
          {details.map((detail) => (
            <li key={detail}>
              <strong>{detail.replaceAll("_", " ")} : </strong>
              {planetDetails[detail]}
            </li>
          ))}
        </List>
      </section>

      <section>
        <h4>
          <Link to={`/planets/${planetId}/films`}>Films</Link>
        </h4>
        <Films isPage={false} />
      </section>

      <section>
        <h4>
          <Link to={`/planets/${planetId}/residents`}>Residents</Link>
        </h4>
        <Residents isPage={false} />
      </section>
    </div>
  );
};

export default PlanetDetails;
