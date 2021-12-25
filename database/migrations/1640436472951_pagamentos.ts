import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pagamentos extends BaseSchema {
  protected tableName = 'pagamentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
    table.increments("id");
      table.enum("mes", [
        "fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
      ]);
      table.enum("ano", [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]);
      table.enum("multa", [0, 10, 30, 50, 100]);
      table.enum("status", [0, 1, 2, 3]);
      table.decimal("valor").defaultTo(3700.0);
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
