class Well < ActiveRecord::Base
  has_many :measurments
  belongs_to :rig
  belongs_to :user
end
