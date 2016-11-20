export class Conta  {
    private id: number;
    private nome: string;
    private descricao: string;
    private saldo: number;
    private cor: string;

    efetivarDebitoOuCredito(valor: number) {
        this.saldo += valor;
    }

    devolverDebitoOuCredito(valor: number) {
        this.saldo -= valor;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): this {
       this.id = Number(id);
        return this;
    }

    setNome(nome: string): this {
       this.nome = nome;
        return this;
    }

    setDescricao(descricao: string): this {
       this.descricao = descricao;
        return this;
    }

    setSaldo(saldo: number): this {
       this.saldo = saldo;
        return this;
    }

    setCor(cor: string): this {
       this.cor = cor;
        return this;
    }
}
