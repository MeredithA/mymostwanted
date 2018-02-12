"use strict"

function app(people){
  people = assignAges(people);
  let searchType = prompt("Do you know the persons name?");
  switch(searchType){
    case 'yes':
      mainMenu(searchByName(people),people);
      break;
    case 'no':
      mainMenu(searchByTraits(people),people);
      break;
    default:

      app(people);
      break;
  }
}

function mainMenu(person, people){
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + "Type info, family or descendants to display ");
  switch(displayOption){
    case "info":
      alert(("The following is " + person.firstName + " " + person.lastName + "'s personal info: \n\n" + displayPerson(person)));
      mainMenu(person, people);
      break;
    case "family":
      alert("The following are " + person.firstName + " " + person.lastName + "'s family members: \n\n" + displayPeople(findFamily(person, people)));
      mainMenu(person, people);
      break;
    case "descendants":
      alert("The following are " + person.firstName + " " + person.lastName + "'s descendants: \n\n" + displayPeople(findDescendants(person, people)));
      mainMenu(person, people);
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return;
      break;
    default:
      alert("Your entry is invalid.");
      mainMenu(person, people);
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("Choose one of the following to by:" + ("\n") +"Height" + ("\n") + "Weight"+ ("\n") + "Eye Color" + ("\n") + "Gender" + ("\n") + "Age" + ("\n") + "Occupation").toLowerCase();
  let filteredPeople;
  let foundPerson;
  switch(userSearchChoice) {
     case "height":
       filteredPeople = searchByHeight(people);
       alert(displayPeople(filteredPeople));
       break;
     case "weight":
       filteredPeople = searchByWeight(people);
       alert(displayPeople(filteredPeople));
       break;
     case "eye color":
       filteredPeople = searchByEyeColor(people);
       alert(displayPeople(filteredPeople));
       break;
     case "gender":
       filteredPeople = searchByGender(people);
       alert(displayPeople(filteredPeople));
       break;
     case "age":
       filteredPeople = searchByAge(people);
       alert(displayPeople(filteredPeople));
       break;
     case "occupation":
       filteredPeople = searchByOccupation(people);
       alert(displayPeople(filteredPeople));
     default:
      alert("Invalid search.");
      searchByTraits(people);
      break;
  }
    userSearchChoice = prompt("Would you like to add another trait?");
    if(userSearchChoice === "yes"){
      searchByTraits(filteredPeople, people);
    }
    if (userSearchChoice === "no" && filteredPeople.length === 1) {
       foundPerson = filteredPeople[0];
      mainMenu(foundPerson, people);
    }
    if (userSearchChoice === "no" && filteredPeople.length > 1) {
       alert("We have narrowed it down to this group: \n\n"  + displayPeople(filteredPeople));
       app(people);
    }
 }
//==================search by names================================
  function searchByName(people){
  let firstName = prompt("What is the person's first name?");
  let lastName = prompt("What is the person's last name?");
  let newArray = people.filter(function (el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return true;
    }
      else if(el.firstName != firstName && el.lastname != lastName){
      alert (searchArray.length +" was not found.")
      return false;
    }
  });
  displayPeople(newArray);
  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh (in pounds)?");
   let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    else checkIfNumber(userInputWeight)
      return false
  });
     return newArray;
}

function searchByHeight(people){
  let userInputHeight = prompt("How tall is the person (in Inches)?");
  let newArray = people.filter(function (el){
    if(el.height === parseInt(userInputHeight)){
      return true;
    }
    else checkIfNumber(userInputHeight)
      return false;
  });
  return newArray;
}

function searchByEyeColor(people){
  let userInputEyeColor = prompt("What color are the person's eyes?");
  let newArray = people.filter(function (el){
    if(el.eyeColor === userInputEyeColor){
      return true;
    }
  });
  return newArray;
}

 function searchByAge(people){
   let userInputAge = prompt("What is the persons age?");
   let isInputNumber = checkIfNumber(userInputAge);
     if(isInputNumber){
       let newArray = people.filter(function (el){
        let age = getAge(el.dob);
      if(age === parseInt(userInputAge)){
       return true;
     }
     });
      return newArray;
      }
    else{
      alert("You've entered invalid input. Please try again.");
    return searchByAge(people);
   }
 }

 function getAge(dob) {
   let today = new Date();
   let birthday = new Date(dob);
   let milliseconds = today - birthday;
   let age = Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 365);
   return age;
 }
 
 function assignAges(people){
    people.map(function (el){
      el.age = getAge(el.dob);
    });
    return people;
 }
 function searchByGender(people){
  let userInputGender = prompt("What is the person's gender?");
  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  return newArray;
  }
function searchByOccupation(people){
  let userInputOccupation = prompt("What is the person's occupation?");
  let newArray = people.filter(function (el){
    if(el.occupation === userInputOccupation){
      return true;
    }
  });
  return newArray;
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  return personInfo;
}
function displayPeople(people){
  if (people.length>0){return people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");}
  else{
    return "No matches found";
  }
}

function findDecendants(people, person,) {
   let children = []
   children = people.filter(function (el){
    if (el.parents.includes(person.id)){
      return true;
      }
  });
   let descendants = [];

  for(i=0; i < children.length; i++){
    descendants = descendants.concat(people.filter)(function (el){
    if (el.parents.includes(children[i].id)){
      return true;
      }
  });
  }
}

function findFamily(people, person){
   let children = people.filter(function (el){
    if (el.parents.includes(person.id)){
      return true;
      }
  });
   let parents = people.filter(function (el){
    if(person.parents.includes(el.id)){
      return true;
    }
   });
   let siblings = people.filter(function (el){
    for(i=0; i < parents.length; i++ ){
      if(el.parents.includes(parents[i])){
        return true;
      }
      }
    });
 }

 function checkIfNumber(input){
  let returnInput;
  if(input){
    returnInput = parseInt(input);
    if(returnInput === NaN){return false;}else{return true;}
  }
  else{
    return false;
  }
 }