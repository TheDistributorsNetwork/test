/* ===============================================
   MESSAGE BELIEVER'S NETWORK CALENDAR SYSTEM
   GitHub Compatible Version
=============================================== */


/* ===============================================
   DEFAULT ADMIN
=============================================== */

function initialiseSystem(){

let users = JSON.parse(localStorage.getItem("users") || "[]")

if(users.length === 0){

users.push({
username:"admin",
password:"admin123",
role:"admin"
})

localStorage.setItem("users", JSON.stringify(users))

}

}

initialiseSystem()



/* ===============================================
   LOAD CALENDAR EVENTS
=============================================== */

function loadCalendar(){

let table = document.getElementById("calendarTable")
if(!table) return

let events = JSON.parse(localStorage.getItem("approvedEvents") || "[]")

events.forEach(e=>{

let row = table.insertRow()

row.insertCell(0).innerText = e.date
row.insertCell(1).innerText = e.event
row.insertCell(2).innerText = e.details
row.insertCell(3).innerText = e.church

let link = document.createElement("a")
link.href = e.invite
link.innerText = "View"
link.target = "_blank"

row.insertCell(4).appendChild(link)

})

}



/* ===============================================
   MEMBER LOGIN
=============================================== */

function loginUser(){

let usernameField = document.getElementById("username")
let passwordField = document.getElementById("password")

if(!usernameField || !passwordField) return

let username = usernameField.value
let password = passwordField.value

let users = JSON.parse(localStorage.getItem("users") || "[]")

let user = users.find(u =>
u.username === username &&
u.password === password
)

if(!user){

alert("Invalid login details")
return

}

if(user.role === "admin"){

let panel = document.getElementById("adminPanel")

if(panel) panel.style.display="block"

loadRequests()

}else{

alert("Login successful")

}

}



/* ===============================================
   CREATE USER
=============================================== */

function createUser(){

let username = document.getElementById("newUser").value
let password = document.getElementById("newPass").value
let role = document.getElementById("role").value

let users = JSON.parse(localStorage.getItem("users") || "[]")

users.push({
username:username,
password:password,
role:role
})

localStorage.setItem("users", JSON.stringify(users))

alert("User created")

}



/* ===============================================
   PASTOR LOGIN
=============================================== */

function pastorLogin(){

let username = document.getElementById("user").value
let password = document.getElementById("pass").value

let users = JSON.parse(localStorage.getItem("users") || "[]")

let user = users.find(u =>
u.username === username &&
u.password === password
)

if(!user){

alert("Invalid login")
return

}

if(user.role === "pastor" || user.role === "admin"){

document.getElementById("eventForm").style.display="block"

}else{

alert("You do not have permission")

}

}



/* ===============================================
   SUBMIT EVENT REQUEST
=============================================== */

function submitRequest(){

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

let newRequest = {

date:document.getElementById("date").value,
event:document.getElementById("event").value,
details:document.getElementById("details").value,
church:document.getElementById("church").value,
invite:document.getElementById("invite").value

}

requests.push(newRequest)

localStorage.setItem("eventRequests", JSON.stringify(requests))

alert("Request submitted")

}



/* ===============================================
   LOAD EVENT REQUESTS
=============================================== */

function loadRequests(){

let table = document.getElementById("requestsTable")
if(!table) return

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

table.innerHTML = `
<tr>
<th>Date</th>
<th>Event</th>
<th>Approve</th>
</tr>
`

requests.forEach((r,i)=>{

let row = table.insertRow()

row.insertCell(0).innerText = r.date
row.insertCell(1).innerText = r.event

let btn = document.createElement("button")
btn.innerText = "Approve"
btn.className = "goldButton"

btn.onclick = function(){ approveEvent(i) }

row.insertCell(2).appendChild(btn)

})

}



/* ===============================================
   APPROVE EVENT
=============================================== */

function approveEvent(index){

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")
let events = JSON.parse(localStorage.getItem("approvedEvents") || "[]")

events.push(requests[index])

requests.splice(index,1)

localStorage.setItem("approvedEvents", JSON.stringify(events))
localStorage.setItem("eventRequests", JSON.stringify(requests))

alert("Event Approved")

location.reload()

}



/* ===============================================
   DROPDOWN MENUS
=============================================== */

function toggleSupport(){

let menu = document.getElementById("supportMenu")

if(menu.style.display === "block"){
menu.style.display = "none"
}else{
menu.style.display = "block"
}

}

function toggleLive(){

let menu = document.getElementById("liveMenu")

if(menu.style.display === "block"){
menu.style.display = "none"
}else{
menu.style.display = "block"
}

}



/* ===============================================
   PAGE LOAD
=============================================== */

document.addEventListener("DOMContentLoaded", function(){

loadCalendar()

})
