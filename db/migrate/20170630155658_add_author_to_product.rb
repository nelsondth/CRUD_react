class AddAuthorToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :author, :string
  end
end
