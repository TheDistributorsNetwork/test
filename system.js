/* ---------------------------------------------------
   MESSAGE BELIEVER'S NETWORK CALENDAR SYSTEM
   Shared Logic File
--------------------------------------------------- */


/* ---------------------------------------------------
   DEFAULT ADMIN CREATION
--------------------------------------------------- */

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



/* ---------------------------------------------------
   LOAD CALENDAR EVENTS
--------------------------------------------------- */

function loadCalendar(){

let events = JSON.parse(localStorage.getItem("approvedEvents") || "[]")

let table = document.getElementById("calendarTable")

if(!table) return

events.forEach(e => {

let row = table.insertRow()

let cell1 = row.insertCell(0)
let cell2 = row.insertCell(1)
let cell3 = row.insertCell(2)
let cell4 = row.insertCell(3)
let cell5 = row.insertCell(4)

cell1.innerText = e.date
cell2.innerText = e.event
cell3.innerText = e.details
cell4.innerText = e.church

let link = document.createElement("a")

link.href = e.invite
link.innerText = "View"
link.target = "_blank"

cell5.appendChild(link)

})

}



/* ---------------------------------------------------
   SUPPORT LINKS
--------------------------------------------------- */

function openSupport(){

alert(
"Support Accounts\n\n" +
"WhatsApp\n" +
"Facebook\n" +
"TikTok\n\n" +
"Links can be added later."
)

}



/* ---------------------------------------------------
   LIVE STREAM LINKS
--------------------------------------------------- */

function openLive(){

alert(
"Live Streaming Platforms\n\n" +
"YouTube\n" +
"Podbean\n" +
"TikTok\n" +
"Facebook\n\n" +
"Streaming links can be inserted here."
)

}



/* ---------------------------------------------------
   MEMBER LOGIN CHECK
--------------------------------------------------- */

function authenticateUser(username,password){

let users = JSON.parse(localStorage.getItem("users") || "[]")

return users.find(u =>
u.username === username &&
u.password === password
)

}



/* ---------------------------------------------------
   CREATE NEW USER
--------------------------------------------------- */

function createUser(username,password,role){

let users = JSON.parse(localStorage.getItem("users") || "[]")

users.push({

username:username,
password:password,
role:role

})

localStorage.setItem("users", JSON.stringify(users))

}



/* ---------------------------------------------------
   LOAD EVENT REQUESTS FOR ADMIN
--------------------------------------------------- */

function loadEventRequests(){

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

let table = document.getElementById("requestsTable")

if(!table) return

requests.forEach((r,i)=>{

let row = table.insertRow()

row.insertCell(0).innerText = r.date
row.insertCell(1).innerText = r.event

let approveButton = document.createElement("button")

approveButton.innerText = "Approve"
approveButton.className = "goldButton"

approveButton.onclick = function(){

approveEvent(i)

}

row.insertCell(2).appendChild(approveButton)

})

}



/* ---------------------------------------------------
   APPROVE EVENT REQUEST
--------------------------------------------------- */

function approveEvent(index){

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

let approved = JSON.parse(localStorage.getItem("approvedEvents") || "[]")

approved.push(requests[index])

requests.splice(index,1)

localStorage.setItem("approvedEvents", JSON.stringify(approved))
localStorage.setItem("eventRequests", JSON.stringify(requests))

alert("Event Approved")

location.reload()

}



/* ---------------------------------------------------
   SUBMIT EVENT REQUEST
--------------------------------------------------- */

function submitEventRequest(date,event,details,church,invite){

let requests = JSON.parse(localStorage.getItem("eventRequests") || "[]")

requests.push({

date:date,
event:event,
details:details,
church:church,
invite:invite

})

localStorage.setItem("eventRequests", JSON.stringify(requests))

alert("Event request submitted for admin approval.")

}



/* ---------------------------------------------------
   INITIALISE CALENDAR ON PAGE LOAD
--------------------------------------------------- */

loadCalendar()