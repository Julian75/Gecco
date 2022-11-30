package com.gecco.EntityModifica;

public class CotizacionPdf2 {

	Long id;
	Long idCotizacion;
	String nombrePdf;
	Long idEstado;
	
	public CotizacionPdf2() {
		super();
	}

	public CotizacionPdf2(Long id, Long idCotizacion, String nombrePdf, Long idEstado) {
		super();
		this.id = id;
		this.idCotizacion = idCotizacion;
		this.nombrePdf = nombrePdf;
		this.idEstado = idEstado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdCotizacion() {
		return idCotizacion;
	}

	public void setIdCotizacion(Long idCotizacion) {
		this.idCotizacion = idCotizacion;
	}

	public String getNombrePdf() {
		return nombrePdf;
	}

	public void setNombrePdf(String nombrePdf) {
		this.nombrePdf = nombrePdf;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}
	
}