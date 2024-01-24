import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Copyright from "components/Copyright";
import useStyles from "./style";

export default function NotFoundPage(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          404 Not Found
        </Typography>

        <Grid
          container
          style={{ marginTop: 40, textAlign: "center", display: "block" }}
        >
          <Typography variant="body1">
            We couldn't find the page you're looking for.
          </Typography>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
