package xyz.pdfgenerator.model.dto;

import java.util.List;

public record HoleriteRequest(
    Empresa empresa,
    Colaborador colaborador,
    String mesReferencia,
    List<Lancamento> lancamentos,
    Calculos calculos
) {}