
import Route from '@ioc:Adonis/Core/Route'

Route.get('/all', 'PagamentosController.index')
Route.get('/pay', 'PagamentosController.pay')
