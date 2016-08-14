class User < ActiveRecord::Base

	include BCrypt

	def password
		@password ||= Password.new(hashed_password)
	end

	# def authenticate(password)
	# 	self.password == password
	# end

	# def password=(new_password)
	# 	@password = Password.create(new_password)
	# 	self.hashed_password = @password
	# end

	has_secure_password
end
