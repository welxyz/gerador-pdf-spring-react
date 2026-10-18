package xyz.pdfgenerator.model.dto;

import java.util.List;

public record HoleriteRequest(
    Empresa empresa,
    Funcionario funcionario,
    String mesReferencia,
    List<Lancamento> lancamentos,
    Calculos calculos
) {}