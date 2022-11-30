package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.RegistroCorreo;

public interface IRegistroCorreoRepository extends  JpaRepository<RegistroCorreo, Long> {

}