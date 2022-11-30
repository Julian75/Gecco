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
@Table(name = "eliminacionTurnoVendedor")
public class EliminacionTurnVen implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "observacion", columnDefinition = "LONGTEXT", nullable = false)
	private String observacion;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_asignar_turno_vendedor", nullable = false)
	private AsignarTurnoVendedor idAsignarTurnoVendedor;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;
	
	@Column(name = "estado", length = 50, nullable = false)
	private String estado;

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
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
	
}