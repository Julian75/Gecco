package com.gecco.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cotizacionPdf")
public class CotizacionPdf implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_cotizacion", nullable = false)
	private Cotizacion idCotizacion;

	@Column(name = "nombre_pdf", length = 255, nullable = false)
	private String nombrePdf;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cotizacion getIdCotizacion() {
		return idCotizacion;
	}

	public void setIdCotizacion(Cotizacion idCotizacion) {
		this.idCotizacion = idCotizacion;
	}

	public String getNombrePdf() {
		return nombrePdf;
	}

	public void setNombrePdf(String nombrePdf) {
		this.nombrePdf = nombrePdf;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}
	
}