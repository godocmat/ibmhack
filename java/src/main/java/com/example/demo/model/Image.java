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
  private String downloadUrl;

  @Column(name = "lat")
  private BigDecimal lat;

  @Column(name = "lng")
  private BigDecimal lng;

  @Column(name = "is_corrupted")
  private Boolean isCorrupted;

  public Boolean getCorrupted() {
    return isCorrupted;
  }

  public void setCorrupted(Boolean corrupted) {
    isCorrupted = corrupted;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public void setDownloadUrl(String downloadUrl) {
    this.downloadUrl = downloadUrl;
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

  public String getDownloadUrl() {
    return downloadUrl;
  }

  public BigDecimal getLat() {
    return lat;
  }

  public BigDecimal getLng() {
    return lng;
  }
}
