package com.gecco.EntityModifica;

public class AsignacionActivoConsulta {

	Long ideAsignacion;
	String articulo;
	String nombreUsuario;
	String apellidoUsuario;
	String tipoProceso;
	String serial;
	String placa;
	String estadoAsignacion;
	Long ideDetalleActivo;
	Long ideEstadoAsignacion;
	
	public AsignacionActivoConsulta() {
		super();
	}

	public AsignacionActivoConsulta(Long ideAsignacion, String articulo, String nombreUsuario, String apellidoUsuario,
			String tipoProceso, String serial, String placa, String estadoAsignacion, Long ideDetalleActivo,
			Long ideEstadoAsignacion) {
		super();
		this.ideAsignacion = ideAsignacion;
		this.articulo = articulo;
		this.nombreUsuario = nombreUsuario;
		this.apellidoUsuario = apellidoUsuario;
		this.tipoProceso = tipoProceso;
		this.serial = serial;
		this.placa = placa;
		this.estadoAsignacion = estadoAsignacion;
		this.ideDetalleActivo = ideDetalleActivo;
		this.ideEstadoAsignacion = ideEstadoAsignacion;
	}


	public Long getIdeAsignacion() {
		return ideAsignacion;
	}

	public void setIdeAsignacion(Long ideAsignacion) {
		this.ideAsignacion = ideAsignacion;
	}

	public String getArticulo() {
		return articulo;
	}

	public void setArticulo(String articulo) {
		this.articulo = articulo;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getApellidoUsuario() {
		return apellidoUsuario;
	}

	public void setApellidoUsuario(String apellidoUsuario) {
		this.apellidoUsuario = apellidoUsuario;
	}

	public String getTipoProceso() {
		return tipoProceso;
	}

	public void setTipoProceso(String tipoProceso) {
		this.tipoProceso = tipoProceso;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getEstadoAsignacion() {
		return estadoAsignacion;
	}

	public void setEstadoAsignacion(String estadoAsignacion) {
		this.estadoAsignacion = estadoAsignacion;
	}

	public Long getIdeDetalleActivo() {
		return ideDetalleActivo;
	}

	public void setIdeDetalleActivo(Long ideDetalleActivo) {
		this.ideDetalleActivo = ideDetalleActivo;
	}

	public Long getIdeEstadoAsignacion() {
		return ideEstadoAsignacion;
	}

	public void setIdeEstadoAsignacion(Long ideEstadoAsignacion) {
		this.ideEstadoAsignacion = ideEstadoAsignacion;
	}
	
}
