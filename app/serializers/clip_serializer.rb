class ClipSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many :timestamps
end
