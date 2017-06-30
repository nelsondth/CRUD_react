class ProductsController < ApplicationController
  before_action :set_product, only: [:new]

  def index
    @products = Product.all
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: product, status: :ok
    else
      render json: {
        message: 'no se pudo crear el Producto',
        errors: product.errors.full_messages
      }
    end
  end

  def show
    product = Product.find_by(id: params[:id])
    if product
      render json: product, status: :ok
    else
      render json: {
        message: 'No se encontro el Producto solicitado'
      }
    end
  end

  def new
    @product
  end

  def update
    product = Product.find_by(id: params[:id])
    product.update_attributes(product_params)
    render json: product, status: :ok
  end

  def delete
    product = Product.find_by(id: params[:id])
    if product
      product.destroy
      render json: {message: 'Se ha eliminado un producto'}, status: :ok
    else
      render json: {message: 'No se udo eliminar el producto'}
    end
  end

  private

  def set_product
    @product = Product.find_by(id:params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :author)
  end
end
