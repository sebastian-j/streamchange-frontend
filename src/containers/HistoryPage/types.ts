interface IHistoryItem {
  id: number;
  channelId: string;
  createdAt: string;
  displayName: string;
  platform: string;
  imageUrl: string;
  color?: string;
  message: string;
  prize: string;
}

type HistoryItem = IHistoryItem;

export { HistoryItem };
