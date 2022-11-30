package com.gecco.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.gecco.Entity.MensajePdf;
import com.gecco.Entity.Pdf;
import com.gecco.Service.IPdfService;

@Controller
@CrossOrigin("*")
@RequestMapping("api/Pdf")
public class PdfController {
	
	@Autowired
    IPdfService fileService;

	@PostMapping("/upload")
	public ResponseEntity<MensajePdf> upload(@RequestParam("files") List<MultipartFile> file) throws Exception {
    	fileService.save(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new MensajePdf("Los archivos fueron cargados correctamente al servidor"));
	}

    @GetMapping("/files")
    public ResponseEntity<List<Pdf>> getFiles(){
        List<Pdf> fileInfos = fileService.loadAll().map(path -> {
          String filename = path.getFileName().toString();
          String url = MvcUriComponentsBuilder.fromMethodName(PdfController.class, "getFile",
                  path.getFileName().toString()).build().toString();
          return new Pdf(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename){
        Resource file = fileService.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\""+file.getFilename() + "\"").body(file);
    }

    @GetMapping("/delete/{filename:.+}")
    public ResponseEntity<MensajePdf> deleteFile(@PathVariable String filename) {
        String message = "";
        try {
            message = fileService.deleteFile(filename);
            return ResponseEntity.status(HttpStatus.OK).body(new MensajePdf(message));
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MensajePdf(message));
        }
    }
    
    //-----------------------Segunda Carpeta--------------------------------
    
    @PostMapping("/guardar")
	public ResponseEntity<MensajePdf> uploadFiles(@RequestParam("files") List<MultipartFile> files) throws Exception {
    	fileService.guardar(files);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new MensajePdf("Los archivos fueron cargados correctamente al servidor"));
	}
    
//    @PostMapping("/guardar")
//    public ResponseEntity<MensajePdf> guardar(@RequestParam("files")List<MultipartFile> files) throws Exception{
//        String message = "";
//        //try{
//            fileService.guardar(files);

            //message = "Se subieron los archivos correctamente " + fileNames;
            //return ResponseEntity.status(HttpStatus.OK).body(new MensajePdf(message));
//        }catch (Exception e){
            //message = "Fallo al subir los archivos";
//            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MensajePdf(message));
//        }
//    }

    @GetMapping("/listar")
    public ResponseEntity<List<Pdf>> listarTodos(){
        List<Pdf> fileInfos = fileService.listarTodos().map(path -> {
          String filename = path.getFileName().toString();
          String url = MvcUriComponentsBuilder.fromMethodName(PdfController.class, "listarUno",
                  path.getFileName().toString()).build().toString();
          return new Pdf(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping("/listarUno/{filename:.+}")
    public ResponseEntity<Resource> listarUno(@PathVariable String filename){
        Resource file = fileService.listarUno(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\""+file.getFilename() + "\"").body(file);
    }

    @GetMapping("/eliminar/{filename:.+}")
    public ResponseEntity<MensajePdf> eliminar(@PathVariable String filename) {
        String message = "";
        try {
            message = fileService.eliminar(filename);
            return ResponseEntity.status(HttpStatus.OK).body(new MensajePdf(message));
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MensajePdf(message));
        }
    }
    
  //----------------Tercera Carpeta--------------------------------------------
    @PostMapping("/subirImagen")
	public ResponseEntity<MensajePdf> guardarImagen(@RequestParam("imagenes") List<MultipartFile> file) throws Exception {
    	fileService.guardarImagen(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new MensajePdf("Los archivos fueron cargados correctamente al servidor"));
	}

    @GetMapping("/listarImagenes")
    public ResponseEntity<List<Pdf>> getImagenes(){
        List<Pdf> fileInfos = fileService.listarImagenes().map(path -> {
          String filename = path.getFileName().toString();
          String url = MvcUriComponentsBuilder.fromMethodName(PdfController.class, "listarImagen",
                  path.getFileName().toString()).build().toString();
          return new Pdf(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping("/listarImagen/{filename:.+}")
    public ResponseEntity<Resource> listarImagen(@PathVariable String filename){
        Resource file = fileService.listarImagen(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\""+file.getFilename() + "\"").body(file);
    }

    @GetMapping("/eliminarImagen/{filename:.+}")
    public ResponseEntity<MensajePdf> eliminarImagen(@PathVariable String filename) {
        String message = "";
        try {
            message = fileService.eliminarImagen(filename);
            return ResponseEntity.status(HttpStatus.OK).body(new MensajePdf(message));
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MensajePdf(message));
        }
    }
    
  //----------------Cuarta Carpeta--------------------------------------------
    @PostMapping("/subirFirma")
	public ResponseEntity<MensajePdf> guardarFirma(@RequestParam("files") List<MultipartFile> file) throws Exception {
    	fileService.guardarFirma(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new MensajePdf("Los archivos fueron cargados correctamente al servidor"));
	}

    @GetMapping("/listarFirmas")
    public ResponseEntity<List<Pdf>> getFirmas(){
        List<Pdf> fileInfos = fileService.listarFirmas().map(path -> {
          String filename = path.getFileName().toString();
          String url = MvcUriComponentsBuilder.fromMethodName(PdfController.class, "listarFirma",
                  path.getFileName().toString()).build().toString();
          return new Pdf(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }


    @GetMapping("/listarFirma/{filename:.+}")
    public ResponseEntity<Resource> listarFirma(@PathVariable String filename){
        Resource file = fileService.listarFirma(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\""+file.getFilename() + "\"").body(file);
    }

    @GetMapping("/eliminarFirma/{filename:.+}")
    public ResponseEntity<MensajePdf> eliminarFirma(@PathVariable String filename) {
        String message = "";
        try {
            message = fileService.eliminarFirma(filename);
            return ResponseEntity.status(HttpStatus.OK).body(new MensajePdf(message));
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MensajePdf(message));
        }
    }
//-----------------------Quinta Carpeta--------------------------------
    
    @PostMapping("/subirArchivoSolicitud")
	public ResponseEntity<MensajePdf> guardarImagenSolicitud(@RequestParam("files") List<MultipartFile> file) throws Exception {
    	fileService.guardarImagenSolicitudList(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new MensajePdf("Los archivos fueron cargados correctamente al servidor"));
	}

    @GetMapping("/listarTodoArchivoSolicitud")
    public ResponseEntity<List<Pdf>> listarTodoImagenSolicitud(){
        List<Pdf> fileInfos = fileService.listarTodoImagenSolicitud().map(path -> {
          String filename = path.getFileName().toString();
          String url = MvcUriComponentsBuilder.fromMethodName(PdfController.class, "listarUnaImagenSolicitud",
                  path.getFileName().toString()).build().toString();
          return new Pdf(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }
    
    
    @GetMapping("/listarUnArchivoSolictud/{filename:.+}")
    public ResponseEntity<Resource> listarUnaImagenSolicitud(@PathVariable String filename){
        Resource file = fileService.listarUnaImagenSolicitud(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\""+file.getFilename() + "\"").body(file);
    }

    @GetMapping("/eliminarArchivoSolicitud/{filename:.+}")
    public ResponseEntity<MensajePdf> eliminarImagenSolicitud(@PathVariable String filename) {
        String message = "";
        try {
            message = fileService.eliminarImagenSolicitud(filename);
            return ResponseEntity.status(HttpStatus.OK).body(new MensajePdf(message));
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MensajePdf(message));
        }
    }
}