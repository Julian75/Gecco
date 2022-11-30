package com.gecco.ServiceImplement;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.gecco.Service.IPdfService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

@Service
public class PdfServiceImplement implements IPdfService{
	
	//Nombre de la carpeta donde vamos a almacenar los archivos
    //Se crea a nivel de raiz la carpeta
//	private final Path root = Paths.get("C:\\xampp\\htdocs\\gecco\\assets\\pdf");
//	
//	private final Path carpeta = Paths.get("C:\\xampp\\htdocs\\gecco\\assets\\soporte-solicitudes-pqrs");
//	
//	private final Path imagenes = Paths.get("C:\\xampp\\htdocs\\gecco\\assets\\imagenes");
//
	private final Path firmas = Paths.get("C:\\xampp\\htdocs\\gecco\\assets\\firmas");
//	
//	private final Path imagenesSolicitud = Paths.get("C:\\xampp\\htdocs\\gecco\\assets\\imagenes-autorizacion-premios");
	
	//Para cuando sea Local
	private final Path root = Paths.get("C:\\Users\\PROGRAMADOR\\Documents\\Imagener\\pdf");
	 
	private final Path carpeta = Paths.get("C:\\Users\\PROGRAMADOR\\GECCO\\src\\assets\\soporte-solicitudes-pqrs");
	
	private final Path imagenes = Paths.get("C:\\Users\\PROGRAMADOR\\GECCO\\src\\assets\\imagenes");
	
	private final Path imagenesSolicitud = Paths.get("C:\\Users\\PROGRAMADOR\\Documents\\Imagener\\ImagenesSolicitud");
//	
//    @Override
	
//    public void init() {
//        try {
//            Files.createDirectory(root);
//        } catch (IOException e) {
//            throw new RuntimeException("No se puede inicializar la carpeta uploads");
//        }
//    }
//    
//    public void deleteAll() {
//	}

	 @Override
		public void save(MultipartFile file) throws Exception {
			Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
		}
	    
	    //@Override
//	    public void guardar(MultipartFile file) {
//	        try {
//	            //copy (que queremos copiar, a donde queremos copiar)
//	            Files.copy(file.getInputStream(), 
//	                       this.carpeta.resolve(file.getOriginalFilename()));
//	        } catch (IOException e) {
//	            throw new RuntimeException("No se puede guardar el archivo. Error " + e.getMessage());
//	        }
//	    }
	    
