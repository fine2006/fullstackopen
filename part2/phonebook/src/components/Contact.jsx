const Contact = ({ name, number, deleteAction }) => {
  return (
    <div>
      {name} {number} <button onClick={deleteAction}>delete</button>
    </div>
  );
};

export default Contact;
