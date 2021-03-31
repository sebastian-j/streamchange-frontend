import db from '../../components/YoutubeWorker/db';

export function deleteItem(id) {
  db.queue.delete(id);
}

export function insertOrUpdateItem(item) {
  db.queue
    .where('id')
    .equals(item.id)
    .first()
    .then((user) => {
      if (user === undefined) {
        db.table('queue').add(item);
      } else if (typeof user !== 'undefined') {
        db.table('queue')
          .where('id')
          .equals(item.id)
          .modify({
            ...item,
          });
      }
    });
}

export function purgeQueueTable() {
  db.queue.clear();
}
