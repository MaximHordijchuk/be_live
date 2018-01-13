require 'rails_helper'

describe 'Api::V1::Dashboard', type: :request do
  describe '#index' do
    before { create(:clip) }

    it 'should create clip' do
      get api_v1_dashboard_index_path(format: :json)

      expect(response.body).to be_present
      json_body = JSON.parse(response.body, symbolize_names: true)
      %i[clips distribution avg_rate].each do |attribute|
        expect(json_body[attribute]).to be_present
      end
      expect(json_body[:clips].size).to eq Clip.count
    end
  end
end
