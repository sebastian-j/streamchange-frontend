import Dexie from 'dexie';

const db = new Dexie('Giveaway');
db.version(1).stores({
  users: 'id, imageUrl, title, message, isModerator, isSponsor, isEligible',
  messages: '++id, authorId',
});
export default db;
