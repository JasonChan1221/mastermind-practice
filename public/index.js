document.querySelector("#loginForm").addEventListener("submit",async(event)=>{
    event.preventDefault();
    const form = event.target;

    const formObject = {}
    formObject["username"] = form.username.value;
    formObject["password"] = form.password.value;

    const res = await fetch("/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formObject)
    });
    const result = await res.json();
    if (result.success){
        window.location = '/game';
    }else{
        alert(`${result.message}`);
    }
});
