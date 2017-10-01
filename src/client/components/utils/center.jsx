import React from "react";
import Grid from "material-ui/Grid";


const Center = props => {
  return (
    <div>
      <Grid container justify="center" align="center">
        <Grid item>
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Center;
