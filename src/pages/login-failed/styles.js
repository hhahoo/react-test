import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex', 
    height: '100vh',
    justifyContent: "center",
    alignItems: "center"
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: 22,
  },
}));
