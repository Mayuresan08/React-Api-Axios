import { useState,useEffect } from "react";
import axios from "axios";

function Apiaxios()
{
const URL="https://jsonplaceholder.typicode.com/posts"

const [data,setData]= useState([])
const [userId,setId]= useState(0)
const [title,setTitle]= useState("")
const [body,setBody]= useState("")
const [postId,setPostId]= useState("")


useEffect(()=>{
    console.log("in useEffect mount")
    getPost();
},[])

//get Method
const getPost=async()=>{
console.log("in")
try{
const response= await axios.get(URL)
console.log(response.data)
setData(response.data)
}
catch(error){
console.log("error in fetching date",{error})
}
}
//delete method
const deletePost=async(id)=>{
console.log(id)
try{
 const a=await axios.delete(`${URL}/${id}`);
 console.log(a)
 let postData=[...data]
postData=postData.filter((a)=> a.id !== id)
setData(postData)
}
catch(error)
{
    console.log("error in deleting",error)
}
}
//Post-Method
const sendPost =async()=>{
    try
        {
          let response=  await axios.post(URL,{
                userId:userId,
                title:title,
                body:body
            })
            console.log(response.data)
            let newData=[...data];
            newData.push(response.data)
            console.log(newData)
             setData(newData)
             setId(0)
            setTitle("")
            setBody("")
        }
        catch(error)
        {
            console.log(error)
        }
}

//edit-post
let editPost=async(postid)=>{
    console.log(body)
try{
    let updated=await axios.get((`${URL}/${postid}`),{
        userId:userId,
                title:title,
                body:body
    })
    let newData=[...data]
    let index= newData.findIndex((data)=> data.id === postid)
    console.log(updated)
    // newData[index]=updated.data
    //the below method only works for fake api
    newData[index]={
        userId:userId,
        id:postid,
        title:title,
        body:body
    }
    console.log(newData[index])
    setData(newData)
             setId(0)
            setTitle("")
            setBody("")
}
catch(error)
{
    console.log(error)
}
}

const handleChange=({target:{name,value}})=>{
 if(name ==="userId") setId(value)
 if(name ==="title")  setTitle(value)
 if(name ==="body") setBody(value)
}
const handleSubmit=(event)=>{
   event.preventDefault();
   if(postId) editPost(postId)
   else sendPost()
}
const copyForm=(id)=>{
let newPost=data.filter((a)=>{
    return a.id === id
})
console.log(newPost[0].id)
setId(newPost[0].userId)
setTitle(newPost[0].title)
setBody(newPost[0].body)
setPostId(newPost[0].id)
}
return(
    <div>
    <form onSubmit={handleSubmit}> 
        <div>
            <label>User ID </label>
            <input type="number" name="userId" value={userId} onChange={(event)=>handleChange((event))}/>
        </div><br/>
        <div>
            <label>Title </label>
            <input type="text"
            name="title"
            value={title}
            onChange={(event)=>handleChange(event)}/>
        </div><br/>
        <div>
            <label>Body </label>
            <textarea rows="10" name="body" value={body}
             onChange={(event)=>handleChange(event)}></textarea>
        </div><br/>
        <div>
            <button type="submit">submit</button>
        </div>
    </form>
        <table>
        <tr>
            <th>Post Id</th>
            <th>Title</th>
            <th>Body</th>
        </tr>
    
    {data.map((a)=>{
        return(
            <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title}</td>
                <td>{a.body}</td>
                <button onClick={()=>{copyForm(a.id)}}>Edit</button>
                <button onClick={()=>{deletePost(a.id)}}>delete</button>
            </tr>
        )
    })}
    </table>
    </div>
)

}

export default Apiaxios