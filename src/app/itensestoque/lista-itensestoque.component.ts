import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
// import { DataService } from "src/app/services/data.service";
import { FormGroup } from "@angular/forms";
import { ItensEstoque } from "./itensestoque.model";
// import "jspdf-autotable";
// declare var jsPDF: any;
import { HttpClient, HttpHeaders } from "@angular/common/http";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: "az-lista-itensestoque",
  templateUrl: "./lista-itensestoque.component.html",
  styleUrls: []
})
export class ListaItensEstoqueComponent implements OnInit {
  public itensestoque$ = new ItensEstoque();

  public ItensEstoque$: Observable<ItensEstoque[]>;

  public formItensEstoque: FormGroup;

  constructor() // private data: DataService,
  // private router: Router,
  // private route: ActivatedRoute,
  // private http: HttpClient
  {
    this.itensestoque$ =
      JSON.parse(sessionStorage.getItem("itensestoque$")) || new ItensEstoque();
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  ngOnInit() {
    // this.ItensEstoque$ = this.data.getAllItensEstoque();
  }

  editarItensEstoque(idItensEstoque) {
    // this.router.navigate(["pages/itensestoque/editar", idItensEstoque]);
  }

  // onExportClick(){

  //     const content: Element = document.getElementById('export');

  //     const options = {
  //         filename: 'ItensEstoque.pdf',
  //         html2canvas: { backgroundColor: 'black', },
  //         jsPDF: {orientation: 'portrait', unit: 'in', format: 'letter'},
  //     };

  //     html2pdf()
  //     .from(content)
  //     .set(options)
  //     .save();
  // }

  resetForm() {
    this.itensestoque$ = new ItensEstoque();
  }

  generatePdf(action = "open") {
    const documentDefinition = this.getDocumentDefinition();

    console.log(documentDefinition);
    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;

      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition() {
    sessionStorage.setItem("itensestoque", JSON.stringify(this.itensestoque$));
    return {
      content: [
        {
          text: "Itens de Estoque",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                text: "Saldo atual: " + this.itensestoque$.QtSaldoAtual
              },
              {
                text: "Ativo: " + this.itensestoque$.StAtivo
              }
            ]
          ]
        }
      ]
      // styles: {
      //   teste:{
      //     fontFamily: 'Courier New'
      //   }
      // }
    };
  }

  //     convert() {

  //         const doc = new jsPDF();
  //         const col = ["id","nome"];
  //         const rows = [];

  //    /* The following array of object as response from the API req  */

  //  const itemNew =  this.itensestoque$;

  //     itemNew.forEach(element => {
  //          const temp = [element.idItensEstoque, element.CdGtinEan13];
  //          rows.push(temp);

  //      });

  //          doc.autoTable(col, rows);
  //          doc.save('Test.pdf');
  //        }

  // public onExportClick(){
  //     var data = document.getElementById('export');
  //     html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     var imgWidth = 208;
  //     var pageHeight = 295;
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     var heightLeft = imgHeight;

  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  //     var position = 0;
  //     pdf.save('MYPdf.pdf'); // Generated PDF
  //     });
}
