document.querySelector('#registerForm').addEventListener('submit',async(event)=>{
    event.preventDefault();
    const form = event.target;

    const formObject ={}
    formObject['username'] = form.username.value;
    formObject['password']=form.password.value;
    formObject['conPassword']=form.conPassword.value;
        const res=await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formObject)
        });
    const result = await res.json();
    if(result.success){
        alert(result.message);
        window.location='/';
    }else{
        alert(result.message);
    }
});