import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bg from '../../Public/bg.svg';
import up from '../../Public/chevron-right1.svg';
import down from '../../Public/chevron-right4.svg';
import user from '../../Public/ellipse.svg';
import grp1 from '../../Public/group-7020.svg';
import grp2 from '../../Public/group-70201.svg';
import grp4 from '../../Public/group-70202.svg';
import grp3 from '../../Public/group-7024.svg';
import grp5 from '../../Public/live.svg';
import "./Response.css";



const Response = (props) => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const { id } = useParams()
    // let formID = "64101e5ca6ceca38719231b5";

    console.log("id :", id)

    // const [questions,setQuestions] = useState([]);

    useEffect(() => {  // Whenever there is change in DOM or any API request get exe 
        // use Effect wille get executed
        async function fetchPosts() {

            try {
                const response = await fetch(`https://api.qa.gessa.io/cms/survey/${id}`, {
                    method: 'GET',
                    headers: {
                        'x-tenant-id': '63f72b21f9dfbe6751b8875e'
                    }
                });
                const resData = await response.json();
                // console.log("resData", resData);
                await setData(resData);
                console.log("data", resData);

                // console.log(createdAt);  
            } catch (err) {
                console.log("Error", err);
            }
        }
        async function fetchResponses() {
            try {
                let url = `https://api.qa.gessa.io/cms/response?filters={"formID":"${id}"}&page=0&size=10`;
                console.log("url :", url)
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-tenant-id': '63f72b21f9dfbe6751b8875e',
                        // 'content-type':'application/json'
                    }
                });


                /*
                    const response = await axios.get('https://api.qa.gessa.io/cms/response/?filters={"formID":"64101e5ca6ceca38719231b5"}&page=0&size=10', {
                    headers: {
                        'x-tenant-id': '63f72b21f9dfbe6751b8875e',
                        // 'content-type':'application/json'
                    }
                });


                */

                const resData = await response.json();
                setResponse(resData);
                console.log("resData", resData);

                // console.log(createdAt);  
            } catch (err) {
                console.log("Error", err);
            }
        }
        fetchPosts();
        fetchResponses();
    }, [])

    // console.log("Response :", response);

    //variables for form
    const createdAt = data?.result?.createdAt?.slice(0, 10);
    const questionsCount = data?.result?.questions.length;
    const expiresOn = data?.result?.expiry;
    const status = data?.result?.draft;
    const surveyName = data?.result?.title;
    const navigate = useNavigate();

    console.log(createdAt, questionsCount, expiresOn, status, surveyName)

    //variables for response
    const responseObjects = response?.result?.data;
    const responsescount = (responseObjects) ? responseObjects.length : 0;

    //useReducer
    function reducer(state, action) {
        if (action.type === 'click') {
            console.log(action.payload)
            return action.payload;

        }
    }
    const [state, dispatch] = useReducer(reducer, []);

    //get day , date ,Month  and year 
    const datetimeStr = "" + state.createdAt;
    // Create a Date object from the string
    const datetime = new Date(datetimeStr);

    // Define arrays for days of the week and months
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Extract day of the week, month, and date
    const dayOfWeek = weekdays[datetime.getUTCDay()];
    const month = months[datetime.getUTCMonth()];
    const date = datetime.getUTCDate();
    const year = datetime.getUTCFullYear();
    const time = datetime.getTime();


    const onItem1TextClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const onItem1Text1Click = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div className="task-19">

            <div className="event-heading-creator-parent">
                <div className="event-heading-creator">
                    <div className="event-heading-creator-inner">
                        <div className="group-wrapper">
                            <div className="group-wrapper">
                                <img className="bg-icon" alt="" src={bg} />
                                <div className="buttonoutline-button-parent">
                                    <div className="buttonoutline-button">
                                        <div className="content6">
                                            <img
                                                className="edit-outline-icon"
                                                alt=""
                                                src="/edit-outline.svg"
                                            />
                                            <div className="name">Edit</div>
                                            <img
                                                className="right-side-icon-onoff"
                                                alt=""
                                                src="/right-side-icon-onoff.svg"
                                            />
                                        </div>
                                    </div>
                                    <div className="lock-fill-1-parent">
                                        <img className="png-1-icon" alt="" src="/lock-fill-1.svg" />
                                        <div className="input-parent">
                                            <b className="input1">Public</b>
                                            <div className="label79">Access</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttonoutline-button-group">
                                    <div className="buttonoutline-button">
                                        <div className="content7">
                                            <img
                                                className="dot-icon"
                                                alt=""
                                                src="/edit-outline1.svg"
                                            />
                                            <img
                                                className="right-side-icon-onoff"
                                                alt=""
                                                src="/right-side-icon-onoff1.svg"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-check-parent">
                                        <img className="px-check" alt="" src="/24px--check.svg" />
                                        <div className="input-group">
                                            <b className="input1">Upcoming</b>
                                            <div className="label80">Status</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="label-parent">
                                    <div className="accepting-responses">Survey Name</div>
                                    <div className="h1-medium">{surveyName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group-container">
                        <div className="input-container">
                            <div className="input3">2020-01-27 â¢ 01 : 30 PM</div>
                            <div className="last-name">Start on</div>
                        </div>
                        <img className="group-child" alt="" src="/group-7026.svg" />
                    </div>
                    <div className="event-heading-creator-child">
                        <div className="group-frame">
                            <div className="group-frame">
                                <div className="input-parent1">
                                    <div className="input3">Jack Matthew</div>
                                    <div className="last-name">Created By</div>
                                </div>
                                <img className="group-item" alt="" src="/group-7022.svg" />
                            </div>
                        </div>
                    </div>
                    <div className="frame-parent4">
                        <div className="group-wrapper1">
                            <div className="group-parent2">
                                <div className="input-parent2">
                                    <div className="input3">{createdAt}</div>
                                    <div className="last-name">Created On</div>
                                </div>
                                <img className="group-item" alt="" src={grp1} />
                            </div>
                        </div>
                        <div className="group-wrapper1">
                            <div className="group-parent3">
                                <div className="input-parent3">
                                    <div className="input3">{questionsCount}</div>
                                    <div className="last-name">Survey Questions</div>
                                </div>
                                <img className="group-item" alt="" src={grp2} />
                            </div>
                        </div>
                        <div className="group-wrapper1">
                            <div className="group-parent4">
                                <div className="input-parent4">
                                    <div className="input3">{responsescount}</div>
                                    <div className="last-name">Total Responses</div>
                                </div>
                                <img className="group-item" alt="" src={grp3} />
                            </div>
                        </div>
                        <div className="group-wrapper1">
                            <div className="group-parent2">
                                <div className="input-parent2">
                                    <div className="input3">{expiresOn}</div>
                                    <div className="last-name">Expires On</div>
                                </div>
                                <img className="group-item" alt="" src={grp4} />
                            </div>
                        </div>
                        <div className="live-parent">
                            <img className="live-icon" alt="" src={grp5} />
                            <div className="input-parent8">
                                <b className="input1">{status ? "Draft" : "Active"}</b>
                                <div className="label79">Status</div>
                            </div>
                        </div>
                    </div>
                    <div className="event-heading-creator-item" />
                </div>
                <div className="top-departments-container">
                    <div className="top-departments1">
                        <div className="modal-header">
                            <div className="bg2" />
                            <div className="modal-header-child" />
                            <b className="title">Individual Responses</b>
                            <img
                                className="iconsarrow-back"
                                alt=""
                                src={up}
                            />
                            <img className="openinnew-icon" alt="" src="/openinnew.svg" />
                        </div>

                        <div className="frame-parent67">
                            <div className="frame-parent68">
                                <div className="frame-parent69">
                                    <div className="frame-wrapper2">
                                        <div className="property-1rafiq-parent">
                                            <div className="property-1rafiq">
                                                <div className="add" />
                                                <div className="frame-parent73">
                                                    <div className="group-tile-parent">
                                                        {
                                                            responseObjects?.map((item) => (
                                                                <div key={item._id} className="group-tile" onClick={() => dispatch({ type: 'click', payload: item })}>
                                                                    <img
                                                                        className="group-tile-child"
                                                                        alt=""
                                                                        src={user}
                                                                    />
                                                                    <div className="name">{item.userID}</div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div className="add" />
                                            </div>

                                            <div className="frame-child41" />
                                            <div className="model-header-parent">
                                                <div className="model-header2">
                                                    <div className="response-details-parent">
                                                        <b className="displaying-5-of">Response Details</b>
                                                        <div className="label139">Add New</div>
                                                        <div className="chevron-right-parent">
                                                            <img
                                                                className="edit-outline-icon"
                                                                alt=""
                                                                src={up}
                                                            />
                                                            <img
                                                                className="edit-outline-icon"
                                                                alt=""
                                                                src={down}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="model-header-child" />
                                                </div>
                                                <div className="model-department-manager">
                                                    <div className="model-header3">
                                                        <div className="tab-data-item" />
                                                    </div>
                                                    <div className="bottom-divider-onoff-group">
                                                        <div className="bottom-divider-onoff" />
                                                        <div className="bottom-divider-onoff10" />
                                                        <div className="bottom-divider-onoff10" />
                                                        <div className="bottom-divider-onoff10" />
                                                        <div className="bottom-divider-onoff10" />
                                                        <div className="frame-parent88">
                                                            <div className="frame-parent89">
                                                                <div className="frame-parent90">
                                                                    <div className="frame-parent91">
                                                                        <div className="frame-parent38">
                                                                            <div className="table-data12">
                                                                                <img
                                                                                    className="table-data-child"
                                                                                    alt=""
                                                                                    src={user}
                                                                                />
                                                                                <div className="name-parent">
                                                                                    <div className="name">
                                                                                        <span className="started-on">
                                                                                            Submitted On
                                                                                        </span>
                                                                                        <b> :</b>
                                                                                        {dayOfWeek},{month} {date} ,{year}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="frame-parent94">
                                                                    <div className="frame-parent91">
                                                                        <div className="frame-parent38">
                                                                            <div className="table-data12">
                                                                                <div className="name-parent">
                                                                                    <div className="name">
                                                                                        <b>{`Collector :`}</b>
                                                                                        <span>Web Link</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bottom-divider-onoff10" />
                                                    </div>
                                                    <div className="frame-parent98">
                                                        <div className="bottom-divider-onoff-parent">
                                                            <div className="bottom-divider-onoff10" />

                                                            {
                                                                state.answer?.map((item, index) => (
                                                                    <div key={index} className="frame-parent99">
                                                                        <div className="frame-parent79">
                                                                            <div className="frame-parent38">
                                                                                <div className="rank-parent">
                                                                                    <div className="rank">Rank</div>
                                                                                    <div className="div7">1</div>
                                                                                </div>
                                                                                <div className="table-data12">
                                                                                    <img
                                                                                        className="table-data-child"
                                                                                        alt=""
                                                                                        src={user}
                                                                                    />
                                                                                    <div className="name-parent">
                                                                                        <div className="name10">Q{index + 1}. {item.questionContent}
                                                                                            <div className="name-wrapper">
                                                                                                <div className="rank">
                                                                                                    <span>
                                                                                                        <div className="rank">
                                                                                                            {item.singleanswerContent}{item.multiAnswerContent}
                                                                                                        </div>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                            <div className="bottom-divider-onoff" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-divider-onoff10" />
                            </div>
                            <div className="image-3-wrapper">
                                <img className="image-3-icon" alt="" src="/image-3@2x.png" />
                            </div>
                        </div>
                        {/* <img
                            className="download-outline-icon2"
                            alt=""
                            src="/download-outline1.svg"
                        /> */}
                    </div>
                </div>
            </div>
            <div className="topnavigation1">


            </div>
        </div>
    );
};

export default Response;