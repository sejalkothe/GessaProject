import formApi from "../../API/FormData";

// const HandleSaveForm = async (email, formConfiguration, formName, formID, allowDuplicate, setDialog) => {
const HandleSaveForm = async (formName, expiryDate, userId, formConfiguration, setDialog) => {
    // const accessToken = localStorage.getItem(email);

    if (formName === '' || formName === null) formName = "Untitled"

    // var emptyLabels = false;
    console.log("inside handle save form ------->", formName, userId)

    // formConfiguration.map((field) => {
    //     if (field.label === '' || field.label === null) {
    //         setDialog("Please add label to all fields!")
    //         // emptyLabels = true
    //     }
    // })

    // if (emptyLabels) return false;

    // const querRes = await formApi.post("/saveform", {
    //     formConf: {
    //         formID: formID,
    //         formName: formName,
    //         allowDuplicate: allowDuplicate,
    //         fields: formConfiguration,
    //     },
    // const formConf = {
    //     title: formName,
    //     description: "Survey Form",
    //     userId: formID,
    //     expiry: expiryDate,
    //     status: "completed",
    //     questions: formConfiguration,
    // }

    console.log("form Configuration ------->", formConfiguration)

    const formData = {
        title: formName,
        description: "Survey Form",
        userID: userId,
        expiry: expiryDate,
        status: "completed",
        questions: formConfiguration,

        // email: email,
    }
    console.log(formData)
    const querRes = await formApi.post("/", JSON.stringify(formData), {
        headers: {
            'x-tenant-id': '63f72b21f9dfbe6751b8875e',
            'Content-Type': 'application/json'
        }
    }
    )
    console.log("query response")
    console.log(querRes)
    // );

    // if (querRes.data.status === true) {
    //     console.log("form data saved !")
    //     return querRes.data.data;
    // }

    // setDialog(querRes.data.massage)
    // return false;
}


export default HandleSaveForm;