import type { WebSocketMessage, Game, Message } from '@/types';

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`ws://localhost:8080/websocket/${token}`);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        resolve();
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const eventType = data.event;
          if (this.listeners.has(eventType)) {
            this.listeners.get(eventType)?.forEach(callback => callback(data));
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(message: WebSocketMessage) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: string, callback: (data: any) => void) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)?.filter(cb => cb !== callback);
      if (callbacks) {
        this.listeners.set(event, callbacks);
      }
    }
  }

  // Game-related methods
  startMatching() {
    this.send({ event: 'start-matching' });
  }

  stopMatching() {
    this.send({ event: 'stop-matching' });
  }

  sendMove(nextStep: string) {
    this.send({ event: 'send-move', nextstep: nextStep });
  }

  sendMessage(content: string, id: number) {
    this.send({ event: 'send-message', content, id });
  }

  sendGameStatus(status: string, loser: number) {
    this.send({ event: 'finished', status, loser });
  }
}

export const websocketService = new WebSocketService();
