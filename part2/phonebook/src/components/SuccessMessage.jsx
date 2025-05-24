const SuccessMessage = ({ SuccessText }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fonstStyle: "italic",
  };
  return <div style={successStyle}>{SuccessText}</div>;
};

export default SuccessMessage;
