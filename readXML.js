// File: readXML.js

// Start function when DOM has completely loaded 
$(document).ready(function(){ 

	// Open the parks.xml file
	$.get("parks.xml",{},function(xml){
      	
		// Build an HTML string
		myHTMLOutput = '';
	 	myHTMLOutput += '<table width="98%" border="1" cellpadding="0" cellspacing="0">';
	  	myHTMLOutput += '<th>Name</th><th>Lat</th><th>Long</th><th>Type</th><th>Info</th>';
	  	
		// Run the function for each park tag in the XML file
		$('marker',xml).each(function(i) {
			parkName = $(this).find("name").text();
			parkLat = $(this).find("lat").text();
			parkLng = $(this).find("lng").text();
			parkCat = $(this).find("category").text();
			parkInfo = $(this).find("infowindow").text(); 
			
			// Build row HTML data and store in string
			mydata = BuildParkHTML(parkName,parkLat,parkLng,parkCat,parkInfo);
			myHTMLOutput = myHTMLOutput + mydata;
		});
		myHTMLOutput += '</table>';
		
		// Update the DIV called Content Area with the HTML string
		$("#ContentArea").append(myHTMLOutput);
	});
});
 
 
 
 function BuildParkHTML(parkName,parkLat,parkLng,parkCat,parkInfo){
	
	// Build HTML string and return
	output = '';
	output += '<tr>';
	output += '<td>'+ parkName + '</td>';
	output += '<td>'+ parkLat +'</td>';
	output += '<td>'+ parkLng +'</td>';
	output += '<td>'+ parkCat +'</td>';
	output += '<td>'+ parkInfo +'</td>';
	output += '</tr>';
	return output;
}
	 
