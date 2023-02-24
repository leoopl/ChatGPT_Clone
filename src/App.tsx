import { useState } from 'react';
import style from './App.module.css';
import { send } from './assets/icons';

type MessageLog = {
	user: string;
	message: string;
};

export default function App() {
	const [input, setInput] = useState<string>('');
	const [messageLog, setMessageLog] = useState<MessageLog[]>([]);

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

	return (
		<div className={style.container}>
			<section className={style.sideBar}>
				<div className={style.sideBarTopButton}>New Chat</div>
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
