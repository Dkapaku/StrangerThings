import {useState} from 'react'

const Login =() => {
    const [Name, LoginUser] = useState("");
    const [Pass, LoginPass] = useState("");
        async function loginAccount(event){
            event.preventDefault();
            try {
                const response = await fetch ('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user:{
                            username: Name,
                            password: Pass
                        }
                    })
                })
                const translation= await response.json();
                console.log(translation)
                if (!translation.success){
                    alert ("Account Login Unsuccessful")

                } else {
                    alert ("Login Successful")  
                    let recievedToken= translation.data.token
                    localStorage.setItem("accountToken", recievedToken)
                }
            } catch(error){
                alert ("Error has Occured")
            }
        }





    return (
    <div>
        <form onSubmit={loginAccount}>
            <input type="text" placeholder = "Username" value = {Name} onChange={(event)=>LoginUser(event.target.value)}></input>
            <input type="text" placeholder = "Password" value = {Pass} onChange={(event)=>LoginPass(event.target.value)}></input>
            <button type="submit">Login</button>
        </form>
        

    </div>)
}
export default Login