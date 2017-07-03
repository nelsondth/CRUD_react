class ChangeTitleAndAuthorFromProducts < ActiveRecord::Migration[5.1]
  def change
    rename_column :products, :title, :name
    rename_column :products, :author, :quantity
    change_column :products, :quantity, :integer
  end
end
