import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

function Cabins() {
  const [showAddCabin, setShowAddCabin] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowAddCabin((prev) => !prev)}>
          Add new cabin
        </Button>
        {showAddCabin && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
