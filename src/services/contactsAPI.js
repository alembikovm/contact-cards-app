import { CONTACTS_API } from "../constants";

export async function fetchContacts() {
  const contacts = await fetch(
    `${process.env.REACT_APP_API_PROXY}/${CONTACTS_API}`
  );

  return contacts.json();
}

export async function putContacts(contact) {
  const contacts = await fetch(
    `${process.env.REACT_APP_API_PROXY}/${CONTACTS_API}/${contact.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    }
  );

  return contacts.json();
}
