import assert from 'assert';

class Person {
  name= null;
  surname= null;
  hobbies= null;

  constructor(name, surname, hobbies) {
    this.name= name;
    this.surname= surname;
    this.hobbies= hobbies;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
  }

  setHobbies(hobbies) {
    this.hobbies = hobbies;
  }

  presentation() {
    return `Hi, I'm ${this.name} ${this.surname} and my hobbies are ${this.hobbies.join(', ')}`;
  }
}

class Pet {
  owner = null;
  name = null;
  classification = {
    type: null,
    breed: null,
  }

  constructor(owner, name, type, breed) {
    this.owner = owner;
    this.name = name;
    this.classification.type = type;
    this.classification.breed = breed;
  }

  changeType(type) {
    this.classification.type = type;
  }
  changeBreed(breed) {
    this.classification.breed = breed;
  }

  setClassification(classification) {
    this.classification = classification;
  }

  presentation() {
    return `My pet is a ${this.classification.type} from the breed ${this.classification.breed} and its name is ${this.name}`;
  }
}

function clone(obj) {
  return obj;
}

describe(`
  The prototype pattern is a creational design pattern in software development. It is used when the type of objects to create 
  is determined by a prototypical instance, which is cloned to produce new objects.
`, () => {
  it(`
    The prototype pattern is useful when you want to create a new object based on an existing object
  `, () => {
    const person = new Person('John', 'Doe', ['reading', 'writing', 'coding']);
    const person2 = clone(person);
    const pet = new Pet(person, 'Fido', 'dog', 'labrador');
    const pet2 = clone(pet);

    assert.notStrictEqual(person, person2);
    assert.equal(person.presentation(), person2.presentation());
    assert.equal(pet.presentation(), pet2.presentation());
  });


  it(`
    The cloned object is a new object, so it can be modified without affecting the original object.
  `, () => {
    debugger;
    const person = new Person('John', 'Doe', ['reading', 'writing', 'coding']);
    const person2 = clone(person);
    const pet = new Pet(person, 'Fido', 'dog', 'labrador');
    const pet2 = clone(pet);

    person2.name= 'Jane';
    person2.surname= 'Doe';
    person2.setHobbies(['reading', 'writing', 'coding', 'cooking']);
    pet2.name= 'Fifi';
    pet2.owner = person2;
    pet2.setClassification({ type: 'cat', breed: 'persian' });

    assert.equal(person.presentation(), 'Hi, I\'m John Doe and my hobbies are reading, writing, coding');
    console.log('NNN person2.presentation()', person2.presentation());
    console.log('NNN comparation: ', person2.presentation() === 'Hi, I\'m Jane Doe and my hobbies are reading, writing, coding, cooking');
    assert.equal(person2.presentation(), 'Hi, I\'m Jane Doe and my hobbies are reading, writing, coding, cooking');
    assert.equal(pet.presentation(), 'My pet is a dog from the breed labrador and its name is Fido');
    assert.equal(pet2.presentation(), 'My pet is a cat from the breed persian and its name is Fifi');
  });

  it(`Becarefull that there is no link left between the original object and its clone`, () => {
    const person = new Person('John', 'Doe', ['reading', 'writing', 'coding']);
    const person2 = clone(person);
    const pet = new Pet(person, 'Fido', 'dog', 'labrador');
    const pet2 = clone(pet);

    person2.addHobby('cooking');
    pet2.changeType('cat');

    assert.equal(person.presentation(), 'Hi, I\'m John Doe and my hobbies are reading, writing, coding');
    assert.equal(person2.presentation(), 'Hi, I\'m John Doe and my hobbies are reading, writing, coding, cooking');
    assert.equal(pet.presentation(), 'My pet is a dog from the breed labrador and its name is Fido');
    assert.equal(pet2.presentation(), 'My pet is a cat from the breed labrador and its name is Fido');
  });
});