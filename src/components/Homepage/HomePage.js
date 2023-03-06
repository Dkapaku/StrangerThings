import {useEffect,useState} from "react";
import './Homepage.css'
const cohort_Name='2301-ftb-web-mt';
const base_URL=`https://strangers-things.herokuapp.com/api/${cohort_Name}`
const HomePage = (props) =>{
    const [data, setData] = useState([]);
    useEffect(()=> {
      if (localStorage.getItem('accountToken')) {
        fetchData
        props.setLogIn(true)
      }
      else {
        props.setLogIn(false)
      }
    })
    async function fetchData() {
      try{
          const giveData = await fetch (`${base_URL}/posts`);
          const newData = await giveData.json();
          console.log(newData);
          const finalData = newData.data.posts;
          setData(finalData);

      } catch (error) {
          console.log (error)
      }
    }
    useEffect(() => {
      try {fetchData()}
      catch (error) {
        console.log(error);
      }
    }, [])
  return (
    <div>
      { props.LogIn ? <p>Welcome to Strangers Things</p> : <p>Please Login to Access Features</p>}
        <section>
          {data.length ? data.map ((post,idx) => {
            return(<p>{post.title} {post.description}{post.price}</p>
            )
          }): null}
        </section>
    </div>
  )
  }

  export default HomePage