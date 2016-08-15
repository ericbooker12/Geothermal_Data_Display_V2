get '/measurements/index'  do
	@all_data = Measurement.all
  @depths = []
  @rops = []
  @wobs = []
  @temps1 = []
  @temps2 = []

  @all_data.each do |row|
    @depths<<row.depth
    @rops<<row.rop
    @wobs<<row.wob
    @temps1<<row.temp_in
    @temps2<<row.temp_out
  end

	erb :'/measurements/index'
end