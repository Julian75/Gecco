package com.gecco.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Visitas;

public interface IVisitasRepository extends JpaRepository<Visitas, Long> {

}