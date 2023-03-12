import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {      
		light: '#5fa463',
		main: '#388e3c',
		dark: '#27632a',
		contrastText: '#ffffff',      
    },
    secondary: {
      light: '#fddf5d',
	  main: '#fdd835',  
	  dark: '#b19725',
      contrastText: '#000000',
	},	 
	contrastThreshold: 3,		  
	tonalOffset: 0.2,
  },
});
	  
export default theme;