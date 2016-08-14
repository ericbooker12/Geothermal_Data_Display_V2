class Well < ActiveRecord::Base
  has_many :measurments
  belongs_to :rig
end
