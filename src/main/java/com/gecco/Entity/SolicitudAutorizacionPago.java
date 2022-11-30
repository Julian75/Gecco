package com.gecco.Entity;
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
@Table(name = "SolicitudAutorizacionPago")
public class SolicitudAutorizacionPago {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//fecha actual mas la hora y minutos
	@Column(name = "fecha")
	private java.sql.Timestamp fecha; 
	
	@Column(name = "id_oficina", nullable = false)
	private int idOficina;
	
	@Column(name = "nombre_oficina", columnDefinition = "LONGTEXT", nullable = false)
	private String nombreOficiona;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario idUsuario;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_motivo_autorizacion_pago", nullable = false)
	private MotivoAutorizacionPago idMotivoAutorizacionPago;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_datos_formulario_pago", nullable = false)
	private DatosFormularioPago idDatosFormularioPago;

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

	public int getIdOficina() {
		return idOficina;
	}

	public void setIdOficina(int idOficina) {
		this.idOficina = idOficina;
	}

	public String getNombreOficiona() {
		return nombreOficiona;
	}

	public void setNombreOficiona(String nombreOficiona) {
		this.nombreOficiona = nombreOficiona;
	}

	public Usuario getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}

	public MotivoAutorizacionPago getIdMotivoAutorizacionPago() {
		return idMotivoAutorizacionPago;
	}

	public void setIdMotivoAutorizacionPago(MotivoAutorizacionPago idMotivoAutorizacionPago) {
		this.idMotivoAutorizacionPago = idMotivoAutorizacionPago;
	}

	public DatosFormularioPago getIdDatosFormularioPago() {
		return idDatosFormularioPago;
	}

	public void setIdDatosFormularioPago(DatosFormularioPago idDatosFormularioPago) {
		this.idDatosFormularioPago = idDatosFormularioPago;
	}
}	
