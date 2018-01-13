class DashboardSerializer < ActiveModel::Serializer
  attributes :distribution, :avg_rate

  has_many :clips
end
