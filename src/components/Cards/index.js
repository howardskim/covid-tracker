import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

export default function Cards(props) {
    let{ confirmed: infected, recovered, deaths, lastUpdate } = props.data;
    if(!props.data) return <h1>Loading...</h1>
    const commafy = (value) => {
        if(!value) return;
        let output = value.toLocaleString();
        return output;
    }
    return (
      <div className={styles.container}>
        <Grid container spacing={3} justify="space-evenly">
          <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Infected</Typography>
              <Typography variant="h5" gutterBottom>
                  {/* {commafy(infected.value) || ''} */}
                  <CountUp 
                    start={0}
                    end={infected.value || 0}
                    duration={2.5}
                    separator=","
                  />
              </Typography>
              <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant="body2" gutterBottom>Number of active cases of COVID-19</Typography>
            </CardContent>
          </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>

            <CardContent>
              <Typography color="textSecondary" gutterBottom>Recovered</Typography>
              <Typography variant="h5" gutterBottom>
                  {/* {commafy(recovered.value )|| ''}   */}
                <CountUp 
                    start={0}
                    end={recovered.value || 0}
                    duration={2}
                    separator=","
                />
                </Typography>
                <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant="body2" gutterBottom>Number of recovered cases of COVID-19</Typography>
            </CardContent>
          </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>

            <CardContent>
              <Typography color="textSecondary" gutterBottom>Deaths</Typography>
              <Typography variant="h5" gutterBottom>
                  {/* {commafy(deaths.value) || ''} */}
                <CountUp 
                    start={0}
                    end={deaths.value || 0}
                    duration={2.5}
                    separator=","
                />
                  </Typography>
                <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant="body2" gutterBottom>Number of deceased cases of COVID-19</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
}
