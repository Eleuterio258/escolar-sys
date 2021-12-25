import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Pagamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public mes: string;

  @column()
  public ano: string;

  @column()
  public multa: string;

  @column()
  public status: number;
  
  @column()
  public valor: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
