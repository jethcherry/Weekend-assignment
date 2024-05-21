document.getElementById('form').addEventListener('submit',function(redirect)
{
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if(username.trim()=== "" || password.trim==="")
        {
            alert("The Password and Username cannot be empty")
            return
        }

        fetch('/signup',{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({username,password})

        })
        .then(reply => 
        {
            if(reply.ok) 
                {return window.location.href ="signup.html"}
            if(reply.status===401) 
                {alert("Invalid Username or Password. Please try again.")}
            else
            {alert("Error occured") }

        })
        .catch(() => alert("An error Occured,Try again"))
    
})