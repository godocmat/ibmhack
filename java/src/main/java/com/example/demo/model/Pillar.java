package com.example.demo.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    @Column(name = "images")
    private String[] images;


  public Pillar(BigDecimal[] coordinates, String[] images) {
    this.coordinates = coordinates;
    this.images = images;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getEntityHandle() {
    return EntityHandle;
  }

  public void setEntityHandle(String entityHandle) {
    EntityHandle = entityHandle;
  }

  public BigDecimal[] getCoordinates() {
    return coordinates;
  }

  public void setCoordinates(BigDecimal[] coordinates) {
    this.coordinates = coordinates;
  }

  public String[] getImages() {
    return images;
  }

  public void setImages(String[] images) {
    this.images = images;
  }
}
