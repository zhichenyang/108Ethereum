'use strict'

let userName = $('#userName');
let userPwd = $('#userPwd');
let register = $('#register');
let login = $('#login');
let reload = $('#reload');
let txtUserName = $('#txtUserName');
let guess = $('#guess');
let inputNum = $('#h_inputNum');
let easy = $('#easy');
let medium = $('#medium');
let hard = $('#hard');
let transitionCard = $('#transitionCard');
let test1 = $('#test1');
let test2 = $('#test2');
let test3 = $('#test3');

let fishAddress = "0x80ea21dbcd638dc6d4e874a5a276d04fca7ebb45";
let nowAccount = "0xe650627B5eD4ad30222Ab3713882Ff0B8A40EAa9";

//交易
transitionCard.on('click',function () {
	$.post('/transitionCard', {		
		address: fishAddress,
		account: nowAccount,
		test1: test1.val(),
		test2: test2.val(),
		test3: test3.val()
	},function(result) {
		if (result.events !== undefined) {
			alert("交易成功");
			window.location.href='user.html'
		}else{
			alert("交易失敗");
		}
	})
})
// 當按下註冊時
register.on('click', function () {
	$.post('/register', {
		address: fishAddress,
		account: nowAccount,
		userName: userName.val(),
		userPwd: userPwd.val()
	}, function (result) {
		if (result.events !== undefined) {
			console.log(result.events.newUserEvent.returnValues, '註冊成功')

			alert("註冊成功");
			// 觸發更新帳戶資料
			window.location.href='login.html'
		}
		else {
			alert("註冊失敗");
			console.log(result)
		}
	})
})

// 當按下登入時
login.on('click', function () {

	$.post('/login', {
		address: fishAddress,
		account: nowAccount,
		userName: userName.val(),
		userPwd: userPwd.val()
	}, function (result) {
		if (result.events !== undefined) {
			console.log(result.events.LoginEvent.returnValues, '登入成功')

			alert("已登入");
			// 觸發更新帳戶資料
			window.location.href='level.html'
		}
		else {
			alert("登入失敗");
			console.log(result)
		}
	})
})

// 當按下重新載入時
reload.on('click', function () {
	$.get('/reload', {
		address: fishAddress,
		account: nowAccount
	}, function (result) {
		txtUserName.text(result.userName);
		$('#a').text(result.cards_Easy[0]);
		$('#b').text(result.cards_Easy[1]);
		$('#c').text(result.cards_Easy[2]);
		$('#d').text(result.cards_Easy[3]);
		$('#e').text(result.cards_Easy[4]);
		$('#f').text(result.cards_Easy[5]);
		$('#g').text(result.cards_Easy[6]);
		$('#h').text(result.cards_Easy[7]);
		$('#i').text(result.cards_Easy[8]);
		$('#j').text(result.cards_Easy[9]);
		$('#aa').text(result.cards_Medium[0]);
		$('#bb').text(result.cards_Medium[1]);
		$('#cc').text(result.cards_Medium[2]);
		$('#dd').text(result.cards_Medium[3]);
		$('#ee').text(result.cards_Medium[4]);
		$('#ff').text(result.cards_Medium[5]);
		$('#gg').text(result.cards_Medium[6]);
		$('#hh').text(result.cards_Medium[7]);
		$('#ii').text(result.cards_Medium[8]);
		$('#jj').text(result.cards_Medium[9]);
		$('#aaa').text(result.cards_Hard[0]);
		$('#bbb').text(result.cards_Hard[1]);
		$('#ccc').text(result.cards_Hard[2]);
		$('#ddd').text(result.cards_Hard[3]);
		$('#eee').text(result.cards_Hard[4]);
		$('#fff').text(result.cards_Hard[5]);
		$('#ggg').text(result.cards_Hard[6]);
		$('#hhh').text(result.cards_Hard[7]);
		$('#iii').text(result.cards_Hard[8]);
		$('#jjj').text(result.cards_Hard[9]);
	})
})

