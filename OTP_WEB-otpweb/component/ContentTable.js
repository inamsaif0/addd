// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import Button from '@mui/material/Button';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import fetch from 'isomorphic-unfetch';
// import { useEffect } from 'react';
// import { Grid } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
// import { comment } from 'postcss';
// const columns = [
//   { id: 'no', label: 'No', minWidth: 170 },
//   { id: 'filename', label: 'FileName', minWidth: 100 },
//   {
//     id: 'filetype',
//     label: 'FileType',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'student',
//     label: 'Student',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'teacher',
//     label: 'Teacher',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: 'level',
//     label: 'Level',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },  
//   {
//     id: 'date',
//     label: 'Date',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },     
// ];

// function createData(no, filename,filetype, student, teacher, level, date) {

//   return { no, filename,filetype, student, teacher, level, date };
// }

// const rows = [
//   createData('1', 'IN', 1324171354, 3287263,'inam','inter1','12/12/23'),
//   createData('2', 'CN', 1403500365, 9596961,'najam','inter1','12/12/23'),
//   createData('3', 'IT', 60483973, 301340,'inam', 'inter1','12/12/23'),
//   createData('4', 'US', 327167434, 9833520,'hassam', 'inter1','12/12/23'),
//   createData('5', 'CA', 37602103, 9984670,'shahrukh','inter1','12/12/23'),
//   createData('6', 'AU', 25475400, 7692024,'shahrukh', 'inter1','12/12/23'),
//   createData('7', 'DE', 83019200, 357578, 'shahrukh','inter1','12/12/23'),
//   createData('8', 'IE', 4857000, 70273, 'shahrukh','inter1','12/12/23'),
//   createData('9', 'MX', 126577691, 1972550,'shahrukh','inter1','12/12/23'),
//   createData('10', 'JP', 126317000, 377973,'shahrukh','inter1','12/12/23'),
//   createData('11', 'FR', 67022000, 640679, 'shahrukh','inter1','12/12/23'),
//   createData('12', 'GB', 67545757, 242495, 'shahrukh','inter1','12/12/23'),
//   createData('13', 'RU', 146793744, 17098246, 'shahrukh','inter1','12/12/23'),
//   createData('14', 'NG', 200962417, 923768, 'shahrukh','inter1','12/12/23'),
//   createData('15', 'BR', 210147125, 8515767, 'sharukjh','inter2','12/12/23'),
// ];

// export default function StickyHeadTable({comments}) {
//   console.log(comments);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [value, setValue] = React.useState();


//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   useEffect(() => {
//     fetch('http://localhost:3000/api/content')
//       .then((response) => response.json())
//       .then((data) => setValue(data))
//   }, []);
//   console.log(value)
//   return (
//     <Grid>

//       <Grid direction='row' justifyContent='space-between' marginBottom='2rem'>
//         <TextField
//           label="Search by name"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment>
//                 <SearchIcon />
//               </InputAdornment>
//             )
//           }}
//         />
//         <Button

//           style={{ background: 'linear-gradient(to right top, #430089, #82ffa1)', color: '#FFFFFF', width: '150px', height: '50px' }}
//         >Add New</Button>

//       </Grid>
//       <Grid>
//     <Paper sx={{direction:'flex' , overflow: 'hidden', flexGrow:2 }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {value?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {value?.data.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//     </Grid>
//     </Grid>
//   );
// }

// // StickyHeadTable.getInitialProps = async () => {
// //  const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
// //  const { data } = await res.json();
// //  console.log(data);
// //  return {comments: data}

// // }

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import useSWR from 'swr';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios'
import { useEffect } from 'react';
import Link from 'next/link'
// import Button from '@mui/material-next/Button';

export default function ContentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [active, setActive] = React.useState('active')

  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const changebutton = () => {
    if (active == "active") {
      setActive('Inactive')
    }
    else {
      setActive('active')
    }
  }

  useEffect(() => {
   async function getData(){
      
      await fetch('http://localhost:3000/api/content')
      .then((response) => response.json())
      .then((data) => setValue(data))
    }
    getData();
  }, []);




  console.log(value)
  var i = 0;
  return (
    <Grid container>

      <Grid item>
        <TableContainer component={Paper} sx={{
          borderRadius: '15px 15px 15px 15px', mt: { lg: '1rem', md: '3rem', sm: '4rem' }, minWidth: {
            lg: 900, md: 700, sm: 300
          }
        }}
        >
          <Table sx={{ minWidth: { lg: 900, md: 700, sm: 300 } }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>Student No</b></TableCell>
                <TableCell align='left'><b>File Name</b></TableCell>
                <TableCell align="left"><b>File Type</b></TableCell>
                <TableCell align="left"><b>Student</b></TableCell>
                <TableCell align="left"><b>Teacher</b></TableCell>
                <TableCell align="left"><b>Level</b></TableCell>
                <TableCell align="center"><b>Date</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value?.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((curElem,index) => {
                i++

                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="curElement" sx={{ fontFamily: "inherit" }} align='center'>
                      {i}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "inherit" }}>
                      <a style={{color:'#5c0931'}} href={curElem.fileUrl}>
                        {curElem.filename}
                      </a>
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "inherit" }}>{curElem.filename.substr(curElem.filename.lastIndexOf('.') + 1)}</TableCell>
                    <TableCell align="left" sx={{ fontFamily: "inherit" }}>{curElem.student}</TableCell>
                    <TableCell align="left" sx={{ fontFamily: "inherit" }}>{curElem.teacher}</TableCell>
                    <TableCell align="left" sx={{ fontFamily: "inherit" }}>
                      {curElem.level}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "inherit" }}>
                      {curElem.date.substring(0, 10)}
                    </TableCell>
                  </TableRow>
                )

              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={value && value.data ? value.data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}

        />
      </Grid>
    </Grid>
  );
}
// BasicTable.getInitialProps = async ctx => {
//   try {
//     const res = await axios.get('http://localhost:3000/api/userList');
//     console.log(res.data)
//     const data = res.data;
//     return { data };
//   } catch (error) {
//     return { error };
//   }
// };
