import Route from "@ioc:Adonis/Core/Route";

Route.get("/all", "PagamentosController.index");
Route.post("/store", "PagamentosController.store");
Route.post("/login", "AuthController.login");
Route.post("/fetch-profile", "AuthController.fetchProfile").middleware("auth");
Route.post("/logout", "AuthController.logout");
Route.post("/users", "AuthController.store")
Route.put("/users/:id", "AuthController.update")
