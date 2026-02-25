import {useState} from "react";
import {register, login} from "../apiCalls.js";
import AuthContainer from "../components/AuthContainer.jsx";
import Input from "../components/Input.jsx";
import {Navigate} from "react-router-dom";

function Register() {

    const [form, setForm] = useState({
        name: null,
        surname: null,
        username: null,
        email: null,
        password: null,
    });
    const [errors, setErrors] = useState({
        nameError: null,
        usernameError: null,
        emailError: null,
        passwordError: null,
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setErrors({...errors, [name + "Error"]: null})
        setForm({...form, [name]: value});
    }

    const onClickRegister = async (e) => {
        e.preventDefault();
        const {name, surname, username, email, password} = form;
        const body = {
            name,
            surname,
            username,
            email,
            password
        };

        try {
            await register(body);
            await login(body);
            window.location.reload();
        } catch (e) {
            setErrors({...errors, ...e.response.data})
        }
    }

    return (

        <AuthContainer header="Create an account!" googleText="Create account with Google!" submitBtnText="Register" onClickSubmit={onClickRegister}>
            <Input name="name" type="text" placeholder="Name" onChange={onChange} errorMessage={errors.nameError}/>
            <Input name="surname" type="text" placeholder="Surname" onChange={onChange}/>
            <Input name="email" type="email" placeholder="Email" onChange={onChange} errorMessage={errors.emailError}/>
            <Input name="username" type="username" placeholder="Username" onChange={onChange} errorMessage={errors.usernameError}/>
            <Input name="password" type="password" placeholder="Password" onChange={onChange} errorMessage={errors.passwordError}/>
            <p className="text-center text-gray-500">Already have an account? <a className="text-blue-700" href="/login">Login</a></p>
        </AuthContainer>
    )
}

export default Register;