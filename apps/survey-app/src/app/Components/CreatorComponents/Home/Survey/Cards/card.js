import React from 'react';
import './card.css';
// import { surveyCount } from '../SurveyTable/surveyTable';



export default function Card(props) {
  return (
    <>
      <div className={props.className} count={props.count} title={props.title} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
          <p className='count' style={{ font: 'Noto Sans',fontSize: '22px', marginTop: '20px', marginLeft: '20px' }}><b>{props.count}</b></p>
          <p style={{ paddingTop: '10px', paddingLeft: '10px', fontSize:'14px'}}>{props.title}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <p>Icon</p> */}
          <span >{props?.logo && <img src={props.logo} style={{width:'22px', height:'22px', marginLeft:'10px'}} />}</span>
          <p style={{ color:'#131CA2', paddingRight:'15px', paddingTop:'10px'}}>View All</p>
        </div>
      </div>
      
      
      
    </>
  )
}
