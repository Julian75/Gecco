package com.gecco.EntityModifica;

public class Turnos2 {
	
	Long id;
	String descripcion;
	String horaInicio;
	String horaFinal;
	Long idEstado;
	Long idTipoTurno;
	
	public Turnos2() {
		super();
	}
	
	public Turnos2(Long id, String descripcion, String horaInicio, String horaFinal, Long idEstado, Long idTipoTurno) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.horaInicio = horaInicio;
		this.horaFinal = horaFinal;
		this.idEstado = idEstado;
		this.idTipoTurno = idTipoTurno;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public String getHoraInicio() {
		return horaInicio;
	}
	
	public void setHoraInicio(String horaInicio) {
		this.horaInicio = horaInicio;
	}
	
	public String getHoraFinal() {
		return horaFinal;
	}
	
	public void setHoraFinal(String horaFinal) {
		this.horaFinal = horaFinal;
	}
	
	public Long getIdEstado() {
		return idEstado;
	}
	
	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}
	
	public Long getIdTipoTurno() {
		return idTipoTurno;
	}
	
	public void setIdTipoTurno(Long idTipoTurno) {
		this.idTipoTurno = idTipoTurno;
	}
	
	
}