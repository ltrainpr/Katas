// Part one:
// Imagine that every year your extended family does a "Secret Santa" gift exchange. For this gift
// exchange, each person draws another person at random and then gets a gift for them. Write a
// program that will choose a Secret Santa for everyone given a list of all the members of your
// extended family. Obviously, a person cannot be their own Secret Santa.

// PSEUDO CODE:
// Array of family members
// for each family member select random Secret Santa gift receiver
// make duplicate array 
// if family member is still in duplicate array splice out family member.  search by name
// if he's not there raise a flag variable by 1.
// select random receiver through random index number
// push family member and receiver into pairing array
// push family member back into duplicate array if he was there before we slice him off
// remove receiver from duplicate array 
// push family member back into duplicate array if flag is 0
// set flag at 0




var secretSanta = {
	pairPeople: function(familyMembers){
		var dupArray, randomNumber;
		var pairings = [];
		dupArray = familyMembers.slice();
		for(var i=0; i < familyMembers.length; i++){
			removeSelf = dupArray.splice(i, 1);
			randomNumber = dupArray[Math.floor(Math.random() * dupArray.length)];
			pairings.push();
		}
	}
};
