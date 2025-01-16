import React, { Component } from 'react';

class WebSocketDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.socket = null;
  }

  componentDidMount() {
    // WebSocket 연결
    this.socket = new WebSocket('ws://localhost:5000');

    // WebSocket 이벤트 핸들러
    this.socket.onopen = () => {
      console.log('WebSocket 연결 성공');
      this.socket.send('안녕하세요, 서버!');
    };

    this.socket.onmessage = (event) => {
      console.log('서버 메시지:', event.data);
      this.setState((prevState) => ({
        messages: [...prevState.messages, event.data],
      }));
    };

    this.socket.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket 에러:', error);
    };
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    if (this.socket) {
      this.socket.close();
    }
  }

  render() {
    return (
      <div>
        <h1>WebSocket Demo</h1>
        <ul>
          {this.state.messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default WebSocketDemo;
