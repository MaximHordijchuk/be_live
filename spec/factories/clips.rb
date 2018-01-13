FactoryBot.define do
  factory :clip do
    title { Faker::Lorem.word }

    after(:build) do |clip|
      clip.timestamps = build_list(:timestamp, 1, clip: clip) if clip.timestamps.blank?
    end
  end
end
