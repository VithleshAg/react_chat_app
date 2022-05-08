import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";


const ChatFeed = (props) => {
    console.log(props);
    const {chats, activeChat, userName, messsages} = props

    const chat = chats && chat[activeChat];
    console.log(chat,userName,messsages)

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person,index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className='read-receipt'
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${message?.sender?.avatar})`
                }}
            />
        ))
    }

    const renderMessages = () => {
        const keys = Object.keys(messsages);
        console.log(keys);

        return keys.map((key,index) => {
            const message = messsages[key];
            const lastMessageKey = index===0 ? null : keys[index-1]; 
            const isMyMessage = message.sender.username === userName;

            return (
                <div key={`message_${index}`} style={{width:'100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage ?  <MyMessage message={message}/> : <TheirMessage message={message} lastMessage={messsages[lastMessageKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if(!chat) return 'Loading...';

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">{chat.people.map(person => ` ${person.person.username}`)}</div>
            </div>
            {renderMessages()}
            <div style={{height:'100px'}}/>
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    )}

export default ChatFeed;