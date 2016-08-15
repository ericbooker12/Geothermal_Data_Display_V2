get '/rigs/index' do
	@rigs = Rig.all	

	erb :'/rigs/index'
end 

get '/rigs/new' do
	@rig = Rig.new
	erb :'/rigs/new'
end

post '/rigs' do
	@rig = Rig.new(params[:rig])
	if @rig.save
		redirect '/rigs/index'
	else
	  @errors = @user.errors.full_messages
	  erb :'rigs/new'
	end
end