package com.gecco.ServiceImplement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.gecco.EntityModifica.Area2;
import com.gecco.EntityModifica.Articulos2;
import com.gecco.EntityModifica.ArticulosBaja2;
import com.gecco.EntityModifica.AsignacionPuntoVentaArticulo2;
import com.gecco.EntityModifica.AsignacionUsuarioPQRS2;
import com.gecco.EntityModifica.AsignacionesArticulos2;
import com.gecco.EntityModifica.AsignacionesProcesos2;
import com.gecco.EntityModifica.AsignarTurno2;
import com.gecco.EntityModifica.AsignarTurnoVendedor2;
import com.gecco.EntityModifica.Categoria2;
import com.gecco.EntityModifica.ClienteAutorizacionPago2;
import com.gecco.EntityModifica.ClienteSC2;
import com.gecco.EntityModifica.Compras2;
import com.gecco.EntityModifica.Configuracion2;
import com.gecco.EntityModifica.Cotizacion2;
import com.gecco.EntityModifica.CotizacionPdf2;
import com.gecco.EntityModifica.Cuenta2;
import com.gecco.EntityModifica.DatosFormularioPago2;
import com.gecco.EntityModifica.DetalleArticulo2;
import com.gecco.EntityModifica.DetalleSolicitud2;
import com.gecco.EntityModifica.ElementosVisita2;
import com.gecco.EntityModifica.EliminacionTurnVen2;
import com.gecco.EntityModifica.EscalaSolicitudes2;
import com.gecco.EntityModifica.GestionProceso2;
import com.gecco.EntityModifica.Historial2;
import com.gecco.EntityModifica.HistorialArticulo2;
import com.gecco.EntityModifica.IngresoPersonalEmpresa2;
import com.gecco.EntityModifica.Inventario2;
import com.gecco.EntityModifica.Jerarquia2;
import com.gecco.EntityModifica.JerarquiaCuentas2;
import com.gecco.EntityModifica.LibroMayor2;
import com.gecco.EntityModifica.MatrizNecesidad2;
import com.gecco.EntityModifica.MatrizNecesidadDetalle2;
import com.gecco.EntityModifica.MediosRadiacion2;
import com.gecco.EntityModifica.Modulo2;
import com.gecco.EntityModifica.MotivoAutorizacionPago2;
import com.gecco.EntityModifica.MotivoSolicitud2;
import com.gecco.EntityModifica.MovimientoComprasInventario2;
import com.gecco.EntityModifica.OpcionArticuloBaja2;
import com.gecco.EntityModifica.OpcionesVisita2;
import com.gecco.EntityModifica.OrdenCompra2;
import com.gecco.EntityModifica.PeriodoEjecucion2;
import com.gecco.EntityModifica.PorcentajePresupuesto2;
import com.gecco.EntityModifica.PresupuestoContable2;
import com.gecco.EntityModifica.Proceso2;
import com.gecco.EntityModifica.Proveedor2;
import com.gecco.EntityModifica.Rol2;
import com.gecco.EntityModifica.Sede2;
import com.gecco.EntityModifica.Solicitud2;
import com.gecco.EntityModifica.SolicitudAutorizacionPago2;
import com.gecco.EntityModifica.SolicitudBajasArticulos2;
import com.gecco.EntityModifica.SolicitudSC2;
import com.gecco.EntityModifica.SubProceso2;
import com.gecco.EntityModifica.TipoActivo2;
import com.gecco.EntityModifica.TipoDocumento2;
import com.gecco.EntityModifica.TipoNecesidad2;
import com.gecco.EntityModifica.TipoNovedades2;
import com.gecco.EntityModifica.TipoServicio2;
import com.gecco.EntityModifica.TipoTurno2;
import com.gecco.EntityModifica.TiposProcesos2;
import com.gecco.EntityModifica.Turnos2;
import com.gecco.EntityModifica.Usuario2;
import com.gecco.Service.IModificarService;

