import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import styles from './Cards.module.css';

export default function Cards(props) {
    console.log(props)
    let{ confirmed: infected, recovered, deaths } = props.data;
    const commafy = (value) => {
        if(!value) return;
        let output = value.toLocaleString();
        return output;
    }
    return (
      <div className={styles.container}>
        <Grid container spacing={3} justify="center">
          <Grid item component={Card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Infected</Typography>
              <Typography variant="h5" gutterBottom>{commafy(infected.value) || ''}</Typography>
              <Typography color="textSecondary" gutterBottom>DATE</Typography>
              <Typography variant="body2" gutterBottom>Number of active cases of COVID-19</Typography>
            </CardContent>
          </Grid>
            <Grid item component={Card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Infected</Typography>
              <Typography variant="h5" gutterBottom>{commafy(recovered.value )|| ''}</Typography>
              <Typography color="textSecondary" gutterBottom>DATE</Typography>
              <Typography variant="body2" gutterBottom>Number of active cases of COVID-19</Typography>
            </CardContent>
          </Grid>
            <Grid item component={Card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Infected</Typography>
              <Typography variant="h5" gutterBottom>{commafy(deaths.value) || ''}</Typography>
              <Typography color="textSecondary" gutterBottom>DATE</Typography>
              <Typography variant="body2" gutterBottom>Number of active cases of COVID-19</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
}
