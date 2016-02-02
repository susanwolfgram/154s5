window.onload = function() {
	document.getElementById("send").onclick = sendMessage;
	checkMessages();
	setInterval(checkMessages, 5000);
};

function checkMessages() {
	var ajax = new XMLHttpRequest();
	ajax.onload = gotMessages;
	ajax.open("GET", "https://webster.cs.washington.edu/cse154/sections/9/chatit/chatit.php?reverse=false", true);
	ajax.send();
}	

function gotMessages() {
	if (this.responseText.length > 0) {
		document.getElementById("messages").innerHTML = this.responseText;
	}
}

function sendMessage() {
	var text = document.getElementById("message").value;
	if (text) {
		var params = new FormData();
		params.append("msg", text);

		var ajax = new XMLHttpRequest();
		ajax.onload = messageSent;
		ajax.open("POST", "https://webster.cs.washington.edu/cse154/sections/9/chatit/chatit.php", true);
		ajax.send(params);
	}
}

function messageSent() {
	if (this.status == 200) {
		document.getElementById("message").value = "";   // clear it out
		checkMessages();
	} else {
		alert("HTTP error " + this.status + ": " + this.statusText + "\n" + this.responseText);
	}
}