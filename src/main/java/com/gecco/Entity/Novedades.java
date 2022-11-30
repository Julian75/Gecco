package com.gecco.Entity;

import java.io.Serializable;
import java.sql.Date;

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
@Table(name = "novedades")
public class Novedades implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "observacion", columnDefinition = "LONGTEXT", nullable = false)
	private String observacion;
	
	@Column(name = "tipoMalla", length = 100, nullable = false)
	private String tipoMalla;
	
	@Column(name = "estado", length = 60, nullable = false)
	private String estado;
	
	@Column(name = "hora", length = 100, nullable = false)
	private String hora;
	
	@Column(name = "fecha", length = 30, nullable = false)
	private Date fecha;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_asignar_turno_vendedor", nullable = false)
	private AsignarTurnoVendedor idAsignarTurnoVendedor;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_tipo_novedad", nullable = false)
	private TipoNovedades idTipoNovedad;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;

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

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public AsignarTurnoVendedor getIdAsignarTurnoVendedor() {
		return idAsignarTurnoVendedor;
	}

	public void setIdAsignarTurnoVendedor(AsignarTurnoVendedor idAsignarTurnoVendedor) {
		this.idAsignarTurnoVendedor = idAsignarTurnoVendedor;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}

	public TipoNovedades getIdTipoNovedad() {
		return idTipoNovedad;
	}

	public void setIdTipoNovedad(TipoNovedades idTipoNovedad) {
		this.idTipoNovedad = idTipoNovedad;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getTipoMalla() {
		return tipoMalla;
	}

	public void setTipoMalla(String tipoMalla) {
		this.tipoMalla = tipoMalla;
	}
	
	
	
}
