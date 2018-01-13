require 'rails_helper'

describe 'Api::V1::Clips', type: :request do
  describe '#create' do
    it 'should create clip' do
      clip_params = {
        title: Faker::Lorem.word,
        timestamps_attributes: [
          { video_id: Faker::Number.between(1, 3), offset: Faker::Number.decimal(2, 2) },
          { video_id: Faker::Number.between(1, 3), offset: Faker::Number.decimal(2, 2) }
        ]
      }

      expect do
        post api_v1_clips_path(format: :json), params: { clip: clip_params }
      end.to change(Clip, :count).by(1).and change(Timestamp, :count).by(2)

      clip = Clip.last

      expect(response.body).to be_present

      expect(clip.title).to eq clip_params[:title]
      clip.timestamps.each_with_index do |timestamp, index|
        timestamp_params = clip_params[:timestamps_attributes][index]
        expect(timestamp.video_id).to eq timestamp_params[:video_id]
        expect(timestamp.offset.to_s).to eq timestamp_params[:offset]
      end
    end
  end

  describe '#destroy' do
    it 'should destroy clip' do
      clip = create(:clip)
      expect { delete api_v1_clip_path(clip.id) }.to change(Clip, :count).by(-1)
      expect(response.body).to be_empty
    end
  end
end
