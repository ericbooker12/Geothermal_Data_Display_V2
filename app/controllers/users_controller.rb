#users INDEX
get '/users' do
	@users = User.all
	erb :'users/index'
end

#users NEW
get '/users/new' do
	erb :'users/new'
end

#users SHOW
get '/users/:id' do
	@user = User.find(params[:id])
	erb :'users/show'
end

#users EDIT
get 'users/:id/edit' do

end

#users CREATE
post '/users' do
	@user = User.new(params[:user])
	p "+++++++++++"
	p "in user create"
	p @user
	p "+++++++++++"
	if @user.save
	  session[:id] = @user.id
	  redirect "/"
	else
	  @errors = @user.errors.full_messages
	  erb :'users/new'
	end
end

#users UPDATE
put '/users/:id' do

end

#users DELETE
delete '/users:/id' do

end