import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts, updateContacts } from "../store/contactsSlice";
import { clearForm, selectFormValues, setFieldValue } from "../store/formSlice";
import { setIsOpen } from "../store/modalSlice";

const ContactForm = () => {
  const { currentContact } = useSelector(selectContacts);
  const formData = useSelector(selectFormValues);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      updateContacts({
        ...currentContact,
        name: formData.name,
        address: {
          ...currentContact.address,
          city: formData.city,
        },
        phone: formData.phone,
        website: formData.website,
        company: { ...currentContact.company, name: formData.companyName },
      })
    );

    dispatch(setIsOpen(false));
  };

  const handleChangeInputValue = (fieldName, fieldValue) => {
    dispatch(setFieldValue({ [`${fieldName}`]: fieldValue }));
  };

  useEffect(() => {
    const fieldsForForm = {
      id: currentContact.id,
      name: currentContact.name,
      city: currentContact.address.city,
      phone: currentContact.phone,
      website: currentContact.website,
      companyName: currentContact.company.name,
    };
    for (const key in fieldsForForm) {
      if (key !== "id" && Object.hasOwnProperty.call(fieldsForForm, key)) {
        dispatch(setFieldValue({ [`${key}`]: fieldsForForm[key] }));
      }
    }

    return () => {
      dispatch(clearForm());
    };
  }, [currentContact, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2 className="contact-form-title">Contact Information</h2>

      <div className="contact-form-field">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={(event) =>
            handleChangeInputValue("name", event.target.value)
          }
          required
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="city">City</label>
        <input
          name="city"
          type="text"
          value={formData.city}
          onChange={(event) =>
            handleChangeInputValue("city", event.target.value)
          }
          required
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="phone">Phone</label>
        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={(event) =>
            handleChangeInputValue("phone", event.target.value)
          }
          required
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="website">Website</label>
        <input
          name="website"
          type="text"
          value={formData.website}
          onChange={(event) =>
            handleChangeInputValue("website", event.target.value)
          }
          required
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="companyName">Company Name</label>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={(event) =>
            handleChangeInputValue("companyName", event.target.value)
          }
          type="text"
          required
        />
      </div>

      <button type="submit" className="update-contact-button">
        Update Contact
      </button>
    </form>
  );
};

export default ContactForm;
