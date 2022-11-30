package com.gecco.Service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface IPdfService {

    /*
    Metodo para crear la carpeta donde vamos a guardar los archivos
     */
//    public void init();

    /*
    Metodo para guardar los archivos
     */
	public void save(MultipartFile file) throws Exception;
    public void save(List<MultipartFile> files) throws Exception;
    public void guardar(MultipartFile file) throws Exception;
    public void guardar(List<MultipartFile> files) throws Exception;
    public void guardarImagen(MultipartFile file) throws Exception;
    public void guardarImagen(List<MultipartFile> files) throws Exception;
    public void guardarFirma(MultipartFile file) throws Exception;
    public void guardarFirma(List<MultipartFile> files) throws Exception;
    public void guardarImagenSolicitudList(MultipartFile file) throws Exception;
    public void guardarImagenSolicitudList(List<MultipartFile> files) throws Exception; //Solicitud Autorización premios

    /*
    Metodo para cargar un archivo
     */
    public Resource load(String filename);
    public Resource listarUno(String filename);
    public Resource listarImagen(String filename);
    public Resource listarFirma(String filename);
    public Resource listarUnaImagenSolicitud(String filename);

    /*
    Metodo para Cargar todos los archivos
     */
    public Stream<Path> loadAll();
    public Stream<Path> listarTodos();
    public Stream<Path> listarImagenes();
    public Stream<Path> listarFirmas();
    public Stream<Path> listarTodoImagenSolicitud();

    /*
    Metodo para Borrar un archivo
     */
    public String deleteFile(String filename);
    public String eliminar(String filename);
    public String eliminarImagen(String filename);
    public String eliminarFirma(String filename);
    public String eliminarImagenSolicitud(String filename);
    
}