get '/wells' do
	@wells = Well.all
	
	if request.xhr?
		erb :'/wells/index', layout: false
		# erb :'_well_list', layout: false
	else
		erb :'/wells/index', layout: false
	end
end

get "/wells/:well_id" do
	@well = Well.find(params[:well_id])
	erb :"/wells/show"
end

