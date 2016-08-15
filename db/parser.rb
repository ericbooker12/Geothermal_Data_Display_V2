
@rows = []
def hi

	rows = []
	File.foreach("depth.txt") do |row|
		row = row.split("	") 	# convert each row to an array

		i = 0
		new_row = []
		while i < 6
			new_row << row.shift.to_f
			i += 1
		end
		rows << new_row		# shovel row array into array
	end
	rows
end

@rows = hi





