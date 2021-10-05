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
		var fooDes = fooKW;
		fooKW+= ",Vintage Watch";
		document.getElementById('CatalogBoxKeywords').value= fooKW;
		document.getElementById('CatalogBoxEnKeywords').value= fooKW;
		var idNum= document.getElementById('CatalogBoxText1').value;
		idNum= idNum.slice(2);
		fooDes+=","+idNum;
		document.getElementById('CatalogBoxDescription').value= fooDes;
		document.getElementById('CatalogBoxEnDescription').value= fooDes;
		var jptext= document.getElementById('CatalogBoxHtml1').value;
		caseEditor();
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
	function caseEditor(){
		//check the Japanese phrases
		var key = document.getElementById('CatalogBoxText11').value;
		const jphrases = new Map();
		jphrases.set("Screw back Water Proof","スクリューバック防水");
		jphrases.set("Snap back water proof","スナップバック　防水");
		jphrases.set("Snap back non water proof","スナップバック　非防水");
		
		if(jphrases.has(key)){
			document.getElementById('CatalogBoxText11').value=jphrases.get(key);
		}else{
			alert("Enter in the new key/Value for the Japanese case field Kyle");
		}
		
		//check Eng phrases
		var key1 = document.getElementById('CatalogBoxEnText9').value;
		var key2 = document.getElementById('CatalogBoxEnText11').value;
		
		const enphrases = new Map();
		enphrases.set("Screw back Water Proof","Screw back Waterproof");
		enphrases.set("Stainless steer","Stainless steel");
		enphrases.set("Snap back water proof","Snap back Waterproof");
		enphrases.set("Snap back non water proof","Snap back Non-waterproof");
		
		if(enphrases.has(key2)){
			document.getElementById('CatalogBoxEnText11').value=enphrases.get(key2);
		}else{
			alert("Enter in the new key/Value for the English case field Kyle");
		}
		
	
	}
	
	
	autofill();
	
