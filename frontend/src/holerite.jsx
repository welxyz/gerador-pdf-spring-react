import {useState} from "react";

function Holerite() {

    const [empresa, setEmpresa] = useState({
        razaoSocial: '',
        cnpj: '',
        competencia: ''
    });

    const [colaborador, setColaborador] = useState({
        nome: "",
        cpf: "",
        cargo: "",
        dataAdmissao: ""
    })

    // Lista dinâmica de lançamentos
    const [lancamentos, setLancamentos] = useState([
        { codigo: '', descricao: '', referencia: '', tipo: 'PROVENTO', valor: '' }
    ]);

    const adicionarLancamento = () => {
        setLancamentos([...lancamentos, { codigo: '', descricao: '', referencia: '', tipo: 'PROVENTO', valor: '' }]);
    };

    const removerLancamento = (index) => {
        const novaLista = lancamentos.filter((_, i) => i !== index);
        setLancamentos(novaLista);
    };

    const atualizarLancamento = (index, campo, valor) => {
        const novaLista = [...lancamentos];
        novaLista[index][campo] = valor;
        setLancamentos(novaLista);
    };

    // Cálculo dos totais baseado na lista de lançamentos
    const totaisCalculados = lancamentos.reduce((acumulador, linha) => {
        const valorNumerico = parseFloat(linha.valor) || 0;

        if (linha.tipo === 'PROVENTO') {
            acumulador.totalVencimentos += valorNumerico;
        } else {
            acumulador.totalDescontos += valorNumerico;
        }

        return acumulador;
    }, { totalVencimentos: 0, totalDescontos: 0 });

    const valorLiquido = totaisCalculados.totalVencimentos - totaisCalculados.totalDescontos;

    const gerarPdf = (e) => {
        e.preventDefault();

        const payload = {
            mesReferencia: empresa.competencia,

            empresa: {
                razaoSocial: empresa.razaoSocial,
                cnpj: empresa.cnpj
            },

            funcionario: {
                nome: colaborador.nome,
                cpf: colaborador.cpf,
                cargo: colaborador.cargo,
                dataAdmissao: colaborador.dataAdmissao
            },

            lancamentos: lancamentos.map(l => ({ ...l, valor: parseFloat(l.valor) || 0 })),

            totais: {
                totalVencimentos: totaisCalculados.totalVencimentos,
                totalDescontos: totaisCalculados.totalDescontos,
                valorLiquido: valorLiquido,
                baseInss: totaisCalculados.totalVencimentos,
                baseIrrf: valorLiquido,
                fgtsMes: totaisCalculados.totalVencimentos * 0.08
            }
        };

        console.log("JSON pronto para enviar:", payload);
    };

    return (
        <div className="min-h-screen bg-stone-800 flex items-center justify-center p-4">

            <form onSubmit={gerarPdf} className="w-full max-w-6xl h-full max-h-[90%] bg-stone-900 rounded-2xl border border-stone-800 border-t-4 border-t-emerald-500 p-5 sm:p-10">

                <h1 className="text-3xl text-stone-100 mb-1">Demonstrativo de Recibo de Salário</h1>
                <p className="text-stone-500 italic mb-8">Preencha os dados da empresa, colaborador e os lançamentos para emitir o demonstrativo em PDF.</p>

                {/* Seção empresa */}
                <p className="uppercase text-emerald-400 font-semibold text-sm mb-4 border-b border-b-emerald-700">Empresa</p>
                <div className="grid sm:grid-cols-3 gap-x-8 gap-y-6">
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Razão Social</label>
                        <input name="competencia"
                               type="text"
                               value={empresa.razaoSocial}
                               onChange={e => setEmpresa({ ...empresa, razaoSocial: e.target.value })}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">CNPJ</label>
                        <input name="proventos"
                               type="number" step="0.01"
                               value={empresa.cnpj}
                               onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Competência</label>
                        <input name="competencia"
                               type="month"
                               value={empresa.competencia}
                               onChange={(e) => setEmpresa(({...empresa, competencia: e.target.value }))}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                </div>

                {/* Seção colaborador */}
                <p className="uppercase text-emerald-400 font-semibold text-sm mb-4 border-b border-b-emerald-700 mt-16">Colaborador</p>
                <div className="grid sm:grid-cols-4 gap-x-8 gap-y-6">
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Nome</label>
                        <input name="nome"
                               type="text"
                               value={colaborador.nome}
                               onChange={(e) => setColaborador({...colaborador, nome: e.target.value })}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">CPF</label>
                        <input name="cargo"
                               type="number"
                               value={colaborador.cpf}
                               onChange={(e) => setColaborador({...colaborador, cpf: e.target.value })}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Cargo</label>
                        <input name="cargo"
                               type="text"
                               value={colaborador.cargo}
                               onChange={(e) => setColaborador({...colaborador, cargo: e.target.value })}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Data de admissão</label>
                        <input name="cargo"
                               type="date"
                               value={colaborador.dataAdmissao}
                               onChange={(e) => setColaborador({...colaborador, dataAdmissao: e.target.value })}
                               className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400"
                        />
                    </div>
                </div>

                {/* Seção lançamentos */}
                <div className="flex justify-between items-end mb-4 border-b border-b-emerald-700 pb-1 mt-16">
                    <p className="uppercase text-emerald-400 font-semibold text-sm">Lançamentos</p>
                    <button type="button" onClick={adicionarLancamento} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
                        + Adicionar Linha
                    </button>
                </div>

                {lancamentos.map((lancamento, index) => (
                    <div key={index} className="grid grid-cols-[1fr_3fr_1fr_2fr_2fr_auto] gap-4 mb-4 items-start">
                        <div>
                            <input placeholder="Cód" value={lancamento.codigo} onChange={(e) => atualizarLancamento(index, 'codigo', e.target.value)} type="text" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:border-emerald-400 outline-none" />
                        </div>
                        <div>
                            <input placeholder="Descrição (ex: Salário Base)" value={lancamento.descricao} onChange={(e) => atualizarLancamento(index, 'descricao', e.target.value)} type="text" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:border-emerald-400 outline-none" />
                        </div>
                        <div>
                            <input placeholder="Ref (ex: 30d)" value={lancamento.referencia} onChange={(e) => atualizarLancamento(index, 'referencia', e.target.value)} type="text" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:border-emerald-400 outline-none" />
                        </div>
                        <div>
                            <select value={lancamento.tipo} onChange={(e) => atualizarLancamento(index, 'tipo', e.target.value)} className="w-full bg-stone-900 border border-stone-600 p-2 text-stone-100 focus:border-emerald-400 outline-none">
                                <option value="PROVENTO">Provento (+)</option>
                                <option value="DESCONTO">Desconto (-)</option>
                            </select>
                        </div>
                        <div>
                            <input placeholder="Valor (R$)" value={lancamento.valor} onChange={(e) => atualizarLancamento(index, 'valor', e.target.value)} type="number" step="0.01" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:border-emerald-400 outline-none" />
                        </div>
                        <div className="pt-2">
                            <button type="button" onClick={() => removerLancamento(index)} className="text-red-500 hover:text-red-400 font-bold px-2 cursor-pointer" title="Remover linha">
                                X
                            </button>
                        </div>
                    </div>
                ))}

                <div className="mt-25 flex justify-end">
                    <button type="submit" className="rounded-lg bg-emerald-500 hover:bg-emerald-300 hover:cursor-pointer text-stone-950 font-sans font-semibold px-6 py-2.5 transition-colors">
                        Baixar holerite em PDF
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Holerite