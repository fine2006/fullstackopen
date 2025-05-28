import { useState, useEffect } from "react";
import contacts from "./services/persons";
import Contact from "./components/Contact";
import Search from "./components/Search";
import ContactForm from "./components/ContactForm";
import SuccessMessage from "./components/SuccessMessage";
import FailureMessage from "./components/FailureMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successText, setSuccessText] = useState(null);
  const [failureText, setFailureText] = useState(null);

  const hook = () => {
    contacts.getAll().then((result) => setPersons(result));
  };

  useEffect(hook, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const comp = persons.findIndex((person) => person.name === newName);
    if (comp === -1) {
      const newObject = {
        id: String(persons.length + 45),
        name: newName,
        number: newNumber,
      };
      contacts
        .create(newObject)
        .then((result) => setPersons(persons.concat(result)));
      setSuccessText(`User ${newName} successfully added`);
      setTimeout(() => setSuccessText(null), 5000);
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the number with the new one?`,
        )
      ) {
        const changedObject = {
          id: persons[comp].id,
          name: newName,
          number: newNumber,
        };
        contacts
          .update(changedObject.id, changedObject)
          .then((updatedObject) => {
            setPersons(
              persons.map((person) =>
                person.id === persons[comp].id ? updatedObject : person,
              ),
            );
            setSuccessText(`User ${newName} successfully updated`);
            setTimeout(() => setSuccessText(null), 5000);
          })
          .catch((error) => {
            setFailureText(`User ${newName} has been already removed ${error}`);
            setTimeout(() => setFailureText(null), 5000);
          })
          .finally(() => hook());
      } else {
        setFailureText("Operation Cancelled");
        setTimeout(() => setFailureText(null), 5000);
      }
    }
    setNewName("");
    setNewNumber("");
  };
  const filteredPersons = persons.filter(
    (person) => person.name.includes(searchTerm) === true,
  );
  const handleDeletion = (id) => {
    if (window.confirm(`Delete ${id}?`)) {
      contacts
        .deleteObject(id)
        .catch((error) => {
          setFailureText(`User ${id} has been already removed`);
          setTimeout(() => setFailureText(null), 5000);
        })
        .finally(() => hook());
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {successText ? <SuccessMessage SuccessText={successText} /> : ""}
      {failureText ? <FailureMessage FailureText={failureText} /> : ""}
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <ContactForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeInput={handleChangeInput}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <Contact
            key={person.id}
            name={person.name}
            number={person.number}
            deleteAction={() => handleDeletion(person.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
