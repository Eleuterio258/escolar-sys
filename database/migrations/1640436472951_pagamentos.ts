import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pagamentos extends BaseSchema {
  protected tableName = 'pagamentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
    table.increments("id");
      table.string("mes");
      table.string("ano");
      table.string("multa");
      table.string("status");
      table.decimal("valor");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
