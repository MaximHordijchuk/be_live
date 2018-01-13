class Api::V1::ClipsController < Api::V1::BaseController
  before_action :set_clip, only: %i[destroy]

  def create
    clip = Clip.new(clip_params)

    if clip.save
      render_json_success(clip)
    else
      render_json_errors(clip.errors.full_messages)
    end
  end

  def destroy
    @clip.destroy
    render body: nil
  end

  private

  def clip_params
    params.require(:clip).permit(:title, timestamps_attributes: %i[video_id offset])
  end

  def set_clip
    @clip = Clip.find(params[:id])
  end
end
