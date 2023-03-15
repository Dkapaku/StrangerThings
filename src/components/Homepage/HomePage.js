import { useEffect, useState } from "react";
import './Homepage.css'

const cohort_Name='2301-ftb-mt-web-ft';
const base_URL=`https://strangers-things.herokuapp.com/api/${cohort_Name}`


const HomePage = (props) =>{
    const [data, setData] = useState([]);

    useEffect(()=> {
      if (localStorage.getItem('accountToken')) {
        props.setLogIn(true)
      }
      else {
        props.setLogIn(false)
      }
    }, [])

    useEffect(() => {
      async function fetchData() {
        try {
          const accountToken = localStorage.getItem("accountToken");
          const response = await fetch(`${base_URL}/posts`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accountToken}`
            }
          });
          const { data } = await response.json();
          setData(data.posts);
          console.log(data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, []);
  return (
    <div>
      { props.LogIn ? <p>Welcome to Strangers Things</p> : <p>Please Login to Access Features</p>}
        <section>
          {data.length ? data.map ((post,idx) => {
            return(<p>{post.title} {post.description} {post.price}</p>
            )
          }): null}
        </section>
    </div>
  )
}

export default HomePage;