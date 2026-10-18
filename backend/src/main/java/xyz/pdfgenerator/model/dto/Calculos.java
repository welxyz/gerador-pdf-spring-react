package xyz.pdfgenerator.model.dto;

public record Calculos(
    Double totalVencimentos,
    Double totalDescontos,
    Double valorLiquido,
    Double baseInss,
    Double baseIrrf,
    Double fgtsMes
) {}
