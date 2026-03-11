document.addEventListener("DOMContentLoaded", function(){

/* ---------------- DEFAULT ADMIN ---------------- */

let users = JSON.parse(localStorage.getItem("users") || "[]")

if(users.length === 0){

users.push({
username:"admin",
password:"admin123",
role:"admin"
})

localStorage.setItem("users", JSON.stringify(users))

}

/* ---------------- NAVIGATION ---------------- */

const calendarSection = document.getElementById("calendarSection")
const membersSection = document.getElementById("membersSection")
const requestSection = document.getElementById("requestSection")

document.getElementById("btnCalendar").addEventListener("click", ()=>{

calendarSection.classList.remove("hidden")
membersSection.classList.add("hidden")
requestSection.classList.add("hidden")

})

document.getElementById("btnMembers").addEventListener("click", ()=>{

calendarSection.classList.add("hidden")
membersSection.classList.remove("hidden")
requestSection.classList.add("hidden")

})

document.getElementById("btnRequest").addEventListener("click", ()=>{

calendarSection.classList.add("hidden")
membersSection.classList.add("hidden")
requestSection.classList.remove("hidden")

})

/* ---------------- MEMBER LOGIN ---------------- */

document.getElementById("loginBtn").addEventListener("click", ()=>{

let username=document.getElementById("username").value
let password=document.getElementById("password").value

let users = JSON.parse(localStorage.getItem("users") || "[]")

let user = users.find(u=>u.username===username && u.password===password)

if(!user){

alert("Invalid login")
return

}

if(user.role==="admin"){

document.getElementById("adminPanel").classList.remove("hidden")

}

})

/* ---------------- CREATE USER ---------------- */

document.getElementById("createUserBtn").addEventListener("click", ()=>{

let username=document.getElementById("newUser").value
let password=document.getElementById("newPass").value
let role=document.getElementById("role").value

let users = JSON.parse(localStorage.getItem("users") || "[]")

users.push({
username:username,
password:password,
role:role
})

localStorage.setItem("users", JSON.stringify(users))

alert("User Created")

})

/* ---------------- PASTOR LOGIN ---------------- */

document.getElementById("pastorLoginBtn").addEventListener("click", ()=>{

let username=document.getElementById("pUser").value
let password=document.getElementById("pPass").value

let users = JSON.parse(localStorage.getItem("users") || "[]")

let user = users.find(u=>u.username===username && u.password===password)

if(!user){

alert("Invalid login")
return

}

if(user.role==="pastor" || user.role==="admin"){

document.getElementById("requestForm").classList.remove("hidden")

}

})

/* ---------------- EVENT REQUEST ---------------- */

document.getElementById("submitEventBtn").addEventListener("click", ()=>{

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

requests.push({

date:document.getElementById("date").value,
event:document.getElementById("event").value,
details:document.getElementById("details").value,
church:document.getElementById("church").value,
invite:document.getElementById("invite").value

})

localStorage.setItem("eventRequests", JSON.stringify(requests))

alert("Event request submitted")

})

})
