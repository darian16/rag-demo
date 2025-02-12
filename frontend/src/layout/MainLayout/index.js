import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

// material-ui
import { Grid } from "@mui/material";

// project imports
import Breadcrumbs from "ui-component/extended/Breadcrumbs";
// import Header from "./Header";

// import Sidebar from './Sidebar';
import navigation from "menu-items";
// import { SET_MENU } from "store/actions";

// assets
import { IconChevronRight } from "@tabler/icons";
import RoutingService from "services/RoutingService";

// hooks
import { useTranslation } from "react-i18next";
import { /*useDispatch, */useSelector } from "react-redux";
import { useOnlineContext } from "context/OnlineContext";

// styles
import { Main/*, EcoContainer*/ } from "./styles";
// import { EnvFeedback } from './EnvFeedback';

//layout
const MainLayout = () => {
  const { t } = useTranslation();
  // const [ node_env ] = useState(window.env.NODE_ENV || 'development');
  // const [ isEco ] = useState(window.env.GENERIC_FRONTEND_REACTJS_AI_AGENT_ECO);
  const { isOnline } = useOnlineContext();
  const [ is_embebbed ] = useState(RoutingService.getParamValue("embebbed") === 'true');

  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  // const dispatch = useDispatch();

  // const handleLeftDrawerToggle = () => {
  //   dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  // };

  return (
    <div className={is_embebbed ? "embebbed" : ""}>
      {
        !is_embebbed &&
        <div id="offline" className={isOnline ? "online" : "offline"}>
          {!isOnline
           && t("Offline")}
        </div>
      }

      <Grid
        container
        margin={0}
        height="100vh"
      >
        {/*
          !is_embebbed &&
          <Grid
            item
            width="100%"
            position="relative"
            paddingTop="10px"
            paddingBottom="10px"
            display="grid"
            style={{height: '55px'}}
          >
            {isEco && (
              <EcoContainer>
                <span className="material-symbols-outlined green">
                  temp_preferences_eco
                </span>
              </EcoContainer>
            )}
            
            {/*<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />}
          </Grid>
        */}

        {/* main content */}

        <Main open={leftDrawerOpened}>
          {/* breadcrumb */}
          <Breadcrumbs
            separator={IconChevronRight}
            navigation={navigation}
            icon
            title
            rightAlign
          />
          <Outlet />
        </Main>

        {/*<Customization />*/}
      </Grid>
    </div>
  );
};

export default MainLayout;
