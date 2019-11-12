import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';  
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Material } from '../../material/material.model';
import { UnidadeMedida } from '../../unidademedida/unidademedida.model';
import { Embalagem } from '../../embalagem/embalagem.model';
import { UnidadeMedidaSefaz } from '../../unidademedidasefaz/unidademedidasefaz.model';
import { ItensEstoque } from '../itensestoque.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'az-itensestoque',
    templateUrl: './itensestoque.component.html',
    styleUrls: []
  })

  export class ItensEstoqueComponent implements OnInit {

    public ItensEstoque$: Observable<ItensEstoque[]>;

    formItensEstoque: FormGroup;

    public materiais: Observable<Material[]>;

    public unidademedidas: Observable<UnidadeMedida[]>;

    public embalagens: Observable<Embalagem[]>;

    public unidademedidassefaz: Observable<UnidadeMedidaSefaz[]>;

    constructor(private data: DataService, private http: HttpClient, private fb:FormBuilder, private route:ActivatedRoute, private router:Router, private toastr:ToastrService){}    

    
    ngOnInit()  {
        this.route.params.subscribe(
            (params:any)=>{
                const id = params['id'];
                if(id > 0){
                    this.ItensEstoque$ = this.data.getItensEstoqueByid(id);
                    this.ItensEstoque$.subscribe(itensestoque=>{
                    this.popularForm(itensestoque);
                    })
                }
            }
        )
        
        this.materiais = this.data.getAllMaterial();
        this.unidademedidas = this.data.getAllUnidadeMedida();
        this.embalagens = this.data.getAllEmbalagem();
        this.unidademedidassefaz = this.data.getAllUnidadeMedidaSefaz();

            this.formItensEstoque = this.fb.group({
                IdItemEstoque:[],
                IdMaterial:['', Validators.compose([Validators.required])],
                CdGtinEan13:['', Validators.compose([Validators.required])],
                IdUndMedidaEstoque:['', Validators.compose([Validators.required])],
                IdUndMedidaSefaz:['', Validators.compose([Validators.required])],
                IdUndMedidaProducao:['', Validators.compose([Validators.required])],
                IdEmbalagem:['', Validators.compose([Validators.required])],
                CdGtinEan13Caixa:['', Validators.compose([Validators.required])],
                DtSaldoInicial:['', Validators.compose([Validators.required, Validators.minLength(10)])],
                QtSaldoInicial:['', Validators.compose([Validators.required])],
                QtMinima:['', Validators.compose([Validators.required])],
                QtMaxima:['', Validators.compose([Validators.required])],
                QtSaldoAtual:['', Validators.compose([Validators.required])],
                DtSaldoAtual:['', Validators.compose([Validators.required, Validators.minLength(10)])],
                IdTipoEstoque:['', Validators.compose([Validators.required])],
                StSelecionaInventario:['', Validators.compose([Validators.required])],
                StControleMinimo:['', Validators.compose([Validators.required])],
                NuFatorConversao:['', Validators.compose([Validators.required])],
                QtPesoBruto:['', Validators.compose([Validators.required])],
                QtPesoLiquido:['', Validators.compose([Validators.required])],
                QtLargMaterial:['', Validators.compose([Validators.required])],
                QtComprMaterial:['', Validators.compose([Validators.required])],
                IdUndDimensoes:['', Validators.compose([Validators.required])],
                QtLargEmbalagem:['', Validators.compose([Validators.required])],
                QtComprEmbalagem:['', Validators.compose([Validators.required])],
                QtAltEmbalagem:['', Validators.compose([Validators.required])],
                QtPesoBrutoEmbalagem:['', Validators.compose([Validators.required])],
                PcComissao:['', Validators.compose([Validators.required])],
                IdFornecedorPadrao:['', Validators.compose([Validators.required])],
                StAtivo:['', Validators.compose([Validators.required])],
                DtInsere:['', Validators.compose([

                ])],
                CdUsuarioInsercao:[],
                CdUsuarioAtualiza:[],                
            })
    }

    omitirCaracterEspecial(event){
        var k;  
        k = event.charCode; 
        //alert(k);
        //return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
        return((k !== 33) && (k !== 34) && (k !== 37) && (k !== 36) && (k !== 39) && (k !== 35) && (k !== 38) && (k !== 42) && (k !== 64) && (k !== 40) && (k !== 41)&& (k !== 43) &&(k !== 61) && (k !== 91) && (k !== 123) && (k !== 93) && (k !== 125) && (k !== 63));
    }

    mDATA(input){
        var data = input.value    
        data=data.replace(/\D/g,"")
        data=data.replace(/(\d{2})(\d)/,"$1/$2")  
        data=data.replace(/(\d{2})(\d)/,"$1/$2")
        input.patchValue(data)
      }

    popularForm(itensestoque){
        this.formItensEstoque.patchValue({
            IdItemEstoque:itensestoque.idItemEstoque,
            IdMaterial:itensestoque.idMaterial,
            CdGtinEan13:itensestoque.cdGtinEan13,
            IdUndMedidaEstoque:itensestoque.idUndMedidaEstoque,
            IdUndMedidaSefaz:itensestoque.idUndMedidaSefaz,
            IdUndMedidaProducao:itensestoque.idUndMedidaProducao,
            IdEmbalagem:itensestoque.idEmbalagem,
            CdGtinEan13Caixa:itensestoque.cdGtinEan13Caixa,
            DtSaldoInicial:itensestoque.dtSaldoInicial,
            QtSaldoInicial:itensestoque.qtSaldoInicial,
            QtMinima:itensestoque.qtMinima,
            QtMaxima:itensestoque.qtMaxima,
            QtSaldoAtual:itensestoque.qtSaldoAtual,
            DtSaldoAtual:itensestoque.dtSaldoAtual,
            IdTipoEstoque:itensestoque.idTipoEstoque,
            StSelecionaInventario:itensestoque.stSelecionaInventario,
            StControleMinimo:itensestoque.stControleMinimo,
            NuFatorConversao:itensestoque.nuFatorConversao,
            QtPesoBruto:itensestoque.qtPesoBruto,
            QtPesoLiquido:itensestoque.qtPesoLiquido,
            QtLargMaterial:itensestoque.qtLargMaterial,
            QtComprMaterial:itensestoque.qtComprMaterial,
            IdUndDimensoes:itensestoque.idUndDimensoes,
            QtLargEmbalagem:itensestoque.qtLargEmbalagem,
            QtComprEmbalagem:itensestoque.qtComprEmbalagem,
            QtAltEmbalagem:itensestoque.qtAltEmbalagem,
            QtPesoBrutoEmbalagem:itensestoque.qtPesoBrutoEmbalagem,
            PcComissao:itensestoque.pcComissao,
            IdFornecedorPadrao:itensestoque.idFornecedorPadrao,
            StAtivo:itensestoque.stAtivo,
            CdUsuarioInsercao: itensestoque.cdUsuarioInsercao,
            CdUsuarioAtualiza: itensestoque.cdUsuarioAtualiza,
            DtInsere: itensestoque.dtInsere,

        })
    }

    submit(itensestoqueId){
        if(itensestoqueId == null || itensestoqueId=='' || itensestoqueId == undefined){
            this.submitCadastrar();
        }else if (itensestoqueId > 0){
            this.submitEditar(itensestoqueId);
        }
    }

    submitCadastrar(){
        this.formItensEstoque.patchValue({IdItemEstoque:undefined})
        this
        .data
        .postItensEstoque(this.formItensEstoque.value)
        .subscribe(
            (data: any) => {
                this.toastr.success('Item de estoque registrado!', 'Registro concluÃ­do.')
              this.router.navigate(['pages/lista-itensestoque'])
            },
            (err)=>{                
            console.log(err)
            }
        )
    }

    submitEditar(itensestoqueId){
        this.data
        .putItensEstoque(this.formItensEstoque.value, itensestoqueId)
        .subscribe(
            (data:any)=>{
                this.toastr.success('Item de estoque atualizado!', 'EdiÃ§Ã£o concluÃ­da.')
                this.router.navigate(['pages/lista-itensestoque']);
            },
            (err)=>{
              console.log(err)
            }
        )
    }

    

  }