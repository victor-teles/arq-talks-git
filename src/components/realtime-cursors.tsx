'use client';

import { createClient } from '@/lib/supabase/client';
import { throttle } from '@/lib/utils';
import type { RealtimeChannel, User } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Cursor } from './cursor';
import { type Clients, EventTypes } from './types';

type Props = {
  user: User;
};

const randomNumber = Math.trunc(Math.random() * 100);
const randomColor = `rgb(${randomNumber}%, 30%, 40%)`;
const CURRENT_CLIENT_ID = nanoid();
const MAX_CONNECTED_CLIENTS = 20;

const supabase = createClient();
const channel = supabase.channel('room-arq');
const throttledChannelTrack = throttle(channel, channel.track, 50);

export function RealTimeCursors(props: Props) {
  const [newClients, setNewClients] = useState<Clients>({});
  const isFirstRender = useRef(true);
  const subsChannel = useRef<RealtimeChannel | null>(null);

  const removeClient = useCallback(
    (clientId: string) => {
      const clients = { ...newClients };
      delete clients[clientId];

      setNewClients(clients);
    },
    [newClients],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      subsChannel.current = channel.subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;
      });
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    channel.on('presence', { event: 'sync' }, () => {
      const newState = channel.presenceState<Clients>();

      const presenceValues: Clients = {};

      for (const stateId of Object.keys(newState)) {
        const presenceValue = newState[stateId][0];
        const clientId = Object.keys(presenceValue)[0];

        presenceValues[clientId] = presenceValue[clientId];
      }

      if (Object.keys(newClients).length === MAX_CONNECTED_CLIENTS) return;
      setNewClients((preValue) => {
        const updatedClients = Object.keys(presenceValues).reduce<Clients>((acc, curr) => {
          acc[curr] = {
            ...preValue[curr],
            ...presenceValues[curr],
          };
          return acc;
        }, {});

        return updatedClients;
      });
    });
  }, []);

  useEffect(() => {
    channel.on<{ clientId: string }>('presence', { event: 'leave' }, ({ leftPresences }) => {
      const { clientId } = leftPresences[0];
      removeClient(clientId);
    });
  }, [removeClient]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    throttledChannelTrack({
      [CURRENT_CLIENT_ID]: {
        ...newClients[CURRENT_CLIENT_ID],
        eventType: EventTypes.MoveMouse,
        color: randomColor,
        name: props.user.user_metadata.name,
        avatar: props.user.user_metadata.picture,
        x: event.clientX,
        y: event.clientY,
      },
    });
  }

  return (
    <div className="w-full h-screen p-10 absolute" onMouseMove={onMouseMove}>
      {Object.keys(newClients).map((clientId) => {
        const currentClient = newClients[clientId];

        return (
          <div key={`container-${clientId}`}>
            {clientId !== CURRENT_CLIENT_ID && (
              <Cursor
                key={clientId}
                x={currentClient.x}
                y={currentClient.y}
                color={[currentClient.color, currentClient.color]}
                name={currentClient.name}
                avatar={currentClient.avatar}
              />
            )}
          </div>
        );
      })}
      {/* {props.user.user_metadata.name} */}
    </div>
  );
}
