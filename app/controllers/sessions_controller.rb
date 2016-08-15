# sessions NEW
get '/sessions'  do
    erb :'/sessions/new', layout: false
end

# sessions CREATE
post '/sessions' do
    @user = User.find_by_email(params[:email])
    
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