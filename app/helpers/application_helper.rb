module ApplicationHelper
  def react_component(component, props = {})
    content_tag :div, nil,
                'data-react-class': component,
                'data-react-props': props.to_json
  end
end
