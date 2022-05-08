import {useState} from 'react';
import {sendMessage,isTyping} from 'react-chat-engine';
import {SendOutlined,PictureOutlined} from'@ant-design/icons'

const MessageForm = (props) => {
    const [value, setValue] = useState('');
    const {chatId, creds} = props;

    const handleChange = e => {
        setValue(e.target.value);

        isTyping(props, chatId);
    }

    const handleUpload = e => {
        sendMessage(creds,chatId,{files: e.trget.files, text: ''})
    }

    const handleSubmit = e => {
        e.preventDefault();

        const text = value.trim();

        if(text.length > 0) sendMessage(creds,chatId,{text});

        setValue('');
    }

    return <form className="message-form" onSubmit={handleSubmit}>
        <input
            className="message-input"
            placeholder="send a message..."
            value={value}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
        <label htmlFor="upload-button">
            <span className='image-button'>
                    <PictureOutlined className='picture-icon' />
            </span>
        </label>
        <input
            type='file'
            multiple={false}
            id='upload-button'
            onChange={handleUpload}
            style={{display:'none'}}
        />
        <button type='submit' className='send-button'>
            <SendOutlined classID='send-icon'/>
        </button>
    </form>
}

export default MessageForm;