/*=========================================================
        AI NETWORK TRAFFIC ANALYZER
        main.js (PART 1)
=========================================================*/

// -------------------- Dummy Packet Database --------------------

const packetInfo = {

DNS:{
icon:"🌍",
layer:"Application Layer",
risk:"🟢 Low",
confidence:"99%",
purpose:"Converts website names into IP addresses.",
recommendation:"Normal DNS traffic detected."
},

HTTPS:{
icon:"🔒",
layer:"Application Layer",
risk:"🟢 Safe",
confidence:"99%",
purpose:"Encrypted communication between browser and website.",
recommendation:"Connection is secure."
},

TCP:{
icon:"📦",
layer:"Transport Layer",
risk:"🟢 Safe",
confidence:"98%",
purpose:"Reliable communication with acknowledgement.",
recommendation:"Reliable traffic."
},

UDP:{
icon:"⚡",
layer:"Transport Layer",
risk:"🟡 Medium",
confidence:"95%",
purpose:"Fast communication without delivery guarantee.",
recommendation:"Common in gaming & streaming."
},

ICMP:{
icon:"📡",
layer:"Network Layer",
risk:"🟢 Low",
confidence:"98%",
purpose:"Ping and diagnostics.",
recommendation:"Normal network testing."
},

ARP:{
icon:"💻",
layer:"Data Link Layer",
risk:"🟢 Low",
confidence:"97%",
purpose:"Finds MAC Address of another device.",
recommendation:"Local network communication."
}

};

// -------------------- Explain Button --------------------

document.addEventListener("click",function(e){

if(!e.target.classList.contains("explain-btn")) return;

let protocol=e.target.dataset.protocol;

let p=packetInfo[protocol];

document.querySelector(".protocol-icon").innerHTML=p.icon;

document.getElementById("aiProtocol").innerHTML=protocol;

document.getElementById("aiLayer").innerHTML=p.layer;

document.getElementById("aiRisk").innerHTML=p.risk;

document.getElementById("aiConfidence").innerHTML=p.confidence;

document.getElementById("packetExplanation").innerHTML=`

<h3>${protocol} Packet</h3>

<p style="margin-top:15px">

${p.purpose}

</p>

<br>

<b>Recommendation</b>

<p>

${p.recommendation}

</p>

`;

});

// -------------------- Live Activity --------------------

const activityData=[

"🟢 HTTPS Connection Established",

"🟢 DNS Lookup Successful",

"🟡 UDP Packet Received",

"🟢 TCP Handshake Completed",

"🟢 ICMP Echo Reply",

"🟢 Browser requested google.com",

"🟡 ARP Broadcast",

"🟢 Secure TLS Handshake"

];

function addActivity(){

let container=document.getElementById("activity-list");

if(!container) return;

let div=document.createElement("div");

div.className="activity-item";

div.innerHTML=activityData[Math.floor(Math.random()*activityData.length)];

container.prepend(div);

if(container.children.length>6){

container.removeChild(container.lastChild);

}

}

setInterval(addActivity,2500);


// -------------------- Animated Counters --------------------

setInterval(()=>{

let packet=document.getElementById("totalPackets");

if(packet){

packet.innerHTML=parseInt(packet.innerHTML)+Math.floor(Math.random()*15);

}

let device=document.getElementById("activeDevices");

if(device){

device.innerHTML=Math.floor(Math.random()*4)+7;

}

let connection=document.getElementById("connections");

if(connection){

connection.innerHTML=Math.floor(Math.random()*15)+28;

}

},3000);


// -------------------- Live Packet Generator --------------------

const protocols=["DNS","HTTPS","TCP","UDP","ARP","ICMP"];

const ips=[

"8.8.8.8",

"1.1.1.1",

"192.168.18.1",

"142.250.190.78",

"172.217.16.14"

];

function randomTime(){

let d=new Date();

return d.toLocaleTimeString();

}

