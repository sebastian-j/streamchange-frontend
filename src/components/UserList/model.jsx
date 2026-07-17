import db from '../YoutubeWorker/db';

export function changeUsersEligibility(isEligible) {
  db.table('users')
    .where('id')
    .notEqual('id')
    .modify({
      isEligible,
    })
    .then(() => {});
}

export function insertOrUpdateItem(item) {
  db.users
    .where('id')
    .equals(item.id)
    .first()
    .then((user) => {
      if (user === undefined) {
        db.table('users')
          .add(item)
          .then(() => {});
      } else {
        db.table('users')
          .where('id')
          .equals(item.id)
          .modify({
            message: item.isEligible ? item.message : user.message,
            isEligible: user.isEligible === true ? true : item.isEligible,
            userId: item.userId || user.userId,
            platform: item.platform || user.platform,
            color: item.color || user.color,
            badges: item.badges || user.badges,
            subscriptionMonths:
              item.subscriptionMonths ?? user.subscriptionMonths,
          })
          .then(() => {});
      }
    });
}

export function purgeUsersTable() {
  db.messages.clear();
  db.users.clear();
}

export function toggleEligibleIDB(id) {
  db.users
    .where('id')
    .equals(id)
    .first()
    .then((user) => {
      db.table('users')
        .where('id')
        .equals(id)
        .modify({
          isEligible: !user.isEligible,
        })
        .then(() => {});
    });
}
