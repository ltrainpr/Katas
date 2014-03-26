# PSEUDO CODE:
# create array of family members
# create duplicate array for Secret Santa gift_receivers
# iterate over each family member
# pull out random gift_receivers
# compare gift_receiver with family member
# if gift receiver is same person as family member then loop until the random person is different
# Make pairing by pushing family member into hash as key and gift receiver as value pair


family_members = ['Darrell Arthur', 'Aaron Brooks', 'Wilson Chandler', 'Kenneth Faried', 'Evan Fournier', 'Randy Foye', 'Danilo Gallinari', 'JJ Hickson', 'Ty Lawson', 'JaVale McGee', 'Quincy Miller', 'Timofey Mozgov', 'Anthony Randolph', 'Nate Robinson', 'Jan Vesely'];

gift_receivers = family_members.dup
pairing = {}

family_members.each do |nugget|
	a = gift_receivers.sample
	while a == nugget
		a = gift_receivers.sample
	end
	pairing[nugget] = [a]
	gift_receivers = gift_receivers - [a]
end

puts pairing

