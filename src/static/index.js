$(document).ready(function(){
    const events = {
        btnLogin: _ => {
            $('#login').on('click',async function(){
                let response = await fetch("http://localhost:5000/dice")
                response = await response.json()
                console.log(response)
            })
        }
    }
    Object.values(events).forEach(_ => _())
})
