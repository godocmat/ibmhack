package com.example.demo.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Entity
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "date")
  private Date date;

  @Column(name = "download_url")
  private String download_url;

  @Column(name = "lat")
  private BigDecimal lat;

  @Column(name = "lng")
  private BigDecimal lng;

  public void setId(long id) {
    this.id = id;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public void setDownload_url(String download_url) {
    this.download_url = download_url;
  }

  public void setLat(BigDecimal lat) {
    this.lat = lat;
  }

  public void setLng(BigDecimal lng) {
    this.lng = lng;
  }

  public long getId() {
    return id;
  }

  public Date getDate() {
    return date;
  }

  public String getDownload_url() {
    return download_url;
  }

  public BigDecimal getLat() {
    return lat;
  }

  public BigDecimal getLng() {
    return lng;
  }
}
