import {DateConverter} from '../util/date-converter';

export class Historico  {

    private id: number;
    private conta_id: number;
    private conta_nome: string;
    private categoria_id: number;
    private categoria_nome: string;
    private docto: string;
    private data_movimento: string;
    private data_vencimento: string;
    private descricao: string;
    private observacao: string;
    private valor: number;
    private status: string;

    getId(): number {
        return this.id;
    }

    getContaId(): number {
        return this.conta_id;
    }

    getValor(): number {
        return this.valor;
    }

    getDocto(): string {
        return this.docto;
    }

    getDataMovimento(): string {
        return this.data_movimento;
    }

    setId(id: number): this {
       this.id = Number(id);
        return this;
    }

    setDescricao(descricao: string): this {
       this.descricao = descricao;
       return this;
    }

    setContaId(id: number): this {
        this.conta_id = id;
        return this;
    }

    setContaNome(nome: string): this {
        this.conta_nome = nome;
        return this;
    }

    setCategoriaId(id: number): this {
        this.categoria_id = id;
        return this;
    }

    setCategoriaNome(nome: string): this {
        this.categoria_nome = nome;
        return this;
    }

    setDocto(docto: string): this {
        this.docto = docto;
        return this;
    }

    setDataMovimento(data): this {
        this.data_movimento = DateConverter.toIsoDate(data);
        return this;
    }

    setDataVencimento(data): this {
        this.data_vencimento = DateConverter.toIsoDate(data);
        return this;
    }

    setObservacao(observacao: string): this {
        this.observacao = observacao;
        return this;
    }

    setValor(valor: number): this {
        this.valor = valor;
        return this;
    }

    setStatus(status: string): this {
        this.status = status;
        return this;
    }
}
