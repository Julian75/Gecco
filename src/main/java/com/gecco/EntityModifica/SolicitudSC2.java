package com.gecco.EntityModifica;

import java.sql.Date;

public class SolicitudSC2 {

	Long id;
	Date fecha;
	Date vence;
	String municipio;
	String incidente;
	Long idMotivoSolicitud;
	String medioRadicacion;
	Long idTipoServicio;
	String auxiliarRadicacion;
	Long idEscalaSolicitudes;
	Long idEstado;
	Long idClienteSC;
	String prorroga;
	String personaInvolucrada;
	String personaAfectada;

	public SolicitudSC2() {
		super();
	}

	public SolicitudSC2(Long id, Date fecha, Date vence, String municipio, String incidente, Long idMotivoSolicitud,
			String medioRadicacion, Long idTipoServicio, String auxiliarRadicacion, Long idEscalaSolicitudes,
			Long idEstado, Long idClienteSC, String prorroga, String personaInvolucrada, String personaAfectada) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.vence = vence;
		this.municipio = municipio;
		this.incidente = incidente;
		this.idMotivoSolicitud = idMotivoSolicitud;
		this.medioRadicacion = medioRadicacion;
		this.idTipoServicio = idTipoServicio;
		this.auxiliarRadicacion = auxiliarRadicacion;
		this.idEscalaSolicitudes = idEscalaSolicitudes;
		this.idEstado = idEstado;
		this.idClienteSC = idClienteSC;
		this.prorroga = prorroga;
		this.personaInvolucrada = personaInvolucrada;
		this.personaAfectada = personaAfectada;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Date getVence() {
		return vence;
	}

	public void setVence(Date vence) {
		this.vence = vence;
	}

	public String getMunicipio() {
		return municipio;
	}

	public void setMunicipio(String municipio) {
		this.municipio = municipio;
	}

	public String getIncidente() {
		return incidente;
	}

	public void setIncidente(String incidente) {
		this.incidente = incidente;
	}

	public Long getIdMotivoSolicitud() {
		return idMotivoSolicitud;
	}

	public void setIdMotivoSolicitud(Long idMotivoSolicitud) {
		this.idMotivoSolicitud = idMotivoSolicitud;
	}

	public String getMedioRadicacion() {
		return medioRadicacion;
	}

	public void setMedioRadicacion(String medioRadicacion) {
		this.medioRadicacion = medioRadicacion;
	}

	public Long getIdTipoServicio() {
		return idTipoServicio;
	}

	public void setIdTipoServicio(Long idTipoServicio) {
		this.idTipoServicio = idTipoServicio;
	}

	public String getAuxiliarRadicacion() {
		return auxiliarRadicacion;
	}

	public void setAuxiliarRadicacion(String auxiliarRadicacion) {
		this.auxiliarRadicacion = auxiliarRadicacion;
	}

	public Long getIdEscalaSolicitudes() {
		return idEscalaSolicitudes;
	}

	public void setIdEscalaSolicitudes(Long idEscalaSolicitudes) {
		this.idEscalaSolicitudes = idEscalaSolicitudes;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdClienteSC() {
		return idClienteSC;
	}

	public void setIdClienteSC(Long idClienteSC) {
		this.idClienteSC = idClienteSC;
	}

	public String getProrroga() {
		return prorroga;
	}

	public void setProrroga(String prorroga) {
		this.prorroga = prorroga;
	}

	public String getPersonaInvolucrada() {
		return personaInvolucrada;
	}

	public void setPersonaInvolucrada(String personaInvolucrada) {
		this.personaInvolucrada = personaInvolucrada;
	}

	public String getPersonaAfectada() {
		return personaAfectada;
	}

	public void setPersonaAfectada(String personaAfectada) {
		this.personaAfectada = personaAfectada;
	}
	
}
