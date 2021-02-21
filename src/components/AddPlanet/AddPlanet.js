import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { selectModal, openModal, closeModal } from "../../store/slices/modals";
import "./AddPlanet.css";

const useAddPlanet = () => {
  const [values, setValues] = useState({
    name: "",
    rotation_period: null,
    orbital_period: null,
    diameter: null,
    climate: "",
    gravity: "",
    terrain: "",
    surface_water: null,
  });

  const changeValue = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return [values, changeValue];
};

const AddPlanet = () => {
  const dispatch = useDispatch();
  const { open } = useSelector(selectModal("addPlanet"));

  const handleOpen = () => {
    dispatch(openModal("addPlanet"));
  };

  const handleClose = () => {
    dispatch(closeModal("addPlanet"));
  };

  const [values, setValue] = useAddPlanet();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forem Submitted", { ...values });
    handleClose();
    toast.success("Success");
  };

  return (
    <div className="add-planet">
      <Button onClick={handleOpen}>Add Planet</Button>
      <Modal isOpen={open} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Add Planet</ModalHeader>
        <ModalBody className="text-left">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                required
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="rotation_period">Rotation Period</Label>
              <Input
                required
                type="number"
                min={0}
                name="rotation_period"
                id="rotation_period"
                value={values.rotation_period}
                onChange={(e) => setValue("rotation_period", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="orbital_period">Orbital Period</Label>
              <Input
                required
                type="number"
                min={0}
                name="orbital_period"
                id="orbital_period"
                value={values.orbital_period}
                onChange={(e) => setValue("orbital_period", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="diameter">Diameter</Label>
              <Input
                required
                type="number"
                min={0}
                name="diameter"
                id="diameter"
                value={values.diameter}
                onChange={(e) => setValue("diameter", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="climate">Climate</Label>
              <Input
                required
                type="text"
                name="climate"
                id="climate"
                value={values.climate}
                onChange={(e) => setValue("climate", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="gravity">Gravity</Label>
              <Input
                required
                type="text"
                name="gravity"
                id="gravity"
                value={values.gravity}
                onChange={(e) => setValue("gravity", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="terrain">Terrain</Label>
              <Input
                required
                type="select"
                name="terrain"
                id="terrain"
                value={values.terrain}
                onChange={(e) => setValue("terrain", e.target.value)}
              >
                <option>Select</option>
                <option>Desert</option>
                <option>Jungle</option>
                <option>Swamp</option>
                <option>Tundra</option>
                <option>Gas Giant</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="surface_water">Surface Water</Label>
              <Input
                required
                type="number"
                min={0}
                name="surface_water"
                id="surface_water"
                value={values.surface_water}
                onChange={(e) => setValue("surface_water", e.target.value)}
              />
            </FormGroup>

            <Button>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddPlanet;
