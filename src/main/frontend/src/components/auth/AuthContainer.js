import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignUp from '../signup/SignUp';
import Login from '../login/Login';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AuthContainer() {
  const [value, setValue] = React.useState(0);
  
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{  display:'grid', placeContent:'center' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'grid', placeContent:'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#85C872",
                                    borderBottomLeftRadius: "5%!important",
                                    borderRadius: "16px",
                                    borderBottomRightRadius: "5%",
                                    borderBottom: "6px solid #343b43",
                                },
                            }}>
        <Tab label="SignUp" {...a11yProps(0)} sx={{
                                    padding: "0.5rem",
                                    margin: "0 1rem",
                                    "&.Mui-selected": { fontWeight: "600", color:'gray' },
                                }} />
        <Tab label="Login" sx={{
                                    padding: "0.5rem",
                                    margin: "0 1rem",
                                    "&.Mui-selected": { fontWeight: "600", color:'gray' },
                                }} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

        <SignUp setValue={setValue}/>


      </TabPanel>
      <TabPanel value={value} index={1}>
        <Login/>
      </TabPanel>
    </Box>
    
  );
}
