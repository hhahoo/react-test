import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex', 
    height: '100vh',
    justifyContent: "center",
    alignItems: "center"
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
}));
