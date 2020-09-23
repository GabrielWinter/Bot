const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const fs = require('fs');
const {installMouseHelper} = require('./extras/install_mouse_helper');
puppeteer.use(pluginStealth())


const html_path = 'htmls/bot_';
const screenshot_path = 'screenshots/bot_';
const SimpleNodeLogger = require('simple-node-logger'),
	opts = {
		logFilePath: 'logs/' + 'bot.log',
		timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
	};
let html = '';


// ####################################
// ####################################
// Parametros para preencher

// usuario e senha  da conta da nike
const user = 'gabrielwinter45@hotmail.com';
const pass = '1234556';

// cv code do cartao de credito
const cv_code = '123';

// tamanho do tenis
const size = '35';

// url do tenis para comprar
const url = 'https://www.nike.com.br/Produto/Tenis-Nike-Air-Max-270-React-SE-Feminino/1-16-213-214684?gridPosition=A1';


const debug = true;


// se mudar esse "false" para "true" vai realizar a compra automaticamente 
const buy = false;





// ####################################
// ####################################

(async () => { 

	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true,
		headless: false
	});

	const page = await browser.newPage();
	
	if(debug == true){	
		await installMouseHelper(page); // mouse visivel
		
		var dir = './htmls';
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		dir = './screenshots';
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		dir = './logs';
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		
		log = SimpleNodeLogger.createSimpleFileLogger( opts );
		log.setLevel('info');	
		
	}
		
	await page.goto(url);
	page.waitForNavigation({ waitUntil: 'networkidle0' }); 
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 1

	

	if(debug == true){	
		log.info('1. Page loaded');	
		html = await page.content();
		fs.writeFileSync(html_path + "_1_loaded_" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_1_loaded_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 2	

	
	await page.waitForSelector('.size-grid-dropdown');
	await page.evaluate(() =>
		document.querySelectorAll(".size-grid-dropdown")[0].scrollIntoView()
	);
	

	if(debug == true){	
		log.info('2. Selectors appeared');	
		html = await page.content();
		fs.writeFileSync(html_path + "_2_selectors_" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_2_selectors_" + Math.floor(new Date() / 1000) + '.png'});	
	}
	
	
	await page.waitFor(500);
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 3

	
	await page.evaluate(async(size) => {
		let sizes = await Array.from(document.querySelectorAll(".size-grid-dropdown"));
		let sizeIndex = sizes
			.map((s, i) => (s.innerHTML === size ? i : false))
			.filter(Boolean)[0];
		return sizes[sizeIndex].click();
	}, size);
	
	

	if(debug == true){	
		log.info('3. Found and clicked on size');
		html = await page.content();
		fs.writeFileSync(html_path + "_3_size_clicked__" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_3_size_clicked_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 4	

	
	await page.waitForSelector('button[data-qa=feed-buy-cta]');
	await page.evaluate(() =>
		document.querySelectorAll("button[data-qa=feed-buy-cta]")[0].scrollIntoView()
	);
	

	if(debug == true){	
		log.info('4. Scrolled to add button');
		html = await page.content();
		fs.writeFileSync(html_path + "_4_scroll_to_add_button__" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_4_scroll_to_add_button_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 5	

	
	await page.evaluate(() =>
		document.querySelectorAll("button[data-qa=feed-buy-cta]")[0].click()
	);

	

	if(debug == true){	
		log.info('5. Clicked add button');
		html = await page.content();
		fs.writeFileSync(html_path + "_5_clicked_add_button__" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_5_clicked_add_button_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);	
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 6
	
	
	await page.waitForSelector('.emailAddress');
	await page.waitFor(500);
	

	await page.focus('.emailAddress > input');
	await page.keyboard.type(user);
	await page.waitFor(200);
	

	await page.focus('.password > input')
	await page.keyboard.type(pass);
	await page.waitFor(200);
	

	await page.evaluate(() =>
		document.querySelectorAll(".loginSubmit > input")[0].click()
	);	

	if(debug == true){	
		log.info('6. Logged in');
		html = await page.content();
		fs.writeFileSync(html_path + "_6_logged_in__" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_6_logged_in_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);	
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 7

	
	await page.waitForSelector('.credit-card-iframe');
	await page.waitForSelector('.credit-card-iframe');
	
	await page.evaluate(() =>
		document.querySelectorAll(".credit-card-iframe")[0].scrollIntoView()
	);
	await page.waitFor(200);
	
	const target_frame = page.frames().find(frame => frame.url().includes('paymentcc.nike.com'));
	
	await target_frame.evaluate(
		() => (document.getElementById("cvNumber").focus())
	);	
	await target_frame.waitFor(1000);
	await page.keyboard.type(cv_code, {delay: 10});
	
	

	if(debug == true){	
		log.info('7. Entered CV');
		html = await page.content();
		fs.writeFileSync(html_path + "_7_entered_cv__" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_7_entered_cv_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 8

	
	await page.waitForSelector('.save-button');
	const buttons = await page.$$('.save-button');

	await buttons[1].click();	
	

	if(debug == true){	
		log.info('8. Clicked Save & Continue');
		html = await page.content();
		fs.writeFileSync(html_path + "_8_save_continue__" + Math.floor(new Date() / 1000) + ".html", html);
		page.screenshot({path: screenshot_path + "_8_save_continue_" + Math.floor(new Date() / 1000) + '.png'});
	}

	
	await page.waitFor(500);		
	
	
	
	
	
	// ##################################################
	// ##################################################
	// ################################## ROUND 9

	
	if(buy == true){
		await buttons[2].click();
		
	
		if(debug == true){	
			log.info('9. Submitted Order');
			html = await page.content();
			fs.writeFileSync(html_path + "_9_submitted_order__" + Math.floor(new Date() / 1000) + ".html", html);
			page.screenshot({path: screenshot_path + "_9_submitted_order_" + Math.floor(new Date() / 1000) + '.png'});
		}
	
		
		await page.waitFor(500);
		
	}
	
	
	
	

})();
