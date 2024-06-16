export enum EventTypes {
  MoveMouse = 'move-mouse',
}

export type Note = {
  x: number;
  y: number;
  content: string;
};

type Payload = {
  eventType: EventTypes;
  x: number;
  y: number;
  color: string;
  notes: Array<Note>;
  name: string;
  avatar: string;
};

export type Clients = Record<string, Payload>;
