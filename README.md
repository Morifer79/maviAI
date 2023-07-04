# maviAI

Обязательно к прочтению!

Первая версия голосового баловства...

По ссылкам ниже можно ознакомиться с поддержкой двух библиотек на данный момент:<br />
https://caniuse.com/?search=Speech%20Synthesis%20API<br />
https://caniuse.com/?search=Speech%20Recognition%20API

Принцип работы прост: нажали на микрофон под гифкой (возможно первый раз запросит разрешение) и произнесли команду.
Распознавание происходит по одному (на данный момент) любому ключевому слову (или фразе) из указанных в списке, потому полная команда может звучать абсолютно как вам угодно, главное чтобы включало хоть одно контрольное слово или вообще состояло только из него.
Напр. знакомство включает два варианта ключевых слов "имя" и "зовут", потому скажете вы "имя" или "назови мне своё имя", "зовут" или "как тебя зовут" - для срабатывания вообще не имеет значения.

Команды ("ключевые слова"):

1. Приветствие:<br />
"привет" - отвечает приветствием в зависимости от текущего времени суток (Доброе утро/день/вечер)

2. Знакомство:<br />
"кто ты" или "ты кто" - отвечает, что является вашим помощником<br />
"зовут" или "имя" - называет своё текущее имя

3. Время:<br />
"время" или "час" - называет текущее время (часы и минуты)<br />
"дата" или "день" - называет текущую дату (день недели, число и месяц)

4. Приложение:<br />
"калькулятор" - открывает дефолтное приложение калькулятора на ПК (первый запуск потребует разрешения)

5. Валюта:<br />
"курс" или "валюта" - озвучивает курса доллара (на данный момент команду нужно активировать два раза: 1-ый запрос получает значение, и только 2-ой уже его читает. В ближайшее время переделаю)

6. Прогноз погоды:<br />
"погода" или "прогноз" - называет текущую погоду (город, градусы и название погодного условия). Имеет две особенности: первая - в запрос вшит код моего города и мой ip-ключ (при желании или нужде можно легко сделать универсальным), и вторая особенность - как и в случае с валютой, пока необходимо два раза активировать команду)

7. Открытие страниц сайтов:<br />
"гисметео" - открывает погодный сайт gismeteo с данными моего города (вшито в код)<br />
"синоптик" - открывает погодный сайт sinoptik с данными моего города (вшито в код)<br />
"гугл" - открывает страницу поиска Google<br />
"ютуб" - открывает страницу Youtube

8. Поиск на сайтах:<br />
"что такое" / "кто такой" / "кто такая" / "кто такие" + искомое слово или фраза  - открывает страницу Google с искомым запросом.<br />
"википедия" + искомое слово или фраза  - открывает искомое слово в Википедии (В отличии от других команд здесь нет вольности в вариации произношения, нужна строгая формулировка 'Википедия+Что-то' иначе боль))

Дефолтный ответ, в случае нераспознавания команды (или отсутствия таковой в списке), ассистент уведомляет, что не смог услышать команду.

Подводя итог скажу о некоторых очевидных фактах:
- делал её под себя, что говорит о нынешнем отсутствии универсальности (те же запросы можно реализовать для любого города, языка и т.п.)
- уровень знаний почти нулевой, с голосовыми библиотеками толком ещё не разбирался, а запросы пока не проходил по курсу обучения (возможно элементарные вещи слишком усложнил или неправильно подошёл к ним в целом)
- список команд трактуется необходимостью и/или творческим подходом, потому поле действия здесь - бесконечность)
Естественно со временем многое буду переделывать, добавлять и улучшать.
Пока же - как есть ;)
