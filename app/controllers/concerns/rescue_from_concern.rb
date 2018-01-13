module RescueFromConcern
  extend ActiveSupport::Concern

  included do
    unless Rails.env.development? || Rails.env.test?
      rescue_from Exception do |exception|
        Rails.logger.error exception.inspect
        render_500
      end

      rescue_from ActiveRecord::RecordNotFound do |exception|
        Rails.logger.error exception.inspect
        render_404
      end
    end
  end

  private

  def render_404
    respond_to do |format|
      format.html { render file: Rails.root.join('public', '404'), layout: false, status: :not_found }
      format.all { render body: nil, status: :not_found }
    end
  end

  def render_500
    respond_to do |format|
      format.html { render file: Rails.root.join('public', '500'), layout: false, status: :internal_server_error }
      format.all { render body: nil, status: :internal_server_error }
    end
  end
end
