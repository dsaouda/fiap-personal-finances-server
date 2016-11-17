import {DateConverter} from '../util/date-converter';

export class Historico  {

    private id: number;
    private conta_id: number;
    private categoria_id: number;
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

    setCategoriaId(id: number): this {
        this.categoria_id = id;
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
