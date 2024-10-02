import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

export default function LoginFailed() {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Box>
        <div className={classes.logotypeContainer}>
          <Typography className={classes.logotypeText}>Login Failed.</Typography>
        </div>
      </Box>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
        size="large"
        className={classes.backButton}
      >
        Back to Home
      </Button>
    </Grid>
  );
}
