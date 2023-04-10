import { useEffect, useState } from "react";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Options from "./Options";
const Checkbox = (props) => {
  const [options, setOptions] = useState(props.options);
  const [label, setLabel] = useState(props.label);


  var count = options.length;

  const handleAddOption = () => {
    setOptions([...options, `Choice ${count + 1}`]);
  };

  const handleOptionChange = (e) => {
    var optionArray = options.slice();
    optionArray[e.target.id] = e.target.value;
    setOptions(optionArray);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleDeleteField = (index) => {
    setOptions((prevFields) =>
      prevFields.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const field = {
      questionContent: label,
      questionNumber: props.id,
      answerType: "checkbox",
      required: false,
      options: options,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="question-input"
        placeholder="Type your question here"
        value={label}
        onChange={handleLabelChange}
      />

      <div id="options">
        {options.map((op, index) => {
          return (
            <div key={index} className="option-input">
              <input type="checkbox" className="checkingBtn" value={op} name={op} />

              <span className="span"> </span>
              <span className="span"> </span>
              <span className="span"> </span>
              <label>
                <input
                  className="optionsInput"
                  value={op}
                  id={index}
                  placeholder="Enter your option"
                  onChange={handleOptionChange}
                />
              </label>
              <button
                key={index}
                id={index}
                onClick={() => handleDeleteField(index)}
                className="span newSpan"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

          );
        })}

        <button className="addOptionBtn" onClick={handleAddOption}>
          Add Option
        </button>
      </div>
      <div>
        <div className="line2"></div>
      </div>
      <Options />
    </div>
  );
};

export default Checkbox;
