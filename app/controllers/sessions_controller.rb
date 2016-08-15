# sessions NEW
get '/sessions/new'  do
    erb :'/sessions/new'
end

# sessions CREATE
post '/sessions' do
    @user = User.find_by_email(params[:email])
    p "================"
        p "in sessions post route"
    p @user.first_name
    p @user.id
    p "current_user is #{current_user}"
    p "================"
    if @user && @user.authenticate(params[:password])
        session[:id] = @user.id
        # redirect "/users/#{@user.id}"
        redirect "/"
    else
        @errors = "Incorrect login info"
        erb :"/sessions/new"
    end
end

# sessions DELETE. Log out, delete user session
get '/sessions/:id' do
    session[:id] = nil
    redirect '/'
end