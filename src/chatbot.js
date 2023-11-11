const fs = require('fs');
const stringSimilarity = require('string-similarity');

class ChatBot {
    constructor(databasePath) {
        this.databasePath = databasePath;
        this.data = this.loadData();
        setInterval(() => {
            this.saveData();
        }, 1000);
    }

    loadData() {
        try {
            const data = fs.readFileSync(this.databasePath, 'utf8');
            this.data = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("Veritabanı dosyası bulunamadı. Basit bir veritabanı oluşturuluyor.");
                this.data = [
                    {
                        "input": "merhaba",
                        "responses": [
                            "Merhaba!",
                            "Selam!"
                        ]
                    }
                ];
                this.saveData();
            } else {
                console.error('Veritabanı yüklenirken bir hata oluştu:', error);
            }
        }
        return this.data;
    }

    saveData() {
        try {
            fs.writeFileSync(this.databasePath, JSON.stringify(this.data, null, 2), 'utf8');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    train(input, response) {
        input = input.toLowerCase();
        const existingEntry = this.data.find((entry) => entry.input === input);

        if (existingEntry) {
            existingEntry.responses.push(response);
        } else {
            this.data.push({
                input: input,
                responses: [response]
            });
        }

        this.saveData();
    }

    untrain(input, response) {
        input = input.toLowerCase();
        const existingEntry = this.data.find((entry) => entry.input === input);

        if (existingEntry) {
            const responseIndex = existingEntry.responses.indexOf(response);
            if (responseIndex !== -1) {
                existingEntry.responses.splice(responseIndex, 1);
                if (existingEntry.responses.length === 0) {
                    this.data = this.data.filter((entry) => entry.input !== input);
                }
                this.saveData();
                return true;
            }
        }
        return false;
    }

    respond(input) {
        input = input.toLowerCase();

        if (this.data.length === 0) {
            return 'Özür dilerim, hiç eğitim verisi bulunamadı.';
        }

        let bestMatch;
        let bestMatchRating = -1;

        this.data.forEach((entry) => {
            const matches = stringSimilarity.findBestMatch(input, [entry.input]);
            if (matches.bestMatch.rating > bestMatchRating) {
                bestMatch = entry;
                bestMatchRating = matches.bestMatch.rating;
            }
        });

        if (bestMatchRating > 0) {
            const responses = bestMatch.responses;
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        } else {
            return 'Özür dilerim, anlamadım.';
        }
    }

    getData(input) {
        input = input.toLowerCase();
        const existingEntry = this.data.find((entry) => entry.input === input);

        if (existingEntry) {
            return existingEntry.responses;
        } else {
            return [];
        }
    }

    updateData(input, newResponses) {
        input = input.toLowerCase();
        this.loadData()

        const existingEntry = this.data.find((entry) => entry.input === input);

        if (existingEntry) {
            existingEntry.responses = newResponses;
            this.saveData();
            return true;
        }

        return false;
    }

    queryData(input) {
        input = input.toLowerCase();

        const matchingEntry = this.data.find((entry) => entry.input === input);

        return matchingEntry !== undefined;
    }

}

module.exports = ChatBot;