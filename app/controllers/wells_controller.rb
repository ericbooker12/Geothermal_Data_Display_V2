get '/wells' do
	@wells = Well.all
	erb :'/wells/index'
end

get "/wells/:well_id" do
	@well = Well.find(params[:well_id])
	erb :"/wells/show"
end