@Repository
public class ModificarServiceImplement implements IModificarService{

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
//	Asignar Turno Vendedor
	@Override
	  public AsignarTurnoVendedor2 findByIdVendedor(Long id) {
	    try {
	    	AsignarTurnoVendedor2 turnoVendedor = jdbcTemplate.queryForObject("SELECT * FROM asignar_turno_vendedor WHERE id=?",
	          BeanPropertyRowMapper.newInstance(AsignarTurnoVendedor2.class), id);
	      return turnoVendedor;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarAsignarTurnoVendedor(AsignarTurnoVendedor2 turnoVendedor) {
	    return jdbcTemplate.update("UPDATE asignar_turno_vendedor SET id_oficina = ?, id_sitio_venta = ?, id_vendedor = ?, nombre_oficina = ?, nombre_sitio_venta = ?, nombre_vendedor = ?, fecha_final = ?, fecha_inicio = ?, id_turno = ?, ide_subzona = ?, estado = ? WHERE id = ?",
	        new Object[] { turnoVendedor.getIdOficina(), turnoVendedor.getIdSitioVenta(), turnoVendedor.getIdVendedor(), turnoVendedor.getNombreOficina(), turnoVendedor.getNombreSitioVenta(), turnoVendedor.getNombreVendedor(), turnoVendedor.getFechaFinal(), turnoVendedor.getFechaInicio(), turnoVendedor.getIdTurno(), turnoVendedor.getIdeSubzona(), turnoVendedor.getEstado(), turnoVendedor.getId() });
	  }

//	Eliminacion
	@Override
	  public EliminacionTurnVen2 findByIdEliminacion(Long id) {
	    try {
	    	EliminacionTurnVen2 eliminacion = jdbcTemplate.queryForObject("SELECT * FROM eliminacion_turno_vendedor WHERE id=?",
	          BeanPropertyRowMapper.newInstance(EliminacionTurnVen2.class), id);
	      return eliminacion;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarEliminacion(EliminacionTurnVen2 eliminacion) {
	    return jdbcTemplate.update("UPDATE eliminacion_turno_vendedor SET observacion = ?, id_asignar_turno_vendedor = ?, id_usuario = ?, estado = ? WHERE id = ?",
	        new Object[] { eliminacion.getObservacion(), eliminacion.getIdAsignarTurnoVendedor(), eliminacion.getIdUsuario(), eliminacion.getEstado(), eliminacion.getId() });
	  }
	
//	Usuario
	@Override
	  public Usuario2 findByIdUsuario(Long id) {
	    try {
	    	Usuario2 usuario = jdbcTemplate.queryForObject("SELECT * FROM usuario WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Usuario2.class), id);
	      return usuario;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarUsuario(Usuario2 usuario) {
	    return jdbcTemplate.update("UPDATE usuario SET apellido = ?, correo = ?, documento = ?, nombre = ?, id_estado = ?, id_rol = ?, id_tipodocumento = ?, password = ?, ide_oficina = ?, ide_subzona = ? WHERE id = ?",
	        new Object[] { usuario.getApellido(), usuario.getCorreo(), usuario.getDocumento(), usuario.getNombre(), usuario.getIdEstado(), usuario.getIdRol(), usuario.getIdTipoDocumento(), usuario.getPassword(), usuario.getIdeOficina(), usuario.getIdeSubzona(), usuario.getId() });
	  }
	
//	Articulos
	@Override
	  public Articulos2 findByIdArticulos(Long id) {
	    try {
	    	Articulos2 articulos = jdbcTemplate.queryForObject("SELECT * FROM articulos WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Articulos2.class), id);
	      return articulos;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarArticulos(Articulos2 articulos) {
	    return jdbcTemplate.update("UPDATE articulos SET descripcion = ?, id_estado = ?, id_categoria = ? WHERE id = ?",
	        new Object[] { articulos.getDescripcion(), articulos.getIdEstado(), articulos.getIdCategoria(), articulos.getId() });
	  }
	
//	Categoria
	@Override
	  public Categoria2 findByIdCategorias(Long id) {
	    try {
	    	Categoria2 categorias = jdbcTemplate.queryForObject("SELECT * FROM categoria WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Categoria2.class), id);
	      return categorias;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarCategorias(Categoria2 categorias) {
	    return jdbcTemplate.update("UPDATE categoria SET descripcion = ?, id_estado = ? WHERE id = ?",
	        new Object[] { categorias.getDescripcion(), categorias.getIdEstado(), categorias.getId() });
	  }
	
//	Cotizacion
	@Override
	  public Cotizacion2 findByIdCotizacion(Long id) {
	    try {
	    	Cotizacion2 cotizacion = jdbcTemplate.queryForObject("SELECT * FROM cotizacion WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Cotizacion2.class), id);
	      return cotizacion;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarCotizacion(Cotizacion2 cotizacion) {
	    return jdbcTemplate.update("UPDATE cotizacion SET id_estado = ?, id_solicitud = ?, id_usuario = ? WHERE id = ?",
	        new Object[] { cotizacion.getIdEstado(), cotizacion.getIdSolicitud(), cotizacion.getIdUsuario(), cotizacion.getId() });
	  }

//	CotizacionPdf
	@Override
	  public CotizacionPdf2 findByIdCotizacionPdf(Long id) {
	    try {
	    	CotizacionPdf2 cotizacionPdf = jdbcTemplate.queryForObject("SELECT * FROM cotizacion_pdf WHERE id=?",
	          BeanPropertyRowMapper.newInstance(CotizacionPdf2.class), id);
	      return cotizacionPdf;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarCotizacionPdf(CotizacionPdf2 cotizacionPdf) {
	    return jdbcTemplate.update("UPDATE cotizacion_pdf SET nombre_pdf = ?, id_cotizacion = ?, id_estado = ? WHERE id = ?",
	        new Object[] { cotizacionPdf.getNombrePdf(), cotizacionPdf.getIdCotizacion(), cotizacionPdf.getIdEstado(), cotizacionPdf.getId() });
	  }
	
//	DetalleSolicitud
	@Override
	  public DetalleSolicitud2 findByIdDetalleSolicitud(Long id) {
	    try {
	    	DetalleSolicitud2 detalle = jdbcTemplate.queryForObject("SELECT * FROM detalle_solicitud WHERE id=?",
	          BeanPropertyRowMapper.newInstance(DetalleSolicitud2.class), id);
	      return detalle;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarDetalleSolicitud(DetalleSolicitud2 detalle) {
	    return jdbcTemplate.update("UPDATE detalle_solicitud SET cantidad = ?, observacion = ?, valor_total = ?, valor_unitario = ?, id_articulos = ?, id_estado = ?, id_solicitud = ? WHERE id = ?",
	        new Object[] { detalle.getCantidad(), detalle.getObservacion(), detalle.getValorTotal(), detalle.getValorUnitario(), detalle.getIdArticulos(), detalle.getIdEstado(), detalle.getIdSolicitud(), detalle.getId() });
	  }
	
//	Solicitud
	@Override
	  public Solicitud2 findByIdSolicitud(Long id) {
	    try {
	    	Solicitud2 solicitud = jdbcTemplate.queryForObject("SELECT * FROM solicitud WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Solicitud2.class), id);
	      return solicitud;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarSolicitud(Solicitud2 solicitud) {
	    return jdbcTemplate.update("UPDATE solicitud SET fecha = ?, id_estado = ?, id_usuario = ? WHERE id = ?",
	        new Object[] { solicitud.getFecha(), solicitud.getIdEstado(), solicitud.getIdUsuario(), solicitud.getId() });
	  }
	
//	Proveedor
	@Override
	  public Proveedor2 findByIdProveedor(Long id) {
	    try {
	    	Proveedor2 proveedor = jdbcTemplate.queryForObject("SELECT * FROM proveedor WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Proveedor2.class), id);
	      return proveedor;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarProveedor(Proveedor2 proveedor) {
	    return jdbcTemplate.update("UPDATE proveedor SET direccion = ?, documento= ?, nombre=?, observacion=?, telefono=?, id_estado=?, id_tipo_documento=? WHERE id=?",
	        new Object[] { proveedor.getDireccion(), proveedor.getDocumento(), proveedor.getNombre(), proveedor.getObservacion(), proveedor.getTelefono(), proveedor.getIdEstado(), proveedor.getIdTipoDocumento(), proveedor.getId() });
	  }
	
//	Gestion Proceso
	@Override
	  public GestionProceso2 findByIdGestionProceso(Long id) {
	    try {
	    	GestionProceso2 gestionproceso = jdbcTemplate.queryForObject("SELECT * FROM gestion_proceso WHERE id=?",
	          BeanPropertyRowMapper.newInstance(GestionProceso2.class), id);
	      return gestionproceso;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarGestionProceso(GestionProceso2 gestionproceso) {
	    return jdbcTemplate.update("UPDATE gestion_proceso SET id_proceso = ?, comentario= ?, id_estado=?, id_usuario=?, id_detalle_solicitud=? WHERE id=?",
	        new Object[] { gestionproceso.getIdProceso(), gestionproceso.getComentario(), gestionproceso.getIdEstado(), gestionproceso.getIdUsuario(), gestionproceso.getIdDetalleSolicitud(), gestionproceso.getId() });
	  }
	
//	Orden Compra
	@Override
	  public OrdenCompra2 findByIdOrdenCompra(Long id) {
	    try {
	    	OrdenCompra2 ordencompra = jdbcTemplate.queryForObject("SELECT * FROM orden_compra WHERE id=?",
	          BeanPropertyRowMapper.newInstance(OrdenCompra2.class), id);
	      return ordencompra;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarOrdenCompra(OrdenCompra2 ordencompra) {
	    return jdbcTemplate.update("UPDATE orden_compra SET anticipo_porcentaje=?, valor_anticipo=?, id_estado=?, id_proveedor=?, id_solicitud=?, descuento=?, subtotal=?, id_usuario=? WHERE id=? ",
	        new Object[] { ordencompra.getAnticipoPorcentaje(), ordencompra.getValorAnticipo(), ordencompra.getIdEstado(), ordencompra.getIdProveedor() , ordencompra.getIdSolicitud(), ordencompra.getDescuento(), ordencompra.getSubtotal(), ordencompra.getIdUsuario(), ordencompra.getId() });
	  }
	
//	Proceso
	@Override
	  public Proceso2 findByIdProceso(Long id) {
	    try {
	    	Proceso2 proceso = jdbcTemplate.queryForObject("SELECT * FROM proceso WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Proceso2.class), id);
	      return proceso;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarProceso(Proceso2 proceso) {
	    return jdbcTemplate.update("UPDATE proceso SET id_categoria=?, id_usuario=? WHERE id=? ",
	        new Object[] { proceso.getIdCategoria(),proceso.getIdUsuario(),  proceso.getId() });
	  }
	
//	asignar turno a punto de venta
	@Override
	  public AsignarTurno2 findByIdAsignarTurno(Long id) {
	    try {
	    	AsignarTurno2 asignarTurno = jdbcTemplate.queryForObject("SELECT * FROM asignar_turno WHERE id = ?",
	          BeanPropertyRowMapper.newInstance( AsignarTurno2.class), id);
	      return asignarTurno;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarAsignarTurno(AsignarTurno2 asignarTurno) {
	    return jdbcTemplate.update("UPDATE asignar_turno SET id_turnos = ?, id_estado = ?, id_oficina = ?, nombre_oficina = ?, id_sitio_venta = ?, porcentaje = ?, nombre_sitio_venta = ? WHERE id = ?",
	        new Object[] { asignarTurno.getIdTurnos(), asignarTurno.getIdEstado(), asignarTurno.getIdOficina(), asignarTurno.getNombreOficina(), asignarTurno.getIdSitioVenta(), asignarTurno.getPorcentaje(), asignarTurno.getNombreSitioVenta(), asignarTurno.getId()});
	  }
	
//	Historial
	@Override
	  public Historial2 findByIdHistorialSC(Long id) {
	    try {
	    	Historial2 historial = jdbcTemplate.queryForObject("SELECT * FROM historial_solicitudes WHERE id = ?",
	          BeanPropertyRowMapper.newInstance( Historial2.class), id);
	      return historial;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarHistorialSC(Historial2 historial) {
	    return jdbcTemplate.update("UPDATE historial_solicitudes SET id_solicitud_sc = ?, id_usuario = ?, id_estado = ?, observacion = ? WHERE id = ?",
	        new Object[] { historial.getId_solicitud_sc(), historial.getIdUsuario(), historial.getIdEstado(), historial.getObservacion(), historial.getId()});
	  }
	
//	solicitud SC
	@Override
	  public SolicitudSC2 findByIdSolicitudSC(Long id) {
	    try {
	    	SolicitudSC2 solicitudSC = jdbcTemplate.queryForObject("SELECT * FROM solicitud_sc WHERE id = ?",
	          BeanPropertyRowMapper.newInstance( SolicitudSC2.class), id);
	      return solicitudSC;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarSolicitudSC(SolicitudSC2 solicitudSC) {
	    return jdbcTemplate.update("UPDATE solicitud_sc SET id_escala = ?, id_estado = ?, id_motivo_solicitud = ?, id_tipo_servicio = ?, id_cliente_sc = ?, auxiliar_radicacion = ?, fecha = ?, incidente = ?, medio_radicacion = ?, municipio = ?, vence = ?, prorroga = ?, persona_involucrada = ?, persona_afectada = ? WHERE id = ?",
	        new Object[] { solicitudSC.getIdEscalaSolicitudes(), solicitudSC.getIdEstado(), solicitudSC.getIdMotivoSolicitud(), solicitudSC.getIdTipoServicio(), solicitudSC.getIdClienteSC(), solicitudSC.getAuxiliarRadicacion(), solicitudSC.getFecha(), solicitudSC.getIncidente(), solicitudSC.getMedioRadicacion(), solicitudSC.getMunicipio(), solicitudSC.getVence(), solicitudSC.getProrroga(), solicitudSC.getPersonaInvolucrada(), solicitudSC.getPersonaAfectada(), solicitudSC.getId()});
	  }
	
//	Tipo Documento
	@Override
	  public TipoDocumento2 findByIdTipoDocumento(Long id) {
	    try {
	    	TipoDocumento2 tipoDocumento = jdbcTemplate.queryForObject("SELECT * FROM tipo_documento WHERE id = ?",
	          BeanPropertyRowMapper.newInstance(TipoDocumento2.class), id);
	      return tipoDocumento;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarTipoDocumento(TipoDocumento2 tipoDocumento) {
	    return jdbcTemplate.update("UPDATE tipo_documento SET descripcion = ?, id_estado=? WHERE id= ?",
	        new Object[] {tipoDocumento.getDescripcion(), tipoDocumento.getIdEstado(), tipoDocumento.getId()});
	  }
	
//	Rol
	@Override
	  public Rol2 findByIdRol(Long id) {
	    try {
	    	Rol2 rol = jdbcTemplate.queryForObject("SELECT * FROM rol WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Rol2.class), id);
	      return rol;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarRol(Rol2 rol) {
	    return jdbcTemplate.update("UPDATE rol SET descripcion=?, id_estado=?, id_jerarquia=? WHERE id=?",
	        new Object[] {rol.getDescripcion(), rol.getIdEstado(), rol.getIdJerarquia(), rol.getId()});
	  }
	
//	Modulo
	@Override
	  public Modulo2 findByIdModulo(Long id) {
	    try {
	    	Modulo2 modulo = jdbcTemplate.queryForObject("SELECT * FROM modulo WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Modulo2.class), id);
	      return modulo;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarModulo(Modulo2 modulo) {
	    return jdbcTemplate.update("UPDATE modulo SET descripcion=? WHERE id=?",
	        new Object[] {modulo.getDescripcion(), modulo.getId()});
	  }
	

//	Jerarquia
	@Override
	  public Jerarquia2 findByIdJerarquia(Long id) {
	    try {
	    	Jerarquia2 jerarquia = jdbcTemplate.queryForObject("SELECT * FROM jerarquia WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Jerarquia2.class), id);
	      return jerarquia;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarJerarquia(Jerarquia2 jerarquia) {
	    return jdbcTemplate.update("UPDATE jerarquia SET descripcion=? WHERE id=?",
	        new Object[] {jerarquia.getDescripcion(), jerarquia.getId()});
	  }
	
//	Configuracion
	@Override
	  public Configuracion2 findByIdConfiguracion(Long id) {
	    try {
	    	Configuracion2 configuracion = jdbcTemplate.queryForObject("SELECT * FROM configuracion WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Configuracion2.class), id);
	      return configuracion;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarConfiguracion(Configuracion2 configuracion) {
	    return jdbcTemplate.update("UPDATE configuracion SET descripcion=?, nombre=?, valor=? WHERE id=?",
	        new Object[] {configuracion.getDescripcion(), configuracion.getNombre(), configuracion.getValor(), configuracion.getId()});
	  }
	
//	Tipo Turno
	@Override
	  public TipoTurno2 findByIdTipoTurno(Long id) {
	    try {
	    	TipoTurno2 tipoTurno = jdbcTemplate.queryForObject("SELECT * FROM tipo_turno WHERE id=?",
	          BeanPropertyRowMapper.newInstance(TipoTurno2.class), id);
	      return tipoTurno;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarTipoTurno(TipoTurno2 tipoTurno) {
	    return jdbcTemplate.update("UPDATE tipo_turno SET descripcion=?, id_estado=? WHERE id=? ",
	        new Object[] {tipoTurno.getDescripcion(), tipoTurno.getIdEstado(), tipoTurno.getId()});
	  }
	
//	Tipo Novedades
	@Override
	  public TipoNovedades2 findByIdTipoNovedad(Long id) {
	    try {
	    	TipoNovedades2 tipoNovedades = jdbcTemplate.queryForObject("SELECT * FROM tipo_novedades WHERE id=?",
	          BeanPropertyRowMapper.newInstance(TipoNovedades2.class), id);
	      return tipoNovedades;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarTipoNovedad(TipoNovedades2 tipoNovedades) {
	    return jdbcTemplate.update("UPDATE tipo_novedades SET descripcion=?, observacion=? WHERE id=?",
	        new Object[] {tipoNovedades.getDescripcion(), tipoNovedades.getObservacion(), tipoNovedades.getId()});
	  }
	
//	Turnos
	@Override
	  public Turnos2 findByIdTurnos(Long id) {
	    try {
	    	Turnos2 turnos = jdbcTemplate.queryForObject("SELECT * FROM turnos WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Turnos2.class), id);
	      return turnos;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarTurnos(Turnos2 turnos) {
	    return jdbcTemplate.update("UPDATE turnos SET descripcion=?, hora_final=?, hora_inicio=?, id_estado=?, id_tipo_turno=? WHERE id=?",
	        new Object[] {turnos.getDescripcion(),turnos.getHoraFinal(), turnos.getHoraInicio(), turnos.getIdEstado(), turnos.getIdTipoTurno(),turnos.getId()});
	  }
	
//	Elementos Visita
	@Override
	  public ElementosVisita2 findByIdElementosVisita(Long id) {
	    try {
	    	ElementosVisita2 elementosVisita = jdbcTemplate.queryForObject("SELECT * FROM elementos_visita WHERE id=?",
	          BeanPropertyRowMapper.newInstance(ElementosVisita2.class), id);
	      return elementosVisita;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarElementosVisita(ElementosVisita2 elementosVisita) {
	    return jdbcTemplate.update("UPDATE elementos_visita SET descripcion=? WHERE id=?",
	        new Object[] {elementosVisita.getDescripcion(),elementosVisita.getId()});
	  }
	
//	Opciones Visita
	@Override
	  public OpcionesVisita2 findByIdOpcionesVisita(Long id) {
	    try {
	    	OpcionesVisita2 opcionesVisita = jdbcTemplate.queryForObject("SELECT * FROM opciones_visita WHERE id=?",
	          BeanPropertyRowMapper.newInstance(OpcionesVisita2.class), id);
	      return opcionesVisita;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarOpcionesVisita(OpcionesVisita2 opcionesVisita) {
	    return jdbcTemplate.update("UPDATE opciones_visita SET descripcion=? WHERE id=?",
	        new Object[] {opcionesVisita.getDescripcion(),opcionesVisita.getId()});
	  }
	
//	Tipo Servicio
	@Override
	  public TipoServicio2 findByIdTipoServicios(Long id) {
	    try {
	    	TipoServicio2 tipoServicio = jdbcTemplate.queryForObject("SELECT * FROM tipo_servicio WHERE id=?",
	          BeanPropertyRowMapper.newInstance(TipoServicio2.class), id);
	      return tipoServicio;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarTipoServicios(TipoServicio2 tipoServicio) {
	    return jdbcTemplate.update("UPDATE tipo_servicio SET descripcion=? WHERE id=?",
	        new Object[] {tipoServicio.getDescripcion(),tipoServicio.getId()});
	  }
	
	
//	Escala Solicitud
	@Override
	  public EscalaSolicitudes2 findByIdEscalaSolicitud(Long id) {
	    try {
	    	EscalaSolicitudes2 escalaSolicitud = jdbcTemplate.queryForObject("SELECT * FROM escala_solicitud WHERE id=?",
	          BeanPropertyRowMapper.newInstance(EscalaSolicitudes2.class), id);
	      return escalaSolicitud;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarEscalaSolicitud(EscalaSolicitudes2 tipoServicio) {
	    return jdbcTemplate.update("UPDATE escala_solicitud SET descripcion=? WHERE id=?",
	        new Object[] {tipoServicio.getDescripcion(),tipoServicio.getId()});
	  }
	
	
//	Motivo Solicitud
	@Override
	  public MotivoSolicitud2 findByIdMotivoSolicitud(Long id) {
	    try {
	    	MotivoSolicitud2 motivoSolicitud = jdbcTemplate.queryForObject("SELECT * FROM motivo_solicitud WHERE id=?",
	          BeanPropertyRowMapper.newInstance(MotivoSolicitud2.class), id);
	      return motivoSolicitud;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarMotivoSolicitud(MotivoSolicitud2 motivoSolicitud) {
	    return jdbcTemplate.update("UPDATE motivo_solicitud SET descripcion=?, id_area=? WHERE id=?",
	        new Object[] {motivoSolicitud.getDescripcion(), motivoSolicitud.getIdArea(), motivoSolicitud.getId()});
	  }
	
//	ClienteSC
	@Override
	  public ClienteSC2 findByIdClienteSC(Long id) {
	    try {
	    	ClienteSC2 clienteSC = jdbcTemplate.queryForObject("SELECT * FROM cliente_sc WHERE id=?",
	          BeanPropertyRowMapper.newInstance(ClienteSC2.class), id);
	      return clienteSC;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarClienteSC(ClienteSC2 clienteSC) {
	    return jdbcTemplate.update("UPDATE cliente_sc SET apellido=?, correo=?, documento=?, nombre=?, telefono=?, id_tipodocumento=? WHERE id=?",
	        new Object[] {clienteSC.getApellido(),clienteSC.getCorreo(),clienteSC.getDocumento(),clienteSC.getNombre(), clienteSC.getTelefono(), clienteSC.getIdTipoDocumento(), clienteSC.getId()});
	  }
	
//	AsignacioUsuarioPQRS
	@Override
	  public AsignacionUsuarioPQRS2 findByIdAsignacionUsuarioPQRS(Long id) {
	    try {
	    	AsignacionUsuarioPQRS2 asignacionUsuarioPQRS = jdbcTemplate.queryForObject("SELECT * FROM asignacion_usuarios_pqrs WHERE id=?",
	          BeanPropertyRowMapper.newInstance(AsignacionUsuarioPQRS2.class), id);
	      return asignacionUsuarioPQRS;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarAsignacionUsuarioPQRS(AsignacionUsuarioPQRS2 asignacionUsuarioPQRS) {
	    return jdbcTemplate.update("UPDATE asignacion_usuarios_pqrs SET id_area=?, id_usuario=? WHERE id=?",
	        new Object[] {asignacionUsuarioPQRS.getIdArea(),asignacionUsuarioPQRS.getIdUsuario(), asignacionUsuarioPQRS.getId()});
	  }
	
//	Area
	@Override
	  public Area2 findByIdArea(Long id) {
	    try {
	    	Area2 area = jdbcTemplate.queryForObject("SELECT * FROM area WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Area2.class), id);
	      return area;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarArea(Area2 area) {
	    return jdbcTemplate.update("UPDATE area SET descripcion = ? WHERE id=?",
	        new Object[] {area.getDescripcion(), area.getId()});
	  }
	
//Ingreso Personal Empresa
	@Override
	public IngresoPersonalEmpresa2 findByIdIngresoPersonalEmpresa(Long id) {
		try {
	    	IngresoPersonalEmpresa2 ingresoPersonalEmpresa = jdbcTemplate.queryForObject("SELECT * FROM ingreso_personal_empresa  WHERE id=?",
	          BeanPropertyRowMapper.newInstance(IngresoPersonalEmpresa2.class), id);
	      return ingresoPersonalEmpresa;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarIngresoPersonalEmpresa(IngresoPersonalEmpresa2 ingresoPersonalEmpresa) {
	    return jdbcTemplate.update("UPDATE ingreso_personal_empresa SET nombre=?, apellido=?, id_tipo_documento=?, documento=?, id_area=?, hora_ingreso=?, hora_salida=?, id_estado=?, fecha=?, ide_oficina=?, id_sedes=?, nombre_imagen=?, rh=?, telefono=?, eps=?, arl=? WHERE id=?",
	        new Object[] {ingresoPersonalEmpresa.getNombre(), ingresoPersonalEmpresa.getApellido(),ingresoPersonalEmpresa.getIdTipoDocumento(), ingresoPersonalEmpresa.getDocumento(),ingresoPersonalEmpresa.getId_area(),ingresoPersonalEmpresa.getHoraIngreso(),ingresoPersonalEmpresa.getHoraSalida(),ingresoPersonalEmpresa.getId_estado(), ingresoPersonalEmpresa.getFecha(), ingresoPersonalEmpresa.getIde_oficina(), ingresoPersonalEmpresa.getId_sede(), ingresoPersonalEmpresa.getNombreImagen(), ingresoPersonalEmpresa.getRh(), ingresoPersonalEmpresa.getTelefono(), ingresoPersonalEmpresa.getEps(), ingresoPersonalEmpresa.getArl(), ingresoPersonalEmpresa.getId()});
	  }



//Sede
	@Override
	public Sede2 findByIdSede(Long id) {
	  try {
		  Sede2 sede = jdbcTemplate.queryForObject("SELECT * FROM sedes WHERE id=?",
	        BeanPropertyRowMapper.newInstance(Sede2.class), id);
	    return sede;
	  } catch (IncorrectResultSizeDataAccessException e) {
	    return null;
	  }
	}
	
	@Override
	public int modificarSede(Sede2 sede) {
	  return jdbcTemplate.update("UPDATE sedes SET descripcion=? WHERE id=?",
	      new Object[] {sede.getDescripcion(), sede.getId()});
	}
		
//Tipo Activo
	@Override
	  public TipoActivo2 findByIdTipoActivo(Long id) {
	    try {
	    	TipoActivo2 tipoActivo = jdbcTemplate.queryForObject("SELECT * FROM tipo_activo WHERE id=?",
	          BeanPropertyRowMapper.newInstance(TipoActivo2.class), id);
	      return tipoActivo;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarTipoActivo(TipoActivo2 tipoActivo) {
	    return jdbcTemplate.update("UPDATE tipo_activo SET descripcion=?, id_estado=? WHERE id=?",
	        new Object[] {tipoActivo.getDescripcion(), tipoActivo.getIdEstado(), tipoActivo.getId()});
	  }

//Tipos Procesos
	@Override
	  public TiposProcesos2 findByIdTiposProcesos(Long id) {
	    try {
	    	TiposProcesos2 tiposProcesos = jdbcTemplate.queryForObject("SELECT * FROM tipos_procesos WHERE id=?",
	          BeanPropertyRowMapper.newInstance(TiposProcesos2.class), id);
	      return tiposProcesos;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarTiposProcesos(TiposProcesos2 tiposProcesos) {
	    return jdbcTemplate.update("UPDATE tipos_procesos SET descripcion=?, id_estado=? WHERE id=?",
	        new Object[] {tiposProcesos.getDescripcion(), tiposProcesos.getIdEstado(), tiposProcesos.getId()});
	  }
	
//Detalle Articulo
	@Override
	  public DetalleArticulo2 findByIdDetalleArticulo(Long id) {
	    try {
	    	DetalleArticulo2 detalleArticulo = jdbcTemplate.queryForObject("SELECT * FROM detalle_articulo WHERE id=?",
	          BeanPropertyRowMapper.newInstance(DetalleArticulo2.class), id);
	      return detalleArticulo;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarDetalleArticulo(DetalleArticulo2 detalleArticulo) {
	    return jdbcTemplate.update("UPDATE detalle_articulo SET marca=?, codigo_contable=? placa=?, serial=?, id_articulo=?, id_estado=?, id_tipo_activo=?, id_usuario=?, valor=?, id_orden_compra=? WHERE id=?",
	        new Object[] {detalleArticulo.getMarca(), detalleArticulo.getCodigo_contable(), detalleArticulo.getPlaca(), detalleArticulo.getSerial(), detalleArticulo.getIdArticulo(), detalleArticulo.getIdEstado(), detalleArticulo.getIdTipoActivo(), detalleArticulo.getIdUsuario(), detalleArticulo.getValor(), detalleArticulo.getIdOrdenCompra(), detalleArticulo.getId()});
	  }
		
//Historial Articulo
	@Override
	  public HistorialArticulo2 findByIdHistorialArticulo(Long id) {
	    try {
	    	HistorialArticulo2 historialArticulo = jdbcTemplate.queryForObject("SELECT * FROM historial_articulo WHERE id=?",
	          BeanPropertyRowMapper.newInstance(HistorialArticulo2.class), id);
	      return historialArticulo;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }
	
	@Override
	  public int modificarHistorialArticulo(HistorialArticulo2 historialArticulo) {
	    return jdbcTemplate.update("UPDATE detalle_articulo SET fecha=?, observacion=?, id_detalle_articulo=?, id_usuario=? WHERE id=?",
	        new Object[] {historialArticulo.getFecha(), historialArticulo.getObservacion(), historialArticulo.getIdDetalleArticulo(), historialArticulo.getIdUsuario(), historialArticulo.getId()});
	  }
		
//Asignaciones Procesos
	@Override
	  public AsignacionesProcesos2 findByIdAsignacionesProcesos(Long id) {
	    try {
	    	AsignacionesProcesos2 asignacionesProcesos = jdbcTemplate.queryForObject("SELECT * FROM asignaciones_procesos WHERE id=?",
	          BeanPropertyRowMapper.newInstance(AsignacionesProcesos2.class), id);
	      return asignacionesProcesos;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarAsignacionesProcesos(AsignacionesProcesos2 asignacionesProcesos) {
	    return jdbcTemplate.update("UPDATE asignaciones_procesos SET id_tipos_procesos=?, id_usuario=? WHERE id=?",
	        new Object[] {asignacionesProcesos.getIdTiposProcesos(), asignacionesProcesos.getIdUsuario(), asignacionesProcesos.getId()});
	  }
	
//Asignaciones Articulos
	@Override
	  public AsignacionesArticulos2 findByIdAsignacionesArticulos(Long id) {
	    try {
	    	AsignacionesArticulos2 asignacionesArticulos = jdbcTemplate.queryForObject("SELECT * FROM asignaciones_articulos WHERE id=?",
	          BeanPropertyRowMapper.newInstance(AsignacionesArticulos2.class), id);
	      return asignacionesArticulos;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarAsignacionesArticulos(AsignacionesArticulos2 asignacionesArticulos) {
	    return jdbcTemplate.update("UPDATE asignaciones_articulos SET id_asignaciones_procesos=?, id_detalle_articulo=?, id_estado=? WHERE id=?",
	        new Object[] {asignacionesArticulos.getIdAsignacionesProcesos(), asignacionesArticulos.getIdDetalleArticulo(), asignacionesArticulos.getIdEstado(), asignacionesArticulos.getId()});
	  }
		
//Asignacion Punto Venta Articulo
	@Override
	  public AsignacionPuntoVentaArticulo2 findByIdAsignacionPuntoVentaArticulo(Long id) {
	    try {
	    	AsignacionPuntoVentaArticulo2 asignacionPuntoVentaArticulo = jdbcTemplate.queryForObject("SELECT * FROM asignacion_punto_venta_articulo WHERE id=?",
	          BeanPropertyRowMapper.newInstance(AsignacionPuntoVentaArticulo2.class), id);
	      return asignacionPuntoVentaArticulo;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarAsignacionPuntoVentaArticulo(AsignacionPuntoVentaArticulo2 asignacionPuntoVentaArticulo) {
	    return jdbcTemplate.update("UPDATE asignacion_punto_venta_articulo SET id_oficina=?, id_sitio_venta=?, id_asignaciones_articulos=?, cantidad=?, nombre_oficina=?, nombre_sitio_venta=? WHERE id=?",
	        new Object[] {asignacionPuntoVentaArticulo.getIdOficina(), asignacionPuntoVentaArticulo.getIdSitioVenta(), asignacionPuntoVentaArticulo.getIdAsignacionesArticulos(), asignacionPuntoVentaArticulo.getCantidad(), asignacionPuntoVentaArticulo.getNombreOficina(), asignacionPuntoVentaArticulo.getNombreSitioVenta(), asignacionPuntoVentaArticulo.getId()});
	  }
		
// Articulos Baja
	@Override
	  public ArticulosBaja2 findByIdArticulosBaja(Long id) {
	    try {
	    	ArticulosBaja2 articulosBaja2 = jdbcTemplate.queryForObject("SELECT * FROM articulos_baja WHERE id=?",
	          BeanPropertyRowMapper.newInstance(ArticulosBaja2.class), id);
	      return articulosBaja2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarArticulosBaja(ArticulosBaja2 articulosBaja2) {
	    return jdbcTemplate.update("UPDATE articulos_baja SET observacion=?, id_detalle_articulo=?, id_opcion_baja=?, id_solicitud_baja=?, id_estado=? WHERE id=?",
	        new Object[] {articulosBaja2.getObservacion(), articulosBaja2.getId_detalle_articulo(), articulosBaja2.getId_opcion_baja(), articulosBaja2.getId_solicitud_baja(), articulosBaja2.getId_estado(), articulosBaja2.getId()});
	  }

//Solicitud Bajas Articulos
	@Override
	  public SolicitudBajasArticulos2 findByIdSolicitudBajasArticulos(Long id) {
	    try {
	    	SolicitudBajasArticulos2 solicitudBajasArticulos2 = jdbcTemplate.queryForObject("SELECT * FROM solicitud_bajas_articulos WHERE id=?",
	          BeanPropertyRowMapper.newInstance(SolicitudBajasArticulos2.class), id);
	      return solicitudBajasArticulos2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarSolicitudBajasArticulos(SolicitudBajasArticulos2 solicitudBajasArticulos2) {
	    return jdbcTemplate.update("UPDATE solicitud_bajas_articulos SET fecha=?, id_usuario=?, id_estado=?, usuario_autorizacion=?, usuario_confirmacion=?, estado_contabilidad=? WHERE id=?",
	        new Object[] {solicitudBajasArticulos2.getFecha(), solicitudBajasArticulos2.getId_usuario(), solicitudBajasArticulos2.getId_estado(), solicitudBajasArticulos2.getUsuario_autorizacion(), solicitudBajasArticulos2.getUsuario_confirmacion(), solicitudBajasArticulos2.getEstado_contabilidad(), solicitudBajasArticulos2.getId()});
	  }
		
//Compras
	@Override
	  public Compras2 findByIdCompras(Long id) {
	    try {
	    	Compras2 compras2 = jdbcTemplate.queryForObject("SELECT * from compras WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Compras2.class), id);
	      return compras2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarCompras(Compras2 compras2) {
	    return jdbcTemplate.update("UPDATE compras SET id_articulo=? , id_usuario=?,  cantidad=?, id_orden_compra=? WHERE id=?",
	        new Object[] {compras2.getId_articulo(),compras2.getId_usuario(), compras2.getCantidad(), compras2.getId_orden_compra(), compras2.getId()});
	  }
		
// Inventario
	@Override
	  public Inventario2 findByIdInventario(Long id) {
	    try {
	    	Inventario2 inventario2 = jdbcTemplate.queryForObject("SELECT * FROM inventario WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Inventario2.class), id);
	      return inventario2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarInventario(Inventario2 inventario2) {
	    return jdbcTemplate.update("UPDATE inventario SET id_detalle_articulo=?, id_usuario=?, fecha=?, cantidad=?, id_orden_compra=? WHERE id=?",
	        new Object[] {inventario2.getId_detalle_articulo(), inventario2.getId_usuario(), inventario2.getFecha(), inventario2.getCantidad(), inventario2.getId_orden_compra(), inventario2.getId()});
	  }
		
// MovimientoComprasInventario
	@Override
	  public MovimientoComprasInventario2 findByIdMovimientoComprasInventario(Long id) {
	    try {
	    	MovimientoComprasInventario2 movimientoComprasInventario2 = jdbcTemplate.queryForObject("SELECT * FROM movimiento_compras_inventario WHERE id=?",
	          BeanPropertyRowMapper.newInstance(MovimientoComprasInventario2.class), id);
	      return movimientoComprasInventario2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarMovimientoComprasInventario(MovimientoComprasInventario2 movimientoComprasInventario2) {
	    return jdbcTemplate.update("UPDATE movimiento_compras_inventario SET id_articulo=? , cantidad=?, id_orden_compra=? WHERE id=?",
	        new Object[] {movimientoComprasInventario2.getId_articulo(), movimientoComprasInventario2.getCantidad(), movimientoComprasInventario2.getIdOrdenCompra(), movimientoComprasInventario2.getId()});
	  }
		
//Tipo Necesidad
	@Override
	  public TipoNecesidad2 findByIdTipoNecesidad(Long id) {
	    try {
	    	TipoNecesidad2 tipoNecesidad2 = jdbcTemplate.queryForObject("SELECT * FROM tipo_necesidad WHERE id=?",
	          BeanPropertyRowMapper.newInstance(TipoNecesidad2.class), id);
	      return tipoNecesidad2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarTipoNecesidad(TipoNecesidad2 tipoNecesidad2) {
	    return jdbcTemplate.update("UPDATE tipo_necesidad SET descripcion=?, id_estado=? WHERE id=?",
	        new Object[] {tipoNecesidad2.getDescripcion(), tipoNecesidad2.getIdEstado(), tipoNecesidad2.getId()});
	  }
		
//Sub Proceso
	@Override
	  public SubProceso2 findByIdSubProceso(Long id) {
	    try {
	    	SubProceso2 subProceso2 = jdbcTemplate.queryForObject("SELECT * FROM sub_proceso WHERE id=?",
	          BeanPropertyRowMapper.newInstance(SubProceso2.class), id);
	      return subProceso2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarSubProceso(SubProceso2 subProceso2) {
	    return jdbcTemplate.update("UPDATE sub_proceso SET id_tipo_proceso=?, descripcion=?, id_estado=? WHERE id=?",
	        new Object[] {subProceso2.getIdTipoProceso(), subProceso2.getDescripcion(), subProceso2.getIdEstado(), subProceso2.getId()});
	  }
				
		
//Matriz Necesidad
	@Override
	  public MatrizNecesidad2 findByIdMatrizNecesidad(Long id) {
	    try {
	    	MatrizNecesidad2 matrizNecesidad2 = jdbcTemplate.queryForObject("SELECT * FROM matriz_necesidad WHERE id=?",
	          BeanPropertyRowMapper.newInstance(MatrizNecesidad2.class), id);
	      return matrizNecesidad2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarMatrizNecesidad(MatrizNecesidad2 matrizNecesidad2) {
	    return jdbcTemplate.update("UPDATE matriz_necesidad SET cantidad=?, cantidad_ejecuciones=?, costo_estimado=?, costo_total=?, costo_unitario=?, detalle=?, fecha=?, cum_planeacion=?, porcentaje_total=?, id_sub_proceso=?, id_tipo_necesidad=? WHERE id=?",
	        new Object[] {matrizNecesidad2.getCantidad(), matrizNecesidad2.getCantidadEjecuciones(), matrizNecesidad2.getCostoEstimado(), matrizNecesidad2.getCostoTotal(), matrizNecesidad2.getCostoUnitario(), matrizNecesidad2.getDetalle(), matrizNecesidad2.getFecha(), matrizNecesidad2.getCumPlaneacion(), matrizNecesidad2.getPorcentajeTotal(), matrizNecesidad2.getIdSubProceso(), matrizNecesidad2.getIdTipoNecesidad(), matrizNecesidad2.getId()});
	  }

// MatrizNecesidadDetalle
	@Override
	  public MatrizNecesidadDetalle2 findByIdMatrizNecesidadDetalle(Long id) {
	    try {
	    	MatrizNecesidadDetalle2 matrizNecesidadDetalle2 = jdbcTemplate.queryForObject("SELECT * FROM matriz_necesidad_detalle WHERE id=?",
	          BeanPropertyRowMapper.newInstance(MatrizNecesidadDetalle2.class), id);
	      return matrizNecesidadDetalle2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	  }

	@Override
	  public int modificarMatrizNecesidadDetalle(MatrizNecesidadDetalle2 matrizNecesidadDetalle2) {
	    return jdbcTemplate.update("UPDATE matriz_necesidad_detalle SET fecha=?, fecha_ejecutada=?, descripcion=?, porcentaje=?, cantidad_ejecuciones=?, cantidad_ejecuciones_cumplidas=?, cantidad_estimada=?, cantidad_comprada=?, costo_ejecucion_comprada=?, id_matriz_necesidad=?, id_orden_compra=?, id_estado=? WHERE id=?",
	        new Object[] {matrizNecesidadDetalle2.getFecha(), matrizNecesidadDetalle2.getFecha_ejecutada(), matrizNecesidadDetalle2.getDescripcion(), matrizNecesidadDetalle2.getPorcentaje(), matrizNecesidadDetalle2.getCantidad_ejecuciones(), matrizNecesidadDetalle2.getCantidad_ejecuciones_cumplidas(), matrizNecesidadDetalle2.getCantidad_estimada(), matrizNecesidadDetalle2.getCantidad_comprada(), matrizNecesidadDetalle2.getCosto_ejecucion_comprada(), matrizNecesidadDetalle2.getId_matriz_necesidad(), matrizNecesidadDetalle2.getId_orden_compra(), matrizNecesidadDetalle2.getId_estado(), matrizNecesidadDetalle2.getId()});
	  }
		
// Medios Radiación
	@Override
	  public MediosRadiacion2 findByIdMediosRadiacion(Long id) {
	    try {
	    	MediosRadiacion2 mediosRadiacion2 = jdbcTemplate.queryForObject("SELECT * FROM medios_radiacion WHERE id=?",
	          BeanPropertyRowMapper.newInstance(MediosRadiacion2.class), id);
	      return mediosRadiacion2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarMediosRadiacion(MediosRadiacion2 mediosRadiacion2) {
	    return jdbcTemplate.update("UPDATE medios_radiacion SET  descripcion=? WHERE id=?",
	        new Object[] {mediosRadiacion2.getDescripcion(), mediosRadiacion2.getId()});
	  }
		
// Periodo Ejecucion
	@Override
	  public PeriodoEjecucion2 findByIdPeriodoEjecucion(Long id) {
	    try {
	    	PeriodoEjecucion2 periodoEjecucion2 = jdbcTemplate.queryForObject("SELECT * FROM periodo_ejecucion WHERE id=?",
	          BeanPropertyRowMapper.newInstance(PeriodoEjecucion2.class), id);
	      return periodoEjecucion2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarPeriodoEjecucion(PeriodoEjecucion2 periodoEjecucion2) {
	    return jdbcTemplate.update("UPDATE periodo_ejecucion SET  descripcion=?, cantidad=? WHERE id=?",
	        new Object[] {periodoEjecucion2.getDescripcion(), periodoEjecucion2.getCantidad(), periodoEjecucion2.getId()});
	  }
// Opcion Articulo Baja
	@Override
	  public OpcionArticuloBaja2 findByIdOpcionArticuloBaja(Long id) {
	    try {
	    	OpcionArticuloBaja2 opcionArticuloBaja2 = jdbcTemplate.queryForObject("SELECT * FROM opcion_articulo_baja WHERE id=?",
	          BeanPropertyRowMapper.newInstance(OpcionArticuloBaja2.class), id);
	      return opcionArticuloBaja2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarOpcionArticuloBaja(OpcionArticuloBaja2 opcionArticuloBaja2) {
	    return jdbcTemplate.update("UPDATE opcion_articulo_baja SET  descripcion=? WHERE id=?",
	        new Object[] {opcionArticuloBaja2.getDescripcion(), opcionArticuloBaja2.getId()});
	  }
				
// Jerarquia Cuentas
	@Override
	  public JerarquiaCuentas2 findByIdJerarquiaCuentas(Long id) {
	    try {
	    	JerarquiaCuentas2 jerarquiaCuentas2 = jdbcTemplate.queryForObject("SELECT * FROM jerarquia_cuentas WHERE id=?",
	          BeanPropertyRowMapper.newInstance(JerarquiaCuentas2.class), id);
	      return jerarquiaCuentas2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarJerarquiaCuentas(JerarquiaCuentas2 jerarquiaCuentas2) {
	    return jdbcTemplate.update("UPDATE jerarquia_cuentas SET descripcion=? WHERE id=?",
	        new Object[] {jerarquiaCuentas2.getDescripcion(), jerarquiaCuentas2.getId()});
	  }
	
//  Cuenta
	@Override
	  public Cuenta2 findByIdCuenta(Long id) {
	    try {
	    	Cuenta2 cuenta2 = jdbcTemplate.queryForObject("SELECT * FROM cuenta WHERE id=?",
	          BeanPropertyRowMapper.newInstance(Cuenta2.class), id);
	      return cuenta2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarCuenta(Cuenta2 cuenta2) {
	    return jdbcTemplate.update("UPDATE cuenta SET descripcion=?, codigo=?, id_jerarquia_cuentas=? WHERE id=?",
	        new Object[] {cuenta2.getDescripcion(), cuenta2.getCodigo(), cuenta2.getIdJerarquiaCuentas(), cuenta2.getId()});
	  }
				
//  Libro Mayor
	@Override
	  public LibroMayor2 findByIdLibroMayor(Long id) {
	    try {
	    	LibroMayor2 libroMayor2 = jdbcTemplate.queryForObject("SELECT * FROM libro_mayor WHERE id=?",
	          BeanPropertyRowMapper.newInstance(LibroMayor2.class), id);
	      return libroMayor2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarLibroMayor(LibroMayor2 libroMayor) {
	    return jdbcTemplate.update("UPDATE libro_mayor SET id_cuenta=?, valor=?, fecha=? WHERE id=?",
	        new Object[] {libroMayor.getIdCuenta(), libroMayor.getValor(), libroMayor.getFecha(), libroMayor.getId()});
	  }
//  Porcentaje Presupuesto
	@Override
	  public PorcentajePresupuesto2 findByIdPorcentajePresupuesto(Long id) {
	    try {
	    	PorcentajePresupuesto2 porcentajePresupuesto2 = jdbcTemplate.queryForObject("SELECT * FROM porcentaje_presupuesto WHERE id=?",
	          BeanPropertyRowMapper.newInstance(PorcentajePresupuesto2.class), id);
	      return porcentajePresupuesto2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarPorcentajePresupuesto(PorcentajePresupuesto2 porcentajePresupuesto) {
	    return jdbcTemplate.update("UPDATE porcentaje_presupuesto SET fecha = ?, porcentaje = ?, id_cuenta = ? WHERE id = ?",
	        new Object[] {porcentajePresupuesto.getFecha(), porcentajePresupuesto.getPorcentaje(), porcentajePresupuesto.getIdCuenta(), porcentajePresupuesto.getId()});
	  }
	
//  Presupuesto Contable
	@Override
	  public PresupuestoContable2 findByIdPresupuestoContable(Long id) {
	    try {
	    	PresupuestoContable2 presupuestoContable2 = jdbcTemplate.queryForObject("SELECT * FROM presupuesto_contable WHERE id=?",
	          BeanPropertyRowMapper.newInstance(PresupuestoContable2.class), id);
	      return presupuestoContable2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarPresupuestoContable(PresupuestoContable2 presupuestoContable2) {
	    return jdbcTemplate.update("UPDATE presupuesto_contable SET fecha = ?, presupuesto = ?, id_cuenta = ? WHERE id = ?",
	        new Object[] {presupuestoContable2.getFecha(), presupuestoContable2.getPresupuesto(), presupuestoContable2.getIdCuenta(), presupuestoContable2.getId()});
	  }
	
//  Motivo Autorización Pago
	@Override
	  public MotivoAutorizacionPago2 findByIdMotivoAutorizacionPago(Long id) {
	    try {
	    	MotivoAutorizacionPago2 motivioAutorizacionPago2 = jdbcTemplate.queryForObject("SELECT * FROM motivo_autorizacion_pago WHERE id=?",
	          BeanPropertyRowMapper.newInstance(MotivoAutorizacionPago2.class), id);
	      return motivioAutorizacionPago2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarMotivoAutorizacionPago(MotivoAutorizacionPago2 motivoAutorizacionPago2) {
	    return jdbcTemplate.update("UPDATE motivo_autorizacion_pago SET descripcion = ?, id_estado = ? WHERE id = ?",
	        new Object[] {motivoAutorizacionPago2.getDescripcion(), motivoAutorizacionPago2.getIdEstado(), motivoAutorizacionPago2.getId()});
	  }
	
//  Cliente Autorizacion Pago
	@Override
	  public ClienteAutorizacionPago2 findByIdClienteAutorizacionPago(Long id) {
	    try {
	    	ClienteAutorizacionPago2 clienteAutorizacionPago2 = jdbcTemplate.queryForObject("SELECT * FROM cliente_autorizacion_pago WHERE id=?",
	          BeanPropertyRowMapper.newInstance(ClienteAutorizacionPago2.class), id);
	      return clienteAutorizacionPago2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarClienteAutorizacionPago(ClienteAutorizacionPago2 clienteAutorizacionPago2) {
	    return jdbcTemplate.update("UPDATE cliente_autorizacion_pago SET nombre_apellido = ?, cedula = ?, direccion = ?, telefono = ?, id_tipo_documento = ? WHERE id = ?",
	        new Object[] {clienteAutorizacionPago2.getNombre(), clienteAutorizacionPago2.getCedula(), clienteAutorizacionPago2.getDireccion(), clienteAutorizacionPago2.getTelefono(), clienteAutorizacionPago2.getIdTipoDocumento(),  clienteAutorizacionPago2.getId()});
	  }
	
// 	Datos Formulario Pago
	@Override
	  public DatosFormularioPago2 findByIdDatosFormularioPago(Long id) {
	    try {
	    	DatosFormularioPago2 datosFormularioPago2 = jdbcTemplate.queryForObject("SELECT * FROM datos_formulario_pago WHERE id=?",
	          BeanPropertyRowMapper.newInstance(DatosFormularioPago2.class), id);
	      return datosFormularioPago2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarDatosFormularioPago(DatosFormularioPago2 datosFormularioPago2) {
	    return jdbcTemplate.update("UPDATE datos_formulario_pago SET fecha_sorteo = ?, serie_preimpresa = ?, serie_impresa = ?, colilla_impresa = ?, colilla_preimpresa = ?, serie_codigo_venta = ?, nombre_sorteo_loteria = ?, total_formulario = ?, total_ganado_bruto = ?, cedula_colocador = ?, id_clientes_autorizacion_pago = ? WHERE id = ?",
	        new Object[] {datosFormularioPago2.getFechaSorteo(), datosFormularioPago2.getSeriePreImpresa(),datosFormularioPago2.getSerieImpresa(), datosFormularioPago2.getColillaImpresa(), datosFormularioPago2.getColillaPreImpresa(), datosFormularioPago2.getSerieCodigoVenta(), datosFormularioPago2.getNombreSorteoLoteria(), datosFormularioPago2.getTotalFormulario(), datosFormularioPago2.getTotalGanadoBruto(), datosFormularioPago2.getCedulaColocador(), datosFormularioPago2.getIdClientesAutorizacionPago(), datosFormularioPago2.getId()});
	  }
	
// 	Solicitud Autorizacion Pago
	@Override
	  public SolicitudAutorizacionPago2 findByIdSolicitudAutorizacionPago(Long id) {
	    try {
	    	SolicitudAutorizacionPago2 solicitudAutorizacionPago2 = jdbcTemplate.queryForObject("SELECT * FROM solicitud_autorizacion_pago WHERE id=?",
	          BeanPropertyRowMapper.newInstance(SolicitudAutorizacionPago2.class), id);
	      return solicitudAutorizacionPago2;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null; 
	    }
	  }

	@Override
	  public int modificarSolicitudAutorizacionPago(SolicitudAutorizacionPago2 solicitudAutorizacionPago2) {
	    return jdbcTemplate.update("UPDATE solicitud_autorizacion_pago SET fecha=?, id_oficina=?, nombre_oficina=?, id_datos_formulario_pago=?, id_motivo_autorizacion_pago=?, id_usuario=? WHERE id=?",
	        new Object[] {solicitudAutorizacionPago2.getFecha(), solicitudAutorizacionPago2.getIdOficina(), solicitudAutorizacionPago2.getNombreOficiona(),solicitudAutorizacionPago2.getIdDatosFormularioPago(), solicitudAutorizacionPago2.getIdMotivoAutorizacionPago(), solicitudAutorizacionPago2.getIdUsuario(), solicitudAutorizacionPago2.getId()});
	  }
		
}