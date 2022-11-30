package com.gecco.EntityModifica;

import com.gecco.Entity.Usuario;

public class Historial2 {
	Long id;
	String observacion;
	Long idUsuario;
	Long id_solicitud_sc;
	Long idEstado;
	
	
	
	public Historial2() {
		super();
	}
	
	
	public Historial2(Long id, String observacion, Long idUsuario, Long id_solicitud_sc, Long idEstado) {
		super();
		this.id = id;
		this.observacion = observacion;
		this.idUsuario = idUsuario;
		this.id_solicitud_sc = id_solicitud_sc;
		this.idEstado = idEstado;
	}
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getObservacion() {
		return observacion;
	}
	
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	
	public Long getIdUsuario() {
		return idUsuario;
	}
	
	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	
	
	public Long getId_solicitud_sc() {
		return id_solicitud_sc;
	}
	
	
	public void setId_solicitud_sc(Long id_solicitud_sc) {
		this.id_solicitud_sc = id_solicitud_sc;
	}
	
	
	public Long getIdEstado() {
		return idEstado;
	}
	
	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}



}