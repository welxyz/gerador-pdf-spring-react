package xyz.pdfgenerator.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.xhtmlrenderer.pdf.ITextRenderer;
import xyz.pdfgenerator.model.dto.HoleriteRequest;

import java.io.ByteArrayOutputStream;

@Service
public class HoleriteService {

    private final SpringTemplateEngine templateEngine;

    public HoleriteService(SpringTemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public byte[] gerarPdfHolerite(HoleriteRequest request) {

        if(request.empresa().cnpj() == null || request.empresa().cnpj().isBlank() ||
           request.colaborador().cpf() == null || request.colaborador().cpf().isBlank()
        ){
            throw new RuntimeException("Dados não encontrados.");
        };

        try{

            Context context = new Context();

            context.setVariable("empresa", request.empresa());
            context.setVariable("colaborador", request.colaborador());
            context.setVariable("mesReferencia", request.mesReferencia());
            context.setVariable("lancamentos", request.lancamentos());
            context.setVariable("calculos", request.calculos());

            String htmlProcessado = templateEngine.process("holerite", context);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ITextRenderer renderer = new ITextRenderer();

            renderer.setDocumentFromString(htmlProcessado);
            renderer.layout();
            renderer.createPDF(outputStream);

            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar holerite: " + e.getMessage(), e);
        }

    }

}
