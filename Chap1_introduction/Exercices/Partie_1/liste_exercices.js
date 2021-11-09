// Partie 1 liste d'exercices

/**
 * 01 Combien y a t il de restaurants qui font de la cuisine italienne et qui ont eu un score de 10 au moins ?
 * 
* Affichez également le nom, les scores et les coordonnées GPS de ces restaurants. Ordonnez les résultats par ordre décroissant sur les noms des restaurants.*
 */


const resBrooklyn = db.restaurants.find({ borough: "Brooklyn" }, { "name": 1 });

let count = 0;
// on utilise le curseur 
resBrooklyn.forEach(doc => {
    count = count + 1;
});

print(count);

// Comparaison avec la méthode d'agrégation pour compter
print(resBrooklyn.count());

// refaire la requête
const resBrooklyn2 = db.restaurants.find({ borough: "Brooklyn" }, { "name": 1 });
let count = 0;
while (resBrooklyn2.hasNext()) {
    count++;
    resBrooklyn2.next();
}

print(count);

// On peut bien évidement calculer ce nombre directement en une seule requête :
db.restaurants.find({ borough: "Brooklyn" }, { "name": 1 }).count();

// 02 Quels sont les restaurants qui ont eu un grade A avec un score supérieur ou égal à 20 en même temps ?

db.restaurants.find({
    grades: {
        $elemMatch: { "score": { $gte: 20 }, "grade": "A" }
    }
},
    {
        _id: 0,
        grades: 1
    }
).pretty()

// uniquement score et grade 

db.restaurants.find({
    grades: {
        $not: {
            $elemMatch: {
                "score": { $lte: 20 },
                 "grade": { $in : ["B", "C"]}
            }
        }
    }
}, {
    _id : 0,
    grades : 1
}
).pretty()


// 03 Quels sont les restaurants qui ont eu un grade A et un score supérieur ou égal à 20 ? Affichez uniquement les noms et ordonnez les par ordre décroissant. Affichez le nombre de résultat.

db.restaurants.find(
    {
        "grades.grade": "A",
        "grades.score": { $gte: 20 }
    },
    {
        _id: 0,
        "grades.grade": 1,
        "grades.score": 1
    }).sort({ name: -1 });


// 03 Quels sont les restaurants qui ont eu un grade A et un score supérieur ou égal à 20 ? Affichez uniquement les noms et ordonnez les par ordre décroissant. Affichez le nombre de résultat.

db.restaurants.find(
    {
        "grades.grade": "A",
        "grades.score": { $gte: 20 }
    },
    {
        _id: 0,
        "grades.grade": 1,
        "grades.score": 1
    }).sort({ name: -1 });


//  04. A l'aide de la méthode distinct trouvez tous les quartiers distincts de NY.
db.restaurants.distinct('borough');

// 05 Trouvez tous les types de restaurants dans le quartiers du Bronx. Vous pouvez là encore utiliser distinct et un deuxième paramètre pour préciser sur quel ensemble vous voulez appliquer cette close.

db.restaurants.distinct('cuisine', { "borough": "Bronx" });

// 06 Trouvez tous les restaurants dans le quartier du Bronx qui ont eux 4 grades.

db.restaurants.find({ "borough": "Bronx", "grades": { "$size": 4 } }, { grades : 1, name : 1, _id : 0}).pretty()

// 07. Sélectionnez les restaurants dont le grade est A ou B dans le Bronx.

db.restaurants.find({
    $and: [
        { "borough": "Bronx" },
        { "grades.grade": { $in: ["A", "B"] } }
    ]
}).count()