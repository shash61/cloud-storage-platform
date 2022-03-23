import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CredentialsTab from './credentialstab/CredentialsTab';
import FileTab from './filetab/FileTab';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop:'48px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#85C872",
                                    borderBottomLeftRadius: "5%!important",
                                    borderRadius: "16px",
                                    borderBottomRightRadius: "5%",
                                    borderBottom: "6px solid white",
                                    color:'white'
                                },
                            }}>
        <Tab label="Credentials" {...a11yProps(0)} sx={{
                                    color:'white',
                                    padding: "0.5rem",
                                    margin: "0 1rem",
                                    "&.Mui-selected": { fontWeight: "600", color:'white' },
                                }}/>
        <Tab label="Files" {...a11yProps(1)} sx={{
                                    color:'white',
                                    padding: "0.5rem",
                                    margin: "0 1rem",
                                    "&.Mui-selected": { fontWeight: "600", color:'white' },
                                }}/>
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <CredentialsTab/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <FileTab/>
      </TabPanel>

    </Box>
  );
}