	    @Override
		public void save(List<MultipartFile> files) throws Exception {
			for (MultipartFile file : files) {
				this.save(file);
			}
		}

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if(resource.exists() || resource.isReadable()){
                return resource;
            }else{
                throw new RuntimeException("No se puede leer el archivo ");
            }

        }catch (MalformedURLException e){
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAll(){
        //Files.walk recorre nuestras carpetas (uploads) buscando los archivos
        // el 1 es la profundidad o nivel que queremos recorrer
        // :: Referencias a metodos
        // Relativize sirve para crear una ruta relativa entre la ruta dada y esta ruta
        try{
            return Files.walk(this.root,1).filter(path -> !path.equals(this.root))
                    .map(this.root::relativize);
        }catch (RuntimeException | IOException e){
            throw new RuntimeException("No se pueden cargar los archivos ");
        }
    }

    @Override
    public String deleteFile(String filename){
        try {
            Boolean delete = Files.deleteIfExists(this.root.resolve(filename));
                return "Borrado";
        }catch (IOException e){
            e.printStackTrace();
            return "Error Borrando ";
        }
    }
    
    //-------------------------------Segunda Carpeta----------------------------------------------
    @Override
	public void guardar(MultipartFile file) throws Exception {
		Files.copy(file.getInputStream(), this.carpeta.resolve(file.getOriginalFilename()));
	}
    
    //@Override
//    public void guardar(MultipartFile file) {
//        try {
//            //copy (que queremos copiar, a donde queremos copiar)
//            Files.copy(file.getInputStream(), 
//                       this.carpeta.resolve(file.getOriginalFilename()));
//        } catch (IOException e) {
//            throw new RuntimeException("No se puede guardar el archivo. Error " + e.getMessage());
//        }
//    }

    @Override
	public void guardar(List<MultipartFile> files) throws Exception {
		for (MultipartFile file : files) {
			this.guardar(file);
		}
	}

    @Override
    public Resource listarUno(String filename) {
        try {
            Path file = carpeta.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if(resource.exists() || resource.isReadable()){
                return resource;
            }else{
                throw new RuntimeException("No se puede leer el archivo ");
            }

        }catch (MalformedURLException e){
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> listarTodos(){
        //Files.walk recorre nuestras carpetas (uploads) buscando los archivos
        // el 1 es la profundidad o nivel que queremos recorrer
        // :: Referencias a metodos
        // Relativize sirve para crear una ruta relativa entre la ruta dada y esta ruta
        try{
            return Files.walk(this.carpeta,1).filter(path -> !path.equals(this.carpeta))
                    .map(this.carpeta::relativize);
        }catch (RuntimeException | IOException e){
            throw new RuntimeException("No se pueden cargar los archivos ");
        }
    }

    @Override
    public String eliminar(String filename){
        try {
            Boolean delete = Files.deleteIfExists(this.carpeta.resolve(filename));
                return "Borrado";
        }catch (IOException e){
            e.printStackTrace();
            return "Error Borrando ";
        }
    }
    
  //---------------------------------------Tercera Carpeta---------------------------------------------
    @Override
	public void guardarImagen(MultipartFile file) throws Exception {
		Files.copy(file.getInputStream(), this.imagenes.resolve(file.getOriginalFilename()));
	}
    
    @Override
	public void guardarImagen(List<MultipartFile> files) throws Exception {
		for (MultipartFile file : files) {
			this.guardarImagen(file);
		}
	}

	@Override
	public Resource listarImagen(String filename) {
	    try {
	        Path file = imagenes.resolve(filename);
	        Resource resource = new UrlResource(file.toUri());
	
	        if(resource.exists() || resource.isReadable()){
	            return resource;
	        }else{
	            throw new RuntimeException("No se puede leer el archivo ");
	        }
	
	    }catch (MalformedURLException e){
	        throw new RuntimeException("Error: " + e.getMessage());
	    }
	}
	
	@Override
	public Stream<Path> listarImagenes(){
	    //Files.walk recorre nuestras carpetas (uploads) buscando los archivos
	    // el 1 es la profundidad o nivel que queremos recorrer
	    // :: Referencias a metodos
	    // Relativize sirve para crear una ruta relativa entre la ruta dada y esta ruta
	    try{
	        return Files.walk(this.imagenes,1).filter(path -> !path.equals(this.imagenes))
	                .map(this.imagenes::relativize);
	    }catch (RuntimeException | IOException e){
	        throw new RuntimeException("No se pueden cargar los archivos ");
	    }
	}
	
	@Override
	public String eliminarImagen(String filename){
	    try {
	        Boolean delete = Files.deleteIfExists(this.imagenes.resolve(filename));
	            return "Borrado";
	    }catch (IOException e){
	        e.printStackTrace();
	        return "Error Borrando ";
	    }
	}
	
	//---------------------------------------Cuarta Carpeta---------------------------------------------
    @Override
	public void guardarFirma(MultipartFile file) throws Exception {
		Files.copy(file.getInputStream(), this.firmas.resolve(file.getOriginalFilename()));
	}
    
    @Override
	public void guardarFirma(List<MultipartFile> files) throws Exception {
		for (MultipartFile file : files) {
			this.guardarFirma(file);
		}
	}

	@Override
	public Resource listarFirma(String filename) {
	    try {
	        Path file = firmas.resolve(filename);
	        Resource resource = new UrlResource(file.toUri());
	
	        if(resource.exists() || resource.isReadable()){
	            return resource;
	        }else{
	            throw new RuntimeException("No se puede leer el archivo ");
	        }
	
	    }catch (MalformedURLException e){
	        throw new RuntimeException("Error: " + e.getMessage());
	    }
	}
	
	@Override
	public Stream<Path> listarFirmas(){
	    //Files.walk recorre nuestras carpetas (uploads) buscando los archivos
	    // el 1 es la profundidad o nivel que queremos recorrer
	    // :: Referencias a metodos
	    // Relativize sirve para crear una ruta relativa entre la ruta dada y esta ruta
	    try{
	        return Files.walk(this.firmas,1).filter(path -> !path.equals(this.firmas))
	                .map(this.firmas::relativize);
	    }catch (RuntimeException | IOException e){
	        throw new RuntimeException("No se pueden cargar los archivos ");
	    }
	}
	
	@Override
	public String eliminarFirma(String filename){
	    try {
	        Boolean delete = Files.deleteIfExists(this.firmas.resolve(filename));
	            return "Borrado";
	    }catch (IOException e){
	        e.printStackTrace();
	        return "Error Borrando ";
	    }
	}
	
	//----------------------------------Quinta Carpeta-----------------------------------------
	
	@Override
	public void guardarImagenSolicitudList(MultipartFile file) throws Exception {
		Files.copy(file.getInputStream(), this.imagenesSolicitud.resolve(file.getOriginalFilename()));//nombre
	}
    
    @Override
	public void guardarImagenSolicitudList(List<MultipartFile> files) throws Exception {
		for (MultipartFile file : files) {
			this.guardarImagenSolicitudList(file);
		}
	}

	@Override
	public Resource listarUnaImagenSolicitud(String filename) {
	    try {
	        Path file = imagenesSolicitud.resolve(filename);//nombre
	        Resource resource = new UrlResource(file.toUri());
	
	        if(resource.exists() || resource.isReadable()){
	            return resource;
	        }else{
	            throw new RuntimeException("No se puede leer el archivo ");
	        }
	
	    }catch (MalformedURLException e){
	        throw new RuntimeException("Error: " + e.getMessage());
	    }
	}
	
	@Override
	public Stream<Path> listarTodoImagenSolicitud(){
	    //Files.walk recorre nuestras carpetas (uploads) buscando los archivos
	    // el 1 es la profundidad o nivel que queremos recorrer
	    // :: Referencias a metodos
	    // Relativize sirve para crear una ruta relativa entre la ruta dada y esta ruta
	    try{
	        return Files.walk(this.imagenesSolicitud,1).filter(path -> !path.equals(this.imagenesSolicitud))//nombre
	                .map(this.imagenesSolicitud::relativize);//nombre
	    }catch (RuntimeException | IOException e){
	        throw new RuntimeException("No se pueden cargar los archivos ");
	    }
	}
	
	@Override
	public String eliminarImagenSolicitud(String filename){
	    try {
	        Boolean delete = Files.deleteIfExists(this.imagenesSolicitud.resolve(filename));//nombre
	            return "Borrado";
	    }catch (IOException e){
	        e.printStackTrace();
	        return "Error Borrando ";
	    }
	}

}