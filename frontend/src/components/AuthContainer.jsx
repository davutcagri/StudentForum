import "../styles/authContainer.css"

function AuthContainer({
                           header,
                           googleText,
                           children,
                           submitBtnText,
                           onClickSubmit
                       }) {
    return (
        <div className="grid grid-cols-2 justify-center bg-[var(--secondary-color)] rounded-4xl w-7xl h-5xl">
            <div className="grid w-full items-center">
                <div className="p-20">
                    <h3 className="text-[var(--primary-color)] font-[600] text-[46px]">What is</h3>
                    <h2 className="text-[var(--header-color)] font-[600] text-[50px]">Student Forum?</h2>
                    <p className="text-gray-500">
                        Student Forum is a website where university students can socialize, organize events, and find answers to their questions.
                    </p>
                </div>
            </div>

            <div className="grid w-full items-center bg-[#fcfcfc] rounded-r-4xl p-10">
                <div className="grid items-center gap-3 justify-center">
                    <h2 className="font-[600] text-[32px] text-center">{header}</h2>
                    <button className="border-gray-400 border-1 rounded-4xl px-10 py-3 w-fit">{googleText}</button>
                </div>

                <div className="divider"><span className="py-[24px]">or</span></div>

                <div className="flex flex-col justify-center items-center gap-6">
                    {children}
                    <button className="text-white w-fit px-5 py-3 bg-[var(--primary-color)] rounded-2xl hover:bg-[#991b1b] hover:cursor-pointer" onClick={onClickSubmit}>{submitBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default AuthContainer;