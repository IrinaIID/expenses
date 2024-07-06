import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  
  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = event => {
      // handle connection open event
      console.log('WebSocket connection opened: ', event);
    };

    this.socket.onmessage = message => {
      // handle new messages as they come in
      console.log('WebSocket message received: ', message);

      // You can also transform the message here before your app gets it
      // Or perform side effects, like showing a loading animation
    };
    
    this.socket.onclose = event => {
      // handle close event
      console.log('WebSocket connection closed: ', event);
    };
    
    this.socket.onerror = error => {
      // handle errors
      console.error('WebSocket error: ', error);
    };
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  disconnect(): void {
    this.socket.close();
  }
}