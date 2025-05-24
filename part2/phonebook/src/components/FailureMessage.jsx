const FailureMessage = ({ FailureText }) => {
  const failureStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fonstStyle: "italic",
  };
  return <div style={failureStyle}>{FailureText}</div>;
};

export default FailureMessage;
