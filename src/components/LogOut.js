const LogOutButton =()=>{
    async function LogOut(){
        localStorage.removeItem('accountToken')
    }





return (
    <div>
        <form onSubmit={LogOut}>
        <button type="submit">LogOut</button>
        </form>
    </div>
)
}

export default LogOutButton