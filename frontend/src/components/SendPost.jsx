import "../styles/sendPost.css"
import {useState} from "react";
import Input from "./Input.jsx";
import {sendPost} from "../apiCalls.js";
import {redirect} from "react-router-dom";

function SendPost() {

    const [form, setForm] = useState({
        title: null,
        content: null,
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const onClickSend = async  () => {
        const {title, content} = form;
        const body = {
            title,
            content,
        }

        try {
            await sendPost(body);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="grid grid-rows-[auto, auto] bg-gray-100 rounded-2xl p-5 gap-2">
            <h1 className="text-left text-xl">Send Post</h1>
            <Input name="title" type="text" placeholder="Title" onChange={onChange} />
            <textarea name="content" className="bg-white rounded-2xl p-5 resize-none" onChange={onChange} />
            <button className="text-white w-fit px-5 py-3 bg-[var(--primary-color)] rounded-2xl hover:bg-[#991b1b] hover:cursor-pointer" onClick={onClickSend}>Send</button>
        </div>
    );
}

export default SendPost;