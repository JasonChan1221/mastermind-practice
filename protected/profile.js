


document.querySelector("#uploadPic").addEventListener("submit",async(event)=>{
    event.preventDefault();
    const form = event.target;
    let formData = new FormData();

    formData.append("image",form.image.files[0]);

 const res = await fetch(`/profilePic`,{
        method:"PUT",
        body:formData
    });
    const result = await res.json(); 
    if (result.success) {
        await loadProfileInfo();
        document.querySelector("#uploadMessage").innerHTML = "Profile picture upload Success!";
    }else{
        document.querySelector("#uploadMessage").innerHTML = "Profile picture upload Fail!";
    }
})

async function deletePic()
{
    const res = await fetch(`/deletePic`,{
        method:"DELETE"
    });
    const result = await res.json();

    if(result.success)
    {
        await loadProfileInfo();
    }else{
        if (result.message){
            console.log(result.message);
        }else{
            console.log("profile delete fails");
        }
    }

}

async function deleteHistory()
{
    const res = await fetch(`/histroiesList`, {
        method: "DELETE"
    });

    const result = await res.json();
    if (result.success) {
        await loadHistoryTable();
    } else {
        if (result.message){
            console.log(result.message);
        }else{
            console.log("history delete fails");
        }
    }
}





async function loadProfileInfo(){
     const res = await fetch("/profileInfo");
 const profile = await res.json();
 pictureName = profile[0]["profile_pic"];
 profileName = profile[0]["username"];
 document.querySelector("#username").innerHTML = `${profileName}`;
 document.querySelector("#pic").src = `/uploads/${pictureName}`;
 
}


async function loadHistoryTable()
{
    const res = await fetch("/histroiesList");
    const table = await res.json();
    counter = table.length;
    
    const historyList = document.querySelector("#historyList");
    historyList.innerHTML = "";
    if(table.length > 0){
    for(let idx=0; idx<counter;idx++){
        if(table[idx].winlose == true)
        {
            winloseResult = "win";
        }else{
            winloseResult = "lose";
        }
    historyList.innerHTML +=  `<tr id ="his_${idx}">
    <td scope="row">${table[idx].Date}</td>
    <td>${winloseResult}</td>
    <td>${table[idx].round}</td>
    <td> ${table[idx].answer}</td>

  </tr>`
    }
}
}

async function cancelChange()
{
    const profilePanel = document.querySelector("#profileInfo");
    const conPasswordPanel = document.querySelector("#confirmPassword");
    const usernamePanel = document.querySelector("#updateUsername");
    const passwordPanel = document.querySelector("#updatePassword");

    document.querySelector("#password").value = "";
    document.querySelector("#newUsername").value = "";
    document.querySelector("#newPassword").value = "";
    document.querySelector("#conPassword").value = "";

    document.querySelector("#newPasswordMessage").innerHTML = "";
    document.querySelector("#confirmMessage").innerHTML = "";

    profilePanel.classList.remove("profileInfo_hide");
    profilePanel.classList.add("profileInfo_show");

    conPasswordPanel.classList.remove("confirmPassword_show");
    conPasswordPanel.classList.add("confirmPassword_hide");

    usernamePanel.classList.remove("updateUsername_show");
    usernamePanel.classList.add("updateUsername_hide");

    passwordPanel.classList.remove("updatePassword_show");
    passwordPanel.classList.add("updatePassword_hide");


}
  


async function changeUsername()
{
    const profilePanel = document.querySelector("#profileInfo");
    const conPasswordPanel = document.querySelector("#confirmPassword");

    profilePanel.classList.remove("profileInfo_show");
    profilePanel.classList.add("profileInfo_hide");

    conPasswordPanel.classList.remove("confirmPassword_hide");
    conPasswordPanel.classList.add("confirmPassword_show");



    document.querySelector("#confirmPasswordForm").addEventListener("submit",async(event)=>{
        event.preventDefault();
        const form = event.target;
        let formObject = new FormData();
    
        formObject["password"] = form.password.value;
    
     const res = await fetch(`/confirmPassword`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formObject)
        });
        const result = await res.json(); 
        if (result.success) {
            const conPasswordPanel = document.querySelector("#confirmPassword");
    const usernamePanel = document.querySelector("#updateUsername");
    const passwordPanel = document.querySelector("#updatePassword");

    passwordPanel.classList.remove("updatePassword_show");
    passwordPanel.classList.add("updatePassword_hide");
    conPasswordPanel.classList.remove("confirmPassword_show");
    conPasswordPanel.classList.add("confirmPassword_hide");
    usernamePanel.classList.remove("updateUsername_hide");
    usernamePanel.classList.add("updateUsername_show");

        }else{
            document.querySelector("#confirmMessage").innerHTML = "Wrong Password!";
          
        }
    })
    
}


document.querySelector('#updateUsernameForm').addEventListener('submit',async(event)=>{
    event.preventDefault();
    const form = event.target;

    let formObject = {};
    formObject["newUsername"] = form.newUsername.value;
   
  
        const res= await fetch("/changeUsername",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formObject)
        });
    const result = await res.json();
  
    if(result.success){
        loadProfileInfo();
        cancelChange();
    }
});


async function changePassword()
{
    const profilePanel = document.querySelector("#profileInfo");
    const conPasswordPanel = document.querySelector("#confirmPassword");

    profilePanel.classList.remove("profileInfo_show");
    profilePanel.classList.add("profileInfo_hide");

    conPasswordPanel.classList.remove("confirmPassword_hide");
    conPasswordPanel.classList.add("confirmPassword_show");



    document.querySelector("#confirmPasswordForm").addEventListener("submit",async(event)=>{
        event.preventDefault();
        const form = event.target;
        let formObject = new FormData();
    
        formObject["password"] = form.password.value;
    
     const res = await fetch(`/confirmPassword`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formObject)
        });
        const result = await res.json(); 
        if (result.success) {
            const conPasswordPanel = document.querySelector("#confirmPassword");
    const passwordPanel = document.querySelector("#updatePassword");
    const usernamePanel = document.querySelector("#updateUsername");

    usernamePanel.classList.remove("updateUsername_show");
    usernamePanel.classList.add("updateUsername_hide");
    conPasswordPanel.classList.remove("confirmPassword_show");
    conPasswordPanel.classList.add("confirmPassword_hide");
    passwordPanel.classList.remove("updatePassword_hide");
    passwordPanel.classList.add("updatePassword_show");

        }else{
            document.querySelector("#confirmMessage").innerHTML = "Worng Password!";
          
        }
    })
    
}

document.querySelector('#updatePasswordForm').addEventListener('submit',async(event)=>{
    event.preventDefault();
    const form = event.target;

    let formObject = {};
    formObject["newPassword"] = form.newPassword.value;
    formObject["conPassword"] = form.conPassword.value;
   
 
        const res= await fetch("/changePassword",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formObject)
        });
    const result = await res.json();
  
    if(result.success){
        loadProfileInfo();
        cancelChange();
    }else{
        document.querySelector("#newPasswordMessage").innerHTML = "Confirm Password is wrong!";
    }
});


loadHistoryTable();
loadProfileInfo();
