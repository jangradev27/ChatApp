import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import { NavLink } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import { AuthApi, RoomApi } from '../services/api';
import { Reset } from '../slices/Roomslice';

const Url = import.meta.env.VITE_SOCKET_URL;

const ChatPage = () => {
  const dispatch = useDispatch();
  const { RoomId, Reciever } = useSelector((state) => state.Room);
  const { token, User: CurrentUser } = useSelector((state) => state.Auth);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [User2, setUser2] = useState(null);
  const socket = io(Url);

  const getReciversData = async () => {
    try {
      const data = { userid: Reciever };
      const response = await apiConnector("POST", AuthApi.getUser_api, data);
      setUser2(response.data.data);
    } catch (err) {
      console.log("Error fetching receiver data:", err);
    }
  };

  const getRoomData = async () => {
    try {
      const response = await apiConnector(
        'POST',
        RoomApi.getRoom,
        { User2: Reciever },
        { Authorization: `Bearer ${token}` }
      );
      setMessages(response.data.data.Chats); // Use raw chats with createdAt
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const msgObj = {
      roomId: RoomId,
      message,
      SenderId: CurrentUser._id,
      RecieverId: Reciever,
    };
    socket.emit("message",msgObj)
    setMessage('');
  };

  useEffect(() => {

    socket.emit('joinRoom', RoomId);

    getRoomData();
    getReciversData();

    socket.on('ReceiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      localStorage.removeItem("CurrentRoom");
      localStorage.removeItem("CurrentReciever")
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <NavLink to="/Dashboard" onClick={() => dispatch(Reset())}>
            <FaBackward />
          </NavLink>
          <div className="w-10 h-10 bg-purple-500 rounded-full overflow-hidden">
            <img src={User2?.Avatar} className="w-full h-full object-cover" alt="avatar" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{User2?.Name}</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.Sender === CurrentUser._id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.Sender === CurrentUser._id
                ? 'bg-blue-500 text-white rounded-br-sm'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs mt-1 text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            required
          />
          <button
            type="submit" onClick={handleSubmit}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
