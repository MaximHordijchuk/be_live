require 'rails_helper'

RSpec.describe Dashboard, type: :model do
  describe '#clips' do
    it 'should return all clips' do
      clips = create_list(:clip, 10)
      expect(Dashboard.new.clips).to eq clips
    end
  end

  describe '#distribution' do
    it 'should return correct value' do
      create(:clip, timestamps: [
               build(:timestamp, video_id: 1, offset: 0),
               build(:timestamp, video_id: 1, offset: 1),
               build(:timestamp, video_id: 2, offset: 2),
               build(:timestamp, video_id: 3, offset: 4)
             ])

      create(:clip, timestamps: [build(:timestamp, video_id: 2, offset: 2)])

      expect(Dashboard.new.distribution)
        .to eq [{ video_id: 1, percentage: 40.0 },
                { video_id: 2, percentage: 40.0 },
                { video_id: 3, percentage: 20.0 }]
    end

    it 'should return 0 values if clips are absent' do
      expect(Dashboard.new.distribution)
        .to eq [{ video_id: 1, percentage: 0.0 },
                { video_id: 2, percentage: 0.0 },
                { video_id: 3, percentage: 0.0 }]
    end
  end

  describe '#avg_rate' do
    it 'should return correct value' do
      # rate = 0.5
      create(:clip, timestamps: [
               build(:timestamp, video_id: 1, offset: 0),
               build(:timestamp, video_id: 2, offset: 4)
             ])

      # rate = 0.25
      create(:clip, timestamps: [build(:timestamp, video_id: 2, offset: 4)])

      # rate = 0
      create(:clip, timestamps: [build(:timestamp, video_id: 3, offset: 0)])

      expect(Dashboard.new.avg_rate).to eq 0.25
    end

    it 'should return 0 values if clips are absent' do
      expect(Dashboard.new.avg_rate).to eq 0
    end
  end
end
