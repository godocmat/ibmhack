package com.example.demo.services;

import com.example.demo.model.Image;
import com.example.demo.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

  @Autowired
  private ImageRepository imageRepository;

  public List<Image> getAllImages() {
    return imageRepository.findAll();
  }

  public Image createImage(Image image) {
    return imageRepository.save(image);
  }

  public Image updateImage(Image image, Long imageId) {
    return imageRepository.findById(imageId)
      .map(image1 -> {
        image1.setDate(image.getDate());
        image1.setDownloadUrl(image.getDownloadUrl());
        image1.setLat(image.getLat());
        image1.setLng(image.getLng());
        return imageRepository.save(image1);
      })
      .orElseGet(() -> {
        return imageRepository.save(image);
      });
  }

}
