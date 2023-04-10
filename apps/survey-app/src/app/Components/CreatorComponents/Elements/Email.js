import { useEffect, useState } from "react";
import Options from "./Options";
const Email = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      questionContent: label,
      questionNumber: props.id,
      answerType: "email",
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
          placeholder="Email"
          onChange={handleLabelChange}
        />
        <input
          className="optionsInput"
          placeholder="example@example.com"
          type="email"
          // onChange={handleLabelChange}
          size={40}
        />
      </div>
      <div>
        <div className="line2"></div>
      </div>
      <Options />
    </>
  );
};

export default Email;
