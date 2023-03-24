import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formApi from "../../API/FormData.js";
import "./Home.css";
import Card from './Survey/Cards/card.js';
import SurveyTable from './Survey/SurveyTable/surveyTable.js';

 const Home = (props) => {
//   const [forms, setForms] = useState([]);

//   const navigate = useNavigate();

//   const { email } = useParams()

//   const accessToken = localStorage.getItem(email);

//   const getForms = async () => {

//     const querRes = await formApi.get('/', {
//       params: { page: 0, size: 10, filters: { "userID": "user1" } }, headers: {
//         'x-tenant-id': '63f72b21f9dfbe6751b8875e'
//       }
//     })

//     console.log("query res :", querRes.data.result.data)
//     setForms(querRes.data.result.data)
//   }

//   const handleDeleteForm = async (e) => {
//     const querRes = await formApi.delete('/deleteFormByID', { params: { email: email, formID: e.target.id }, headers: { 'authorization': accessToken } })

//     console.log("delete form query res :", querRes.data.massage)
//   }


  // useEffect(() => {
  //   getForms();
  // }, [])

  return (

    // <div className="home-root">
    <>
      <SurveyTable />
    </>
      /* <div>
        <div className="container-left">



          <div className="main" style={{ marginBottom: "20px" }}><span>Created Forms</span></div>
          {<t>
            forms?.map((form, index) => {
              return <div className="subItem" key={index} style={{ marginBottom: "20px" }} >
                <span id={form._id} onClick={(e) => {
                  navigate(`/edit`, { state: { formID: e.target.id } })

                }} className="boxFont">{form.title}</span>
                <i id={form._id} style={{ marginLeft: "20px", marginTop: "5px", cursor: "pointer" }} className="fa fa-trash delete" onClick={handleDeleteForm} aria-hidden="true"></i>
                <button id={form._id} style={{ float: "right", borderColor: "black", backgroundColor: "white", borderRadius: "3px", marginRight: "12px", padding: "5px", margin: "auto", cursor: "pointer" }} onClick={(e) => { navigate(`/${email}/${e.target.id}/responses`) }}>{" "} Responses {" "}</button>
              </div>
            })}

        </div>
      </div >
      <div className="container" style={{ textAlign: "center" }}>
        <button style={{ margin: "auto" }} className="createBtn" onClick={(e) => {
          e.preventDefault();
          navigate(`/edit`)
        }}><i className="fa fa-solid fa-plus" aria-hidden="true"></i><br />Create New</button>
      </div>
    </div > */

  );
};



export default Home;
