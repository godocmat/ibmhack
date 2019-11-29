package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;


@Data
@Entity
public class Pillar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "entity_handle")
    private String EntityHandle;

    @Column(name = "coordinates")
    private BigDecimal[] coordinates;
}
