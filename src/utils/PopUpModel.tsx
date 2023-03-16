import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";

interface Props {
  setModelOpen: (value: boolean) => void;
  modelOpen: boolean;
  children?: any;
  userImage?: string;
}

const style = {
  position: "absolute",
  top: "30%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  setModelOpen,
  userImage,
}: Props) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {}, []);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span
            onClick={() => setModelOpen(false)}
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: "30px",
              paddingBottom: "10px",
            }}
          >
            X
          </span>
          <div style={{marginTop:'10px'}}>
            <img
              src={`http://localhost:8080/images/${userImage}`}
              style={{ width: "500px", height: "300px" }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
