// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';

// assets
import es from 'assets/images/flags/es.svg';
import en from 'assets/images/flags/en.svg';
import pt from 'assets/images/flags/pt.svg';

import * as React from 'react'

import { useTranslation } from 'react-i18next';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

function IconFlag(props) {
    const { country } = props;

    return (
        <React.Fragment>
            { country === 'es' && <img className="flag" src={es} alt="es" /> }
            { country === 'en' && <img className="flag" src={en} alt="en" /> }
            { country === 'pt' && <img className="flag" src={pt} alt="pt" /> }
        </React.Fragment>
    )
}
//---------------------------------------------------------------

const LocaleList = (props) => {
    const { onChangeLocaleGlobal } = props;
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    function changeLocale(locale) {
        i18n.changeLanguage(locale);
        onChangeLocaleGlobal(locale);
    }

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            <ListItemWrapper>
                <ListItem alignItems="center" onClick={() => changeLocale('es')}>
                    <ListItemAvatar>
                        <IconFlag country="es" />
                    </ListItemAvatar>
                    <ListItemText primary={t("Spanish")} />
                </ListItem>
            </ListItemWrapper>

            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center" onClick={() => changeLocale('en')}>
                    <ListItemAvatar>
                        <IconFlag country="en" />
                    </ListItemAvatar>
                    <ListItemText primary={t("English")} />
                </ListItem>
            </ListItemWrapper>

            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center" onClick={() => changeLocale('pt')}>
                    <ListItemAvatar>
                        <IconFlag country="pt" />
                    </ListItemAvatar>
                    <ListItemText primary={t("Portuguese")} />
                </ListItem>
            </ListItemWrapper>
        </List>
    );
};

export default LocaleList;
