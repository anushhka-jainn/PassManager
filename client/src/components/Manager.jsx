import React from 'react'
import { useRef, useState, useEffect } from 'react';
    

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { v4 as uuidv4 } from 'uuid';
  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site:"",username:"",password:""})
  const [passwordArray, setpasswordArray] = useState([])

const getPasswords = async () => {
  let req= await fetch(`${BASE_URL}`)
  let passwords = await req.json()
  // let passwordArray;
  console.log(passwords)
  setpasswordArray(passwords)



}


  useEffect(() => {
   getPasswords()
    // else{
    //   passwordArray=[]
    // }
  }, [])

  const copyText=(text)=>{
    // alert("copied to clipboard")
    toast('🦄Hogya Hai Bhai copy', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
    navigator.clipboard.writeText(text)
  }
  
  const showpassword = (props)=>{
    passwordRef.current.type="text"
    console.log(ref.current.src)
    if(ref.current.src.includes("icons/eye-cross.webp")){
      ref.current.src = "icons/eye.png"
      passwordRef.current.type="text" 
    }
   else{
    ref.current.src= "icons/eye-cross.webp"
    passwordRef.current.type="password"
   }
  }
  // anfn
  const savepassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      console.log(form);
  
      if (form.id) {
        // If the form has an ID, it means we are editing an existing entry
        setpasswordArray(passwordArray.map(item => item.id === form.id ? form : item));
  
        // Update the password in the database using a PUT request (or PATCH, depending on your API)
        await fetch(`${BASE_URL}`, {
          method: "PUT", // Assuming you are using PUT for updating
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      await  getPasswords()
      // console.log(object)
        toast('🦄 Password updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        // If no ID, it means we're adding a new entry
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
  
        // Save the new password to the database
        await fetch(`${BASE_URL}`, {
          method: "POST", // POST for adding new password
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, id: uuidv4() }),
        });
  
        toast('🦄 Password saved successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
  
      // Reset the form after saving
      setform({ site: "", username: "", password: "" });
    } else {
      toast('Please fill in all fields correctly!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  

  const deletepassword= async (id) => {

    console.log("Kar raha hoon delete using id",id)
    let c= confirm("Dekh le bhaii , memory weak hai teri")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id !== id))
      // // to save password 
      // localStorage.setItem("password", JSON.stringify( passwordArray.filter(item=>item.id!==id)))
      // console.log([...passwordArray, form])
      let res= await fetch(`${BASE_URL}`,{ method:"DELETE", headers:{"Content-Type":"application/json"},body: JSON.stringify({id})})
      toast('🦄ab password meri zimmedari nahi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    }
   
  }

  const editPassword= (id) => {
   
   
    toast('🦄karne lage fir ched-chad', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
    console.log("Kar raha hoon edit using id",id)
    setform({...passwordArray.filter(i =>i.id === id)[0], id: id})
    
    // setpasswordArray(passwordArray.filter(item=>item.id !== id))
   
  }

  const handleChange= (e) => {
    setform({...form,[e.target.name]:e.target.value})
  }
  

  
  return (
    <>
{/* <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition=" Bounce"
/> */}

{/* Same as */}
<ToastContainer />


    <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

<div className="p-2 p md:mycontainer min-h-[81vh] ">
<h1 className='text-4xl font-bold text-center'>
<span className='text-green-700'> &lt; </span>
<span>Pass</span>
  <span className='text-green-700'>OP/&gt; </span>
</h1>
<p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>
                                                                      
<div className=" flex flex-col p-4 text-black gap-8 items-center">
<input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="site" id="site" />
<div className="flex flex-col md:flex-row w-full justify-between gap-8">
<input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name="username" id="username" />
<div className="relative">
                                                                   
<input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-50 p-4 py-1 ' type="password" name="password" id="password" />
{/* <span className='absolute right-0'>show</span> */}
<span className='absolute right-0 p-4 py-0 cursor-pointer' onClick={showpassword}>
{/* <  svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#94c0eb" fill="none">
    <path d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z" stroke="currentColor" stroke-width="1.5" />
    <path d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z" stroke="currentColor" stroke-width="1.5" />
</svg> */}
<img ref={ref} className='p-1' width={32} src="icons/eye.png" alt="eye"  />
</span>
</div>
</div>
<button onClick={savepassword} className='flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit border-1 border-green-900'>
<lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover">
</lord-icon>
Save Password</button>
</div>
<div className="passwords">
  <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
  {passwordArray.length===0 && <div>No passwords to show</div>}
  {passwordArray.length!=0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
  <thead className='bg-green-800 text-white'>
    <tr>
      <th className='py-2'>Site</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-green-100'>
    {passwordArray.map((item,index)=>{
     return  <tr key={index}>
      <td className="py-2 border border-white text-center min-w-32 ">
        <div className='flex items-center justify-center'>
        <a href={item.site} target='_blank'>
        
          {item.site}</a>
      <img className='lordiconcopy  cursor-pointer px-2'  onClick={()=>{copyText(item.site)}} src="https://cdn.hugeicons.com/icons/copy-01-stroke-rounded.svg" alt="copy-01" width="34" height="24" />
      </div>
      </td>
      <td className="py-2 border border-white text-center min-w-32 ">
      <div className='flex items-center justify-center'>
        {item.username}
      <img className='lordiconcopy cursor-pointer px-2 'onClick={()=>{copyText(item.username)}} src="https://cdn.hugeicons.com/icons/copy-01-stroke-rounded.svg" alt="copy-01" width="34" height="24" />
      </div>
      </td>
      <td className="py-2 border border-white text-center min-w-32 ">
      <div className='flex items-center justify-center'>
        {"*".repeat(item.password.length)}
      <img className='lordiconcopy  cursor-pointer px-2 'onClick={()=>{copyText(item.password)}} src="https://cdn.hugeicons.com/icons/copy-01-stroke-rounded.svg" alt="copy-01" width="34" height="24" />
      </div>
      </td>
      <td className="py-2 border border-white text-center min-w-32 ">
      {/* <span className='cursor-pointer'>
     
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 32 32">
<path d="M 23.900391 3.9726562 C 22.853426 3.9726562 21.805365 4.3801809 20.992188 5.1933594 L 5.1796875 21.007812 L 3.7246094 28.275391 L 10.992188 26.820312 L 11.207031 26.607422 L 26.806641 11.007812 C 28.432998 9.381456 28.432998 6.8197164 26.806641 5.1933594 C 25.993462 4.3801809 24.947355 3.9726563 23.900391 3.9726562 z M 23.900391 5.8769531 C 24.403426 5.8769531 24.905757 6.1206004 25.392578 6.6074219 C 26.366221 7.5810649 26.366221 8.620107 25.392578 9.59375 L 24.699219 10.285156 L 21.714844 7.3007812 L 22.40625 6.6074219 C 22.893072 6.1206004 23.397355 5.8769531 23.900391 5.8769531 z M 20.300781 8.7148438 L 23.285156 11.699219 L 11.175781 23.810547 C 10.519916 22.5187 9.4812999 21.480084 8.1894531 20.824219 L 20.300781 8.7148438 z M 6.9042969 22.576172 C 8.0686534 23.064699 8.9374718 23.931222 9.4257812 25.095703 L 6.2753906 25.726562 L 6.9042969 22.576172 z"></path>
</svg>
</span> */}
 <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}><lord-icon
    src="https://cdn.lordicon.com/gwlusjdu.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>
      <span className='cursor-pointer mx-1' onClick={()=>{deletepassword(item.id)}}><lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>
      </td>
    </tr>
})}
  </tbody>
</table>}
</div>
</div>

    </>
  )
}

export default Manager