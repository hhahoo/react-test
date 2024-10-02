import React, { useState } from "react";
import { Box, Button, Divider, Modal, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axiosInstance from "../../common/axios";


const useStyles = makeStyles((theme) => ({
  description: {
    padding: theme.spacing(1),
    display: "flex",
  },
  descriptionTitle: {
    paddingRight: theme.spacing(10),
    width: '200px'
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: "500px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  footerArea: {
    marginTop: theme.spacing(3),
    paddingRight:theme.spacing(2)
  }
}));

function CategoryCreationModal({ isOpen, onClose }) {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState();
  const [categoryCode, setCategoryCode] = useState();
  const [depth, setDepth] = useState();
  const [memo, setMemo] = useState();
  const [parentId, setParentId] = useState();

  const clean = () => {
    setCategoryName("");
    setCategoryCode("");
    setDepth("");
    setMemo("");
    setParentId("");
    onClose();
  };

  const handleCreateItem = async () => {

    try {
      // API 호출하여 데이터 생성
      const data = {
        categoryName: categoryName,
        categoryCode: categoryCode,
        depth: depth,
        memo: memo,
        parentId: parentId,
      };
      const response = await axiosInstance.post("/v1/category:create", data);
      console.log("Item created:", response.data);

      // 모달 닫기
      clean();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            카테고리 생성
          </Typography>
          <div className={classes.description}>
            <Typography variant="h6" gutterBottom className={classes.descriptionTitle}>
              카테고리 이름:
            </Typography>
            <TextField
              id="categoryName"
              type="text"
              defaultValue={categoryName}
              placeholder="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className={classes.description}>
            <Typography variant="h6" gutterBottom className={classes.descriptionTitle}>
              카테고리 코드:
            </Typography>
            <TextField
              id="categoryCode"
              type="text"
              defaultValue={categoryCode}
              placeholder="categoryCode"
              value={categoryCode}
              onChange={(e) => setCategoryCode(e.target.value)}
            />
          </div>
          <div className={classes.description}>
            <Typography variant="h6" gutterBottom className={classes.descriptionTitle}>
              카테고리 레벨:
            </Typography>
            <TextField
              id="depth"
              type="number"
              defaultValue={depth}
              placeholder="depth"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
          </div>

          <div className={classes.description}>
            <Typography variant="h6" gutterBottom className={classes.descriptionTitle}>
              부모 카테고리 ID:
            </Typography>
            <TextField
              id="parentId"
              type="number"
              defaultValue={parentId}
              placeholder="parentId"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
          </div>
          <div className={classes.description}>
            <Typography variant="h6" gutterBottom className={classes.descriptionTitle}>
              메모:
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={2}
              value={memo}
              defaultValue={memo}
              variant="outlined"
            />
          </div>
          <Divider variant="middle" />
          <div align='right' className={classes.footerArea}>
              <Button  variant="contained" onClick={handleCreateItem} color="primary">Create</Button>
              <Button variant="contained" onClick={clean}>Cancel</Button>
            </div>
          </div>
      </Fade>
    </Modal>
);
}

export default CategoryCreationModal;