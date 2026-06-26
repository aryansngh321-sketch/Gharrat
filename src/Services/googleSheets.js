const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9BVQSzqr1ttnAbt4qQlx2ddP06WLQYwamF3k9zz1I5D4Q5h8pYXGM5suAvI_eFpHj/exec";

export async function saveOrder(order) {
  return fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sheet: "Orders",
      ...order,
    }),
  });
}

export async function saveNewsletter(email, name = "") {
  return fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sheet: "Newsletter",
      email,
      name,
    }),
  });
}

export async function saveContact(contact) {
  return fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sheet: "Contact Leads",
      ...contact,
    }),
  });
}