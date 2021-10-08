	function nameParser(str){
		//Regexes here
		var steel = /\sss\s/i;
		var water = /\sw\/p\s/i;
		var black = /BK/;
		var rose = /RG/;
		var yellow= /YG/;
		var year = /\d{2,4}'?s/; 
		//Array to store tokens
		var nametokens= [];
		const rxTokens = [
		[steel,"Stainless Steel"],
		[water,"Waterproof"],
		[black,"Black"],
		[rose,"Rose Gold"],
		[yellow,"Yellow Gold"]
		];
		
		var name = document.getElementById('CatalogBoxName').value;//get the text from the namebox
		var yearCorrected= name.exec(year);//format the year correctly
		if(yearCorrected.test(/19/){
			if(yearCorrected.test("'"){
				yearCorrected.replace("'","");
			}
		}else{
			yearCorrected = "19"+yearCorrected;
		}
		name.replace(year,yearCorrected);
		
		for(i=0;i<rxTokens.length();i++){
			name.replace(rxTokens[i][0],rxTokens[i][1]);
		}
		//At this point all of the tokens should have been replaced
		document.getElementById('CatalogBoxName').value=name;
	}