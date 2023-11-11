# CustomAI'ye Hoşgeldin!
Merhaba, Bu modül basit bir chat bot yapmanıza yardımcı olur.

    npm i customai

# Örnek :

```
const bot = require('customai');

bot.train("Merhaba!" , "Hey! Merhaba dostum nasılsın ?") // Öğretmek

bot.respond("Merhaba"); // Bota soru sorma

bot.untrain("Merhaba!" ,"Hey! Merhaba dostum nasılsın ?") // Öğrettiğimizi siler

bot.updateData("Merhaba!" ,"yeni merhana mesajı !") // Öğrettiğimizi siler

const queryResult = c.queryData("merhaba");
console.log(queryResult); // true - false

console.log(bot.loadData()); // Databaseyi gösterir

const responses = bot.getData("merhaba"); // İnput arraylarını çeker.

console.log(responses)

bot.saveData(); // Databaseyi saveler

```