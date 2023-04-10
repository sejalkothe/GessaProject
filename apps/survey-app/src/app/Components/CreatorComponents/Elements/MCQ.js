import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './Elements.css';
import Options from "./Options";

const MCQ = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(props.options);
  const [label, setLabel] = useState(props.label);

  var count = options.length;


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddOption = () => {
    setOptions([...options, `Option ${count + 1}`]);
  };

  const handleOptionChange = (e) => {
    var optionArray = options.slice();
    optionArray[e.target.id] = e.target.value;
    setOptions(optionArray);
  };

  const handleDeleteField = (index) => {
    setOptions((prevFields) =>
      prevFields.filter((_, i) => i !== index)
    );
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      questionContent: label,
      questionNumber: props.id,
      answerType: "mcq",
      required: false,
      options: options,
    };
    props.addFormConfiguration(field);
    // console.log(field)
  });

  return (
    <>
      <div className="element-name FormTitle">
        <div>
          <input
            type={Text}
            className="question-input element-border-style"
            placeholder="Type your question here"
            value={label}
            onChange={handleLabelChange}
          />
          {/* <label className="inputPlaceholder">Question</label> */}
        </div>

        <div className="options" id="options">
          {options.map((op, index) => {
            return (
              <div key={index} className="option-input">
                <input type="radio" className="checkingBtn" value={op} name={props.questionNumber} />
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

          <button className="button-60" onClick={handleAddOption}>
            Add Option
          </button>
        </div>

        <div className="line2"></div>
      </div>
      <Options />
    </>
  );
};

export default MCQ;
