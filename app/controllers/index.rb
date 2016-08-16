get '/' do
	erb :index
end

get '/main' do 
	if xhr.request?
		erb :_main_page
	end
end