function createPacket(){

let table=document.getElementById("packetTable");

if(!table) return;

let protocol=protocols[Math.floor(Math.random()*protocols.length)];

let row=document.createElement("tr");

row.innerHTML=`

<td>${randomTime()}</td>

<td>

<span class="protocol ${protocol.toLowerCase()}">

${protocol}

</span>

</td>

<td>

192.168.18.${Math.floor(Math.random()*20)+2}

</td>

<td>

${ips[Math.floor(Math.random()*ips.length)]}

</td>

<td>

<span class="safe">

Safe

</span>

</td>

<td>

<button

class="explain-btn"

data-protocol="${protocol}">

Explain

</button>

</td>

`;

table.prepend(row);

if(table.rows.length>10){

table.deleteRow(10);

}

}

setInterval(createPacket,3000);

/*=========================================================
        AI NETWORK TRAFFIC ANALYZER
        main.js (PART 2)
=========================================================*/


// ======================
// Chart.js
// ======================

const trafficCtx=document.getElementById("trafficChart");

if(trafficCtx){

new Chart(trafficCtx,{

type:"line",

data:{

labels:["1","2","3","4","5","6","7"],

datasets:[{

label:"Packets",

data:[120,190,160,240,210,300,260],

borderColor:"#3b82f6",

backgroundColor:"rgba(59,130,246,.15)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"white"

}

}

},

scales:{

x:{

ticks:{color:"white"}

},

y:{

ticks:{color:"white"}

}

}

}

});

}



const protocolCtx=document.getElementById("protocolChart");

if(protocolCtx){

new Chart(protocolCtx,{

type:"doughnut",

data:{

labels:[

"HTTPS",

"DNS",

"TCP",

"UDP",

"ICMP"

],

datasets:[{

data:[45,18,20,10,7],

backgroundColor:[

"#22c55e",

"#3b82f6",

"#06b6d4",

"#f59e0b",

"#8b5cf6"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"white"

}

}

}

}

});

}


// ======================
// Dark Mode
// ======================

const themeBtn=document.getElementById("theme-toggle");

if(themeBtn){

themeBtn.onclick=function(){

document.body.classList.toggle("light-mode");

};

}


// ======================
// Export Report
// ======================

function exportReport(){

let report=`

AI NETWORK TRAFFIC ANALYZER

----------------------------

Total Packets :

${document.getElementById("totalPackets").innerHTML}

Network Health :

98%

Threats :

${document.getElementById("threatCounter").innerHTML}

Generated :

${new Date().toLocaleString()}

`;

let blob=new Blob([report],{

type:"text/plain"

});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="Network_Report.txt";

a.click();

}


// ======================
// Notification
// ======================

function notify(text){

let box=document.createElement("div");

box.innerHTML=text;

box.style.position="fixed";

box.style.top="20px";

box.style.right="20px";

box.style.background="#2563eb";

box.style.color="white";

box.style.padding="15px 22px";

box.style.borderRadius="12px";

box.style.zIndex="99999";

box.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";

document.body.appendChild(box);

setTimeout(()=>{

box.remove();

},3000);

}


setTimeout(()=>{

notify("🤖 AI Engine Initialized");

},1500);


setTimeout(()=>{

notify("📡 Live Packet Capture Started");

},4500);


setTimeout(()=>{

notify("🛡 Network Health : Excellent");

},7500);


// ======================
// Demo Mode
// ======================

setInterval(()=>{

let threat=document.getElementById("threatCounter");

let threat2=document.getElementById("threatCounter2");

let value=Math.floor(Math.random()*2);

if(threat) threat.innerHTML=value;

if(threat2) threat2.innerHTML=value;

},8000);


// ======================
// Fake AI Messages
// ======================

const aiMessages=[

"AI analyzed DNS packet successfully.",

"HTTPS traffic appears encrypted.",

"No malicious activity detected.",

"ARP communication is normal.",

"Network performance is excellent.",

"Packet loss : 0%",

"Latency within acceptable range.",

"Traffic classified as Safe."

];

setInterval(()=>{

notify("🤖 "+aiMessages[Math.floor(Math.random()*aiMessages.length)]);

},12000);


// ======================
// Dashboard Loaded
// ======================

window.onload=function(){

notify("✅ AI Network Traffic Analyzer Ready");

};