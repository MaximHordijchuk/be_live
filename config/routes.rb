Rails.application.routes.draw do
  root 'pages#index'

  resources :pages, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :clips, only: %i[create destroy]
      resources :dashboard, only: %i[index]
    end
  end

  get '*path', to: 'pages#index', constraints: ->(req) { req.format != 'application/json' }
end
