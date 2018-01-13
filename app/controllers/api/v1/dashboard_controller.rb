class Api::V1::DashboardController < Api::V1::BaseController
  def index
    dashboard = Dashboard.new
    render_json_success(dashboard)
  end
end
