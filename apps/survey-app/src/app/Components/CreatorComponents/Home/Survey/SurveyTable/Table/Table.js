import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import formApi from '../../../../../API/FormData.js';
import './Table.css';
// import { makeStyles } from '@material-ui/core/styles';

// import { color } from '@mui/system'

// const useStyles = makeStyles(theme => ({
//     root: {
//         backgroundColor: red,
//     },
//     container: {

//     }
// }))





export default function BasicTable({ forms, getForms }) {
    // const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    const getLocalStorage = (label) => {
        return JSON.parse(sessionStorage.getItem(label) || '{}');
    };
    const test = [];
    // forms.map((data) => {
    //     test.push(createData(data.surveyName,data.status,data.questions,data.createdOn,data.expiryOn))
    //     console.log(createData(data.surveyName, data.status, data.questions, data.createdOn, data.expiryOn))

    // })
    // const { email } = useParams()

    // const accessToken = localStorage.getItem(email);

    // const getForms = async () => {

    //     const querRes = await formApi.get('', {
    //         params: { page: 0, size: 10, filters: { "userID": getLocalStorage('userInfo').userName } }, headers: {
    //             'x-tenant-id': '63f72b21f9dfbe6751b8875e'
    //         }

    //     })

    //     console.log("query res :", querRes.data.result.data)
    //     setForms(querRes.data.result.data)
    // }


    async function handleDeleteForm(e, id) {
        console.log(e.target.id)
        const querRes = await formApi.delete(`/${id}`, {
            headers: {
                'x-tenant-id': '63f72b21f9dfbe6751b8875e'
            }
        });

        // console.log("delete form query res :", querRes.data.massage);
        setTimeout(() => { getForms() }, 1500);


    }


    // useEffect(() => {
    //     getForms();
    // }, [])

    // const classes = useStyles();

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
                        <TableCell className='cell' align="right"> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {forms?.map((form, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" className='cell'>
                                {form.title}
                            </TableCell>
                            <TableCell className='cell' align="right" >{form.status}</TableCell>
                            <TableCell className='cell' align="right">{form.questions.length}</TableCell>
                            <TableCell className='cell' align="right">{form.createdAt}</TableCell>
                            <TableCell className='cell' align="right">{form.expiry}</TableCell>
                            <TableCell className='cell' align="right" style={{ color: 'gray' }} >
                                <DeleteIcon id={form._id} onClick={(e) => handleDeleteForm(e, form._id)} style={{ cursor: 'pointer', hover: 'red' }} />
                                <button id={form._id} onClick={(e) => { navigate(`/project/63f72b21f9dfbe6751b8875e/${e.target.id}/responses/`) }}  style={{marginLeft:'10px', marginTop:'-1px', padding:'5px' }}>Response</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <div className={classes.root}> */}
            <Stack spacing={2}>
                <div>
                    <Pagination
                        count={10} shape="rounded" />
                    {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                </div>
            </Stack>
            {/* </div> */}
        </TableContainer>

    );
}
