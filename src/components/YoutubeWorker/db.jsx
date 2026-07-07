import Dexie from 'dexie';

const db = new Dexie('Giveaway');
db.version(1).stores({
  users: 'id, imageUrl, title, message, isModerator, isSponsor, isEligible',
  queue: 'id, imageUrl, title, message, addedAt, lastActiveAt',
  messages: '++id, authorId',
  history: '++id, channelId',
});
export default db;
