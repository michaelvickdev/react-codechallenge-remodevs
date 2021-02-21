import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Alert, Breadcrumb, BreadcrumbItem, Spinner } from "reactstrap";
import { fetchResidents, resetResidents, selectResidents } from "../../store/slices/residents";
import { selectPlanetValue } from "../../store/slices/planets";
import Grid from "../Grid";
import "./Residents.css";

const Residents = ({ isPage = true }) => {
  const dispatch = useDispatch();

  const { planetId } = useParams();
  const planetDetails = useSelector(selectPlanetValue(Number(planetId)));
  const { values, loading, error } = useSelector(selectResidents);

  useEffect(() => {
    if (!planetDetails) return;
    dispatch(fetchResidents(planetDetails.residents));

    return () => {
      dispatch(resetResidents());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planetDetails]);

  if (!planetDetails) {
    return <Redirect to="/planets" />;
  }

  const header = ["name", "gender", "birth_year", "height", "hair_color", "eye_color", "skin_color"];

  const breadCrumbs = isPage ? (
    <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem tag="span">
        <Link to="/planets">Planets</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active tag="span">
        <Link to={`/planets/${planetId}`}>{planetDetails.name}</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active tag="span">
        Residents
      </BreadcrumbItem>
    </Breadcrumb>
  ) : null;

  if (loading === "pending")
    return (
      <>
        {breadCrumbs}
        <div className="loading-wrapper">
          <Spinner color="dark" size="lg" />;
        </div>
      </>
    );

  if (error)
    return (
      <>
        {breadCrumbs}
        <Alert color="danger">Oops! Something went wrong...</Alert>
      </>
    );

  return (
    <div className="residents">
      {breadCrumbs}
      <Grid values={values} header={header} />
    </div>
  );
};

Residents.propTypes = {
  isPage: PropTypes.bool,
};

export default Residents;
