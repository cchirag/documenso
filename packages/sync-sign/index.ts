import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = (): string => {
  return uuidv4();
};

export const socket = io('ws://localhost:4000', {
  autoConnect: false,
});

export { QRCode } from './components/qr-code/qrcode';
