interface IHistoryItem {
  id: number;
  channelId: string;
  createdAt: string;
  displayName: string;
  platform: string;
  imageUrl: string;
  message: string;
  prize: string;
}

type HistoryItem = IHistoryItem;

export { HistoryItem };
