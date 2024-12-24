import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});
// eslint-disable-next-line import/prefer-default-export

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getEvents, getSingleEvent, createEvent, updateEvent, deleteEvent,
};
