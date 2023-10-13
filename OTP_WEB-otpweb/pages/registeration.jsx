import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { redirect } from 'next/dist/server/api-utils';
import axios from 'axios'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const SignUp = ({ handleChange }) => {

    //STYLING
    const router = useRouter();
    const [Datas, setDatas] = useState([]);
    const [error, setError] = useState(false)


    // console.log('Data:', Datas);
    const paperStyle = { padding: 20, height: '600', width: 300, margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0', backgroundColor: 'yellow', color: 'black' }
    //STATE
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const initialValues = {
        fullName: '',
        username: '',
        password: '',
        remember: false
    }
    //VALIDATION 

    //FUNCTION TO LOGIN
    const onSubmit = (values, props) => {

        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

    }
    // const router = useRouter()
    const login = async (values, props) => {
        const response = await axios.post('http://localhost:3001/api/signup', {
            fullName: values.fullName,
            email: values.username,
            password: values.password
        })
        console.log(response)
        if (response.data.success) {
            console.log(response.data.success)
            router.replace('/Dashboard')
        }
        else if (!response.data.success) {
            console.log(response.data.success)
            setError(true)
        }
    }



    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>

                    <h2>Hello Sign Up</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={login} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Stack gap="1rem">
                                <Field id="standard-basic" as={TextField} label='FullName' name="fullname" variant="standard"

                                    placeholder='Enter fullname' fullWidth required
                                    helperText={<ErrorMessage name="fullname" />}

                                />
                                <Field id="standard-basic" as={TextField} label='Username' name="username" variant="standard"

                                    placeholder='Enter username' fullWidth required
                                    helperText={<ErrorMessage name="username" />}

                                />
                                <Field id="standard-basic" as={TextField} label='Password' name="password" variant="standard"

                                    placeholder='Enter password' type='password' fullWidth required
                                    helperText={<ErrorMessage name="password" />}
                                />
                                <Field as={FormControlLabel}
                                    name='remember'


                                    control={
                                        <Checkbox
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />

                                <Button type='submit' variant="contained" disabled={props.isSubmitting}
                                    style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign up"}  </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
                {error ? <p style={{ color: "red" }}>please enter the correct credentials</p> : null}
            </Paper>
        </Grid>
    )
}

export default SignUp