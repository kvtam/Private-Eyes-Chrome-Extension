	var rt //Global String to store stuff to be translated
	
	function spaceToComma(string,target,replacement){ //Function to replace spaces in a string to commas
		var i = 0, length = string.length;
		for (i; i < length; i++) {
			string = string.replace(target, replacement);
		}
		return string;
	}
	function autofill(){ //autofill function fills in the name/ description and stuff automatically
		nameParser();
		var foo=document.getElementById('CatalogBoxName').value;
		document.getElementById('CatalogBoxTitle').value=document.getElementById('CatalogBoxPageTitle').value=document.getElementById('CatalogBoxEnPageTitle').value =foo;
		var fooKW=spaceToComma(foo," ",",");
		fooKW=tagFormat(fooKW);
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
		
		
	}
	function nameParser(){
		//Regexes here
		var steel = /(?<=\s)ss(?=\s)|S\.Steel/i;
		var water = /(?<=\s)w\/p(?=\s)/i;
		var black = /\s?BK/g;
		var rose = /\s?RG/g;
		var yellow= /\s?YG/g;
		var year = /\d{2,4}['|’|`]s?/; 
		var dec=/\d*/;
		var multi=/multi\s/ig;
		var overSize=/over size/ig;
		var tick=/'|’|`/;
		var toCap=/(?<=\s)[a-z](?=[a-z]{2})/g;
		var BE=/Bull's Eye/;
		var toLow=/(?<=[A-Z])[A-Z]*(?=\s|$)/g;
		
		
		//Array to store tokens
		const rxTokens = [
		[steel,"Stainless Steel"],
		[water,"Waterproof"],
		[black,"Black"],
		[rose," Rose Gold"],
		[yellow," Yellow Gold"],
		[multi, "Multi-"],
		[overSize,"Oversize"],
		[BE,"Bullseye"]
		];
		
		var name = document.getElementById('CatalogBoxName').value;//get the text from the namebox
		var yearCorrected= year.exec(name);//format the year correctly
		//Make all words start with a capital
		
		name=name.replace(toCap,match => match.toUpperCase());
		
		if(!/19/.test(yearCorrected)){
			//if year doesn't start with 19 then add 19 to the front

			yearCorrected = "19"+yearCorrected;
		}
		if(tick.test(yearCorrected)&&/s/.test(yearCorrected)){//if the year has an apostrophe remove it
				yearCorrected=dec.exec(yearCorrected);
				yearCorrected+="s";
		}else{
			yearCorrected=dec.exec(yearCorrected);
		}
		name=name.replace(year,yearCorrected);
		
		for(i=0;i<rxTokens.length;i++){
			name=name.replace(rxTokens[i][0],rxTokens[i][1]);
		}
		name=name.replace(toLow,match => match.toLowerCase());
		//At this point all of the tokens should have been replaced
		document.getElementById('CatalogBoxName').value=name;
	}
	function tagFormat(str){
		//regexes
		var tagSteel = /Stainless,Steel/;
		var tagRose =/Rose,Gold/;
		var tagYellow= /Yellow,Gold/;
		var tagCaliber=/\d*mm,Caliber/i;
		var tagGilt=/Gilt,dial/i;
		var tagQuote=/"/g;
		var tagSM300=/Seamaster,300/;
		var tagCross=/Cross,Design/;
		var tagAuto=/Automatic,Model/;
		var tagBH=/Birdie,Hour,Design/;
		var tagPD=/Panda,Design/;
		var tagSector=/Sector,Dial/;
		var tagCushion=/Cushion,Case/
		var tagBLD=/Box,Lug,Design/i;
		var tagYears=/(?<=\d{2,4})-(?=\d{2,4})/;
		var tagBox=/With,Box/;
		
		const rxTokens_tags = [
		[tagQuote,''],
		[tagSteel,"Stainless Steel"],
		[tagRose,"Rose Gold"],
		[tagYellow,"Yellow Gold"],
		[tagCaliber,"30mm Caliber"],
		[tagGilt, "Gilt Dial"],
		[tagSM300,"Seamaster-300"],
		[tagCross,"Cross Design"],
		[tagAuto,"Automatic Model"],
		[tagBH,"Birdie Hour Design"],
		[tagPD,"Panda Design"],
		[tagSector,"Sector Dial"],
		[tagCushion,"Cushion Case"],
		[tagBLD,"Box Lug Design"],
		[tagYears,","],
		[tagBox="With,Box"]
		];
		
		for(i=0;i<rxTokens_tags.length;i++){
			str=str.replace(rxTokens_tags[i][0],rxTokens_tags[i][1]);
		}
		
		return tagRemove(str);
	}
	function tagRemove(str){
		
		var rmIn = /(?<=,)in,/ig;
		var rmWith= /(?<=,)with !box,/ig;
		var rmDesign=/(?<=,)design,|,Design(?=$)/ig;
		var rmRare=/(?<=,)rare,/ig;
		var rmEX=/\!/;
		var rmDial=/(?<=,)Dial,|,Dial(?=$)/ig;
		
		const rmTokens=[
		rmIn,
		rmWith,
		rmDesign,
		rmRare,
		rmEX,
		rmDial
		]
		for(i=0;i<rmTokens.length;i++){
			str=str.replace(rmTokens[i],'');
		}
		
		return str;
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
			//console.log(xhr.responseText);
			return xhr.responseText;
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
		jphrases.set("Snap back Water Proof","スナップバック　防水");
		jphrases.set("Snap-back, water-resistant","スナップバック　防水");
		jphrases.set("Snapback, non-waterproof","スナップバック　非防水");
		jphrases.set("Snap back, non-waterproof","スナップバック　非防水");
		jphrases.set("Snap back non water proof","スナップバック　非防水");
		jphrases.set("Snap back non Water Proof","スナップバック　非防水");
		jphrases.set("Snap-back case, non-waterproof","スナップバック　非防水");
		jphrases.set("Screw back water proof","スクリューバック防水");
		jphrases.set("Screw-back, water-resistant","スクリューバック防水");
		jphrases.set("Screw-back,Waterproof","スクリューバック防水");
		jphrases.set("Screw-back case, water-resistant","スクリューバック防水");
		jphrases.set("Snap-back, non-waterproof","スナップバック　非防水");
		jphrases.set("Water Proof","防水");
		jphrases.set("Snap-back case (non-waterproof)","スナップバック　非防水");
		jphrases.set("Screw-back case (waterproof)","スクリューバック防水");
		
		if(jphrases.has(key)){
			document.getElementById('CatalogBoxText11').value=jphrases.get(key);
		}else{
			alert("Enter in the new key/Value for the Japanese case field Kyle");
		}
		
		//check Eng phrases
		var key1 = document.getElementById('CatalogBoxEnText9').value;
		var key2 = document.getElementById('CatalogBoxEnText11').value;
		var key3 = document.getElementById('CatalogBoxEnText8').value;
		var key4 = document.getElementById('CatalogBoxEnText12').value;
		var key5 = document.getElementById('CatalogBoxEnText13').value;
		var key6 = document.getElementById('CatalogBoxEnText14').value;
		
		const enphrases = new Map();
		enphrases.set("Screw back Water Proof","Screw back Water-resistant");
		enphrases.set("Stainless steer","Stainless steel");
		enphrases.set("Snap back water proof","Snap back Water-resistant");
		enphrases.set("Snap back non water proof","Snap back Non-Water-resistant");
		enphrases.set("Snap-back case (non-waterproof)","Snap back Non-Water-resistant");
		enphrases.set("Snap back non Water Proof","Snap back Non-Water-resistant");
		enphrases.set("Screw back water proof","Screw back Water-resistant");
		enphrases.set("Screw-back,Waterproof","Screw back Water-resistant");
		enphrases.set("Screw-back case, water-resistant","Screw back Water-resistant");
		enphrases.set("Screw-back, water-resistant","Screw back Water-resistant");
		enphrases.set("Screw-back case (waterproof)","Screw back Water-resistant");
		enphrases.set("Snap-back, non-waterproof","Snap back Non-Water-resistant");
		enphrases.set("Snap-back case, non-waterproof","Snap back Non-Water-resistant");
		enphrases.set("Water Proof","Waterproof");
		enphrases.set("スナップバック 非防水","Snap back Non-waterproof");
		enphrases.set("スナップバック 防水","Snap back Waterproof");
		enphrases.set("スクリューバック 防水","Snap back Waterproof");
		enphrases.set("手巻","Manual Wind");
		enphrases.set("プリント","Print");
		enphrases.set("ステイブライト","Staybrite");
		enphrases.set("ステンレススチールケース","Stainless steel");
		enphrases.set("ステンレススチール","Stainless steel");
		enphrases.set("ステンレススティール","Stainless steel");
		enphrases.set("オリジナル","Original");
		enphrases.set("ルミナス","Luminescent");
		enphrases.set("アップライド","Applied");
		enphrases.set("アップライド & ルミナス","Applied & Luminescent");
		enphrases.set("ノン オリジナル （ベルト幅：17mm）","Non-original (Lug width: 17mm)");
		enphrases.set("ノン オリジナル （ベルト幅：16mm）","Non-original (Lug width: 16mm)");
		enphrases.set("ノン オリジナル （ベルト幅：16mm） ","Non-original (Lug width: 16mm)");
		enphrases.set("ノン オリジナル （ベルト幅：18mm）","Non-original (Lug width: 18mm)");
		enphrases.set("ノンオリジナル （ベルト幅：18mm）","Non-original (Lug width: 18mm)");
		enphrases.set("ノンオリジナル （ベルト幅：20mm）","Non-original (Lug width: 20mm)");
		enphrases.set("ノン オリジナル （ベルト幅：20mm）","Non-original (Lug width: 20mm)");
		enphrases.set("ノン オリジナル （ベルト幅：18mm） / パリス式","Non-original (Lug width: 18mm) / Paris style");
		enphrases.set("ノン オリジナル （ベルト幅：20mm） / オリジナル尾錠","Non-original (Lug width: 20mm) /Original Buckle");
		enphrases.set("ノン オリジナル （ベルト幅：18mm）/ GF Type-2","Non-original (Lug width: 18mm) /GF Type-2");
		enphrases.set("ノン オリジナル （ベルト幅：18mm） / GF Type-2","Non-original (Lug width: 18mm) /GF Type-2");
		enphrases.set("ノン オリジナル （ベルト幅：16mm） /  GF Type-4","Non-original (Lug width: 16mm) /GF Type-4");
		enphrases.set("Snapback, non-waterproof","Snap back Non-waterproof");
		enphrases.set("Snap back, non-waterproof","Snap back Non-waterproof");
		
		
		if(enphrases.has(key1)){
			document.getElementById('CatalogBoxEnText9').value=enphrases.get(key1);
		}
		if(enphrases.has(key3)){
			document.getElementById('CatalogBoxEnText8').value=enphrases.get(key3);
		}
		if(enphrases.has(key4)){
			document.getElementById('CatalogBoxEnText12').value=enphrases.get(key4);
		}
		if(enphrases.has(key5)){
			document.getElementById('CatalogBoxEnText13').value=enphrases.get(key5);
		}
		if(enphrases.has(key6)){
			document.getElementById('CatalogBoxEnText14').value=enphrases.get(key6);
		}
		if(enphrases.has(key2)){
			document.getElementById('CatalogBoxEnText11').value=enphrases.get(key2);
		}else{
			alert("Enter in the new key/Value for the English case field Kyle");
		}
		
	
	}
	
	
	autofill();
	
