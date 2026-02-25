import "../styles/input.css"

function Input({
                   name,
                   type,
                   placeholder,
                   onChange,
                   errorMessage,
               }) {


    return (
        <div className="w-full">
            <input name={name} type={type} placeholder={placeholder} onChange={onChange}/>
            <p className="errorMessage">{errorMessage}</p>
        </div>
    );
}

export default Input;