package xyz.pdfgenerator.model.dto;

import xyz.pdfgenerator.model.enums.TipoLancamentoEnum;

public record Lancamento(
    String codigo,
    String descricao,
    String referencia,
    TipoLancamentoEnum tipo,
    Double valor
) {}
