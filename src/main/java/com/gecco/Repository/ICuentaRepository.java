package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Cuenta;

public interface ICuentaRepository extends JpaRepository<Cuenta, Long>{

}
