import AuthContainer from "../components/AuthContainer.jsx";
import {useState} from "react";
import {login} from "../apiCalls.js";
import Input from "../components/Input.jsx";

function Login() {
    const [form, setForm] = useState({
        username: null,
        password: null
    })
    const [errors, setErrors] = useState({
        usernameError: null,
        passwordError: null
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm({...errors, [name + "Error"]: value})
        setForm({...form, [name]: value});
    }

    const onClickLogin = async (e) => {
        e.preventDefault();
        const {username, password} = form;
        const body = {
            username,
            password
        };

        try {
            await login(body);
            window.location.reload();
        } catch (e) {
            setErrors({...errors, ...e.response.data})
        }
    }

    return (
        <AuthContainer header="Login" googleText="Login with Google!" submitBtnText="Login" onClickSubmit={onClickLogin}>
            <Input name="username" type="username" placeholder="Username" onChange={onChange} errorMessage={errors.usernameError}/>
            <Input name="password" type="password" placeholder="Password" onChange={onChange} errorMessage={errors.passwordError}/>
            <a className="text-blue-700" href="/forgot-password">Forgot password? </a>
            <a className="text-gray-500" href="/register">Create new account</a>
        </AuthContainer>
    );
}

export default Login;