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
@Table(name = "archivoSolicitud")
public class ArchivoSolicitud implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombreArchivo", length = 250, nullable = false)
	private String nombreArchivo;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_solicitudsc", nullable = false)
	private SolicitudSC idSolicitudSC;

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

	public SolicitudSC getIdSolicitudSC() {
		return idSolicitudSC;
	}

	public void setIdSolicitudSC(SolicitudSC idSolicitudSC) {
		this.idSolicitudSC = idSolicitudSC;
	}

}