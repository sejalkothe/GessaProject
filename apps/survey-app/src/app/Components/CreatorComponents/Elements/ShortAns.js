import { useEffect, useState } from "react";
import Options from "./Options";

const ShortAns = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      questionContent: label,
      questionNumber: props.id,
      answerType: "text",
      required: false,
      options: [],
    };
    props.addFormConfiguration(field);
  });

  return (
    <>
      <div className="FormTitle">
        <input
          className="question-input inputField "
          value={label}
          placeholder="Type your question here"
          onChange={handleLabelChange}
        />
      </div>
      <div className="options">
        <input className="question-input inputField optionsInput textAns" type="text"
        />
      </div>
      <div>
        <div className="line2"></div>
      </div>
      <Options />
    </>
  );
};

export default ShortAns;
