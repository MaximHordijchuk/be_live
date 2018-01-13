class Timestamp < ApplicationRecord
  belongs_to :clip, inverse_of: :timestamps

  validates :video_id, :offset, presence: true
  validates :video_id, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 3 }
end
