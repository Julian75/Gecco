package com.gecco.ServiceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.gecco.Entity.ConsultaRaspa;
import com.gecco.EntityModifica.Accesos2;
import com.gecco.EntityModifica.ArchivoSolicitud2;
import com.gecco.EntityModifica.AsigArtiReporteEmpresas;
import com.gecco.EntityModifica.AsignacionActivoConsulta;
import com.gecco.EntityModifica.AsignacionActivoPuntoVentaConsulta;
import com.gecco.EntityModifica.AsignacionPuntoVentaArticulo2;
import com.gecco.EntityModifica.AsignacionesActivosPendiente2;
import com.gecco.EntityModifica.AsignacionesArticulos2;
import com.gecco.EntityModifica.AsignacionesProcesos2;
import com.gecco.EntityModifica.AsignarTurnoVendedor2;
import com.gecco.EntityModifica.AuditoriaActivo2;
import com.gecco.EntityModifica.AuditoriaActivoRegistro2;
import com.gecco.EntityModifica.Cotizacion2;
import com.gecco.EntityModifica.Cuenta2;
import com.gecco.EntityModifica.DetalleArticuloSinBaja;
import com.gecco.EntityModifica.DetalleSolicitud2;
import com.gecco.EntityModifica.GestionProceso2;
import com.gecco.EntityModifica.Historial2;
import com.gecco.EntityModifica.HistorialArticulo2;
import com.gecco.EntityModifica.HistorialSolicitudes2;
import com.gecco.EntityModifica.Inventario2;
import com.gecco.EntityModifica.LibroMayor2;
import com.gecco.EntityModifica.MatrizNecesidadConsultaCierre;
import com.gecco.EntityModifica.MatrizNecesidadDetalle2;
import com.gecco.EntityModifica.OrdenCompra2;
import com.gecco.EntityModifica.PorcentajePresupuesto2;
import com.gecco.EntityModifica.PresupuestoContable2;
import com.gecco.EntityModifica.Proceso2;
import com.gecco.EntityModifica.Raspas2;
import com.gecco.EntityModifica.Soporte2;
import com.gecco.EntityModifica.UsuariosAdministracion2;
import com.gecco.EntityModifica.matrizNecesidadDetalleConsulta;
import com.gecco.Service.IConsultasGeneralesService;

@Repository
public class ConsultasGeneralesServiceImplement implements IConsultasGeneralesService{

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;
	
