require 'rails_helper'

RSpec.describe Timestamp, type: :model do
  subject { build :timestamp }

  it 'should be valid with factory attributes' do
    should be_valid
  end

  context 'should have basic validations' do
    it { should validate_presence_of(:clip).with_message('must exist') }
    it { should validate_presence_of :video_id }
    it { should validate_presence_of :offset }
    it { should validate_numericality_of(:video_id).is_greater_than_or_equal_to(1).is_less_than_or_equal_to(3) }
  end
end
