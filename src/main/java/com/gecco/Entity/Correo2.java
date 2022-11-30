package com.gecco.Entity;

public class Correo2 {
	
	String correo;
	String contrasena;
	String to;
	String subject;
	String messaje;
	
	public Correo2() {
		super();
	}

	public Correo2(String correo, String contrasena, String to, String subject, String messaje) {
		super();
		this.correo = correo;
		this.contrasena = contrasena;
		this.to = to;
		this.subject = subject;
		this.messaje = messaje;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessaje() {
		return messaje;
	}

	public void setMessaje(String messaje) {
		this.messaje = messaje;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

}
