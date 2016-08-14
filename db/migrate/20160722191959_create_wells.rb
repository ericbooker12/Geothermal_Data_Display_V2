class CreateWells < ActiveRecord::Migration
  def change
  	create_table :wells do |t|
  		t.string :name
  		t.string :location
  		t.string :start_date
  		t.string :end_date
  		t.float :total_depth
  		t.integer :rig_id

  		t.timestamps null: false
  	end
  end
end
