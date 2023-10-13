import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Stack, Autocomplete } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { uploadFileToS3 } from '../pages/api/content/bucket';



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
    const theme = useTheme();
    //STYLING
    const [inputvalue, setInputvalue] = React.useState(null)
    const [inputvalue1, setInputvalue1] = React.useState(null)
    const [inputvalue2, setInputvalue2] = React.useState(null)
    const [teacher, setTeacher] = React.useState(null);
    const [student, setStudent] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const [value, setValue] = React.useState('');
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [checkType,setCheckType] =React.useState(false)


    const [date, setDate] = React.useState(new Date())
    const [image, setImage] = React.useState(null);
    const [imageinput, setImageinput] = React.useState(null);
    const [file, setFile] = React.useState();
    // console.log(teacher, student, level, value)
    const paperStyle = { padding: 20, height: 'auto', margin: "0 auto", marginTop: '5rem', borderRadius: '15px 15px 15px 15px' }
    // const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0',backgroundColor:'#5c0931',color:'white' }
    //STATE
    const formats=['doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'rtf','pdf']


    const initialValues = {
        Student: '',
        Teacher: '',
        Level: '',
        Value: '',
    }
    const validationSchema = Yup.object().shape({
        Student: Yup.string().min(2).max(40),
        Teacher: Yup.string().min(2).max(40),
        Level: Yup.string().min(2).max(40),
        Value: Yup.string().min(2).max(40)
    })
    //FUNCTION TO LOGIN

    const AddingFiles = async (props) => {
        if(formats.includes(file.name.split('.').pop())){


            const bucketName = 'otp-mobile';
            const key = 'otp-docs/';
            const location = await uploadFileToS3(file, bucketName, key);
            console.log(location)
            
            const response = await axios.post('http://localhost:3000/api/content', {
                filename: file.name,
                student: student.studentName,
                teacher: teacher.teacherName,
                level: level.level,
                date: new Date(),
                fileUrl:location
            })
            console.log(response)
            if (response.data.success) {
                console.log(response)
                router.replace('/content/contentList')
            }
            else setError(true)
            
        }
        else{
            setCheckType(true);
        }
    }


        useEffect(() => {
        fetch('http://localhost:3000/api/teachers')
            .then((response) => response.json())
            .then((data) => setValue(data))
    }, []);


    useEffect(() => {
        fetch('http://localhost:3000/api/userList')
            .then((response) => response.json())
            .then((data) => setValue1(data))
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/levels')
            .then((response) => response.json())
            .then((data) => setValue2(data))
    }, []);

    const defaultProps = {
        options: value.data,
        getOptionLabel: (option) => option.teacherName,
    };
    const defaultProps2 = {
        options: value1.data,
        getOptionLabel: (option) => option.studentName,
    };
    const defaultProps3 = {
        options: value2.data,
        getOptionLabel: (option) => option.level,
    };
    const handleChange = (e) => {
        const File = e.target.files[0];
        console.log(File)
        setImageinput(File)

        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(File);
    }

    const handleFileUpload = async (event) => {
        const fileTemp = event.target.files[0];
        setFile(fileTemp)
    };



    return (
        <Grid>
            <Paper style={paperStyle} container sx={{ width: { lg: 400, md: 300, sm: 200 } }} >
                <Grid align='center' item>

                    <h4>Upload Notes</h4>
                </Grid>
                <Grid item>
                    <Formik initialValues={initialValues} onSubmit={AddingFiles} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <Stack gap='1rem'>
                                    <Field as={Autocomplete} name="Teacher"
                                        {...defaultProps}
                                        value={teacher}
                                        onChange={(event, newValue) => {
                                            setTeacher(newValue);
                                        }}
                                        inputValue={inputvalue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputvalue(newInputValue);
                                        }}
                                        id="controllable-states-demo"

                                        renderInput={(params) => <TextField {...params} placeholder='Teacher' required
                                            helperText={<ErrorMessage name="Teacher" />} />}
                                        fullWidth


                                    />

                                    <Field as={Autocomplete} name="Student"

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

                                        renderInput={(params) => <TextField  {...params} placeholder='Student' required helperText={<ErrorMessage name="Student" />} />}
                                        fullWidth

                                    />
                                    <Field as={Autocomplete} name="Level"
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

                                        renderInput={(params) => <TextField {...params} placeholder='Level' helperText={<ErrorMessage name="Level" />} required />}
                                        fullWidth

                                    />

                                

                                    <input
                                        required
                                        style={{ backgroundColor: 'ActiveCaption', color: '#FFF' }}
                                        id="upload-photo"
                                        name="upload-photo"
                                        type="file"
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                    {
                                        checkType&&<p style={{color:'red'}}>Please use the correct format for documents either use a word document or pdf</p>
                                    }

                                    <Button type='submit' color='secondary' variant="contained" disabled={props.isSubmitting}
                                        style={btnstyle} fullWidth >{props.isSubmitting ? "Loading" : "Upload"}</Button>
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