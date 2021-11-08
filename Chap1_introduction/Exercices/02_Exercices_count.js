db.restaurants.find({ borough: "Brooklyn" }).count() 

let count = 0;

db.restaurants.find({ borough: "Brooklyn" }).forEach( function (doc) {
    count++;
});

print(count);