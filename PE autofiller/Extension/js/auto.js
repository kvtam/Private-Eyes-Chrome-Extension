	var rt //Global String to store stuff to be translated
	
	function spaceToComma(string,target,replacement){ //Function to replace spaces in a string to commas
		var i = 0, length = string.length;
		for (i; i < length; i++) {
			string = string.replace(target, replacement);
		}
		return string;
	}
	function autofill(){ //autofill function fills in the name/ description and stuff automatically
		var foo=document.getElementById('CatalogBoxName').value;
		document.getElementById('CatalogBoxTitle').value=document.getElementById('CatalogBoxPageTitle').value=document.getElementById('CatalogBoxEnPageTitle').value =foo;
		var fooKW=spaceToComma(foo," ",",");
		fooKW+= ",Vintage";
		document.getElementById('CatalogBoxKeywords').value= fooKW;
		document.getElementById('CatalogBoxEnKeywords').value= fooKW;
		var idNum= document.getElementById('CatalogBoxText1').value;
		idNum= idNum.slice(2);
		var fooDes=fooKW+","+idNum;
		document.getElementById('CatalogBoxDescription').value= fooDes;
		document.getElementById('CatalogBoxEnDescription').value= fooDes;
		var jptext= document.getElementById('CatalogBoxHtml1').value;
		alert(document.getElementById('CatalogBoxText1').value);
		//toFile("cat");
		
		
	}
	//TODO: make this function work
	function translator(inputText){ //Function to translate text and put into string using the deepL api 
		var url = "https://api-free.deepl.com/v2/translate";

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		}
		};

		var data = "auth_key=20c33a91-8d10-d2a4-8f9b-6a8f64ec90d5:fx&text="+inputText+"&target_lang=EN";

		xhr.send(data);
	}
	
	
	autofill();
	
