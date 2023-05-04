import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Summary from "./SummaryTab";
import AttendanceTab from "./AttendanceTabs";
import StudentsTab from "./StudentsTabs";
import StaffTab from "./StaffTabs";
import FinancialTab from "./FinancialTabs";
import ActivityTab from "./ActivityTabs";
import Academics from "./AcademicTabs";
import axios from "../../store/axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs({ user }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [count, setcount] = useState([]);

  useEffect(() => {
    axios.get("/count").then((res) => {
      if (res?.data) {
        setcount(res.data);
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Academics Reports" {...a11yProps(1)} />
          <Tab label="Attendance Reports" {...a11yProps(2)} />
          <Tab label="Students Reports" {...a11yProps(3)} />
          <Tab label="Staff Reports" {...a11yProps(4)} />
          <Tab label="Financial  Reports" {...a11yProps(5)} />
          <Tab label="Activity Reports" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Summary count={count} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Academics count={count} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <AttendanceTab count={count} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <StudentsTab count={count} />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <StaffTab count={count} />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <FinancialTab count={count} />
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <ActivityTab count={count} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
