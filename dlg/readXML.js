// File: readXML.js

// Start function when DOM has completely loaded 
$(document).ready(function(){ 

	// Open the xml file
	$.get("session.xml",{},function(xml){
      	
	    dlgHTML = getDlgTurns(xml);
	    $("#DialogueArea").append(dlgHTML);

	    infoHTMLTable = getDlgInfo(xml);
	    $("#InfoArea").append(infoHTMLTable);

	});
});
 

function getDlgTurns(xml) {

   dlgHTML = '<h1>Dialogue Turns</h1>';


    // Read the dialogue information in
    $('turn',xml).each(function(i) {
	tNum = $(this).attr("turnnum");
	dlgHTML += '<h3>Turn ' + tNum + '</h3>'
	sysTStartTime = $(this).find("systurn").attr("starttime");
	sysDAct = $(this).find("systurn").find("dact").text();
	prompt = $(this).find("systurn").find("prompt").text();
	dlgHTML += '<p>System: ' + '(' + sysTStartTime + ')<br>' + sysDAct + '<br>' + prompt;

	userTStartTime = $(this).find("userturn").find("rec").attr("starttime");
	userTEndTime = $(this).find("userturn").find("rec").attr("starttime");
	dlgHTML += '<p>User: ' + '(' + userTStartTime + ',' + userTEndTime + ')'
	
	dlgHTML += '<table>'
	$(this).find("userturn").find("asr").find("asrhyp").each(function(i) {
	    asrLL = $(this).attr("prob");
	    asrHyp = $(this).text();
	    dlgHTML += '<tr><td>' + asrHyp + '</td><td>(' + Math.exp(asrLL).toPrecision(3) + ')</td></tr>';
	});
	dlgHTML += '</table>'

    });

    return dlgHTML;
}
 
function getDlgInfo(xml) {
    // Build an HTML string
    infoHTMLTable = '<h1>Dialogue Information</h1>';
    infoHTMLTable += '<table>';
	  	
    // Read the dialogue information in
    $('dialog',xml).each(function(i) {
	dSession = $(this).find("session").text();
	infoHTMLTable += '<tr><td>Session ID:</td><td>' + dSession + '</td></tr>';

	dDate = $(this).attr("date");
	infoHTMLTable += '<tr><td>Date:</td><td>' + dDate + '</td></tr>';
	dTime = $(this).attr("time");
	infoHTMLTable += '<tr><td>Time:</td><td>' + dTime + '</td></tr>';

	dUser = $(this).find("user").text();
	infoHTMLTable += '<tr><td>User:</td><td>' + dUser + '</td></tr>';

	dTask = $(this).find("task").text();
	infoHTMLTable += '<tr><td>Task:</td><td>' + dTask + '</td></tr>';

	dMicrophone = $(this).find("microphone").text();
	infoHTMLTable += '<tr><td>Microphone:</td><td>' + dMicrophone + '</td></tr>';

	dHubV = $(this).find("hubversion").text();
	infoHTMLTable += '<tr><td>Hub Version:</td><td>' + dHubV + '</td></tr>';;

	dDMan = $(this).find("dman").text();
	infoHTMLTable += '<tr><td>Dialogue Manager:</td><td>' + dDMan + '</td></tr>';

	dPolicy = $(this).find("policy").text();
	infoHTMLTable += '<tr><td>Policy:</td><td>' + dPolicy + '</td></tr>';

	dSemD = $(this).find("semdecoder").text();
	infoHTMLTable += '<tr><td>Semantic Decoder:</td><td>' + dSemD + '</td></tr>';

	dOutG = $(this).find("outputgen").text();
	infoHTMLTable += '<tr><td>Output Gen:</td><td>' + dOutG + '</td></tr>';

    });
    infoHTMLTable += '</table>';
    return infoHTMLTable;
}

