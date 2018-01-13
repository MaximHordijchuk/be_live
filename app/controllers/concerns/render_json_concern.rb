module RenderJsonConcern
  extend ActiveSupport::Concern

  protected

  def render_json_success(json = {}, options = {})
    render({ json: json, status: :ok }.merge(options))
  end

  def render_json_errors(errors, status = :bad_request)
    errors = [errors] unless errors.is_a?(Array)
    render json: { errors: errors }, status: status
  end
end
