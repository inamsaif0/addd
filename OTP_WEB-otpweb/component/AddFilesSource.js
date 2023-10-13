import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { redirect } from 'next/dist/server/api-utils';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '../component/Select'

const initialValues = {
  student: '',
  teacher: '',
  level:''
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const CreateUserForm = (props) => {
    const theme = useTheme();
    //STYLING
    const [personName, setPersonName] = React.useState([]);

    const paperStyle = { padding: 20, height: 'auto', width: 400, margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }
    // const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    //STATE

    //VALIDATION 
    // const validationSchema = Yup.object().shape({
    //     username: Yup.string().email('please enter valid email').required("Required"),
    //     password: Yup.string().required("Required")
    // })
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    //FUNCTION TO LOGIN
    const onSubmit = (values, props) => {

        console.log(values) //this is to print the form values
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>

                    <h4>Upload Files</h4>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {(props) => (
                        <Form action='../api/login' method='post' >
                            <Stack gap='1rem'>

                                <Select label='Teacher'/>
                                <Select label='Student'/>
                                <Select label='level'/>
                                {/* <DatePicker label="Basic date picker" /> */}

                                <label htmlFor="upload-photo">
                                    <input
                                        style={{ display: "none" }}
                                        id="upload-photo"
                                        name="uploadphoto"
                                        type="file"
                                    />
 
                                    <Button color="secondary" variant="contained" component="span" fullWidth>
                                        Files
                                    </Button>{" "}
                                </label>
                                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                    style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Upload"}</Button>

                            </Stack>
                            {/* <Field as={TextField} label='Name ' name="Name"
                                placeholder='Enter Name' fullWidth required
                                helperText={<ErrorMessage name="Name" />}
                            />
                            <Field as={TextField} label='Email' name="Email"
                                placeholder='Enter Email' type='email' fullWidth required
                                helperText={<ErrorMessage name="email" />} />

                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth href="../dashboard">{props.isSubmitting ? "Loading" : "Log in"}</Button> */}
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default CreateUserForm