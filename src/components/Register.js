import {useState} from 'react'

const Registration = () =>{
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");
        async function registerNewAccount(event){
            event.preventDefault();
            try {
                if (newPass.length<6){
                    alert("Your Password Needs to be Longer")
                    return;
                }else if (newName.length<6){
                    alert ("Your Username Needs to be Longer")
                    return;
                }
                const response = await fetch ('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user:{
                            username: newName,
                            password: newPass
                        }
                    })
                })
                const translation= await response.json();
                console.log(translation)
                if (!translation.success){
                    alert ("Account Creation Unsuccessful")

                } else {
                    const webToken= translation.data.token
                    localStorage.setItem("accountToken",webToken)
                }
            } catch(error){
                return ("Error has Occured")
            }
        }



    return (
        <div>
            <form onSubmit={registerNewAccount}>
                <input type="text" placeholder = "Username" value = {newName} onChange={(event)=>setNewName(event.target.value)}></input>
                <input type="text" placeholder = "Password" value = {newPass} onChange={(event)=>setNewPass(event.target.value)}></input>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default Registration