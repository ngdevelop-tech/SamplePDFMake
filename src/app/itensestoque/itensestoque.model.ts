import { Material } from "../material/material.model";

export class ItensEstoque {
  IdItemEstoque: number;
  IdMaterial: number;
  CdGtinEan13: string;
  IdUndMedidaEstoque: string;
  IdUndMedidaSefaz: string;
  IdUndMedidaProducao;
  IdEmbalagem: string;
  CdGtinEan13Caixa: string;
  DtSaldoInicial: string;
  QtSaldoInicial: number;
  QtMinima: string;
  QtMaxima: string;
  QtSaldoAtual: string;
  DtSaldoAtual: string;
  IdTipoEstoque: string;
  StSelecionaInventario: string;
  StControleMinimo: string;
  NuFatorConversao: string;
  QtPesoBruto: string;
  QtPesoLiquido: string;
  QtLargMaterial: string;
  QtComprMaterial: string;
  IdUndDimensoes: string;
  QtLargEmbalagem: string;
  QtComprEmbalagem: string;
  QtAltEmbalagem: string;
  QtPesoBrutoEmbalagem: string;
  PcComissao: string;
  IdFornecedorPadrao: string;
  StAtivo: string;
  DtInsere: string;
  DtAtualiza: string;
  CdUsuarioInsercao: number;
  CdUsuarioAtualiza: number;
  Material: Material;

  constructor() {}
}
