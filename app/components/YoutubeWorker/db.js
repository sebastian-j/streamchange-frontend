import Dexie from 'dexie';

const db = new Dexie('Giveaway');
db.version(1).stores({ users: 'id, imageUrl, title, message, isEligible' });

export default db;
