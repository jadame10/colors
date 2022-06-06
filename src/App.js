import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Input from './Input';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {

  const [data, setData] = useState([{}]);
  let [page, setPage] = React.useState(1);
  const [rowsPerPage] = React.useState(5);
  let [currentPage] = useState(1);
  const [parentCounter, setParentCounter] = useState(0);
  const [path, setPath] = useState(0);
  const navigate = useNavigate();

useEffect(() => {
    async function fetchData(){
            do {
              let nextUrl =  `https://reqres.in/api/products?page=${currentPage++}`;
              const response = await axios.get(nextUrl);
              setData(data => [...data, ...response.data.data].sort((a,b) => a.id - b.id));
              
          } while(currentPage < 3)
     }
     fetchData(); 
 }, [currentPage]);

 useEffect(() => {
  parentCounter ? navigate(`/page=${parseInt(parentCounter)}`, { replace: true }) 
  : navigate(path === 0 ? `/` : `/page=${path}`, { replace: true })
}, [path, navigate, parentCounter])

const refreshPage = () => {
  window.location.replace('https://jadame10.github.io');
}
 const changePages = (event, page) => {
  event.preventDefault();
  setPage(page+1);
  setPath(page+1);
 }

 if (!data) {
  return <div>Loadding...</div>;
}
return (
<div className ='Colors'>
<p className='main-text'>Enter a number from 1 to 12</p>
<Input setParentCounter={setParentCounter} /> 
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Year</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {parentCounter ? data.filter((itm) =>  itm.id === parseInt(parentCounter)).map((row) => (
              <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style ={{backgroundColor: `${row.color}`}}
            >
              <TableCell align = "left">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
            </TableRow>
          )) : data.filter((it) => it.id != null)
          .slice((page-1) * rowsPerPage, ((page-1) * rowsPerPage ) + rowsPerPage)
          .map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style ={{backgroundColor: `${row.color}`}}
            >
              <TableCell align = "left">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {parentCounter ? <Pagination count={1} 
        onClick = {(e) => refreshPage(e)} 
        page = {parseInt(parentCounter)}
        component={Link}
        to =  {`/`} 
        shape="circular" 
        color="primary" 
      />
       : <Pagination count={3} 
        onChange = {(event, page) => changePages(event, page-1)} 
        page = {page}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
              to =  {`/`} 
              {...item}
            />
          )}
        shape="circular" 
        color="primary" 
      />
        }
 </div>
);
}

export default App;

