import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css';
import Dots from '../../../../../../../assets/VectorDots.svg';

import formApi from '../../../../../API/FormData.js';

// import { color } from '@mui/system'





export default function BasicTable() {
    const [forms, setForms] = useState([]);
 
    const getLocalStorage = (label)=> {
        return JSON.parse(sessionStorage.getItem(label) || '{}');
    };
    const test = [];
    // forms.map((data) => {
    //     test.push(createData(data.surveyName,data.status,data.questions,data.createdOn,data.expiryOn))
    //     console.log(createData(data.surveyName, data.status, data.questions, data.createdOn, data.expiryOn))

    // })
    // const { email } = useParams()

    // const accessToken = localStorage.getItem(email);

    const getForms = async () => {

        const querRes = await formApi.get('', {
            params: { page: 0, size: 10, filters: { "userID": getLocalStorage('userInfo').userName } }, headers: {
                'x-tenant-id': '63f72b21f9dfbe6751b8875e'
            }
            
        })

        console.log("query res :", querRes.data.result.data)
        setForms(querRes.data.result.data)
    }

    async function handleDeleteForm(e) {
        const querRes = await formApi.delete('/deleteFormByID', { params: { email: email, formID: e.target.id }, headers: { 'authorization': accessToken } });

        console.log("delete form query res :", querRes.data.massage);
    }


    useEffect(() => {
        getForms();
    }, [])
    return (

        <TableContainer component={Paper} className="Table" >
            <Table sx={{ minWidth: 500 }} aria-label="simple table" >
                <TableHead >
                    <TableRow style={{ color: 'red' }} >
                        <TableCell className='cell'><b>Survey Name</b></TableCell>
                        <TableCell className='cell' align="right"><b>Status</b></TableCell>
                        <TableCell className='cell' align="right"><b>No of Questions</b></TableCell>
                        <TableCell className='cell' align="right"><b>Created On</b></TableCell>
                        <TableCell className='cell' align="right"><b>Expiry On</b></TableCell>
                <TableCell className='cell' align="right"><b>Dots</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {forms?.map((form,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" className='cell'>
                                {form.userID}
                            </TableCell>
                            <TableCell className='cell' align="right" >{form.status}</TableCell>
                            <TableCell className='cell' align="right">{form.questions.length}</TableCell>
                            <TableCell className='cell' align="right">{form.createdAt}</TableCell>
                            <TableCell className='cell' align="right">{form.expiry}</TableCell>
                            {/* <TableCell className='cell' align="right">{VectorDots}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        
    );
}
