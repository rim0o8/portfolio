import './style/App.scss';
import Btn from "./components/Btn.js"
import Contact from "./components/Contact.js"
import Spokesman from "./components/Spokesman.js"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import my_apps from "./data/ja/my_apps.json";
import positions from "./data/ja/positions.json";
import sns from "./data/ja/sns.json";
import spokesman_content from "./data/ja/spokesman.json";
import dev from "./data/dev.json";

import Typography from '@mui/material/Typography';

import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    // Google Analytics
    ReactGA.initialize(dev.GA_ID);
    ReactGA.send("pageview");
  }, []);

  return (
    <div className="App">
      <Container maxWidth="md">
        <Spokesman
          title={ spokesman_content.title }
          subtitle= { spokesman_content.subtitle }
          description= { spokesman_content.description }
          logo_src={spokesman_content.logo_src}
          question_prefix={ spokesman_content.question_prefix }
          text_firld_message={ spokesman_content.text_firld_message }
          submit_btn_message={ spokesman_content.submit_btn_message }
        />
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          My Apps
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Btn
              logo_src={ my_apps.animal_chess.log_src }
              title={ my_apps.animal_chess.title }
              link={ my_apps.animal_chess.link }
              description={my_apps.animal_chess.description}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Current positions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Btn
              logo_src={ positions.tus.logo_src }
              title={ positions.tus.title }
              link={ positions.tus.link }
              subtitle={ positions.tus.subtitle }
              description={ positions.tus.description }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Btn
              logo_src={ positions.elyza.logo_src }
              title={ positions.elyza.title }
              link={ positions.elyza.link }
              subtitle={ positions.elyza.subtitle }
              description={ positions.elyza.description }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Btn
              logo_src={ positions.virufy.logo_src }
              title={ positions.virufy.title }
              link={ positions.virufy.link }
              subtitle={ positions.virufy.subtitle }
              description={ positions.virufy.description }
            />
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Connect with me
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Btn
              link={sns.github.link}
              logo_src={sns.github.logo_src}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Btn
              link={ sns.linkedin.link }
              logo_src={ sns.linkedin.logo_src }
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Btn
              link={ sns.twitter.link }
              logo_src={ sns.twitter.logo_src }
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Btn
              link={ sns.facebook.link }
              logo_src={ sns.facebook.logo_src }
            />
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Contact
        </Typography>
        <Contact
          mail="kurashimayuuri@gmail.com"
          phone=""
        />
      </Container>
    </div>
  );
}

export default App;
