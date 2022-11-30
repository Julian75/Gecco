package com.gecco.EntityModifica;

public class GestionProceso2 {
	
	Long id;
	Long idProceso;
	String comentario;
	Long idEstado;
	Long idUsuario;
	Long idDetalleSolicitud;
	
	public GestionProceso2() {
		super();
	}

	public GestionProceso2(Long id, Long idProceso, String comentario, Long idEstado, Long idUsuario,
			Long idDetalleSolicitud) {
		super();
		this.id = id;
		this.idProceso = idProceso;
		this.comentario = comentario;
		this.idEstado = idEstado;
		this.idUsuario = idUsuario;
		this.idDetalleSolicitud = idDetalleSolicitud;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdProceso() {
		return idProceso;
	}

	public void setIdProceso(Long idProceso) {
		this.idProceso = idProceso;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Long getIdDetalleSolicitud() {
		return idDetalleSolicitud;
	}

	public void setIdDetalleSolicitud(Long idDetalleSolicitud) {
		this.idDetalleSolicitud = idDetalleSolicitud;
	}
	
}