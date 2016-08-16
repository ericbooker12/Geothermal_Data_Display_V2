# sessions NEW
get '/sessions'  do
    erb :'/sessions/new', layout: false
end

# sessions CREATE
post '/sessions' do
    @user = User.find_by_email(params[:email])
    
    if request.xhr?
        if @user && @user.authenticate(params[:password])
            session[:id] = @user.id
            # redirect "/users/#{@user.id}"
            # redirect "/"
            # erb :_main_page, layout: false
            erb :_header_body, layout: false

            # comeback to this later, use json instead of html
            # header = erb :_header, layout: false
            # main = erb :_body, layout: false
            # {header: header, main: main}.to_json

            # response.header
            # response.main
        else
            @errors = "Incorrect login info"
            erb :"/sessions/new"
        end
    end
end

# sessions DELETE. Log out, delete user session
get '/sessions/:id' do
    session[:id] = nil
    redirect '/'
end