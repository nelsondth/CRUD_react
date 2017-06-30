class ProductsController < ApplicationController
  before_action :set_product, only: [:new]

  def index
    @products = Product.all
  end

  def create
    product = Product.new(product_params)
    if product.save?
      render json: product, status: :ok
    end
    render json: {
      message: 'no se pudo crear el Producto',
      errors: product.error.full_messages
    }
  end

  def show
    product = Product.find_by(id: params[:id])
    if product
      render json: product, status: :ok
    end
    render json: {
      message: 'No se encontro el Producto solicitado'
    }
  end

  def new
    @product
  end

  def udpate
    product = Product.find_by(id: params[:id])
    product.update_attributes(product_params)
    render json: product, status: :ok
  end

  def delete
    product = Product.find_by(id: params[:id])
    if product
      product.destroy
      render json: {message: 'Se ha eliminado un producto'}, status: :ok
    end
    render json: {message: 'No se udo eliminar el producto'}
  end

  private

  def set_product
    @product = Product.find_by(id:params[:id])
  end

  def product_params
    params.permit(:name, :description)
  end
end
