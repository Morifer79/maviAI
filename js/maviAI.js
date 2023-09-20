const imgBtn = document.querySelector('.image-btn');
const cityName = document.querySelector('.city-name');
const cityTemp = document.querySelector('.city-temp');
const weatherConditions = document.querySelector('.weather-conditions');
const rate = document.querySelector('.rate');
const conditionsDescription = {
	"overcast clouds": 'пасмурно',
	"broken clouds": 'облачно с прояснениями',
	"few clouds": 'малая облачность',
	"scattered clouds": 'местами облачно',
	"light rain": 'небольшой дождь',
	"moderate rain": 'умеренный дождь',
	"heavy intensity rain": 'сильный ливень',
	"rain and snow": 'дождь со снегом',
	"light snow": 'небольшой снег',
	"snow": 'снег',
	"clear sky": 'ясное небо'
}

// получение списка голосов
let voices = speechSynthesis.getVoices();

speechSynthesis.onvoiceschanged = () => {
	voices = speechSynthesis.getVoices();
	populateVoices(voices);
};

// установка голоса по умолчанию
function populateVoices(voices) {
	voices.forEach((voice, index) => {select.options[index] = new Option(voice.name, index)});
	const defaultVoiceIndex = voices.findIndex((voice) => voice.name === 'Google русский');
	select.selectedIndex = defaultVoiceIndex;
}

// настройка воспроизведения
function speak(sentence) {
	populateVoices(voices);
	const text_speak = new SpeechSynthesisUtterance(sentence);

	text_speak.lang = "ru-RU";
	const voice = voices[select.value];
	text_speak.voice = voice;

	new SpeechSynthesisUtterance(text_speak);
}

// создание распознавания речи
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ru-RU'

// возврат результата прослушивания
recognition.onresult = (event) => {
	const current = event.resultIndex;
	const transcript = event.results[current][0].transcript;
	speakThis(transcript.toLowerCase());
}

// запуск слушателя с клика по изображению
imgBtn.addEventListener('click', () => {
	recognition.start();
})

// создание функции алгоритмов интересующих сценариев
function speakThis(message) {
	const speech = new SpeechSynthesisUtterance();

	//приветствие
	if (message.includes('привет')) {
		const currentTime = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
		if (currentTime > '04:00' && currentTime < '10:00') {
			const finalText = "Доброе утро!";
			speech.text = finalText;
		}
		else if (currentTime > '10:00' && currentTime < '17:00') {
			const finalText = "Добрый день!";
			speech.text = finalText;
		}
		else {
			const finalText = "Добрый вечер!";
			speech.text = finalText;
		}
	}
	//знакомство
	else if (message.includes('кто ты')|| message.includes('ты кто')) {
		const finalText = "Я - голосовой помощник";
		speech.text = finalText;
	}
	else if (message.includes('зовут') || message.includes('имя')){
		const finalText = "Меня зовут Мави!";
		speech.text = finalText;
	}
	//запрос времени (часы, минуты)
	else if (message.includes('время') || message.includes('час')) {
		const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
		const finalText = time;
		speech.text = finalText;
	}
	//запрос даты (день недели, число, месяц)
	else if (message.includes('дата') || message.includes('день')) {
		const date = new Date().toLocaleString(undefined, {weekday: 'long', month: "long", day: "numeric"});
		const finalText = date;
		speech.text = finalText;
	}
	//открытие калькулятора (дефолтный)
	else if (message.includes('калькулятор')) {
		window.open('Calculator:///')
		const finalText = "Калькулятор открыт";
		speech.text = finalText;
	}
	//открытие стартовой страницы поисковика Google
	else if (message.includes('google')) {
		window.open("https://google.com", "_blank");
		const finalText = "Google открыт";
		speech.text = finalText;
	}
	//открытие страницы Youtube
	else if (message.includes('youtube')) {
		window.open("https://www.youtube.com/", "_blank");
		const finalText = "Youtube открыт";
		speech.text = finalText;
	}
	//поиск информации в Google по запросу
	else if (message.includes('что такое') || message.includes('кто такой') || message.includes('кто такая') || message.includes('кто такие')) {
		window.open(`https://google.com/search?q=${message.replace(" ", "+")}`, "_blank");
		const finalText = "Вот что я нашла в интернете по поводу " + message;
		speech.text = finalText;
	}
	//поиск в Wikipedia (убогий..нужно переделать)
	else if (message.includes('википедия')) {
		window.open(`https://ru.wikipedia.org/wiki/${message.replace("википедия", "")}`, "_blank");
		const finalText = "Вот что я нашла в википедии";
		speech.text = finalText;
	}
	//запрос курса доллара
	else if (message.includes('курс') || message.includes('валюта')) {
		fetch('https://v6.exchangerate-api.com/v6/a004bc09006c07f850d92fe8/pair/USD/UAH')
		.then(function (resp) {return resp.json()})
		.then(function (data) {
			rate.textContent = data.conversion_rate.toFixed(2);
			const finalText = `${rate.textContent}`;
			speech.text = finalText;
			speechSynthesis.speak(speech);
		});
	}
	//открытие сайта погоды gismeteo (Одесса)
	else if (message.includes('gismeteo')) {
		window.open("https://www.gismeteo.md/weather-odessa-4982/", "_blank");
		const finalText = "gismeteo открыт";
		speech.text = finalText;
	}
	//открытие сайта погоды sinoptik (Одесса)
	else if (message.includes('sinoptik')) {
		window.open("https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BE%D0%B4%D0%B5%D1%81%D1%81%D0%B0", "_blank");
		const finalText = "sinoptik открыт";
		speech.text = finalText;
	}
	//запрос текущей погоды (Одесса)
	else if (message.includes('погода') || message.includes('прогноз')) {
		fetch('https://api.openweathermap.org/data/2.5/weather?id=698740&appid=f5cd92e902f0cc104e5d8fd7e497b1ee')
		.then(function (resp) {return resp.json()})
		.then(function (data) {
			cityName.textContent = data.name;
			if (cityName.textContent === 'Odesa') {
				cityName.textContent = 'A desa';
			}
			cityTemp.innerHTML = Math.round(data.main.temp - 273) + '&deg;';
			weatherConditions.textContent = data.weather[0]['description'];
			if (weatherConditions.textContent in conditionsDescription) {
				let condition = conditionsDescription[weatherConditions.textContent]
				weatherConditions.textContent = condition;
			}
			const finalText = `${cityName.textContent} ${cityTemp.textContent} ${weatherConditions.textContent}`;
			speech.text = finalText;
			speechSynthesis.speak(speech);
		});
	}
	//закрытие калькулятора
	else if (message.includes('закрой окно')) {
		window.close()
	}
	//дефолтный ответ в случае плохого распознавания или несуществующей команды
	else {
		speech.text = "Я не расслышала. Попробуйте снова";
	}
	const voice = voices[select.value];
	speech.voice = voice;

	window.speechSynthesis.speak(speech);
}