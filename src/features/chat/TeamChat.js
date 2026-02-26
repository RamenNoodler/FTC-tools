import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Send, User, Paperclip } from 'lucide-react';

const TeamChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        const q = query(collection(db, 'team_chat'), orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });
        return unsub;
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        await addDoc(collection(db, 'team_chat'), {
            text: input,
            user: auth.currentUser?.displayName || 'Teammate',
            uid: auth.currentUser?.uid || 'guest',
            createdAt: serverTimestamp()
        });
        setInput('');
    };

    return (
        <div className="flex-1 flex flex-col h-screen bg-slate-50">
            <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Team Strategy Room</h1>
                    <div className="flex items-center gap-2 text-xs text-green-500 font-bold">
                        <span className="block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        LIVE COLLABORATION
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex ${msg.uid === 'guest' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                            msg.uid === 'guest' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                        }`}>
                            <p className="text-[10px] font-bold uppercase mb-1 opacity-70">{msg.user}</p>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <div className="p-6 bg-white border-t border-slate-200">
                <form onSubmit={sendMessage} className="flex gap-4 items-center max-w-4xl mx-auto">
                    <button type="button" className="p-2 text-slate-400 hover:text-blue-600"><Paperclip size={24}/></button>
                    <input 
                        type="text" 
                        className="flex-1 p-3 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border-none"
                        placeholder="Discuss strategy, attach logs, or ask robot questions..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeamChat;
