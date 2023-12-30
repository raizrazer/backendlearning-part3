require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const raizRazer = new Person({
    name: "Raiz Razer",
    age: 25,
    favoriteFoods: ["biriyani", "mandi", "broast"],
  });

  raizRazer.save((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: " Irjade Birjade",
    age: 18,
    favoriteFoods: ["mandi", "biriyani", "alfahm"],
  },
  {
    name: "poorGuy Fanu",
    age: 25,
    favoriteFoods: ["biriyani", "mandi", "broast"],
  },
  {
    name: "Monkie Boy",
    age: 25,
    favoriteFoods: ["pazhampori", "chicken fry", "sour candy"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, favoriteFoodsFound) => {
    if (err) return console.log(err);
    done(null, favoriteFoodsFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, idFound) => {
    if (err) return console.log(err);
    done(null, idFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, idFound) => {
    if (err) return console.log(err);

    idFound.favoriteFoods.push(foodToAdd);

    idFound.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, updateDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
