import React,{useState,useRef} from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SnackBarMessages from './SnackBarMessages';
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
   const [loading, setLoading] = useState(false);
 
   const [datosObjectError, setDatosObject] = useState({nombre:false, tel:false, fecha_entrada:false, fecha_salida:false });
   const [alert, setAlert] = useState({ message: "", status: "", open: false });
   const formElement = useRef();
  
   const enviarDatos = async (event) => {
      event.preventDefault();
    
      var frm = document.getElementsByName('formHere')[0];
      
      setLoading(true);
      const data = new FormData(event.currentTarget);

      let bodyFormData = new FormData();
      let datosObjectSend = {nombre:false, tel:false, fecha_entrada:false, fecha_salida:false};
      if(data.get("nombre") === "" ) datosObjectSend.nombre = true;
      if(data.get("tel") === "" ) datosObjectSend.tel = true;
      if(data.get("fecha_entrada") === "" ) datosObjectSend.fecha_entrada = true;
      if(data.get("fecha_salida") === "" ) datosObjectSend.fecha_salida = true;

      setDatosObject(datosObjectSend);
      if(datosObjectSend.nombre || datosObjectSend.tel ||datosObjectSend.fecha_entrada ||datosObjectSend.fecha_salida) {
        setAlert({ message: "Complete los campos obligatorios.", status: "error", open: true });
      
        setLoading(false);
        return;
      }
      
      bodyFormData.append('nombre', data.get("nombre"));
      bodyFormData.append('tel', data.get("tel"));
      bodyFormData.append('fecha_entrada', data.get("fecha_entrada"));
      bodyFormData.append('fecha_salida', data.get("fecha_salida"));
  
   
      await axios({
        method: "POST",
        url: process.env.REACT_APP_GOOGLE_SCRIPT_ONE,
        headers: { "Content-Type": "multipart/form-data" },
        data:bodyFormData,
      
      }).then(response => {
        
        setAlert({ message: response.data, status: "success", open: true });
        setTimeout(window.location.reload(false), 5);
      }).catch(error =>{
      console.log(error)
        setLoading(false);
      })
   setLoading(false);
  };
  return (

    <div className="App">
       <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh',display:"flex",alignItems: 'center', backgroundColor:'black' }}>
        <CssBaseline />
        <SnackBarMessages alert={alert} setAlert={setAlert} />
        <Grid
          item
          xs={false}
          
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?calendar)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh'
          }}
        />
        <Grid item  alignContent="center" sm={8} md={6}  >
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
            <Box component="form" name="formHere" ref={formElement} noValidate justifyContent="center" onSubmit={enviarDatos} sx={{ mt: 1 }}>
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
                  required
                  name="nombre"
                  id="nombre"
                  label="Nombre"
                  margin="normal"
                  autoFocus
                  error={datosObjectError.nombre }
                  inputProps= {{ style: { textTransform: "uppercase" } }}
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
                  required
                  error={datosObjectError.tel }
                  inputProps= {{ style: { textTransform: "uppercase" } }}
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
                          required:true,
                          inputProps: { style: { textTransform: "uppercase" } },
                          label:"Fecha entrada" ,
                          
                          error:datosObjectError.fecha_entrada,
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
                          inputProps: { style: { textTransform: "uppercase" } },
                          name:"fecha_salida",
                          label:"Fecha salida" ,
                          required:true,
                          size: 'small',
                          error:datosObjectError.fecha_salida  ,
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
              {
                loading ?
                <Button
                  disabled
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                <CircularProgress color="inherit" size={22} sx={{ mt: 5, mb: 2, color:"white" }}/>
              </Button> 
                
                :
                <Button
                type="submit"
                fullWidth
               
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar 
              </Button> 
              }
              
              
                    
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