import { useEffect, useState } from "react";
import Options from "./Options";
const FileUpload = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      questionContent: label,
      questionNumber: props.id,
      answerType: "file",
      required: false,
      options: [],
    };
    props.addFormConfiguration(field);
  });

  return (
    <>
      <div className="element-name">
        <input
          className="question-input element-gap element-border-style"
          value={label}
          placeholder="File"
          onChange={handleLabelChange}
        />
        <input className="element-input min-width-input" type="file"></input>
      </div>
      <div>
        <div className="line2"></div>
      </div>
      <Options />
    </>
  );
};

export default FileUpload;
