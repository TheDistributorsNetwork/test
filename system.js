/* =================================================
   MESSAGE BELIEVER'S NETWORK CALENDAR SYSTEM
   ================================================= */


/* =================================================
   CREATE DEFAULT ADMIN IF NONE EXISTS
   ================================================= */

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



/* =================================================
   LOAD CALENDAR EVENTS
   ================================================= */

function loadCalendar(){

let events = JSON.parse(localStorage.getItem("approvedEvents") || "[]")

let table = document.getElementById("calendarTable")

if(!table) return

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



/* =================================================
   SUPPORT LINKS
   ================================================= */

function openSupport(){

alert(
"Support Accounts\n\nWhatsApp\nFacebook\nTikTok"
)

}



/* =================================================
   LIVE STREAM LINKS
   ================================================= */

function openLive(){

alert(
"Live Streaming\n\nYouTube\nPodbean\nTikTok\nFacebook"
)

}



/* =================================================
   LOGIN SYSTEM
   ================================================= */

function loginUser(){

let username = document.getElementById("username").value
let password = document.getElementById("password").value

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

document.getElementById("adminPanel").style.display="block"

loadRequests()

}

else{

alert("Login successful")

}

}



/* =================================================
   CREATE USER (ADMIN ONLY)
   ================================================= */

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

alert("User created successfully")

}



/* =================================================
   LOAD EVENT REQUESTS
   ================================================= */

function loadRequests(){

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

let table = document.getElementById("requestsTable")

if(!table) return

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

btn.innerText="Approve"
btn.className="goldButton"

btn.onclick=function(){approveEvent(i)}

row.insertCell(2).appendChild(btn)

})

}



/* =================================================
   APPROVE EVENT
   ================================================= */

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



/* =================================================
   SUBMIT EVENT REQUEST
   ================================================= */

function submitRequest(){

let date = document.getElementById("date").value
let event = document.getElementById("event").value
let details = document.getElementById("details").value
let church = document.getElementById("church").value
let invite = document.getElementById("invite").value

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

requests.push({
date:date,
event:event,
details:details,
church:church,
invite:invite
})

localStorage.setItem("eventRequests", JSON.stringify(requests))

alert("Event request sent for approval")

}



/* =================================================
   PASTOR LOGIN
   ================================================= */

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

alert("You do not have permission to request events")

}

}



/* =================================================
   RUN CALENDAR LOAD
   ================================================= */

loadCalendar()
