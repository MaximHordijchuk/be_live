class ApplicationController < ActionController::Base
  include RenderJsonConcern
  include RescueFromConcern

  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
end
