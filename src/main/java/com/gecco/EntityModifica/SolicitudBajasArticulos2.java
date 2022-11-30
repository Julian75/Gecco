package com.gecco.EntityModifica;

import java.sql.Date;

public class SolicitudBajasArticulos2 {

	Long id;
	Date fecha;
	Long usuario_autorizacion;
	Long usuario_confirmacion;
	Long id_usuario;
	Long id_estado;
	String estado_contabilidad;
	
	public SolicitudBajasArticulos2() {
		super();
	}

	public SolicitudBajasArticulos2(Long id, Date fecha, Long usuario_autorizacion, Long usuario_confirmacion,
			Long id_usuario, Long id_estado, String estado_contabilidad) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.usuario_autorizacion = usuario_autorizacion;
		this.usuario_confirmacion = usuario_confirmacion;
		this.id_usuario = id_usuario;
		this.id_estado = id_estado;
		this.estado_contabilidad = estado_contabilidad;
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

	public Long getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}

	public Long getId_estado() {
		return id_estado;
	}

	public void setId_estado(Long id_estado) {
		this.id_estado = id_estado;
	}

	public Long getUsuario_autorizacion() {
		return usuario_autorizacion;
	}

	public void setUsuario_autorizacion(Long usuario_autorizacion) {
		this.usuario_autorizacion = usuario_autorizacion;
	}

	public Long getUsuario_confirmacion() {
		return usuario_confirmacion;
	}

	public void setUsuario_confirmacion(Long usuario_confirmacion) {
		this.usuario_confirmacion = usuario_confirmacion;
	}

	public String getEstado_contabilidad() {
		return estado_contabilidad;
	}

	public void setEstado_contabilidad(String estado_contabilidad) {
		this.estado_contabilidad = estado_contabilidad;
	}
	
}
