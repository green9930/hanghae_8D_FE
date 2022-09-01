import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import arrow from "../../assets/arrow.png";

const SelectBox = ({ data, onChangeHandler, ...rest }) => {
  return (
    <StSelectContainer>
      <StSelect onChange={onChangeHandler} {...rest}>
        {data.map((item) => (
          <StOption key={item.key} disabled={item.disabled} value={item.value}>
            {item.value === "" ? item.placeholder : item.value}
          </StOption>
        ))}
      </StSelect>
    </StSelectContainer>
  );
};

SelectBox.defaultProps = {
  data: "",
  borderColor: "#999999",
  padding: "auto",
  width: "100%",
  borderRadius: "5px",
  onChangeHandler: null,
  height: "40px",
};

const StSelectContainer = styled.div``;

const StSelect = styled.select`
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none;
  background: url(${arrow}) no-repeat left 20px center;
  text-align: center;
  font-size: 15px;
  overflow: auto;
  height: ${(props) => `${props.height}`};
  border: 0.5px solid ${(props) => `${props.borderColor}`};
  padding: ${(props) => `${props.padding}`};
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  border-radius: ${(props) => `${props.borderRadius}`};
  :focus {
    outline: none;
  }
  :first-child {
    color: gray;
  }
`;

const StOption = styled.option`
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

export default SelectBox;
