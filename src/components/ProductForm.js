import {useState} from 'react'

const ProductForm=()=>{
    const [title,setItemTitle]=useState("")
    const [description, setItemDescription]=useState("")
    const [price,setItemPrice]=useState("")
    const accountToken = localStorage.getItem("accountToken")
    async function createNewPost(event){
        event.preventDefault();
        try {
            const response = await fetch ('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorizaton': `Bearer ${accountToken}`
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price
                    }
                })
            });
            const result = await response.json();
            console.log(result)
            return result
        } catch (error){
        alert ("An Error Has Occured")
    }
    }

    return(
        <div>
            <form onSubmit={createNewPost}>
                <input type="text" placeholder="Item Name" value= {title} onChange={(event)=>setItemTitle(event.target.value)}/>
                <input type="text" placeholder="Item Description" value={description} onChange={(event)=>setItemDescription(event.target.value)}/>
                <input type="text" placeholder="Item Price" value={price} onChange= {(event)=>setItemPrice(event.target.value)}/>
                <button type="submit">Submit!</button>
            </form>
        </div>
    )
}
export default ProductForm