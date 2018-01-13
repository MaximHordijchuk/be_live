class TimestampSerializer < ActiveModel::Serializer
  attributes :id, :video_id, :offset
end
