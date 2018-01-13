class Dashboard
  include ActiveModel::Serialization

  attr_reader :clips, :distribution, :avg_rate

  def initialize
    @distribution = calculate_distribution
    @avg_rate = calculate_avg_rate
    @clips = Clip.all
  end

  private

  def calculate_avg_rate
    rates = Clip.joins(:timestamps)
                .group(:id)
                .pluck('COALESCE(COUNT(clips.id) / NULLIF(MAX(timestamps.offset), 0), 0) as rate')
    rates.present? ? rates.sum.to_f / rates.size : 0
  end

  def calculate_distribution
    timestamps_count = Timestamp.count

    distribution = Timestamp.group(:video_id).select('video_id, COUNT(video_id)').map do |timestamp|
      { video_id: timestamp.video_id, percentage: 100.0 * timestamp.count / timestamps_count }
    end
    extend_distribution(distribution).sort_by { |d| d[:video_id] }
  end

  def extend_distribution(distribution)
    absent_video_ids = [*1..3] - distribution.map { |d| d[:video_id] }
    distribution + absent_video_ids.map { |video_id| { video_id: video_id, percentage: 0.0 } }
  end
end
