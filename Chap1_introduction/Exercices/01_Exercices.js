

// 01 Exercice
/**
 * 1. Comptez tous les restaurants de Brooklyn
 * 
 * 2. Comptez le nombre de restaurants italien dans Brooklyn
 * 
 * 3. Comptez le nombre de restaurants Italien dont le nom commence par un A
 * 
 */

// 1
db.restaurants.find({borough : "Brooklyn"}).count()

// 2
db.restaurants.find({ borough : "Brooklyn", cuisine: "Italian" }).count()

// 3
db.restaurants.find({ name: /^A/, cuisine: "Italian" }).count()

// 4 comptez tous les restaurants italiens dont le nom se termine par un a
db.restaurants.find({ name: /a$/, cuisine: "Italian" }).count()
// Récupérez les noms de ces restaurants ?
db.restaurants.find({ name: /a$/, cuisine: "Italian" }, {name: 1, _id : 0})

// Récupérez les noms des restaurants dans un tableau Javascript. Ecrivez le script dans ce fichier.

// 1. Exercice
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { "$gte": 10 }
}, {
    "grades.score": 1, _id: 0
}).count();

// 
db.restaurants.find({
    "grades.score": { "$not": { "$lt": 10 } }
},
    { "grades.score": 1, "_id": 0 }
)

/**
 * Quels sont les restaurants qui ont eu un grade A avec un score supérieur ou égal à 20 en même temps ?
 */
db.restaurants.find({ grades: { $elemMatch: { score: { $gte: 20 }, grade: "A" } } }, {grades : 1} ).pretty()