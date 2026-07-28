import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from 'styled-components';

import UserItem from './userItem';
import { User } from '../types';

export const USER_ROW_HEIGHT = 44;

const ScrollRoot = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  position: relative;
`;

const VirtualInner = styled.div`
  position: relative;
  width: 100%;
`;

const VirtualRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
`;

interface Props {
  users: User[];
  onToggleEligibility: (id: string) => void;
}

const VirtualUserList = ({ users, onToggleEligibility }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => USER_ROW_HEIGHT,
    overscan: 12,
    getItemKey: (index) => users[index]?.id ?? index,
    useFlushSync: false,
  });

  return (
    <ScrollRoot ref={parentRef} role="list">
      <VirtualInner style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];
          if (!user) return null;

          return (
            <VirtualRow
              key={virtualRow.key}
              role="listitem"
              data-index={virtualRow.index}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <UserItem
                channelId={user.id}
                color={user.color}
                platform={user.platform}
                title={user.title}
                badges={user.badges}
                isEligible={user.isEligible}
                handleToggleUser={onToggleEligibility}
              />
            </VirtualRow>
          );
        })}
      </VirtualInner>
    </ScrollRoot>
  );
};

export default VirtualUserList;
