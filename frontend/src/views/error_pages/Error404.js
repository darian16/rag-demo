import * as React from 'react';
import { Link } from "react-router-dom";

// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SecurityService from "services/SecurityService";

import Logo from 'ui-component/Logo';
// ===============================|| EVENT LOGS ||=============================== //

const Error404 = () => {
    const { t } = useTranslation();

    const Title = () => {
      return (
        <React.Fragment>
            {t('Page not found')}
        </React.Fragment>
      )
    }

    return (
        <MainCard title={<Title />} style={{'position': 'relative'}}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} className="error">
                    <div className="content">
                        <Typography variant="h1" gutterBottom className="form-title">404</Typography>
                        <Logo />

                        <Typography variant="h3" gutterBottom className="form-title">{t('Page not found')}</Typography>
                        <Typography variant="h5" gutterBottom className="form-title">{t('The requested url was not found on this server')}</Typography>

                        {
                            <Button component={Link} variant="contained" color="primary" to={SecurityService.acl.home.path}>
                                {t('GO HOME')}
                            </Button>
                        }

                        <div className="block-space"></div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 320"><path fill="#d23333" fillOpacity="1" d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,229.3C840,224,960,160,1080,128C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Error404;
