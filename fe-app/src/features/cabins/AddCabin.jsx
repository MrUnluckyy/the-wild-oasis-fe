import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens="table-form">
          <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name="table-form">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
