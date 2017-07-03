Rails.application.routes.draw do
  get 'welcome/index', to: 'welcome#index'
  resources :products
  delete 'product/:id', to: 'products#destroy', as: :destroy_product

  get '/product/:id', to: 'products#get_product'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
