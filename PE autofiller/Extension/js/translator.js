
 
translator(document.getElementById('CatalogBoxHtml2').value);
function translator(inputText){ //Function to translate text and put into string using the deepL api 
		var url = "https://api-free.deepl.com/v2/translate";

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log(xhr.status);
				console.log(xhr.responseText);
				//return xhr.responseText;
				var reg=/(?<="text":").*(?=")/;
				 rx =xhr.responseText.match(reg);
				 rx=rx.toString();
				 rx=rx.replace(/CASE/i,"Case");
				 rx=rx.replace(/DIAL/i,"Dial");
				 rx=rx.replace(/Movement/i,"Movement");
				alert(rx);
					
			}
		};
		
		var data = "auth_key=&text="+inputText+"&target_lang=EN";//Put your own DeepL API key here, sign up on their site
		xhr.send(data);
			
}

