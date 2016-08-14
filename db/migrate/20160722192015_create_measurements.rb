class CreateMeasurements < ActiveRecord::Migration
  def change
  	create_table :measurements do |t|
  		t.float :depth
  		t.float :rop
  		t.float :wob
  		t.float :temp_in
  		t.float :temp_out
  		t.float :pressure
  		t.integer :well_id

      t.timestamps null: false
    end
  end
end
