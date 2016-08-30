# # # Seed data from file
require 'faker'

Rig.delete_all
Well.delete_all
Measurement.delete_all
User.delete_all


rows = []
File.foreach("depth.txt") do |line|  # read in one line/row at a time
	row = line.split(" ") 			# convert each row to an array

	i = 0
	new_row = []
	while i < 6						# only get the first 6 columns
		new_row << row.shift.to_f	# convert the elements to a decimal/float
		i += 1						# and shovel into another array
	end
	rows << new_row					# shovel row array into array
end 								# end up with double array representing rows and columns
 
rows.each do |row|					#[69.00, 139.30, 35.90, 54.30, 58.42, 635.66]
	new_data = Measurement.new(
		depth: row[0],
		rop: row[1],
		wob: row[2],
		temp_in: row[3],
		temp_out: row[4],
		pressure: row[5],
		well_id: 1
	) 
	new_data.save 
end

# Seed well data
happy_jack = Well.new(
	name: "Happy Jack 12",
	location: "N 416524.0, E 1769412.4",
	start_date: "2/6/2009",
	end_date: "3/24/2009",
	total_depth: 7622
)
happy_jack.save

# Seed rig data
kenai_rig = Rig.new(
	name: "Rig 3",
	company: "Kenai",
	size_type: "Triple"
)
kenai_rig.save

10.times do 
	rig = Rig.new(
		name: "Rig #{Faker::Number.number(1)}",
		company: Faker::Company.name,
		size_type: "Triple"
	)

	rig.save
end

# Seed well data
10.times do |create|
	well = Well.new(
		name: "#{Faker::Name.first_name}-#{Faker::Number.number(2)}",
		location: "N 416524.0, E 1769412.4",
		start_date: Faker::Date.between(2.years.ago, 1.year.ago),
		end_date: Faker::Date.between(1.year.ago, Date.today),
		total_depth: Faker::Number.number(4)
	)
	well.save
end

# Seed user data
10.times do
	user = User.new(
		first_name: "#{Faker::Name.first_name}",
		last_name: "#{Faker::Name.last_name}",
		email: Faker::Internet.email,
		password: "123"
	)
	user.save
end







