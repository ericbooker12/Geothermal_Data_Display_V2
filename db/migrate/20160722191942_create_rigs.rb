class CreateRigs < ActiveRecord::Migration
  def change
  	create_table :rigs do |t|
  		t.string :name
  		t.string :company
  		t.string :size_type

  		t.timestamps null: false
  	end
  end
end