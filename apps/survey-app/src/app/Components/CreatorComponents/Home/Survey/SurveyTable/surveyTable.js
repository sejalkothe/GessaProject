import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Icon from '@mui/material/Icon';
import BasicTable from './Table/Table';
// import Vectorlogo from '../../../../../../../../react-host/src/assets/Vectorlogo.svg';
import FactCheck from '../../../../../../assets/VectorFactCheck.svg';
import TimeAccess from '../../../../../../assets/VectorTimeAccess.svg';
import Reschedule from '../../../../../../assets/VectorReschedule.svg';
import CheckCircle from '../../../../../../assets/VectorCheckCircle.svg';
import Dots from '../../../../../../assets/VectorDots.svg';
import formApi from '../../../../API/FormData';
import './survey.css';
import Card from '../Cards/card';



function SurveyTable() {
  const [count, setCount] = useState(0)

  ///////////////////////////////////////////////`  

  const [forms, setForms] = useState([]);

  // const navigate = useNavigate();

  // const { email } = useParams()

  // const accessToken = localStorage.getItem(email);
  const getLocalStorage = (label) => {
    return JSON.parse(sessionStorage.getItem(label) || '{}');
  };

  getLocalStorage('userInfo')
  console.log(getLocalStorage('userInfo'))
  const getForms = async () => {

    const querRes = await formApi.get('', {
      params: { page: 0, size: 10, filters: { "userID": getLocalStorage('userInfo').userName } }, headers: {
        'x-tenant-id': '63f72b21f9dfbe6751b8875e'
      }
    })
    console.log("query res :", querRes.data.result.data)
      setForms(querRes.data.result.data)
    }
  

  const counts = forms.reduce((acc, form) => {
    if (form.status === "completed") {
      acc.typeACount++;
    } else if (form.status === "ongoing") {
      acc.typeBCount++;
    } else if (form.status === "draft") {
      acc.typeCCount++;
    }
    return acc;
  }, { typeACount: 0, typeBCount: 0 , typeCCount: 0});

    

    const handleDeleteForm = async (e) => {
      const querRes = await formApi.delete('/deleteFormByID', { params: { email: email, formID: e.target.id }, headers: { 'authorization': accessToken } })

      console.log("delete form query res :", querRes.data.massage)
    }


    useEffect(() => {
      getForms();
    }, [])
  
    /////////////////////////////////////////////////////////////
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
  
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
 

    // const surveyCount = createContext();
 
  const Array = [{ name: 'card1', count:  forms.length , title: 'Total Surveys', logo: FactCheck },
    { name: 'card2', count: counts.typeBCount , title: 'Ongoing Surveys', logo: TimeAccess },
    { name: 'card3', count: counts.typeCCount , title: 'Draft Surveys', logo: Reschedule },
    { name: 'card4', count: counts.typeACount, title: 'Completed Surveys', logo: CheckCircle }]

  return (
      <div>
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
      
        {Array.map((arrayName) => {
          return <Card className={arrayName.name} count={arrayName.count} title={arrayName.title} logo={arrayName.logo} />
        })}

   

        <div className='SurveyTable'>
          <h1 className='Heading1'> Surveys ({forms.length}) </h1>
          <Search style={{ backgroundColor: '#f2f4f8', marginRight: '10%', marginTop: '-3%', width: '25%' }} >
            <SearchIconWrapper>
              <SearchIcon style={{ color: 'gray' }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search by Survey Name" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        <button style={{ position: 'fix', marginTop: '-50px', marginRight: '117px' }} onClick={(e) => { e.preventDefault(); navigate(`/edit`) }}> <AddSharpIcon style={{ color: '#131CA2' }} /></button>
          <button style={{ position: 'fix', marginTop: '-47px', marginRight: '80px', borderWeight: '1px' }}> <FilterAltSharpIcon style={{ color: '#131CA2' }} /></button>
          {/* <input className='search' placeholder='       Search by Survay Name' type="text" /> */}
          {/* <FontAwesomeIcon icon={faSearch} className="fa-search"/> */}
    
          {/* <button  type="button" className="create"  onClick={() => setCount(count + 1)}><FontAwesomeIcon icon={faPlus} className='plus' /></button> */}
    
          <BasicTable  />
          {/* <div className='filter' ><FontAwesomeIcon icon={faFilter} className='ficon' /></div> */}
        </div>
    
      </div>


    );
  }

  export default SurveyTable;
