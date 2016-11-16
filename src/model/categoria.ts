export class Categoria  {
    private id: number;
    private nome: string;
    private descricao: string;
    private recorrente: boolean;
    private icone: string;

    getId(): number {
        return this.id;
    }

    setId(id: number): Categoria {
        this.id = Number(id);
        return this;
    }

    setNome(nome: string): Categoria {
        this.nome = nome;
        return this;
    }

    setDescricao(descricao: string): Categoria {
        this.descricao = descricao;
        return this;
    }

    setRecorrente(recorrente: boolean): Categoria {
        this.recorrente = Boolean(recorrente);
        return this;
    }

    setIcone(icone: string): Categoria {
        this.icone = icone;
        return this;
    }
}
