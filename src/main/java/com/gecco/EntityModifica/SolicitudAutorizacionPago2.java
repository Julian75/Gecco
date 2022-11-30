package com.gecco.EntityModifica;

import java.sql.Date;
import java.sql.Timestamp;

public class SolicitudAutorizacionPago2 {
	Long id;
	java.sql.Timestamp fecha;
	Integer idOficina;
	String nombreOficiona;
	Long idUsuario;
	Long idMotivoAutorizacionPago;
	Long idDatosFormularioPago;
	public SolicitudAutorizacionPago2() { 
		super();
	}
	public SolicitudAutorizacionPago2(Long id, Timestamp fecha, Integer idOficina, String nombreOficiona,
			Long idUsuario, Long idMotivoAutorizacionPago, Long idDatosFormularioPago) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.idOficina = idOficina;
		this.nombreOficiona = nombreOficiona;
		this.idUsuario = idUsuario;
		this.idMotivoAutorizacionPago = idMotivoAutorizacionPago;
		this.idDatosFormularioPago = idDatosFormularioPago;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public java.sql.Timestamp getFecha() {
		return fecha;
	}
	public void setFecha(java.sql.Timestamp fecha) {
		this.fecha = fecha;
	}
	public Integer getIdOficina() {
		return idOficina;
	}
	public void setIdOficina(Integer idOficina) {
		this.idOficina = idOficina;
	}
	public String getNombreOficiona() {
		return nombreOficiona;
	}
	public void setNombreOficiona(String nombreOficiona) {
		this.nombreOficiona = nombreOficiona;
	}
	public Long getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	public Long getIdMotivoAutorizacionPago() {
		return idMotivoAutorizacionPago;
	}
	public void setIdMotivoAutorizacionPago(Long idMotivoAutorizacionPago) {
		this.idMotivoAutorizacionPago = idMotivoAutorizacionPago;
	}
	public Long getIdDatosFormularioPago() {
		return idDatosFormularioPago;
	}
	public void setIdDatosFormularioPago(Long idDatosFormularioPago) {
		this.idDatosFormularioPago = idDatosFormularioPago;
	}
	
	
}
