import React from "react";
import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Competition Management Software by "}
      <Link color="inherit" href="https://www.skild.com/">
        Skild
      </Link>
      {" © "}
    </Typography>
  );
}
