import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Autocomplete } from '@mui/material'

import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { redirect } from 'next/dist/server/api-utils';
import axios from 'axios';
// import Select from '../component/Select';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreateUserForm = (props) => {

    //STYLING
    const router = useRouter();
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('')
    const [level, setLevel] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState([]);
    const [inputvalue, setInputvalue] = React.useState('')
    const [exists, setExists] = React.useState(false)

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // const [Datas, setDatas] = useState([]);

    // console.log('Data:', Datas);
    const paperStyle = { padding: 20, height: 'auto', width: 400, margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0', background: 'linear-gradient(to right bottom, #430089, #82ffa1)', color: '#FFFF' }
    //STATE
    const initialValues = {
        name: '',
        email: '',
        password: '',
        level: ''
    }
    //VALIDATION 
    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Invalid email'),
        password: Yup.string(),
        level: Yup.string(),
    });
    //FUNCTION TO LOGIN
    const formdata = {
        name: name,
        email: email,
        password: password,
        level: level
    }

    const handleCancel = () => {
        // Handle cancellation logic here
        router.push('/users/userList');
    };

    const handleSubmit = async () => {


        const response = await axios.post('http://localhost:3000/api/userList', {
            studentName: name,
            studentId: email,
            password: password,
            level: level,
            status: true,
        })
        console.log(response)
        if (response.data?.exists === true) {
            setExists(true)
        }
        if (response.data?.exists !== true) {
            setExists(false)
        }
        if (response)
            if (response.data.success) {
                console.log(response)
                router.replace('/users/userList')
            }
            else setError(true)

    }



    useEffect(() => {
        async function getLevel() {
            await fetch('http://localhost:3000/api/levels')
                .then((response) => response.json())
                .then((data) => setValue([...data.data]))
        }
        getLevel()
    }, []);
    const defaultProps = {
        options: value.data,
        getOptionLabel: (option) => option.level,
    };
    return (
        <Grid container lg={12} sm={8} md={10}>
            <Paper style={paperStyle}>
                <Grid align="center" item>
                    <h2 style={{ color: '#5c0931' }}>Create User</h2>
                </Grid>
                <Grid item>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting, isValid }) => (
                            <Form>
                                <Stack gap="1rem">
                                    <Field
                                        style={{ borderColor: '#5c0931' }}
                                        as={TextField}
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="name" />}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="email" />}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Password"
                                        name="password"
                                        placeholder="Enter password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name="password" />}
                                    />
                                    {/* <Field as={Select} name="level" value={level} onChange={(event, newValue) => { setLevel(newValue); }} inputValue={inputvalue} onInputChange={(event, newInputValue) => { setInputvalue(newInputValue); }} getOptionLabel={(option) => option && option.level} renderInput={(params) => <TextField {...params} placeholder='Level' required helperText={<ErrorMessage name="level" />} />} fullWidth  ></Field> */}
                                    <label htmlFor="level">Level</label>
                                    <Field
                                        as={Select}
                                        name="level"
                                        label="Level"
                                        placeholder="Level"
                                        required
                                        onChange={(e) => setLevel(e.target.value)}
                                        value={level}
                                        fullWidth
                                        
                                    >
                                        {value.map((levelOption, index) => (
                                            <MenuItem key={index} value={levelOption.level}>
                                                {levelOption.level}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    {
                                        exists&&<p style={{color:'red'}}>User Alredy Exists</p>
                                    }
                                    <Button type="submit" style={{ backgroundColor: '#5c0931', color: 'white' }} color="primary" variant="contained" disabled={isSubmitting} fullWidth>
                                        {isSubmitting ? 'Loading' : 'Create User'}
                                    </Button>
                                    <Button variant="outlined" color="primary" fullWidth onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Paper>
        </Grid>
    )

}

export default CreateUserForm