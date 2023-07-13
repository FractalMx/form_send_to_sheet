import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider, styled} from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from "axios";
import './App.css';


const WhiteBorderTextField = styled(TextField)`
  & label {
    color: white;
    
  }
  & label.Mui-focused {
    color: white;
    
  }
  & .MuiOutlinedInput-root {
    '& fieldset': {
      border-color: 'white',
    },
    '&.Mui-hover fieldset': {
      border-color: 'white',
    },
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
 
`;

const defaultTheme = createTheme();
function App() {
 
  const enviarDatos = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let bodyFormData = new FormData();
     
     
      bodyFormData.append('nombre', data.get("nombre"));
      bodyFormData.append('tel', data.get("tel"));
      bodyFormData.append('fecha_entrada', data.get("fecha_entrada"));
      bodyFormData.append('fecha_salida', data.get("fecha_salida"));
     console.log(bodyFormData)
   
      await axios({
        method: "POST",
        url:process.env.SCRIPT_GOOGLE_ONE,
        headers: { "Content-Type": "multipart/form-data" },
        data:bodyFormData,
      
      }).then(response => {
        console.log(response)
      }).catch(error =>{
        console.log(error)
      })
      
    } catch (error) {
      console.log(error)
    }
  };
  return (

    <div className="App">
       <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',display:"flex",alignItems: 'center', backgroundColor:'black' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh'
          }}
        />
        <Grid item  alignContent="center" sm={8} md={6}  square>
          <Box
            sx={{
              my: 2,
              mx: 1,
              display: 'flex',
              flexDirection: 'column',
              
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" color="white">
             Reservación
            </Typography>
            <Box component="form" noValidate justifyContent="center" onSubmit={enviarDatos} sx={{ mt: 1 }}>
              <Box  mt={1}>
                <WhiteBorderTextField
                  fullWidth
                  sx={{ "& .MuiInputLabel-root": {color: 'white'},//styles the label
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "white" },
                    },
                    input:{
                      color:"white"
                    }
                  }}
                  type="text"
                  size="small"
                  name="nombre"
                  id="nombre"
                  label="Nombre"
                  margin="normal"
                  autoFocus
                  variant="outlined"
                  mt={1}
                />
              </Box>  
              <Box  mt={1}>
                <WhiteBorderTextField
                  fullWidth
                  type="text"
                  size="small"
                  name="tel"
                  id="tel"
                  label="Teléfono"
                  variant="outlined"

                  sx={{ "& .MuiInputLabel-root": {color: 'white'},//styles the label
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "white" },
                      
                    },
                    input:{
                      color:"white"
                    }
                  }}
                />
              </Box>
             
             <Grid container mt={2}>
                <Grid item mr={2}> 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker   format="DD-MM-YYYY"
                     sx={{color:"white"}}
                     slotProps={{ 
                      textField: 
                        { id:"fecha_entrada", 
                          name:"fecha_entrada", 
                          label:"Fecha entrada" ,
                          size: 'small', 
                          sx:{color:"white", "& .MuiInputLabel-root": {color: 'white'},//styles the label
                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "white" },
                            },
                            input:{
                              color:"white"
                            }
                          }
                        } 
                      }} 
                    />
                  </LocalizationProvider>
                  </Grid>
                <Grid item> 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker  
                      format="DD-MM-YYYY"
                      colorIcon={"white"}
                      keyboardIcon={<CalendarMonthIcon color="white"/>}
                      slotProps={{ 
                        icon:{color:"white"},
                        textField: { 
                          id:"fecha_salida", 
                          name:"fecha_salida",
                          label:"Fecha salida" ,
                          size: 'small',
                          sx:{color:"white", "& .MuiInputLabel-root": {color: 'white'},//styles the label
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "white" },
                              },
                              input:{
                                color:"white"
                              }
                            }
                        }
                      }} 
                  />
                  </LocalizationProvider>
                </Grid>
             </Grid> 
              <Box >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar 
                </Button>      
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
}

export default App;