	@Override
	public List<ConsultaRaspa> findByRaspa(String raspa) {
		List<ConsultaRaspa> lista = new ArrayList<ConsultaRaspa>();
		try {
			String consultaId = "SELECT * FROM raspas WHERE raspa = "+raspa;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(ConsultaRaspa.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<ConsultaRaspa> getAll() {
		List<ConsultaRaspa> lista = new ArrayList<ConsultaRaspa>();
		try {
			String consultaId = "SELECT DISTINCT sig.id, sig.fec_pago, sig.fec_venta, sig.estado, sig.ide_oficina, sig.raspa, sig.emision_raspa, sig.nombres, sig.apellido1 FROM siga_raspas AS sig WHERE NOT EXISTS(SELECT * FROM raspas AS gec WHERE gec.raspa = sig.raspa)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(ConsultaRaspa.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<Cotizacion2> findByCotizacion(Integer idSolicitud) {
		List<Cotizacion2> lista = new ArrayList<Cotizacion2>();
		try {
			String consultaId = "SELECT * FROM cotizacion WHERE id_solicitud = "+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Cotizacion2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<UsuariosAdministracion2> findByUsuariosAdministracion(Integer idSolicitud) {
		List<UsuariosAdministracion2> lista = new ArrayList<UsuariosAdministracion2>();
		try {
			String consultaId = "SELECT * FROM usuarios_administracion WHERE id_solicitud ="+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(UsuariosAdministracion2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<OrdenCompra2> findByOrdenCompra(Integer idSolicitud) {
		List<OrdenCompra2> lista = new ArrayList<OrdenCompra2>();
		try {
			String consultaId = "SELECT * FROM orden_compra WHERE id_solicitud ="+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(OrdenCompra2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<GestionProceso2> findByGestionProceso(Integer idUsuario) {
		List<GestionProceso2> lista = new ArrayList<GestionProceso2>();
		try {
			String consultaId = "SELECT * FROM gestion_proceso WHERE id_usuario ="+idUsuario;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(GestionProceso2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<DetalleSolicitud2> findByDetalleSolicitud(Integer idSolicitud) {
		List<DetalleSolicitud2> lista = new ArrayList<DetalleSolicitud2>();
		try {
			String consultaId = "SELECT * FROM detalle_solicitud WHERE id_solicitud ="+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(DetalleSolicitud2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<Proceso2> findByProceso(Integer idCategoria) {
		List<Proceso2> lista = new ArrayList<Proceso2>();
		try {
			String consultaId = "SELECT * FROM proceso WHERE id_categoria ="+idCategoria;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Proceso2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<DetalleSolicitud2> findBySolicitudDetalleEst(Integer idSolicitud) {
		List<DetalleSolicitud2> lista = new ArrayList<DetalleSolicitud2>();
		try {
			String consultaId = "SELECT * FROM detalle_solicitud WHERE id_solicitud = "+idSolicitud+" && id_estado != 59";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(DetalleSolicitud2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<DetalleSolicitud2> findBySolicitudDetalleEstados(Integer idSolicitud) {
		List<DetalleSolicitud2> lista = new ArrayList<DetalleSolicitud2>();
		try {
			String consultaId = "SELECT * FROM detalle_solicitud WHERE id_solicitud = "+idSolicitud+" AND (id_estado = 57 OR id_estado = 56)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(DetalleSolicitud2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<Historial2> findByHistorial(Integer idSolicitud) {
		List<Historial2> lista = new ArrayList<Historial2>();
		try {
			String consultaId = "SELECT * FROM historial_solicitudes WHERE id_solicitud_sc = "+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Historial2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<Soporte2> findBySoporte(Integer idHistorial) {
		List<Soporte2> lista = new ArrayList<Soporte2>();
		try {
			String consultaId = "SELECT * FROM soporte_sc WHERE id_historial = "+idHistorial;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Soporte2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<ArchivoSolicitud2> findByArchivoSolicitud(Integer idSolicitud) {
		List<ArchivoSolicitud2> lista = new ArrayList<ArchivoSolicitud2>();
		try {
			String consultaId = "SELECT * FROM archivo_solicitud WHERE id_solicitudsc = "+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(ArchivoSolicitud2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AsignarTurnoVendedor2> findByAsignarTurnoVendedor(String fechaActual) {
		List<AsignarTurnoVendedor2> lista = new ArrayList<AsignarTurnoVendedor2>();
		try {
			String consultaId = "SELECT * FROM `asignar_turno_vendedor` WHERE '"+fechaActual+"'>=fecha_inicio && '"+fechaActual+"'<=fecha_final && estado != 'Eliminado'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignarTurnoVendedor2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<Inventario2> findByArticulosBaja() {
		List<Inventario2> lista = new ArrayList<Inventario2>();
		try {
			String consultaId = "SELECT DISTINCT inv.id, inv.cantidad, inv.fecha, inv.id_detalle_articulo, inv.id_usuario FROM inventario AS inv INNER JOIN solicitud_bajas_articulos AS sol ON sol.id_estado = 82 WHERE NOT EXISTS(SELECT * FROM articulos_baja AS artbaja WHERE artbaja.id_detalle_articulo = inv.id_detalle_articulo)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Inventario2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AsignacionActivoConsulta> findByAsignacionArticulo(Long idUsuario) {
		List<AsignacionActivoConsulta> lista = new ArrayList<AsignacionActivoConsulta>();
		try {
			String consultaId = "SELECT DISTINCT asigArt.id AS ideAsignacion, art.descripcion AS articulo, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario, tipoProc.descripcion AS tipoProceso, detArt.serial AS serial, detArt.placa AS placa, estado.descripcion AS estadoAsignacion, estado.id AS ideEstadoAsignacion, detArt.id AS ideDetalleActivo FROM asignaciones_articulos AS asigArt INNER JOIN estado AS estado ON asigArt.id_estado = estado.id INNER JOIN solicitud_bajas_articulos AS sol ON sol.id_estado = 82 INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN asignaciones_procesos AS asigProc ON asigArt.id_asignaciones_procesos = asigProc.id INNER JOIN tipos_procesos AS tipoProc ON asigProc.id_tipos_procesos = tipoProc.id INNER JOIN usuario AS usuario ON asigProc.id_usuario = usuario.id WHERE (NOT EXISTS(SELECT * FROM articulos_baja AS artbaja WHERE artbaja.id_detalle_articulo = asigArt.id_detalle_articulo) AND asigArt.id_estado = 76 AND art.id_estado = 26 AND asigProc.id_usuario = "+idUsuario+") OR (NOT EXISTS(SELECT * FROM articulos_baja AS artbaja WHERE artbaja.id_detalle_articulo = asigArt.id_detalle_articulo) AND asigArt.id_estado = 78 AND art.id_estado = 26 AND asigProc.id_usuario = "+idUsuario+")";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionActivoConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<HistorialSolicitudes2> findByHistorialSolicitudes(Integer idSolicitud) {
		List<HistorialSolicitudes2> lista = new ArrayList<HistorialSolicitudes2>();
		try {
			String consultaId = "SELECT * FROM historial_solicitudes WHERE id_solicitud_sc = "+idSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(HistorialSolicitudes2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<Cuenta2> findByCuentas(Integer codigo) {
		List<Cuenta2> lista = new ArrayList<Cuenta2>();
		try {
			String consultaId = "SELECT * FROM cuenta WHERE codigo = "+codigo;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Cuenta2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<LibroMayor2> findByLibroMayor(Long idCuenta, String fecha) {
		List<LibroMayor2> lista = new ArrayList<LibroMayor2>();
		try {
			String consultaId = "SELECT * FROM libro_mayor WHERE id_cuenta = "+idCuenta+" AND fecha = '"+fecha+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(LibroMayor2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<PorcentajePresupuesto2> findByPorcentajePresupuesto(Long idCuenta, String fecha) {
		List<PorcentajePresupuesto2> lista = new ArrayList<PorcentajePresupuesto2>();
		try {
			String consultaId = "SELECT * FROM porcentaje_presupuesto WHERE id_cuenta = "+idCuenta+" AND fecha = '"+fecha+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(PorcentajePresupuesto2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<PresupuestoContable2> findByPresupuestoContable(String fecha) {
		List<PresupuestoContable2> lista = new ArrayList<PresupuestoContable2>();
		try {
			String consultaId = "SELECT * FROM presupuesto_contable WHERE fecha = '"+fecha+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(PresupuestoContable2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<LibroMayor2> findByLibroMayorFechas(Long idCuenta, String fecha) {
		List<LibroMayor2> lista = new ArrayList<LibroMayor2>();
		try {
			String consultaId = "SELECT * FROM `libro_mayor` WHERE fecha BETWEEN '"+fecha+"-01-01' AND '"+fecha+"-12-31' AND id_cuenta = "+idCuenta;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(LibroMayor2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<LibroMayor2> findByLibroMayoAñoyMes(String fecha) {
		List<LibroMayor2> lista = new ArrayList<LibroMayor2>();
		try {
			String consultaId = "SELECT * FROM `libro_mayor` WHERE fecha = '"+fecha+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(LibroMayor2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<PresupuestoContable2> findByPresupuestoContableCuentaFecha(Long idCuenta, String fecha) {
		List<PresupuestoContable2> lista = new ArrayList<PresupuestoContable2>();
		try {
			String consultaId = "SELECT * FROM presupuesto_contable WHERE id_cuenta = "+idCuenta+" AND fecha = '"+fecha+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(PresupuestoContable2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<LibroMayor2> findByLibroMayorAño(String fecha) {
		List<LibroMayor2> lista = new ArrayList<LibroMayor2>();
		try {
			String consultaId = "SELECT * FROM `libro_mayor` WHERE fecha BETWEEN '"+fecha+"-01-01' AND '"+fecha+"-12-31'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(LibroMayor2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<Cuenta2> findByCuentasJerarquia(Long idJerarquiaCuenta) {
		List<Cuenta2> lista = new ArrayList<Cuenta2>();
		try {
			String consultaId = "SELECT * FROM `cuenta` WHERE id_jerarquia_cuentas ="+idJerarquiaCuenta;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Cuenta2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<Raspas2> findByRaspasGecco(String fechaInicio, String fechaFinal) {
		List<Raspas2> lista = new ArrayList<Raspas2>();
		try {
			String consultaId = "SELECT * FROM `raspas` WHERE fecha BETWEEN '"+fechaInicio+"' AND '"+fechaFinal+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Raspas2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AuditoriaActivo2> findByAuditoriaActivo(Long idAuditoriaActivoRegistro, Long idAsignacionPuntoVentaActivo) {
		List<AuditoriaActivo2> lista = new ArrayList<AuditoriaActivo2>();
		try {
			String consultaId = "SELECT * FROM `auditoria_activo` WHERE id_auditoria_activo_registro = "+idAuditoriaActivoRegistro+" AND id_asignacion_punto_venta_articulo = "+idAsignacionPuntoVentaActivo;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AuditoriaActivo2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AuditoriaActivoRegistro2> findByAuditoriaActivoRegistroFechas(String fechaInicio, String fechaFinal) {
		List<AuditoriaActivoRegistro2> lista = new ArrayList<AuditoriaActivoRegistro2>();
		try {
			String consultaId = "SELECT * FROM `auditoria_activo_registro` WHERE fecha BETWEEN '"+fechaInicio+" 00:00:00' AND '"+fechaFinal+" 23:59:59'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AuditoriaActivoRegistro2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AuditoriaActivoRegistro2> findByAuditoriaActivoRegistro(String fecha, Long idUsuario) {
		List<AuditoriaActivoRegistro2> lista = new ArrayList<AuditoriaActivoRegistro2>();
		try {
			String consultaId = "SELECT * FROM `auditoria_activo_registro` WHERE id_usuario = "+idUsuario+" AND fecha = '"+fecha+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AuditoriaActivoRegistro2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<GestionProceso2> findByGestionProcesoSolicitud(Long idDetalleSolicitud) {
		List<GestionProceso2> lista = new ArrayList<GestionProceso2>();
		try {
			String consultaId = "SELECT * FROM gestion_proceso WHERE id_detalle_solicitud = "+idDetalleSolicitud;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(GestionProceso2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AuditoriaActivo2> findByAuditoriaActivIdRegistro(Long idAuditoriaActivoRegistro) {
		List<AuditoriaActivo2> lista = new ArrayList<AuditoriaActivo2>();
		try {
			String consultaId = "SELECT * FROM `auditoria_activo` WHERE id_auditoria_activo_registro = "+idAuditoriaActivoRegistro;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AuditoriaActivo2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<Accesos2> findByAccesos(Long idRol) {
		List<Accesos2> lista = new ArrayList<Accesos2>();
		try {
			String consultaId = "SELECT * FROM `accesos` WHERE id_rol = "+idRol;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Accesos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<MatrizNecesidadDetalle2> findByMatrizDetalleProceso(Long idTipoProceso, String fecha) {
		List<MatrizNecesidadDetalle2> lista = new ArrayList<MatrizNecesidadDetalle2>();
		try {
			String consultaId = "SELECT matDet.id, matDet.fecha, matDet.descripcion, matDet.id_matriz_necesidad FROM matriz_necesidad AS mat INNER JOIN matriz_necesidad_detalle AS matDet ON mat.id = matDet.id_matriz_necesidad INNER JOIN sub_proceso AS subPro ON subPro.id = mat.id_sub_proceso WHERE subPro.id_tipo_proceso = "+idTipoProceso+" AND matDet.fecha BETWEEN '"+fecha+"-01' AND '"+fecha+"-31'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(MatrizNecesidadDetalle2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AsignacionesProcesos2> findByAsignacionProceso(Long idUsuario) {
		List<AsignacionesProcesos2> lista = new ArrayList<AsignacionesProcesos2>();
		try {
			String consultaId = "SELECT * FROM asignaciones_procesos WHERE id_usuario = "+idUsuario;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesProcesos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionActivoConsulta> findByAsignacionArticulosEstadoDetalle1(Long idUsuario) {
		List<AsignacionActivoConsulta> lista = new ArrayList<AsignacionActivoConsulta>();
		try {
			String consultaId = "SELECT asiArt.id AS ideAsignacion, art.descripcion AS articulo, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario, tipoProc.descripcion AS tipoProceso, detArt.serial AS serial, detArt.placa AS placa, estado.descripcion AS estadoAsignacion, estado.id AS ideEstadoAsignacion, detArt.id AS ideDetalleActivo FROM asignaciones_articulos AS asiArt INNER JOIN estado as estado ON asiArt.id_estado = estado.id INNER JOIN detalle_articulo AS detArt ON asiArt.id_detalle_articulo = detArt.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN asignaciones_procesos AS asigProc ON asiArt.id_asignaciones_procesos = asigProc.id INNER JOIN tipos_procesos AS tipoProc ON asigProc.id_tipos_procesos = tipoProc.id INNER JOIN usuario as usuario ON asigProc.id_usuario = usuario.id WHERE (asiArt.id_estado = 76 AND art.id_estado = 26 AND asigProc.id_usuario = "+idUsuario+") OR (asiArt.id_estado = 78 AND art.id_estado = 26 AND asigProc.id_usuario = "+idUsuario+")";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionActivoConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionActivoPuntoVentaConsulta> findByAsignacionArticulosSitioVenta(Long idProceso, Long ideOficina, Long ideSitioVenta) {
		List<AsignacionActivoPuntoVentaConsulta> lista = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
		try {
			String consultaId = "SELECT detArt.id AS ideDetalleActivo, art.descripcion AS tipoArticulo, detArt.placa, detArt.marca, detArt.serial, tipAct.descripcion AS tipoActivo, categoria.descripcion AS categoria, asiArtPuntVen.nombre_oficina, asiArtPuntVen.nombre_sitio_venta, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario, estado.descripcion AS estadoAsignacion, estado.id AS ideEstadoAsignacion FROM asignacion_punto_venta_articulo AS asiArtPuntVen INNER JOIN asignaciones_articulos AS asigArt ON asiArtPuntVen.id_asignaciones_articulos = asigArt.id INNER JOIN estado AS estado ON asigArt.id_estado = estado.id INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id INNER JOIN tipo_activo AS tipAct ON detArt.id_tipo_activo = tipAct.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN categoria AS categoria ON art.id_categoria = categoria.id INNER JOIN asignaciones_procesos AS asigProc ON asigArt.id_asignaciones_procesos = asigProc.id INNER JOIN usuario AS usuario ON asigProc.id_usuario = usuario.id WHERE (asigProc.id_tipos_procesos = "+idProceso+" AND asiArtPuntVen.id_oficina = "+ideOficina+" AND asiArtPuntVen.id_sitio_venta = "+ideSitioVenta+" AND asigArt.id_estado = 76) OR (asigProc.id_tipos_procesos = "+idProceso+" AND asiArtPuntVen.id_oficina = "+ideOficina+" AND asiArtPuntVen.id_sitio_venta = "+ideSitioVenta+" AND asigArt.id_estado = 78)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionActivoPuntoVentaConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionPuntoVentaArticulo2> findByAsignacionActivoIdeDetalle(Long idDetalleActivo, Long ideOficina, Long ideSitioVenta) {
		List<AsignacionPuntoVentaArticulo2> lista = new ArrayList<AsignacionPuntoVentaArticulo2>();
		try {
			String consultaId = "SELECT * FROM asignacion_punto_venta_articulo AS asiArtPuntVen INNER JOIN asignaciones_articulos AS asigArt ON asiArtPuntVen.id_asignaciones_articulos = asigArt.id INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id WHERE detArt.id = "+idDetalleActivo+" AND asiArtPuntVen.id_oficina = "+ideOficina+" AND asiArtPuntVen.id_sitio_venta = "+ideSitioVenta+"";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionPuntoVentaArticulo2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<HistorialArticulo2> findByHistorialActivo(Long idDetalleActivo) {
		List<HistorialArticulo2> lista = new ArrayList<HistorialArticulo2>();
		try {
			String consultaId = "SELECT * FROM `historial_articulo` WHERE id_detalle_articulo = "+idDetalleActivo;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(HistorialArticulo2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AsignacionPuntoVentaArticulo2> findByAsignPuntoVentArtDetArtUsuario(Long idDetalleArticulo, Long idUsuario) {
		List<AsignacionPuntoVentaArticulo2> lista = new ArrayList<AsignacionPuntoVentaArticulo2>();
		try {
			String consultaId = "SELECT asiArtPuntVen.id, asiArtPuntVen.id_oficina, asiArtPuntVen.id_sitio_venta, asiArtPuntVen.id_asignaciones_articulos, asiArtPuntVen.cantidad, asiArtPuntVen.nombre_oficina, asiArtPuntVen.nombre_sitio_venta FROM asignacion_punto_venta_articulo AS asiArtPuntVen INNER JOIN asignaciones_articulos AS asigArt ON asiArtPuntVen.id_asignaciones_articulos = asigArt.id INNER JOIN asignaciones_procesos AS asigProc ON asigArt.id_asignaciones_procesos = asigProc.id WHERE asigArt.id_detalle_articulo = "+idDetalleArticulo+" AND asigProc.id_usuario = "+idUsuario;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionPuntoVentaArticulo2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionesActivosPendiente2> findByAsignacionesActivosPendiente(Long idUsuarioAsignacionPendiente, Long idDetalleActivo) {
		List<AsignacionesActivosPendiente2> lista = new ArrayList<AsignacionesActivosPendiente2>();
		try {
			String consultaId = "SELECT * FROM `asignaciones_activos_pendiente` WHERE id_usuario_asignacion_pendiente = "+idUsuarioAsignacionPendiente+" AND id_detalle_activo = "+idDetalleActivo;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesActivosPendiente2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionesArticulos2> findByAsignacionArticuloIdeDetArt(Long idDetalleActivo) {
		List<AsignacionesArticulos2> lista = new ArrayList<AsignacionesArticulos2>();
		try {
			String consultaId = "SELECT * FROM `asignaciones_articulos` WHERE id_detalle_articulo = "+idDetalleActivo;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesArticulos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionActivoPuntoVentaConsulta> findByAsignacionArticulosSerial(Long idProceso, String serial) {
		List<AsignacionActivoPuntoVentaConsulta> lista = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
		try {
			String consultaId = "SELECT DISTINCT detArt.id AS ideDetalleActivo, art.descripcion AS tipoArticulo, detArt.placa, detArt.marca, detArt.serial, tipAct.descripcion AS tipoActivo, categoria.descripcion AS categoria, asiArtPuntVen.nombre_oficina, asiArtPuntVen.nombre_sitio_venta, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario, estado.descripcion AS estadoAsignacion, estado.id AS ideEstadoAsignacion FROM asignaciones_articulos AS asigArt LEFT JOIN asignacion_punto_venta_articulo AS asiArtPuntVen ON asiArtPuntVen.id_asignaciones_articulos = asigArt.id INNER JOIN estado AS estado ON asigArt.id_estado = estado.id INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id INNER JOIN tipo_activo AS tipAct ON detArt.id_tipo_activo = tipAct.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN categoria AS categoria ON art.id_categoria = categoria.id INNER JOIN asignaciones_procesos AS asigProc ON asigArt.id_asignaciones_procesos = asigProc.id INNER JOIN usuario AS usuario ON asigProc.id_usuario = usuario.id WHERE (asigProc.id_tipos_procesos = "+idProceso+" AND asigArt.id_estado = 76 AND UPPER(serial) = '"+serial+"' ) OR (asigProc.id_tipos_procesos = "+idProceso+" AND asigArt.id_estado = 78 AND UPPER(serial) = '"+serial+"')";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionActivoPuntoVentaConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionActivoPuntoVentaConsulta> findByAsignacionArticulosPlaca(Long idProceso, String placa) {
		List<AsignacionActivoPuntoVentaConsulta> lista = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
		try {
			String consultaId = "SELECT DISTINCT detArt.id AS ideDetalleActivo, art.descripcion AS tipoArticulo, detArt.placa, detArt.marca, detArt.serial, tipAct.descripcion AS tipoActivo, categoria.descripcion AS categoria, asiArtPuntVen.nombre_oficina, asiArtPuntVen.nombre_sitio_venta, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario, estado.descripcion AS estadoAsignacion, estado.id AS ideEstadoAsignacion FROM asignaciones_articulos AS asigArt LEFT JOIN asignacion_punto_venta_articulo AS asiArtPuntVen ON asiArtPuntVen.id_asignaciones_articulos = asigArt.id INNER JOIN estado AS estado ON asigArt.id_estado = estado.id INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id INNER JOIN tipo_activo AS tipAct ON detArt.id_tipo_activo = tipAct.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN categoria AS categoria ON art.id_categoria = categoria.id INNER JOIN asignaciones_procesos AS asigProc ON asigArt.id_asignaciones_procesos = asigProc.id INNER JOIN usuario AS usuario ON asigProc.id_usuario = usuario.id WHERE (asigProc.id_tipos_procesos = "+idProceso+" AND asigArt.id_estado = 76 AND UPPER(placa) = '"+placa+"' ) OR (asigProc.id_tipos_procesos = "+idProceso+" AND asigArt.id_estado = 78 AND UPPER(placa) = '"+placa+"')";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionActivoPuntoVentaConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionActivoPuntoVentaConsulta> findByAsignacionArticulosidUsuario(Long idUsuario) {
		List<AsignacionActivoPuntoVentaConsulta> lista = new ArrayList<AsignacionActivoPuntoVentaConsulta>();
		try {
			String consultaId = "SELECT DISTINCT detArt.id AS ideDetalleActivo, art.descripcion AS tipoArticulo, detArt.placa, detArt.marca, detArt.serial, tipAct.descripcion AS tipoActivo, categoria.descripcion AS categoria, asiArtPuntVen.nombre_oficina, asiArtPuntVen.nombre_sitio_venta, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario, estado.descripcion AS estadoAsignacion, estado.id AS ideEstadoAsignacion FROM asignaciones_articulos AS asigArt LEFT JOIN asignacion_punto_venta_articulo AS asiArtPuntVen ON asiArtPuntVen.id_asignaciones_articulos = asigArt.id INNER JOIN estado AS estado ON asigArt.id_estado = estado.id INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id INNER JOIN tipo_activo AS tipAct ON detArt.id_tipo_activo = tipAct.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN categoria AS categoria ON art.id_categoria = categoria.id INNER JOIN asignaciones_procesos AS asigProc ON asigArt.id_asignaciones_procesos = asigProc.id INNER JOIN usuario AS usuario ON asigProc.id_usuario = usuario.id WHERE (asigProc.id_usuario = "+idUsuario+" AND asigArt.id_estado = 76) OR (asigProc.id_usuario = "+idUsuario+" AND asigArt.id_estado = 78)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionActivoPuntoVentaConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionesProcesos2> findByAsignacionProcesoIdProceso(Long idProceso) {
		List<AsignacionesProcesos2> lista = new ArrayList<AsignacionesProcesos2>();
		try {
			String consultaId = "SELECT * FROM asignaciones_procesos WHERE id_tipos_procesos = "+idProceso;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesProcesos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizDetalleCompleto() {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT CONCAT(MONTHNAME(matrizNecDet.fecha), ' ', YEAR(matrizNecDet.fecha)) AS fechaEjecutar, matrizNec.id AS idMatrizNecesidad, tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, tipNec.descripcion AS tipoNecesidad, matrizNecDet.descripcion AS detalle, matrizNecDet.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNecDet.cantidad_ejecuciones_cumplidas AS ejecucionesCumplidas, matrizNecDet.cantidad_estimada AS cantidadEstimada, matrizNecDet.cantidad_comprada AS cantidadEjecutada, matrizNec.costo_unitario AS costoUnitarioEstimado, matrizNecDet.costo_ejecucion_comprada AS costoUnitarioEjecutado, CONCAT(round(matrizNecDet.porcentaje, 0), '', '%') AS porcentajeEjecucion, matrizNec.costo_estimado AS totalEstimado, matrizNec.costo_total AS totalEjecutado FROM `matriz_necesidad_detalle` AS matrizNecDet INNER JOIN matriz_necesidad as matrizNec ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizDetalleIdProcesoCompleto(Long idProceso) {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT CONCAT(MONTHNAME(matrizNecDet.fecha), ' ', YEAR(matrizNecDet.fecha)) AS fechaEjecutar, matrizNec.id AS idMatrizNecesidad, tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, tipNec.descripcion AS tipoNecesidad, matrizNecDet.descripcion AS detalle, matrizNecDet.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNecDet.cantidad_ejecuciones_cumplidas AS ejecucionesCumplidas, matrizNecDet.cantidad_estimada AS cantidadEstimada, matrizNecDet.cantidad_comprada AS cantidadEjecutada, matrizNec.costo_unitario AS costoUnitarioEstimado, matrizNecDet.costo_ejecucion_comprada AS costoUnitarioEjecutado, CONCAT(round(matrizNecDet.porcentaje, 0), '', '%') AS porcentajeEjecucion, matrizNec.costo_estimado AS totalEstimado, matrizNec.costo_total AS totalEjecutado FROM `matriz_necesidad_detalle` AS matrizNecDet INNER JOIN matriz_necesidad as matrizNec ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad WHERE tipProc.id = "+idProceso;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizDetalleIdSubprocesoCompleto(Long idSubProceso) {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT CONCAT(MONTHNAME(matrizNecDet.fecha), ' ', YEAR(matrizNecDet.fecha)) AS fechaEjecutar, matrizNec.id AS idMatrizNecesidad, tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, tipNec.descripcion AS tipoNecesidad, matrizNecDet.descripcion AS detalle, matrizNecDet.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNecDet.cantidad_ejecuciones_cumplidas AS ejecucionesCumplidas, matrizNecDet.cantidad_estimada AS cantidadEstimada, matrizNecDet.cantidad_comprada AS cantidadEjecutada, matrizNec.costo_unitario AS costoUnitarioEstimado, matrizNecDet.costo_ejecucion_comprada AS costoUnitarioEjecutado, CONCAT(round(matrizNecDet.porcentaje, 0), '', '%') AS porcentajeEjecucion, matrizNec.costo_estimado AS totalEstimado, matrizNec.costo_total AS totalEjecutado FROM `matriz_necesidad_detalle` AS matrizNecDet INNER JOIN matriz_necesidad as matrizNec ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad WHERE subProc.id = "+idSubProceso;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizDetalleCompletoConsolidado() {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, matrizNec.detalle, matrizNec.cantidad AS cantidadEstimada, matrizNec.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNec.costo_estimado AS totalEstimado FROM `matriz_necesidad` AS matrizNec JOIN matriz_necesidad_detalle AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizDetalleIdProcesoCompletoConsolidado(Long idProceso) {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, matrizNec.detalle, matrizNec.cantidad AS cantidadEstimada, matrizNec.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNec.costo_estimado AS totalEstimado FROM `matriz_necesidad` AS matrizNec JOIN matriz_necesidad_detalle AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso WHERE tipProc.id = "+idProceso;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizDetalleIdSubprocesoCompletoConsolidado(Long idSubProceso) {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, matrizNec.detalle, matrizNec.cantidad AS cantidadEstimada, matrizNec.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNec.costo_estimado AS totalEstimado FROM `matriz_necesidad` AS matrizNec JOIN matriz_necesidad_detalle AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso WHERE subProc.id = "+idSubProceso;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<Accesos2> findByAccesosModulo76(Long idRol) {
		List<Accesos2> lista = new ArrayList<Accesos2>();
		try {
			String consultaId = "SELECT * FROM `accesos` WHERE id_rol = "+idRol+" AND id_modulo = 76";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(Accesos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizNecesidadesLista(String ano) {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT matrizNec.id AS idMatrizNecesidad, tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, tipNec.descripcion AS tipoNecesidad, matrizNec.detalle, matrizNec.cantidad AS cantidadEstimada, matrizNec.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNec.costo_estimado AS totalEstimado, matrizNec.costo_total AS totalEjecutado, matrizNec.porcentaje_total AS porcTotal, matrizNec.cum_planeacion AS cumPlaneacion FROM matriz_necesidad as matrizNec INNER JOIN `matriz_necesidad_detalle` AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad WHERE matrizNecDet.id_estado != 87 AND YEAR(matrizNecDet.fecha) = '"+ano+"'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizNecesidadesListaIdProceso(Long idUsuario) {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT matrizNec.id AS idMatrizNecesidad, tipProc.descripcion AS proceso, subProc.descripcion AS subproceso, tipNec.descripcion AS tipoNecesidad, matrizNec.detalle, matrizNec.cantidad AS cantidadEstimada, matrizNec.cantidad_ejecuciones AS ejecucionesEstimadas, matrizNec.costo_estimado AS totalEstimado, matrizNec.costo_total AS totalEjecutado, matrizNec.porcentaje_total AS porcTotal, matrizNec.cum_planeacion AS cumPlaneacion FROM matriz_necesidad as matrizNec INNER JOIN `matriz_necesidad_detalle` AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad INNER JOIN asignaciones_procesos AS asignProcUsuario WHERE matrizNecDet.id_estado != 87 AND matrizNecDet.id_estado != 99 AND asignProcUsuario.id_usuario = "+idUsuario+" AND asignProcUsuario.id_tipos_procesos = tipProc.id AND YEAR(matrizNecDet.fecha) = (SELECT DISTINCT MIN(YEAR(matrizNecDet.fecha)) FROM matriz_necesidad as matrizNec INNER JOIN `matriz_necesidad_detalle` AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad INNER JOIN asignaciones_procesos AS asignProcUsuario WHERE matrizNecDet.id_estado != 87 AND matrizNecDet.id_estado != 99 AND asignProcUsuario.id_usuario = "+idUsuario+" AND asignProcUsuario.id_tipos_procesos = tipProc.id LIMIT 1);";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionesArticulos2> findByAsignArticuloDetalleArtUsuario(Long idDetalleArticulo, Long idUsuario, String dispositivo) {
		List<AsignacionesArticulos2> lista = new ArrayList<AsignacionesArticulos2>();
		try {
			String consultaId = "SELECT asigArt.id, asigArt.id_asignaciones_procesos, asigArt.id_detalle_articulo, asigArt.id_estado FROM asignaciones_articulos AS asigArt INNER JOIN asignaciones_procesos AS asigPro ON asigArt.id_asignaciones_procesos = asigPro.id INNER JOIN usuario AS usu ON asigPro.id_usuario = usu.id INNER JOIN detalle_articulo AS detArt ON asigArt.id_detalle_articulo = detArt.id WHERE id_detalle_articulo = "+idDetalleArticulo+" AND usu.id = "+idUsuario+" AND (asigArt.id_estado = 76 OR asigArt.id_estado = 78) AND (detArt.placa = '"+dispositivo+"' OR detArt.serial = '"+dispositivo+"')";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesArticulos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionesArticulos2> findByAsignacionArticulosBajaUsuario(Long idUsuario, String dispositivo) {
		List<AsignacionesArticulos2> lista = new ArrayList<AsignacionesArticulos2>();
		try {
			String consultaId = "SELECT DISTINCT asigArt.id, asigArt.id_asignaciones_procesos, asigArt.id_detalle_articulo, asigArt.id_estado FROM asignaciones_articulos AS asigArt INNER JOIN asignaciones_procesos AS asigPro ON asigPro.id = asigArt.id_asignaciones_procesos INNER JOIN solicitud_bajas_articulos AS sol ON sol.id_estado = 82 INNER JOIN detalle_articulo as detArt ON asigArt.id_detalle_articulo = detArt.id WHERE (detArt.placa = '\"+dispositivo+\"' OR detArt.serial = '"+dispositivo+"') AND asigPro.id_usuario = "+idUsuario+" AND asigArt.id_estado = 76 AND NOT EXISTS(SELECT * FROM articulos_baja AS artbaja WHERE artbaja.id_detalle_articulo = asigArt.id_detalle_articulo AND artbaja.id_estado = 82)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesArticulos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<AsignacionesArticulos2> findByAsignacionArticuloUsuario(Long idUsuario, String dispositivo) {
		List<AsignacionesArticulos2> lista = new ArrayList<AsignacionesArticulos2>();
		try {
			String consultaId = "SELECT asigArt.id, asigArt.id_asignaciones_procesos, asigArt.id_detalle_articulo, asigArt.id_estado FROM asignaciones_articulos AS asigArt INNER JOIN asignaciones_procesos AS asigPro ON asigPro.id = asigArt.id_asignaciones_procesos INNER JOIN detalle_articulo AS detArt ON detArt.id = asigArt.id_detalle_articulo WHERE (detArt.placa = '"+dispositivo+"' OR detArt.serial = '"+dispositivo+"') AND asigPro.id_usuario = "+idUsuario+" AND asigArt.id_estado = 76";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionesArticulos2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<DetalleArticuloSinBaja> findByAsignacionesActivosSinBaja() {
		List<DetalleArticuloSinBaja> lista = new ArrayList<DetalleArticuloSinBaja>();
		try {
			String consultaId = "SELECT DISTINCT detArt.id AS idDetalleArticulo, art.descripcion AS tipoActivo, detArt.marca, detArt.placa, detArt.serial, usuario.nombre, usuario.apellido FROM asignaciones_articulos AS asiArt INNER JOIN detalle_articulo AS detArt ON asiArt.id_detalle_articulo = detArt.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN asignaciones_procesos AS asigProc ON asiArt.id_asignaciones_procesos = asigProc.id INNER JOIN usuario ON detArt.id_usuario = usuario.id WHERE ((asiArt.id_estado = 76 AND art.id_estado = 26) OR (asiArt.id_estado = 78 AND art.id_estado = 26)) AND NOT EXISTS(SELECT * FROM articulos_baja AS artbaja WHERE artbaja.id_detalle_articulo = asiArt.id_detalle_articulo AND artbaja.id_estado = 82)";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(DetalleArticuloSinBaja.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<DetalleArticuloSinBaja> findByAsignacionesActivosCompletos() {
		List<DetalleArticuloSinBaja> lista = new ArrayList<DetalleArticuloSinBaja>();
		try {
			String consultaId = "SELECT DISTINCT detArt.id AS idDetalleArticulo, art.descripcion AS tipoActivo, detArt.marca, detArt.placa, detArt.serial, usuario.nombre, usuario.apellido FROM asignaciones_articulos AS asiArt INNER JOIN detalle_articulo AS detArt ON asiArt.id_detalle_articulo = detArt.id INNER JOIN articulos AS art ON detArt.id_articulo = art.id INNER JOIN asignaciones_procesos AS asigProc ON asiArt.id_asignaciones_procesos = asigProc.id INNER JOIN usuario ON detArt.id_usuario = usuario.id WHERE ((asiArt.id_estado = 76 AND art.id_estado = 26) OR (asiArt.id_estado = 78 AND art.id_estado = 26))";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(DetalleArticuloSinBaja.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<matrizNecesidadDetalleConsulta> findByMatrizNecesidadPrimerAño() {
		List<matrizNecesidadDetalleConsulta> lista = new ArrayList<matrizNecesidadDetalleConsulta>();
		try {
			String consultaId = "SELECT DISTINCT YEAR(matrizNecDet.fecha) AS fechaEjecutar FROM matriz_necesidad as matrizNec INNER JOIN `matriz_necesidad_detalle` AS matrizNecDet ON matrizNec.id = matrizNecDet.id_matriz_necesidad INNER JOIN sub_proceso AS subProc ON matrizNec.id_sub_proceso = subProc.id INNER JOIN tipos_procesos AS tipProc ON tipProc.id = subProc.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNec ON tipNec.id = matrizNec.id_tipo_necesidad WHERE matrizNecDet.id_estado != 87 AND matrizNecDet.id_estado != 99 ORDER BY YEAR(matrizNecDet.fecha) ASC LIMIT 1";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(matrizNecesidadDetalleConsulta.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<MatrizNecesidadConsultaCierre> findByMatrizNecesidadFechaProceso(String fecha, Long idTipoProceso) {
		List<MatrizNecesidadConsultaCierre> lista = new ArrayList<MatrizNecesidadConsultaCierre>();
		try {
			String consultaId = "SELECT DISTINCT matNec.id, matNec.cantidad, matNec.cantidad_ejecuciones, matNec.costo_estimado, matNec.costo_total, matNec.costo_unitario, matNec.detalle, matNec.fecha, matNec.porcentaje_total, matNec.id_sub_proceso, matNec.id_tipo_activo, matNec.id_tipo_necesidad, matNec.cum_planeacion, subPro.descripcion AS subProceso, tipPro.descripcion AS tipoProceso, tipNed.descripcion AS tipoNecesidad FROM matriz_necesidad AS matNec INNER JOIN sub_proceso AS subPro ON subPro.id = matNec.id_sub_proceso INNER JOIN tipos_procesos AS tipPro ON tipPro.id = subPro.id_tipo_proceso INNER JOIN tipo_necesidad AS tipNed ON tipNed.id = matNec.id_tipo_necesidad INNER JOIN matriz_necesidad_detalle AS matDet ON matDet.id_matriz_necesidad = matNec.id WHERE subPro.id_tipo_proceso = "+idTipoProceso+" AND matDet.fecha BETWEEN '"+fecha+"-01-01' AND '"+fecha+"-12-31'";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(MatrizNecesidadConsultaCierre.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
	@Override
	public List<MatrizNecesidadDetalle2> findByMatrizDetalleIdMatriz(Long idMatriz) {
		List<MatrizNecesidadDetalle2> lista = new ArrayList<MatrizNecesidadDetalle2>();
		try {
			String consultaId = "SELECT DISTINCT matDet.id, matDet.cantidad_comprada, matDet.cantidad_ejecuciones, matDet.cantidad_ejecuciones_cumplidas, matDet.cantidad_estimada, matDet.costo_ejecucion_comprada, matDet.descripcion, matDet.fecha, matDet.id_orden_compra, matDet.porcentaje, matDet.id_estado, matDet.id_matriz_necesidad, matDet.fecha_ejecutada FROM matriz_necesidad_detalle AS matDet INNER JOIN matriz_necesidad AS matNed ON matNed.id = matDet.id_matriz_necesidad WHERE matNed.id = "+idMatriz;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(MatrizNecesidadDetalle2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	@Override
	public List<AsignacionPuntoVentaArticulo2> findByAsignPuntoVentActivoIdAsignActivo(Long idAsignacionActivo) {
		List<AsignacionPuntoVentaArticulo2> lista = new ArrayList<AsignacionPuntoVentaArticulo2>();
		try {
			String consultaId = "SELECT * FROM asignacion_punto_venta_articulo AS asiArtPuntVen WHERE asiArtPuntVen.id_asignaciones_articulos = "+idAsignacionActivo;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsignacionPuntoVentaArticulo2.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}

	@Override
	public List<AsigArtiReporteEmpresas> findByAsignArtReporteEmpresa() {
		List<AsigArtiReporteEmpresas> lista = new ArrayList<AsigArtiReporteEmpresas>();
		try {
			String consultaId = "SELECT asigArt.id, articulos.descripcion AS tipoArticulo, detArt.placa, detArt.marca, detArt.serial, tipAct.descripcion AS tipoActivo, categoria.descripcion AS categoria, asigPunt.nombre_oficina, asigPunt.nombre_sitio_venta, usuario.nombre AS nombreUsuario, usuario.apellido AS apellidoUsuario FROM asignaciones_articulos AS asigArt INNER JOIN detalle_articulo AS detArt ON detArt.id = asigArt.id_detalle_articulo INNER JOIN articulos ON articulos.id = detArt.id_articulo INNER JOIN categoria ON categoria.id = articulos.id_categoria INNER JOIN tipo_activo AS tipAct ON tipAct.id = detArt.id_tipo_activo INNER JOIN asignaciones_procesos AS asigPro ON asigPro.id = asigArt.id INNER JOIN usuario ON usuario.id = asigPro.id_usuario LEFT JOIN asignacion_punto_venta_articulo AS asigPunt ON asigPunt.id_asignaciones_articulos = asigArt.id WHERE asigArt.id_estado = 78 OR asigArt.id_estado = 76;";
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(AsigArtiReporteEmpresas.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
}
