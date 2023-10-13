import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Autocomplete } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import { redirect } from 'next/dist/server/api-utils';
import { useTheme } from '@mui/material/styles';


import { useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { initialize } from 'next/dist/server/lib/render-server';



function getStyles(name, personName, theme) {


    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const CreateUserForm = (props) => {
    const router = useRouter();
    //STYLING
    const [inputvalue, setInputvalue] = React.useState(null)
    const [inputvalue1, setInputvalue1] = React.useState(null)
    const [inputvalue2, setInputvalue2] = React.useState(null)
    const [teacher, setTeacher] = React.useState(null);
    const [student, setStudent] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const [value, setValue] = React.useState('');
    const [date, setDate] = React.useState('')
    const paperStyle = { padding: 20, height: 'auto', margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }

    const btnstyle = { margin: '8px 0' }
    const initialValues = {
        teacher:'',
        student:'',
        level:'',
        date:''  
    }
    const AddingFiles = async () => {}

    //     const response = await axios.post('http://localhost:3000/api/content', {
    //         teacher: teacher.teacher,
    //         student: student.student,
    //         level: level.level,
    //         date: date,
    //     })
    //     console.log(response)
    //     if (response.data.success) {
    //         console.log(response)
    //         router.replace('/content/contentList')
    //     }
    //     else setError(true)

    //         router.prefetch('/content/contentList')
        
    // }

    // useEffect(() => {
    //     fetch('http://localhost:3000/api/content')
    //         .then((response) => response.json())
    //         .then((data) => setValue(data))
    // }, []);


    const defaultProps = {
        options: value.data,
        getOptionLabel: (option) => option.teacher,
    };
    const defaultProps2 = {
        options: value.data,
        getOptionLabel: (option) => option.student,
    };
    const defaultProps3 = {
        options: value.data,
        getOptionLabel: (option) => option.level,
    };


    return (
        <Grid>
            <Paper style={paperStyle} container sx={{ width: { lg: 400, md: 300, sm: 200 } }} >
                <Grid align='center' item>

                    <h4>Upload Files</h4>
                </Grid>
                <Grid item>
                    <Formik initialValues={initialValues} onSubmit={AddingFiles}>
                        {(props) => (
                            <Form>
                                <Stack gap='1rem'>
                                    <Field as={Autocomplete}
                                        {...defaultProps}
                                        value={teacher}
                                        onChange={(event, newValue) => {
                                            setTeacher(newValue);
                                            console.log(newValue)
                                        }}
                                        inputValue={inputvalue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputvalue(newInputValue);
                                        }}
                                        id="controllable-states-demo"
                                        getOptionLabel={(option) => option && option.teacher}
                                        renderInput={(params) => <TextField {...params} placeholder='Teacher' />}
                                        fullWidth
                                    />
                                    <Field as={Autocomplete}
                                        {...defaultProps2}
                                        value={student}
                                        onChange={(event, newValue) => {
                                            setStudent(newValue);
                                        }}
                                        inputValue={inputvalue1}
                                        onInputChange={(event, newInputValue) => {
                                            setInputvalue1(newInputValue);
                                        }}
                                        id="controllable-states-demo"
                                        getOptionLabel={(option) => option && option.student}
                                        renderInput={(params) => <TextField {...params} placeholder='Student' />}
                                        fullWidth
                                    />
                                    <Field as={Autocomplete}
                                        {...defaultProps3}
                                        value={level}
                                        onChange={(event, newValue) => {
                                            setLevel(newValue);
                                        }}
                                        inputValue={inputvalue2}
                                        onInputChange={(event, newInputValue) => {
                                            setInputvalue2(newInputValue);
                                        }}
                                        id="controllable-states-demo"
                                        getOptionLabel={(option) => option && option.level}
                                        renderInput={(params) => <TextField {...params} placeholder='Level' />}
                                        fullWidth
                                    />
                                    {/* </Field> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} name='date'>

                                        <DatePicker value={date} onChange={(newValue) => { setDate(newValue) }} />
                                    </LocalizationProvider>
                                    <label htmlFor="upload-photo">
                                        <input
                                            style={{ display: "none" }}
                                            id="upload-photo"
                                            name="upload-photo"
                                            type="file"
                                        />

                                        <Button color="secondary" variant="contained" component="span" fullWidth>
                                            Files
                                        </Button>{" "}
                                    </label>
                                    <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                        style={btnstyle} fullWidth onClick={AddingFiles}>{props.isSubmitting ? "Loading" : "Upload"}</Button>
                                </Stack>

                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Paper >
        </Grid >
    )
}


export default CreateUserForm;