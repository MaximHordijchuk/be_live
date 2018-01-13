require 'rails_helper'

RSpec.describe Clip, type: :model do
  subject { build :clip }

  it 'should be valid with factory attributes' do
    should be_valid
  end

  it 'should have relations' do
    should have_many(:timestamps).dependent(:destroy)
  end

  context 'should have basic validations' do
    it { should validate_presence_of :title }
    it { should validate_presence_of :timestamps }
  end
end
