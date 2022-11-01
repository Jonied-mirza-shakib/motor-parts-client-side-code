import { useEffect, useState } from "react"

const useToken=user=>{
    const [token,setToken]=useState('');
    useEffect(()=>{
        const email = user?.user?.email;
        const currentUser={email:email};
        if(email){
            fetch(`https://motor-parts-server-side-code-production.up.railway.app/user/${email}`, {
  method: 'PUT', // or 'PUT'
  headers: {
    'content-type':'application/json'
  },
  body: JSON.stringify(currentUser),
})
.then(res => res.json())
.then(data => {
  console.log('Success:', data);
  const accessToken=data.token;
  localStorage.setItem('accessToken',accessToken)
  setToken(accessToken)
})
        }
    },[user])
    return [token]
}
export default useToken;