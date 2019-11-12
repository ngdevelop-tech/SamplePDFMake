import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ListaItensEstoqueComponent } from "./itensestoque/lista-itensestoque.component";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent, ListaItensEstoqueComponent],
  imports: [BrowserModule, FormsModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
