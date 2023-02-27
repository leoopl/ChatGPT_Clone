import { useState } from 'react';
import style from './App.module.css';
import { send } from './assets/icons';

type MessageLog = {
	user: string;
	message: string;
};

type Chats = {
	id: number;
	name: string;
	msg: MessageLog[];
};

export default function App() {
	const [input, setInput] = useState<string>('');
	const [messageLog, setMessageLog] = useState<MessageLog[]>([]);

	const [chatGroup, SetChatGroup] = useState<Chats[]>([]);

	// ADD A NEW MESSAGE TO SPECIFIC CHAT
	// const updateChatGroup = (chatGroup: Chats[], chatId: number, newMessage: MessageLog) => {
	// 	return chatGroup.map(chat => {
	// 		if (chat.id !== chatId) return chat;
	// 		return { ...chat, msg: [...chat.msg, newMessage] };
	// 	});
	// };

	// const handleNewMessage = () => {
	// 	let newMsg = { user: 'me', message: input };
	// 	SetChatGroup(prevChatGroup => updateChatGroup(prevChatGroup, 2, newMsg));
	// 	const answerMsg = { user: 'ChatGPT', message: 'How can I help you today?' };
	// 	SetChatGroup(prevChatGroup => updateChatGroup(prevChatGroup, 2, answerMsg));
	// 	setInput('');
	// 	console.log(chatGroup);
	// };

	const clearLog = () => {
		setMessageLog([]);
	};

	const handleInput = () => {
		let newLog = [
			...messageLog,
			{ user: 'me', message: `${input}` },
			{ user: 'ChatGPT', message: 'How can I help you today?' },
		];
		setInput('');
		setMessageLog(newLog);
	};

	const handleNewChat = () => {
		const newIndex = chatGroup.length + 1;
		let newChat = [
			...chatGroup,
			{
				id: newIndex,
				name: `Chat ${newIndex}`,
				msg: [],
			},
		];
		SetChatGroup(newChat);
	};

	return (
		<div className={style.container}>
			<section className={style.sideBar}>
				<div onClick={handleNewChat} className={style.sideBarTopButton}>
					New Chat
				</div>
				<div className={style.chatGroup}>
					{chatGroup.map(chat => (
						<div key={chat.id} className={style.sideBarChatButton}>
							{chat.name}
						</div>
					))}
				</div>
				<div>
					<hr className={style.divider} />
					<div onClick={clearLog} className={style.sideBarBottomButton}>
						Clear conversations
					</div>
					<div className={style.sideBarBottomButton}>Dark Mode</div>
					<div className={style.sideBarBottomButton}>Log out</div>
				</div>
			</section>
			<section className={style.chatBox}>
				<div className={style.messagesLog}>
					{messageLog.map((message, index) => (
						<div key={index} className={style.message}>
							<h3>{message.user}</h3>
							<p>{message.message}</p>
						</div>
					))}
				</div>
				<div className={style.inputBox}>
					<input
						disabled={chatGroup.length === -1}
						onKeyDown={e => e.key === 'Enter' && input != '' && handleInput()}
						type="text"
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<button disabled={input.length < 1} onClick={handleInput}>
						{send}
					</button>
				</div>
			</section>
		</div>
	);
}
