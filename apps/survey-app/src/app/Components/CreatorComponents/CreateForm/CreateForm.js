import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formApi from "../../API/FormData.js";
import Checkbox from "../Elements/Checkbox.js";
import Date from "../Elements/Date.js";
import Email from "../Elements/Email.js";
import FileUpload from "../Elements/FileUpload.js";
import MCQ from "../Elements/MCQ.js";
import ShortAns from "../Elements/ShortAns.js";
import Time from "../Elements/Time.js";
import Preview from "../Preview/Preview.js";
import "./CreateForm.css";
import HandleSaveForm from "./HandleSaveForm.js";

const counts = {
    Email: 0,
    Date: 0,
    Time: 0,
    address: 0,
    tel: 0,
    Single_Choice: 0,
    Multiple_Choice: 0,
    Text: 0,
    longAns: 0,
    File_Upload: 0
}


const CreateForm = (props) => {
    const [dialog, setDialog] = useState("");
    const [formConfiguration, setFormConfiguration] = useState([]);

    const [inputValue, setInputValue] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    // const { email } = useParams();

    const [showPreview, setShowPreview] = useState(false);
    const [fields, setFields] = useState([])
    const [name, setName] = useState("")
    const [allowDuplicate, setAllowDuplicate] = useState(false);

    // const accessToken = localStorage.getItem(email);


    const getUserId = sessionStorage.getItem("userId")
    const userId = getUserId.substring(1, getUserId.length - 1)

    var formID = ""

    if (location.state) formID = location.state.formID


    const Components = {
        "Single_Choice": MCQ,
        "Multiple_Choice": Checkbox,
        "Text": ShortAns,
        "Date": Date,
        "File_Upload": FileUpload,
        "Email": Email,
        "Time": Time,
        // "address": Address,
        // "tel": Phone,
        // "longAns": LongAns,
    }


    var elements = [
        { name: "Single_Choice" },
        { name: "Multiple_Choice" },
        { name: "Text" },
        { name: "Date" },
        { name: "File_Upload" },
        { name: "Email" },
        { name: "Time" },
        // { name: "address" },
        // { name: "tel" },
        // { name: "longAns" },
    ];
    let expiry_date = ''
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    console.log("survey title", inputValue)
    const handleDateChange = (event) => {
        expiry_date = event.target.value;
        // console.log("Expiry date", expiry_date)
    }
    const setComponentList = (type, id, label, options) => {

        const Comp = Components[type];

        setFields((oldFields) => ([
            ...oldFields,
            <Comp questionContent={label}
                id={fields.length + 1}
                options={options}
                addFormConfiguration={addFormConfiguration} />
        ]));
    }

    const renderForm = (formData) => {
        setName(formData.formName)
        setAllowDuplicate(formData.allowDuplicate)
        setFields([])

        formData.fields.map((form) => {
            setComponentList(form.type, form.id, form.label, form.options)
        });
    }

    const getFormData = async () => {
        const apiRes = await formApi.get("/getFormByID", {
            // params: { formID: formID, email: email },
            // headers: { 'authorization': accessToken }
        });

        if (apiRes.data.status === false) return setDialog("Something went wrong!");

        else {
            renderForm(apiRes.data.data);
        }
    };

    useEffect(() => {
        if (formID) {
            getFormData();
        }
    }, [])

    const addFormConfiguration = (field) => {
        // console.log('field----------------------->', field)
        var objIndex = formConfiguration.findIndex(
            (obj) => obj.questionNumber === field.questionNumber
        );
        if (objIndex === -1) {
            formConfiguration.push(field);
        } else {
            formConfiguration[objIndex] = field;
        }
        // console.log(formConfiguration)
    };

    const handlePublish = async () => {
        // const res = await HandleSaveForm(email, formConfiguration, name, formID, allowDuplicate, setDialog);
        // console.log("username : ------------------>", userId)

        console.log("userId-------------------------------> ", userId)
        const res = await HandleSaveForm(inputValue, expiry_date, userId, formConfiguration, name, setDialog);

        if (res) {
            // navigate(`/${email}/publish`, { state: { formID: res.formID } });
            console.log("Navigation successful")
        }
    };

    // console.log("this is the form configuration _--------------> ", formConfiguration)

    //Drag and drop handlers
    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("fieldID", id);
    };

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    const onDrop = (ev) => {
        ev.preventDefault();
        var type = ev.dataTransfer.getData("fieldID");
        console.log(type)
        var label = ""
        var id = `${type}_${counts[type]}`
        var options = ['Option 1']
        counts[type] = counts[type] + 1
        console.log("id:", id)
        setComponentList(type, id, label, options)
    };

    var allElements = [];

    elements.forEach((el) => {
        allElements.push(
            <button
                className="elements-btn"
                key={el.name}
                onDragStart={(e) => onDragStart(e, el.name)}
                draggable
            >
                <div>* {el.name}</div>
                <div style={{
                    fontWeight: "bolder"
                }}>::</div>
            </button>
        );
    });

    return (
        <div>

            {showPreview ? <div> <Preview heading={inputValue} setShowPreview={setShowPreview} formConf={formConfiguration} /> </div>
                : <div className="container-root1">
                    <div className="newSurv"><p style={{ color: "blue" }}>Surveys</p> &gt; Add new Survey</div>
                    <div className=" Elements">
                        <div className="ElementsHeading">
                            <h1>List of available question types</h1>
                            <h1 className="line"> </h1>
                        </div>
                        <div
                            className="elementList"
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => {
                                onDrop(e);
                            }}
                        >
                            {allElements}
                        </div>
                    </div>

                    {/* right container */}
                    <div className="container-right DraggableArea" id="container-right">
                        <div className="FormTitle">
                            <input
                                type="text"
                                className={`input input-field ${inputValue.length === "0" ? "has-value" : ""
                                    }`}
                                value={inputValue}
                                onChange={handleChange}
                            />
                            <label className="input-placeholder">Survey Title</label>
                            <input type="date" onChange={handleDateChange} className="input" />
                        </div>
                        {/* <Heading name={name} key={name} addFormName={setName} /> */}

                        {/* <div style={{ marginBottom: "50px" }} className="element-name">
                            <label className="element-input element-gap element-border-style">Enter Your Email</label>
                            <br></br>
                            <input className="element-input element-gap element-border-style" placeholder="user email here" />
                            <hr style={{ width: "100%" }}></hr>
                        </div> */}

                        <div className="">
                            <ol className="orderedList">
                                {fields.map((el, index) => {
                                    return (
                                        <li className="added-elements simpleCard" key={index}>
                                            {el}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                        <div
                            className="droppable-area"
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => onDrop(e)}
                            id="target-div"
                        >
                            <div className="drag-text">Drag Here</div>
                        </div>

                        {/* <div>
                            <label>Allow Duplicate</label>
                            <input type="checkbox" checked={allowDuplicate} onChange={(e) => { setAllowDuplicate(e.target.checked) }}></input>
                        </div> */}

                        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                            <h4 style={{ color: "red", textAlign: "center" }}>{dialog}</h4>
                        </div>

                        <div className="publish-preview-btn">
                            <div className="publish-btn-">
                                <button className="cancel-btn" onClick={(e) => {
                                    console.log("cancel")
                                }}>
                                    Cancel{" "}
                                </button>
                            </div>

                            <div className="publish-btn-div">
                                <button className="new-btn" onClick={(e) => {
                                    // setShowPreview(true);
                                    console.log("save")
                                }}>
                                    Save{" "}
                                </button>
                                <button className="new-btn" onClick={(e) => {
                                    setShowPreview(true);
                                }}>
                                    Preview{" "}
                                </button>
                                <button className="new-btn" onClick={handlePublish}>
                                    Publish{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}


export default CreateForm;
