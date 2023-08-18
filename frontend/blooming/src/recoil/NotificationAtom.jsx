// atom.js
import { atom } from 'recoil';

export const notificationState = atom({
  key: 'notificationState',
  default: [
    { id: 1, text: 'Notification 1' },
    { id: 2, text: 'Notification 2' },
    { id: 3, text: 'Notification 3' },
    // Add more notifications as needed
  ],
});

export const deleteState = atom({
  key: 'deleteState',
  default: null,
});
