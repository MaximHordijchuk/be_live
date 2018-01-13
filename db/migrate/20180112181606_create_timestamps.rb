class CreateTimestamps < ActiveRecord::Migration[5.1]
  def change
    create_table :timestamps do |t|
      t.references :clip, foreign_key: true
      t.integer :video_id
      t.decimal :offset

      t.timestamps
    end
    add_index :timestamps, :video_id
    add_index :timestamps, :offset
  end
end
