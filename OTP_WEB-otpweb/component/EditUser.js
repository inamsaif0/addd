import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Autocomplete } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { redirect } from 'next/dist/server/api-utils';
import axios from 'axios';
// import Select from '../component/Select';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditUser = (props) => {
    //STYLING
    const router = useRouter();
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('')
    const [level, setLevel] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [inputvalue, setInputvalue] = React.useState('')
    const [credentials, setCredentials] = React.useState({});



    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // const [Datas, setDatas] = useState([]);

    // console.log('Data:', Datas);
    const paperStyle = { padding: 20, height: 'auto', width: 400, margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0', background: '#5c0931', color: 'white' }
    //STATE
    const initialValues = {
        name: '',
        email: '',
        password: '',
        level: ''
    }
    //VALIDATION 
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4, 'too Short').max(50, 'too long'),
        email: Yup.string(),
        password: Yup.string().min(4, 'too Short').max(50, 'too long'),
        level: Yup.string(),
    })
    //FUNCTION TO LOGIN

    const updateUser = async () => {
        if (validationSchema) {
            const response = await axios.put('http://localhost:3000/api/userList', {
                _id:credentials._id,
                studentName: credentials.studentName,
                studentId: credentials.studentId,
                password: credentials.password,
                level: credentials.level,
                status: true
            })
            console.log(response)
            if (response.data.success) {
                console.log(response)
                router.replace('/users/userList')
            }
            else setError(true)

        }
    }
    // useEffect(() => {
    //     fetch('http://localhost:3000/api/userList')
    //         .then((response) => response.json())
    //         .then((data) => setValue(data))
    // }, []);
    useEffect(() => {
        getCreds();

    }, []);
    async function getCreds() {

        console.log(props.email + " Props email")
        await fetch('http://localhost:3000/api/getCredentials', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({ studentId: props.email })
        })
            .then((response) => response.json())
            .then((res) => setCredentials(res.data))
    }

    useEffect(() => {
        async function getLevels() {

            await fetch('http://localhost:3000/api/levels')
                .then((response) => response.json())
                .then((data) => setValue(data))
        }
        // getCreds();   
        getLevels();

    }, []);


    const defaultProps = {
        options: value.data,
        getOptionLabel: (option) => option.level,
    };
    return (
        <>
            {credentials && <Grid container lg='12' sm='8' md="10" shrink={false}>
                <Paper style={paperStyle}>
                    <Grid align='center' item>
                        <h2 style={{ color: '#5c0931' }}>{props.title}</h2>
                    </Grid>
                    <Grid item>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={updateUser}>
                            {({ props, errors, touched }) => (
                                <Form >
                                    <Stack gap="1rem">

                                        <Field autoComplete='off' as={TextField} label='Name' name="name"
                                            placeholder='Enter Name' fullWidth required value={credentials.studentName}
                                            onChange={(e) => {
                                                setCredentials((prev) => ({
                                                    ...prev,
                                                    studentName: e.target.value
                                                }));
                                            }}
                                            helperText={<ErrorMessage name="name" />} >
                                            {errors.firstName && touched.firstName ? (
                                                <div>{errors.firstName}</div>
                                            ) : null}
                                        </Field>
                                        <Field autoComplete='off' as={TextField} label='Email' name="email"
                                            placeholder='Enter email' fullWidth required value={credentials.studentId}
                                            onChange={(e) => {
                                                setCredentials((prev) => ({
                                                    ...prev,
                                                    studentId: e.target.value
                                                }));
                                            }}

                                            helperText={<ErrorMessage name="email" />}
                                        >{errors.firstName && touched.firstName ? (
                                            <div>{errors.firstName}</div>
                                        ) : null}</Field>

                                        <Field autoComplete='off' as={TextField} label='Password' name="password"
                                            placeholder='Enter password' type='password' fullWidth required value={credentials.password}
                                            onChange={(e) => {
                                                setCredentials((prev) => ({
                                                    ...prev,
                                                    password: e.target.value
                                                }));
                                            }}

                                            helperText={<ErrorMessage name="password" />} >{errors.password && touched.password ? (
                                                <div>{errors.password}</div>
                                            ) : null}</Field>

                                        {value&&value.data&&credentials.level && <Autocomplete
                                            label="level"
                                            name="level"
                                            options={value.data?.map(option => option.level)}
                                            value={credentials.level}
                                            onChange={(e, newValue) => {
                                                setCredentials((prev) => ({
                                                    ...prev,
                                                    level: newValue || '' // Set the selected value or an empty string if newValue is null or undefined
                                                }));
                                            }}
                                            renderInput={(params) => (
                                                <TextField className="autoCompleteTxt" {...params} label="Level" />
                                            )}
                                        />
                                        }

                                        <Button type='submit' color='primary' variant="contained"
                                            style={btnstyle} >Edit User</Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Paper>
            </Grid >}
        </>
    )

}

export default EditUser