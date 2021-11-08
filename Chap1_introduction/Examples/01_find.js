
// 
db.restaurants.find(
    { cuisine: { $in: ["Delicatessen", "American"] } }, 
    { _id : 0, name: 1, cuisine : 1 }
).pretty();
