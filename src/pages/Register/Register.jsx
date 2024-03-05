import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { FileOpen } from '@mui/icons-material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Cancel } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  const navigate = useNavigate();


const [fullname, setFullname] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [file, setFile] = useState('');


const onDrop = useCallback(
  (acceptFile) => {
    console.log(acceptFile);
    if (acceptFile[0].type.split("/")[0] != "image") {
      return toast.error(`Faqatgina rasm fayl yuklay olasiz!`);
    }
    setFile(acceptFile[0]);
  },
  [file]
);

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



async function registerHandler(e){
  e.preventDefault()
  try {
    if(!fullname.trim().length){
      throw new Error(`Ismingizni kiritning`)
    }
    else if (!email.trim().length){
      throw new Error(`Emailni kiriting`)
    }
    else if(!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)){
      throw new Error(`Yaroqsiz email!`)
  }else if(!password.trim().length){
    throw new Error(`Parolni kiriting`)
  }
  const formData = new FormData();
  formData.append('fullname', fullname);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('file', file);
    const { data } = await axios.post(`${BACKEND_URL}/api/users/register-worker`, formData);
    if(data.success){
        toast.success(data.message);
        localStorage.setItem('workerData', JSON.stringify({...data.data, token : data.token }))
        navigate('/')
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}







  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             Register
          </Typography>
          <Box component="form" onSubmit={registerHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              value={fullname} onChange={e=> setFullname(e.target.value)}
              label="Ismingizni kiriting"
              name="fullname"
              autoComplete="fullname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email} onChange={e=> setEmail(e.target.value)}
              label="Emailingizni kiriting"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parolingizni kiriting"
              type="password"
              id="password"
              value={password} onChange={e=> setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div {...getRootProps()}>
            <input {...getInputProps} style={{ display : 'none'}} type="file" disabled={file ? true : false}/>
              {
                file ? (
                  <Box display={"flex"} justifyContent={'center'} gap={"5px"}>
                    <img
                      src={URL.createObjectURL(file)}
                      width={"120px"}
                      height={"120px"}
                      className='rounded-lg'
                    />
                    <IconButton onClick={()=> setFile('')}  sx={{ width : "30px", padding : "3px", height : "20px", transform : "translateY(30px)" }}>
                    <Cancel color="error"/>
                    </IconButton>
                  </Box>
                ) : (
            <>

            {isDragActive ? (
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.7em",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CloudUploadIcon
                          sx={{ fontSize: "3em", cursor: "pointer" }}
                        />
                        Faylni bu yerga qo'ying
                      </p>
                    ) : (
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.7em",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CloudUploadIcon
                          sx={{ fontSize: "3em", cursor: "pointer" }}
                        />
                        Faylni bu yerga qo'ying yoki bosing
                      </p>
                    )}
            </>
                )
              }
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Typography  variant="body2" sx={{ textAlign : "center", cursor : "pointer" }}>
                  {"Allaqachon ro'yxatdan o'tganmisiz? Login"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}