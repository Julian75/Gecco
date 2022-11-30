package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Articulos;

public interface IArticulosRepository extends JpaRepository<Articulos, Long>{

}