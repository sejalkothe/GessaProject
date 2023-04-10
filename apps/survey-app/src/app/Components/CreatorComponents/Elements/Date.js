import { useEffect, useState } from "react";
import Options from "./Options";
const Date = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      questionContent: label,
      questionNumber: props.id,
      answerType: "date",
      required: false,
      options: []
    };
    props.addFormConfiguration(field);
  });

  return (
    <>
      <div className="element-name">
        <input
          className="question-input element-gap element-border-style"
          value={label}
          placeholder="Date"
          onChange={handleLabelChange}
        />
        <input className="element-input min-width-input" type="date"></input>
      </div>
      <div>
        <div className="line2"></div>
      </div>
      <Options />
    </>
  );
};

export default Date;
