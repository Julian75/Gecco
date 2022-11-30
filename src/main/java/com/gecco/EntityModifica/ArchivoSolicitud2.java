package com.gecco.EntityModifica;

public class ArchivoSolicitud2 {
	Long id;
	String nombreArchivo;
	Long id_solicitudsc;
	
	public ArchivoSolicitud2() {
		super();
	}

	public ArchivoSolicitud2(Long id, String nombreArchivo, Long id_solicitudsc) {
		super();
		this.id = id;
		this.nombreArchivo = nombreArchivo;
		this.id_solicitudsc = id_solicitudsc;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreArchivo() {
		return nombreArchivo;
	}

	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}

	public Long getId_solicitudsc() {
		return id_solicitudsc;
	}

	public void setId_solicitudsc(Long id_solicitudsc) {
		this.id_solicitudsc = id_solicitudsc;
	}
	
	
	
}