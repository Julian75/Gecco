package com.gecco;

//import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.gecco.Entity.Correo;
import com.gecco.Entity.Recordatorio;
import com.gecco.Service.IPdfService;
import com.gecco.ServiceImplement.RecordatorioServiceImplement;

@SpringBootApplication
@EnableScheduling
public class GeccoapiApplication extends SpringBootServletInitializer{

//	private final long SEGUNDO = 1000;   
//    private final long MINUTO = SEGUNDO * 60;   
//    private java.util.List<Recordatorio> listaRecordatorio;
    LocalDate fecha = LocalDate.now();
//    private Date fechaTabla;
    LocalDate fecha2;
    LocalTime horaActual = LocalTime.now();
    
    @Resource
//    RecordatorioServiceImplement recordatorioService;

//    ing.soporte3@suchanche.com.co
//    @Scheduled(fixedRate = (MINUTO*10))
//    public void tarea1() {
//        listaRecordatorio = recordatorioService.all();
//        for (Recordatorio recordatorio : listaRecordatorio) {
//            fechaTabla = recordatorio.getFecha();
//            fecha2 = Instant.ofEpochMilli(fechaTabla.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
//            if(recordatorio.getTipoEnvio().equals("Ninguna")) {                
//                if(fecha.equals(fecha2)) {
//                    String horaAlmacenada = (recordatorio.getHora().split(":"))[0];
//                    String minutoAlmacenado = (recordatorio.getHora().split(":"))[1];
//                    int restaMinuto = horaActual.getMinute() - Integer.parseInt(minutoAlmacenado);
//                    if(Integer.parseInt(horaAlmacenada) == horaActual.getHour()) {
//                        if(restaMinuto >= -30 && restaMinuto <= 30) {  
//                            if(recordatorio.getEnvio().equals("no")) {                            
//                                Correo.enviarCorreo2("hallysandrea@gmail.com", "alla zehc kpmm bchs", "hallysandrea@gmail.com", "Recordatorio de eventos", recordatorio.getDescripcion());
//                                String opcion = "si";
//                                modificarRecordatorio(opcion, recordatorio.getId());
//                            }
//                        }
//                    }
//                }
//            }else if(recordatorio.getTipoEnvio().equals("Mensual")) {
//                int diaMes = fecha2.getDayOfMonth();
//                int diaMesActual = fecha.getDayOfMonth();
//                if(diaMes == diaMesActual) {
//                    if(recordatorio.getEnvio().equals("no")) {
//                    	String horaAlmacenada = (recordatorio.getHora().split(":"))[0];
//                        String minutoAlmacenado = (recordatorio.getHora().split(":"))[1];
//                        int restaMinuto = horaActual.getMinute() - Integer.parseInt(minutoAlmacenado);
//                        if(Integer.parseInt(horaAlmacenada) == horaActual.getHour()) {
//                        	 if(restaMinuto >= -30 && restaMinuto <= 30) {
//                        		 Correo.enviarCorreo2("hallysandrea@gmail.com", "alla zehc kpmm bchs", "hallysandrea@gmail.com", "Recordatorio de eventos", recordatorio.getDescripcion());
//                        		 String opcion = "si";
//                        		 modificarRecordatorio(opcion, recordatorio.getId());                        		 
//                        	 }
//                        }
//                    }
//                }else if(diaMes != diaMesActual) {
//                    if(recordatorio.getEnvio().equals("si")) {
//                        String opcion = "no";
//                        modificarRecordatorio(opcion, recordatorio.getId());
//                    }
//                }
//            }else {
//                String horaAlmacenada = (recordatorio.getHora().split(":"))[0];
//                if(Integer.parseInt(horaAlmacenada) == horaActual.getHour()) { 
//                    if(recordatorio.getEnvio().equals("no")) {                            
//                        Correo.enviarCorreo2("hallysandrea@gmail.com", "alla zehc kpmm bchs", "hallysandrea@gmail.com", "Recordatorio de eventos", recordatorio.getDescripcion());
//                        String opcion = "si";
//                        modificarRecordatorio(opcion, recordatorio.getId());
//                    }
//                }else {
//                    if(recordatorio.getEnvio().equals("si")) {
//                        String opcion = "no";
//                        modificarRecordatorio(opcion, recordatorio.getId());
//                    }
//                }
//            }
//        }
//    }
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public int modificarRecordatorio(String envio, long id) {
        return jdbcTemplate.update("UPDATE recordatorio SET envio='"+envio+"' WHERE id="+id);
    }
	
	@Resource
	IPdfService fileService;
	
	public static void main(String[] args) {
		SpringApplication.run(GeccoapiApplication.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(GeccoapiApplication.class);
	}

//	@Override
//	public void run(String... arg) throws Exception{
//		fileService.deleteAll();
//		fileService.init();
//	}

}
