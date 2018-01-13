class Clip < ApplicationRecord
  has_many :timestamps, inverse_of: :clip, dependent: :destroy

  accepts_nested_attributes_for :timestamps

  validates :title, :timestamps, presence: true
end
