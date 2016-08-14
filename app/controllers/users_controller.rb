#users INDEX
get '/users' do
	@users = User.all
	erb :'users/index'
end

#users NEW
get '/users/new' do

end

#users SHOW
get 'users/:id' do

end

#users EDIT
get 'users/:id/edit' do

end

#users CREATE
post '/users' do

end

#users UPDATE
put '/users/:id' do

end

#users DELETE
delete '/users:/id' do

end