/** 為何字串(string)可以使用字元(char)與陣列(array)的原因
 * input的給予的類型是字串(string)
 * 字串(string)在js裡面是字元(char)與陣列(array)所組成的
 * 舉例：
 * string name = "5293";
 * 這部分可以看成有四個字元(char),加上陣列(array)所組成的字串(string)
 * 圖示：'5'+'2'+'9'+'3'
 * 基本上""(雙引號)表示字串(string) , ''(單引號)表示字元(char)
 * 把四個字元(char)放到長度為4的陣列(array)裡面形成字串(string)
 **/
var urlPath = window.location.pathname;
var pageName = urlPath.split("/").pop();
var level = pageName.split(".").shift();
var times = 0, numLen = 0, QUESTION = 0;
if(level == 'easy'){
	times = 5;
	numLen = 3;
}else if(level == 'medium'){
	times = 7;
	numLen = 4;
}else if(level == 'hard'){
	times = 9;
	numLen = 5;
}
QUESTION = this.initQuestion(numLen);

// 當選擇easy遊戲時
easy.on('click', function () {
	window.location.href='easy.html';
})

medium.on('click', function () {
	window.location.href='medium.html';
})

hard.on('click', function () {
	window.location.href='hard.html';
})

// 猜數字時
guess.on('click', function () {
	alert(QUESTION);
	var legal = checkValueIsLegal();

	if(legal){
		//判斷次數
		if (times != 0){
			var Apoint = 0;
			var Bpoint = 0;
			
			for(var i = 0 ; i < numLen ; i++){
				for(var j = 0 ; j < numLen ; j++){
					if(inputNum.val()[i] == QUESTION[j]){
						if(i == j){
							Apoint += 1;
						}else{
							Bpoint += 1;
						}
					}
				}
			}
			
			//顯示結果
			createLabel(inputNum.val() + "  " + Apoint + "A"  + Bpoint + "B");
			
			//BINGO, 遊戲結束
			if(Apoint == numLen){
				alert("恭喜你成功了!!");
				if(level == 'easy'){
					var reward = Math.floor((Math.random() * 10) + 1);
					alert(reward);
					$.post('/newCard_Easy', {
						address: fishAddress,
						account: nowAccount,
						reward: reward
					}, function(result) {
						if (result.events !== undefined) {
							console.log(result.events.newCardEvent.returnValues, '新增卡片成功')

							if (reward == 1) alert("恭喜獲得 白帶魚 !!!");
							else if (reward == 2) alert("恭喜獲得 沙丁魚 !!!");
							else if (reward == 3) alert("恭喜獲得 虱目魚 !!!");
							else if (reward == 4) alert("恭喜獲得 秋刀魚 !!!");
							else if (reward == 5) alert("恭喜獲得 竹莢魚 !!!");
							else if (reward == 6) alert("恭喜獲得 剝皮魚 !!!");
							else if (reward == 7) alert("恭喜獲得 臭肚魚 !!!");
							else if (reward == 8) alert("恭喜獲得 魷魚 !!!");
							else if (reward == 9) alert("恭喜獲得 龍蝦 !!!");
							else if (reward == 10) alert("恭喜獲得 鎖管 !!!");
						}
						else {
							alert("取得失敗");
							console.log(result)
						}
					})
				}else if(level == 'medium'){
					var reward = Math.floor((Math.random() * 10) + 11);
					alert(reward);
					$.post('/newCard_Medium', {
						address: fishAddress,
						account: nowAccount,
						reward: reward
					}, function(result) {
						if (result.events !== undefined) {
							console.log(result.events.newCardEvent.returnValues, '新增卡片成功')

							if (reward == 11) alert("恭喜獲得 土魠魚 !!!");
							else if (reward == 12) alert("恭喜獲得 白鯧魚 !!!");
							else if (reward == 13) alert("恭喜獲得 赤魚 !!!");
							else if (reward == 14) alert("恭喜獲得 海鱺 !!!");
							else if (reward == 15) alert("恭喜獲得 鬼頭刀 !!!");
							else if (reward == 16) alert("恭喜獲得 曼波魚 !!!");
							else if (reward == 17) alert("恭喜獲得 旗魚 !!!");
							else if (reward == 18) alert("恭喜獲得 鯖魚 !!!");
							else if (reward == 19) alert("恭喜獲得 鱈魚 !!!");
							else if (reward == 20) alert("恭喜獲得 鱸魚 !!!");
						}
						else {
							alert("取得失敗");
							console.log(result)
						}
					})
				}else if(level == 'hard'){
					var reward = Math.floor((Math.random() * 10) + 21);
					alert(reward);
					$.post('/newCard_Hard', {
						address: fishAddress,
						account: nowAccount,
						reward: reward
					}, function(result) {
						if (result.events !== undefined) {
							console.log(result.events.newCardEvent.returnValues, '新增卡片成功')

							if (reward == 11) alert("恭喜獲得 金鱗魚 !!!");
							else if (reward == 12) alert("恭喜獲得 紅皮刀 !!!");
							else if (reward == 13) alert("恭喜獲得 粗皮鯛 !!!");
							else if (reward == 14) alert("恭喜獲得 野生烏魚 !!!");
							else if (reward == 15) alert("恭喜獲得 雀鯛 !!!");
							else if (reward == 16) alert("恭喜獲得 隆頭鸚哥魚 !!!");
							else if (reward == 17) alert("恭喜獲得 黑鮪 !!!");
							else if (reward == 18) alert("恭喜獲得 蝦蛄 !!!");
							else if (reward == 19) alert("恭喜獲得 蘇眉 !!!");
							else if (reward == 20) alert("恭喜獲得 鰻魚 !!!");
						}
						else {
							alert("取得失敗");
							console.log(result)
						}
					})
				}
			}

			times--;
		}
		else{
			alert("超過次數!!");
		}
	}
})

