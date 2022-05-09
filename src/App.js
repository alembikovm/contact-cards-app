import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findCurrentContact,
  getContacts,
  selectContacts,
} from "./store/contactsSlice";
import Modal from "./components/Modal/Modal";
import ContactForm from "./forms/ContactForm";
import { modalState, setIsOpen } from "./store/modalSlice";

import "./scss/main.scss";

function App() {
  const dispatch = useDispatch();
  const { contacts, status } = useSelector(selectContacts);
  const { isOpen } = useSelector(modalState);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleDoubleClick = useCallback(
    (contactId) => {
      dispatch(findCurrentContact(contactId));
      dispatch(setIsOpen(true));
    },
    [dispatch]
  );

  const handleCloseModal = () => dispatch(setIsOpen(false));

  if (status === "idle") {
    return (
      <div className="App">
        <ul className="cards">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="cards_item"
              onDoubleClick={() => handleDoubleClick(contact.id)}
            >
              <div className="card_content">
                <div className="card_title">{contact.name}</div>
                <div className="card_text">{contact.email}</div>
                <div className="card_text">{contact.address?.city}</div>
                <div className="card_text">{contact.phone}</div>
                <div className="card_text">{contact.website}</div>
                <div className="card_text">{contact.company?.name}</div>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="made_by">Made with ♡</h3>

        <Modal handleClose={handleCloseModal} isOpen={isOpen}>
          <ContactForm />
        </Modal>
      </div>
    );
  }

  return "loading...";
}

export default App;
