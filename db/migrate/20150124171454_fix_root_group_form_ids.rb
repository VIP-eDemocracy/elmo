class FixRootGroupFormIds < ActiveRecord::Migration
  def up
    execute("update forms f inner join form_items fi on f.root_id = fi.id set fi.form_id = f.id")
  end

  def down
  end
end
