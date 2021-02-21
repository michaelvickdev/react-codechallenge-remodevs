import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Alert, Breadcrumb, BreadcrumbItem, Spinner } from "reactstrap";
import { fetchFilms, resetFilms, selectFilms } from "../../store/slices/films";
import { selectPlanetValue } from "../../store/slices/planets";
import Grid from "../Grid";
import "./Films.css";

const Films = ({ isPage = true }) => {
  const dispatch = useDispatch();

  const { planetId } = useParams();
  const planetDetails = useSelector(selectPlanetValue(Number(planetId)));

  const { values, loading, error } = useSelector(selectFilms);

  useEffect(() => {
    if (!planetDetails) return;
    dispatch(fetchFilms(planetDetails.films));

    return () => {
      dispatch(resetFilms());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planetDetails]);

  if (!planetDetails) {
    return <Redirect to="/planets" />;
  }

  const header = ["title", "release_date", "director", "producer"];

  const breadCrumbs = isPage ? (
    <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem tag="span">
        <Link to="/planets">Planets</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active tag="span">
        <Link to={`/planets/${planetId}`}>{planetDetails.name}</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active tag="span">
        Films
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
    <div className="films">
      {breadCrumbs}
      <Grid values={values} header={header} />
    </div>
  );
};

Films.propTypes = {
  isPage: PropTypes.bool,
};

export default Films;
