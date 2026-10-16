function Holerite() {

    return (
        <div className="min-h-screen bg-stone-800 flex items-center justify-center p-4">

            <form className="w-full max-w-5xl h-full max-h-[90%] bg-stone-900 rounded-2xl border border-stone-800 border-l-4 border-l-emerald-500 p-5 sm:p-10">
                <h1 className="text-3xl text-stone-100 mb-1">Holerite</h1>
                <p className="text-stone-500 italic mb-8">Recibo de pagamento de salário</p>

                <div className="grid sm:grid-cols-3 gap-x-8 gap-y-6">
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Nome do funcionário</label>
                        <input name="nome" type="text" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Cargo</label>
                        <input name="cargo" type="text" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Competência</label>
                        <input name="competencia" type="month" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Salário base</label>
                        <input name="salarioBase" type="number" step="0.01" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Outros proventos</label>
                        <input name="proventos" type="number" step="0.01" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Descontos</label>
                        <input name="descontos" type="number" step="0.01" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                    <div>
                        <label className="block text-sm text-stone-300 mb-1">Outro</label>
                        <input name="cargo" type="text" className="w-full bg-transparent border border-stone-600 p-2 text-stone-100 focus:outline-none focus:border-emerald-400" />
                    </div>
                </div>

                <div className="mt-25 flex justify-end">
                    <button type="button" className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-sans font-semibold px-6 py-2.5 transition-colors">
                        Baixar holerite em PDF
                    </button>
                </div>
            </form>

        </div>
    )
}

export default Holerite