//檢查輸入是否符合規定
function checkValueIsLegal () {
	/** 符合規定的條件
	 * 1.輸入框不足四個字三個字
	 * 2.皆為數字
	 * 3.數字皆不重複
	 **/

	//檢查輸入數字長度
	if(inputNum.val().length < 3){
		inputNum = "";
		alert("輸入框不足三個字");
		return false;
	}

	//皆為數字
	var isNumber = false;
	for(var i = 0 ; i < numLen ; i++){
		//判斷是否為space,此處要做例外判斷
		if(inputNum.val()[i] == " "){
			isNumber = true;
			break;
		}
		//比對是否為0~9
		for(var j = 0 ; j <= 9 ; j++){
			if(inputNum.val()[i] == j){
				//break可以跳出該次迴圈(for)
				break;
			}
			//如果到9都還不是,那代表這不是數字
			if(j == 9){
				isNumber = true;
			}
		}
	}
	if(isNumber){
		inputNum.text("");
		alert("請輸入數字");
		return false;
	}
	
	//數字皆不重複
	var isSame = false;
	for(var i = 0 ; i < numLen ; i++){
		for(j = numLen-1 ; j > 0 ; j--){
			if((inputNum.val()[i] == inputNum.val()[j])&&(i != j)&&(j > i)){
				isSame = true;
			}
		}
	}
	if(isSame){
		inputNum.text("");
		alert("請勿輸入重複數字");
		return false;
	}
	
	return true;
}

//顯示單行文字
function createLabel (inputText) {
	//如果沒有裝文字的地方,就會生成一個
	var labelBox = document.getElementById('labelBox');
	if(labelBox == null){
		labelBox = document.createElement('div');
		labelBox.id = "labelBox";
		document.body.appendChild(labelBox);
	}
	//文字
	var label = document.createElement('span');
	label.innerHTML = inputText;
	labelBox.appendChild(label);
	//斷行
	var hr = document.createElement('hr');
	labelBox.appendChild(hr);
}

//生成題目
function initQuestion (length) {
	var resultQ = [];
	var arrQ = ['0','1','2','3','4','5','6','7','8','9']
	
	for (var i = 0; i < length; ++i) {
		var random = Math.floor(Math.random() * arrQ.length); 
		if(resultQ.includes(arrQ[random])){ 
			continue; 
		} 
		resultQ.push(arrQ[random]);
		arrQ.splice(random,1);
		console.log(resultQ);
	}
	
	return resultQ;
}
