package xyz.pdfgenerator.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.pdfgenerator.model.dto.HoleriteRequest;
import xyz.pdfgenerator.service.HoleriteService;

@RestController
@RequestMapping("/holerite")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class HoleriteController {

    private final HoleriteService service;

    @PostMapping("/download")
    public ResponseEntity<byte[]> pdfHoleriteDownload(@RequestBody HoleriteRequest request) {
        byte[] pdfHolerite = service.gerarPdfHolerite(request);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=holerite.pdf");

        return ResponseEntity.ok().headers(headers).body(pdfHolerite);
    }

}
