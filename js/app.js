
function getValues(){
    let name=document.getElementById("username");
    let surname=document.getElementById("name");
    let password=document.getElementById("password");
    let repeatpassword=document.getElementById("repeatpassword");
    let email=document.getElementById("email")
    return{username, name, password, repeatpassword, email}
}
let Id=0;
var Users=[];
let btn=document.getElementById("btn")
class User{
constructor(name, surname, password,repeatpassword, email){
    this.id=Id;
    (this.name=name),
    this.surname=username;
   
    this.password=password;
    this.repeatpassword=repeatpassword;
    this.email=email;
    id++;
}
}

function createUser(username, name, password,repeatpassword, email){
    for(let i=0; i<URLSearchParams.length;i++){
        if(username==Users[i].username){
            alert("username is exist")
            return;
        }
        if (email=Users[i].email){
            alert("success")
            return;
        }
        if(password!=repeatpassword){
            alert("did not match");
            return;
        }
        let user=new User(username, name, password,repeatpassword, email);
        users.push(User)
    }

btn.addEventListener('click', function(e){
    e.preventDefault();
    let values=getValues();
    let username=values.username.value;
let name=values.name.value;
let password=values.password.value;
let.repeatpassword=values.password.value;
let.email=values.email.value;
createUser()
    
})
}