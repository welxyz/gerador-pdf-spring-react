package xyz.pdfgenerator.model.dto;

public record Funcionario(
    String nome,
    String cpf,
    String cargo,
    String dataAdmissao
) {}
