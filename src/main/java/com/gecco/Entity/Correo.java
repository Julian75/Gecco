package com.gecco.Entity;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Correo {
//	private static final String remitente = "hallysandrea@gmail.com";
//    private static final String clave = "jfhunhqavhcgruyh";

   public static String mensaje;
  
   public static boolean enviarCorreo(String correo, String contrasena, String destinatario, String asunto, String cuerpo) {  
       boolean enviado = false ;
       Properties props = System.getProperties();
       props.put("mail.smtp.host", "smtp.office365.com");  //El servidor SMTP de Google
       props.put("mail.smtp.user", correo);
       props.put("mail.smtp.clave", contrasena);    //La clave de la cuenta
       props.put("mail.smtp.auth", "true");    //Usar autenticación mediante usuario y clave
       props.put("mail.smtp.starttls.enable", "true"); //Para conectar de manera segura al servidor SMTP
       props.put("mail.smtp.port", "587"); //El puerto SMTP seguro de Google
       props.put("mail.smtp.ssl.trust", "smtp.office365.com");
      
       Session session = Session.getDefaultInstance(props);
       MimeMessage message = new MimeMessage(session);

       try {
           message.setFrom(new InternetAddress(correo));
           message.addRecipient(Message.RecipientType.TO, new InternetAddress(destinatario)); 
           message.setSubject(asunto);
           message.setContent(cuerpo, "text/html");
           //message.setText(cuerpo);
            Transport transport = session.getTransport("smtp");
               transport.connect("smtp.office365.com", correo, contrasena);
               transport.sendMessage(message, message.getAllRecipients());
           enviado=true;
       }catch (MessagingException me) {
       	System.out.println(me);
           //Si se produce un error  
           mensaje=me.getMessage();            
       }
       return enviado;
   }
   
   public static boolean enviarCorreo2(String correo, String contrasena, String destinatario, String asunto, String cuerpo) {  
       boolean enviado = false ;
       Properties props = System.getProperties();
       props.put("mail.smtp.host", "smtp.gmail.com");  //El servidor SMTP de Google
       props.put("mail.smtp.user", correo);
       props.put("mail.smtp.clave", contrasena);    //La clave de la cuenta
       props.put("mail.smtp.auth", "true");    //Usar autenticación mediante usuario y clave
       props.put("mail.smtp.starttls.enable", "true"); //Para conectar de manera segura al servidor SMTP
       props.put("mail.smtp.port", "587"); //El puerto SMTP seguro de Google
       props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
      
       Session session = Session.getDefaultInstance(props);
       MimeMessage message = new MimeMessage(session);

       try {
           message.setFrom(new InternetAddress(correo));
           message.addRecipient(Message.RecipientType.TO, new InternetAddress(destinatario)); 
           message.setSubject(asunto);
           message.setContent(cuerpo, "text/html");
           //message.setText(cuerpo);
            Transport transport = session.getTransport("smtp");
               transport.connect("smtp.gmail.com", correo, contrasena);
               transport.sendMessage(message, message.getAllRecipients());
           enviado=true;
       }catch (MessagingException me) {
       	System.out.println(me);
           //Si se produce un error  
           mensaje=me.getMessage();            
       }
       return enviado;
   }
}
