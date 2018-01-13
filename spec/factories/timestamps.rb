FactoryBot.define do
  factory :timestamp do
    video_id { Faker::Number.between(1, 3) }
    offset { Faker::Number.decimal(2, 2) }

    after(:build) do |timestamp|
      timestamp.clip ||= build(:clip)
    end
  end
end
