import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Grid from "../Grid";
import { fetchPlanets, selectPlanets } from "../../store/slices/planets";
import "./Planets.css";
import { useHistory } from "react-router";
import AddPlanet from "../AddPlanet/AddPlanet";

function Planets({ showFilms = true, showResidents = true, showActions = true }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlanets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { values, loading, error } = useSelector(selectPlanets);

  const header = [
    { label: "name", type: "text" },
    { label: "rotation_period", type: "number" },
    { label: "orbital_period", type: "number" },
    { label: "diameter", type: "number" },
    { label: "climate", type: "text" },
    { label: "gravity", type: "text" },
    { label: "terrain", type: "text" },
    { label: "surface_water", type: "number" },
    { label: "population", type: "number" },
  ];

  if (showFilms) {
    header.push({ label: "films", type: "number" });
  }

  if (showResidents) {
    header.push({ label: "residents", type: "number" });
  }

  const actions = showActions
    ? [
        {
          label: "Go to Films",
          action: (e, index) => {
            e.stopPropagation();
            history.push(`/planets/${index + 1}/films`);
          },
          relatedField: "films",
        },
        {
          label: "Go to Residents",
          action: (e, index) => {
            e.stopPropagation();
            history.push(`/planets/${index + 1}/residents`);
          },
          relatedField: "residents",
        },
      ]
    : [];

  const history = useHistory();

  const onRowClick = (e, index) => {
    history.push(`/planets/${index + 1}`);
  };

  const breadCrumbs = (
    <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem tag="span">Planets</BreadcrumbItem>
    </Breadcrumb>
  );

  if (loading === "pending" && values.length === 0)
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
    <div className="planets">
      {breadCrumbs}
      <AddPlanet />
      <Grid values={values} actions={actions} header={header} onRowClick={onRowClick} />
    </div>
  );
}

Planets.propTypes = {
  showFilms: PropTypes.bool,
  showResidents: PropTypes.bool,
  showActions: PropTypes.bool,
};

export default Planets;
